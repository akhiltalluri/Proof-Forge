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

Then open: [http://localhost:3000](http://localhost:3000)

### 5. Optional production build check

```bash
npm run build
npm run start
```

## Demo Mode

Demo mode is the easiest way to run Proof Forge without relying on OpenAI credits.

When demo mode is enabled, the Forge page shows `Run Demo` buttons. Those buttons return canned proof results from local fixtures instead of making a live API call. This is useful for testing the UI, recording a walkthrough, taking screenshots, or letting someone explore the project without first setting up an API key.

### Exactly where to configure it

Demo mode is configured through the file:

```text
Proof-Forge/.env.local
```

That file lives in the project root, meaning the same folder that contains:

- `package.json`
- `README.md`
- `prisma/`
- `src/`

If `.env.local` does not exist yet, create it in the project root.

### Step-by-step setup

1. Open a terminal in the repository root:

```bash
cd /path/to/Proof-Forge
```

2. Create `.env.local` from the example file:

```bash
cp .env.example .env.local
```

After this command, you should have:

```text
Proof-Forge/.env.local
```

3. Open `Proof-Forge/.env.local` in your editor.

4. Change the demo flag from `false` to `true`.

Your file should contain at least:

```env
DEMO_MODE=true
```

If you want demo mode only, this is enough:

```env
DEMO_MODE=true
```

If you want both demo mode and live API usage in the same app, use:

```env
OPENAI_API_KEY=sk-your-real-key-here
DEMO_MODE=true
```

### What each setting means

`DEMO_MODE=true`

- turns on the demo fixtures
- enables `Run Demo` buttons on the Forge page
- lets you load canned proof results without calling OpenAI

`OPENAI_API_KEY=...`

- is optional for demo mode
- is only needed if you also want to use the normal live Forge flow
- can be omitted entirely if you only care about demo fixtures

### Important: restart after editing `.env.local`

Next.js reads `.env.local` when the dev server starts. If the server is already running, simply saving the file is not enough.

After changing `.env.local`, stop and restart the app:

```bash
npm run dev
```

If you already had the dev server running, stop it first with `Ctrl+C`, then run:

```bash
npm run dev
```

### How to verify demo mode is working

1. Start the app:

```bash
npm run dev
```

2. Open:

```text
http://localhost:3000
```

3. Go to the Forge page if you are not already there.

4. Look for these two signs:

- a small message near the top saying demo mode is on
- a `Demo Mode` panel with several `Run Demo` buttons

If you see those, the app has picked up `DEMO_MODE=true` correctly.

### What the demo buttons do

The demo buttons load canned proof outputs instantly. They are meant to simulate the full Forge experience without depending on live model calls.

Current demo fixtures include:

- direct proof
- contradiction proof
- induction proof
- epsilon-delta proof
- algebraic proof
- combinatorial proof
- set-theoretic proof

### Common setup mistakes

If demo mode does not appear, check these first:

- you edited `.env.example` instead of `.env.local`
- `.env.local` is not in the project root
- `DEMO_MODE` is still set to `false`
- you did not restart `npm run dev` after editing the file
- you are looking at an old browser tab or stale dev server

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
