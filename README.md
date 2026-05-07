# Framework Battle Starter

The fork-target scaffold for the Neurons Lab Framework Battle course. Three framework variants (Vue 3, Svelte 5, React 19) sharing the same dataset, the same project structure, and the same Tailwind v4 + DaisyUI v5 + Vitest tooling, so you can pick a framework and build along with the lessons without fighting setup.

> **Course:** [neurons-lab.pages.dev/courses/framework-battle](https://neurons-lab.pages.dev/courses/framework-battle)
> **Reference implementation:** [github.com/danieltofan/globe-explorer](https://github.com/danieltofan/globe-explorer)

## How to use this

This is a **fork-only** repo. You do not clone it directly and you do not contribute back. You **fork it on GitHub**, clone your fork, and build in your fork.

```bash
# 1. Fork github.com/danieltofan/framework-battle-starter on GitHub (top-right Fork button)
# 2. Clone YOUR fork (substitute your username)
git clone https://github.com/YOUR-USERNAME/framework-battle-starter
cd framework-battle-starter

# 3. Pick a framework folder (vue / svelte / react)
cd vue                          # or svelte, or react

# 4. Install dependencies
npm install

# 5. Run the dev server
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see a "Framework Battle Starter" welcome card. That confirms the scaffold runs cleanly.

From there: open the Lab course, work through Module 0 setup lessons if you haven't, then start Module 1.

## What's pre-shipped (and why)

The hand-curated datasets the course depends on:

| File | Used by | Size | Why pre-shipped |
|---|---|---|---|
| `src/shared/data/regions.js` | Compare (Module 1), 100 People (Module 2) | 100 lines | 100 People dataset; six categories per view-mode with people-counts. |
| `src/features/countries-cartogram/countries.js` | Cartogram (Module 3) | 412 lines, 195 countries | Hand-curated x/y for every country. AI cannot generate these; geographic placement requires human judgment (Module 3 lesson 1 goes deep on why). |
| `src/features/language-space/languages.js` | Language Space (Module 4) | 241 lines, 91 languages | Hand-curated 3D embedding positions + family classifications. |

Everything else is empty by design. You build the features.

## Structure (per framework folder)

```
<framework>/
├── package.json                      Vite + framework + Tailwind v4 + DaisyUI v5 + Vitest preinstalled
├── vite.config.js                    Plugin wiring + path alias (@ -> src/) + Vitest config
├── index.html                        Vite entry HTML
└── src/
    ├── main.{js,jsx}                 Mounts the App
    ├── App.{vue,svelte,jsx}          Placeholder welcome card; replace as you build
    ├── style.css                     Tailwind v4 + DaisyUI v5 imports (@import + @plugin)
    ├── shared/
    │   └── data/
    │       └── regions.js            Pre-shipped
    └── features/
        ├── compare/                  Module 1 home (empty)
        ├── hundred-people/           Module 2 home (empty)
        ├── countries-cartogram/      Module 3 home; countries.js pre-shipped
        │   └── countries.js
        └── language-space/           Module 4 home; languages.js pre-shipped
            └── languages.js
```

Module slugs match the production Globe Explorer codebase (`compare`, `hundred-people`, `countries-cartogram`, `language-space`).

## What this scaffold does NOT include

- **No completed feature code.** No `Compare.vue`, no `Cartogram.svelte`, no `LanguageSpace.jsx`. You write those by following the lessons.
- **No pre-installed test suites.** Each lesson includes test code blocks; paste them into `<feature>.test.{js,jsx}` files alongside your feature. Vitest is configured to find and run them.
- **No routing or navigation across features.** Each framework folder's `App` shows one feature at a time. If you build multiple features and want a nav between them, you wire it yourself (or just edit `App` to import whichever you're working on right now).
- **No CI / GitHub Actions.** Local-only. You run `npm test` on your machine.
- **No CONTRIBUTING.md.** Fork-only model. PRs to this upstream get closed.
- **No deployment config.** Each `npm run build` produces a static `dist/` you can deploy anywhere (Cloudflare Pages, GitHub Pages, Vercel, Netlify). The course doesn't teach DevOps.

## Pick a framework

| If you... | Use |
|---|---|
| ...already write Vue at work | `vue/` (Composition API + `<script setup>`) |
| ...are curious about Svelte 5 runes | `svelte/` (Svelte 5 with `$state`, `$derived`, `$effect`) |
| ...are most comfortable in React | `react/` (React 19 with hooks) |
| ...want to compare frameworks | Pick one to lead, build Modules 1 and 2 there, then redo Module 1 in another. The lessons present all three side by side. |

You don't have to commit to one. The folders are independent.

## Updating from upstream

If the upstream starter (this repo) gets a meaningful update (new dependency version, fix in the scaffold), you can pull it into your fork:

```bash
git remote add upstream https://github.com/danieltofan/framework-battle-starter
git fetch upstream
git merge upstream/main
```

Most students will never need to do this. The starter is meant to be stable; the course content evolves on Lab, not in this repo.

## License

MIT. Use it however you want, including for paid client work.
