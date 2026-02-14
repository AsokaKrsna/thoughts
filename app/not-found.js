'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';

// Matrix rain characters
const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890ABCDEF';

function useMatrixRain(canvasRef, active) {
    useEffect(() => {
        if (!active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const fontSize = 14;
        const cols = Math.floor(canvas.width / fontSize);
        const drops = Array(cols).fill(0).map(() => Math.random() * -50);

        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 12, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < cols; i++) {
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Gradient fade: brighter at the bottom of each column
                const alpha = 0.3 + Math.random() * 0.5;
                ctx.fillStyle = `rgba(0, 255, 70, ${alpha})`;
                ctx.fillText(char, x, y);

                if (y > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                drops[i] += 0.5 + Math.random() * 0.5;
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, [active, canvasRef]);
}

export default function NotFound() {
    const router = useRouter();
    const canvasRef = useRef(null);
    const [phase, setPhase] = useState('intro'); // intro → countdown → crash → gone
    const [count, setCount] = useState(5);
    const [typed, setTyped] = useState('');
    const [showMatrix, setShowMatrix] = useState(false);

    const fullMessage = '> ERROR: page not found. Initiating recovery protocol...';

    useMatrixRain(canvasRef, showMatrix);

    // Phase 0: Type out the message
    useEffect(() => {
        if (phase !== 'intro') return;
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setTyped(fullMessage.slice(0, i));
            if (i >= fullMessage.length) {
                clearInterval(interval);
                setTimeout(() => setPhase('countdown'), 800);
            }
        }, 35);
        return () => clearInterval(interval);
    }, [phase]);

    // Phase 1: Countdown 5 → 0
    useEffect(() => {
        if (phase !== 'countdown') return;
        if (count <= 0) {
            setPhase('crash');
            return;
        }
        const timer = setTimeout(() => setCount((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [phase, count]);

    // Phase 2: Crash sequence
    useEffect(() => {
        if (phase !== 'crash') return;
        setShowMatrix(true);

        // Let matrix rain play for a moment, then redirect
        const timer = setTimeout(() => {
            setPhase('gone');
            setTimeout(() => router.push('/'), 400);
        }, 1800);
        return () => clearTimeout(timer);
    }, [phase, router]);

    const skipToHome = useCallback(() => router.push('/'), [router]);

    // Intensity increases as countdown decreases
    const intensity = phase === 'countdown' ? Math.max(0, 5 - count) : 0;

    return (
        <div
            className={`${styles.page} ${styles[`intensity${intensity}`] || ''} ${phase === 'crash' ? styles.crashing : ''} ${phase === 'gone' ? styles.gone : ''}`}
        >
            {/* Matrix rain canvas */}
            <canvas
                ref={canvasRef}
                className={`${styles.matrixCanvas} ${showMatrix ? styles.matrixVisible : ''}`}
            />

            {/* Scanlines */}
            <div className={styles.scanlines} />

            {/* Main content */}
            <div className={`${styles.content} ${phase === 'crash' || phase === 'gone' ? styles.contentHide : ''}`}>
                {/* 404 */}
                <div className={styles.codeBlock}>
                    <span className={styles.four}>4</span>
                    <span className={styles.zero}>0</span>
                    <span className={styles.four}>4</span>
                </div>

                {/* Typed message */}
                <div className={styles.terminal}>
                    <span className={styles.typed}>{typed}</span>
                    <span className={styles.cursor}>█</span>
                </div>

                {/* Countdown */}
                {phase === 'countdown' && (
                    <div className={styles.countdownArea}>
                        <div className={styles.countdownRing}>
                            <svg viewBox="0 0 100 100" className={styles.ringSvg}>
                                <circle
                                    cx="50" cy="50" r="42"
                                    className={styles.ringTrack}
                                />
                                <circle
                                    cx="50" cy="50" r="42"
                                    className={styles.ringFill}
                                    style={{
                                        strokeDashoffset: `${264 - (264 * (5 - count)) / 5}`,
                                    }}
                                />
                            </svg>
                            <span className={styles.countNum} key={count}>{count}</span>
                        </div>
                        <p className={styles.redirectLabel}>REDIRECTING TO SAFETY</p>
                    </div>
                )}

                {/* Button */}
                {phase !== 'crash' && phase !== 'gone' && (
                    <button onClick={skipToHome} className={styles.skipBtn}>
                        [ ESCAPE ]
                    </button>
                )}
            </div>

            {/* Crash overlay text */}
            {(phase === 'crash' || phase === 'gone') && (
                <div className={styles.crashOverlay}>
                    <p className={styles.crashText}>SIGNAL RECOVERED</p>
                </div>
            )}
        </div>
    );
}
