# AI-Assisted Frontend Development Starter

The fork-target scaffold for the Neurons Lab AI-Assisted Frontend Development course. Three framework variants (Vue 3, Svelte 5, React 19) sharing the same dataset, the same project structure, and the same Tailwind v4 + DaisyUI v5 + Vitest tooling, so you can pick a framework and follow the lessons without fighting setup.

> **Course:** [neurons-lab.pages.dev/courses/ai-frontend-dev](https://neurons-lab.pages.dev/courses/ai-frontend-dev)
> **Reference implementation:** [github.com/danieltofan/globe-explorer](https://github.com/danieltofan/globe-explorer)

## Prerequisites

- **Node.js 20.19+** or **22.12+**. Vite 7 requires recent Node. Check with `node --version`. If you're below 20.19, upgrade via [nodejs.org](https://nodejs.org/) or your version manager (nvm, fnm, volta).
- **npm 10+** (ships with Node 20+).
- **Git** for cloning your fork.
- **A GitHub account** for the fork.
- **A code editor.** VS Code is the smoothest pick; framework-specific extension recommendations are in each framework folder's README.

## How to use this

This is a **fork-only** repo. You do not clone it directly and you do not contribute back. You **fork it on GitHub**, clone your fork, and build in your fork.

```bash
# 1. Fork github.com/danieltofan/ai-frontend-dev-starter on GitHub (top-right Fork button)
# 2. Clone YOUR fork (substitute your username)
git clone https://github.com/YOUR-USERNAME/ai-frontend-dev-starter
cd ai-frontend-dev-starter

# 3. Pick a framework folder (vue / svelte / react)
cd vue                          # or svelte, or react

# 4. Install dependencies
npm install

# 5. Run the dev server
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see an "AI-Assisted Frontend Development Starter" welcome card followed by a **pre-assembled Module 1 Compare** reference (more on that below). That confirms the scaffold runs cleanly.

From there: open the Lab course, work through Module 0 setup lessons if you haven't, then start Module 1.

## Reference implementation: Module 1 Compare

One feature ships pre-assembled in all three framework folders:

| Framework | File |
|---|---|
| Vue | [`vue/src/features/compare/Compare.vue`](./vue/src/features/compare/Compare.vue) |
| React | [`react/src/features/compare/Compare.jsx`](./react/src/features/compare/Compare.jsx) |
| Svelte | [`svelte/src/features/compare/Compare.svelte`](./svelte/src/features/compare/Compare.svelte) |

Each implements the same UI — two country dropdowns, a swap button, and five bilateral metric progress bars sourced from the shipped 195-country dataset. The point is **verifiable cross-framework parity**: clone, `npm install`, `npm run dev`, see the same UI render in whichever framework folder you pick.

Diff the three files side by side to see how the same data flow expresses itself in each idiom (`ref` + `computed`, `useState` + `useMemo`, `$state` + `$derived`). When you start authoring Module 1 yourself, replace the `<Compare />` mount in `App.{vue,jsx,svelte}` with your own work.

**Scope:** the reference covers Module 1 Lessons 1–4 (data + dropdowns, comparison logic, progress bars, formatting + swap + flags). Lesson 5 (typeahead) is intentionally NOT pre-assembled — that's the workshop slice you build on top using AI, the same way the course was assembled. Modules 2, 3, and 4 (`hundred-people/`, `countries-cartogram/`, `language-space/`) do not ship completed components by design; their hand-curated data/assets are pre-shipped (`regions.js`, `countries.js`, `languages.js`) and you build the components on top by following the lessons.

**Note on flag rendering:** the country-header section uses image flags served from [flagcdn.com](https://flagcdn.com) (lazy-loaded, sized to `w160`) rather than emoji, so the visual is identical across all OSes — no Windows regional-indicator-pair limitation to work around. Dropdowns themselves show plain country names (the flag image lives in the header card).

## What's pre-shipped (and why)

The hand-curated datasets the course depends on:

| File | Used by | Size | Why pre-shipped |
|---|---|---|---|
| `src/shared/data/regions.js` | Compare (Module 1), 100 People (Module 2) | 100 lines | 100 People dataset; six categories per view-mode with people-counts. |
| `src/features/countries-cartogram/countries.js` | Cartogram (Module 3) | 412 lines, 195 countries | Hand-curated x/y for every country. AI cannot generate these; geographic placement requires human judgment (Module 3 lesson 1 goes deep on why). |
| `src/features/language-space/languages.js` | Language Space (Module 4) | 241 lines, 91 languages | Hand-curated 3D embedding positions + family classifications. |

Modules 2-4 do not ship completed components by design; their hand-curated data above is pre-shipped, and you build the visualization components on top by following the lessons. Module 1's `compare/` ships the pre-assembled reference (see [Reference implementation](#reference-implementation-module-1-compare) above) — overwrite when you start authoring.

## Structure (per framework folder)

```
<framework>/
├── package.json                      Vite + framework + Tailwind v4 + DaisyUI v5 + Vitest preinstalled
├── vite.config.js                    Plugin wiring + path alias (@ -> src/) + Vitest config
├── index.html                        Vite entry HTML
└── src/
    ├── main.{js,jsx}                 Mounts the App
    ├── App.{vue,svelte,jsx}          Welcome card + mounts the assembled Compare reference
    ├── style.css                     Tailwind v4 + DaisyUI v5 imports (@import + @plugin)
    ├── shared/
    │   └── data/
    │       └── regions.js            Pre-shipped
    └── features/
        ├── compare/                  Module 1; Compare + logic.js pre-assembled (Lessons 1-4 reference)
        │   ├── Compare.{vue,jsx,svelte}
        │   └── logic.js              formatNumber + getComparison + humanizeContinent
        ├── hundred-people/           Module 2 home (empty)
        ├── countries-cartogram/      Module 3 home; countries.js pre-shipped
        │   └── countries.js
        └── language-space/           Module 4 home; languages.js pre-shipped
            └── languages.js
```

Module slugs match the production Globe Explorer codebase (`compare`, `hundred-people`, `countries-cartogram`, `language-space`).

## What this scaffold does NOT include

- **No completed feature code for Modules 2-4.** No `HundredPeople`, no `Cartogram`, no `LanguageSpace`. You write those by following the lessons. (Module 1 `Compare` ships pre-assembled as the reference implementation — see the section above. It's the only exception.)
- **No pre-installed test suites.** Each lesson includes test code blocks; paste them into `<feature>.test.{js,jsx}` files alongside your feature. Vitest is configured to find and run them.
- **No routing or navigation across features.** Each framework folder's `App` shows one feature at a time. If you build multiple features and want a nav between them, you wire it yourself (or just edit `App` to import whichever you're working on right now).
- **No CI / GitHub Actions.** Local-only. You run `npm test` on your machine.
- **No CONTRIBUTING.md.** Fork-only model. PRs to this upstream get closed.
- **No deployment config.** Each `npm run build` produces a static `dist/` you can deploy anywhere (Cloudflare Pages, GitHub Pages, Vercel, Netlify). The course doesn't teach DevOps.

## Pick a framework

| If you... | Use | Per-framework README |
|---|---|---|
| ...already write Vue at work | `vue/` (Composition API + `<script setup>`) | [vue/README.md](./vue/README.md) |
| ...are curious about Svelte 5 runes | `svelte/` (Svelte 5 with `$state`, `$derived`, `$effect`) | [svelte/README.md](./svelte/README.md) |
| ...are most comfortable in React | `react/` (React 19 with hooks + StrictMode) | [react/README.md](./react/README.md) |
| ...want to compare frameworks | Pick one to lead, build Modules 1 and 2 there, then redo Module 1 in another. Lessons present all three side by side. | All three |

The folders are independent: installing in one doesn't affect the others. Each per-framework README covers install, dev/build/test commands, the wiring loop for your first feature, framework-specific gotchas, and troubleshooting.

## Updating from upstream

If the upstream starter (this repo) gets a meaningful update (new dependency version, fix in the scaffold), you can pull it into your fork:

```bash
git remote add upstream https://github.com/danieltofan/ai-frontend-dev-starter
git fetch upstream
git merge upstream/main
```

Most students will never need to do this. The starter is meant to be stable; the course content evolves on Lab, not in this repo.

## Common questions

**Do I need to install all three framework folders?**
No. Pick one. The folders are independent. `npm install` inside `vue/` only affects `vue/`; the other two are untouched until you run `npm install` in them.

**Can I do the course without ever running `npm install`?**
Sort of. The paid lessons include framework tabs that show the same lesson technique in Vue, React, and Svelte side by side, with runnable previews where the lesson needs them. You can read the lessons and compare the code without leaving the browser. The full hands-on experience (your own repo, your own tests, your own commits, your own deploy) means installing locally in your fork.

**What if I want to deploy my finished work?**
`npm run build` in any framework folder produces a static `dist/` directory. Drop that into Cloudflare Pages, GitHub Pages, Vercel, Netlify, or any static host. The course doesn't teach DevOps; that's intentional.

**Do I need to know all three frameworks?**
No. Pick one to lead. The paid lessons show Vue, React, and Svelte side by side in the framework tabs, so you'll see the contrasts even if you only build in one. Most students do one framework end to end, then maybe redo Module 1 in a second framework as a comparison exercise.

**Can I commit my work to my fork?**
Yes, that's the entire point. Your fork is your project. Commit, push, share with employers as a portfolio piece. The capstone (Module 5) explicitly references your fork's repo URL as a submission field for the optional showcase consent.

**What if `npm install` fails?**
Check your Node version (`node --version`). Vite 7 needs Node 20.19+ or 22.12+. The next-most-common cause is a network issue (firewall, corporate proxy). Per-framework READMEs have a Troubleshooting section with more specific cases.

## License

MIT. Use it however you want, including for paid client work.
