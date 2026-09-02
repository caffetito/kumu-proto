// KUMU — router, delegace událostí, start. Překreslení je vždy celé #app.

import {
  getState,
  setState,
  subscribe,
  setRole,
  setTheme,
  setAktivniProjekt,
  setObrazovka,
  setOtevrenyJob,
  setPartnerTab,
  setPartnerPoptavka,
  setTradeTab,
  toggleAsistent,
  togglePaka,
  setCestaNaKlic,
  vybratKandidata,
  schvalitVicepraci,
  spustitScenar,
  ukoncitScenar,
  jitNaKrok,
} from "./state.js";
import { renderZakaznik } from "./screens-customer.js";
import { renderRemeslnik } from "./screens-trade.js";
import { renderPartner } from "./screens-partner.js";
import { scenare, listaPruchoduHtml } from "./scenarios.js";

const app = document.getElementById("app");

function renderDevBar(state) {
  return `
    <div class="devbar">
      <div class="devbar__skupina">
        <span class="micro">ROLE</span>
        ${radioSkupina("dev-role", ["zakaznik", "remeslnik", "partner"], state.role)}
      </div>
      <div class="devbar__skupina">
        <span class="micro">PROJECT</span>
        ${radioSkupina("dev-projekt", Object.keys(state.projekty), state.aktivniProjektId)}
      </div>
      <div class="devbar__skupina">
        <span class="micro">MOMENT</span>
        ${radioSkupina("dev-okamzik", ["T1", "T2", "T3", "T4", "T5"], state.projekty[state.aktivniProjektId].okamzik)}
      </div>
      <div class="devbar__skupina">
        <span class="micro">THEME</span>
        ${radioSkupina("dev-theme", ["light", "dark"], state.theme)}
      </div>
      <div class="devbar__skupina">
        <span class="micro">SCENARIO</span>
        <select data-action="dev-scenar">
          <option value="">—</option>
          ${Object.entries(scenare)
            .map(([id, s]) => `<option value="${id}" ${state.scenar === id ? "selected" : ""}>${s.nazev}</option>`)
            .join("")}
        </select>
        ${state.scenar ? `<button data-action="dev-prev">Prev</button><button data-action="dev-next">Next</button><button data-action="dev-exit">Exit</button>` : ""}
      </div>
    </div>`;
}

function radioSkupina(action, hodnoty, aktivni) {
  return hodnoty
    .map((h) => `<button class="devbar__btn ${h === aktivni ? "devbar__btn--active" : ""}" data-action="${action}" data-hodnota="${h}">${h}</button>`)
    .join("");
}

function render() {
  const state = getState();
  const obsah = { zakaznik: renderZakaznik, remeslnik: renderRemeslnik, partner: renderPartner }[state.role](state);
  app.innerHTML = `
    ${renderDevBar(state)}
    ${listaPruchoduHtml(state)}
    ${obsah}`;
}

subscribe(render);

// --- delegace ------------------------------------------------------

app.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el || el.disabled) return;
  const state = getState();
  const projektId = state.aktivniProjektId;
  const akce = el.dataset.action;

  const akce_map = {
    "zacit-brief": () => setObrazovka("zakaznik", "brief"),
    "jit-na-obrazovku": () => {
      setObrazovka("zakaznik", el.dataset.obrazovka);
      if (el.dataset.okamzik) setState((s) => (s.projekty[projektId].okamzik = el.dataset.okamzik));
    },
    "otevrit-job": () => {
      setOtevrenyJob("zakaznik", el.dataset.job);
      setObrazovka("zakaznik", "job");
    },
    "vybrat-kandidata": () => vybratKandidata(projektId, el.dataset.job, el.dataset.kandidat),
    "cesta-na-klic": () => setCestaNaKlic(true),
    "cesta-po-profesich": () => setCestaNaKlic(false),
    "vybrat-firmu": () => {},
    "schvalit-viceprace": () => schvalitVicepraci(projektId, Number(el.dataset.index)),
    "diskutovat-viceprace": () => {},
    "otevrit-projekt": () => {
      setAktivniProjekt(el.dataset.projekt);
      setObrazovka("zakaznik", "projekt");
    },
    "novy-projekt": () => {},
    "vybrat-priklad": () => {},
    "trade-tab": () => {
      setTradeTab(el.dataset.tab);
      if (el.dataset.tab !== "bid") setOtevrenyJob("remeslnik", null);
    },
    "otevrit-job-trade": () => setOtevrenyJob("remeslnik", el.dataset.job),
    "odeslat-nabidku": () => {},
    "toggle-asistent": () => toggleAsistent(state.role === "remeslnik" ? "remeslnik" : "zakaznik"),
    "polozit-dotaz": () => setState((s) => (s.ui.remeslnik.posledniOdpoved = el.dataset.odpoved)),
    "partner-tab": () => setPartnerTab(el.dataset.tab),
    "doplnit-produkt": () => {},
    "nabidnout-cenu": () => {},
    "jit-na-krok": () => jitNaKrok(scenare[state.scenar].kroky, Number(el.dataset.krok)),
    "dev-role": () => setRole(el.dataset.hodnota),
    "dev-projekt": () => setAktivniProjekt(el.dataset.hodnota),
    "dev-okamzik": () => setState((s) => (s.projekty[projektId].okamzik = el.dataset.hodnota)),
    "dev-theme": () => setTheme(el.dataset.hodnota),
    "dev-prev": () => jitNaKrok(scenare[state.scenar].kroky, state.krok - 1),
    "dev-next": () => jitNaKrok(scenare[state.scenar].kroky, state.krok + 1),
    "dev-exit": () => ukoncitScenar(),
  };

  if (akce_map[akce]) akce_map[akce]();
});

app.addEventListener("change", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  if (el.dataset.action === "toggle-paka") togglePaka(el.dataset.paka);
  if (el.dataset.action === "dev-scenar") {
    const nazev = el.value;
    if (!nazev) return ukoncitScenar();
    setState((s) => (s.aktivniProjektId = scenare[nazev].projektId));
    spustitScenar(nazev, scenare[nazev].kroky);
  }
});

// --- start ---------------------------------------------------------

document.documentElement.setAttribute("data-theme", getState().theme);
render();
