import './style.css'
import ghostDetails from './data/ghostDetails.js'

const ghostNames = Object.keys(ghostDetails)

document.querySelector('#app').innerHTML = `
  <main class="haunted-app min-h-screen px-4 py-10 md:py-14">
    <header class="mx-auto mb-8 max-w-5xl text-center md:mb-10">
      <p class="journal-kicker">Field Journal</p>
      <h1 class="journal-title">Paranormal Notes</h1>
      <p class="journal-subtitle">Klik nama ghost untuk membuka informasi detail investigasi.</p>
    </header>

    <section class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
      <article class="journal-card">
        <h2 class="card-title">Ghosts</h2>
        <p class="card-note">Tap atau klik setiap nama untuk melihat detail:</p>
        <ul class="ghost-grid" aria-label="Daftar jenis hantu">
          ${ghostNames
            .map(
              (name) => `<li><button class="ghost-button" data-ghost="${name}" aria-pressed="false">${name}</button></li>`
            )
            .join('')}
        </ul>
      </article>

      <article class="journal-card">
        <h2 class="card-title" id="ghost-panel-title">Aswang</h2>
        <div class="nightmare-layout">
          <div class="nightmare-mark" aria-hidden="true"></div>
          <div>
            <p class="card-note detail-main-row"><strong>Type:</strong> <span id="ghost-detail-type"></span></p>
            <p class="card-note detail-main-row"><strong>Threat:</strong> <span id="ghost-detail-threat"></span></p>
            <p class="card-note detail-main-row"><strong>Signs:</strong> <span id="ghost-detail-signs"></span></p>
            <p class="card-note detail-main-row"><strong>Tips:</strong> <span id="ghost-detail-tips"></span></p>
          </div>
        </div>

        <h3 class="evidence-title">Evidence</h3>
        <ul id="ghost-detail-evidence" class="evidence-list" aria-live="polite"></ul>
      </article>
    </section>
  </main>
`

const detailName = document.querySelector('#ghost-panel-title')
const detailType = document.querySelector('#ghost-detail-type')
const detailThreat = document.querySelector('#ghost-detail-threat')
const detailSigns = document.querySelector('#ghost-detail-signs')
const detailTips = document.querySelector('#ghost-detail-tips')
const detailEvidence = document.querySelector('#ghost-detail-evidence')
const ghostButtons = Array.from(document.querySelectorAll('.ghost-button'))

function renderGhostDetail(ghostName) {
  const info = ghostDetails[ghostName]
  if (!info) return

  detailName.textContent = ghostName
  detailType.textContent = info.type
  detailThreat.textContent = info.threat
  detailSigns.textContent = info.signs
  detailTips.textContent = info.tips
  detailEvidence.innerHTML = info.evidence.map((item) => `<li>${item}</li>`).join('')

  ghostButtons.forEach((button) => {
    const isActive = button.dataset.ghost === ghostName
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })
}

ghostButtons.forEach((button) => {
  button.addEventListener('click', () => {
    renderGhostDetail(button.dataset.ghost)
  })
})

renderGhostDetail('Aswang')