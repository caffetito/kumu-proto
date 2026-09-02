// KUMU — znovupoužitelné kusy HTML. Každá funkce vrací řetězec, nic nekreslí sama.

import { czk, fmtRange, initialy } from "./format.js";
import { jobCastka, jobOdhad, rozpocetProjektu, rozdilProtiStropu } from "./compute.js";

export function pill(label, action, aktivni, extraAttrs = "") {
  return `<button class="pill ${aktivni ? "pill--active" : ""}" data-action="${action}" ${extraAttrs}>${label}</button>`;
}

export function tlacitkoPrimarni(label, action, extraAttrs = "") {
  return `<button class="btn btn--primary" data-action="${action}" ${extraAttrs}>${label}</button>`;
}

export function tlacitkoSekundarni(label, action, extraAttrs = "") {
  return `<button class="btn btn--secondary" data-action="${action}" ${extraAttrs}>${label}</button>`;
}

export function karta(obsah, { raised = false, extraClass = "" } = {}) {
  return `<div class="card ${raised ? "card--raised" : ""} ${extraClass}">${obsah}</div>`;
}

export function mikropopisek(text) {
  return `<div class="micro">${text}</div>`;
}

// --- rozpočtový blok --------------------------------------------------

export function radekSoucet(label, castka, semantika = "neutral") {
  const trida = semantika === "over" ? "sum-row--over" : semantika === "under" ? "sum-row--under" : "";
  return `<div class="sum-row ${trida}"><span>${label}</span><span class="sum-row__castka">${czk(castka)}</span></div>`;
}

export function polozkySeznam(polozky) {
  return `<ul class="line-items">${polozky
    .map((p) => `<li class="line-item"><span>${p.nazev}${p.znacka ? ` <span class="line-item__znacka">${p.znacka}</span>` : ""}</span><span>${czk(p.castka)}</span></li>`)
    .join("")}</ul>`;
}

export function rozpoctovyBlokProjektu(projekt, vybranePaky) {
  const rozpocet = rozpocetProjektu(projekt, vybranePaky);
  const rozdil = rozdilProtiStropu(projekt, vybranePaky);
  const semantika = rozdil < 0 ? "over" : "under";
  const label = rozdil < 0 ? "Difference" : "Headroom";
  const pct = Math.min(100, Math.round((rozpocet / projekt.zadani.strop) * 100));
  return karta(
    `
    <div class="budget-block">
      ${radekSoucet("Total", rozpocet)}
      ${radekSoucet("Your ceiling", projekt.zadani.strop)}
      ${radekSoucet(label, Math.abs(rozdil), semantika)}
      <div class="gauge">
        <div class="gauge__track"></div>
        <div class="gauge__fill ${semantika === "over" ? "gauge__fill--over" : "gauge__fill--under"}" style="width:${pct}%"></div>
      </div>
    </div>`,
    { raised: true }
  );
}

// --- páky ---------------------------------------------------------

export function pakaRadek(paka, jobId, vybrano) {
  return `
    <label class="lever ${vybrano ? "lever--active" : ""}">
      <input type="checkbox" data-action="toggle-paka" data-paka="${paka.id}" data-job="${jobId}" ${vybrano ? "checked" : ""} />
      <span class="lever__body">
        <span class="lever__popis">${paka.popis}</span>
        <span class="lever__dopad">${paka.dopad}</span>
      </span>
      <span class="lever__uspora">-${czk(paka.uspora)}</span>
    </label>`;
}

// --- kandidáti / dlaždice -------------------------------------------

export function kandidatDlazdice(kandidat, jobId, vybrano) {
  return `
    <button class="candidate ${vybrano ? "candidate--selected" : ""}" data-action="vybrat-kandidata" data-job="${jobId}" data-kandidat="${kandidat.id}">
      <span class="candidate__avatar">${initialy(kandidat.jmeno)}</span>
      <span class="candidate__info">
        <span class="candidate__jmeno">${kandidat.jmeno}${vybrano ? " ✓" : ""}</span>
        <span class="candidate__meta">${kandidat.hodnoceni.toFixed(1)} · ${kandidat.zakazek} jobs</span>
      </span>
      <span class="candidate__castka">${czk(kandidat.castka)}</span>
    </button>`;
}

const STAV_LABEL = {
  napad: "Not scoped yet",
  nepoptano: "Not requested yet",
  poptano: "Waiting on bids",
  nabidky: "Bids in",
  "zadano-remeslnikovi": "Assigned",
  probiha: "In progress",
  hotovo: "Done",
};

export function stavStitek(stavTrhu) {
  return `<span class="tag tag--${stavTrhu}">${STAV_LABEL[stavTrhu] || stavTrhu}</span>`;
}

// --- karta práce (Project) -------------------------------------------

export function kartaPrace(job, vybranePaky) {
  const castka = jobCastka(job, vybranePaky);
  const maNabidky = job.kandidati && job.kandidati.length > 0;
  return `
    <div class="job-card">
      <button class="job-card__header" data-action="otevrit-job" data-job="${job.id}">
        <span class="job-card__nazev">${job.nazev}</span>
        ${stavStitek(job.stavTrhu)}
        <span class="job-card__castka">${czk(castka)}</span>
      </button>
      ${
        maNabidky
          ? `<div class="job-card__kandidati">${job.kandidati.map((k) => kandidatDlazdice(k, job.id, job.vybranyKandidat === k.id)).join("")}</div>`
          : `<p class="job-card__cekame">${job.stavTrhu === "napad" ? "Not scoped yet." : "Request sent. Bids usually arrive within 10 days."}</p>`
      }
    </div>`;
}

