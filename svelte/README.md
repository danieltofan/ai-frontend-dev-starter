# Framework Battle Starter (Svelte)

Svelte 5 (with runes) scaffold for the Neurons Lab Framework Battle course. Plain Svelte + Vite, **not SvelteKit**: the course builds single-page features, no routing or SSR is needed.

## Prerequisites

- **Node.js 20.19+** or **22.12+**. Vite 7 will not start on older Node. Check with `node --version`.
- **npm 10+** (ships with Node 20+).
- **Git** for cloning your fork.
- **A code editor.** VS Code with the official [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) extension is the smoothest setup. The extension recognizes Svelte 5 runes (`$state`, `$derived`, `$effect`) and provides autocompletion and type hints.

## Quickstart

```bash
# From the repo root, after forking and cloning your fork:
cd svelte
npm install
npm run dev
```

Vite prints the URL it serves on (default `http://localhost:5173`). Open it. You should see the **Framework Battle Starter** welcome card with DaisyUI styling.

If port 5173 is in use, Vite picks the next free port and tells you which one. Or `npm run dev -- --port 3000`.

## Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Svelte 5 with runes | `^5.0.0` |
| Build | Vite | `^7.2.4` |
| Svelte plugin | `@sveltejs/vite-plugin-svelte` | `^6.0.0` |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) | `^4.1.18` |
| Component library | DaisyUI v5 | `^5.5.14` |
| Test runner | Vitest with jsdom | `^4.0.18` |
| Component test utilities | `@testing-library/svelte` + `@testing-library/jest-dom` | `^5.2.0` / `^6.6.0` |

## Layout

```
svelte/
├── package.json
├── vite.config.js                    Plugin wiring + path alias + Vitest config
├── svelte.config.js                  Preprocess config for Svelte plugin
├── index.html                        Vite entry HTML; mounts to <div id="app">
└── src/
    ├── main.js                       mount(App, { target: ... })
    ├── App.svelte                    Welcome-card placeholder; replace as you build
    ├── style.css                     @import "tailwindcss"; @plugin "daisyui";
    ├── assets/
    │   └── categories/               19 silhouette PNGs (continent shapes + mode icons)
    ├── shared/
    │   └── data/
    │       └── regions.js            100 People dataset (Compare + 100 People)
    └── features/
        ├── compare/                  Module 1; create Compare.svelte here
        ├── hundred-people/           Module 2; create HundredPeople.svelte here
        ├── countries-cartogram/      Module 3
        │   └── countries.js          195-country cartogram dataset
        └── language-space/           Module 4
            └── languages.js          91-language 3D embedding dataset
```

## Wiring your first feature

**Step 1: Create the feature file.** In your editor, create the Svelte component for the module you're working on:

- Module 1: `src/features/compare/Compare.svelte`
- Module 2: `src/features/hundred-people/HundredPeople.svelte`
- Module 3: `src/features/countries-cartogram/Cartogram.svelte`
- Module 4: `src/features/language-space/LanguageSpace.svelte`

(VS Code: right-click the folder, "New File"; or `Ctrl+N` and save with the path. macOS/Linux/Git Bash users can use `touch <path>` from the terminal.)

**Step 2: Author the component** following the lesson. Svelte 5 component skeleton:

```svelte
<script>
  // Module 1 + 2: import { regions } from '@/shared/data/regions'
  // Module 3:     import { countries, canvasWidth, canvasHeight } from './countries'
  // Module 4:     import { languages } from './languages'

  // Runes for reactive state
  let count = $state(0)
  let doubled = $derived(count * 2)
</script>

<!-- Your markup -->
<button onclick={() => count++}>Clicked {count} times (doubled: {doubled})</button>

<style>
  /* Optional component-scoped CSS */
</style>
```

**Step 3: Mount it from `App.svelte`.** Replace the placeholder welcome card:

```svelte
<script>
  import Compare from './features/compare/Compare.svelte'
</script>

<Compare />
```

**Step 4: Run the dev server.** `npm run dev`. HMR rebuilds on save.

## Imports

```javascript
// Absolute via @ alias (configured in vite.config.js)
import { regions } from '@/shared/data/regions'
import { countries, canvasWidth } from '@/features/countries-cartogram/countries'

// Relative
import { regions } from '../../shared/data/regions'
import { countries, canvasWidth } from './countries'
```

Lessons typically show relative paths.

## Tests

```bash
npm test         # watch mode
npm run test:run # one-shot run
```

Each lesson includes test code blocks. Paste them into a `*.test.js` file alongside the feature:

```
src/features/countries-cartogram/
├── Cartogram.svelte
├── countries.js
└── Cartogram.test.js     ← paste lesson tests here
```

