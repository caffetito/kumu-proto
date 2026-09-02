// KUMU — stav aplikace. Jediná funkce mění state: setState(fn).
// Nikde jinde se `state` nepřepisuje.

import { projekty as vychoziProjekty } from "./data.js";

function hlubokaKopie(hodnota) {
  return JSON.parse(JSON.stringify(hodnota));
}

function vychoziStav() {
  return {
    role: "zakaznik",
    theme: "light",
    aktivniProjektId: "byt-3-1",
    scenar: null,
    krok: 0,
    projekty: hlubokaKopie(vychoziProjekty),
    ui: {
      zakaznik: { obrazovka: "landing", otevrenyJobId: null, asistentOtevren: false, chatDraft: "" },
      remeslnik: { tab: "today", otevrenyJobId: null, asistentOtevren: false, posledniOdpoved: null },
      partner: { tab: "portfolio", otevrenaPoptavkaId: null },
      paky: [],
      cestaNaKlic: false,
    },
  };
}

let state = vychoziStav();
const posluchaci = [];

export function getState() {
  return state;
}

export function subscribe(fn) {
  posluchaci.push(fn);
}

export function setState(fn) {
  fn(state);
  posluchaci.forEach((fn2) => fn2(state));
}

export function aktivniProjekt() {
  return state.projekty[state.aktivniProjektId];
}

// --- akce ----------------------------------------------------

export function setRole(role) {
  setState((s) => (s.role = role));
}

export function setTheme(theme) {
  setState((s) => (s.theme = theme));
  document.documentElement.setAttribute("data-theme", theme);
}

export function setAktivniProjekt(id) {
  setState((s) => {
    s.aktivniProjektId = id;
    s.ui.zakaznik.otevrenyJobId = null;
  });
}

export function setObrazovka(role, obrazovka) {
  setState((s) => (s.ui[role].obrazovka = obrazovka));
}

export function setOtevrenyJob(role, jobId) {
  setState((s) => (s.ui[role].otevrenyJobId = jobId));
}

export function setPartnerTab(tab) {
  setState((s) => (s.ui.partner.tab = tab));
}

export function setPartnerPoptavka(id) {
  setState((s) => (s.ui.partner.otevrenaPoptavkaId = id));
}

export function setTradeTab(tab) {
  setState((s) => (s.ui.remeslnik.tab = tab));
}

export function toggleAsistent(role) {
  setState((s) => (s.ui[role].asistentOtevren = !s.ui[role].asistentOtevren));
}

export function togglePaka(pakaId) {
  setState((s) => {
    const i = s.ui.paky.indexOf(pakaId);
    if (i === -1) s.ui.paky.push(pakaId);
    else s.ui.paky.splice(i, 1);
  });
}

export function setCestaNaKlic(hodnota) {
  setState((s) => (s.ui.cestaNaKlic = hodnota));
}

export function vybratKandidata(projektId, jobId, kandidatId) {
  setState((s) => {
    const job = s.projekty[projektId].joby.find((j) => j.id === jobId);
    if (!job) return;
    job.vybranyKandidat = kandidatId;
    const kandidat = job.kandidati.find((k) => k.id === kandidatId);
    if (kandidat) {
      job.od = kandidat.od;
      job.do = kandidat.do;
      job.realizator = { jmeno: kandidat.jmeno, profese: job.profese };
      job.stavTrhu = "zadano-remeslnikovi";
    }
  });
}

export function schvalitVicepraci(projektId, index) {
  setState((s) => {
    s.projekty[projektId].vicepráce[index].stav = "schvaleno";
  });
}

export function pridatZpravu(projektId, jobId, odKoho, text) {
  setState((s) => {
    const job = s.projekty[projektId].joby.find((j) => j.id === jobId);
    if (job) job.zpravy.push({ odKoho, text, cas: new Date().toISOString() });
  });
}

// --- scénáře ---------------------------------------------------

export function spustitScenar(nazev, kroky) {
  setState((s) => {
    s.scenar = nazev;
    s.krok = 0;
  });
  aplikovatKrok(kroky[0]);
}

export function ukoncitScenar() {
  setState((s) => {
    s.scenar = null;
    s.krok = 0;
  });
}

export function jitNaKrok(kroky, index) {
  if (index < 0 || index >= kroky.length) return;
  setState((s) => (s.krok = index));
  aplikovatKrok(kroky[index]);
}

function aplikovatKrok(krok) {
  setState((s) => {
    if (krok.role) s.role = krok.role;
    if (krok.projektId) s.aktivniProjektId = krok.projektId;
    if (krok.okamzik) s.projekty[krok.projektId || s.aktivniProjektId].okamzik = krok.okamzik;
    if (krok.obrazovka) s.ui[krok.role || s.role].obrazovka = krok.obrazovka;
    if (krok.tab) s.ui[krok.role || s.role].tab = krok.tab;
    if (krok.otevrenyJobId !== undefined) s.ui[krok.role || s.role].otevrenyJobId = krok.otevrenyJobId;
    if (krok.paky) s.ui.paky = krok.paky;
    if (krok.cestaNaKlic !== undefined) s.ui.cestaNaKlic = krok.cestaNaKlic;
    if (krok.patch) krok.patch(s);
  });
}
