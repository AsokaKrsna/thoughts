'use client';

import { useEffect, useState } from 'react';
import styles from './ReadingProgress.module.css';

export default function ReadingProgress({ hue = 210 }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, scrollPercent));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (progress < 1) return null;

    return (
        <div className={styles.bar} style={{
            '--progress': `${progress}%`,
            '--bar-hue': hue,
        }} />
    );
}
