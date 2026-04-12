export default function GhostList({
  ghostNames,
  hiddenGhostNames = [],
  selectedGhost,
  onSelectGhost,
  activeFilter,
  onFilterChange,
  filterOptions,
  activeEvidences,
  onEvidenceToggle,
  evidenceOptions
}) {
  const activeEvidenceLabel = activeEvidences.join(', ')

  return (
    <article className="journal-card">
      <h2 className="card-title">Setang</h2>
      <p className="card-note">Tebak Hantu Secara No Evidance :</p>
      <div className="filter-wrap" aria-label="Filter tebakan ghost">
        {filterOptions.map((filterName) => (
          <button
            key={filterName}
            type="button"
            className={`filter-chip ${activeFilter === filterName ? 'is-active' : ''}`}
            onClick={() => onFilterChange(filterName)}
            aria-pressed={activeFilter === filterName}
          >
            {filterName}
          </button>
        ))}
      </div>

      <p className="card-note filter-result-note">
        Filter aktif: <strong>{activeFilter}</strong> ({ghostNames.length} ghost)
      </p>

      <p className="card-note">Tebak Hantu Pake Evidence:</p>
      <div className="filter-wrap" aria-label="Filter evidence ghost">
        {evidenceOptions.map((evidenceName) => (
          <button
            key={evidenceName}
            type="button"
            className={`filter-chip ${activeEvidences.includes(evidenceName) ? 'is-active' : ''}`}
            onClick={() => onEvidenceToggle(evidenceName)}
            aria-pressed={activeEvidences.includes(evidenceName)}
          >
            {evidenceName}
          </button>
        ))}
      </div>

      <p className="card-note filter-result-note">
        Evidence aktif: <strong>{activeEvidenceLabel}</strong>
      </p>

      <ul className="ghost-grid" aria-label="Daftar jenis hantu">
        {ghostNames.map((name) => (
          <li key={name}>
            <button
              className={`ghost-button ${hiddenGhostNames.includes(name) ? 'ghost-button--hidden' : ''} ${selectedGhost === name ? 'is-active' : ''}`}
              onClick={() => onSelectGhost(name)}
              aria-pressed={selectedGhost === name}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

