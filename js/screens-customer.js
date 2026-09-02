// KUMU — zákaznické obrazovky. Desktop, sedm obrazovek z kumu-kostra.md §7
// (nová verze v zadání, §7). Každá funkce vrací HTML, nic nekreslí sama.

import { czk, fmtRange, fmtDate } from "./format.js";
import { jobCastka, rozpocetProjektu, celkemProjekt } from "./compute.js";
import {
  karta,
  tlacitkoPrimarni,
  tlacitkoSekundarni,
  radekSoucet,
  rozpoctovyBlokProjektu,
  pakaRadek,
  kartaPrace,
  panelTym,
  harmonogram,
  kandidatDlazdice,
  cislovanyKrok,
  patka,
  horniPruh,
} from "./components.js";

export function renderZakaznik(state) {
  const obrazovka = state.ui.zakaznik.obrazovka;
  const projekt = state.projekty[state.aktivniProjektId];
  const telo = {
    landing: renderLanding,
    brief: renderBrief,
    budget: renderBudget,
    projekt: renderProjekt,
    job: renderJob,
    fakturace: renderFakturace,
    "moje-projekty": renderMojeProjekty,
  }[obrazovka](state, projekt);

  return `${obrazovka === "landing" ? "" : horniPruh("zakaznik")}<main class="screen screen--zakaznik">${telo}</main>`;
}

// --- Landing --------------------------------------------------------

function renderLanding() {
  return `
    ${horniPruh("zakaznik")}
    <section class="hero hero--landing">
      <div class="hero__text">
        <h1 class="display-xl">Describe your project. We'll handle the budget, the materials and the trades.</h1>
        <div class="hero__social-proof">
          <span>GOOGLE 4.9</span><span>TRUSTPILOT 4.9</span>
        </div>
      </div>
      <div class="hero__karta">
        ${karta(
          `
          <textarea class="input" placeholder="For example: we've bought an older two-room flat in Brno. We want to redo the bathroom and the kitchen, put a new floor in the living room and repaint. Our budget is around 550,000 and we'd like to start in spring."></textarea>
          <div class="landing__priklady">
            ${tlacitkoSekundarni("Fix a door", "vybrat-priklad", 'data-priklad="dvere"')}
            ${tlacitkoSekundarni("Insulate a facade", "vybrat-priklad", 'data-priklad="zatepleni"')}
            ${tlacitkoSekundarni("Full renovation", "vybrat-priklad", 'data-priklad="rekonstrukce"')}
          </div>
          <div class="landing__zapati">
            <span class="micro">FREE, NO COMMITMENT</span>
            ${tlacitkoPrimarni("Get an estimate", "zacit-brief")}
          </div>`,
          { raised: true }
        )}
      </div>
    </section>
    <section class="steps">
      ${cislovanyKrok(1, "Describe what you want to do", "In your own words and however incomplete. We'll ask about what's missing.")}
      ${cislovanyKrok(2, "Get bids from trades", "With prices for work and materials. You can move scope and quality and see what it does to the total.")}
      ${cislovanyKrok(3, "Choose firms for the build", "Vetted trades see the actual project, not a general enquiry. That's why their prices are comparable.")}
    </section>
    ${patka()}`;
}

// --- Brief ------------------------------------------------------------

function renderBrief(state, projekt) {
  return `
    <div class="brief">
      <h2>Your brief</h2>
      <div class="chat">
        <div class="chat__msg chat__msg--asistent">Will you be living in the flat while the work is going on?</div>
        <div class="chat__msg chat__msg--zakaznik">${projekt.zadani.bydliBehem ? "Yes" : "No, we're renting elsewhere"}</div>
        <div class="chat__msg chat__msg--asistent">Should the space be stripped back to the shell, or just resurfaced?</div>
        <div class="chat__msg chat__msg--zakaznik">${projekt.zadani.jadroBourat ? "Strip it out" : "Surfaces only"}</div>
      </div>
      ${karta(
        `
        <h3>Your brief</h3>
        <ul class="def-list">
          <li><span>Scope</span><span>${projekt.identita.nazev}</span></li>
          <li><span>Floor area</span><span>${projekt.identita.plocha}</span></li>
          <li><span>Condition</span><span>${projekt.identita.typ}</span></li>
          <li><span>Deadline</span><span>${projekt.zadani.terminDo}</span></li>
          <li><span>Budget ceiling</span><span>${czk(projekt.zadani.strop)}</span></li>
        </ul>
        ${tlacitkoPrimarni("That's right — calculate the budget", "jit-na-obrazovku", 'data-obrazovka="budget" data-okamzik="T2"')}`,
        { raised: true }
      )}
    </div>`;
}

