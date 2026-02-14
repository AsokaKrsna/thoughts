'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, Tag, ArrowRight } from 'lucide-react';
import Fuse from 'fuse.js';
import styles from './CommandPalette.module.css';

export default function CommandPalette({ posts = [], tags = {} }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);
    const router = useRouter();

    const fuse = new Fuse(posts, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3,
    });

    // Build results
    const getResults = useCallback(() => {
        if (!query.trim()) {
            // Show recent posts when no query
            return posts.slice(0, 6).map((p) => ({
                type: 'post',
                title: p.title,
                subtitle: p.readingTime,
                href: `/blog/${p.slug}`,
            }));
        }

        const results = [];

        // Search posts
        const postResults = fuse.search(query).slice(0, 5);
        postResults.forEach((r) => {
            results.push({
                type: 'post',
                title: r.item.title,
                subtitle: r.item.readingTime,
                href: `/blog/${r.item.slug}`,
            });
        });

        // Search tags
        const matchingTags = Object.keys(tags).filter((t) =>
            t.toLowerCase().includes(query.toLowerCase())
        );
        matchingTags.slice(0, 3).forEach((t) => {
            results.push({
                type: 'tag',
                title: t,
                subtitle: `${tags[t]} post${tags[t] !== 1 ? 's' : ''}`,
                href: `/blog?tag=${t}`,
            });
        });

        // Pages
        const pages = [
            { title: 'Home', href: '/' },
            { title: 'Blog', href: '/blog' },
            { title: 'About', href: '/about' },
        ];
        pages.forEach((p) => {
            if (p.title.toLowerCase().includes(query.toLowerCase())) {
                results.push({ type: 'page', title: p.title, subtitle: 'Page', href: p.href });
            }
        });

        return results;
    }, [query, posts, tags, fuse]);

    const results = getResults();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[activeIndex]) {
            router.push(results[activeIndex].href);
            setOpen(false);
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'post': return <FileText size={16} />;
            case 'tag': return <Tag size={16} />;
            default: return <ArrowRight size={16} />;
        }
    };

    if (!open) return null;

    return (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
            <div className={styles.palette} onClick={(e) => e.stopPropagation()}>
                <div className={styles.inputWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.input}
                        placeholder="Search posts, tags, pages..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                        onKeyDown={handleKeyDown}
                    />
                    <kbd className={styles.esc}>ESC</kbd>
                </div>

                <div className={styles.results}>
                    {results.length === 0 ? (
                        <div className={styles.empty}>No results found</div>
                    ) : (
                        results.map((result, i) => (
                            <button
                                key={i}
                                className={`${styles.result} ${i === activeIndex ? styles.active : ''}`}
                                onClick={() => { router.push(result.href); setOpen(false); }}
                                onMouseEnter={() => setActiveIndex(i)}
                            >
                                <span className={styles.resultIcon}>{getIcon(result.type)}</span>
                                <span className={styles.resultText}>
                                    <span className={styles.resultTitle}>{result.title}</span>
                                    <span className={styles.resultSubtitle}>{result.subtitle}</span>
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
