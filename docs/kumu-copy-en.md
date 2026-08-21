# Kumu — produktové texty (EN)

**Datum:** 2026-08-21
**Co to je:** zdroj pravdy pro všechny texty v aplikaci. Produkt je primárně international, texty jsou anglicky.
**Dokumentace zůstává česky.** Kostra, design a koncept se nepřekládají.

---

## Nejdřív: co z české verze v international produktu nefunguje

Přehození řetězců je snadná část. Tohle je ta těžká — pět věcí, které jsou v demu české ne jazykem, ale podstatou. Žádnou z nich za tebe rozhodnout nemůžu.

| Prvek | Problém | Možnosti |
|---|---|---|
| **Měna a částky** | Celý scénář je v Kč a odehrává se v Brně. Publikum mimo ČR nemá k 1 388 000 Kč žádný cit — nepozná, jestli je to hodně, nebo málo. | (a) Nechat CZK a scénář v Brně, brát to jako doložený případ z trhu, kde už jsme. (b) Přepočítat na EUR a přesunout scénář. (b) znamená přepsat všech ~40 čísel a znovu ověřit součty. |
| **Fakturoid** | Česká fakturační služba. V international produktu je to prázdný název. | Nahradit obecným „Send invoice", nebo ukázat volbu integrací. Vize na Fakturoidu stojí, takže je to i produktová otázka, ne jen textová. |
| **Hodnocení Seznam + Google** | Seznam je český vyhledávač. | Google + Trustpilot je international ekvivalent. |
| **IČO, živnostenský rejstřík, ARES** | Ověření živnosti je národní. | Obecně „company register", konkrétní zdroj podle trhu. Na obrazovce profilu to nese důvěru, takže obecná formulace ji oslabí. |
| **„Byt 3+1", 74 m²** | Český zápis dispozice. Metry jsou v pořádku všude mimo USA a UK. | „3-bedroom flat" nebo „74 m² apartment". |

Doporučení nedávám. Ale bod 1 se musí rozhodnout dřív, než se postaví F2 — visí na něm každé číslo v prototypu.

---

## Tón

Klidně a konkrétně. Zákazník je nervózní z toho, kolik to bude stát; řemeslník má čtyřicet sekund.

- Druhá osoba, přímo. Žádné „users can" ani pasivum.
- Žádné vykřičníky, žádné „Great!", žádné marketingové fráze.
- Tlačítka pojmenovávají výsledek, ne akci — „Get an estimate", ne „Submit".
- Čísla se píšou s oddělovači tisíců a měnou vzadu: `1,388,000 CZK`.
- Britský pravopis pro konzistenci s metrickými jednotkami.

---

## Vstupní obrazovka (F1)

| Kde | Text |
|---|---|
| Značka | `Kumu` |
| Odkaz vpravo | `Log in` |
| **Nadpis** | `Describe your project. We'll handle the budget, the materials and the trades.` |
| Hodnocení | `GOOGLE 4.9` · `TRUSTPILOT 4.9` |
| Příklad v poli | `For example: we've bought an older two-room flat in Brno. We want to redo the bathroom and the kitchen, put a new floor in the living room and repaint. Our budget is around 550,000 and we'd like to start in spring.` |
| Popisek u pole | `In your own words` |
| Tlačítko, horní řádek | `FREE, NO COMMITMENT` |
| Tlačítko, hlavní řádek | `Get an estimate` |
| Pilulka 1 | `Just an idea so far` |
| Pilulka 2 | `I have a rough idea` |
| Pilulka 3 | `I have drawings, I need a contractor` |
| Ujištění pod pilulkami | `We usually have a budget estimate and a list of works ready within minutes. No account, no commitment.` |
| Sekce ukázky | `WHAT YOU GET` |
| Karta 1 — hlavička | `BUDGET` |
| Karta 1 — popisek | `An itemised budget` |
| Karta 2 — hlavička | `QUESTION` |
| Karta 2 — obsah | `Do you want to keep the existing bathroom pipework, or replace it?` |
| Karta 2 — tlačítka | `Keep` · `Replace` |
| Karta 2 — popisek | `Follow-up questions` |
| Karta 3 — hlavička | `BID` |
| Karta 3 — obsah | `Vetted building team` |
| Karta 3 — tlačítko | `Accept bid` |
| Karta 3 — popisek | `A bid in one click` |
| Telefon | `Your plan` · `12 items` · `6—8 weeks` · `BUDGET` |
| Spodní pruh fází | `Idea` · `Project` · `Materials & budget` · `Bids` · `Build` |

