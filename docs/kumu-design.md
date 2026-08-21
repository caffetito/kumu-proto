# Kumu — definice designu

**Datum:** 2026-08-21 · verze 2
**Navazuje na:** `kumu-kostra.md` §8
**Vstupy:** referenční vizuál (builder.io styl) + pojmenovaná paleta
**Implementace:** `styles/tokens.css` — názvy v §4 odpovídají doslova

> **Vyřešeno proti verzi 1.** Otázka akcentu z úvodní poznámky je rozhodnutá: paleta dostala šestou barvu. Tím padá i rozpor se vstupní obrazovkou — viz §4a.

---

## 1. Dvě reference, dvě různé věci

**První reference dává strukturu.** Barva tam nese atmosféru, ne význam: tlačítka jsou černá, text je černý, odkazy jsou černé. Žlutá je plocha stránky, zelená plocha panelu. Tohle je pro nás zásadní, protože kostra má dvě místa, kde barva význam nést **musí** — nad rozpočtem a úspora. Kdyby akce byly barevné, palety by se pobily.

**Druhá reference dává hodnoty.** Pět pojmenovaných barev s hexy. Tím padá odhadování.

| | Hex | Charakter |
|---|---|---|
| Persimmon | `E1932C` | Teplá oranžová |
| Cornsilk | `F0DF87` | Světle žlutá, měkčí a teplejší než v první referenci |
| Glacier | `A0CED9` | Světle modrá, chladná |
| Malachite | `3D9E71` | Střední zeleň |
| Deep Atlantic | `133968` | Tmavá námořní modř |

---

## 2. Zásadní zjištění: paleta je vybraná jako plochy, ne jako text

Kontrasty podle WCAG (prahy 4,5 pro běžný text, 3,0 pro velký tučný text a grafiku):

| Barva | na bílé | na Cornsilku | na Glacieru | na Deep Atlanticu |
|---|---:|---:|---:|---:|
| Persimmon | **2,50** | 1,86 | 1,47 | 4,64 |
| Cornsilk | 1,35 | — | 1,27 | 8,61 |
| Glacier | 1,70 | 1,27 | — | 6,80 |
| Malachite | **3,32** | 2,47 | 1,95 | 3,49 |
| Deep Atlantic | **11,58** | **8,61** | **6,80** | — |

**Co z toho plyne:**

- **Deep Atlantic je nosná barva.** Na bílé 11,58, na žluté 8,61. Nahrazuje černou z první reference beze zbytku a je teplejší.
- **Persimmon v původní hodnotě jako text neprojde nikde.** Na bílé 2,50 — neprojde ani jako velký tučný text.
- **Malachite jako text projde jen velký a tučný** (3,32 na bílé). Pro řádkové položky rozpočtu ne.

Semantické barvy proto potřebují ztmavené varianty. Nejmenší ztmavení, které drží odstín a dosáhne 4,5 na bílé:

| Semantika | Základ | Textová varianta | na bílé | na Cornsilku |
|---|---|---|---:|---:|
| Nad rozpočtem | Persimmon `E1932C` | **`A66918`** | 4,51 | 3,35 |
| Úspora | Malachite `3D9E71` | **`33855F`** | 4,51 | 3,35 |

Na Cornsilku obě spadnou na 3,35 — projdou jen jako velký tučný text. **Odtud pravidlo: karty s částkami stojí na bílé, ne na žluté.** Není to estetická preference, je to čitelnost.

---

## 3. Jak se tím řeší kolize zelené

Zelená je v kostře obsazená semantikou úspory, ale má být zároveň brandová plocha. Paleta to rozplétá, protože nabízí **dvě chladné plochy místo jedné**.

- **Malachite je semantika, ne plocha.** Ve ztmavené variantě `33855F` nese „úspora / pod rozpočtem".
- **Zelené plochy vznikají jako světlý nádech Malachitu** — `D4EAE0` (22 % barvy). Deep Atlantic na něm má 9,18, takže je to plnohodnotná plocha pro text. Světlostní odstup od `33855F` je obrovský, plete se to nedá.
- **Glacier `A0CED9` je druhá plocha** pro panely, které mají ustoupit — partnerský agregát, mobilní chrome, informační bloky.
- **Persimmon je semantika, ne dekorace.** Jako semantika je to jeho správné použití a celý systém zůstane uvnitř jedné palety, bez cizí červené.

Registr sedí i významově: 188 000 nad rozpočtem není chyba, je to varování. Oranžová to říká přesněji než červená.

---

## 4a. Šestá barva

Pět pojmenovaných barev je rozebraných beze zbytku: Cornsilk plocha, Glacier plocha, Malachite semantika úspory, Persimmon semantika překročení, Deep Atlantic inkoust. **Volný odstín pro pozornost v paletě nezůstal.**

Přitom ho systém potřebuje — vybraná pilulka, aktivní stav, ukazatel průběhu a metriky nejsou ani text, ani rozpočtová semantika. Paleta proto dostává šestou barvu.

