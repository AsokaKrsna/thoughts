'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogCard from '../../components/BlogCard';
import TagPill from '../../components/TagPill';
import { getTagColor } from '../../lib/tagColors';
import { Search, X } from 'lucide-react';
import styles from './BlogListContent.module.css';

export default function BlogListContent({ posts, tags }) {
    const searchParams = useSearchParams();
    const initialTag = searchParams.get('tag');
    const [activeTags, setActiveTags] = useState(initialTag ? [initialTag] : []);
    const [searchQuery, setSearchQuery] = useState('');

    const tagEntries = Object.entries(tags).sort((a, b) => b[1] - a[1]);

    const toggleTag = (tag) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const filteredPosts = useMemo(() => {
        let result = posts;

        if (activeTags.length > 0) {
            result = result.filter((post) =>
                activeTags.some((tag) =>
                    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
                )
            );
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(q) ||
                    post.description.toLowerCase().includes(q) ||
                    post.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        return result;
    }, [posts, activeTags, searchQuery]);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>All Posts</h1>
                <p className={styles.count}>{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Search */}
            <div className={styles.searchWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Tag Filter */}
            <div className={styles.filterBar}>
                {tagEntries.map(([tag]) => (
                    <TagPill
                        key={tag}
                        tag={tag}
                        hue={getTagColor(tag)}
                        active={activeTags.includes(tag)}
                        onClick={toggleTag}
                    />
                ))}
                {activeTags.length > 0 && (
                    <button className={styles.clearFilters} onClick={() => setActiveTags([])}>
                        Clear filters
                    </button>
                )}
            </div>

            {/* Post Grid */}
            <div className={styles.grid}>
                {filteredPosts.map((post, i) => (
                    <BlogCard key={post.slug} post={post} index={i} />
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className={styles.empty}>
                    <p>No posts found. Try adjusting your filters.</p>
                </div>
            )}
        </div>
    );
}
