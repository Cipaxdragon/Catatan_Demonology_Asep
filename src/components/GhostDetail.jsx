export default function GhostDetail({ ghostName, ghostInfo }) {
  const femaleFilterLabel = 'Betina'

  if (!ghostInfo) {
    return (
      <article className="journal-card">
        <h2 className="card-title">Select a Ghost</h2>
        <p className="card-note">Pilih ghost dari daftar untuk melihat detail investigasi.</p>
      </article>
    )
  }

  const hasFemaleTag = (ghostInfo.guessFilters || []).includes(femaleFilterLabel)

  return (
    <article className="journal-card">
      <div className="card-title-row">
        <h2 className="card-title card-title-inline">{ghostName}</h2>
        {hasFemaleTag ? <span className="ghost-tag female-tag">Female</span> : null}
      </div>
      <div className="nightmare-layout">
        <div className="nightmare-mark" aria-hidden="true"></div>
        <div>
          <p className="card-note detail-main-row">
            <strong>Type:</strong> <span>{ghostInfo.type}</span>
          </p>
          <p className="card-note detail-main-row">
            <strong>Threat:</strong> <span>{ghostInfo.threat}</span>
          </p>
          <p className="card-note detail-main-row">
            <strong>Step:</strong> <span>{ghostInfo.step || '-'}</span>
          </p>
          <p className="card-note detail-main-row">
            <strong>Keganasan:</strong> <span>{ghostInfo.aggressiveness || '-'}</span>
          </p>
          <p className="card-note detail-main-row">
            <strong>Filter Tebakan:</strong>{' '}
            <span>{(ghostInfo.guessFilters || []).join(', ') || '-'}</span>
          </p>
          <p className="card-note detail-main-row">
            <strong>Signs:</strong> <span>{ghostInfo.signs}</span>
          </p>
          <p className="card-note detail-main-row">
            <strong>Tips:</strong> <span>{ghostInfo.tips}</span>
          </p>
        </div>
      </div>

      <h3 className="evidence-title">Evidence</h3>
      <ul className="evidence-list" aria-live="polite">
        {ghostInfo.evidence.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
