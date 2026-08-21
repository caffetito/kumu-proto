# Kumu — kostra

**Datum:** 2026-08-21
**Co to je:** referenční struktura prototypu. Matice fází a rolí, obsah, kompozice a chování. Hodnoty palety jsou v `kumu-design.md`.
**Co to není:** design, prompty, ani popis vize. Vize je v `kumu-prototyp-zadani.md`.

> **Produktové texty jsou anglicky.** Kumu se dělá primárně international. Všechny řetězce v rozhraní jsou v `kumu-copy-en.md` — ten je zdrojem pravdy. Kde v téhle kostře zůstal český text, platí anglická verze z copy decku. Dokumentace zůstává česky.
>
> V copy decku je i pět věcí, které jsou v demu české ne jazykem, ale podstatou: měna a částky, Fakturoid, hodnocení Seznam, IČO a živnostenský rejstřík, zápis „byt 3+1". Měnu je potřeba rozhodnout dřív, než se postaví F2 — visí na ní každé číslo v prototypu.

**Stav ostatních souborů**
- `kumu-prototyp-zadani.md` — koncept a dramaturgie. Platí.
- `kumu-design.md` — vizuální definice. Platí.
- `kumu-copy-en.md` — anglické produktové texty. Platí, má přednost před řetězci uvedenými níže.
- `kumu-tokeny-a-komponenty.md` — legenda tokenů a komponentní inventář. **Platí a má přednost před §7 a §8 níže.**
- `kumu-claude-design-zadani.md` a `kumu-opravne-prompty.md` — **nahrazeny tímhle dokumentem.** Nestavěj z nich.
- Stávající appka zůstává jako reference vedle. Needituje se.

**Tři kroky, tohle je první**
1. **Kostra** — struktura a obsah (tenhle dokument)
2. **Obrazovky** — statické návrhy, drží se legendy tokenů z `kumu-tokeny-a-komponenty.md`
3. **Stavba** — z hotových obrazovek

Mezikrok „šedá appka" odpadl. Plnoplošná plocha je hlavní kompoziční prvek — v šedé se nedá posoudit, protože bys posuzoval vztah ploch, který tam není.

---

## 1. Model

Tři osy. Každá obrazovka v prototypu je průsečík fáze a role; scénář je cesta maticí.

**Fáze** — stav projektu v čase. Globální, sdílená všemi rolemi.

| | Fáze | Zákaznický název | Co se v ní děje |
|---|---|---|---|
| F1 | Zadání | Projekt | Z věty vzniká strukturované zadání |
| F2 | Rozpočet a rozhodnutí | Materiál a rozpočet | Odhad, úspory, volba jak poptat |
| F3 | Poptávka a nabídky | Nabídky | Odešly poptávky, vracejí se nabídky |
| F4 | Realizace | Realizace | Práce běží, něco se změní |
| F5 | Dokončení | Dokončení | Plán proti skutečnosti, fakturace |

Zákaznické názvy jsou z černého pruhu na vstupní obrazovce. Ten má pět položek **Nápad · Projekt · Materiál a rozpočet · Nabídky · Realizace** — „Nápad" je stav před F1 a „Dokončení" v něm chybí. `[K rozhodnutí: přidat do pruhu šestou položku, nebo nechat Realizaci pokrývat F4 i F5.]`

**Role** — kdo se dívá. Přepínatelná nezávisle na fázi.

| Role | Zařízení | Vztah k projektu |
|---|---|---|
| Zákazník | Desktop | Projekt je jeho |
| Řemeslník | Mobil | Projekt je jedna z jeho zakázek |
| Partner | Desktop | Projekt je jeden ze vzorku |

**Scénář** — pojmenovaná cesta maticí. Viz §6.

### Stavový model

```
faze          F1 … F5          globální
role          zakaznik | remeslnik | partner
projekt       jeden objekt, viz §2
scenar        null | S1 … S5
krok          index v aktivním scénáři
```

Pravidlo, které drží celý prototyp pohromadě: **fáze i role jsou přepínatelné nezávisle a každá kombinace má definovaný obsah.** Žádná buňka matice není prázdná obrazovka — když se role projektu v dané fázi netýká, je to samo o sobě informace a musí být vidět (viz §4, F1 a F2 u řemeslníka).

---

## 2. Datový model

Jeden objekt, ze kterého čtou všechny tři role. Fáze určuje, který řez se zobrazí.

```
projekt
  identita       nazev, plocha 74 m², typ "panelák 1978, původní stav",
                 lokalita "Brno-Královo Pole", zakaznici "Petra a Martin"
  zadani         strop 1 200 000, terminDo "30. 9. 2026 (konec nájmu)",
                 bydliBehem false, jadroBourat true, kuchynNaMiru false,
                 svepomoci ["malby"], terminPevny false
  polozky[]      nazev, castka, znacka?
  paky[]         id, popis, uspora, dopad
  poptavka       zpusob: "profese" | "naklic" | "oboji"   (výchozí "oboji")
  balicky[]      nazev, profese, dni, od, do, stav
  nabidkyFirem[] nazev, castka, hodnoceni, realizaci, predani, poznamka
  nabidkyElektro[] jmeno, castka, hodnoceni, zakazek, od, do, poznamka
  vicepráce[]    popis, castka, dopadNaTermin, stav
  vyuctovani[]   nazev, castka, duvod
  remeslnik      jmeno, obor, lokalita, hodnoceni, realizaci,
                 overeni[], realizace[], kalendar[], faktury[]
  partner        polozkyMaterialu[], agregat{}
```

### Klíčová čísla

