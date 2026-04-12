import { useMemo, useState } from 'react'
import ghostRoomFavorites from '../data/ghostRoomFavorites'

export default function GhostRoomFavorite({ onGhostSelect }) {
  const mapNames = Object.keys(ghostRoomFavorites.maps)
  const [selectedMap, setSelectedMap] = useState(mapNames[0])

  const getMapStatus = (mapName) => ghostRoomFavorites.completionStatus?.[mapName] || 'Belum Lengkap'

  const roomEntries = useMemo(() => {
    const rooms = ghostRoomFavorites.maps[selectedMap] || {}
    return Object.entries(rooms)
  }, [selectedMap])

  return (
    <section className="mx-auto mt-6 max-w-5xl">
      <article className="journal-card">
        <h2 className="card-title">Ghost Favorite Room</h2>
        <p className="card-note">
          Jika di awal hunt ghost muncul di room berikut, kandidat ghost bisa dipersempit ke daftar room tersebut.
        </p>

        <ul className="mt-3 list-disc pl-5 text-[0.86rem] leading-relaxed" aria-label="Panduan cek ghost room">
          {ghostRoomFavorites.guide.map((item, index) => (
            <li key={index} className="my-1">{item}</li>
          ))}
        </ul>

        <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
          <p className="m-0 text-sm font-bold">Map</p>
          <p className="m-0 text-xs opacity-85">{roomEntries.length} room terdata</p>
          <span
            className={`rounded-full border px-2 py-0.5 text-xs font-bold ${getMapStatus(selectedMap) === 'Lengkap' ? 'border-emerald-900/40 bg-emerald-200/70 text-emerald-900' : 'border-amber-900/40 bg-amber-200/75 text-amber-900'}`}
          >
            {getMapStatus(selectedMap)}
          </span>
        </div>

        <div className="mt-2 md:hidden">
          <label htmlFor="favorite-map-select" className="sr-only">Pilih map</label>
          <select
            id="favorite-map-select"
            value={selectedMap}
            onChange={(event) => setSelectedMap(event.target.value)}
            className="w-full rounded-md border border-[#3b322c] bg-white/40 px-2.5 py-2 text-sm"
          >
            {mapNames.map((mapName) => (
              <option key={mapName} value={mapName}>
                {mapName} ({getMapStatus(mapName)})
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 hidden grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid md:grid-cols-3">
          {mapNames.map((mapName) => (
            <button
              key={mapName}
              type="button"
              onClick={() => setSelectedMap(mapName)}
              className={`flex items-center justify-between rounded-md border px-2 py-1.5 text-left transition-colors ${selectedMap === mapName ? 'border-[#6a1717] bg-[#7d0000]/20' : 'border-[#3b322c] bg-black/5 hover:bg-[#7d0000]/10'}`}
              aria-pressed={selectedMap === mapName}
            >
              <span className="text-xs font-semibold">{mapName}</span>
              <span
                className={`rounded-full border px-2 py-0.5 text-[0.7rem] font-bold ${getMapStatus(mapName) === 'Lengkap' ? 'border-emerald-900/40 bg-emerald-200/70 text-emerald-900' : 'border-amber-900/40 bg-amber-200/75 text-amber-900'}`}
              >
                {getMapStatus(mapName)}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3.5 grid grid-cols-1 gap-2.5 md:grid-cols-2" aria-live="polite">
          {roomEntries.map(([roomName, ghosts]) => (
            <article
              key={roomName}
              className="rounded-lg border border-[#3b322c] bg-black/5 px-2.5 py-2"
            >
              <h3 className="m-0 font-['Cinzel'] text-[0.95rem] uppercase tracking-[0.08em]">{roomName}</h3>
              <ul className="mt-2 grid grid-cols-2 gap-1.5 text-[0.8rem] sm:grid-cols-3" aria-label={`Daftar ghost room ${roomName}`}>
                {ghosts.map((ghostName) => (
                  <li
                    key={ghostName}
                    className="list-none"
                  >
                    <button
                      type="button"
                      onClick={() => onGhostSelect?.(ghostName)}
                      className="w-full rounded-md border border-[#3b322c] bg-white/35 px-2 py-1 text-center leading-tight transition-colors hover:bg-[#7d0000]/12"
                    >
                      {ghostName}
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}
