# Kumu — tokeny a komponenty

**Datum:** 2026-08-21
**Vstup:** hotová vstupní obrazovka, varianta 3a
**K čemu to je:** aby se na hotové obrazovky dalo naroubovat libovolné barevné schéma

---

## 1. Proč nekreslit další obrazovky hned

Vstupní obrazovka je **jediná obrazovka v celém produktu bez rozpočtové semantiky**. Nemá „nad rozpočtem" ani „úsporu", takže barva na ní může dělat cokoli a nic to nerozbije.

To je past. Když se ve stejném duchu nakreslí F2, kolize se objeví až tam — a to už bude šest obrazovek postavených na pravidlech, která neplatí.

Na téhle obrazovce dělá oranžová **šest různých prací**:

| # | Kde | Jakou roli hraje |
|---|---|---|
| 1 | Hodnocení 4,9 | Metrika, na kterou se má koukat |
| 2 | Vybraná pilulka „Zatím jen nápad" | Stav výběru |
| 3 | Celkem 450 000 Kč · 398 000 Kč | Hlavní číslo |
| 4 | Ukazatel 72 % | Průběh |
| 5 | Obrys tlačítka „Vyměnit" | Navrhovaná volba |
| 6 | Šipka k poli | Dekorace |

Šest rolí, jedna barva. Žádné schéma se na to nedá vyměnit, protože při výměně se musí vědět, **co která barva znamená**, ne kde je použitá. Dokud je to šest významů v jednom odstínu, je výměna schématu ruční překreslení.

Rolí má být nejvýš **pět** a každá potřebuje vlastní token. To je celá odpověď na „aby se dalo naroubovat cokoli".

---

## 2. Legenda tokenů

Role, ne barvy. Hodnoty se dosadí až podle schématu; pravidla platí pro všechna.

### Plochy

| Token | Role | Na vstupní obrazovce |
|---|---|---|
| `plane` | Základní plocha, plnoplošně | Režná (Bone) |
| `planeRaised` | Karty s obsahem a s čísly | Bílá |
| `planeMuted` | Ustupující pásmo | Sekce ukázky výstupu |
| `planeInverse` | Rám kolem produktu | Černý fázový pruh |

### Linky a text

| Token | Role |
|---|---|
| `line` | Vlasové oddělovače |
| `lineStrong` | Obrys karet, aktivní stav |
| `ink` | Veškerý text a **všechna čísla** |
| `inkMuted` | Popisky, poznámky, mikropopisky verzálkami |
| `inkInverse` | Text na `planeInverse` |

### Akce a stavy

| Token | Role | Na vstupní obrazovce |
|---|---|---|
| `action` | Hlavní akce | Černá pilulka „Začít" |
| `actionQuiet` | Vedlejší akce | Obrys „Zachovat" |
| `accent` | **Výběr, aktivní stav, průběh, metriky** | Vybraná pilulka, hodnocení, ukazatel 72 % |
| `focus` | Klávesová navigace | — |

### Semantika — vyhrazená

| Token | Role | Kde se objeví |
|---|---|---|
| `over` | Nad rozpočtem | B3, B8, vyúčtování, vícepráce |
| `under` | Úspora, pod rozpočtem | B3, B8, vyúčtování |

**Semantika je nedotknutelná.** Nikde jinde než na rozpočtovém čísle se `over` ani `under` neobjeví, a naopak žádný jiný token se nesmí objevit na rozpočtovém čísle.

---

## 3. Tři rozhodnutí, která to vynucuje

### a) Hlavní číslo přestane být oranžové

Na téhle obrazovce jsou 450 000 Kč a 398 000 Kč oranžové. V produktu je barevné číslo vyhrazené pro nad/pod rozpočtem — a karta ROZPOČET v ukázce výstupu je doslova náhled bloku B3. Kdyby náhled ukazoval oranžový součet a skutečné B3 černý, publikum to v dvanáctiminutové prezentaci uvidí.

Dvě cesty:

1. **Číslo je `ink`.** Součty zčernají, oranžová zůstane na hodnocení, výběru a průběhu. Marketingová obrazovka ztratí trochu důrazu, produkt zůstane soudržný.
2. **Marketing a aplikace jsou dvě sady pravidel.** Legitimní — landing pages se běžně liší. Cena je, že náhled bloku vypadá jinak než blok.

Rozhodnutí nedávám, ale cesta 2 je udržitelná jen tehdy, když v ukázce výstupu nebudou náhledy skutečných bloků.

### b) Šipka je dekorace

Konfliktní hned dvakrát: nese `accent` bez toho, aby něco znamenala, a porušuje pravidlo „žádná dekorace, ikony jen funkčně". Na vstupní obrazovce funguje. Ve zbytku produktu takový prvek nebude, takže je to jednorázová výjimka — a ta se má napsat, ne nechat, aby se rozšířila.

