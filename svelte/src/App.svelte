<script>
  // Replace this placeholder with your feature import as you build through the course.
  //
  //   import Compare from './features/compare/Compare.svelte'
  //   import HundredPeople from './features/hundred-people/HundredPeople.svelte'
  //   import Cartogram from './features/countries-cartogram/Cartogram.svelte'
  //   import LanguageSpace from './features/language-space/LanguageSpace.svelte'
  //
  // Then render <Compare />, <HundredPeople />, etc. in the template below.
  import Compare from './features/compare/Compare.svelte'
</script>

<main class="min-h-screen bg-base-100 py-10 px-4 flex flex-col items-center gap-10">
  <div class="card bg-base-200 shadow-xl max-w-2xl w-full">
    <div class="card-body">
      <h1 class="card-title text-3xl">AI-Assisted Frontend Development Starter</h1>
      <p class="text-base-content/70">Svelte 5 + Vite + Tailwind v4 + DaisyUI v5 + Vitest</p>

      <div class="divider"></div>

      <p>The scaffold is wired and the dev server runs. Time to build.</p>

      <ol class="list-decimal list-inside space-y-2 my-4">
        <li>Open the Lab course at
          <a
            class="link link-primary"
            href="https://neurons-lab.pages.dev/courses/ai-frontend-dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            neurons-lab.pages.dev
          </a>
        </li>
        <li>Pick a module (Compare, 100 People, Cartogram, or Language Space)</li>
        <li>Create your feature file in <code class="badge">src/features/&lt;feature-name&gt;/</code></li>
        <li>Replace the contents of <code class="badge">src/App.svelte</code> to import and render it</li>
        <li>Run <code class="badge">npm test</code> to check your work</li>
      </ol>

      <div class="alert alert-info">
        <span>
          Datasets are pre-shipped at
          <code>src/shared/data/regions.js</code>,
          <code>src/features/countries-cartogram/countries.js</code>, and
          <code>src/features/language-space/languages.js</code>.
          Don't try to author these by hand or have AI generate them: the lessons explain why.
        </span>
      </div>
    </div>
  </div>

  <div class="w-full max-w-5xl">
    <div class="text-center mb-4">
      <div class="badge badge-outline">Reference implementation</div>
      <p class="text-sm text-base-content/60 mt-2">
        Module 1 Compare ships pre-assembled in all three framework folders so the cross-framework parity is
        verifiable on first <code>npm run dev</code>. Diff
        <code>src/features/compare/Compare.&lbrace;vue,jsx,svelte&rbrace;</code> across the sibling folders to see
        the same UI rendered in each idiom. Remove the <code>&lt;Compare /&gt;</code> mount in
        <code>App.svelte</code> when you're ready to author your own.
      </p>
    </div>
    <Compare />
  </div>
</main>
