<script>
  import { countries } from '../countries-cartogram/countries.js'
  import { formatNumber, getComparison, humanizeContinent } from './logic.js'

  let country1Code = $state('US')
  let country2Code = $state('CN')

  const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name))

  const country1 = $derived(countries.find(c => c.code === country1Code))
  const country2 = $derived(countries.find(c => c.code === country2Code))

  const metrics = [
    { key: 'population',          label: 'Population',      format: v => formatNumber(v),       unit: '' },
    { key: 'area',                label: 'Land Area',       format: v => formatNumber(v),       unit: 'km²' },
    { key: 'gdpPerCapita',        label: 'GDP per Capita',  format: v => '$' + formatNumber(v), unit: '' },
    { key: 'lifeExpectancy',      label: 'Life Expectancy', format: v => v.toFixed(1),          unit: 'years' },
    { key: 'internetPenetration', label: 'Internet Access', format: v => v + '%',               unit: '' },
  ]

  function swapCountries() {
    const tmp = country1Code
    country1Code = country2Code
    country2Code = tmp
  }

  function getFlagUrl(code) {
    return `https://flagcdn.com/w160/${code.toLowerCase()}.png`
  }
</script>

<section class="max-w-4xl mx-auto p-6 space-y-6">
  <header class="text-center space-y-2">
    <h1 class="text-3xl font-bold">Compare Countries</h1>
    <p class="text-base-content/70">Pick two of 195 countries and compare five metrics side by side.</p>
  </header>

  <div class="flex flex-wrap gap-3 items-center justify-center">
    <select bind:value={country1Code} class="select select-bordered select-primary" aria-label="First country">
      {#each sortedCountries as c (c.code)}
        <option value={c.code}>{c.name}</option>
      {/each}
    </select>

    <select bind:value={country2Code} class="select select-bordered select-secondary" aria-label="Second country">
      {#each sortedCountries as c (c.code)}
        <option value={c.code}>{c.name}</option>
      {/each}
    </select>
  </div>

  {#if country1 && country2}
    <div class="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <div class="text-center">
        <img
          src={getFlagUrl(country1.code)}
          alt={country1.name + ' flag'}
          loading="lazy"
          class="w-24 h-16 object-cover mx-auto rounded shadow mb-2"
        />
        <h2 class="text-xl font-bold">{country1.name}</h2>
        <p class="text-sm text-base-content/70">{humanizeContinent(country1.continent)}</p>
      </div>

      <button
        type="button"
        class="btn btn-circle btn-ghost"
        aria-label="Swap countries"
        title="Swap countries"
        onclick={swapCountries}
      >
        <span aria-hidden="true" class="text-xl">⇄</span>
      </button>

      <div class="text-center">
        <img
          src={getFlagUrl(country2.code)}
          alt={country2.name + ' flag'}
          loading="lazy"
          class="w-24 h-16 object-cover mx-auto rounded shadow mb-2"
        />
        <h2 class="text-xl font-bold">{country2.name}</h2>
        <p class="text-sm text-base-content/70">{humanizeContinent(country2.continent)}</p>
      </div>
    </div>
  {/if}

  <div class="space-y-4" role="region" aria-label="Metric comparisons">
    {#each metrics as metric (metric.key)}
      {@const cmp = getComparison(country1, country2, metric)}
      <div
        class="card bg-base-200 p-4"
        role="group"
        aria-label={`${metric.label}: ${country1?.name ?? '—'} ${cmp.formatted1}, ${country2?.name ?? '—'} ${cmp.formatted2}`}
      >
        <div class="text-sm font-medium mb-2 text-center">{metric.label}</div>

        <div class="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div class="flex items-center gap-2">
            <div
              class="flex-1 h-8 bg-base-300 rounded-lg overflow-hidden flex justify-end"
              role="progressbar"
              aria-valuenow={cmp.pct1}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`${country1?.name ?? '—'}: ${cmp.formatted1}`}
            >
              <div
                class="h-full rounded-lg transition-all duration-500 {cmp.winner === 1 ? 'bg-primary' : 'bg-base-content/30'}"
                style="width: {cmp.pct1}%"
              ></div>
            </div>
            <span
              class="font-mono text-sm w-24 text-right {cmp.winner === 1 ? 'font-bold text-primary' : ''}"
              aria-hidden="true"
            >{cmp.formatted1}</span>
          </div>

          <div class="w-16 text-center text-xs" aria-hidden="true">{metric.unit}</div>

          <div class="flex items-center gap-2">
            <span
              class="font-mono text-sm w-24 {cmp.winner === 2 ? 'font-bold text-secondary' : ''}"
              aria-hidden="true"
            >{cmp.formatted2}</span>
            <div
              class="flex-1 h-8 bg-base-300 rounded-lg overflow-hidden"
              role="progressbar"
              aria-valuenow={cmp.pct2}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`${country2?.name ?? '—'}: ${cmp.formatted2}`}
            >
              <div
                class="h-full rounded-lg transition-all duration-500 {cmp.winner === 2 ? 'bg-secondary' : 'bg-base-content/30'}"
                style="width: {cmp.pct2}%"
              ></div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
