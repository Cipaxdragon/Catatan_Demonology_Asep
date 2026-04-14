import { useEffect } from 'react'

export default function StepComparisonPopup({ open, onClose }) {
  if (!open) return null

  return (
    <div className="step-popup-overlay" onClick={onClose}>
      <div className="step-popup" onClick={e => e.stopPropagation()} style={{ fontFamily: 'inherit' }}>
        <h2 style={{ fontFamily: 'inherit' }}>Perbedaan Step Lari & Step Normal</h2>
        <div className="step-popup-audio-list">
          <div>
            <strong style={{ fontFamily: 'inherit' }}>Step Lari</strong>
            <audio controls src="/proofs/step-lari.mp3" style={{ width: '100%' }} />
          </div>
          <div style={{ marginTop: 16 }}>
            <strong style={{ fontFamily: 'inherit' }}>Step Normal</strong>
            <audio controls src="/proofs/Step_Normal.mp3" style={{ width: '100%' }} />
          </div>
        </div>
        <button className="step-popup-close" onClick={onClose} style={{ fontFamily: 'inherit' }}>Tutup</button>
      </div>
    </div>
  )
}
