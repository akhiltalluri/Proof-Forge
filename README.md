# Proof Forge

A personal project for turning rough mathematical proof sketches into clearer, more structured arguments.

Proof Forge is a proof-writing assistant, not a formal theorem prover. You paste an informal argument, and the app classifies the proof style, rewrites it into more readable mathematical prose, surfaces possible gaps, and suggests alternative strategies when the draft looks weak.

## Why I Built This

I built Proof Forge because I often had the right proof idea but not the cleanest written presentation. I wanted a tool that could help turn rough mathematical arguments into clearer, more structured proofs while surfacing gaps in justification.

## What It Supports

Proof Forge is framed around mathematical proof-writing in general rather than one course.

It is designed to help with:

- direct proofs
- contradiction proofs
- contraposition
- induction
- epsilon-delta arguments
- algebraic arguments
- combinatorial proofs
- set-theoretic identities
- case analysis and constructive arguments

It also tags broad mathematical domains such as:

- analysis
- algebra
- combinatorics
- discrete math
- topology
- number theory
- set theory
- geometry

## Features

- Rewrites rough proof sketches into cleaner mathematical prose
- Extracts numbered proof steps with explicit justifications
- Infers proof type and broad mathematical domain
- Flags weak spots such as unjustified implications, vague existence claims, skipped algebra, or missing induction structure
- Produces a heuristic verification score and vulnerability list
- Suggests alternative approaches when a proof draft looks weak
- Includes labeled example proofs across multiple branches of mathematics
- Includes a real demo mode with canned outputs for screenshots, testing, and portfolio demos
- Stores proof history in SQLite so you can revisit, filter, and re-forge old drafts
- Renders math with KaTeX and supports symbol helpers plus LaTeX preview

## Demo Mode

Demo mode is the easiest way to try the app without spending API credits.

When it is enabled, the Forge page exposes `Run Demo` buttons that return canned proof results instead of calling OpenAI. The point is to let you test the UI, inspect proof tabs, record walkthroughs, and take screenshots with stable outputs.

### How to set it up

1. Create a local env file if you do not already have one:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and turn demo mode on:

```env
DEMO_MODE=true
```

3. Decide whether you want demo-only mode or demo + live mode:

Demo-only mode:

```env
DEMO_MODE=true
```

Demo + live API mode:

```env
OPENAI_API_KEY=sk-your-real-key-here
DEMO_MODE=true
```

If `OPENAI_API_KEY` is omitted, the demo buttons will still work, but live forging will require entering a key in the UI later.

4. Restart the dev server after changing `.env.local`:

```bash
npm run dev
```

5. Open the app:

```text
http://localhost:3000
```

### What you should see

If setup worked correctly, the Forge page will show a small demo-mode message near the top and a `Demo Mode` box with several `Run Demo` buttons.

Those demo buttons load canned proof results instantly, including:

- direct proof
- contradiction proof
- induction proof
- epsilon-delta proof
- algebraic proof
- combinatorial proof
- set-theoretic proof

### What demo mode does and does not do

Demo mode does:

- let you test the main product flow without API credits
- let you inspect proof tabs, verification output, and suggestions
- make screenshots and videos easier because outputs are predictable

Demo mode does not:

- replace the live model entirely
- test actual OpenAI responses
- measure model quality

It is a parallel no-credit path for testing. If you also set `OPENAI_API_KEY`, you can use both demo fixtures and normal live forging in the same local app.

## Architecture

- Frontend: Next.js App Router, React, TypeScript
- Backend: Next.js API routes
- LLM pipeline: classify -> polish -> verify -> suggest
- Persistence: SQLite + Prisma
- Rendering: React Markdown + KaTeX

## Project Setup

### 1. Clone the repo

```bash
git clone https://github.com/akhiltalluri/Proof-Forge.git
cd Proof-Forge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure local environment

Copy the example env file:

```bash
cp .env.example .env.local
```

Then set the values you want:

```env
OPENAI_API_KEY=sk-your-real-key-here
DEMO_MODE=true
```

`OPENAI_API_KEY` is optional if you only want to use demo mode.

### 4. Start the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### 5. Optional production build check

```bash
npm run build
npm run start
```

## Proof History

The archive is meant to feel like proof history, not just storage.

You can:

- save forged proofs automatically
- search archived drafts
- filter by proof type
- filter by mathematical domain
- re-forge an old proof
- duplicate an old draft and keep editing

## Limitations

Proof Forge is intentionally honest about what it is and is not.

It is:

- structural assistance
- proof-writing support
- heuristic feedback
- drafting and revision help

It is not:

- guaranteed mathematical correctness
- a formal proof assistant
- theorem proving
- a replacement for Lean, Coq, or other formal verification systems

Important caveats:

- It may miss subtle logical gaps.
- It may overstate confidence in a weak draft.
- Quality depends heavily on the input proof and mathematical context.
- You should always verify results independently before relying on them.

## Product Notes

Some of the small UX choices in the app are there to make it feel more like a real tool:

- staged loading states for classification, polishing, verification, and suggestions
- proof-type and domain tags
- demo fixtures for portfolio-friendly testing
- proof history and re-forging flows
- copy/export actions for polished proofs

## Built With

Next.js 15 · React 19 · TypeScript · OpenAI API · Prisma · SQLite · KaTeX
