export default function GhostList({
  ghostNames,
  selectedGhost,
  onSelectGhost,
  activeFilter,
  onFilterChange,
  filterOptions
}) {
  return (
    <article className="journal-card">
      <h2 className="card-title">Setang</h2>
      <p className="card-note">Tap atau klik setiap nama untuk melihat detail:</p>
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

      <ul className="ghost-grid" aria-label="Daftar jenis hantu">
        {ghostNames.map((name) => (
          <li key={name}>
            <button
              className={`ghost-button ${selectedGhost === name ? 'is-active' : ''}`}
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