| | Kč |
|---|---:|
| Odhad, součet položek | 1 388 000 |
| Strop | 1 200 000 |
| Po třech pákách | 1 181 000 |
| Rozsah na klíč (odhad, F2) | 1 090 000 — 1 390 000 |
| Nabídky firem (F3) | 1 124 000 / 1 219 000 / 1 358 000 |
| Po schválení víceprací (F4) | 1 199 000 |
| Skutečnost (F5) | 1 204 000 |

Položky rozpočtu: bourání 85 000 · elektro 165 000 · voda a odpady 95 000 · jádro 285 000 · SDK *(Rigips)* 62 000 · omítky *(Weber)* 78 000 · podlahy 138 000 · malby 45 000 · dveře 92 000 · kuchyň 210 000 · izolace *(Isover)* 34 000 · rezerva 99 000.

Páky: kuchyň bez spotřebičů −80 000 · vinyl nižší třídy −35 000 · dveře odložit −92 000. Součet 207 000.

Vyúčtování F5: plán 1 181 000 + sanace 18 000 − obklady 7 000 + doprava 12 000 = **1 204 000**, tedy 4 000 nad stropem, odchylka 0,3 %.

Balíčky: bourání 16.—20. 2. · voda 23. 2.—2. 3. · **elektro 2.—13. 3.** · SDK 16.—26. 3. · obklady a podlahy 30. 3.—14. 4. · malby 15.—20. 4. · kuchyň a dveře 21.—27. 4. Předání 27. 4.

> Čísla jsou smyšlená a vnitřně konzistentní. Před prezentací partnerům je nechte zkontrolovat někým, kdo zná ceny.

---

## 3. Bloky

Uzavřená knihovna. AI nikdy negeneruje layout — plní jeden z těchto bloků.

| # | Blok | Režimy |
|---|---|---|
| B1 | Shrnutí zadání | — |
| B2 | Klíčové otázky | — |
| B3 | Rozpočet | odhad / po nabídkách / vyúčtování |
| B4 | Seznam materiálu | zákaznický / partnerský |
| B5 | Balíčky prací | přehled / rozbalený balíček |
| B6 | Harmonogram | plán / se stavem |
| B7 | Rizika | *v prototypu se nepoužívá* |
| B8 | Rozhodnutí | **výběr** (páky) / **varianty** (jak poptat) / **nabídky** (firmy, řemeslníci) |

B8 má tři režimy, protože rozhodnutí má v produktu tři různé tvary: zaškrtávací sada, rozcestí, a porovnání došlých nabídek. Kdyby přibyl čtvrtý blok mimo tenhle seznam, je to signál, že koncept „opakovatelné bloky" nesedí — zapiš si to.

**Panel „Váš tým" (§5, F3) není blok.** Bloky jsou to, co vyrábí asistent z projektu. Panel je průběžný souhrn toho, co naklikal zákazník — svou povahou je to košík, ne obsah. Proto zůstává knihovna na osmi blocích.

---

## 4. Matice — 5 fází × 3 role

Přehled. Detail každé buňky je v §5.

| | **Zákazník** (desktop) | **Řemeslník** (mobil) | **Partner** (desktop) |
|---|---|---|---|
| **F1** | Vstupní obrazovka s pilulkami zralosti a ukázkou výstupu → dialog → B1 → B2 | Plocha: cizí zakázky, projekt tu není | Prázdný stav: projekt ještě neexistuje |
| **F2** | B3 odhad · B4 · B8 páky · B8 jak poptáme | Beze změny, projekt ho stále nezná | Anonymní materiálová poptávka + agregát |
| **F3** | Skládání týmu do panelu · B6 · B8 nabídky · živá cesta na klíč | Plocha → příležitost → balíček → nabídka | Nabídka ceny na materiál |
| **F4** | B6 se stavem · vícepráce ke schválení | Plocha: dnešní úkol · průběh · hlášení změny | Objednávka a expedice, identita odkrytá |
| **F5** | B3 vyúčtování · hodnocení · dokumentace | Plocha: k vyfakturování → faktura | Realizovaná spotřeba vs. navrženo |

**Napříč všemi fázemi u řemeslníka:** spodní navigace (Dnes / Příležitosti / Faktury / Profil) a asistent. Plocha je jeho, ne projektu — proto existuje i ve fázích, kdy projekt ještě nezná.

**Dvě strukturální pravidla, která platí všude:**