Vitest is configured with `environment: 'jsdom'` and `globals: true` (see `vite.config.js`); `describe`, `it`, `expect` are available without imports.

A typical Svelte 5 component test using `@testing-library/svelte`:

```javascript
import { render, screen, fireEvent } from '@testing-library/svelte'
import '@testing-library/jest-dom/vitest'
import Cartogram from './Cartogram.svelte'

it('renders 195 country tiles', () => {
  render(Cartogram)
  expect(screen.getAllByRole('button', { name: /country/i })).toHaveLength(195)
})

it('switches color mode on click', async () => {
  render(Cartogram)
  const populationButton = screen.getByRole('button', { name: /population/i })
  await fireEvent.click(populationButton)
  expect(screen.getByText(/population/i)).toBeInTheDocument()
})
```

For pure-function tests, no rendering needed:

```javascript
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
| `npm run dev -- --host` | Expose dev server on LAN |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production `dist/` locally |
| `npm test` | Vitest watch mode |
| `npm run test:run` | Vitest one-shot run |

## Troubleshooting

**`npm install` fails with `ERESOLVE`**
Should not happen with the pinned versions on Node 20.19+. If it does, try `npm install --legacy-peer-deps` and check the resolved versions of `vite` and `@sveltejs/vite-plugin-svelte`: the plugin v6 series supports Vite 7; older plugin versions don't.

**Dev server starts but page is blank**
Open the browser console. Most likely a Svelte compiler error (often a syntax issue with runes: `$state` vs `state`, or missing parentheses on `$derived(...)`). Fix the syntax, save, HMR will rebuild.

**`SyntaxError: Unexpected token` on a `.svelte` file**
The file probably has a typo in the `<script>` block (mismatched braces, stray semicolon, etc.) or in a rune (`$state` is correct; `$$state` is wrong). Read the compiler's pointed-at line.

**Port 5173 already in use**
Vite auto-selects the next free port. Or `--port 3000`.

**HMR isn't reloading**
Linux/WSL inotify watcher limit. `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

**Tests don't find my `*.test.js` files**
Vitest globs for `*.test.js`, `*.spec.js` by default. Rename if needed.

**`Cannot find module '@/shared/data/regions'` in a test**
Tests use the same Vite config as dev/build, so the `@` alias works. If failing, check `vite.config.js` still has the alias block.

## Framework-specific gotchas (Svelte 5 is different from Svelte 4)

**Runes replace reactive declarations.** Svelte 4 used `let count = 0` for reactive state and `$:` for reactive statements. Svelte 5 uses runes:

```svelte
<script>
  // Svelte 5 (this scaffold)
  let count = $state(0)
  let doubled = $derived(count * 2)
  $effect(() => { console.log('count changed to', count) })
</script>
```

If you see `$:` in a tutorial or AI output, it's Svelte 4 syntax. Translate it to runes.

**Event handlers use HTML attribute syntax, not `on:` directives.** Svelte 4 had `on:click={handler}`; Svelte 5 has `onclick={handler}`:

```svelte
<!-- Svelte 5 -->
<button onclick={() => count++}>+</button>

<!-- Svelte 4 (deprecated) -->
<button on:click={() => count++}>+</button>
```

If AI generates `on:click`, replace with `onclick`. Same for all other DOM events (`oninput`, `onsubmit`, etc.).

**Props use `$props()`**, not `export let`:

```svelte
<script>
  // Svelte 5
  let { name, count = 0 } = $props()

  // Svelte 4 (deprecated)
  // export let name
  // export let count = 0
</script>
```

**The mount API changed.** Svelte 4 used `new App({ target })`; Svelte 5 uses `mount(App, { target })`. The scaffold's `src/main.js` already uses the new API.

**`{#each}` blocks in Svelte 5 require an explicit key for diffing.** Use `{#each items as item (item.id)}`. Without the key parenthetical, Svelte falls back to positional matching and complex updates can glitch.

**Class-name binding** uses `class:name` directives or the `class` attribute with a string/object:

```svelte
<!-- Conditional class -->
<button class:active={isActive}>Click</button>

<!-- Object syntax -->
<button class={['btn', { active: isActive }]}>Click</button>
```

**No JSX.** Markup goes outside the `<script>` block; you don't return it from a function. If AI generates `return (<div>...)`, that's React/JSX leakage; rewrite as Svelte template syntax.

## What this is not

- **Not a tutorial.** Build features by following the [Lab course](https://neurons-lab.pages.dev/courses/framework-battle); the scaffold is just the runway.
- **Not a contribution target.** Fork-only. Issues and PRs to upstream get closed without comment.
- **Not an answer key.** Reference implementation at [github.com/danieltofan/globe-explorer](https://github.com/danieltofan/globe-explorer); compare after you finish, not before.
