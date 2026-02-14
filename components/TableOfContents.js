'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

export default function TableOfContents({ headings = [] }) {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
        );

        headings.forEach((heading) => {
            const el = document.getElementById(heading.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length < 2) return null;

    return (
        <nav className={styles.toc} aria-label="Table of Contents">
            <p className={styles.title}>On this page</p>
            <ul className={styles.list}>
                {headings.map((heading) => (
                    <li key={heading.id} className={styles.item} data-level={heading.level}>
                        <a
                            href={`#${heading.id}`}
                            className={`${styles.link} ${activeId === heading.id ? styles.active : ''}`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
