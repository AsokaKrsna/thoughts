import { getAllPosts, getAllTags } from '../lib/posts';
import ClientLayout from '../components/ClientLayout';
import HomeContent from './HomeContent';

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <ClientLayout posts={posts} tags={tags}>
      <HomeContent posts={posts} tags={tags} />
    </ClientLayout>
  );
}
