'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, X, Minus } from 'lucide-react';
import styles from './TerminalWidget.module.css';

const UNKNOWN_RESPONSES = [
    "bash: command not found. But have you tried reading a blog post instead?",
    "Segmentation fault (core dumped)... not really. Try 'help'.",
    "Error 418: I'm a teapot. Also, that's not a command.",
    "[WARN] Command not recognized. Dispatching carrier pigeon...",
    "Hmm, my threat intel doesn't cover that command. Try 'help'.",
    "0xDEADBEEF: Invalid instruction. No shells popped today.",
    "That's not in my kill chain. Type 'help' for recon.",
    "Connection refused. Just kidding — try 'help'.",
];

const HELP_TEXT = `Available commands:
  help          Show this help message
  ls / list     List all published posts
  cat <slug>    Read a post
  tags          Show all tags
  search <q>    Search posts
  recent        Show recent posts
  random        Open a random post
  count         Total published posts
  home          Go to home page
  about         Go to about page
  date          Current date/time
  uptime        Site uptime
  history       Command history
  whoami        Who are you?
  clear         Clear terminal
  exit          Close terminal`;

export default function TerminalWidget({ posts = [], tags = {} }) {
    const [open, setOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [lines, setLines] = useState([
        { type: 'system', text: 'Welcome to Asokakrsna\'s Thoughts Terminal v1.0' },
        { type: 'system', text: 'Type "help" for available commands.\n' },
    ]);
    const [input, setInput] = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const router = useRouter();

    // Auto-scroll to bottom
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [lines]);

    useEffect(() => {
        if (open && !minimized) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open, minimized]);

    const addLine = useCallback((type, text) => {
        setLines((prev) => [...prev, { type, text }]);
    }, []);

    const handleCommand = useCallback((cmd) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        addLine('input', `$ ${trimmed}`);
        setCmdHistory((prev) => [...prev, trimmed]);
        setHistoryIdx(-1);

        const parts = trimmed.split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        switch (command) {
            case 'help':
                addLine('output', HELP_TEXT);
                break;

            case 'ls':
            case 'list':
                if (posts.length === 0) {
                    addLine('output', 'No posts found.');
                } else {
                    const list = posts.map((p, i) => `  ${i + 1}. ${p.slug} — "${p.title}"`).join('\n');
                    addLine('output', list);
                }
                break;

            case 'cat':
                if (!args) {
                    addLine('error', 'Usage: cat <slug>');
                } else {
                    const post = posts.find((p) => p.slug.includes(args.toLowerCase()));
                    if (post) {
                        addLine('output', `Opening "${post.title}"...`);
                        setTimeout(() => router.push(`/blog/${post.slug}`), 500);
                    } else {
                        addLine('error', `Post not found: ${args}`);
                    }
                }
                break;

            case 'tags':
                const tagEntries = Object.entries(tags);
                if (tagEntries.length === 0) {
                    addLine('output', 'No tags found.');
                } else {
                    const tagList = tagEntries.map(([t, c]) => `  #${t} (${c})`).join('\n');
                    addLine('output', tagList);
                }
                break;

            case 'search':
                if (!args) {
                    addLine('error', 'Usage: search <query>');
                } else {
                    const matches = posts.filter((p) =>
                        p.title.toLowerCase().includes(args.toLowerCase()) ||
                        p.tags.some((t) => t.toLowerCase().includes(args.toLowerCase()))
                    );
                    if (matches.length === 0) {
                        addLine('output', `No results for "${args}".`);
                    } else {
                        const res = matches.map((p) => `  → ${p.slug} — "${p.title}"`).join('\n');
                        addLine('output', `Found ${matches.length} result(s):\n${res}`);
                    }
                }
                break;

            case 'recent':
                const recent = posts.slice(0, 5);
                if (recent.length === 0) {
                    addLine('output', 'No posts yet.');
                } else {
                    const list = recent.map((p) => `  → ${p.slug} — "${p.title}"`).join('\n');
                    addLine('output', `Recent posts:\n${list}`);
                }
                break;

            case 'random':
                if (posts.length === 0) {
                    addLine('output', 'No posts available.');
                } else {
                    const rand = posts[Math.floor(Math.random() * posts.length)];
                    addLine('output', `Opening "${rand.title}"...`);
                    setTimeout(() => router.push(`/blog/${rand.slug}`), 500);
                }
                break;

            case 'count':
                addLine('output', `Total published posts: ${posts.length}`);
                break;

            case 'home':
                addLine('output', 'Navigating home...');
                setTimeout(() => router.push('/'), 300);
                break;

            case 'about':
                addLine('output', 'Navigating to about...');
                setTimeout(() => router.push('/about'), 300);
                break;

            case 'date':
                addLine('output', new Date().toLocaleString());
                break;

            case 'uptime': {
                const firstPost = posts[posts.length - 1];
                if (firstPost) {
                    const days = Math.floor((Date.now() - new Date(firstPost.date)) / 86400000);
                    addLine('output', `Site has been running for ~${days} days (since ${firstPost.date.split('T')[0]})`);
                } else {
                    addLine('output', 'Unknown — no posts found.');
                }
                break;
            }

            case 'history':
                if (cmdHistory.length === 0) {
                    addLine('output', 'No command history yet.');
                } else {
                    const hist = cmdHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n');
                    addLine('output', hist);
                }
                break;

            case 'whoami':
                addLine('output', "You're a curious reader of Asokakrsna's Thoughts 👀");
                break;

            case 'sudo':
                if (args.startsWith('rm')) {
                    addLine('error', 'Nice try 😏 Permission denied.');
                } else {
                    addLine('output', 'Elevating privileges... just kidding. This is a blog.');
                }
                break;

            case 'clear':
                setLines([]);
                break;

            case 'exit':
                setOpen(false);
                break;

            default:
                addLine('error', UNKNOWN_RESPONSES[Math.floor(Math.random() * UNKNOWN_RESPONSES.length)]);
        }
    }, [posts, tags, cmdHistory, router, addLine]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const newIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
                setHistoryIdx(newIdx);
                setInput(cmdHistory[newIdx]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIdx >= 0) {
                const newIdx = historyIdx + 1;
                if (newIdx >= cmdHistory.length) {
                    setHistoryIdx(-1);
                    setInput('');
                } else {
                    setHistoryIdx(newIdx);
                    setInput(cmdHistory[newIdx]);
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const commands = ['help', 'ls', 'list', 'cat', 'tags', 'search', 'recent', 'random', 'count', 'home', 'about', 'date', 'uptime', 'history', 'whoami', 'sudo', 'clear', 'exit'];
            const match = commands.find((c) => c.startsWith(input.toLowerCase()));
            if (match) setInput(match);
        }
    };

    if (!open) {
        return (
            <button
                className={styles.trigger}
                onClick={() => setOpen(true)}
                aria-label="Open terminal"
                title="Open terminal"
            >
                <Terminal size={20} />
            </button>
        );
    }

    return (
        <div className={`${styles.terminal} ${minimized ? styles.minimized : ''}`}>
            <div className={styles.titleBar}>
                <div className={styles.dots}>
                    <span className={styles.dot} style={{ background: '#ff5f57' }} />
                    <span className={styles.dot} style={{ background: '#febc2e' }} />
                    <span className={styles.dot} style={{ background: '#28c840' }} />
                </div>
                <span className={styles.titleText}>terminal — asokakrsna</span>
                <div className={styles.titleActions}>
                    <button onClick={() => setMinimized(!minimized)} aria-label="Minimize">
                        <Minus size={14} />
                    </button>
                    <button onClick={() => setOpen(false)} aria-label="Close">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {!minimized && (
                <div className={styles.body}>
                    <div className={styles.output} ref={outputRef}>
                        {lines.map((line, i) => (
                            <div key={i} className={`${styles.line} ${styles[line.type]}`}>
                                <pre>{line.text}</pre>
                            </div>
                        ))}
                    </div>
                    <div className={styles.inputLine}>
                        <span className={styles.prompt}>$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            className={styles.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
