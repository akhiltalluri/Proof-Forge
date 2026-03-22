# Proof Forge

A proof-polishing tool for real analysis. Paste a rough sketch, get back a structured proof with numbered steps and flagged gaps.

## What it does

You write something like:

> "Let $a_n \to L$. Since convergent sequences are bounded, $a_n$ is bounded. Therefore there exists $M$ such that $|a_n| \leq M$ for all $n$."

Proof Forge rewrites it into clean, step-by-step mathematical prose, flags anything hand-wavy ("clearly", "it follows", etc.), and pulls out the assumptions and conclusion so you can see the skeleton of your argument.

This is **structural assistance**, not formal verification — no Lean, no Coq, no correctness guarantees.

## Features

- Rewrites informal sketches into formal mathematical English
- Extracts numbered proof steps with explicit justifications
- Flags vague or unsupported claims that need citations
- Shows proof structure (assumptions / conclusion) at a glance
- Renders LaTeX math via KaTeX

## Setup

**Requirements:** Node.js 18+ and an [OpenAI API key](https://platform.openai.com/api-keys).

```bash
git clone https://github.com/akhiltalluri/Proof-Forge.git
cd Proof-Forge
npm install
```

Configure your API key — either method works:

| Method | How |
|---|---|
| Environment variable | `cp .env.example .env.local` and add your key |
| In-app | Click **Set API Key** in the header once the app is running |

Then start the dev server:

```bash
npm run dev
```

The app runs at [localhost:3000](http://localhost:3000).

## How it works

1. User pastes an informal proof sketch (scoped to real analysis).
2. The server sends it to GPT-4o-mini with a prompt engineered for step decomposition, formal rewriting, and gap detection.
3. The model returns structured JSON — polished proof, steps, assumptions, conclusion, and any warnings.
4. The frontend renders it with KaTeX math, tabbed views, and inline warning badges.

## Domain

Currently scoped to **real analysis**: sequences, limits, continuity, differentiation, integration, series, metric spaces.

## Built with

Next.js 15 · Tailwind CSS 4 · OpenAI API · KaTeX · TypeScript
