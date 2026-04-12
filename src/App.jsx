import { useEffect, useMemo, useRef, useState } from 'react'
import ghostDetails from './data/ghostDetails.js'
import GhostList from './components/GhostList'
import GhostDetail from './components/GhostDetail'
import GhostRoomFavorite from './components/GhostRoomFavorite'
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

const ALL_NO_EVIDENCE_FILTER = 'Semua'
const ALL_EVIDENCE_FILTER = 'Semua Evidence'

export default function App() {
  const [selectedGhost, setSelectedGhost] = useState('Aswang')
  const [activeFilter, setActiveFilter] = useState(ALL_NO_EVIDENCE_FILTER)
  const [activeEvidences, setActiveEvidences] = useState([ALL_EVIDENCE_FILTER])
  const ghostDetailRef = useRef(null)
  const ghostNames = Object.keys(ghostDetails)

  const hiddenGhostNames = useMemo(
    () => ghostNames.filter((name) => ghostDetails[name].hidden),
    [ghostNames]
  )

  const displayGhostNames = useMemo(() => {
    return [...ghostNames].sort((leftName, rightName) => {
      const leftHidden = Boolean(ghostDetails[leftName].hidden)
      const rightHidden = Boolean(ghostDetails[rightName].hidden)

      if (leftHidden !== rightHidden) {
        return leftHidden ? 1 : -1
      }

      return leftName.localeCompare(rightName)
    })
  }, [ghostNames])

  const evidenceOptions = useMemo(() => {
    const evidenceSet = new Set()
    ghostNames.forEach((name) => {
      if (ghostDetails[name].hidden) {
        return
      }

      ;(ghostDetails[name].evidence || []).forEach((item) => evidenceSet.add(item))
    })

    return [ALL_EVIDENCE_FILTER, ...Array.from(evidenceSet)]
  }, [ghostNames])

  const handleEvidenceFilterToggle = (evidenceName) => {
    setActiveEvidences((previous) => {
      if (evidenceName === ALL_EVIDENCE_FILTER) {
        return [ALL_EVIDENCE_FILTER]
      }

      const previousWithoutAll = previous.filter((item) => item !== ALL_EVIDENCE_FILTER)
      const isActive = previousWithoutAll.includes(evidenceName)

      if (isActive) {
        const next = previousWithoutAll.filter((item) => item !== evidenceName)
        return next.length ? next : [ALL_EVIDENCE_FILTER]
      }

      return [...previousWithoutAll, evidenceName]
    })
  }

  const normalizeGhostName = (name) =>
    name
      .replace(/\([^)]*\)/g, '')
      .replace(/\bthe\s+/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase()

  const ghostAliasMap = {
    banshe: 'Banshee',
    nigmare: 'Nightmare',
    nigmmare: 'Nightmare',
    dybuk: 'Dybbuk',
    dyybuk: 'Dybbuk',
    specs: 'Specter',
    shadaow: 'Shadow',
    phan: 'Phantom',
    ban: 'Banshee',
    rev: 'Revenant',
    lev: 'Leviathan',
    ker: 'Keres',
    asw: 'Aswang',
    wen: 'Wendigo',
    wra: 'Wraith',
    dem: 'Demon',
    sir: 'Siren',
    gh: 'Ghoul',
    ent: 'Entity',
    spec: 'Specter',
    skin: 'Skinwalker',
    shad: 'Shadow',
    nm: 'Nightmare',
    umb: 'Umbra',
    dull: 'Dullahan',
    dyb: 'Dybbuk'
  }

  const ghostLookup = useMemo(() => {
    const lookup = {}
    displayGhostNames.forEach((name) => {
      lookup[normalizeGhostName(name)] = name
    })
    Object.entries(ghostAliasMap).forEach(([alias, target]) => {
      lookup[alias] = target
    })
    return lookup
  }, [displayGhostNames])

  const handleFavoriteGhostSelect = (roomGhostName) => {
    const normalized = normalizeGhostName(roomGhostName)
    const resolved = ghostLookup[normalized]
    if (!resolved || !ghostDetails[resolved]) {
      return
    }

    setActiveFilter(ALL_NO_EVIDENCE_FILTER)
    setSelectedGhost(resolved)

    requestAnimationFrame(() => {
      ghostDetailRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  const filteredGhostNames = useMemo(() => {
    const noEvidenceFilterIsAll = activeFilter === ALL_NO_EVIDENCE_FILTER
    const evidenceFilterIsAll = activeEvidences.includes(ALL_EVIDENCE_FILTER)

    return displayGhostNames.filter((name) => {
      if (ghostDetails[name].hidden && (!noEvidenceFilterIsAll || !evidenceFilterIsAll)) {
        return false
      }

      const tags = ghostDetails[name].guessFilters || []
      const evidence = ghostDetails[name].evidence || []

      const passNoEvidenceFilter = noEvidenceFilterIsAll || tags.includes(activeFilter)
      const passEvidenceFilter = evidenceFilterIsAll || activeEvidences.every((item) => evidence.includes(item))

      return passNoEvidenceFilter && passEvidenceFilter
    })
  }, [activeFilter, activeEvidences, displayGhostNames])

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
        <p className="journal-kicker"> Journal Asep</p>
        <h1 className="journal-title">Demonology Tipstod</h1>
        <p className="journal-subtitle">
          Ini adalah catatan tips dan trik to the point yang dikumpulkan untuk membantu sesama player demonology yang ingin bermain lebih tepat dan ga bego tai babi Sotoy.
        </p>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <GhostList
          ghostNames={filteredGhostNames}
          hiddenGhostNames={hiddenGhostNames}
          selectedGhost={selectedGhost}
          onSelectGhost={setSelectedGhost}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filterOptions={FILTER_OPTIONS}
          activeEvidences={activeEvidences}
          onEvidenceToggle={handleEvidenceFilterToggle}
          evidenceOptions={evidenceOptions}
        />
        <div ref={ghostDetailRef}>
          <GhostDetail
            ghostName={selectedGhost}
            ghostInfo={ghostDetails[selectedGhost]}
            isHidden={Boolean(ghostDetails[selectedGhost]?.hidden)}
          />
        </div>
      </section>

      <GhostRoomFavorite onGhostSelect={handleFavoriteGhostSelect} />

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
            Dibuat Oleh               <a
                className="credits-link"
                href="https://www.roblox.com/search/users?keyword=asep_salamanca"
                target="_blank"
                rel="noreferrer"
              >
                asep_salamanca 
              </a>  menggunakan <strong>React JS</strong>
          </p>
        </div>

        <section className="credits-panel">
          <div className="credits-row credits-row--hero">
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
                Asep 
              </a>
            </dd>
          </div>
        </section>

        <section className="credits-panel credits-panel--data" aria-label="Pengumpul Data">
          <h3 className="credits-section-title">Pengumpul Data</h3>
          <div className="credits-chip-list">
            <a className="credits-chip" href="https://www.roblox.com/search/users?keyword=Asep_Salamanca" target="_blank" rel="noreferrer">Asep_Salamanca</a>
            <a className="credits-chip" href="https://www.roblox.com/search/users?keyword=denjimori1" target="_blank" rel="noreferrer">denjimori1</a>
            <a className="credits-chip" href="https://www.roblox.com/search/users?keyword=gent1st" target="_blank" rel="noreferrer">gent1st</a>
            <a className="credits-chip" href="https://www.roblox.com/search/users?keyword=kimmy260624" target="_blank" rel="noreferrer">kimmy260624</a>
          </div>
        </section>

        <section className="credits-panel credits-panel--thanks" aria-label="Ucapan terima kasih">
          <h3 className="credits-section-title">Terima Kasih</h3>
          <p className="credits-thanks-text">
            Terima kasih untuk sepuh sepuh{' '}
            <a className="credits-link" href="https://www.roblox.com/search/users?keyword=URACLE7" target="_blank" rel="noreferrer">URACLE7</a>,{' '}
            <a className="credits-link" href="https://www.roblox.com/search/users?keyword=Preman0123" target="_blank" rel="noreferrer">Preman0123</a>,{' '}
            <a className="credits-link" href="https://www.roblox.com/search/users?keyword=djheaven22" target="_blank" rel="noreferrer">djheaven22</a>,{' '}
            <a className="credits-link" href="https://www.roblox.com/search/users?keyword=xAstriii" target="_blank" rel="noreferrer">xAstriii</a>,{' '}
            <a className="credits-link" href="https://www.roblox.com/search/users?keyword=HexXiIer" target="_blank" rel="noreferrer">HexXiIer</a>,{' '}
            <a className="credits-link" href="https://www.roblox.com/search/users?keyword=easyfeat" target="_blank" rel="noreferrer">EasyFeat</a>{' '}
            yang menjadi penemu ghost no evidance traits. Sehingga kita bisa main demonology lebih mudah.
          </p>
        </section>

        <section className="credits-panel credits-panel--notice" aria-label="Catatan credits">
          <h3 className="credits-section-title">Catatan</h3>
          <p className="credits-thanks-text">
            Data ini masih belum lengkap, masih perlu mencari data. Jika ingin membantu silahkan hubungi saya di discord nickname: <strong>Asep_salamanca</strong>.
          </p>
        </section>

        <section className="credits-panel credits-panel--social" aria-label="Sosial media">
          <h3 className="credits-section-title">Sosial Media</h3>
          <div className="credits-social-list">
            <a
              className="credits-social-link"
              href="https://discord.com/users/847162007080927302"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord pribadi"
              title="Discord pribadi"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.4 5.5a16 16 0 0 0-4-1.3l-.2.4a13 13 0 0 1 3.8 1.4 12.7 12.7 0 0 0-4.1-1.2 13 13 0 0 0-1 .9 9.4 9.4 0 0 1 3.6 1.1 16 16 0 0 0-5.5-1 16 16 0 0 0-5.5 1 9.4 9.4 0 0 1 3.6-1.1 13 13 0 0 0-1-.9 12.7 12.7 0 0 0-4.1 1.2A13 13 0 0 1 8.6 4l-.2-.4a16 16 0 0 0-4 1.3A17 17 0 0 0 3 16.8a16 16 0 0 0 4.9 2.5l1.1-1.8c-.6-.2-1.1-.5-1.7-.9.1.1.2.1.3.2a11.7 11.7 0 0 0 8.8 0 .9.9 0 0 0 .3-.2c-.5.4-1.1.7-1.7.9l1.1 1.8a16 16 0 0 0 4.9-2.5A17 17 0 0 0 19.4 5.5ZM9.4 14.4c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm5.2 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z" />
              </svg>
              <span>Asep</span>
            </a>

            <a
              className="credits-social-link"
              href="https://discord.gg/ytGYDqvaeu"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord server"
              title="Discord server"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.4 5.5a16 16 0 0 0-4-1.3l-.2.4a13 13 0 0 1 3.8 1.4 12.7 12.7 0 0 0-4.1-1.2 13 13 0 0 0-1 .9 9.4 9.4 0 0 1 3.6 1.1 16 16 0 0 0-5.5-1 16 16 0 0 0-5.5 1 9.4 9.4 0 0 1 3.6-1.1 13 13 0 0 0-1-.9 12.7 12.7 0 0 0-4.1 1.2A13 13 0 0 1 8.6 4l-.2-.4a16 16 0 0 0-4 1.3A17 17 0 0 0 3 16.8a16 16 0 0 0 4.9 2.5l1.1-1.8c-.6-.2-1.1-.5-1.7-.9.1.1.2.1.3.2a11.7 11.7 0 0 0 8.8 0 .9.9 0 0 0 .3-.2c-.5.4-1.1.7-1.7.9l1.1 1.8a16 16 0 0 0 4.9-2.5A17 17 0 0 0 19.4 5.5ZM9.4 14.4c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm5.2 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z" />
              </svg>
              <span>Join Tongkrongan Kami</span>
            </a>
          </div>
        </section>
      </footer>
    </main>
  )
}