// --- Budget -------------------------------------------------------------

function renderBudget(state, projekt) {
  const vsechnyPaky = projekt.joby.flatMap((j) => j.paky);
  return `
    <div class="budget">
      <h2>Budget estimate</h2>
      <p class="micro">An indicative estimate based on your brief. It firms up once bids come in.</p>
      ${rozpoctovyBlokProjektu(projekt, state.ui.paky)}
      ${
        vsechnyPaky.length
          ? karta(
              `<h3>How to get under budget</h3>${vsechnyPaky.map((p) => pakaRadek(p, projekt.joby.find((j) => j.paky.includes(p)).id, state.ui.paky.includes(p.id))).join("")}`,
              { raised: true }
            )
          : ""
      }
      ${tlacitkoPrimarni("Continue to your project", "jit-na-obrazovku", 'data-obrazovka="projekt" data-okamzik="T3"')}
    </div>`;
}

// --- Project --------------------------------------------------------------

function renderProjekt(state, projekt) {
  const malaZakazka = projekt.joby.length === 1;
  const cestaNaKlic = state.ui.cestaNaKlic && projekt.nabidkyFirem.length > 0;

  return `
    <div class="projekt">
      <header class="projekt__hlavicka">
        <h2>${projekt.identita.nazev}</h2>
        <p class="micro">${projekt.identita.typ} · ${projekt.identita.plocha} · ${projekt.identita.lokalita}</p>
      </header>
      ${rozpoctovyBlokProjektu(projekt, state.ui.paky)}
      ${harmonogram(projekt.joby)}
      <div class="projekt__sloupce ${malaZakazka ? "projekt__sloupce--jeden" : ""}">
        <div class="projekt__prace">
          ${
            cestaNaKlic
              ? renderCestaNaKlic(projekt)
              : projekt.joby.map((job) => kartaPrace(job, state.ui.paky)).join("")
          }
        </div>
        ${!malaZakazka ? `<div class="projekt__tym">${cestaNaKlic ? renderJednaFirma(projekt) : panelTym(projekt, state.ui.paky)}</div>` : ""}
      </div>
    </div>`;
}

function renderCestaNaKlic(projekt) {
  return `
    <div class="naklic">
      <p class="micro">The gap between the cheapest firm and the dearest is 234,000 CZK — more than all three budget savings put together.</p>
      ${projekt.nabidkyFirem
        .map(
          (f) => `
        ${karta(
          `<div class="firma"><h3>${f.nazev}</h3><p>${f.popis}</p><div class="firma__castka">${czk(f.castka)}</div>
          ${tlacitkoSekundarni("Choose this firm", "vybrat-firmu")}</div>`,
          { raised: true }
        )}`
        )
        .join("")}
      ${tlacitkoSekundarni("Back to choosing trades", "cesta-po-profesich")}
    </div>`;
}

function renderJednaFirma(projekt) {
  return karta(
    `<h3>One firm, whole job</h3><p class="micro">What would change</p>
    <ul class="def-list">
      <li>The remaining requests are cancelled.</li>
      <li>The trades become the firm's subcontractors, not yours.</li>
      <li>The budget firms up after a site visit.</li>
    </ul>`,
    { raised: true }
  );
}

// --- Job ---------------------------------------------------------------

