export default function GhostDetail({ ghostName, ghostInfo }) {
  if (!ghostInfo) {
    return (
      <article className="journal-card">
        <h2 className="card-title">Select a Ghost</h2>
        <p className="card-note">Pilih ghost dari daftar untuk melihat detail investigasi.</p>
      </article>
    )
  }

  return (
    <article className="journal-card">
      <h2 className="card-title">{ghostName}</h2>
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
