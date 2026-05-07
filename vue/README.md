# Framework Battle Starter — Vue

Vue 3 (Composition API + `<script setup>`) scaffold for the Neurons Lab Framework Battle course.

## Quickstart

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see the welcome card.

## Stack

- Vue 3.5 with Composition API
- Vite 7 (build + dev server + HMR)
- Tailwind v4 (via `@tailwindcss/vite`)
- DaisyUI v5
- Vitest 4 with jsdom

## Layout

```
vue/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.js
    ├── App.vue                       (placeholder; replace with your feature)
    ├── style.css                     (@import "tailwindcss"; @plugin "daisyui";)
    ├── shared/
    │   └── data/
    │       └── regions.js            (100 People dataset; used by Compare + 100 People)
    └── features/
        ├── compare/                  (Module 1; create Compare.vue here)
        ├── hundred-people/           (Module 2; create HundredPeople.vue here)
        ├── countries-cartogram/      (Module 3; countries.js pre-shipped)
        │   └── countries.js
        └── language-space/           (Module 4; languages.js pre-shipped)
            └── languages.js
```

## Tests

```bash
npm test         # watch mode
npm run test:run # one-shot run, exits when done
```

Each course lesson includes test code blocks. Paste them into a `*.test.js` file alongside the feature you're building (e.g., `src/features/countries-cartogram/Cartogram.test.js`). Vitest is configured with jsdom and globals enabled, so `describe`, `it`, `expect` are available without imports.

## Imports

Use the `@` alias for absolute imports from `src/`:

```javascript
import { regions } from '@/shared/data/regions'
import { countries } from '@/features/countries-cartogram/countries'
```

Or relative paths:

```javascript
import { countries } from './countries'
```

Both work. The lessons usually show relative paths.

## What this is not

- **Not a tutorial.** The scaffold is the runway; the lessons are the flights. Do not look for code samples or feature implementations here. Those come from the course.
- **Not a contribution target.** This repo is fork-only. Issues and PRs to the upstream get closed without comment. Fork it, build in your fork, deploy your fork. Your work belongs to you.
- **Not an answer key.** No completed feature code lives in this repo. The full reference implementation is at [globe-explorer](https://github.com/danieltofan/globe-explorer); use it for comparison after you finish a module, not before.
