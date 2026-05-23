export function formatNumber(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B'
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)         return (n / 1_000).toFixed(1) + 'K'
  return n.toLocaleString()
}

export function humanizeContinent(c) {
  if (!c) return ''
  return c.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()
}

export function getComparison(country1, country2, metric) {
  const v1 = country1?.[metric.key] ?? 0
  const v2 = country2?.[metric.key] ?? 0
  const max = Math.max(v1, v2)
  const pct1 = max > 0 ? (v1 / max) * 100 : 0
  const pct2 = max > 0 ? (v2 / max) * 100 : 0
  const winner = v1 > v2 ? 1 : v2 > v1 ? 2 : 0
  const ratio = winner === 0 ? '-'
              : winner === 1 && v2 > 0 ? (v1 / v2).toFixed(1) + 'x'
              : winner === 2 && v1 > 0 ? (v2 / v1).toFixed(1) + 'x'
              : '-'
  return {
    value1: v1, value2: v2,
    pct1, pct2,
    formatted1: metric.format(v1),
    formatted2: metric.format(v2),
    winner, ratio,
  }
}
