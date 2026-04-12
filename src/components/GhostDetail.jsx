export default function GhostDetail({ ghostName, ghostInfo }) {
  const femaleFilterLabel = 'Betina'
  const mediaTypeText = {
    Photo: 'Photo',
    Video: 'Video',
    Audio: 'Audio'
  }

  if (!ghostInfo) {
    return (
      <article className="journal-card">
        <h2 className="card-title">Select a Ghost</h2>
        <p className="card-note">Pilih ghost dari daftar untuk melihat detail investigasi.</p>
      </article>
    )
  }

  const hasFemaleTag = (ghostInfo.guessFilters || []).includes(femaleFilterLabel)

  const renderProofMedia = (item) => {
    if (!item.file) {
      return null
    }

    if (item.type === 'Photo') {
      return (
        <a href={item.file} target="_blank" rel="noreferrer" className="proof-media-link">
          <img src={item.file} alt={`Bukti ${ghostName}`} className="proof-media-photo" loading="lazy" />
        </a>
      )
    }

    if (item.type === 'Video') {
      return (
        <video className="proof-media-video" controls preload="metadata">
          <source src={item.file} />
          Browser tidak mendukung pemutar video.
        </video>
      )
    }

    if (item.type === 'Audio') {
      return (
        <audio className="proof-media-audio" controls preload="metadata">
          <source src={item.file} />
          Browser tidak mendukung pemutar audio.
        </audio>
      )
    }

    return (
      <a href={item.file} target="_blank" rel="noreferrer" className="proof-media-link">
        Buka file bukti
      </a>
    )
  }

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

      {ghostInfo.mediaProof?.length ? (
        <>
          <h3 className="evidence-title">Rekaman Sifat Ghost</h3>
          <ul className="evidence-list" aria-live="polite">
            {ghostInfo.mediaProof.map((item, index) => (
              <li key={`${item.type}-${index}`}>
                <strong>{mediaTypeText[item.type] || item.type}:</strong> {item.note}
                {item.file ? (
                  <div className="proof-media-wrap">
                    {renderProofMedia(item)}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  )
}
