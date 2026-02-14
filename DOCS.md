# Asokakrsna's Thoughts — Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Deployment](#deployment)
- [Writing Posts](#writing-posts)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture)

---

## Project Overview

| Item | Detail |
|------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | CSS Modules + globals.css |
| Content | Markdown files in `content/posts/` |
| Fonts | Inter + JetBrains Mono (next/font) |
| Syntax | rehype-pretty-code + shiki (github-dark) |
| 3D | Three.js particle network (homepage) |
| Comments | Giscus (GitHub Discussions) |
| Hosting | Vercel (free tier) |

---

## Deployment

### First-Time Deploy to Vercel

1. **Push to GitHub**
   ```bash
   cd thoughts
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/AsokaKrsna/thoughts.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your `AsokaKrsna/thoughts` repo
   - Framework preset: **Next.js** (auto-detected)
   - Click **Deploy** — no env vars needed

3. **Custom Domain** (optional)
   - Vercel Dashboard → Project → Settings → Domains
   - Add your domain → update DNS records as shown

### Subsequent Deploys

Every `git push` to `main` auto-deploys. That's it.

```bash
git add .
git commit -m "New post: my-article"
git push
```

### Preview Deployments

Every branch/PR gets its own preview URL automatically.

---

## Writing Posts

### The Basics

1. Create a `.md` file in `content/posts/`
2. Add frontmatter (see templates below)
3. Write content in standard Markdown
4. Push to GitHub → auto-deploys

### Frontmatter Reference

```yaml
---
title: "Your Post Title"          # Required
description: "Brief summary"      # Required (used in cards + SEO)
date: 2025-02-14                  # Required (YYYY-MM-DD)
tags: [cybersecurity, ai]         # Required (used for colors + filtering)
categories: [writeups]            # Optional
coverImage: /images/posts/img.png # Optional (hero image)
published: false                  # Optional (set to false for drafts)
---
```

### Images

1. Place images in `public/images/posts/`
2. Reference in markdown: `![Alt text](/images/posts/filename.png)`
3. For cover images: add `coverImage` to frontmatter
4. Supported: PNG, JPG, WebP, AVIF, GIF, SVG

### Code Blocks

Use fenced code blocks with a language tag:

````
```python
print("Hello, world!")
```
````

Supported languages: python, javascript, bash, yaml, sql, json, css, html, go, rust, c, cpp, java, and [200+ more](https://shiki.matsu.io/languages).

### Drafts

Set `published: false` in frontmatter. The post won't appear in listings or build output, but stays in the repo for later.

### Tags & Colors

Tags auto-map to accent colors via `lib/tagColors.js`. The default mapping:

| Tag | Hue | Color |
|-----|-----|-------|
| cybersecurity | 0 | Red |
| ai | 260 | Purple |
| privacy | 160 | Teal |
| development | 200 | Blue |
| tools | 30 | Orange |

To add a new tag color, edit `lib/tagColors.js`:
```javascript
const TAG_COLORS = {
  // ...existing
  'blockchain': 45,  // amber
};
```

Unknown tags get a random but consistent hue based on string hash.

---

## Maintenance

### Adding Features

| Want to... | Do this |
|------------|---------|
| Add a new page | Create `app/pagename/page.js` |
| Add a component | Create in `components/`, import where needed |
| Change theme colors | Edit CSS vars in `app/globals.css` |
| Change fonts | Edit `app/layout.js` (next/font imports) |
| Change syntax theme | Edit `lib/posts.js` → `theme: 'github-dark'` to any [shiki theme](https://shiki.matsu.io/themes) |
| Update favicon | Replace `public/favicon.svg` |
| Edit OG image | Edit `app/opengraph-image.js` |
| Edit 404 page | Edit `app/not-found.js` + `.module.css` |

### Setting Up Giscus Comments

1. Go to [giscus.app](https://giscus.app)
2. Enter repo: `AsokaKrsna/thoughts`
3. Enable **GitHub Discussions** on the repo (Settings → Features → Discussions)
4. Select category: **Announcements**
5. Copy `repoId` and `categoryId`
6. Paste into `components/Comments.js`:
   ```javascript
   repoId="YOUR_REPO_ID"
   categoryId="YOUR_CATEGORY_ID"
   ```

### Updating Dependencies

```bash
npm outdated          # Check for updates
npm update            # Update within semver ranges
npx npm-check-updates # Check for major updates (install with -g first)
```

### Content Backup

Your content lives in `content/posts/` as plain `.md` files. They work in:
- Any Markdown editor
- Obsidian (just point vault to `content/posts/`)
- GitHub (rendered natively)

---

## Troubleshooting

### Build Fails

```bash
# Clean build cache
rm -rf .next
npm run build

# If module errors
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `useSearchParams() should be wrapped in Suspense` | Client hook in server tree | Wrap component in `<Suspense>` |
| `Module not found` | Missing dependency | `npm install <package>` |
| `Invalid frontmatter` | YAML syntax error | Check colons, quotes, indentation |
| Posts not appearing | `published: false` or bad date | Check frontmatter |
| Images not loading | Wrong path | Must start with `/images/posts/` |
| Code not highlighted | Missing language tag | Add language after ``` |
| TOC not scrolling | Missing heading IDs | Headings auto-get IDs at build time |

### Dev Server Issues

```bash
# Port in use
npx kill-port 3000
npm run dev

# Stuck cache
rm -rf .next && npm run dev
```

### Vercel Deploy Issues

- Check build logs: Vercel Dashboard → Deployments → click failed deploy
- Most issues are build errors — run `npm run build` locally first
- If env vars needed, add in Vercel Dashboard → Settings → Environment Variables

---

## Architecture

```
thoughts/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout (fonts, metadata)
│   ├── globals.css          # Design system + prose styles
│   ├── page.js              # Home page
│   ├── blog/
│   │   ├── page.js          # Blog listing
│   │   └── [slug]/
│   │       ├── page.js      # Individual post (server)
│   │       └── PostContent.js # Post renderer (client)
│   ├── about/page.js        # About page
│   ├── not-found.js         # 404 page (dramatic glitch)
│   ├── sitemap.js           # Auto-generated sitemap
│   ├── feed.xml/route.js    # RSS feed
│   └── opengraph-image.js   # Dynamic OG image
├── components/              # Reusable components
│   ├── Navbar.js            # Navigation
│   ├── BlogCard.js          # Post card
│   ├── TagPill.js           # Tag badge
│   ├── TableOfContents.js   # Floating TOC
│   ├── CommandPalette.js    # Ctrl+K search
│   ├── TerminalWidget.js    # Easter egg terminal
│   ├── ParticleBackground.js # Three.js particles
│   ├── CodeCopyButton.js    # Copy button for code blocks
│   ├── Comments.js          # Giscus comments
│   ├── RelatedPosts.js      # Tag-matched related posts
│   └── ...
├── content/posts/           # Your blog posts (.md)
├── lib/                     # Utilities
│   ├── posts.js             # Markdown → HTML pipeline
│   ├── tagColors.js         # Tag → color mapping
│   └── utils.js             # Helpers (formatDate, readingTime)
└── public/                  # Static assets
    ├── favicon.svg
    └── images/posts/        # Blog images
```

### Key URLs

| URL | What |
|-----|------|
| `/` | Homepage with particles + recent posts |
| `/blog` | All posts with search + tag filter |
| `/blog/[slug]` | Individual post |
| `/about` | About page |
| `/feed.xml` | RSS feed |
| `/sitemap.xml` | Sitemap |

### Easter Eggs

- **Ctrl+K** — Command palette (fuzzy search)
- **Terminal widget** — Floating terminal in bottom-right, type `help` for commands
