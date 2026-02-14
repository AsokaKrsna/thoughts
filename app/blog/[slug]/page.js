import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug, getAllPosts, getAllTags } from '../../../lib/posts';
import ClientLayout from '../../../components/ClientLayout';
import PostContent from './PostContent';

export async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            tags: post.tags,
        },
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    const allPosts = getAllPosts();
    const tags = getAllTags();

    if (!post) return notFound();

    return (
        <ClientLayout posts={allPosts} tags={tags}>
            <PostContent post={post} allPosts={allPosts} />
        </ClientLayout>
    );
}
