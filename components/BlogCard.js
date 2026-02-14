import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import TagPill from './TagPill';
import { getTagColor } from '../lib/tagColors';
import { formatDate } from '../lib/utils';
import styles from './BlogCard.module.css';

export default function BlogCard({ post, index = 0 }) {
    const primaryHue = post.tags.length > 0 ? getTagColor(post.tags[0]) : 210;

    return (
        <Link href={`/blog/${post.slug}`} className={styles.card} style={{ '--card-hue': primaryHue, animationDelay: `${index * 0.08}s` }}>
            <div className={styles.glowOrb} />
            <div className={styles.topBorder} />

            {post.coverImage && (
                <div className={styles.coverWrapper}>
                    <img src={post.coverImage} alt={post.title} className={styles.cover} />
                </div>
            )}

            <div className={styles.body}>
                <h2 className={styles.title}>{post.title}</h2>
                {post.description && (
                    <p className={styles.description}>{post.description}</p>
                )}

                <div className={styles.tags}>
                    {post.tags.slice(0, 4).map((tag) => (
                        <TagPill key={tag} tag={tag} hue={getTagColor(tag)} size="small" />
                    ))}
                    {post.tags.length > 4 && (
                        <span className={styles.moreTags}>+{post.tags.length - 4}</span>
                    )}
                </div>

                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <Calendar size={14} />
                        {formatDate(post.date)}
                    </span>
                    <span className={styles.metaItem}>
                        <Clock size={14} />
                        {post.readingTime}
                    </span>
                </div>
            </div>
        </Link>
    );
}
