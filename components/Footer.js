import { Github, Twitter, Linkedin, Heart } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <p className={styles.copy}>
                        © {new Date().getFullYear()} Asokakrsna's Thoughts
                    </p>
                    <p className={styles.madeWith}>
                        Made with <Heart size={14} className={styles.heart} />
                    </p>
                </div>
                <div className={styles.socials}>
                    <a href="https://github.com/AsokaKrsna" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
                        <Github size={18} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialLink}>
                        <Twitter size={18} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
                        <Linkedin size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
