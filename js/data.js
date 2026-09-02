// KUMU — demo data. Jediný zdroj pravdy pro obě demo zakázky.
// Odvozené hodnoty (součty, rozdíly) se tu nikdy neukládají — ty počítá compute.js.
// Položky označené [+] demo data nemají oporu v ničem reálném.

export const projekty = {
  // ============================================================
  // VELKÁ ZAKÁZKA — byt-3-1
  // Řetěz: 1 388 000 → 1 181 000 → 1 199 000 → 1 204 000
  // ============================================================
  "byt-3-1": {
    id: "byt-3-1",
    okamzik: "T3",
    identita: {
      nazev: "3-room flat, Královo Pole",
      plocha: "74 m²",
      typ: "1970s block, original condition",
      lokalita: "Brno-Královo Pole",
    },
    zadani: {
      strop: 1200000,
      terminDo: "30 September 2026",
      dotace: null,
      bydliBehem: false,
      jadroBourat: true,
    },
    rezervaMimoJoby: 99000,

    joby: [
      {
        id: "demolice",
        nazev: "Demolition and waste removal",
        profese: "Demolition",
        od: "2026-02-16",
        do: "2026-02-20",
        zralost: "zadano",
        stavTrhu: "zadano-remeslnikovi",
        polozky: [
          { nazev: "Demolition works", castka: 60000 },
          { nazev: "Waste removal and skip hire", castka: 25000 },
        ],
        paky: [],
        kandidati: [
          { id: "d1", jmeno: "Pavel Horák", hodnoceni: 4.7, zakazek: 62, castka: 82000, od: "2026-02-16", do: "2026-02-20" }, // [+] demo data
          { id: "d2", jmeno: "Bourací práce Novotný", hodnoceni: 4.5, zakazek: 40, castka: 88000, od: "2026-02-16", do: "2026-02-21" }, // [+] demo data
          { id: "d3", jmeno: "Radek Sedláček", hodnoceni: 4.9, zakazek: 21, castka: 91000, od: "2026-02-18", do: "2026-02-23" }, // [+] demo data
        ],
        vybranyKandidat: "d1",
        realizator: { jmeno: "Pavel Horák", profese: "Demolition" },
        zpravy: [],
      },
      {
        id: "voda",
        nazev: "Water and drainage",
        profese: "Plumbing",
        od: "2026-02-23",
        do: "2026-03-02",
        zralost: "zadano",
        stavTrhu: "probiha",
        polozky: [
          { nazev: "Drainage pipework", castka: 55000 },
          { nazev: "Water supply pipework", castka: 40000 },
        ],
        paky: [],
        kandidati: [
          { id: "v1", jmeno: "Instalace Kříž", hodnoceni: 4.8, zakazek: 47, castka: 98000, od: "2026-02-23", do: "2026-03-02" },
          { id: "v2", jmeno: "Tomáš Bureš", hodnoceni: 4.6, zakazek: 33, castka: 101000, od: "2026-02-24", do: "2026-03-04" }, // [+] demo data
        ],
        vybranyKandidat: "v1",
        realizator: { jmeno: "Instalace Kříž", profese: "Plumbing" },
        zpravy: [
          { odKoho: "remeslnik", text: "Starting on site tomorrow morning.", cas: "2026-02-23T07:40:00" }, // [+] demo data
        ],
      },
      {
        id: "elektro",
        nazev: "Electrical installation",
        profese: "Electrical",
        od: "2026-03-02",
        do: "2026-03-13",
        zralost: "zadano",
        stavTrhu: "zadano-remeslnikovi",
        polozky: [
          { nazev: "Consumer unit and wiring", castka: 120000 },
          { nazev: "Sockets, switches and fittings", castka: 45000 },
        ],
        paky: [],
        kandidati: [
          { id: "e1", jmeno: "Jiří Vaněk", hodnoceni: 4.9, zakazek: 58, castka: 158000, od: "2026-03-02", do: "2026-03-13" },
          { id: "e2", jmeno: "ElektroMont Brno s.r.o.", hodnoceni: 4.7, zakazek: 120, castka: 171000, od: "2026-03-04", do: "2026-03-17" }, // [+] demo data
          { id: "e3", jmeno: "Martin Dolák", hodnoceni: 4.6, zakazek: 29, castka: 149000, od: "2026-03-09", do: "2026-03-22" }, // [+] demo data
        ],
        vybranyKandidat: "e1",
        realizator: { jmeno: "Jiří Vaněk", profese: "Electrical" },
        zpravy: [],
      },
      {
        id: "sadrokarton",
        nazev: "Plasterboard and surfaces",
        profese: "Plastering",
        od: "2026-03-16",
        do: "2026-03-26",
        zralost: "zadano",
        stavTrhu: "zadano-remeslnikovi",
        polozky: [
          { nazev: "Ceiling linings", castka: 90000 },
          { nazev: "Wall linings and skim", castka: 84000 },
        ],
        paky: [],
        kandidati: [
          { id: "s1", jmeno: "Suchá výstavba Krejčí", hodnoceni: 4.8, zakazek: 44, castka: 181000, od: "2026-03-16", do: "2026-03-26" }, // [+] demo data
          { id: "s2", jmeno: "Petr Novák", hodnoceni: 4.5, zakazek: 19, castka: 176000, od: "2026-03-18", do: "2026-03-30" }, // [+] demo data
        ],
        vybranyKandidat: "s1",
        realizator: { jmeno: "Suchá výstavba Krejčí", profese: "Plastering" },
        zpravy: [],
      },
      {
        id: "obklady-podlahy",
        nazev: "Tiling and flooring",
        profese: "Tiling & flooring",
        od: null,
        do: null,
        zralost: "upresnuji",
        stavTrhu: "poptano",
        polozky: [
          { nazev: "Floor and wall tiles, bathroom and kitchen", castka: 68000 },
          { nazev: "Floor screed and preparation", castka: 52000 },
          { nazev: "Bathroom wall tiling", castka: 45000 },
          { nazev: "Vinyl flooring, living areas", castka: 70000 },
        ],
        paky: [
          { id: "vinyl", popis: "Lower-wear vinyl", uspora: 35000, dopad: "Fine in the bedrooms and living room. Not in the hallway." },
        ],
        kandidati: null,
        vybranyKandidat: null,
        realizator: null,
        zpravy: [],
      },
      {
        id: "malby",
        nazev: "Painting",
        profese: "Painting",
        od: "2026-04-15",
        do: "2026-04-20",
        zralost: "zadano",
        stavTrhu: "zadano-remeslnikovi",
        polozky: [{ nazev: "Painting, all rooms", castka: 45000 }],
        paky: [],
        kandidati: [
          { id: "m1", jmeno: "Malby Šindelář", hodnoceni: 4.9, zakazek: 71, castka: 45000, od: "2026-04-15", do: "2026-04-20" }, // [+] demo data
          { id: "m2", jmeno: "František Urban", hodnoceni: 4.7, zakazek: 24, castka: 48000, od: "2026-04-15", do: "2026-04-21" }, // [+] demo data
          { id: "m3", jmeno: "Malířství Doležal", hodnoceni: 4.8, zakazek: 38, castka: 47000, od: "2026-04-16", do: "2026-04-22" }, // [+] demo data
        ],
        vybranyKandidat: "m1",
        realizator: { jmeno: "Malby Šindelář", profese: "Painting" },
        zpravy: [],
      },
      {
        id: "kuchyn-dvere",
        nazev: "Kitchen and doors",
        profese: "Kitchen fitting",
        od: null,
        do: null,
        zralost: "upresnuji",
        stavTrhu: "poptano",
        polozky: [
          { nazev: "Kitchen units and fitting", castka: 165000 },
          { nazev: "Worktop and appliances", castka: 90000 },
          { nazev: "Kitchen electrics and plumbing hook-up", castka: 45000 },
        ],
        paky: [
          { id: "kuchyn", popis: "Kitchen units without appliances", uspora: 80000, dopad: "You buy the appliances yourself, outside the renovation budget." },
        ],
        kandidati: null,
        vybranyKandidat: null,
        realizator: null,
        zpravy: [],
      },
      {
        id: "dvere-zarubne",
        nazev: "Doors and frames",
        profese: "Joinery",
        od: null,
        do: null,
        zralost: "upresnuji",
        stavTrhu: "poptano",
        polozky: [
          { nazev: "Interior doors, 7 sets", castka: 140000 },
          { nazev: "Frames and hardware", castka: 50000 },
        ],
        paky: [
          { id: "dvere", popis: "Put doors and frames off for a year", uspora: 92000, dopad: "The originals will hold. Replacing them doesn't disturb anything else." },
        ],
        kandidati: null,
        vybranyKandidat: null,
        realizator: null,
        zpravy: [],
      },
    ],

    vicepráce: [
      {
        jobId: "obklady-podlahy",
        popis: "Damp was found in the bathroom wall during demolition. It needs treating before the tiling goes on, otherwise the tiles will come away within two years.",
        castka: 18000,
        dopadNaTermin: "Adds 3 days. Handover moves to 30 April.",
        stav: "schvaleno", // "cekajici" | "schvaleno" | "zamitnuto"
      },
    ],

    vyuctovani: [
      { nazev: "Damp treatment in the bathroom", castka: 18000, duvod: "Approved 12 March, see extra work above." },
      { nazev: "Less tile waste than allowed for", castka: -7000, duvod: "Smaller offcut margin than budgeted." },
      { nazev: "Two extra waste collections", castka: 12000, duvod: "Demolition produced more rubble than estimated." },
    ],

    nabidkyFirem: [
      { nazev: "Stavby Konečný s.r.o.", castka: 1124000, popis: "1 contract, one warranty on the whole job. Handover 11 May." }, // [+] demo data
      { nazev: "RenovaBrno s.r.o.", castka: 1219000, popis: "1 contract, one warranty on the whole job. Handover 27 April." },
      { nazev: "Dům a byt s.r.o.", castka: 1358000, popis: "1 contract, one warranty on the whole job. Handover 20 April." },
    ],

    remeslnik: {
      jmeno: "Jiří Vaněk",
      obor: "Electrical",
      lokalita: "Brno",
      hodnoceni: 4.9,
      pocetZakazek: 58,
      overeni: ["Company registered", "Trade licence", "Certified for inspections"],
      realizace: [
        { nazev: "2-bedroom flat rewire, Brno-Žabovřesky", rozpocet: "on budget", termin: "handed over on time" }, // [+] demo data
        { nazev: "Family house, Modřice", rozpocet: "on budget", termin: "2 days late" }, // [+] demo data
        { nazev: "Office fit-out, Brno centre", rozpocet: "on budget", termin: "handed over on time" }, // [+] demo data
      ],
    },

    partner: {
      poptavka: {
        id: "poptavka-byt-3-1",
        stav: "rozpracovana", // "nova" | "rozpracovana" | "odeslana" | "hotova"
        polozky: [
          { nazev: "Plasterboard", mnozstvi: "18 m²", navrzeno: "Rigips", znacka: "Rigips" },
          { nazev: "Profiles and fixings", mnozstvi: "1 set", navrzeno: "Rigips", znacka: "Rigips" },
          { nazev: "Skim coat", mnozstvi: "210 kg", navrzeno: "Weber", znacka: "Weber" },
          { nazev: "Party wall insulation", mnozstvi: "22 m²", navrzeno: "Isover", znacka: "Isover" },
          { nazev: "Bathroom tanking", mnozstvi: "14 m²", navrzeno: null, znacka: null },
        ],
      },
      objednavka: {
        cislo: "#2419",
        polozky: "Plasterboard 18 m², profiles, skim coat 210 kg, insulation 22 m²",
        stav: "Dispatched 12 March, delivery 16 March",
        adresa: "Královo Pole, Brno", // odkryto až v T4
        mimoKumu: "Bathroom tanking 14 m² — ordered outside Kumu",
      },
      spotreba: { navrzeno: 41000, pesKumu: 33000, jinde: 8000 },
    },
  },

  // ============================================================
  // MALÁ ZAKÁZKA — zatepleni-bystrc
  // Řetěz: 338 000 → 332 000, strop 350 000
  // ============================================================
  "zatepleni-bystrc": {
    id: "zatepleni-bystrc",
    okamzik: "T3",
    identita: {
      nazev: "Facade insulation, Bystrc",
      plocha: "family house, 140 m² facade", // [+] demo data
      typ: "1990s house, uninsulated facade",
      lokalita: "Brno-Bystrc",
    },
    zadani: {
      strop: 350000,
      terminDo: "before winter 2026",
      dotace: "Nová zelená úsporám — application pending", // [+] demo data
      bydliBehem: true,
      jadroBourat: false,
    },
    rezervaMimoJoby: 24000,

    joby: [
      {
        id: "zatepleni",
        nazev: "Facade insulation and render",
        profese: "Insulation & render",
        od: "2026-03-09",
        do: "2026-03-27",
        zralost: "zadano",
        stavTrhu: "probiha",
        polozky: [
          { nazev: "Facade insulation, EPS 140mm", castka: 198000 },
          { nazev: "Scaffolding and render finish", castka: 84000 },
          { nazev: "Windowsills and detailing", castka: 32000 },
        ],
        paky: [],
        kandidati: [
          { id: "z1", jmeno: "Fasády Kolář", hodnoceni: 4.8, zakazek: 33, castka: 314000, od: "2026-03-09", do: "2026-03-27" }, // [+] demo data
          { id: "z2", jmeno: "Zateplení Novotný", hodnoceni: 4.6, zakazek: 51, castka: 322000, od: "2026-03-16", do: "2026-04-02" }, // [+] demo data
        ],
        vybranyKandidat: "z1",
        realizator: { jmeno: "Fasády Kolář", profese: "Insulation & render" },
        zpravy: [
          { odKoho: "remeslnik", text: "Scaffolding goes up Monday, weather permitting.", cas: "2026-03-06T16:10:00" }, // [+] demo data
        ],
      },
    ],

    vicepráce: [],

    vyuctovani: [
      { nazev: "Less scaffold hire than budgeted", castka: -6000, duvod: "Finished four days ahead of schedule." },
    ],

    nabidkyFirem: [],

    remeslnik: {
      jmeno: "Fasády Kolář",
      obor: "Insulation & render",
      lokalita: "Brno",
      hodnoceni: 4.8,
      pocetZakazek: 33,
      overeni: ["Company registered", "Trade licence"],
      realizace: [
        { nazev: "Family house, Modřice", rozpocet: "on budget", termin: "handed over on time" }, // [+] demo data
      ],
    },

    partner: null,
  },
};

export const asistentSablony = {
  trade: [
    { dotaz: "When do I start on Královo Pole?", odpoved: "2 March. Demolition runs before you and finishes on 27 February. I'll tell you if that moves." },
    { dotaz: "Who's doing the plumbing there?", odpoved: "Instalace Kříž. They're in from 23 February to 2 March and hand over to you directly." },
    { dotaz: "Move my Friday by a week.", odpoved: "I can shift that appointment by a week. I'll write to the customer and let you know once they confirm." },
    { dotaz: "How much am I owed?", odpoved: "116,000 across two invoices. One is 9 days overdue — I can send a reminder." },
  ],
};