1. **Nic, co nebylo získáno, se nezobrazuje jako fakt.** Ve F2 neexistuje jediná oslovená firma, takže tam nejsou jména ani konkrétní ceny na klíč — jen rozsah z agregátu. Odhad se od nabídky liší vizuálně i slovně ve všech třech rolích.
2. **Identita se odkrývá až s objednávkou.** Partner vidí ve F2 a F3 projekt anonymizovaně („Byt 3+1, Brno-sever, 74 m²"). Jméno a adresa se objeví až ve F4, kdy existuje objednávka a dodání na místo.

---

## 5. Fáze po fázi

### F1 — Zadání

**Zákazník**

Vstupní obrazovka existuje v návrhu (varianta 3a). Kostra z ní přebírá **rozvržení a chování**; barvy jsou provizorní, dokud se nerozhodne paleta.

#### Horní pruh

Značka Kumu vlevo, podtržený odkaz „Přihlásit se" vpravo, vlasová linka pod tím. Odkaz je v prototypu nefunkční, ale **je vidět** — vstup bez registrace je vlastnost, ne absence účtů.

#### Hero — dva sloupce

**Vlevo:** displejový nadpis na čtyři řádky. Není to otázka, je to slib:

> Popište projekt. Rozpočet, materiál i řemeslníky vyřešíme my.

Pod ním vlasová linka a sociální důkaz ve dvou sloupcích: Seznam 4,9 a Google 4,9, obojí s hvězdičkami.

**Vpravo:** orámovaná karta, uvnitř ve třech pásmech oddělených linkami.

1. Textové pole s příkladovým textem.
2. **Tři pilulky fáze zralosti** vodorovně, pod nimi ujišťovací věta. Obojí je **uvnitř karty**, ne pod ní — volba zralosti je součást zadávání, ne vedlejší filtr.
3. Zápatí karty: vpravo dvouřádkové pilulkové tlačítko, drobně **ZDARMA A NEZÁVAZNĚ**, pod tím **Začít**.

Ke kartě míří ručně kreslená šipka. Je to jediná dekorace v celém produktu — viz výjimka v `kumu-tokeny-a-komponenty.md` §3b.

Pilulky:

| Pilulka | Co dělá |
|---|---|
| **Zatím jen nápad** | Příklad v poli je vágní, asistent začíná orientačními otázkami. **Předvybraná v návrhu** |
| Mám představu | Příklad obsahuje rozsah a rozpočtový strop |
| Mám projekt, hledám dodavatele | Příklad zmiňuje hotovou dokumentaci, asistent přeskakuje k poptávce |

Ujišťovací věta pod pilulkami: „Odhad rozpočtu a seznam prací obvykle připravíme do několika minut. Bez registrace a nezávazně."

> **Rozpor k rozhodnutí.** Návrh má předvybranou „Zatím jen nápad", ale demo scénář i ukázkový text jsou „Mám představu" — Petra a Martin mají rozsah i strop. Buď se předvybere druhá pilulka, nebo se v kroku 1 scénáře S1 klikne ručně. Druhá varianta je lepší: ukáže, že pilulky něco dělají.

> **Rozsah:** proklikaná je jen cesta „Mám představu". Ostatní dvě mění příkladový text a první otázku asistenta, pak se sbíhají do stejného dialogu. Tři plné větve by prototyp ztrojnásobily.

#### Ukázka výstupu

Druhá sekce pod vlasovou linkou, uvedená prostrkaným popiskem **UKÁZKA VÝSTUPU**. Kompozice: obrys telefonu s plánem, přes něj přesahují tři bílé karty.

| Karta | Obsah | Popisek pod kartou |
|---|---|---|
| ROZPOČET | Bourací práce 42 000 · Koupelna 138 000 · Kuchyň 176 000 · Materiál 94 000 · **Celkem 450 000 Kč** | Rozpočet po položkách |
| OTÁZKA | „Přejete si u koupelny zachovat stávající rozvody, nebo je vyměnit za nové?" — dvě tlačítka Zachovat / Vyměnit | Doplňující otázky |
| NABÍDKA | Hodnocení 4,9 · Prověřený stavební tým · **398 000 Kč** · tlačítko Přijmout nabídku | Nabídka na jedno kliknutí |

V telefonu za kartami: hlavička Kumu / Váš plán, název projektu, 12 položek, 6—8 týdnů, **72 %** s ukazatelem, dole ROZPOČET 450 000 Kč.

Tahle sekce je ukázkou tří bloků z §3 — B3, B2 a B8. Vstupní obrazovka tím inzeruje přesně to, co produkt umí, a nic navíc.

> **Příkladový projekt je jiný než demo scénář** — je to byt 2+kk za 450 000 Kč, ne náš 3+1. Je to záměr, ukazuje to, že produkt zvládne i menší zakázku. Ukázkový text, který se v demu vloží do pole, je ale ten náš 3+1 (viz §2).

Ukazatel 72 % je úplnost plánu, ne postup prací. Drobnost, ale jinde v kostře nefiguruje — pokud zůstane, patří i do F2.

> **Konflikt se semantikou.** V návrhu jsou součty 450 000 Kč a 398 000 Kč obarvené akcentem. Karta ROZPOČET je přitom doslova náhled bloku B3, kde je barevné číslo vyhrazené pro nad/pod rozpočtem. Buď součty zneutrální, nebo v ukázce výstupu nebudou náhledy skutečných bloků. Rozbor v `kumu-tokeny-a-komponenty.md` §3a.

#### Jak to funguje — tři kroky

Pásmo pod ukázkou výstupu. Tři sloupce oddělené vlasovými linkami, každý s číslem `01`—`03`, nadpisem a dvěma větami.

| # | Nadpis | Text |
|---|---|---|
| 01 | Popíšete, co chcete udělat | Vlastními slovy a jakkoli neúplně. Na to, co chybí, se doptáme. |
| 02 | Dostanete nabídky řemeslníků | S cenami prací i materiálu. Rozsah a kvalitu můžete posouvat a rovnou vidíte, co to udělá s celkem. |
| 03 | Vyberete si firmy pro realizaci | Ověření řemeslníci vidí konkrétní projekt, ne obecnou poptávku. Proto jsou jejich ceny srovnatelné. |

Pod nimi uzavírací řádek: „Vše na jednom místě. Od nápadu až do konce projektu."

> Krok 03 je **nejlepší zákaznická formulace celého konceptu**, jakou zatím máme — lepší než cokoli v `kumu-prototyp-zadani.md`. Stojí za to použít ji i v prezentaci.

#### Fázový pruh a patička

**Fázový pruh** — tmavý, přes celou šířku, mezi obsahem a patičkou. Pět položek oddělených hvězdičkami: Nápad · Projekt · Materiál a rozpočet · Nabídky · Realizace. Je to **produktový prvek, ne demo chrome** (viz §7).

**Patička** — na základní ploše, oddělená od pruhu vlasovou linkou. Značka a jednořádkový popis vlevo, tři sloupce odkazů: Kumu (O nás · Jak to funguje · **Pro řemeslníky**) · Podpora (Časté dotazy · Kontakt · Nahlásit problém) · Právní informace (Obchodní podmínky · Zásady ochrany osobních údajů · Nastavení cookies). Dole provozovatel a copyright.

Dvě věci z patičky sahají dál než do vzhledu:

1. **Patička přiznává provozovatele: NejŘemeslníci.cz s.r.o.** Je to částečná odpověď na otevřenou otázku, jestli je Kumu nástupce, nebo paralelní produkt — navenek je to produkt NŘ. Stojí za to vědět, že to publikum uvidí dřív, než se na to zeptá.
2. **„Pro řemeslníky" je druhý vstup do produktu.** V matici §4 žádný takový vstup není — nabídková strana se do prototypu dostává jen přes přepínač role. `[K rozhodnutí: má prototyp mít řemeslnickou vstupní obrazovku, nebo zůstane odkaz nefunkční?]`

Všechny odkazy v patičce jsou v prototypu nefunkční. Cílové stránky neexistují.

#### Dialog

Po odeslání se pole promění v konverzaci. Jednosloupcová, zprávy zákazníka vpravo, odpovědi asistenta vlevo, bez avatarů. Vždy **jedna** otázka, k ní dvě až tři tlačítka — přesně jako karta OTÁZKA v ukázce výstupu.

Pořadí: bydlení během rekonstrukce → jádro bourat/povrchy → kuchyň na míru/sériová → svépomoc → pevnost termínu. Po páté odpovědi přijde B1.

#### B1 a B2

**B1** — karta, definiční tabulka: Rozsah / Plocha / Stav / Standard / Termín / Strop. Tlačítko „Souhlasí, spočítat rozpočet" → F2.

**B2** — karta pod B1. Tři rozhodnutí k udělání, u každého cenový dopad. Bez tlačítek.

---

**Řemeslník** — plocha, záložka Dnes. Dnešní zakázka na jiném projektu, zítra volno, pátek revize. Žádná stopa po Královu Poli. Nula příležitostí navázaných na tenhle projekt.

**Partner** — prázdný stav. Text: projekt zatím neexistuje, poptávka nevznikla. Agregát nad ostatními projekty zůstává dostupný.

---

### F2 — Rozpočet a rozhodnutí

**Zákazník**

| Blok | Struktura |
|---|---|
| B3 odhad | Nadpis + poznámka o orientačnosti. Tabulka položek, u položek se značkou drobný štítek. Řádek Celkem. Řádek Strop. Řádek Rozdíl **+188 000** v semantice „nad". Vodorovný ukazatel se zřetelným přetečením |
| B8 výběr | Nadpis „Jak se dostat pod rozpočet". Tři zaškrtávací páky: popis, úspora, dopad. Zaškrtnutí okamžitě přepočítá B3. Při součtu pod stropem se řádek Rozdíl mění na Rezerva a přebarví se |
| B8 varianty | Nadpis „Jak to chcete poptat", podnadpis **„Zatím jsme nikoho neoslovili."** Dvě cesty: Po profesích (1 181 000, 7 poptávek, 7 smluv, 7 záruk, koordinujete vy) a Na klíč (**rozsah** 1 090 000 — 1 390 000, 1 poptávka, 1 smlouva, jedna záruka, koordinuje firma). Tři volitelné stavy, výchozí **obojí** |
| B4 | Sbalená karta, rozbalitelná. SDK 18 m² · profily · stěrky 210 kg · izolace 22 m² · hydroizolace 14 m² |

Volba v B8 varianty **nemění částku v B3**. Je to pořád odhad, ne nabídka. Ovlivní jen obsah F3.

Věty, které se nezkracují:
- „Firmy na klíč nabízejí zpravidla mezi −8 % a +18 % proti součtu jednotlivých profesí. Rozsah vychází ze 340 dokončených rekonstrukcí podobného rozsahu."
- „Rozsah na klíč přesahuje váš rozpočet na obě strany. Která cesta je levnější, se z odhadu poznat nedá — pozná se to z nabídek."
- „Nic vás to nestojí. Nabídky přijdou během několika dní a rozhodnete se, až budou na stole čísla."

**Řemeslník** — beze změny proti F1. Projekt ho stále nezná. Je to záměr: plocha patří jemu, ne projektu.

**Partner** — dva panely.

*Materiálová poptávka* — anonymizovaná hlavička („Byt 3+1, Brno-sever, 74 m²"), tabulka: položka, množství, navrženo, značka. Poslední řádek **hydroizolace — neurčeno**, vizuálně odlišený, s akcí „Doplnit produkt". Ostatní řádky mají „Nabídnout cenu". Nad tabulkou štítek **odhad**, ne objednávka.

*Agregát* — čtyři čísla: projektů v přípravě 340 · obsahuje vaše kategorie 61 % · průměrná hodnota materiálu 84 000 Kč · konverze návrh → objednávka 23 %. Pod tím rozložení po krajích. Bez jmen, bez adres.

---

### F3 — Poptávka a nabídky

**Zákazník**

Fáze 3 stojí na jednom vzoru: **zákazník si skládá tým** kliknutím na nabídky, které se přesouvají do trvalého panelu. Vedle toho zůstává po celou dobu živá druhá cesta — jedna firma na celou zakázku.

Nad vším shrnující řádek: **6. den po odeslání poptávek.** Vybíráte z 5 profesí ze 7, u dvou ještě čekáme na nabídky. Na klíč jsou 3 kompletní nabídky, 1 124 000 — 1 358 000 Kč.

Věta, která se nezkracuje: **„Na klíč máte kompletní cenu hned. Po profesích ji budete mít, až dorazí zbylé dvě nabídky."**

#### Levý sloupec — profese a kandidáti

Sedm sekcí pod sebou, jedna na balíček. Každá má název profese, rozsah, termín a odhad. Uvnitř kandidáti jako kompaktní karty: jméno, hodnocení, počet zakázek, cena, termín.

| # | Balíček | Odhad | Stav |
|---|---|---:|---|
| 1 | Bourání a odvoz suti | 85 000 | 3 nabídky |
| 2 | Voda a odpady | 95 000 | 2 nabídky |
| 3 | Elektroinstalace | 165 000 | 3 nabídky |
| 4 | Sádrokartony a povrchy | 174 000 | 2 nabídky |
| 5 | Obklady a podlahy | 388 000 | **čekáme na nabídky** |
| 6 | Malby | 45 000 | 3 nabídky |
| 7 | Kuchyň a dveře | 130 000 | **čekáme na nabídky** |
| | Rezerva na vícepráce | 99 000 | mimo balíčky |

Sekce bez nabídek jsou potlačené, bez kandidátů, s textem „Poptávka odešla 20. 2. Nabídky obvykle chodí do 10 dnů."

Vybrané nabídky v demu a jejich odchylka od odhadu: bourání 82 000 *(−3 000)* · voda 98 000 *(+3 000)* · elektro **Jiří Vaněk 158 000** *(−7 000)* · sádrokartony 181 000 *(+7 000)* · malby 45 000 *(0)*.

> **Vázaná podmínka:** součet pěti vybraných nabídek musí dát přesně 564 000 Kč, tedy stejně jako součet jejich odhadů. Odchylky se navzájem vyruší, celek zůstane na 1 181 000 Kč a čísla ve fázích 4 a 5 platí beze změny. Kdyby se nabídky měnily, musí se dorovnat.

#### Pravý sloupec — panel „Váš tým"

Trvalý, přilepený při rolování. Štítek **Návrh**, dokud se tým nepotvrdí.

- Podnadpis: „Vy vybíráte lidi, my hlídáme návaznosti."
- Sedm slotů, jeden na profesi. Prázdný slot: název profese verzálkami a potlačené „Vyberte řemeslníka". Slot u profese bez nabídek: „Čekáme na nabídky", bez akce.
- Zaplněný slot: název profese verzálkami, pod ním jméno, hodnocení a **cena**.
- Průběžný součet:
  - Vybráno 5 ze 7 — **564 000 Kč**
  - Odhad zbývajících dvou — 518 000 Kč
  - Rezerva — 99 000 Kč
  - **Celkem zatím 1 181 000 Kč**, 19 000 pod vaším rozpočtem
- Dole hlavní akce **„Potvrdit tým"**, aktivní až při sedmi slotech.
- Pod ní potlačený řádek, který se nezkracuje: **„Nebo to nechte na jedné firmě — od 1 124 000 Kč"** s prokliknutím na cestu na klíč.

#### Mechanika výběru

Tohle musí být funkční, ne popsané. Je to jádro obrazovky.

1. Kliknutí na kandidáta ho přesune do slotu jeho profese. Přechod je vidět, do 300 ms.
2. Vybraná karta dostane zaškrtnutí a zvýrazněný stav. Ostatní kandidáti v sekci zešednou, ale zůstanou klikatelné — výběr jde změnit.
3. Počítadlo naskočí. Průběžný součet se přepočítá.
4. Zvýraznění se posune na další sekci s nabídkami. Sekce bez nabídek se přeskočí.
5. Odebrání z panelu vrátí sekci do nevybraného stavu.
6. Panel při rolování zůstává. Na užších plochách sjede pod obsah, ale nezmizí.

#### Druhá cesta zůstává živá

Zásadní a snadné to ztratit: **cesta na klíč nesmí zmizet ve chvíli, kdy začne skládání týmu.** Řádek „Nebo to nechte na jedné firmě — od 1 124 000 Kč" je vidět celou dobu, i s pěti zaplněnými sloty.

Má to i početní důvod. Nejlevnější firma na klíč (1 124 000) je pod součtem po profesích (1 181 000). Zákazník tedy během skládání týmu vidí, že by pořád mohl ušetřit 57 000 tím, že to nechá na jedné firmě. Rozhodnutí zůstává otevřené až do potvrzení — a to je přesně ten produktový princip z fáze 2: nerozhodovat dřív, než je z čeho.

Přepnutí na cestu na klíč otevře tři nabídky firem (viz níže) a panel „Váš tým" se změní na „Jedna firma na vše" s jedním slotem. Rozdělané výběry se nezahodí — návrat je vrátí.

#### Cesta na klíč

Tři nabídky na celý projekt:

| Firma | Cena | Proti odhadu | Hodnocení | Předání |
|---|---:|---:|---|---|
| Stavby Konečný s.r.o. | 1 124 000 | −57 000 | 4,6 (18) | 11. 5. |
| RenovaBrno s.r.o. | 1 219 000 | +38 000 | 4,8 (54) | 27. 4. |
| Dům a byt s.r.o. | 1 358 000 | +177 000 | 4,9 (112) | 20. 4. |

Každá má řádek „1 smlouva, jedna záruka na celé dílo" a rozdíl proti stropu: 76 000 pod · 19 000 nad · 158 000 nad.

Věta, která se nezkracuje: „Rozdíl mezi nejlevnější a nejdražší firmou je 234 000 Kč — víc než všechny tři úspory z rozpočtu dohromady."

Výběr firmy rozbalí panel „Co by se změnilo": zbylé poptávky se zruší · řemeslníci budou subdodavatelé firmy · rozpočet se upřesní po prohlídce. **Panel, ne druhá větev.** Fáze 4 a 5 existují jen ve verzi po profesích.

#### B6 harmonogram

Nad sekcemi vodorovná osa 16. 2. — 27. 4., sedm segmentů, předání. Segmenty se zaplněnými sloty jsou plné, ostatní obrysové.

**Mechanika, která musí být funkční:** výběr nejlevnější elektro nabídky s pozdějším termínem posune celý navazující harmonogram a datum předání. Přepnutí na jinou nabídku ho vrátí. Levnější nabídka není levnější rozhodnutí a musí to být vidět na ose, ne v textu.

---

**Řemeslník**

| Obrazovka | Struktura |
|---|---|
| Plocha / Dnes | Datum. Dnes: cizí zakázka. Zítra: volno. Pátek: revize. Řádek „3 nové příležitosti, u jedné je připravená nabídka". Řádek „2 nabídky čekají na odpověď". Řádek „1 faktura po splatnosti, 9 dní" v semantice „nad" |
| Příležitosti | Tři balíčky. První — Elektroinstalace, byt 3+1, Královo Pole — se štítkem **Nabídka připravená** |
| Balíček práce | Termín 2.—13. 3. a potvrzení volna v kalendáři. Rozsah: kompletní nová elektroinstalace, rozvaděč, 38 vývodů, revize. Návaznost: po bouracích, před SDK. Fixní tlačítko dole |
| Nabídka | Velké editovatelné pole s částkou 165 000. **Přímo pod částkou**, ne v nápovědě: „Odvozeno z vašich posledních 6 zakázek v této kategorii. Cenu si upravte." Termín editovatelný. Poznámka předvyplněná. Odeslání → potvrzení |
| Profil | Jméno, obor, lokalita, 4,8 (31). Ověření: IČO, živnostenské oprávnění, oprávnění k revizím. Věta „Profil si nemusíte udržovat. Doplňuje se z dokončených projektů." Tři realizace s dodržením rozpočtu a termínu. **Žádné editační tlačítko** |
| Asistent | Dostupný ze všech záložek. Čtyři předpřipravené dotazy: kdy nastoupit / kdo dělá vodu / posuň mi pátek / kolik mi dluží. Trvale pod konverzací: „Odpovědi vycházejí z vašich projektů v Kumu." |

**Hranice, kterou nesmíme přejít:** nabídka je návrh z jeho vlastní cenové historie, ne cena stanovená platformou. Nikde nesmí být „doporučená cena", srovnání s trhem ani „konkurenceschopná nabídka". Pokud to demo splete, řemeslníci na něj zareagují odmítavě.

**Partner** — stejné jako F2, ale řádky mají aktivní akci „Nabídnout cenu" a u hydroizolace „Doplnit produkt". Stále anonymizované.

---

### F4 — Realizace

**Zákazník**

- B6 se stavem: etapy 1—3 hotové, etapa 4 probíhá, 5—7 čekají
- Karta aktuální etapy: „Sádrokartony a povrchy", jméno řemeslníka, den 3 z 9, tři fotky
- **Vícepráce** — odlišená karta: nález vlhké stěny v koupelně, nutná sanace před obklady, **+18 000 Kč**, prodloužení o 3 dny, předání 30. 4. Dvě akce: „Schválit" a „Chci to probrat"
- Po schválení: 1 181 000 → **1 199 000**, stále pod stropem, semantika zůstává „pod"

**Řemeslník** — plocha, Dnes: „Byt 3+1, Královo Pole — elektroinstalace, den 8 z 10". Obrazovka průběhu: dnešní úkol, přidat fotky, nahlásit změnu, řádek „Vaše nabídka byla přijata 20. 2." Nic víc — telefon je ve špinavém prostoru.

**Partner** — objednávka #2419: SDK 18 m², profily, stěrky 210 kg, izolace 22 m². Stav: expedováno 12. 3., dodání 16. 3. **Zde se poprvé odkrývá adresa dodání.** Řádek „Hydroizolace 14 m² — objednáno mimo Kumu" potlačeně, bez akce.

---

### F5 — Dokončení

**Zákazník** — hlavní obrazovka závěru.

- Nadpis „Hotovo", předáno 30. 4. 2026
- B3 vyúčtování: plán 1 181 000 → sanace +18 000 *(schváleno 12. 3.)* → obklady −7 000 *(menší prořez)* → doprava +12 000 *(dva odvozy navíc)* → skutečnost **1 204 000** → strop 1 200 000 → rozdíl **+4 000**
- Řádek Rozdíl **není** v semantice „nad". Čtyři tisíce na projektu za 1,2 milionu není překročení, je to přesnost. Pod tabulkou: „Odchylka 0,3 %. Každá položka má důvod."
- Sbalená karta Dokumentace: revize, záruky, fotodokumentace, seznam materiálů
- Hodnocení sedmi řemeslníků

**Řemeslník** — plocha: „K vyfakturování: Byt 3+1, Královo Pole, 158 000 Kč". Faktura: číslo, odběratel, položka, částka, splatnost, hlavička „Předvyplněno z projektu", akce „Vystavit ve Fakturoidu", poznámka „Doklad se uloží k projektu."

**Partner** — realizovaná spotřeba: navrženo 41 000 · objednáno přes Kumu 33 000 · objednáno jinde 8 000 *(hydroizolace)*. Věta: „Neurčené položky v rozpočtu jsou místa, kde se rozhoduje mimo vás."

---

## 6. Scénáře

Matice říká, co existuje. Scénář je pojmenovaná cesta skrz ni. Prototyp umí přehrát kterýkoli.

### S1 — Hlavní (prezentace, 14 kroků)

| # | Role | Fáze | Co je vidět |
|---|---|---|---|
| 1 | Zákazník | F1 | Vstupní obrazovka, pilulka „Mám představu" |
| 2 | Zákazník | F1 | Ukázkový text vložen, dialog rozjetý |
| 3 | Zákazník | F1 | B1 shrnutí zadání |
| 4 | Zákazník | F2 | B3 odhad, 1 388 000, přes strop |
| 5 | Zákazník | F2 | Páky zaškrtnuté, 1 181 000 — **peak** |
| 6 | Zákazník | F2 | B8 jak to poptáme, výchozí obojí |
| 7 | Zákazník | F3 | Skládání týmu — tři kliknutí, panel se plní |
| 8 | Zákazník | F3 | Řádek „nebo jedna firma", přepnutí na klíč a zpět |
| 9 | **Řemeslník** | F3 | Plocha, záložka Dnes |
| 10 | Řemeslník | F3 | Balíček práce |
| 11 | Řemeslník | F3 | Nabídka, editace 165 → 158 |
| 12 | Zákazník | F3 | Tři nabídky na elektro |
| 13 | **Partner** | F2 | Materiálová skladba + agregát |
| 14 | Zákazník | F5 | Plán vs. skutečnost |

Krok 6 nic nevybírá. V kroku 7 se kliká ručně — panel se musí plnit před očima, jinak celý vzor nedává smysl. Přechody 8→9 a 12→13 mění roli a musí být zřetelné.

### S2 — Na klíč (odbočka, 3 kroky)
F3 → řádek „nebo jedna firma" → výběr Stavby Konečný → panel „Co by se změnilo" → návrat s neztracenými výběry. Pro otázku „a co když to nechci řešit sám".

### S3 — Řemeslník jako platforma (5 kroků)
Plocha Dnes → Příležitosti → Profil → Asistent → Faktury. **Pro úkolový test s řemeslníky.** Ve S1 schválně není: pro partnerské a interní publikum je to odbočka, pro řemeslníky nejsilnější obrazovka.

### S4 — Partner (4 kroky)
F2 anonymní poptávka → prázdný řádek hydroizolace → F4 objednávka s odkrytou adresou → F5 objednáno jinde. Prázdná položka se před očima zavře, ale ne ve prospěch partnera.

### S5 — Vícepráce (3 kroky)
F4 karta víceprací → schválení → přepočet 1 181 000 na 1 199 000. Pro otázku „a co když se něco najde".

---

## 7. Vizuální vrstva

První průchod se staví **rovnou v barvě**, ne v šedé. Důvod je kompoziční: plnoplošná plocha je hlavní nosný prvek a vztah základní plochy, bílých karet a tmavého pruhu je to, co drží obrazovku pohromadě. V šedé se to posoudit nedá — posuzoval bys vztah ploch, který tam není.

**Paleta je otevřená.** `kumu-design.md` popisuje Cornsilk, Glacier a Deep Atlantic; hotová vstupní obrazovka používá režnou plochu, černou a oranžovou. Dokud se to nerozhodne, platí **role, ne hodnoty** — legenda je v `kumu-tokeny-a-komponenty.md` §2. Ta je psaná tak, aby se na ni dalo naroubovat libovolné schéma.

**Není to drátěný model složený z boxů.** Co v referencích působí moderně, není barva — je to typografický rozsah, prázdné místo a asymetrie. Barva dělá pocit, struktura dělá modernost. Obojí se staví najednou.

### Co platí bez ohledu na paletu

- **Karty s peněžní částkou stojí na `planeRaised`**, ne na základní ploše. Měřeno: na sytější ploše klesá kontrast semantiky pod čitelnou hranici pro řádkové položky.
- **`over` a `under` jsou vyhrazené.** Nikde jinde než na rozpočtovém čísle se neobjeví, a naopak žádný jiný token se neobjeví na rozpočtovém čísle.
- **`accent` nese výběr, aktivní stav, průběh a metriky.** Nikdy peněžní částku.
- Semantika je v prvním průchodu plnohodnotná, takže **peak dema funguje od začátku** — částka po odškrtání pák skutečně přeskočí z `over` do `under`.

### Typografie — rozsah je to hlavní

Reference stojí na jediném kontrastu: obrovský displejový nadpis proti drobnému textu, mezi tím skoro nic. Poměr největšího k nejmenšímu je zhruba **6:1**. To je ta věc, která odlišuje moderní layout od generického.

| Úroveň | Desktop | Mobil | Váha | Proklad | Kde |
|---|---|---|---|---|---|
| Display XL | 88 px | 40 px | 800, tracking −0,03em | 0,95 | Nadpis vstupní obrazovky, „Hotovo" |
| Display | 56 px | 44 px | 800, tracking −0,02em | 1,0 | Součty v B3, částka v nabídce řemeslníka |
| Nadpis | 20 px | 18 px | 600 | 1,3 | Nadpisy bloků |
| Text | 15 px | 15 px | 400 | 1,5 | Vše ostatní |
| Popisek | 13 px | 13 px | 400 | 1,4 | Poznámky, původ ceny, štítky |

Mezi Nadpisem a Textem není nic. Jakmile přibude pátá velikost, rozsah se rozmělní a layout začne vypadat jako administrace.

### Kompozice

- **Plochy jdou od kraje ke kraji.** Žádné odsazení na úrovni stránky. Barevná plocha není zvýraznění, je to prostředí.
- **Asymetrie místo středu.** Obsah hero části sedí vlevo na zhruba 55 % šířky, zbytek je prázdný nebo ho vyplňuje jeden vizuální prvek. Nic se necentruje jen proto, že to jde.
- **Vlasové linky místo rámečků.** Obsah oddělují tenké vodorovné čáry přes celou šířku. Rámeček ze všech čtyř stran mají jen karty s čísly.
- **Velké skoky ve svislém rytmu.** Uvnitř bloku 8 a 16 px, mezi bloky 48, 72 a 96. Reference dýchá právě těmi velkými mezerami — rovnoměrné odsazení všude je nejrychlejší cesta ke generickému dojmu.
- **Jeden překryv na obrazovku.** Právě jeden prvek smí přesahovat hranici plochy nebo jiné karty. Víc jich působí neuspořádaně, žádný působí jako šablona.

### Pět konkrétních převzatých prvků

Vypsané, protože „moderní" je jinak nezadatelné.

1. **Pomlčka jako typografický prvek** — „Rekonstrukce bytu 3+1 —", „Elektroinstalace — den 8 z 10".
2. **Dvouřádková pilulková tlačítka** — drobný nadřádek, pod ním hlavní slovo tučně. U hlavních akcí, ne všude.
3. **Podtržené odkazy**, nikdy barevné.
4. **Tmavý pruh přes celou šířku.** Pozor: na vstupní obrazovce je to **produktový prvek** — ukazatel fází. Demo chrome proto nemůže být taky tmavý pruh dole. Chrome sedí jako úzký proužek nad horním pruhem Kumu, tedy vně produktu.
5. **Mikropopisky verzálkami s prostrkáním** pro metainformace — stav balíčku, štítek „odhad", původ ceny.

### Čeho se vyvarovat

Selhání není ošklivost, je to genericita. Vypadá takhle:

- Všechno ve stejně širokých kartách pod sebou
- Vycentrovaný obsah bez důvodu
- Stejná velikost pro všechny nadpisy
- Rámeček kolem každé skupiny
- **Modální dialog pro rozhodnutí** — B8 je vždy vsazený do stránky, nikdy jako okno
- Trojice ikona + titulek + popisek
- Ikony jako dekorace
- Základní plocha použitá jako zvýraznění místo jako prostředí

### Obsah

- Texty jsou skutečné. Prototyp bez obsahu netestuje nic.
- Čísla jsou skutečná, z §2. Nikde se nedopočítávají odhadem.
- Věty označené jako nezkratitelné se nepřepisují ani nezkracují.
- Obrázky jsou obdélníky s poměrem stran a popiskem.
- Ikony jsou tahové, jen funkčně. Konkrétní set se doladí později.

### Chování

- Interakce, které mění čísla, jsou funkční od prvního průchodu: páky, výběr nabídky, posun harmonogramu, schválení víceprací. Nejsou to vizuální efekty, jsou to důkazy.
- Přepínač role, fáze a scénáře sedí v úzkém proužku **nad** horním pruhem Kumu. Tmavý pruh dole patří produktu, ne demu. Chrome se skrývá, když běží scénář.
- Zákazník a partner: desktop. Řemeslník: mobil v rámečku telefonu, dotykové cíle min 44 px.

### Co se doladí až potom

Volba palety · písmo (systémové bezpatkové v těžké váze dá většinu dojmu, vlastní font přes `@import` nemám v artifactech ověřený) · ikonový set · jestli základní plocha ustoupí bílé v partnerském pohledu · tmavá varianta partnerského dashboardu · mikroanimace nad rámec přechodu barvy u pák.

---

## 8. Rozhraní pro design

**Legenda tokenů se přesunula do `kumu-tokeny-a-komponenty.md` §2.** Je psaná jako role, ne hodnoty, protože paleta zatím není rozhodnutá — a to je zároveň jediný způsob, jak zůstat vyměnitelný.

Tam je i komponentní inventář vytažený z hotové vstupní obrazovky a kontrolní seznam, kterým má projít každá další obrazovka.

**Pravidla, která platí nezávisle na paletě**

1. **Karty s peněžní částkou stojí na `planeRaised`.** Na sytější ploše klesá kontrast semantiky pod čitelnou hranici pro řádkové položky.
2. **Základní plocha ani žádný akcent se nedotknou peněžního čísla.**
3. **`over` a `under` jsou vyhrazené** pro rozpočtové číslo a nikde jinde se neobjeví.
4. **`accent` je jedna role**, ne šest — výběr, aktivní stav, průběh, metriky.
5. **Design nemění strukturu, pořadí ani nezkratitelné věty.** Může měnit vše ostatní.

---

## 9. Pořadí stavby

| # | Krok | Po něm máš |
|---|---|---|
| 0 | Legenda tokenů zapsaná do souboru, se kterým se kreslí | Obrazovky jdou přebarvit výměnou hodnot |
| 1 | Datový model + tokeny + přepínač role a fáze | Nic ukazatelného, ale drží to |
| 2 | Položkový seznam s částkami a řádek součtu ve všech stavech, pak bloky B1—B6 a B8 ve třech režimech | 70 % obsahu, staticky |
| 3 | Zákazník F1 a F2 | **Vize je čitelná. Kdyby došel čas, tohle stačí** |
| 4 | Řemeslník F3 včetně plochy a navigace | Argument o platformě |
| 5 | Partner F2 a F3 | Monetizační argument |
| 6 | Zákazník F3 s oběma taby a mechanikami | Rozhodnutí po profesích / na klíč |
| 7 | F4 a F5 napříč rolemi | Uzavřený oblouk |
| 8 | Scénáře S1—S5 | Prezentovatelné demo |
| 9 | Živý AI dialog ve F1 s demo módem | Živost |
| 10 | Volba palety, písma, ikon a partnerské plochy | Hotovo |

Když dojde čas, obětuj krok 7 dřív než 4 a 5. Bez řemeslníka a partnera demo neukáže hlavní myšlenku; bez F4 a F5 ji ukáže, jen nedovypráví.

---

## 10. Co kostra vědomě neřeší

Funkční registrace a přihlášení (odkaz je vidět, ale neklikatelný) · **všechny cílové stránky odkazů z patičky** — O nás, Jak to funguje, Pro řemeslníky, Časté dotazy, Kontakt, Nahlásit problém, obchodní podmínky, ochrana údajů, cookies · řemeslnická vstupní obrazovka · správa účtu a nastavení · platby a platební brána · prázdné stavy pro nového uživatele · chybové stavy a validace · jiný projekt než tenhle · plné větve pilulek „Zatím jen nápad" a „Mám projekt" (mění jen příklad a první otázku) · druhá větev F4 a F5 na klíč · editace ceníku a profilu řemeslníka · admin a moderace · migrace uživatelů NŘ · cenotvorba pro partnery · responzivita mimo cílové zařízení každé role · blok B7.

Uveď to v prezentaci sám, dřív než se někdo zeptá.
