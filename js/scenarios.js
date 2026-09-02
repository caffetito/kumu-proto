// KUMU — scénáře. Pojmenovaná cesta maticí fází × rolí. Zdrojem lišty
// průchodu jsou kroky scénáře, ne obrazovky.

function hotovyJob(job, jmeno, od, doo) {
  job.stavTrhu = "hotovo";
  job.realizator = { jmeno, profese: job.profese };
  job.od = od;
  job.do = doo;
}

export const scenare = {
  S_MALA: {
    nazev: "Small job",
    projektId: "zatepleni-bystrc",
    kroky: [
      { label: "Start", popis: "One-line brief on the landing page.", role: "zakaznik", obrazovka: "landing" },
      { label: "Brief", popis: "Shorter dialogue for a single job.", role: "zakaznik", obrazovka: "brief", okamzik: "T1" },
      { label: "Budget", popis: "338,000 against a 350,000 ceiling, with a subsidy noted.", role: "zakaznik", obrazovka: "budget", okamzik: "T2" },
      { label: "Project", popis: "Timeline, one job, bids in.", role: "zakaznik", obrazovka: "projekt", okamzik: "T3" },
      { label: "Job", popis: "Choosing the trade for the job.", role: "zakaznik", obrazovka: "job", okamzik: "T3", otevrenyJobId: "zatepleni" },
      {
        label: "On site",
        popis: "Work is running, chat with the trade.",
        role: "zakaznik",
        obrazovka: "job",
        okamzik: "T4",
        otevrenyJobId: "zatepleni",
      },
      { label: "Invoice", popis: "332,000 to approve, under the 350,000 ceiling.", role: "zakaznik", obrazovka: "fakturace", okamzik: "T5" },
      { label: "Projects", popis: "Closed out.", role: "zakaznik", obrazovka: "moje-projekty" },
    ],
  },

  S_VELKA: {
    nazev: "Full project",
    projektId: "byt-3-1",
    kroky: [
      { label: "Start", popis: "One-line brief on the landing page.", role: "zakaznik", obrazovka: "landing" },
      { label: "Brief", popis: "Longer dialogue, the brief breaks down into jobs.", role: "zakaznik", obrazovka: "brief", okamzik: "T1" },
      {
        label: "Budget",
        popis: "1,388,000, over the ceiling — three levers bring it to 1,181,000.",
        role: "zakaznik",
        obrazovka: "budget",
        okamzik: "T2",
        paky: [],
      },
      {
        label: "Project",
        popis: "Eight jobs, cards, the team panel — all three levers applied.",
        role: "zakaznik",
        obrazovka: "projekt",
        okamzik: "T3",
        paky: ["vinyl", "kuchyn", "dvere"],
      },
      { label: "Job", popis: "One job on its own, choosing the trade.", role: "zakaznik", obrazovka: "job", okamzik: "T3", otevrenyJobId: "elektro" },
      {
        label: "On site",
        popis: "Four states of the same project, at once: done, in progress, assigned, still waiting.",
        role: "zakaznik",
        obrazovka: "projekt",
        okamzik: "T4",
        paky: ["vinyl", "kuchyn", "dvere"],
        patch(s) {
          const p = s.projekty["byt-3-1"];
          const job = (id) => p.joby.find((j) => j.id === id);
          hotovyJob(job("demolice"), "Pavel Horák", "2026-02-16", "2026-02-20");
          hotovyJob(job("voda"), "Instalace Kříž", "2026-02-23", "2026-03-02");
          hotovyJob(job("elektro"), "Jiří Vaněk", "2026-03-02", "2026-03-13");
          job("sadrokarton").stavTrhu = "probiha";
          const tiling = job("obklady-podlahy");
          tiling.stavTrhu = "probiha";
          tiling.realizator = { jmeno: "Obklady Marek", profese: tiling.profese }; // [+] demo data
          tiling.od = "2026-03-30";
          tiling.do = "2026-04-14";
        },
      },
      {
        label: "Job",
        popis: "A different job, mid-work: progress, photos, extra work to approve.",
        role: "zakaznik",
        obrazovka: "job",
        okamzik: "T4",
        otevrenyJobId: "obklady-podlahy",
      },
      {
        label: "Invoice",
        popis: "1,204,000 — 0.3% off plan, and every line has a reason.",
        role: "zakaznik",
        obrazovka: "fakturace",
        okamzik: "T5",
        patch(s) {
          const p = s.projekty["byt-3-1"];
          const job = (id) => p.joby.find((j) => j.id === id);
          hotovyJob(job("sadrokarton"), "Suchá výstavba Krejčí", "2026-03-16", "2026-03-26");
          hotovyJob(job("obklady-podlahy"), "Obklady Marek", "2026-03-30", "2026-04-14");
          hotovyJob(job("malby"), "Malby Šindelář", "2026-04-15", "2026-04-20");
          hotovyJob(job("kuchyn-dvere"), "Kuchyně Studio Dvořák", "2026-04-21", "2026-04-25"); // [+] demo data
          hotovyJob(job("dvere-zarubne"), "Truhlářství Beneš", "2026-04-21", "2026-04-27"); // [+] demo data
        },
      },
      { label: "Projects", popis: "Closed out.", role: "zakaznik", obrazovka: "moje-projekty" },
    ],
  },

  S_REMESLNIK: {
    nazev: "Trade view",
    projektId: "byt-3-1",
    kroky: [
      { label: "Today", popis: "Today's job, tomorrow off, three new opportunities.", role: "remeslnik", tab: "today" },
      { label: "Opportunities", popis: "Jobs to bid on, across projects.", role: "remeslnik", tab: "opportunities" },
      { label: "Job", popis: "Scope, timing, location for one job.", role: "remeslnik", tab: "opportunities", otevrenyJobId: "elektro" },
      { label: "Bid", popis: "Price pre-filled from his own history: 165,000 → 158,000.", role: "remeslnik", tab: "bid", otevrenyJobId: "elektro" },
      { label: "Invoices", popis: "What's ready, what's waiting, what's overdue.", role: "remeslnik", tab: "invoices" },
    ],
  },

  S_PARTNER: {
    nazev: "Partner view",
    projektId: "byt-3-1",
    kroky: [
      { label: "Portfolio", popis: "340 projects in preparation, category coverage, conversion.", role: "partner", tab: "portfolio" },
      { label: "Enquiry", popis: "Anonymised material request, one line unspecified.", role: "partner", tab: "enquiries", otevrenyJobId: "poptavka-byt-3-1" },
      { label: "Your trades", popis: "Partner's own network of trades.", role: "partner", tab: "trades" },
      { label: "Order", popis: "Dispatch and delivery — identity and address revealed for the first time.", role: "partner", tab: "order", okamzik: "T4" },
    ],
  },
};

export function listaPruchoduHtml(state) {
  if (!state.scenar) return "";
  const scenario = scenare[state.scenar];
  return `
    <nav class="walkthrough">
      ${scenario.kroky
        .map((krok, i) => {
          const stavTrida = i === state.krok ? "walkthrough__item--aktivni" : i < state.krok ? "walkthrough__item--minuly" : "walkthrough__item--budouci";
          const predelRole = i === 0 || krok.role !== scenario.kroky[i - 1].role;
          return `
          <button class="walkthrough__item ${stavTrida} role-${krok.role || state.role}" data-action="jit-na-krok" data-krok="${i}" title="${krok.popis}">
            ${predelRole ? `<span class="walkthrough__role">${krok.role}</span>` : ""}
            <span class="walkthrough__label">${krok.label}</span>
          </button>`;
        })
        .join("")}
    </nav>`;
}
