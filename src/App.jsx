import { useEffect, useMemo, useState } from 'react'
import ghostDetails from './data/ghostDetails.js'
import GhostList from './components/GhostList'
import GhostDetail from './components/GhostDetail'
import asepProfile from './assets/credits/asep-profile.webp'

const FILTER_OPTIONS = [
  'Semua',
  'Butuh Pengorbanan',
  'Pake Alat',
  'Cuma Dilihat',
  'Butuh Trik',
  'Audio',
  'Betina',
  'Hantu Pelari',
  'Hantu Pemalu'
]

export default function App() {
  const [selectedGhost, setSelectedGhost] = useState('Aswang')
  const [activeFilter, setActiveFilter] = useState('Semua')
  const ghostNames = Object.keys(ghostDetails)

  const filteredGhostNames = useMemo(() => {
    if (activeFilter === 'Semua') {
      return ghostNames
    }

    return ghostNames.filter((name) => {
      const tags = ghostDetails[name].guessFilters || []
      return tags.includes(activeFilter)
    })
  }, [activeFilter, ghostNames])

  useEffect(() => {
    if (!filteredGhostNames.length) {
      return
    }

    if (!filteredGhostNames.includes(selectedGhost)) {
      setSelectedGhost(filteredGhostNames[0])
    }
  }, [filteredGhostNames, selectedGhost])

  return (
    <main className="haunted-app min-h-screen px-4 py-10 md:py-14">
      <header className="mx-auto mb-8 max-w-5xl text-center md:mb-10">
        <p className="journal-kicker"> Journal Setan tod</p>
        <h1 className="journal-title">Catatan Asep </h1>
        <p className="journal-subtitle">Klik nama ghost untuk membuka informasi detail investigasinya jing.</p>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <GhostList
          ghostNames={filteredGhostNames}
          selectedGhost={selectedGhost}
          onSelectGhost={setSelectedGhost}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filterOptions={FILTER_OPTIONS}
        />
        <GhostDetail
          ghostName={selectedGhost}
          ghostInfo={ghostDetails[selectedGhost]}
        />
      </section>

      <footer className="credits-footer mx-auto mt-8 max-w-5xl">
        <h2 className="credits-title">Credits</h2>

        <div className="credits-react-line">
          <span className="react-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 128 128" role="img" aria-label="React logo">
              <ellipse cx="64" cy="64" rx="52" ry="20" fill="none" />
              <ellipse cx="64" cy="64" rx="52" ry="20" fill="none" transform="rotate(60 64 64)" />
              <ellipse cx="64" cy="64" rx="52" ry="20" fill="none" transform="rotate(120 64 64)" />
              <circle cx="64" cy="64" r="6" />
            </svg>
          </span>
          <p className="credits-react-text">
            Dibuat menggunakan <strong>React JS</strong>
          </p>
        </div>

        <dl className="credits-grid">
          <div className="credits-row">
            <dt>Frontend Website Developer (React JS)</dt>
            <dd className="credits-person">
              <img
                className="credits-avatar"
                src={asepProfile}
                alt="Foto profil asep_salamanca"
                loading="lazy"
              />
              <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=asep_salamanca"
                target="_blank"
                rel="noreferrer"
              >
                asep_salamanca
              </a>
            </dd>
          </div>
          <div className="credits-row">
            <dt>Penemuan / Data</dt>
            <dd>
              <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=URACLE7"
                target="_blank"
                rel="noreferrer"
              >
                URACLE7
              </a>
              ,{' '}
              <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=denjimori1"
                target="_blank"
                rel="noreferrer"
              >
                denjimori1
              </a>
              ,{' '}
              <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=gent1st"
                target="_blank"
                rel="noreferrer"
              >
                gent1st
              </a>
              ,{' '}
              <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=Preman0123"
                target="_blank"
                rel="noreferrer"
              >
                Preman0123
              </a>
              ,{' '}
              <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=djheaven22"
                target="_blank"
                rel="noreferrer"
              >
                djheaven22
              </a>
              ,{' '}
              <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=xAstriii"
                target="_blank"
                rel="noreferrer"
              >
                xAstriii
              </a>
              ,{' '}
              <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=HexXiIer"
                target="_blank"
                rel="noreferrer"
              >
                HexXiIer
              </a>
              , dan kawan-kawan demonology
            </dd>
          </div>
          <div className="credits-row">
            <dt>Pengumpul Assets</dt>
            <dd>-</dd>
          </div>
          <div className="credits-row">
            <dt>Pencari Room</dt>
            <dd>-</dd>
          </div>
        </dl>
      </footer>
    </main>
  )
}

