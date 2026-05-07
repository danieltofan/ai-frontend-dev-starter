<script setup>
// Replace this placeholder with your feature import as you build through the course.
//
//   import Compare from './features/compare/Compare.vue'
//   import HundredPeople from './features/hundred-people/HundredPeople.vue'
//   import Cartogram from './features/countries-cartogram/Cartogram.vue'
//   import LanguageSpace from './features/language-space/LanguageSpace.vue'
//
// Then render <Compare />, <HundredPeople />, etc. in the template below.
</script>

<template>
  <main class="min-h-screen bg-base-100 flex items-center justify-center p-8">
    <div class="card bg-base-200 shadow-xl max-w-2xl">
      <div class="card-body">
        <h1 class="card-title text-3xl">Framework Battle Starter</h1>
        <p class="text-base-content/70">Vue 3 + Vite + Tailwind v4 + DaisyUI v5 + Vitest</p>

        <div class="divider"></div>

        <p>The scaffold is wired and the dev server runs. Time to build.</p>

        <ol class="list-decimal list-inside space-y-2 my-4">
          <li>Open the Lab course at
            <a
              class="link link-primary"
              href="https://neurons-lab.pages.dev/courses/framework-battle"
              target="_blank"
              rel="noopener noreferrer"
            >
              neurons-lab.pages.dev
            </a>
          </li>
          <li>Pick a module (Compare, 100 People, Cartogram, or Language Space)</li>
          <li>Create your feature file in <code class="badge">src/features/&lt;feature-name&gt;/</code></li>
          <li>Replace the contents of <code class="badge">src/App.vue</code> to import and render it</li>
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
  </main>
</template>
