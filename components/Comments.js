'use client';

import Giscus from '@giscus/react';
import { useTheme } from './ThemeProvider';

export default function Comments() {
    const { theme } = useTheme();

    return (
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
            <Giscus
                repo="AsokaKrsna/thoughts"
                repoId="R_kgDORQZn_g"
                category="Announcements"
                categoryId="DIC_kwDORQZn_s4C2cGC"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={theme === 'dark' ? 'dark_dimmed' : 'light'}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