**Ukázkový text pro demo** (vkládá se do pole v kroku 2 scénáře S1):

> `We've bought a three-room flat in a 1970s block. It's completely original and needs doing from top to bottom. We have around 1.2 million and we'd like to move in by the end of September.`

---

## Dialog (F1)

| Kde | Text |
|---|---|
| Otázka 1 | `Will you be living in the flat while the work is going on?` → `No, we're renting elsewhere` · `Yes` |
| Otázka 2 | `Should the bathroom be stripped back to the shell, or just resurfaced?` → `Strip it out` · `Surfaces only` · `Not sure` |
| Otázka 3 | `Fitted kitchen made to measure, or an off-the-shelf range?` → `Made to measure` · `Off-the-shelf` · `Undecided` |
| Otázka 4 | `Anything you'll do yourselves?` → `Painting` · `Nothing` · `Undecided` |
| Otázka 5 | `How firm is the end-of-September deadline?` → `Fixed` · `We have a month's slack` |

---

## B1 — Shrnutí zadání

| Kde | Text |
|---|---|
| Nadpis | `Your brief` |
| Řádky | `Scope` · `Floor area` · `Condition` · `Standard` · `Deadline` · `Budget ceiling` |
| Tlačítko | `That's right — calculate the budget` |

## B2 — Klíčové otázky

| Kde | Text |
|---|---|
| Nadpis | `What you'll need to decide` |
| Položka 1 | `Bathroom fittings standard` — `the gap between options runs to 90,000` |
| Položka 2 | `Made-to-measure kitchen vs. off-the-shelf` — `a difference of up to 120,000` |
| Položka 3 | `Vinyl or timber flooring` — `a difference of up to 70,000` |

---

## B3 — Rozpočet (F2)

| Kde | Text |
|---|---|
| Nadpis | `Budget estimate` |
| Poznámka pod nadpisem | `An indicative estimate based on your brief. It firms up once bids come in.` |
| Položky | `Demolition and waste removal` · `Electrical installation` · `Water and drainage` · `Bathroom and WC` · `Plasterboard ceilings and linings` · `Renders and skim` · `Flooring` · `Painting` · `Doors and frames` · `Kitchen units and fitting` · `Party wall insulation` · `Contingency` |
| Souhrn | `Total` · `Your budget` · `Difference` · `Headroom` |

## B8 výběr — Páky (F2)

| Kde | Text |
|---|---|
| Nadpis | `How to get under budget` |
| Páka 1 | `Kitchen units without appliances` — `You buy the appliances yourself, outside the renovation budget.` |
| Páka 2 | `Lower-wear vinyl` — `Fine in the bedrooms and living room. Not in the hallway.` |
| Páka 3 | `Put doors and frames off for a year` — `The originals will hold. Replacing them doesn't disturb anything else.` |
| Tlačítko | `Continue to choosing trades` |

## B8 varianty — Jak poptat (F2)

| Kde | Text |
|---|---|
| Nadpis | `How do you want to source this?` |
| **Podnadpis** | `We haven't approached anyone yet.` |
| Cesta A | `Trade by trade` — `7 requests · 7 contracts · 7 separate warranties · you coordinate` |
| Cesta B | `One firm, whole job` — `1 request · 1 contract · one warranty on the works · the firm coordinates` |
| Poznámka u cesty B | `Firms bidding for a whole job typically come in between 8% below and 18% above the sum of individual trades. The range is drawn from 340 completed renovations of comparable size. You'll know the actual figure once they bid.` |
| Výchozí volba | `Ask both and decide when the bids land` |
| Pod ní | `It costs you nothing. Bids arrive within days and you decide once there are numbers on the table.` |
| **Nezkratitelné** | `The whole-job range overshoots your budget in both directions. An estimate can't tell you which route is cheaper. Bids can.` |