### c) Krok 03 patří do konceptu

*„Ověření řemeslníci vidí konkrétní projekt, ne obecnou poptávku. Proto jsou jejich ceny srovnatelné."*

To je zákaznická formulace jádra konceptu a je lepší než cokoli v `kumu-prototyp-zadani.md`. Patří do copy decku a stojí za to ji použít i v prezentaci.

---

## 4. Komponentní inventář

Vstupní obrazovka už obsahuje většinu systému. Než vzniknou další obrazovky, tohle se vytáhne jako komponenty — jinak se každá obrazovka nakreslí znovu a stejný prvek bude pokaždé jiný.

| # | Komponenta | Stavy | Kde se ještě objeví |
|---|---|---|---|
| 1 | Horní pruh | — | Všechny zákaznické a partnerské obrazovky |
| 2 | Vlasový oddělovač | — | Všude |
| 3 | Displejový nadpis | — | F1, F5 „Hotovo" |
| 4 | Dvojice metrik | — | Partnerský agregát |
| 5 | Orámovaná karta se zápatím | — | Pole na vstupu, karty s akcí |
| 6 | Pilulka | vybraná / nevybraná | Fáze zralosti, filtry, taby |
| 7 | Pilulkové tlačítko | hlavní / obrysové / dvouřádkové | Všude |
| 8 | Plovoucí bílá karta | — | Bloky B1—B8 |
| 9 | Mikropopisek verzálkami | — | Hlavičky karet, štítky, stavy |
| 10 | Položkový seznam s částkami | — | **B3, panel Váš tým, vyúčtování, materiál** |
| 11 | Řádek součtu | neutrální / nad / pod | **B3, panel, vyúčtování** |
| 12 | Ukazatel průběhu | — | 72 %, ukazatel rozpočtu proti stropu |
| 13 | Rám telefonu | — | Řemeslnický pohled |
| 14 | Číslovaný krok | — | Vysvětlení, harmonogram |
| 15 | Fázový pruh | — | Všechny obrazovky |
| 16 | Patička | — | Všechny zákaznické obrazovky |

Komponenty **10 a 11 jsou nejdůležitější v celém produktu.** Objevují se v B3, v panelu Váš tým, ve vyúčtování a v partnerské tabulce, a jsou to jediná místa, kde barva něco znamená. Vyplatí se je nakreslit dřív než jakoukoli další obrazovku, ve všech třech stavech součtu.

Chybí a vzniknou až dál: slot týmu, karta kandidáta s hodnocením, vodorovná časová osa, spodní navigace mobilu, konverzační bublina.

---

## 5. Co dál — pořadí

| # | Krok | Proč teď |
|---|---|---|
| 1 | **Legenda tokenů z §2 zapsaná do souboru**, se kterým se kreslí | Bez ní je každá další obrazovka další ruční překreslení při změně schématu |
| 2 | **Komponenty 10 a 11 ve všech stavech** | Nesou jediné významové použití barvy v produktu |
| 3 | **F2 zákazník** — B3, páky, B8 varianty | Peak dema. Zároveň první obrazovka, kde se semantika objeví, takže potvrdí nebo vyvrátí legendu |
| 4 | **F3 zákazník** — skládání týmu | Nejsložitější interakce. Do statické obrazovky se vejde jen výchozí a zaplněný stav |
| 5 | **Řemeslník F3** — plocha a nabídka | Mobil, jiný layout, ověří komponenty na užší ploše |
| 6 | **Partner F2** | Hustá tabulka, ověří `planeMuted` a agregát |
| 7 | Zbytek F4 a F5 | Kulisa, nejnižší detail |

**F2 je ta obrazovka, která rozhodne.** Pokud se legenda tokenů udrží na obrazovce, kde současně existuje součet, strop, rozdíl nad rozpočtem, tři úspory a přepočet — udrží se všude. Pokud se rozsype, je lepší to zjistit na druhé obrazovce než na sedmé.

---

## 6. Pravidlo pro každou další obrazovku

Než obrazovka odejde jako hotová, projít:

- [ ] Každá barevná plocha, text i linka odpovídá právě jednomu tokenu z §2
- [ ] `accent` se neobjevuje na žádném peněžním čísle
- [ ] `over` a `under` se neobjevují nikde mimo rozpočtové číslo
- [ ] Žádná barva, která na obrazovce něco *neznamená* — kromě zapsané výjimky se šipkou
- [ ] Prvek, který už v inventáři §4 je, se nekreslí znovu jinak
- [ ] Typografie používá jen pět úrovní z `kumu-kostra.md` §7
- [ ] Karta s peněžní částkou stojí na `planeRaised`, ne na `plane`
