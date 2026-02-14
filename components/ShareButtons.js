'use client';

import { Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import styles from './ShareButtons.module.css';

export default function ShareButtons({ title, slug }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== 'undefined' ? window.location.href : '';

    const share = (platform) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);

        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        };

        window.open(urls[platform], '_blank', 'width=600,height=400');
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>Share</span>
            <div className={styles.buttons}>
                <button onClick={() => share('twitter')} className={styles.btn} title="Share on Twitter">
                    <Twitter size={16} />
                </button>
                <button onClick={() => share('linkedin')} className={styles.btn} title="Share on LinkedIn">
                    <Linkedin size={16} />
                </button>
                <button onClick={copyLink} className={styles.btn} title="Copy link">
                    {copied ? <Check size={16} /> : <Link2 size={16} />}
                </button>
            </div>
        </div>
    );
}