// --- panel týmu -------------------------------------------------------

export function panelTym(projekt, vybranePaky) {
  const obsazeno = projekt.joby.filter((j) => j.vybranyKandidat).length;
  const celkem = projekt.joby.length;
  const rozpocet = rozpocetProjektu(projekt, vybranePaky);
  const rozdil = rozdilProtiStropu(projekt, vybranePaky);
  const nejlevnejsiNaKlic = projekt.nabidkyFirem.length
    ? Math.min(...projekt.nabidkyFirem.map((f) => f.castka))
    : null;
  return karta(
    `
    <div class="team-panel">
      <div class="team-panel__stitek">DRAFT</div>
      <h3>Your team</h3>
      <p class="micro">You pick the people. We keep the sequence straight.</p>
      <div class="team-panel__sloty">
        ${projekt.joby
          .map(
            (job) => `
          <div class="team-slot ${job.vybranyKandidat ? "team-slot--plna" : ""}">
            <span class="team-slot__profese">${job.profese.toUpperCase()}</span>
            ${
              job.vybranyKandidat
                ? `<span class="team-slot__jmeno">${job.realizator.jmeno} · ${czk(jobCastka(job, vybranePaky))}</span>`
                : job.kandidati && job.kandidati.length
                ? `<span class="team-slot__prazdny">Choose someone</span>`
                : `<span class="team-slot__prazdny">Waiting on bids</span>`
            }
          </div>`
          )
          .join("")}
      </div>
      <div class="team-panel__soucet">
        ${radekSoucet(`${obsazeno} of ${celkem} chosen`, rozpocet)}
        ${radekSoucet(rozdil < 0 ? "Over your budget" : "Under your budget", Math.abs(rozdil), rozdil < 0 ? "over" : "under")}
      </div>
      ${tlacitkoPrimarni("Confirm your team", "potvrdit-tym", obsazeno === celkem ? "" : "disabled")}
      ${
        nejlevnejsiNaKlic
          ? `<button class="team-panel__naklic" data-action="cesta-na-klic">Or hand the whole job to one firm — from ${czk(nejlevnejsiNaKlic)}</button>`
          : ""
      }
    </div>`,
    { raised: true }
  );
}

// --- harmonogram ---------------------------------------------------------

export function harmonogram(joby) {
  const sJoby = joby.filter((j) => j.od && j.do);
  if (!sJoby.length) return "";
  const vsechnyDatumy = sJoby.flatMap((j) => [new Date(j.od).getTime(), new Date(j.do).getTime()]);
  const min = Math.min(...vsechnyDatumy);
  const max = Math.max(...vsechnyDatumy);
  const rozsah = max - min || 1;
  return `
    <div class="timeline">
      ${sJoby
        .map((j) => {
          const zac = ((new Date(j.od).getTime() - min) / rozsah) * 100;
          const sirka = Math.max(2, ((new Date(j.do).getTime() - new Date(j.od).getTime()) / rozsah) * 100);
          const plny = j.vybranyKandidat ? "timeline__segment--plny" : "timeline__segment--obrys";
          return `<div class="timeline__segment ${plny}" style="left:${zac}%;width:${sirka}%" title="${j.nazev}: ${fmtRange(j.od, j.do)}"></div>`;
        })
        .join("")}
    </div>`;
}

// --- rám telefonu (řemeslník) ------------------------------------------

export function ramTelefonu(obsahHtml) {
  return `<div class="phone"><div class="phone__notch"></div><div class="phone__screen">${obsahHtml}</div></div>`;
}

export function spodniNavigaceMobil(aktivni) {
  const polozky = [
    { id: "today", label: "Today" },
    { id: "opportunities", label: "Opportunities" },
    { id: "invoices", label: "Invoices" },
    { id: "profile", label: "Profile" },
  ];
  return `<nav class="phone-nav">
    ${polozky
      .map(
        (p) => `<button class="phone-nav__item ${aktivni === p.id ? "phone-nav__item--active" : ""}" data-action="trade-tab" data-tab="${p.id}">${p.label}</button>`
      )
      .join("")}
  </nav>`;
}

// --- číslovaný krok, patička --------------------------------------------

export function cislovanyKrok(cislo, nadpis, text) {
  return `<div class="step"><span class="step__cislo">${String(cislo).padStart(2, "0")}</span><h3>${nadpis}</h3><p>${text}</p></div>`;
}

export function patka() {
  return `
    <footer class="footer">
      <div class="footer__brand">
        <strong>Kumu</strong>
        <p>One project, planned and delivered on one platform.</p>
      </div>
      <div class="footer__odkazy">
        <div><span class="micro">KUMU</span><a href="#">About us</a><a href="#">How it works</a><a href="#">For trades</a></div>
        <div><span class="micro">SUPPORT</span><a href="#">FAQ</a><a href="#">Contact</a><a href="#">Report a problem</a></div>
        <div><span class="micro">LEGAL</span><a href="#">Terms</a><a href="#">Privacy</a><a href="#">Cookie settings</a></div>
      </div>
      <div class="footer__provozovatel micro">Operated by NejŘemeslníci.cz s.r.o. © 2026</div>
    </footer>`;
}

export function horniPruh(role) {
  return `
    <header class="topbar topbar--${role}">
      <span class="topbar__brand">Kumu</span>
      ${role === "zakaznik" ? `<a class="topbar__login" href="#">Log in</a>` : ""}
    </header>`;
}
