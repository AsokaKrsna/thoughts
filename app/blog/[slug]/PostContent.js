'use client';

import { Calendar, Clock } from 'lucide-react';
import TagPill from '../../../components/TagPill';
import TableOfContents from '../../../components/TableOfContents';
import ReadingProgress from '../../../components/ReadingProgress';
import ShareButtons from '../../../components/ShareButtons';
import CodeCopyButton from '../../../components/CodeCopyButton';
import Comments from '../../../components/Comments';
import RelatedPosts from '../../../components/RelatedPosts';
import { getTagColor, getPrimaryHue } from '../../../lib/tagColors';
import { formatDate } from '../../../lib/utils';
import styles from './PostContent.module.css';

export default function PostContent({ post, allPosts = [] }) {
    const primaryHue = getPrimaryHue(post.tags);

    return (
        <>
            <ReadingProgress hue={primaryHue} />
            <CodeCopyButton />

            <div className={styles.page}>
                <div className={styles.layout}>
                    <article className={styles.article}>
                        {/* Post Header */}
                        <header className={styles.header}>
                            <div className={styles.tags}>
                                {post.tags.map((tag) => (
                                    <TagPill key={tag} tag={tag} hue={getTagColor(tag)} />
                                ))}
                            </div>
                            <h1 className={styles.title}>{post.title}</h1>
                            {post.description && (
                                <p className={styles.description}>{post.description}</p>
                            )}
                            <div className={styles.meta}>
                                <span className={styles.metaItem}>
                                    <Calendar size={15} />
                                    {formatDate(post.date)}
                                </span>
                                <span className={styles.metaItem}>
                                    <Clock size={15} />
                                    {post.readingTime}
                                </span>
                            </div>
                        </header>

                        {/* Cover Image */}
                        {post.coverImage && (
                            <div className={styles.coverWrapper}>
                                <img src={post.coverImage} alt={post.title} className={styles.cover} />
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className={`prose ${styles.content}`}
                            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                        />

                        {/* Share */}
                        <ShareButtons title={post.title} slug={post.slug} />

                        {/* Related Posts */}
                        <RelatedPosts
                            currentSlug={post.slug}
                            currentTags={post.tags}
                            allPosts={allPosts}
                        />

                        {/* Comments */}
                        <Comments />
                    </article>

                    {/* Table of Contents */}
                    <aside className={styles.aside}>
                        <TableOfContents headings={post.headings} />
                    </aside>
                </div>

                {/* Tag-colored background glow */}
                <div
                    className={styles.backgroundGlow}
                    style={{ '--glow-hue': primaryHue }}
                />
            </div>
        </>
    );
}

