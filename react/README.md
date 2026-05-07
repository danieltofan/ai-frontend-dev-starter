# Framework Battle Starter (React)

React 19 (with hooks) scaffold for the Neurons Lab Framework Battle course.

## Prerequisites

- **Node.js 20.19+** or **22.12+**. Vite 7 will not start on older Node. Check with `node --version`.
- **npm 10+** (ships with Node 20+).
- **Git** for cloning your fork.
- **A code editor.** VS Code with the [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) extension is a common pick. The course doesn't depend on Redux; install it for the JSX snippets if you want them.

## Quickstart

```bash
# From the repo root, after forking and cloning your fork:
cd react
npm install
npm run dev
```

Vite prints the URL it serves on (default `http://localhost:5173`). Open it. You should see the **Framework Battle Starter** welcome card with DaisyUI styling.

If port 5173 is in use, Vite picks the next free port and tells you which one. Or `npm run dev -- --port 3000`.

## Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | React 19 with hooks + StrictMode | `^19.0.0` |
| Build | Vite | `^7.2.4` |
| React plugin | `@vitejs/plugin-react` | `^5.0.0` |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) | `^4.1.18` |
| Component library | DaisyUI v5 | `^5.5.14` |
| Test runner | Vitest with jsdom | `^4.0.18` |
| Component test utilities | `@testing-library/react` + `@testing-library/dom` + `@testing-library/jest-dom` | `^16.1.0` / `^10.4.0` / `^6.6.0` |

## Layout

```
react/
├── package.json
├── vite.config.js                    Plugin wiring + path alias + Vitest config
├── index.html                        Vite entry HTML; mounts to <div id="root">
└── src/
    ├── main.jsx                      createRoot + StrictMode
    ├── App.jsx                       Welcome-card placeholder; replace as you build
    ├── style.css                     @import "tailwindcss"; @plugin "daisyui";
    ├── assets/
    │   └── categories/               19 silhouette PNGs (continent shapes + mode icons)
    ├── shared/
    │   └── data/
    │       └── regions.js            100 People dataset (Compare + 100 People)
    └── features/
        ├── compare/                  Module 1; create Compare.jsx here
        ├── hundred-people/           Module 2; create HundredPeople.jsx here
        ├── countries-cartogram/      Module 3
        │   └── countries.js          195-country cartogram dataset
        └── language-space/           Module 4
            └── languages.js          91-language 3D embedding dataset
```

## Wiring your first feature

**Step 1: Create the feature file.** In your editor, create the JSX component for the module you're working on:

- Module 1: `src/features/compare/Compare.jsx`
- Module 2: `src/features/hundred-people/HundredPeople.jsx`
- Module 3: `src/features/countries-cartogram/Cartogram.jsx`
- Module 4: `src/features/language-space/LanguageSpace.jsx`

(VS Code: right-click the folder, "New File"; or `Ctrl+N` and save with the path. macOS/Linux/Git Bash users can use `touch <path>` from the terminal.)

**Step 2: Author the component** following the lesson. React 19 component skeleton:

```jsx
import { useState, useMemo } from 'react'
// Module 1 + 2: import { regions } from '@/shared/data/regions'
// Module 3:     import { countries, canvasWidth, canvasHeight } from './countries'
// Module 4:     import { languages } from './languages'

export default function Compare() {
  const [count, setCount] = useState(0)
  const doubled = useMemo(() => count * 2, [count])

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Clicked {count} times (doubled: {doubled})
      </button>
    </div>
  )
}
```

**Step 3: Mount it from `App.jsx`.** Replace the placeholder welcome card:

```jsx
import Compare from './features/compare/Compare.jsx'

export default function App() {
  return <Compare />
}
```

**Step 4: Run the dev server.** `npm run dev`. HMR updates the page on save.

## Imports

```javascript
// Absolute via @ alias (configured in vite.config.js)
import { regions } from '@/shared/data/regions'
import { countries, canvasWidth } from '@/features/countries-cartogram/countries'
import Compare from '@/features/compare/Compare.jsx'

// Relative
import { regions } from '../../shared/data/regions'
import { countries, canvasWidth } from './countries'
```

Lessons typically show relative paths.

**JSX file extensions matter.** React component files in this scaffold use `.jsx`. The Vite React plugin only treats files containing JSX as JSX if the extension is `.jsx` or `.tsx`. Using `.js` will silently break (the `<` will be parsed as a less-than operator). When in doubt, name component files `.jsx`.

## Tests

