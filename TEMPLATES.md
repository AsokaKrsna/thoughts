# Blog Post Templates

Ready-to-use templates for common post types. Copy any template below into `content/posts/your-slug.md`.

---

## 1. Standard Article

```markdown
---
title: "Your Article Title"
description: "A concise summary of what this article covers."
date: 2025-02-14
tags: [cybersecurity, ai]
---

## Introduction

Set the context. What problem are you addressing? Why does it matter?

## The Core Idea

Explain your main argument or finding. Use subheadings to break it up.

### Supporting Point 1

Details, evidence, examples.

### Supporting Point 2

More details. Include code if relevant:

```python
print("example")
```

## Implications

What does this mean for the reader? What should they do differently?

## Final Thoughts

Wrap up with a takeaway or call to action.
```

---

## 2. CTF / Hack Writeup

```markdown
---
title: "TryHackMe: Machine Name Writeup"
description: "Walkthrough of the Machine Name room on TryHackMe — covering recon, exploitation, and privilege escalation."
date: 2025-02-14
tags: [cybersecurity, ctf, writeups]
coverImage: /images/posts/machine-banner.png
---

## Overview

| Detail | Value |
|--------|-------|
| Platform | TryHackMe / HackTheBox |
| Difficulty | Medium |
| OS | Linux |
| Topics | SQLi, PrivEsc, Misconfiguration |

## Reconnaissance

```bash
nmap -sC -sV -oN nmap_initial.txt 10.10.x.x
```

Key findings from the scan:
- Port 22 (SSH)
- Port 80 (HTTP — Apache)
- Port 3306 (MySQL)

## Enumeration

What you found on the web server, directory busting, etc.

```bash
gobuster dir -u http://10.10.x.x -w /usr/share/wordlists/dirb/common.txt
```

## Exploitation

Step-by-step exploitation path with commands and screenshots.

## Privilege Escalation

How you went from user to root.

```bash
sudo -l
# Output showing vulnerable binary
```

## Flags

- **User flag**: `abcdef1234567890`
- **Root flag**: `0987654321fedcba`

## Lessons Learned

What was interesting about this box? What techniques should you remember?
```

---

## 3. Tool / Tech Review

```markdown
---
title: "Tool Name: An Honest Review"
description: "My experience using Tool Name for X — the good, the bad, and the alternatives."
date: 2025-02-14
tags: [tools, development]
---

## What Is It?

One-paragraph description of the tool and what problem it solves.

## Setup

```bash
# Installation commands
pip install toolname
```

## What I Liked

- **Feature 1** — Why it's great
- **Feature 2** — How it saved time
- **Feature 3** — Unique differentiator

## What Could Be Better

- **Issue 1** — What's missing or annoying
- **Issue 2** — Performance concerns

## Alternatives

| Tool | Pros | Cons |
|------|------|------|
| Tool A | Fast, free | Limited features |
| Tool B | Feature-rich | Expensive |
| This tool | Balanced | Some rough edges |

## Verdict

Who should use this? Would I recommend it? Rating out of 10.
```

---

## 4. Certification Experience

```markdown
---
title: "My Experience with Cert Name (e.g., OSCP, SAL1)"
description: "Preparation strategy, exam tips, and honest thoughts on the certification."
date: 2025-02-14
tags: [cybersecurity, certification]
---

## Background

Your experience level going in. Why you chose this cert.

## Preparation

### Resources Used

- **Course/Book 1** — How helpful it was
- **Course/Book 2** — What you learned
- **Labs/Practice** — Hours spent, what you practiced

### Study Timeline

| Week | Focus Area |
|------|-----------|
| 1-2 | Fundamentals |
| 3-4 | Hands-on labs |
| 5-6 | Practice exams |

## Exam Day

- Format (MCQ, practical, time limit)
- Your strategy
- What surprised you

## Tips for Future Candidates

1. **Tip 1** — Specific, actionable advice
2. **Tip 2** — Common mistakes to avoid
3. **Tip 3** — Resource recommendations

## Was It Worth It?

Honest assessment. Would you do it again?
```

---

## 5. Quick Tip / TIL (Today I Learned)

```markdown
---
title: "TIL: Short Descriptive Title"
description: "A quick tip about X that saved me hours."
date: 2025-02-14
tags: [development, til]
---

## The Problem

What you were trying to do and what went wrong.

## The Fix

```bash
# The one-liner or config that fixed it
command --flag value
```

## Why It Works

Brief explanation of the underlying mechanism.

## References

- [Link to docs](https://example.com)
- [Related Stack Overflow](https://stackoverflow.com)
```

---

## 6. Opinion / Analysis

```markdown
---
title: "Why X Matters More Than You Think"
description: "An analysis of X and its implications for Y."
date: 2025-02-14
tags: [ai, privacy, opinion]
---

## The Situation

What happened? Set the scene with facts.

## Why It Matters

Your analysis. What are most people missing?

## The Bigger Picture

Connect to broader trends. What does this signal?

## What Happens Next

Predictions or scenarios. Be specific.

## My Take

Your personal position and reasoning.
```

---

## Quick Reference

| Field | Required | Notes |
|-------|----------|-------|
| `title` | ✅ | Keep under 60 chars for SEO |
| `description` | ✅ | 120-160 chars ideal |
| `date` | ✅ | Format: YYYY-MM-DD |
| `tags` | ✅ | Array, lowercase recommended |
| `categories` | ❌ | Optional grouping |
| `coverImage` | ❌ | Path: `/images/posts/file.png` |
| `published` | ❌ | Set `false` for drafts |
