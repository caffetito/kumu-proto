// KUMU — řemeslnický pohled. Mobil, uvnitř rámu telefonu. §9.

import { czk, fmtRange } from "./format.js";
import { jobCastka } from "./compute.js";
import { karta, tlacitkoPrimarni, tlacitkoSekundarni, radekSoucet, spodniNavigaceMobil, ramTelefonu } from "./components.js";
import { asistentSablony } from "./data.js";

export function renderRemeslnik(state) {
  const projekt = state.projekty[state.aktivniProjektId];
  const ui = state.ui.remeslnik;
  const obsah = {
    today: renderToday,
    opportunities: renderOpportunities,
    bid: renderBid,
    invoices: renderInvoices,
    profile: renderProfile,
  }[ui.tab](projekt, state);

  const asistent = ui.asistentOtevren ? renderAsistent(ui.posledniOdpoved) : "";

  return `<main class="screen screen--remeslnik">
    ${ramTelefonu(`
      <div class="phone__obsah">${obsah}${asistent}</div>
      ${spodniNavigaceMobil(ui.tab === "bid" || ui.tab === "job" ? "opportunities" : ui.tab)}
    `)}
  </main>`;
}

function renderToday(projekt) {
  const dnesniJob = projekt.joby.find((j) => j.stavTrhu === "probiha" || j.stavTrhu === "zadano-remeslnikovi") || projekt.joby[0];
  return `
    <h2>Today</h2>
    ${karta(
      `<h3>${projekt.identita.nazev} — ${dnesniJob.nazev}</h3><p class="micro">${fmtRange(dnesniJob.od, dnesniJob.do)}</p>
      <p>Your bid was accepted on 20 Feb.</p>`,
      { raised: true }
    )}
    <ul class="def-list">
      <li><span>3 new jobs</span><span>one already has a bid drafted</span></li>
      <li><span>2 bids</span><span>waiting on a reply</span></li>
      <li><span class="text-over">1 invoice</span><span class="text-over">overdue, 9 days</span></li>
    </ul>
    ${tlacitkoSekundarni("Ask Kumu", "toggle-asistent")}`;
}

function renderOpportunities(projekt, state) {
  const otevreny = state.ui.remeslnik.otevrenyJobId;
  if (otevreny) {
    const job = projekt.joby.find((j) => j.id === otevreny);
    return `
      <h2>${job.nazev}</h2>
      ${karta(
        `<p class="micro">${projekt.identita.nazev} · ${projekt.identita.lokalita}</p>
        <p>Scope: ${job.polozky.map((p) => p.nazev).join(", ")}.</p>
        <p class="micro">${fmtRange(job.od, job.do)}</p>`,
        { raised: true }
      )}
      ${tlacitkoPrimarni("Draft a bid", "trade-tab", 'data-tab="bid"')}`;
  }
  return `
    <h2>Opportunities</h2>
    ${projekt.joby
      .filter((j) => !j.realizator || j.id === "elektro")
      .map(
        (job) => `
      <button class="opportunity" data-action="otevrit-job-trade" data-job="${job.id}">
        <span>${job.nazev}</span>
        ${job.id === "elektro" ? `<span class="tag">Bid ready</span>` : ""}
      </button>`
      )
      .join("")}`;
}

function renderBid(projekt, state) {
  const job = projekt.joby.find((j) => j.id === state.ui.remeslnik.otevrenyJobId) || projekt.joby.find((j) => j.id === "elektro");
  const castka = jobCastka(job, []);
  return `
    <h2>Your bid</h2>
    ${karta(
      `<div class="display">${czk(castka)}</div>
      <p class="micro">Based on your last 6 jobs in this category. Change it to suit.</p>`,
      { raised: true }
    )}
    ${tlacitkoPrimarni("Send bid", "odeslat-nabidku")}`;
}

function renderInvoices(projekt) {
  return `
    <h2>Invoices</h2>
    ${projekt.joby
      .filter((j) => j.stavTrhu === "hotovo" || j.stavTrhu === "probiha")
      .map((j) => karta(radekSoucet(j.nazev, jobCastka(j, [])), { raised: true }))
      .join("")}
    <p class="micro">The details come from the job. You retype nothing.</p>`;
}

function renderProfile(projekt) {
  const r = projekt.remeslnik;
  return `
    <h2>Profile</h2>
    ${karta(
      `<h3>${r.jmeno}</h3><p class="micro">${r.obor} · ${r.lokalita} · ${r.hodnoceni.toFixed(1)}</p>
      <p class="micro">You don't maintain this profile. It fills itself from the jobs you finish.</p>
      <ul class="def-list">${r.overeni.map((o) => `<li>${o}</li>`).join("")}</ul>
      ${r.realizace.map((real) => `<div class="realizace"><span>${real.nazev}</span><span>${real.rozpocet} · ${real.termin}</span></div>`).join("")}`,
      { raised: true }
    )}`;
}

function renderAsistent(posledniOdpoved) {
  return `
    <div class="asistent">
      <h3>Assistant</h3>
      ${asistentSablony.trade
        .map((s) => `<button class="asistent__dotaz" data-action="polozit-dotaz" data-odpoved="${s.odpoved}">${s.dotaz}</button>`)
        .join("")}
      ${posledniOdpoved ? `<div class="chat__msg chat__msg--asistent">${posledniOdpoved}</div>` : ""}
      <p class="micro">Answers come from your own jobs in Kumu.</p>
      ${tlacitkoSekundarni("Close", "toggle-asistent")}
    </div>`;
}
