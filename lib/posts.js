import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { getReadingTime } from './utils';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      if (data.published === false) return null;

      const readingTime = getReadingTime(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        tags: data.tags || [],
        categories: data.categories || [],
        coverImage: data.coverImage || null,
        readingTime,
      };
    })
    .filter(Boolean);

  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getAllTags() {
  const posts = getAllPosts();
  const tagMap = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const normalizedTag = tag.toLowerCase();
      tagMap[normalizedTag] = (tagMap[normalizedTag] || 0) + 1;
    });
  });
  return tagMap;
}

export function getAllSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  if (data.published === false) return null;

  // Unified pipeline: remark (parse MD) → rehype (HTML) → pretty-code (syntax highlight) → stringify
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      keepBackground: true,
      defaultLang: 'plaintext',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  let contentHtml = processedContent.toString();
  const readingTime = getReadingTime(content);

  // Extract headings for TOC
  const headings = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }

  // Inject id attributes into rendered heading tags for TOC + IntersectionObserver
  let headingIndex = 0;
  contentHtml = contentHtml.replace(/<(h[1-3])>/gi, (fullMatch, tag) => {
    if (headingIndex < headings.length) {
      const id = headings[headingIndex].id;
      headingIndex++;
      return `<${tag} id="${id}">`;
    }
    return fullMatch;
  });

  // Add lazy loading to images
  contentHtml = contentHtml.replace(/<img /g, '<img loading="lazy" ');

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    tags: data.tags || [],
    categories: data.categories || [],
    coverImage: data.coverImage || null,
    readingTime,
    contentHtml,
    headings,
  };
}

