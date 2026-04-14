import { useEffect, useRef, useState } from 'react'
import StepComparisonPopup from './StepComparisonPopup'

function formatAudioTime(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return '0:00'
  }

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}



function ProofAudioPlayer({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)


  // Tidak perlu reset manual, gunakan key pada audio agar benar-benar unmount & mount ulang saat src berubah

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return undefined
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value)
    const audio = audioRef.current

    if (!audio || !Number.isFinite(nextTime)) {
      return
    }

    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  // Jangan render audio element jika src kosong/null
  if (!src) return null

  return (
    <div className="proof-audio-player">
      <audio
        ref={audioRef}
        preload="metadata"
        key={src} // force remount audio element when src changes
      >
        <source src={src} />
        Browser tidak mendukung pemutar audio.
      </audio>

      <button
        type="button"
        className="proof-audio-play"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <div className="proof-audio-timeline-wrap">
        <input
          type="range"
          className="proof-audio-timeline"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={handleSeek}
          disabled={!duration}
          aria-label="Progress audio"
        />
        <div className="proof-audio-time">
          <span>{formatAudioTime(currentTime)}</span>
          <span>{formatAudioTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default function GhostDetail({ ghostName, ghostInfo }) {
  const [showStepPopup, setShowStepPopup] = useState(false)
  const femaleFilterLabel = 'Betina'
  const mediaTypeText = {
    Photo: 'Photo',
    Video: 'Video',
    Audio: 'Audio'
  }

  // Cek tipe pelari dari meta (step === 'Pelari')
  const isPelari = ghostInfo?.step === 'Pelari' || (ghostInfo?.guessFilters || []).includes('Hantu Pelari')

  // Tombol floating di atas permukaan, bukan di dalam card
  const stepButton = isPelari ? (
    <button
      className="step-popup-trigger step-popup-floating"
      onClick={() => setShowStepPopup(true)}
      style={{ position: 'fixed', top: '32px', right: '32px', zIndex: 1200 }}
    >
      🔊 Perbedaan Step Lari & Normal
    </button>
  ) : null

  if (!ghostInfo) {
    return (
      <>
        {stepButton}
        <article className="journal-card">
          <h2 className="card-title">Select a Ghost</h2>
          <p className="card-note">Pilih ghost dari daftar untuk melihat detail investigasi.</p>
        </article>
      </>
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
        <ProofAudioPlayer src={item.file} />
      )
    }

    return (
      <a href={item.file} target="_blank" rel="noreferrer" className="proof-media-link">
        Buka file bukti
      </a>
    )
  }

  return (
    <>
    {stepButton}
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
          <h3 className="evidence-title">Sifat Ghost</h3>
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
    <StepComparisonPopup open={showStepPopup} onClose={() => setShowStepPopup(false)} />
    </>
  )
}
