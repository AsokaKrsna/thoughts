# >_thoughts

A modern, elegant personal blog to share Markdown notes on the web — built with Next.js.

**[Live →](https://asokakrsna.vercel.app)**

## The Story Behind the Scene

Let's keep it short. As a cybersecurity student I always felt the necessity of a centralized notebook. I used many tools and got settled with Notion note with time. I still use Notion note but there are some questions killing me inside. What if my notes cross the block limit and I get kicked out of my own notes, my knowledge base. What is they remove the free tier plan! What if I plan to move from notion? They have a export feature still... And yeah while offline I cant access my notes. I cant read my notes outside notion. Can't share them freely. Notion is a great and powerful app. I am grateful to the team to make my life easier but I cant find answer of those. So slowly I started using obsidian to keep more control over my notes. Now I was missing the backup and across device readability. I found the git plugin and it resolved the backup issue. Still the readability issue persist and this project aims to solve that. Hope you people will also love it.

Yeah the project is build with the help of AI.

## Features

- 📝 **Markdown-first** — Write posts in `.md` files, works with Obsidian
- 🎨 **Dark/Light mode** — System-aware with manual toggle
- 🔍 **Command Palette** — `Ctrl+K` fuzzy search across all posts
- 🏷️ **Tag filtering** — Color-coded tags with accent hues
- � **Comments** — Giscus (GitHub Discussions)
- 📊 **Reading progress** — Scroll progress bar on posts
- 📋 **Table of Contents** — Floating, sticky, auto-highlights current section
- ✨ **Syntax highlighting** — 200+ languages via shiki (github-dark theme)
- 📋 **Code copy button** — Hover to reveal, click to copy
- 🌐 **SEO-ready** — Sitemap, RSS feed, Open Graph images, meta tags
- 🎮 **Dramatic 404** — Glitch effects, countdown, matrix rain, redirect
- 🖥️ **Terminal Easter egg** — Floating widget, type `help`
- ⚡ **Fast** — Static generation, lazy loading, optimized fonts

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Writing Posts

Create a `.md` file in `content/posts/`:

```yaml
---
title: "Your Post Title"
description: "Brief summary for cards and SEO."
date: 2025-02-14
tags: [cybersecurity, ai]
---

Your content here. Supports **GFM**, code blocks, images, tables...
```

See [TEMPLATES.md](TEMPLATES.md) for ready-to-use templates (writeups, reviews, TILs, etc).

## Deploy

Push to GitHub → import on [Vercel](https://vercel.com/new) → done. Every `git push` auto-deploys.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | CSS Modules + design tokens |
| Content | gray-matter + unified + rehype-pretty-code |
| 3D | Three.js / react-three-fiber |
| Comments | Giscus |
| Fonts | Inter + JetBrains Mono (next/font) |
| Hosting | Vercel |

## Docs

See [DOCS.md](DOCS.md) for deployment, maintenance, troubleshooting, and architecture details.

## License

MIT

## Acknowledgements

- The Notion team for introducing me to the cool note-taking world.
- The Obsidian team for their wonderful note-taking application.
- The developers of the open-source libraries used in this project.