## B4 — Materiál

| Kde | Text |
|---|---|
| Nadpis sbalené karty | `Materials list` |
| Položky | `Plasterboard` · `Profiles and fixings` · `Skim coat` · `Party wall insulation` · `Bathroom tanking` |

---

## F3 — Nabídky, zákazník

| Kde | Text |
|---|---|
| Shrnující řádek | `Day 6 after the requests went out. You're choosing across 5 of 7 trades; two are still waiting. One firm for the whole job: 3 complete bids.` |
| **Nezkratitelné** | `One firm gives you a complete price now. Trade by trade, you'll have one when the last two bids land.` |
| Balíčky | `Demolition and waste removal` · `Water and drainage` · `Electrical installation` · `Plasterboard and surfaces` · `Tiling and flooring` · `Painting` · `Kitchen and doors` |
| Stav — s nabídkami | `3 bids` · `2 bids` |
| Stav — bez nabídek | `Waiting on bids` |
| Prázdná sekce | `Request sent 20 Feb. Bids usually arrive within 10 days.` |

### Panel „Váš tým"

| Kde | Text |
|---|---|
| Nadpis | `Your team` |
| Štítek | `DRAFT` |
| Podnadpis | `You pick the people. We keep the sequence straight.` |
| Prázdný slot | `Choose someone` |
| Slot bez nabídek | `Waiting on bids` |
| Součet | `5 of 7 chosen` · `Estimate for the remaining two` · `Contingency` · `Total so far` · `under your budget` |
| Hlavní akce | `Confirm your team` |
| **Nezkratitelné** | `Or hand the whole job to one firm — from 1,124,000 CZK` |

### Cesta na klíč

| Kde | Text |
|---|---|
| Řádek u každé firmy | `1 contract, one warranty on the whole job` |
| **Nezkratitelné** | `The gap between the cheapest firm and the dearest is 234,000 CZK — more than all three budget savings put together.` |
| Panel po výběru | `What would change` — `The remaining six requests are cancelled.` · `The trades become the firm's subcontractors, not yours.` · `The budget firms up after a site visit.` |
| Návrat | `Back to choosing trades` |
| Přejmenovaný panel | `One firm, whole job` |

---

## F3 — Řemeslník

| Kde | Text |
|---|---|
| Spodní navigace | `Today` · `Opportunities` · `Invoices` · `Profile` |
| Plocha, řádky | `3 new jobs, one already has a bid drafted` · `2 bids waiting on a reply` · `1 invoice overdue, 9 days` |
| Štítek u příležitosti | `Bid ready` |
| Balíček — nadpis | `Electrical installation` |
| Balíček — rozsah | `Full rewire, consumer unit, 38 outlets, certification` |
| Balíček — kalendář | `You're free for these dates` |
| Balíček — návaznost | `You start after demolition, before the plasterboard goes up.` |
| Balíček — tlačítko | `Draft a bid` |
| **Nabídka — pod částkou** | `Based on your last 6 jobs in this category. Change it to suit.` |
| Nabídka — tlačítko | `Send bid` |
| Po odeslání | `Bid sent` |
| Faktury — řádky | `Ready to invoice` · `Awaiting payment` · `Overdue` |
| Faktury — poznámka | `The details come from the job. You retype nothing.` |
| **Profil — nezkratitelné** | `You don't maintain this profile. It fills itself from the jobs you finish.` |
| Profil — ověření | `Company registered` · `Trade licence` · `Certified for inspections` |
| Profil — u realizace | `On budget` · `Handed over on time` · `2 days late` |
| **Asistent — trvale** | `Answers come from your own jobs in Kumu.` |

**Asistent — čtyři dotazy a odpovědi**

| Dotaz | Odpověď |
|---|---|
| `When do I start on Královo Pole?` | `2 March. Demolition runs before you and finishes on 27 February. I'll tell you if that moves.` |
| `Who's doing the plumbing there?` | `Instalace Kříž. They're in from 23 February to 2 March and hand over to you directly.` |
| `Move my Friday by a week.` | `I can shift the inspection in Bystrc to 6 March. I'll write to the customer and let you know once they confirm.` |
| `How much am I owed?` | `116,000 across two invoices. One is 9 days overdue — I can send a reminder.` |