**Fialová `7B3FA3`.** Fialový sektor je jediný volný; červená leží příliš blízko Persimmonu a nese význam chyby.

| | na bílé | na Cornsilku | na zeleném nádechu | na Glacieru |
|---|---:|---:|---:|---:|
| `7B3FA3` | 6,81 | 5,06 | 5,40 | **4,00** |

Bílý text na fialové má 6,81, takže výplň s bílým popiskem je v pořádku.

**Dvě omezení, která z toho plynou:**

1. **Na Glacieru jen jako grafika.** 4,00 projde grafický práh 3,0, ale ne 4,5 pro drobný text. Metriky a popisky v akcentu nepatří na `--surface-cool`.
2. **Akcent nikdy nenese význam sám.** Proti Deep Atlanticu má ΔE2000 jen 22 a při simulaci protanomálie klesá na 11. Rozdíl je hlavně v odstínu, ne ve váze — část publika ho neuvidí. Vždy doprovodit výplní, vahou nebo pozicí.

### Důsledek pro vstupní obrazovku

Na navržené vstupní obrazovce nesla oranžová šest různých rolí: hodnocení, vybranou pilulku, součty, ukazatel průběhu, obrys navrhované volby a dekorativní šipku. Po rozdělení:

| Prvek | Nově |
|---|---|
| Hodnocení, vybraná pilulka, ukazatel, navrhovaná volba | `--color-accent` |
| **Součty 450 000 a 398 000** | **`--text-primary`** |
| Šipka k poli | Odstranit, nebo `--text-primary` |

Součty musí zčernat. Karta ROZPOČET v ukázce výstupu je doslova náhled bloku B3 — kdyby náhled ukazoval barevný součet a skutečné B3 černý, publikum si toho během dvanácti minut všimne.

---

## 4. Tokeny

Názvy odpovídají `styles/tokens.css` doslova.

### Plochy

| Token | Hodnota | Použití |
|---|---|---|
| `--surface` | `F0DF87` Cornsilk | Základní plocha zákaznického a řemeslnického pohledu, plnoplošně |
| `--surface-raised` | `FFFFFF` | Karty s čísly. **Všechny peněžní částky žijí tady** |
| `--surface-green` | `D4EAE0` | Panely bez čísel: hero, „Co by se změnilo", potvrzení |
| `--surface-cool` | `A0CED9` Glacier | Partnerský agregát, mobilní chrome, informační bloky |
| `--surface-inverse` | `133968` Deep Atlantic | Demo chrome, spodní pruh |
| `--surface-over` | `E1932C` při 12 % | Podklad karty víceprací |
| `--surface-accent` | `F2EBF7` | Výplň vybrané pilulky a zaškrtnutého řádku |

### Text a linky

| Token | Hodnota | Použití |
|---|---|---|
| `--text-primary` | `133968` | Veškerý text na světlých plochách, **včetně všech peněžních částek** |
| `--text-secondary` | `133968` při 60 % | Popisky, poznámky, původ ceny |
| `--text-inverse` | `FFFFFF` | Text na Deep Atlanticu |
| `--text-disabled` | `133968` při 38 % | Nedostupné prvky |
| `--border` | `133968` při 15 % | Vlasové linky |
| `--border-strong` | `133968` | Obrys tlačítek, aktivní stav |

### Akce a stavy

| Token | Hodnota | Použití |
|---|---|---|
| `--action-primary` | `133968` / bílý text | Hlavní akce, pilulka |
| `--action-secondary` | průhledná / obrys `133968` | Vedlejší akce |
| `--color-accent` | `7B3FA3` | Výběr, aktivní stav, průběh, metriky |
| `--color-accent-fg` | `FFFFFF` | Text na akcentu |
| `--focus` | `133968`, 2 px offset | Klávesová navigace |

### Semantika rozpočtu — vyhrazená

| Token | Hodnota | Použití |
|---|---|---|
| `--color-over` | `A66918` | Nad rozpočtem |
| `--color-under` | `33855F` | Úspora, pod rozpočtem |
| `--graphic-over` | `E1932C` | Přetečení v ukazateli — grafika, ne text |
| `--graphic-under` | `3D9E71` | Segmenty harmonogramu — grafika, ne text |
| `--graphic-track` | `133968` | Pruh ukazatele = strop |

**Persimmon a Malachite v plné sytosti** se používají jen jako plochy a grafické prvky, nikdy jako text.

### Pravidla, která design nesmí porušit

1. **Karty s peněžní částkou stojí na `--surface-raised`.** Na Cornsilku semantika spadne na 3,35 a řádkové položky přestanou být čitelné.
2. **Cornsilk, Glacier ani zelený nádech se nikdy nedotknou čísla.** Jsou to plochy.
3. **`--color-accent` se nikdy neobjeví na peněžní částce.** V kartě s částkou nese barvu výhradně semantika; jinak je částka v `--text-primary`.
4. **`--color-over` a `--color-under` se neobjeví nikde mimo rozpočtové číslo.**
5. **Akcent nikdy nenese význam sám** — vždy s výplní, vahou nebo pozicí. Na `--surface-cool` jen jako grafika.
6. **Struktura, pořadí a nezkratitelné věty z kostry zůstávají.**

