# Kumu — definice designu

> **Rozpor s vstupní obrazovkou — přečti první.**
> Navržená vstupní obrazovka (varianta 2a) používá jinou paletu, než popisuje tenhle dokument: teplou režnou plochu (Bone), černou a pálenou oranžovou. Cornsilk, Malachite ani Deep Atlantic v ní nejsou.
>
> Dokud se to nerozhodne, platí jako závazné **rozvržení a tvarosloví**, ne hodnoty. Měřené kontrasty v §2 zůstávají platné jako metoda, ne jako výsledek — po volbě palety je potřeba je přepočítat.
>
> **Kritické k rozhodnutí:** na vstupní obrazovce nese oranžová všechny důležité částky (450 000 Kč, 398 000 Kč), hodnocení, vybranou pilulku i ukazatel. V kostře přitom barevná číslice znamená právě jednu věc — nad nebo pod rozpočtem. Když oranžová obarví každý součet, blok B3 nemá čím rozlišit překročení. Tři cesty:
> 1. Oranžová je akcent na všech součtech; semantika dostane jiný pár barev, dost vzdálený od oranžové.
> 2. Oranžová je vyhrazená semantice a pozornosti; součty na vstupní obrazovce zčernají.
> 3. Oranžová znamená „číslo, na kterém záleží"; nad a pod rozpočtem se odliší ukazatelem a slovy, ne odstínem. Nejlevnější na sladění, nejslabší peak.

**Datum:** 2026-08-21
**Navazuje na:** `kumu-kostra.md` §8
**Vstupy:** referenční vizuál (builder.io styl) + pojmenovaná paleta
**Nahrazuje:** `kumu-design.md` — ten pracoval s odhadnutými hodnotami, tenhle se skutečnými

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

Než se rozdají role, je potřeba změřit kontrasty. Spočítal jsem je podle WCAG (prahy 4,5 pro běžný text, 3,0 pro velký tučný text a grafiku):

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

Semantické barvy proto potřebují ztmavené varianty. Spočítal jsem nejmenší ztmavení, které drží odstín a dosáhne 4,5 na bílé:

| Semantika | Základ | Textová varianta | na bílé | na Cornsilku |
|---|---|---|---:|---:|
| Nad rozpočtem | Persimmon `E1932C` | **`A66918`** | 4,51 | 3,35 |
| Úspora | Malachite `3D9E71` | **`33855F`** | 4,51 | 3,35 |

Na Cornsilku obě spadnou na 3,35 — projdou jen jako velký tučný text. **Odtud pravidlo: karty s částkami stojí na bílé, ne na žluté.** Není to estetická preference, je to čitelnost.

---

## 3. Jak se tím řeší kolize zelené

V předchozí verzi byl problém: zelená je v kostře obsazená semantikou úspory, ale má být zároveň brandová plocha. Tahle paleta to rozplétá, protože nabízí **dvě chladné plochy místo jedné**.

Rozdělení:

- **Malachite je semantika, ne plocha.** Ve ztmavené variantě `33855F` nese „úspora / pod rozpočtem".
- **Zelené plochy vznikají jako světlý nádech Malachitu** — `D4EAE0` (22 % barvy). Deep Atlantic na něm má 9,18, takže je to plnohodnotná plocha pro text. Světlostní odstup od `33855F` je obrovský, plete se to nedá.
- **Glacier `A0CED9` je druhá plocha** pro panely, které mají ustoupit — partnerský agregát, mobilní chrome, informační bloky.
- **Persimmon je semantika, ne akcent.** Dřív jsem varoval, že oranžová blízko čísel je nebezpečná. To platilo, dokud byla dekorativní. Jako semantika je to její správné použití — a má výhodu, že celý systém zůstane uvnitř jedné palety, bez cizí červené.

Registr sedí i významově: 188 000 nad rozpočtem není chyba, je to varování. Oranžová to říká přesněji než červená.

---

## 4. Tokeny

| Token | Hodnota | Použití |
|---|---|---|
| `surface` | `F0DF87` Cornsilk | Základní plocha zákaznického a řemeslnického pohledu, plnoplošně |
| `surfaceRaised` | `FFFFFF` | Karty s čísly. **Všechny peněžní částky žijí tady** |
| `surfaceGreen` | `D4EAE0` | Panely bez čísel: hero, „Co by se změnilo", potvrzení |
| `surfaceCool` | `A0CED9` Glacier | Partnerský agregát, mobilní chrome, informační bloky |
| `surfaceInverse` | `133968` Deep Atlantic | Demo chrome, spodní pruh |
| `border` | `133968` při 15 % | Vlasové linky |
| `borderStrong` | `133968` | Obrys tlačítek, aktivní stav |
| `textPrimary` | `133968` | Veškerý text na světlých plochách |
| `textSecondary` | `133968` při 60 % | Popisky, poznámky, původ ceny |
| `textInverse` | `FFFFFF` | Text na Deep Atlanticu |
| `actionPrimary` | `133968` / bílý text | Hlavní akce, pilulka |
| `actionSecondary` | průhledná / obrys `133968` | Vedlejší akce |
| `accent` | `133968` | Výběr, aktivní stav. **Není to hue** |
| `over` | `A66918` | Nad rozpočtem |
| `under` | `33855F` | Úspora, pod rozpočtem |
| `overSurface` | `E1932C` při 12 % | Podklad karty víceprací |
| `focus` | `133968`, 2 px offset | Klávesová navigace |

