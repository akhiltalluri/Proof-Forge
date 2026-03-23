# Proof Forge

A personal project for polishing rough real-analysis proofs. Paste an informal sketch, get back a structured proof with numbered steps and flagged gaps.

## What it does

You write something like:

> "Let $a_n \to L$. Since convergent sequences are bounded, $a_n$ is bounded. Therefore there exists $M$ such that $|a_n| \leq M$ for all $n$."

Proof Forge rewrites it into clean, step-by-step mathematical prose, flags anything hand-wavy ("clearly", "it follows", etc.), and pulls out the assumptions and conclusion so you can see the skeleton of your argument.

This is **structural assistance**, not formal verification — no Lean, no Coq, no correctness guarantees. I built this because I wanted a faster way to clean up my own proof drafts.

## Features

- Rewrites informal sketches into formal mathematical English
- Extracts numbered proof steps with explicit justifications
- Flags vague or unsupported claims that need citations
- Shows proof structure (assumptions / conclusion) at a glance
- Heuristic verification with a 0–100 score and suggested alternative strategies
- 38 built-in example proofs across several difficulty tiers
- LaTeX math input helpers, preview, and KaTeX rendering

## Prerequisites

Before you start, install or confirm the following on your machine.

### 1. Git

Used to clone the repository.

- **macOS:** Install [Xcode Command Line Tools](https://developer.apple.com/xcode/resources/) (`xcode-select --install`) or install Git from [git-scm.com](https://git-scm.com/).
- **Windows:** Install [Git for Windows](https://git-scm.com/download/win).
- **Linux:** e.g. `sudo apt install git` (Debian/Ubuntu) or use your distro’s package manager.

Check: `git --version`

### 2. Node.js and npm

The app runs on **Node.js 18 or newer** (LTS 20 or 22 is recommended). `npm` ships with Node.

- **All platforms:** Download the LTS installer from [nodejs.org](https://nodejs.org/), or use a version manager:
  - **nvm** (macOS/Linux): [github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm) — then `nvm install --lts`
  - **fnm** / **Volta:** similar workflow; pick one tool and follow its docs.

Check:

```bash
node -v   # should show v18.x.x or higher
npm -v
```

### 3. OpenAI API key

Proof Forge calls the OpenAI API (model: **gpt-4o-mini**). You need an account and a secret key.

1. Go to [platform.openai.com](https://platform.openai.com/) and sign in or create an account.
2. Open **API keys** and create a new key.
3. Store it somewhere safe — you will paste it into the app or into a local env file (see below).

Billing: API usage may incur charges on your OpenAI account according to their pricing.

---

## Project setup (step by step)

### Step 1 — Clone the repository

```bash
git clone https://github.com/akhiltalluri/Proof-Forge.git
cd Proof-Forge
```

You should now be in the `Proof-Forge` directory.

### Step 2 — Install dependencies

Install JavaScript packages listed in `package.json`:

```bash
npm install
```

This may take a minute. If `npm install` fails, try again on a stable network; avoid interrupting the download.

### Step 3 — (Optional) Configure the API key via environment file

You can skip this step if you prefer to enter the key only in the browser (see Step 5).

1. Copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` in an editor and set your key:

   ```env
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

3. **Do not commit `.env.local`.** It is gitignored by default in Next.js projects.

The server can read `OPENAI_API_KEY` from the environment when handling API routes (if your deployment wires it the same way).

### Step 4 — Run the development server

```bash
npm run dev
```

Wait until the terminal shows something like **Ready** and a local URL (by default port **3000**).

### Step 5 — Open the app and set the API key (if needed)

1. In a browser, open **http://localhost:3000**
2. If you did **not** use `.env.local`, click **Set API Key** (top-right), paste your OpenAI key, and save. The key is stored in your browser’s **local storage** for this site only.

You can now paste a proof sketch and use **Forge Proof**, or try **Load Example**.

### Step 6 — Production build (optional)

To verify a production build locally:

```bash
npm run build
npm run start
```

Then open **http://localhost:3000** again (default port for `next start` is also 3000 unless you set `PORT`).

---

## Troubleshooting

| Issue | What to try |
|--------|-------------|
| **Internal Server Error** or **Cannot find module** under `.next` | Stop the dev server, delete `.next` and `node_modules/.cache`, then run `npm run dev` again. |
| **Port 3000 in use** | Run `npx next dev -p 3001` or stop the other process using port 3000. |
| **API / quota errors** | Check your OpenAI key, billing, and rate limits on the OpenAI dashboard. |

---

## How it works

1. Paste an informal proof sketch (scoped to real analysis).
2. The server sends it to GPT-4o-mini with prompts for classification, polishing, verification, and (when needed) alternative strategies.
3. The model returns structured JSON — polished proof, steps, assumptions, conclusion, verification score, and any warnings.
4. The frontend renders math with KaTeX, tabbed views, and verification details.

## Domain

Currently focused on **real analysis**: sequences, limits, continuity, differentiation, integration, series, metric spaces.

## Built with

Next.js 15 · Tailwind CSS 4 · OpenAI API · KaTeX · TypeScript