---

## 5. Typografie

Z první reference: jediný kontrast, obrovský displejový nadpis proti drobnému textu, mezi tím skoro nic.

| Úroveň | Použití |
|---|---|
| Display XL | Vstupní nadpis, „Done" |
| Display | Součty v B3, částka v nabídce řemeslníka |
| Nadpis | Nadpisy bloků |
| Text | Vše ostatní |
| Popisek | Poznámky, původ ceny, štítky — `--text-secondary` |

Konkrétní velikosti v px jsou v `kumu-kostra.md` §7 a v `tokens.css` §6. Těžká váha a záporný letter-spacing jen na úrovni Display. Čísla vždy tabulární.

> Vlastní písmo přes `@import` nemám ověřené. Systémové bezpatkové v těžké váze s těsným prokladem dá většinu dojmu z reference. Zkoušej to až ve chvíli, kdy vše ostatní stojí.

---

## 6. Tvarosloví

- **Tlačítka:** pilulka, plný rádius. Hlavní `--action-primary`, vedlejší jen obrys.
- **Oddělovače:** vlasová linka přes celou šířku obsahu, ne rámečky kolem všeho.
- **Karty s čísly:** bílá plocha, tenký obrys, mírný rádius, bez stínu.
- **Ikony:** tahové, nikdy výplňové, jen funkčně.
- **Fotky:** obdélníky s poměrem stran, v demu placeholdery.

---

## 7. Mapování na role

| Role | Základní plocha | Chladná plocha | Poznámka |
|---|---|---|---|
| **Zákazník** | Cornsilk plnoplošně | zelený nádech na hero a v panelu „Co by se změnilo" | Nejblíž první referenci. Vstupní obrazovka je jediné místo, kde se displejová typografie rozjede naplno |
| **Řemeslník** | Cornsilk | Glacier v horním pruhu a spodní navigaci | Mobil se čte jako aplikace, ne jako stránka. Karty bílé, plochy mezi nimi žluté |
| **Partner** | **bílá**, Cornsilk jen v chrome | Glacier na agregátním panelu | Hustá datová tabulka na plnoplošné žluté je pro obchodního manažera SG únavná. Glacier navíc vizuálně odděluje agregát od konkrétního projektu `[k potvrzení]` |

**Demo chrome patří na Deep Atlantic.** V první referenci je černý pruh rámem kolem produktu. U nás nese přepínač role, fáze a scénářů — tmavá modř ho jednoznačně odděluje od produktu. Když běží scénář, pruh se skryje.

---

## 8. Citlivá místa v kostře

**B3 rozpočet** — bílá karta na Cornsilku. Součet a strop v Display velikosti, oba v `--text-primary`. Rozdíl `+188 000` v `--color-over`. Ukazatel: pruh `--graphic-track` = strop, `--graphic-over` = přetečení.

**B8 páky** — bílá karta. Úspory v `--color-under`. Zaškrtnutý řádek dostává `--surface-accent`, samotné částky zůstávají v semantice. Po zaškrtnutí všech tří se řádek Rozdíl mění na Rezerva a přebarví z `--color-over` na `--color-under`. Přechod do 200 ms. **Peak dema a jediné místo, kde se barva mění před očima.**

**B8 varianty (jak poptáme)** — dvě cesty na bílé. Rozsah na klíč je číslo od—do v `--text-primary`. Nic tu není v `over` ani `under`, protože se ještě nic nerozhodlo. Vybraná cesta nese `--color-accent` na obrysu, ne na číslech. Rozdíl mezi cestami nese struktura, ne barva.

**Vícepráce F4** — karta na `--surface-over`, částka `+18 000` v `--color-over`. Po schválení plocha zbělá a částka se překlopí do celkové sumy.

**Vyúčtování F5** — bílá karta. Kladné položky `--color-over`, záporné `--color-under`, ale **řádek Rozdíl zůstává v `--text-primary`**. Čtyři tisíce na projektu za 1,2 milionu není překročení, je to přesnost.

**Nabídka řemeslníka** — bílá karta, částka v Display velikosti a v `--text-primary`, editovatelná. Věta o původu ceny přímo pod ní v `--text-secondary`. Nikde akcent, nikde semantická barva — je to jeho cena, ne hodnocení.

---

## 9. Otevřené

1. **Ustoupí Cornsilk v partnerském pohledu?** §7.
2. **Který Cornsilk.** První reference má ostřejší, zelenější žluť než `F0DF87`. Rozdíl je znát na velké ploše. Až se změní, přepočítat kontrasty `--color-over`, `--color-under` a `--color-accent` proti nové ploše — dnes 3,35 / 3,35 / 5,06.
3. **Písmo** — zkusit vlastní, nebo zůstat u systémového.
4. **Sedí Persimmon jako registr varování** místo chyby?
5. **Tmavá varianta partnerského dashboardu** — s Deep Atlanticem jako plochou by dávala smysl, ale je to samostatná práce mimo scope kostry.