**Persimmon a Malachite v plné sytosti** se používají jen jako plochy a grafické prvky (ukazatel rozpočtu, segmenty harmonogramu), nikdy jako text.

### Pravidla, která design nesmí porušit

1. **Karty s peněžní částkou stojí na bílé.** Na Cornsilku semantika spadne na 3,35 a řádkové položky přestanou být čitelné.
2. **Cornsilk, Glacier ani zelený nádech se nikdy nedotknou čísla.** Jsou to plochy.
3. **`accent` není hue, je to Deep Atlantic.** V kartě s částkou nese barvu výhradně semantika.
4. **Persimmon je vyhrazený pro „nad rozpočtem".** Nikde jinde dekorativně.
5. **Struktura, pořadí a nezkratitelné věty z kostry zůstávají.**

---

## 5. Typografie

Z první reference: jediný kontrast, obrovský displejový nadpis proti drobnému textu, mezi tím skoro nic.

| Úroveň | Použití |
|---|---|
| Display | „Co chcete udělat?", „Hotovo", součty v B3, částka v nabídce řemeslníka |
| Nadpis | Nadpisy bloků |
| Text | Vše ostatní |
| Popisek | Poznámky, původ ceny, štítky — `textSecondary` |

Těžká váha a záporný letter-spacing jen na úrovni Display. Čísla vždy tabulární.

> Vlastní písmo přes `@import` v artifactech nemám ověřené. Systémové bezpatkové v těžké váze s těsným prokladem dá většinu dojmu z reference. Zkoušej to až ve chvíli, kdy vše ostatní stojí.

---

## 6. Tvarosloví

- **Tlačítka:** pilulka, plný rádius. Hlavní `actionPrimary`, vedlejší jen obrys.
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

**Demo chrome patří na Deep Atlantic.** V první referenci je černý pruh rámem kolem produktu. U nás nese přepínač role, fáze a scénáře — tmavá modř ho jednoznačně odděluje od produktu. Když běží scénář, pruh se skryje.

---

## 8. Citlivá místa v kostře

**B3 rozpočet** — bílá karta na Cornsilku. Součet a strop v Display velikosti. Rozdíl `+188 000` v `over`. Ukazatel: pruh Deep Atlantic = strop, Persimmon v plné sytosti = přetečení (grafika, ne text, takže plná sytost je v pořádku).

**B8 páky** — bílá karta. Úspory v `under`. Po zaškrtnutí všech tří se řádek Rozdíl mění na Rezerva a přebarví z `over` na `under`. Přechod do 200 ms. **Peak dema a jediné místo, kde se barva mění před očima.**

**B8 varianty (jak poptáme)** — dvě cesty na bílé. Rozsah na klíč je číslo od—do. Nic tu není v `over` ani `under`, protože se ještě nic nerozhodlo. Rozdíl mezi cestami nese struktura, ne barva.

**Vícepráce F4** — karta na `overSurface`, částka `+18 000` v `over`. Po schválení plocha zbělá a částka se překlopí do celkové sumy.

**Vyúčtování F5** — bílá karta. Kladné položky `over`, záporné `under`, ale **řádek Rozdíl zůstává v `textPrimary`**. Čtyři tisíce na projektu za 1,2 milionu není překročení, je to přesnost.

**Nabídka řemeslníka** — bílá karta, částka v Display velikosti, editovatelná. Věta o původu ceny přímo pod ní v `textSecondary`. Nikde `accent`, nikde semantická barva — je to jeho cena, ne hodnocení.

---

## 9. Otevřené

1. **Ustoupí Cornsilk v partnerském pohledu?** §7.
2. **Persimmon jako „nad rozpočtem"** — sedí registr varování místo chyby?
3. **Který Cornsilk.** První reference má ostřejší, zelenější žluť než `F0DF87`. Rozdíl je znát na velké ploše.
4. **Písmo** — zkusit vlastní, nebo zůstat u systémového.
5. **Tmavá varianta partnerského dashboardu** — s Deep Atlanticem jako plochou by dávala smysl, ale je to samostatná práce mimo scope kostry.
