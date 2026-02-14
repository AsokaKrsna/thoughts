'use client';

import { useEffect } from 'react';

export default function CodeCopyButton() {
    useEffect(() => {
        const codeBlocks = document.querySelectorAll('pre');

        codeBlocks.forEach((pre) => {
            if (pre.querySelector('.copy-btn')) return;

            // pre already has position:relative from globals.css
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.textContent = 'Copy';
            btn.setAttribute('aria-label', 'Copy code');

            btn.addEventListener('click', async () => {
                const code = pre.querySelector('code');
                const text = code ? code.textContent : pre.textContent;
                await navigator.clipboard.writeText(text);
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });

            pre.appendChild(btn);
        });
    }, []);

    return null;
}
