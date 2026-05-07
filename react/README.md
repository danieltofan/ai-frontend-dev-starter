# Framework Battle Starter — React

React 19 scaffold for the Neurons Lab Framework Battle course.

## Quickstart

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see the welcome card.

## Stack

- React 19 with hooks
- Vite 7 (build + dev server + HMR)
- Tailwind v4 (via `@tailwindcss/vite`)
- DaisyUI v5
- Vitest 4 with jsdom + `@testing-library/react`

## Layout

```
react/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx                       (placeholder; replace with your feature)
    ├── style.css                     (@import "tailwindcss"; @plugin "daisyui";)
    ├── shared/
    │   └── data/
    │       └── regions.js            (100 People dataset; used by Compare + 100 People)
    └── features/
        ├── compare/                  (Module 1; create Compare.jsx here)
        ├── hundred-people/           (Module 2; create HundredPeople.jsx here)
        ├── countries-cartogram/      (Module 3; countries.js pre-shipped)
        │   └── countries.js
        └── language-space/           (Module 4; languages.js pre-shipped)
            └── languages.js
```

## Tests

```bash
npm test         # watch mode
npm run test:run # one-shot run
```

Each course lesson includes test code blocks. Paste them into a `*.test.jsx` file alongside the feature you're building. Vitest is configured with jsdom and globals enabled. `@testing-library/react` is installed for component testing:

```javascript
import { render, screen } from '@testing-library/react'
import Cartogram from './Cartogram.jsx'

it('renders the cartogram canvas', () => {
  render(<Cartogram />)
  expect(screen.getByRole('region')).toBeInTheDocument()
})
```

## Imports

Use the `@` alias for absolute imports from `src/`:

```javascript
import { regions } from '@/shared/data/regions'
import { countries } from '@/features/countries-cartogram/countries'
```

Or relative paths.

## What this is not

- **Not a tutorial.** Build features by following the Lab course; this scaffold is just the runway.
- **Not a contribution target.** Fork-only. Issues and PRs to upstream get closed without comment. Your fork is your project.
- **Not an answer key.** Reference implementation is at [globe-explorer](https://github.com/danieltofan/globe-explorer); compare after you finish, not before.
