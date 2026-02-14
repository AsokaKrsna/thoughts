'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './ParticleBackground.module.css';

function Particles({ count = 80, color = '#3b82f6' }) {
    const meshRef = useRef();
    const linesRef = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = [];
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
            velocities.push({
                x: (Math.random() - 0.5) * 0.003,
                y: (Math.random() - 0.5) * 0.003,
                z: (Math.random() - 0.5) * 0.001,
            });
        }
        return { positions, velocities };
    }, [count]);

    useFrame(() => {
        if (!meshRef.current) return;

        const positions = meshRef.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            positions[i * 3] += particles.velocities[i].x;
            positions[i * 3 + 1] += particles.velocities[i].y;
            positions[i * 3 + 2] += particles.velocities[i].z;

            // Wrap around
            if (Math.abs(positions[i * 3]) > 10) particles.velocities[i].x *= -1;
            if (Math.abs(positions[i * 3 + 1]) > 6) particles.velocities[i].y *= -1;
            if (Math.abs(positions[i * 3 + 2]) > 3) particles.velocities[i].z *= -1;
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;

        // Draw lines between close particles
        if (linesRef.current) {
            const linePositions = [];
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (dist < 3) {
                        linePositions.push(
                            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                        );
                    }
                }
            }
            linesRef.current.geometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(linePositions, 3)
            );
        }
    });

    return (
        <>
            <points ref={meshRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={particles.positions}
                        count={count}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.04}
                    color={color}
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color={color} transparent opacity={0.06} />
            </lineSegments>
        </>
    );
}

export default function ParticleBackground({ accentHue = 210 }) {
    const color = `hsl(${accentHue}, 60%, 55%)`;

    // Respect reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Particles color={color} />
            </Canvas>
        </div>
    );
}
