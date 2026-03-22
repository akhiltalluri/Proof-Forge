# Proof Forge

Paste a rough proof in, get a cleaner formal proof out.

Proof Forge transforms informal real-analysis proof sketches into structured, rigorous mathematical prose and highlights steps that need stronger justification.

## Features

- **Proof rewriting** — converts rough sketches into clean, formal mathematical English
- **Step extraction** — breaks the proof into numbered logical steps with justifications
- **Weak-step flagging** — highlights vague claims ("clearly", "obviously", "it follows") that need citations or additional reasoning
- **Structure view** — shows assumptions and conclusion at a glance
- **LaTeX math rendering** — displays proper mathematical notation via KaTeX

## Getting started

### Prerequisites

- Node.js 18+
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Install and run

```bash
git clone https://github.com/your-user/Proof-Forge.git
cd Proof-Forge
npm install
```

Set your API key (pick one method):

```bash
# Option A: environment variable
cp .env.example .env.local
# edit .env.local and paste your key

# Option B: in-app
# Click "Set API Key" in the header after starting the app
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

1. You paste an informal proof sketch (real analysis domain).
2. The app sends it to OpenAI's GPT-4o-mini with a carefully engineered prompt.
3. The model returns a structured JSON response containing the polished proof, step breakdown, assumptions, conclusion, and any warnings.
4. The frontend renders everything with LaTeX math, tabbed views, and warning badges.

## Scope

This project covers **real analysis** proofs: sequences, limits, continuity, differentiation, integration, series, and metric spaces.

It provides **proof polishing and structural assistance**, not formal verification. It does not generate Lean/Coq code, prove new theorems, or guarantee correctness.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/) (GPT-4o-mini)
- [KaTeX](https://katex.org/) + react-markdown for math rendering
- TypeScript