function renderJob(state, projekt) {
  const job = projekt.joby.find((j) => j.id === state.ui.zakaznik.otevrenyJobId) || projekt.joby[0];
  const castka = jobCastka(job, state.ui.paky);
  const maNabidky = job.kandidati && job.kandidati.length > 0;
  const viceprace = projekt.vicepráce.filter((v) => v.jobId === job.id);

  let obsah = "";
  if (job.stavTrhu === "napad") obsah = `<p>Not scoped yet.</p>`;
  else if (job.stavTrhu === "nepoptano")
    obsah = job.paky.map((p) => pakaRadek(p, job.id, state.ui.paky.includes(p.id))).join("");
  else if (job.stavTrhu === "poptano") obsah = `<p>Request sent. Bids usually arrive within 10 days.</p>`;
  else if (job.stavTrhu === "nabidky" || (maNabidky && !job.vybranyKandidat))
    obsah = `<div class="job-card__kandidati">${job.kandidati.map((k) => kandidatDlazdice(k, job.id, false)).join("")}</div>`;
  else if (job.stavTrhu === "zadano-remeslnikovi")
    obsah = `<p>${job.realizator.jmeno} is assigned. Work starts ${fmtRange(job.od, job.do)}.</p>`;
  else if (job.stavTrhu === "probiha")
    obsah = `
      <p>${job.realizator.jmeno} is on site, ${fmtRange(job.od, job.do)}.</p>
      <div class="photos">${["", "", ""].map(() => `<div class="photo-placeholder"></div>`).join("")}</div>
      ${viceprace
        .map(
          (v, i) => `
        ${karta(
          `<h3>Extra work proposed</h3><p>${v.popis}</p><p class="micro">${v.dopadNaTermin}</p>
          <div class="viceprace__castka">${czk(v.castka)}</div>
          ${
            v.stav === "schvaleno"
              ? `<p class="micro">Approved 12 March</p>`
              : `${tlacitkoPrimarni("Approve", "schvalit-viceprace", `data-index="${projekt.vicepráce.indexOf(v)}"`)} ${tlacitkoSekundarni("I'd like to talk it through", "diskutovat-viceprace")}`
          }`,
          { raised: true, extraClass: "card--over" }
        )}`
        )
        .join("")}`;
  else if (job.stavTrhu === "hotovo")
    obsah = `<p>${job.realizator.jmeno}</p><p class="micro">Handed over ${fmtDate(job.do)}</p>`;

  return `
    <div class="job">
      ${tlacitkoSekundarni(`← ${projekt.identita.nazev}`, "jit-na-obrazovku", 'data-obrazovka="projekt"')}
      <h2>${job.nazev}</h2>
      ${karta(radekSoucet("Job total", castka), { raised: true })}
      <div class="job__obsah">${obsah}</div>
      ${job.od && job.do ? `<p class="micro">${fmtRange(job.od, job.do)}</p>` : ""}
      ${job.zpravy.length ? renderChat(job) : ""}
    </div>`;
}

function renderChat(job) {
  return karta(
    `<h3>Messages</h3>${job.zpravy.map((z) => `<div class="chat__msg chat__msg--${z.odKoho}">${z.text}</div>`).join("")}`,
    { raised: true }
  );
}

// --- Invoicing --------------------------------------------------------

function renderFakturace(state, projekt) {
  const celkem = celkemProjekt(projekt, state.ui.paky);
  const rozdil = projekt.zadani.strop - celkem;
  return `
    <div class="fakturace">
      <h2>Done</h2>
      <p class="micro">Handed over — plan and actual.</p>
      ${karta(
        `
        ${projekt.joby
          .map(
            (job) =>
              `<div class="invoice-row"><span>${job.nazev} — ${job.realizator ? job.realizator.jmeno : "estimate"}${!job.vybranyKandidat && !job.realizator ? ` <span class="tag">Estimate</span>` : ""}</span><span>${czk(jobCastka(job, state.ui.paky))}</span></div>`
          )
          .join("")}
        ${radekSoucet("Contingency", projekt.rezervaMimoJoby)}
        ${projekt.vyuctovani.map((v) => radekSoucet(v.nazev, v.castka, v.castka < 0 ? "under" : "over")).join("")}
        ${radekSoucet("Actual", celkem)}
        ${radekSoucet("Your ceiling", projekt.zadani.strop)}
        ${radekSoucet("Difference", Math.abs(rozdil))}
        <p class="micro">${Math.abs((rozdil / projekt.zadani.strop) * 100).toFixed(1)}% off plan. Every line has a reason.</p>`,
        { raised: true }
      )}
      ${tlacitkoPrimarni("Back to your projects", "jit-na-obrazovku", 'data-obrazovka="moje-projekty"')}
    </div>`;
}

// --- My projects --------------------------------------------------------

function renderMojeProjekty(state, projekt) {
  return `
    <div class="moje-projekty">
      <h2>My projects</h2>
      <div class="project-cards">
        ${Object.values(state.projekty)
          .map((p) => {
            const rozpocet = rozpocetProjektu(p, p.id === state.aktivniProjektId ? state.ui.paky : []);
            return karta(
              `<h3>${p.identita.nazev}</h3><p class="micro">${p.okamzik}</p>
              ${radekSoucet("Budget", rozpocet)}${radekSoucet("Your ceiling", p.zadani.strop)}
              ${tlacitkoSekundarni("Open project", "otevrit-projekt", `data-projekt="${p.id}"`)}`,
              { raised: true }
            );
          })
          .join("")}
      </div>
      <div class="moje-projekty__nove">
        ${tlacitkoSekundarni("New small job", "novy-projekt")}
        ${tlacitkoSekundarni("New full project", "novy-projekt")}
      </div>
    </div>`;
}
