'use client';

import BlogCard from './BlogCard';
import styles from './RelatedPosts.module.css';

export default function RelatedPosts({ currentSlug, currentTags, allPosts }) {
    // Find posts that share tags, excluding current post
    const scored = allPosts
        .filter((p) => p.slug !== currentSlug)
        .map((post) => {
            const shared = post.tags.filter((t) =>
                currentTags.some((ct) => ct.toLowerCase() === t.toLowerCase())
            ).length;
            return { ...post, score: shared };
        })
        .filter((p) => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    if (scored.length === 0) return null;

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Related Posts</h2>
            <div className={styles.grid}>
                {scored.map((post, i) => (
                    <BlogCard key={post.slug} post={post} index={i} />
                ))}
            </div>
        </section>
    );
}
