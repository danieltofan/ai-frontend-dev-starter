# AI-Assisted Frontend Development Starter (Vue)

Vue 3.5 (Composition API + `<script setup>`) scaffold for the Neurons Lab AI-Assisted Frontend Development course.

## Prerequisites

- **Node.js 20.19+** or **22.12+**. Vite 7 will not start on older Node. Check with `node --version`. If you're below 20.19, upgrade via [nodejs.org](https://nodejs.org/) or your version manager.
- **npm 10+** ships with Node 20+; nothing extra to install.
- **Git** for cloning your fork.
- **A code editor.** VS Code with the official [Vue (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension is the smoothest setup. Volar gives you template type-checking, prop autocompletion, and component navigation out of the box.

## Quickstart

```bash
# From the repo root, after forking and cloning your fork:
cd vue
npm install
npm run dev
```

Vite prints the URL it serves on (default `http://localhost:5173`). Open it. You should see the **AI-Assisted Frontend Development Starter** welcome card with DaisyUI styling. That confirms the scaffold runs end-to-end.

If port 5173 is in use, Vite picks the next free port automatically and tells you which one. Or run `npm run dev -- --port 3000` to force a specific port.

## Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Vue 3.5 (Composition API + `<script setup>`) | `^3.5.26` |
| Build | Vite | `^7.2.4` |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) | `^4.1.18` |
| Component library | DaisyUI v5 | `^5.5.14` |
| Test runner | Vitest with jsdom | `^4.0.18` |
| Component test utilities | `@vue/test-utils` | `^2.4.6` |

## Layout

```
vue/
├── package.json
├── vite.config.js                    Plugin wiring + path alias + Vitest config
├── index.html                        Vite entry HTML; mounts to <div id="app">
└── src/
    ├── main.js                       createApp(App).mount('#app')
    ├── App.vue                       Welcome-card placeholder; replace as you build
    ├── style.css                     @import "tailwindcss"; @plugin "daisyui";
    ├── assets/
    │   └── categories/               19 silhouette PNGs (continent shapes + mode icons)
    ├── shared/
    │   └── data/
    │       └── regions.js            100 People dataset (Compare + 100 People)
    └── features/
        ├── compare/                  Module 1; create Compare.vue here
        ├── hundred-people/           Module 2; create HundredPeople.vue here
        ├── countries-cartogram/      Module 3
        │   └── countries.js          195-country cartogram dataset
        └── language-space/           Module 4
            └── languages.js          91-language 3D embedding dataset
```

## Wiring your first feature

Each course module asks you to build one feature in `src/features/<feature-name>/`. The naming matches the production Globe Explorer codebase exactly.

**Step 1: Create the feature file.** In your editor, create the Vue SFC for the module you're working on:

- Module 1: `src/features/compare/Compare.vue`
- Module 2: `src/features/hundred-people/HundredPeople.vue`
- Module 3: `src/features/countries-cartogram/Cartogram.vue`
- Module 4: `src/features/language-space/LanguageSpace.vue`

(VS Code: right-click the folder, "New File"; or `Ctrl+N` and save with the path. macOS/Linux/Git Bash users can use `touch <path>` from the terminal.)

**Step 2: Author the SFC** by following the lesson's prompt → AI capture → final code flow. The component skeleton looks like:

```vue
<script setup>
import { ref, computed } from 'vue'
// Module 1 + 2: import { regions } from '@/shared/data/regions'
// Module 3:     import { countries, canvasWidth, canvasHeight } from './countries'
// Module 4:     import { languages } from './languages'

// ...your reactive state, computed values, methods
</script>

<template>
  <!-- ...your markup -->
</template>

<style scoped>
  /* Optional scoped styles */
</style>
```

**Step 3: Mount it from `App.vue`.** Replace the placeholder welcome card:

```vue
<script setup>
import Compare from './features/compare/Compare.vue'
</script>

<template>
  <Compare />
</template>
```

**Step 4: Run the dev server.** `npm run dev`. Edit the SFC; HMR updates the page in milliseconds.

## Imports

Two equivalent ways to reference files. The `@` alias points at `./src`:

```javascript
// Absolute via @ alias
import { regions } from '@/shared/data/regions'
import { countries, canvasWidth } from '@/features/countries-cartogram/countries'

// Relative
import { regions } from '../../shared/data/regions'
import { countries, canvasWidth } from './countries'
```

Lessons typically show relative paths. Either works. Pick a convention and stick with it inside a single file.

## Tests

```bash
npm test         # watch mode; re-runs on file changes
npm run test:run # one-shot run; exits when done
```

Each lesson includes test code blocks. Paste them into a `*.test.js` file alongside the feature you're building:

```
src/features/countries-cartogram/
├── Cartogram.vue
├── countries.js
└── Cartogram.test.js     ← paste lesson tests here
```

Vitest is configured with `environment: 'jsdom'` and `globals: true` (see `vite.config.js`), so `describe`, `it`, `expect`, `beforeEach`, etc. are available without `import` statements.

A typical Vue component test using `@vue/test-utils`:

```javascript
import { mount } from '@vue/test-utils'
import Cartogram from './Cartogram.vue'

it('renders 195 country tiles', () => {
  const wrapper = mount(Cartogram)
  expect(wrapper.findAll('.country-tile')).toHaveLength(195)
})

it('switches color mode on click', async () => {
  const wrapper = mount(Cartogram)
  await wrapper.find('button[data-mode="population"]').trigger('click')
  expect(wrapper.find('.color-mode-active').text()).toBe('Population')
})
```

For pure-function tests (e.g., a `getTileSize(area)` helper), no mounting needed. Helpers belong in a separate file because `<script setup>` cannot export named functions; create `tileSize.js` next to your SFC and import it from both places:

```javascript
// src/features/countries-cartogram/tileSize.js
export function getTileSize(area) {
  if (area >= 5_000_000) return 'xxl'
  // ...
}
```

```javascript
// src/features/countries-cartogram/Cartogram.test.js
import { getTileSize } from './tileSize.js'

it('classifies area into the correct tier', () => {
  expect(getTileSize(17098242)).toBe('xxl')
})
```

## Useful commands reference

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run dev -- --port 3000` | Start on a specific port |
| `npm run dev -- --host` | Expose dev server on LAN (other devices on your network can reach it) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production `dist/` locally to verify the build |
| `npm test` | Vitest watch mode |
| `npm run test:run` | Vitest one-shot run |

## Troubleshooting

**`npm install` fails with `ERESOLVE`**
The pinned versions in `package.json` should resolve cleanly on Node 20.19+. If you're on an older Node, upgrade. If you're on the right Node and still hitting `ERESOLVE`, the workaround is `npm install --legacy-peer-deps`, but file an issue on your fork's record (something has drifted) before relying on the workaround.

**Dev server starts but the welcome card is unstyled**
Tailwind v4 + DaisyUI v5 are loaded via `src/style.css`'s `@import "tailwindcss"` and `@plugin "daisyui"` directives, processed at request time by `@tailwindcss/vite`. If the page is unstyled, either `style.css` isn't being imported in `main.js` (check the import line) or the dev server hasn't finished its first compile (wait a beat).

**Port 5173 is already in use**
Vite auto-selects the next free port. Or override with `npm run dev -- --port 3000`. The course doesn't depend on a specific port.

**Vue compiler errors about `<script setup>` not being recognized**
This usually means the version of `@vitejs/plugin-vue` is too old. The scaffold pins `^6.0.1`; rerun `npm install` if you've manually downgraded.

**HMR isn't reloading on file changes**
Most often a file watcher limit on Linux/WSL. Increase with `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`. On macOS/Windows, this rarely happens.

**Tests don't find my `*.test.js` files**
Vitest globs for `*.test.js`, `*.spec.js`, `*.test.jsx`, etc. by default. If your file uses a different suffix (e.g., `tests.js`), it won't match. Rename to `<feature>.test.js`.

**`Cannot find module '@/shared/data/regions'` in a test**
Tests run through the same Vite config as the dev server, so the `@` alias works in tests too. If it's failing, check that `vite.config.js` still has the `resolve.alias` block intact.

## Framework-specific gotchas

**Composition API + `<script setup>`** is the modern Vue 3 idiom. The course uses it throughout. If you've used Options API (`data()`, `methods`, `computed`) before, the mental model is "everything in `<script setup>` is at component scope; refs and computeds are reactive primitives, not config objects."

**`ref()` vs `reactive()`.** The course almost always uses `ref()` (works for any value, requires `.value` in script, auto-unwraps in templates). `reactive()` is for objects only and doesn't auto-unwrap. Stick to `ref()` unless a lesson explicitly says otherwise.

**`defineProps` and `defineEmits`** are compiler macros in `<script setup>`. They look like function calls but aren't imported and don't exist at runtime. Vue's compiler handles them. Don't try to `import { defineProps }`; it's not a real export.

**`<Teleport>` for modals** (Module 3 lesson 3.6) is a Vue 3.x built-in component. No imports needed; just use `<Teleport to="body">...</Teleport>`.

**`v-for` keys** must be unique. The course's data files (`countries.js`, `languages.js`) all have unique `code`/`id` fields; use those, not the array index.

**`<style scoped>`** scopes CSS to the component. The course uses both `scoped` and unscoped styles depending on the lesson. Read the lesson's CSS block carefully.

## What this is not

- **Not a tutorial.** Build features by following the [Lab course](https://neurons-lab.pages.dev/courses/ai-frontend-dev); the scaffold is just the runway.
- **Not a contribution target.** Fork-only. Issues and PRs to upstream get closed without comment. Your fork is your project.
- **Not an answer key.** The reference implementation is at [github.com/danieltofan/globe-explorer](https://github.com/danieltofan/globe-explorer); compare after you finish a module, not before.