```bash
npm test         # watch mode
npm run test:run # one-shot run
```

Each lesson includes test code blocks. Paste them into a `*.test.jsx` file alongside the feature:

```
src/features/countries-cartogram/
├── Cartogram.jsx
├── countries.js
└── Cartogram.test.jsx     ← paste lesson tests here
```

Vitest is configured with `environment: 'jsdom'` and `globals: true` (see `vite.config.js`); `describe`, `it`, `expect` are available without imports.

A typical React component test using `@testing-library/react`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Cartogram from './Cartogram.jsx'

it('renders 195 country tiles', () => {
  render(<Cartogram />)
  expect(screen.getAllByRole('button', { name: /country/i })).toHaveLength(195)
})

it('switches color mode on click', () => {
  render(<Cartogram />)
  fireEvent.click(screen.getByRole('button', { name: /population/i }))
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
Pinned versions resolve cleanly on Node 20.19+. If it fails, try `npm install --legacy-peer-deps`. Most likely culprit: an older Node, or a previously-installed `@testing-library/react` mismatched with React 19. The scaffold pins `@testing-library/react ^16` (React 19 compatible).

**`Uncaught ReferenceError: React is not defined`**
React 17+ uses the automatic JSX runtime; the explicit `import React from 'react'` is no longer required. The scaffold is configured to use the automatic runtime. If you see this error, you've manually disabled the automatic runtime in `vite.config.js` somewhere.

**StrictMode causes my `useEffect` to run twice in dev**
That's intentional. React 19's `StrictMode` (enabled in `src/main.jsx`) intentionally double-invokes effects in development to surface side-effect bugs. Production builds don't double-invoke. If a lesson's effect needs to be idempotent, that's a feature-of-React, not a scaffold bug.

**Dev server starts but page is blank**
Open the browser console. The most common cause is a JSX syntax error in a component (unclosed tag, mistyped prop). React's runtime errors show up clearly in the console.

**Port 5173 already in use**
Vite auto-selects the next free port. Or `--port 3000`.

**HMR isn't reloading**
Linux/WSL inotify watcher limit. `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

**Tests don't find my `*.test.jsx` files**
Vitest globs include `*.test.jsx` by default. If you used `*.spec.jsx`, that also works. Anything else won't match.

**`Cannot find module '@/shared/data/regions'` in a test**
Tests use the same Vite config as dev/build, so the `@` alias works in tests. If failing, check `vite.config.js` still has the alias block.

## Framework-specific gotchas

**`.jsx` extension is required for files containing JSX.** Files with `.js` will be parsed as plain JavaScript and any `<` will be treated as the less-than operator. The course's React lessons use `.jsx`; follow that.

**Hooks rules.** All hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, etc.) must be called at the top level of a function component. Don't call hooks inside loops, conditions, or nested functions. The React DevTools or ESLint will flag violations.

**`useEffect` cleanup.** When an effect sets up subscriptions, timers, or listeners, return a cleanup function:

```jsx
useEffect(() => {
  const timer = setInterval(() => { /* ... */ }, 1000)
  return () => clearInterval(timer)
}, [])
```

Module 2 (storytelling auto-play) and Module 4 (Three.js animation loop) both rely on this pattern.

**`useState` with objects requires new references** for React to see a change:

```jsx
// Wrong: same reference, no re-render
state.foo = 'bar'
setState(state)

// Right: new object reference
setState({ ...state, foo: 'bar' })
```

**Stale-closure bug in `setInterval`/`setTimeout` callbacks** is a common foot-gun. If your callback reads `state`, that read happens at the time the callback was DEFINED, not when it FIRES. Use the functional updater form (`setCount(c => c + 1)`) or a ref to read latest state.

**`useState`'s lazy initial value** for expensive computations: `useState(() => expensiveCompute())` runs the function once on mount. `useState(expensiveCompute())` runs it on every render.

**React 19 specifics.** Form actions, Server Components, and `use()` are part of React 19, but the course's client-side feature builds don't use them. You'll see `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef` mostly.

## What this is not

- **Not a tutorial.** Build features by following the [Lab course](https://neurons-lab.pages.dev/courses/framework-battle); the scaffold is just the runway.
- **Not a contribution target.** Fork-only. Issues and PRs to upstream get closed without comment.
- **Not an answer key.** Reference implementation at [github.com/danieltofan/globe-explorer](https://github.com/danieltofan/globe-explorer); compare after you finish, not before. The reference is in Vue; React-port equivalents are not separately published.
