# Proof Forge

Proof Forge is a full-stack mathematical proof-writing assistant for students and self-learners who want help turning rough proof sketches into clearer, more structured arguments. It rewrites informal drafts, extracts proof structure, and provides heuristic feedback about weak spots in the reasoning, but it is not a formal proof verifier and does not guarantee correctness.

## Why I built it

I built Proof Forge from the experience of often having the right proof idea before having the right written proof. In proof-based math, understanding an argument and presenting it clearly are different skills, and I wanted a tool that could help bridge that gap while giving useful feedback on the draft itself.

## What it does

- Infers the likely proof style and broad mathematical domain of a draft
- Rewrites rough arguments into cleaner, more polished mathematical prose
- Extracts proof structure into explicit steps and justifications
- Flags weak spots such as missing justification, vague claims, or incomplete transitions
- Generates a heuristic verification score
- Suggests alternative proof strategies when a draft appears weak
- Stores proof history so past drafts can be revisited and reviewed later

## Supported proof styles

Proof Forge is built for general mathematical proof-writing rather than a single course or textbook. It supports work across multiple proof styles, including direct proofs, contradiction, contrapositive arguments, induction, epsilon-delta proofs, algebraic arguments, combinatorial proofs, set-theoretic identities, case analysis, and constructive arguments.

It also works across broad areas such as analysis, algebra, combinatorics, discrete math, topology, number theory, set theory, and geometry.

## How it works

1. Classify the likely proof style and mathematical domain.
2. Polish the draft into clearer, more structured prose.
3. Verify the argument heuristically for weak spots, missing justification, or incomplete reasoning.
4. Suggest alternatives when the proof appears weak.
5. Store the result so the proof can be revisited later.

## Live mode vs demo mode

### Live mode

Live mode uses the OpenAI API for model-backed proof rewriting, structure extraction, heuristic verification, and alternative-strategy generation. This is the main interactive forging path when an API key is available.

### Demo mode

Demo mode supports both canned demo fixtures and offline mock results for custom proof input. The canned fixtures are useful for predictable walkthroughs, and the offline mock pipeline lets the app run locally without API credits by generating heuristic placeholder results for arbitrary drafts. This mode is intended for screenshots, portfolio demos, and local testing. When demo mode is available, the forge page now defaults to it and exposes a visible `Demo | Live` selector in the UI.

Important: demo mode is illustrative, not authoritative. Mock outputs are heuristic approximations of the product flow and are not equivalent to live model-backed feedback.

## Tech stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API routes
- OpenAI API integration
- Prisma ORM
- PostgreSQL

### Rendering and text handling

- React Markdown
- KaTeX
- remark-math
- rehype-katex

## Getting started

1. Clone the repository:

```bash
git clone https://github.com/akhiltalluri/Proof-Forge.git
cd Proof-Forge
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment file for local development:

```bash
cp .env.example .env
```

4. Create a local PostgreSQL database and apply the Prisma migration:

```bash
createdb proof_forge
npx prisma migrate dev --name init_postgres
```

If your local Postgres username, password, host, or port differ from the example, update `DATABASE_URL` in `.env` before running the migration.

5. Choose how you want to run the app:

Demo setup:

Demo mode does not require an OpenAI API key, but the app still requires a PostgreSQL database via `DATABASE_URL`.

Live setup:

```env
OPENAI_API_KEY=your_key_here
```

You can also supply an API key from the UI and switch to Live mode from the forge page selector. Adding `OPENAI_API_KEY` in `.env` enables live forging server-side by default. If you prefer, you can keep database settings in `.env` and place only UI/runtime-specific overrides in `.env.local`.

6. Start the development server:

```bash
npm run dev
```

7. Open the app at [http://localhost:3000](http://localhost:3000).

## Deployment notes

- Set `DATABASE_URL` in your hosting provider for both build and runtime.
- Run `npx prisma migrate deploy` against the hosted PostgreSQL database before serving traffic.
- The checked-in Prisma migration is intended for fresh PostgreSQL databases. This repository no longer supports the old local SQLite file as an active datasource.

## Limitations

Proof Forge is not a formal proof assistant and does not prove that an argument is correct. Its verification is heuristic, not mathematically authoritative. Demo mode is a mock approximation of the full product flow, and output quality depends on the strength of the input draft and, in live mode, on the behavior of the underlying model.
