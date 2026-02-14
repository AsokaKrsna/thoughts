'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/blog', label: 'Blog' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo}>
                    <Terminal size={20} className={styles.logoIcon} />
                    <span className={styles.logoText}>Asokakrsna</span>
                </Link>

                <div className={styles.right}>
                    <div className={`${styles.links} ${mobileOpen ? styles.open : ''}`}>
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        <kbd className={styles.searchHint} title="Press ⌘K or Ctrl+K to search">
                            <span>⌘K</span>
                        </kbd>
                        <ThemeToggle />
                    </div>

                    <button
                        className={styles.burger}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className={styles.mobileMenu}>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.mobileLink} ${pathname === link.href ? styles.active : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
