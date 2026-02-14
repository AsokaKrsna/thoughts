'use client';

import styles from './TagPill.module.css';

export default function TagPill({ tag, hue, onClick, active, size = 'default' }) {
    const style = {
        '--tag-hue': hue || 210,
    };

    return (
        <button
            className={`${styles.pill} ${active ? styles.active : ''} ${styles[size]}`}
            style={style}
            onClick={onClick ? () => onClick(tag) : undefined}
            type="button"
        >
            {tag}
        </button>
    );
}
