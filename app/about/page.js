import { getAllPosts, getAllTags } from '../../lib/posts';
import ClientLayout from '../../components/ClientLayout';
import styles from './about.module.css';

export const metadata = {
    title: 'About',
    description: 'About Asokakrsna\'s Thoughts',
};

export default function AboutPage() {
    const posts = getAllPosts();
    const tags = getAllTags();

    return (
        <ClientLayout posts={posts} tags={tags}>
            <div className={styles.page}>
                <h1 className={styles.title}>About</h1>
                <div className={styles.content}>
                    <p>
                        Hey, I&apos;m <strong>Asokakrsna</strong> — a cybersecurity researcher, builder, and someone who thinks a lot
                        about security, AI, and the intersection of technology and society.
                    </p>
                    <p>
                        This is my digital notebook. A place where I dump thoughts — sometimes structured,
                        sometimes raw, sometimes incomplete. You'll find cybersecurity writeups, certification
                        experiences, AI opinions, and whatever else is occupying my headspace.
                    </p>
                    <p>
                        I believe in learning in public and sharing knowledge freely. If something here helps
                        you or sparks a thought, that&apos;s a win.
                    </p>
                    <h2>The Stack</h2>
                    <p>
                        This blog is built with <strong>Next.js</strong>, styled with hand-written CSS,
                        and deployed on <strong>Vercel</strong>.
                        Posts are written in plain Markdown using <strong>Obsidian</strong>.
                        The Three.js particle network in the background represents the interconnected
                        nature of cybersecurity — everything is linked.
                    </p>
                    <h2>Get in Touch</h2>
                    <p>
                        Find me on <a href="https://github.com/AsokaKrsna" target="_blank" rel="noopener noreferrer">GitHub</a>,
                        or reach out via <a href="https://x.com/Durjoy_02" target="_blank" rel="noopener noreferrer">Twitter</a>.
                        Also, try pressing <kbd>Ctrl+K</kbd> anywhere on the site. And check the bottom-right corner. 😉
                    </p>
                </div>
            </div>
        </ClientLayout>
    );
}
