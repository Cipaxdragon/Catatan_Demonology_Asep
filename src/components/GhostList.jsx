export default function GhostList({ ghostNames, selectedGhost, onSelectGhost }) {
  return (
    <article className="journal-card">
      <h2 className="card-title">Setang</h2>
      <p className="card-note">Tap atau klik setiap nama untuk melihat detail:</p>
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
