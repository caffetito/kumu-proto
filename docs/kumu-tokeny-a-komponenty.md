# Kumu — tokeny a komponenty

**Datum:** 2026-08-21 · verze 2
**Vstup:** hotová vstupní obrazovka, varianta 3a
**K čemu to je:** aby se na hotové obrazovky dalo naroubovat libovolné barevné schéma

> **Změna proti verzi 1.** Legenda v §2 používala vlastní názvosloví `plane/ink`. Sjednoceno na `surface/text/action` podle `styles/tokens.css` a `kumu-design.md` §4. Otázka akcentu z §3a je rozhodnutá — paleta dostala šestou barvu, viz `kumu-design.md` §4a.

---

## 1. Proč nekreslit další obrazovky hned

Vstupní obrazovka je **jediná obrazovka v celém produktu bez rozpočtové semantiky**. Nemá „nad rozpočtem" ani „úsporu", takže barva na ní může dělat cokoli a nic to nerozbije.

To je past. Když se ve stejném duchu nakreslí F2, kolize se objeví až tam — a to už bude šest obrazovek postavených na pravidlech, která neplatí.

Na téhle obrazovce dělá oranžová **šest různých prací**:

| # | Kde | Jakou roli hraje | Nově |
|---|---|---|---|
| 1 | Hodnocení 4,9 | Metrika, na kterou se má koukat | `--color-accent` |
| 2 | Vybraná pilulka „Zatím jen nápad" | Stav výběru | `--color-accent` |
| 3 | Celkem 450 000 Kč · 398 000 Kč | Hlavní číslo | **`--text-primary`** |
| 4 | Ukazatel 72 % | Průběh | `--color-accent` |
| 5 | Obrys tlačítka „Vyměnit" | Navrhovaná volba | `--color-accent` |
| 6 | Šipka k poli | Dekorace | Odstranit, nebo `--text-primary` |

Šest rolí, jedna barva. Žádné schéma se na to nedá vyměnit, protože při výměně se musí vědět, **co která barva znamená**, ne kde je použitá.

Rolí má být nejvýš pět a každá má vlastní token. To je celá odpověď na „aby se dalo naroubovat cokoli".

---

## 2. Legenda tokenů

Role, ne barvy. Hodnoty jsou v `kumu-design.md` §4 a v `styles/tokens.css`; pravidla platí pro všechna schémata.

### Plochy

| Token | Role | Na vstupní obrazovce |
|---|---|---|
| `--surface` | Základní plocha, plnoplošně | Cornsilk |
| `--surface-raised` | Karty s obsahem a s čísly | Bílá |
| `--surface-green` | Panely bez čísel | Hero, „Co by se změnilo" |
| `--surface-cool` | Ustupující pásmo | Sekce ukázky výstupu, partnerský agregát |
| `--surface-inverse` | Rám kolem produktu | Fázový pruh |
| `--surface-over` | Podklad karty víceprací | — |
| `--surface-accent` | Výplň vybraného stavu | Vybraná pilulka |

### Linky a text

| Token | Role |
|---|---|
| `--border` | Vlasové oddělovače |
| `--border-strong` | Obrys karet, aktivní stav |
| `--text-primary` | Veškerý text a **všechna peněžní čísla** |
| `--text-secondary` | Popisky, poznámky, mikropopisky verzálkami |
| `--text-inverse` | Text na `--surface-inverse` |
| `--text-disabled` | Nedostupné prvky |

### Akce a stavy

| Token | Role | Na vstupní obrazovce |
|---|---|---|
| `--action-primary` | Hlavní akce | Pilulka „Začít" |
| `--action-secondary` | Vedlejší akce | Obrys „Zachovat" |
| `--color-accent` | **Výběr, aktivní stav, průběh, metriky** | Vybraná pilulka, hodnocení, ukazatel 72 % |
| `--color-accent-fg` | Text na akcentu | — |
| `--focus` | Klávesová navigace | — |

### Semantika — vyhrazená

| Token | Role | Kde se objeví |
|---|---|---|
| `--color-over` | Nad rozpočtem | B3, B8, vyúčtování, vícepráce |
| `--color-under` | Úspora, pod rozpočtem | B3, B8, vyúčtování |
| `--graphic-over` · `--graphic-under` · `--graphic-track` | Ukazatele a segmenty — grafika, nikdy text | B3, harmonogram |

