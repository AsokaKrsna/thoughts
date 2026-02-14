'use client';

import dynamic from 'next/dynamic';
import BlogCard from '../components/BlogCard';
import TagPill from '../components/TagPill';
import { getTagColor } from '../lib/tagColors';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './HomeContent.module.css';

const ParticleBackground = dynamic(
    () => import('../components/ParticleBackground'),
    { ssr: false }
);

export default function HomeContent({ posts, tags }) {
    const recentPosts = posts.slice(0, 5);
    const tagEntries = Object.entries(tags).sort((a, b) => b[1] - a[1]);

    return (
        <>
            <ParticleBackground accentHue={210} />

            <div className={styles.page}>
                {/* Header */}
                <section className={styles.header}>
                    <h1 className={styles.title}>
                        Asokakrsna&apos;s <span className={styles.highlight}>Thoughts</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Cybersecurity, AI, and the things that keep me up at night.
                    </p>
                </section>

                {/* Browse by Tag */}
                {tagEntries.length > 0 && (
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Browse by Tag</h2>
                        </div>
                        <div className={styles.tagBar}>
                            {tagEntries.map(([tag, count]) => (
                                <Link key={tag} href={`/blog?tag=${tag}`} style={{ textDecoration: 'none' }}>
                                    <TagPill tag={`${tag} (${count})`} hue={getTagColor(tag)} />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recent Posts */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Recent Posts</h2>
                        <Link href="/blog" className={styles.viewAll}>
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className={styles.grid}>
                        {recentPosts.map((post, i) => (
                            <BlogCard key={post.slug} post={post} index={i} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
