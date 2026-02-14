import { Suspense } from 'react';
import { getAllPosts, getAllTags } from '../../lib/posts';
import ClientLayout from '../../components/ClientLayout';
import BlogListContent from './BlogListContent';

export const metadata = {
    title: 'Blog',
    description: 'All posts from Asokakrsna\'s Thoughts',
};

export default function BlogPage() {
    const posts = getAllPosts();
    const tags = getAllTags();

    return (
        <ClientLayout posts={posts} tags={tags}>
            <Suspense fallback={<div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>}>
                <BlogListContent posts={posts} tags={tags} />
            </Suspense>
        </ClientLayout>
    );
}