> Věta o původu ceny je nejcitlivější text v celém produktu. Nesmí z ní jít vyčíst, že cenu určila platforma. Nikde se nesmí objevit `recommended price`, `market rate` ani `competitive bid`.

---

## F4 — Realizace

| Kde | Text |
|---|---|
| Zákazník, aktuální etapa | `In progress` · `day 3 of 9` |
| **Vícepráce — nadpis** | `Extra work proposed` |
| Vícepráce — text | `Damp was found in the bathroom wall during demolition. It needs treating before the tiling goes on, otherwise the tiles will come away within two years.` |
| Vícepráce — dopad | `Adds 3 days. Handover moves to 30 April.` |
| Vícepráce — akce | `Approve` · `I'd like to talk it through` |
| Po schválení | `Approved 12 March` |
| Řemeslník | `Today` · `Add photos` · `Report a change` · `Your bid was accepted on 20 Feb.` |
| Partner | `Dispatched 12 March, delivery 16 March` · `ordered outside Kumu` |

---

## F5 — Dokončení

| Kde | Text |
|---|---|
| **Nadpis** | `Done` |
| Podnadpis | `Handed over 30 April 2026` |
| Vyúčtování — nadpis | `Plan and actual` |
| Řádky | `Plan after changes` · `Damp treatment in the bathroom` · `Less tile waste than allowed for` · `Two extra waste collections` · `Actual` · `Your budget` · `Difference` |
| **Nezkratitelné** | `0.3% off plan. Every line has a reason.` |
| Dokumentace | `Project documents` — `Electrical certificate` · `Warranties` · `Photo record` · `Materials used` |
| Hodnocení | `Rate the trades` |
| Řemeslník, faktura | `Pre-filled from the job` · `Send invoice` · `A copy is saved to the job.` |
| Partner | `Proposed in the budget` · `Ordered through Kumu` · `Ordered elsewhere` |
| **Partner — nezkratitelné** | `Unspecified lines in a budget are where the decision gets made without you.` |

---

## Partner

| Kde | Text |
|---|---|
| Anonymizovaná hlavička | `3-room flat, Brno north, 74 m²` |
| Štítek nad tabulkou | `ESTIMATE` |
| Sloupce | `Item` · `Quantity` · `Proposed` · `Brand` |
| Neurčená položka | `Not specified` |
| Akce | `Quote a price` · `Add a product` |
| Agregát | `Projects in preparation` · `Contain your categories` · `Average material value` · `Proposal to order` |

---

## Demo chrome

Není to produkt, ale ať to nedrhne.

| Kde | Text |
|---|---|
| Přepínač role | `Customer` · `Trade` · `Partner` |
| Přepínač fáze | `Brief` · `Budget` · `Bids` · `Build` · `Done` |
| Scénáře | `Full walkthrough` · `One firm` · `Trade view` · `Partner view` · `Extra work` |
| Demo mód | `Demo mode` |

---

## Co se změnilo proti české verzi

Ne všechno šlo přeložit — čtyři věci jsem musel napsat znovu.

**Nadpis.** Česky „Rozpočet, materiál i řemeslníky vyřešíme my" má sloveso na konci a tím spád. Anglicky to nejde, tak nese důraz trojice na konci: `the budget, the materials and the trades`.

**„Řemeslník".** V češtině jedno slovo. Anglicky je `craftsman` řemeslné a lehce archaické, `contractor` znamená spíš firmu. V rozhraní používám **`trade`** (a `the trades`), protože je to to, co v oboru říká zákazník i dodavatel. V dokumentaci česky zůstává řemeslník.

**Vykání.** Neexistuje. Klid a odstup proto nese délka věty a nulová exaltovanost, ne gramatika.

**„Na klíč".** `Turnkey` je v B2B srozumitelné, ale zákazník plánující byt ho nepoužije. V rozhraní je proto **`One firm, whole job`**; `turnkey` zůstává v dokumentaci.
