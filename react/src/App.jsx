// Replace this placeholder with your feature import as you build through the course.
//
//   import Compare from './features/compare/Compare.jsx'
//   import HundredPeople from './features/hundred-people/HundredPeople.jsx'
//   import Cartogram from './features/countries-cartogram/Cartogram.jsx'
//   import LanguageSpace from './features/language-space/LanguageSpace.jsx'
//
// Then render <Compare />, <HundredPeople />, etc. in the App return below.

export default function App() {
  return (
    <main className="min-h-screen bg-base-100 flex items-center justify-center p-8">
      <div className="card bg-base-200 shadow-xl max-w-2xl">
        <div className="card-body">
          <h1 className="card-title text-3xl">AI-Assisted Frontend Development Starter</h1>
          <p className="text-base-content/70">React 19 + Vite + Tailwind v4 + DaisyUI v5 + Vitest</p>

          <div className="divider"></div>

          <p>The scaffold is wired and the dev server runs. Time to build.</p>

          <ol className="list-decimal list-inside space-y-2 my-4">
            <li>
              Open the Lab course at{' '}
              <a
                className="link link-primary"
                href="https://neurons-lab.pages.dev/courses/ai-frontend-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                neurons-lab.pages.dev
              </a>
            </li>
            <li>Pick a module (Compare, 100 People, Cartogram, or Language Space)</li>
            <li>
              Create your feature file in <code className="badge">src/features/&lt;feature-name&gt;/</code>
            </li>
            <li>
              Replace the contents of <code className="badge">src/App.jsx</code> to import and render it
            </li>
            <li>
              Run <code className="badge">npm test</code> to check your work
            </li>
          </ol>

          <div className="alert alert-info">
            <span>
              Datasets are pre-shipped at <code>src/shared/data/regions.js</code>,{' '}
              <code>src/features/countries-cartogram/countries.js</code>, and{' '}
              <code>src/features/language-space/languages.js</code>. Don't try to author these by hand or have AI generate them: the lessons explain why.
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