**Semantika je nedotknutelná.** Nikde jinde než na rozpočtovém čísle se `--color-over` ani `--color-under` neobjeví, a naopak žádný jiný token se nesmí objevit na rozpočtovém čísle.

---

## 3. Tři rozhodnutí, která to vynucuje

### a) Hlavní číslo přestane být barevné — VYŘEŠENO

Na vstupní obrazovce jsou 450 000 Kč a 398 000 Kč oranžové. V produktu je barevné číslo vyhrazené pro nad a pod rozpočtem — a karta ROZPOČET v ukázce výstupu je doslova náhled bloku B3. Kdyby náhled ukazoval barevný součet a skutečné B3 černý, publikum to v dvanáctiminutové prezentaci uvidí.

**Rozhodnuto: součty jdou na `--text-primary`.** Akcent zůstává na hodnocení, výběru a průběhu — a je to nově vlastní odstín, ne oranžová.

### b) Šipka je dekorace

Konfliktní hned dvakrát: nese barvu bez toho, aby něco znamenala, a porušuje pravidlo „žádná dekorace, ikony jen funkčně". Na vstupní obrazovce funguje. Ve zbytku produktu takový prvek nebude, takže je to jednorázová výjimka — a ta se má napsat, ne nechat, aby se rozšířila.

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
| 3 | Displejový nadpis | — | F1, F5 „Done" |
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

Komponenty **10 a 11 jsou nejdůležitější v celém produktu.** Objevují se v B3, v panelu Váš tým, ve vyúčtování a v partnerské tabulce, a jsou to jediná místa, kde barva něco znamená. Vyplatí se je postavit dřív než jakoukoli další obrazovku, ve všech třech stavech součtu. Rozměry jsou v `tokens.css` §10.

Chybí a vzniknou až dál: slot týmu, karta kandidáta s hodnocením, vodorovná časová osa, spodní navigace mobilu, konverzační bublina.

---

## 5. Co dál — pořadí

Pořadí stavby řídí `kumu-kostra.md` §9. Tenhle seznam je jeho designová strana.

| # | Krok | Proč teď |
|---|---|---|
| 1 | **Legenda z §2 v `tokens.css`** | Hotovo |
| 2 | **Komponenty 10 a 11 ve všech stavech** | Nesou jediné významové použití barvy v produktu |
| 3 | **F2 zákazník** — B3, páky, B8 varianty | Peak dema. Zároveň první obrazovka, kde se semantika objeví, takže potvrdí nebo vyvrátí legendu |
| 4 | **Řemeslník F3** — plocha a nabídka | Mobil, jiný layout, ověří komponenty na užší ploše |
| 5 | **Zákazník F3** — skládání týmu | Nejsložitější interakce |
| 6 | **Partner F2** | Hustá tabulka, ověří `--surface-cool` a agregát |
| 7 | Zbytek F4 a F5 | Kulisa, nejnižší detail |

> Pořadí kroků 4 a 5 je proti verzi 1 prohozené, aby sedělo s `kumu-kostra.md` §9. Kostra staví řemeslníka dřív, protože bez něj demo neukáže hlavní myšlenku.

**F2 je ta obrazovka, která rozhodne.** Pokud se legenda udrží tam, kde současně existuje součet, strop, rozdíl nad rozpočtem, tři úspory a přepočet — udrží se všude. Pokud se rozsype, je lepší to zjistit na druhé obrazovce než na sedmé.

---

## 6. Pravidlo pro každou další obrazovku

Než obrazovka odejde jako hotová, projít:

- [ ] Každá barevná plocha, text i linka odpovídá právě jednomu tokenu z §2
- [ ] `--color-accent` se neobjevuje na žádném peněžním čísle
- [ ] `--color-over` a `--color-under` se neobjevují nikde mimo rozpočtové číslo
- [ ] Akcent nikde nenese význam sám — vždy s výplní, vahou nebo pozicí
- [ ] Na `--surface-cool` není akcent jako drobný text, jen jako grafika
- [ ] Žádná barva, která na obrazovce něco *neznamená* — kromě zapsané výjimky se šipkou
- [ ] Prvek, který už v inventáři §4 je, se nekreslí znovu jinak
- [ ] Typografie používá jen pět úrovní z `kumu-kostra.md` §7
- [ ] Karta s peněžní částkou stojí na `--surface-raised`, ne na `--surface`
- [ ] Význam nikde nenese barva sama — kontrola černobílým tiskem
