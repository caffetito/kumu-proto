// KUMU — partnerský pohled. Desktop, Saint-Gobain. §10.

import { karta, tlacitkoSekundarni, radekSoucet, horniPruh, patka } from "./components.js";

export function renderPartner(state) {
  const projekt = state.projekty[state.aktivniProjektId];
  const ui = state.ui.partner;
  const telo = {
    portfolio: renderPortfolio,
    enquiries: renderEnquiries,
    trades: renderTrades,
    order: renderOrder,
  }[ui.tab](projekt, state);

  return `${horniPruh("partner")}<main class="screen screen--partner">
    <nav class="partner-nav">
      ${tab("portfolio", "Portfolio", ui.tab)}
      ${tab("enquiries", "Enquiries", ui.tab)}
      ${tab("trades", "Your trades", ui.tab)}
      ${tab("order", "Order", ui.tab)}
    </nav>
    ${telo}
    ${patka()}
  </main>`;
}

function tab(id, label, aktivni) {
  return `<button class="partner-nav__item ${aktivni === id ? "partner-nav__item--active" : ""}" data-action="partner-tab" data-tab="${id}">${label}</button>`;
}

function renderPortfolio() {
  return `
    <h2>Portfolio</h2>
    <div class="metrics">
      ${metrika("340", "Projects in preparation")}
      ${metrika("61%", "Contain your categories")}
      ${metrika("84,000 CZK", "Average material value")}
      ${metrika("23%", "Proposal to order")}
    </div>`;
}

function metrika(hodnota, label) {
  return karta(`<div class="metric__hodnota">${hodnota}</div><div class="micro">${label}</div>`, { raised: true, extraClass: "metric surface-cool" });
}

function renderEnquiries(projekt, state) {
  if (!projekt.partner) return `<p>No material enquiry for this project.</p>`;
  const p = projekt.partner.poptavka;
  return `
    <h2>Enquiries</h2>
    ${karta(
      `<span class="tag">ESTIMATE</span>
      <h3>${projekt.identita.plocha.includes("m²") ? "3-room flat" : projekt.identita.nazev}, ${projekt.identita.lokalita}, ${projekt.identita.plocha}</h3>
      <table class="enquiry-table">
        <thead><tr><th>Item</th><th>Quantity</th><th>Proposed</th><th>Brand</th></tr></thead>
        <tbody>
          ${p.polozky
            .map(
              (row) => `
            <tr class="${row.znacka ? "" : "enquiry-table__neurcena"}">
              <td>${row.nazev}</td><td>${row.mnozstvi}</td>
              <td>${row.navrzeno || "Not specified"}</td>
              <td>${row.znacka || `${tlacitkoSekundarni("Add a product", "doplnit-produkt")}`}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
      ${tlacitkoSekundarni("Quote a price", "nabidnout-cenu")}`,
      { raised: true }
    )}`;
}

function renderTrades(projekt) {
  return `
    <h2>Your trades</h2>
    ${karta(
      `<h3>${projekt.remeslnik.jmeno}</h3><p class="micro">${projekt.remeslnik.obor} · ${projekt.remeslnik.lokalita}</p>
      <p>${projekt.remeslnik.hodnoceni.toFixed(1)} · ${projekt.remeslnik.pocetZakazek} jobs</p>`,
      { raised: true }
    )}`;
}

function renderOrder(projekt) {
  if (!projekt.partner) return `<p>No order for this project yet.</p>`;
  const o = projekt.partner.objednavka;
  const odkryto = projekt.okamzik === "T4" || projekt.okamzik === "T5";
  return `
    <h2>Order ${o.cislo}</h2>
    ${karta(
      `<p>${o.polozky}</p><p class="micro">${o.stav}</p>
      <p>${odkryto ? o.adresa : "Address revealed once the order is dispatched."}</p>
      <p class="micro">${o.mimoKumu}</p>`,
      { raised: true }
    )}
    ${
      projekt.okamzik === "T5"
        ? karta(
            `<h3>Realised consumption</h3>
            ${radekSoucet("Proposed in the budget", projekt.partner.spotreba.navrzeno)}
            ${radekSoucet("Ordered through Kumu", projekt.partner.spotreba.pesKumu)}
            ${radekSoucet("Ordered elsewhere", projekt.partner.spotreba.jinde)}
            <p class="micro">Unspecified lines in a budget are where the decision gets made without you.</p>`,
            { raised: true }
          )
        : ""
    }`;
}
