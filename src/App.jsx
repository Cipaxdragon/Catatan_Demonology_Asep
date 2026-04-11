import { useState } from 'react'
import ghostDetails from './data/ghostDetails.js'
import GhostList from './components/GhostList'
import GhostDetail from './components/GhostDetail'

export default function App() {
  const [selectedGhost, setSelectedGhost] = useState('A')
  const ghostNames = Object.keys(ghostDetails)

  return (
    <main className="haunted-app min-h-screen px-4 py-10 md:py-14">
      <header className="mx-auto mb-8 max-w-5xl text-center md:mb-10">
        <p className="journal-kicker"> Journal Setan tod</p>
        <h1 className="journal-title">Catatan Asep </h1>
        <p className="journal-subtitle">Klik nama ghost untuk membuka informasi detail investigasinya jing.</p>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <GhostList
          ghostNames={ghostNames}
          selectedGhost={selectedGhost}
          onSelectGhost={setSelectedGhost}
        />
        <GhostDetail
          ghostName={selectedGhost}
          ghostInfo={ghostDetails[selectedGhost]}
        />
      </section>
    </main>
  )
}

