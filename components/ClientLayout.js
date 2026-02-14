'use client';

import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';
import TerminalWidget from '../components/TerminalWidget';

export default function ClientLayout({ children, posts, tags }) {
    return (
        <ThemeProvider>
            <Navbar />
            <CommandPalette posts={posts} tags={tags} />
            <main style={{ paddingTop: 'var(--nav-height)', position: 'relative', zIndex: 1, minHeight: '80vh' }}>
                {children}
            </main>
            <Footer />
            <TerminalWidget posts={posts} tags={tags} />
        </ThemeProvider>
    );
}
