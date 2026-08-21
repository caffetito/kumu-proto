# Kumu — prototyp

Vizionářské demo pro interní buy-in a pitch partnerům. **Není to produkt.** Cílem je, aby dvanáctiminutová prezentace ukázala jeden projekt ze tří pohledů a aby čísla na obrazovce reagovala na kliknutí.

Dokumentace je česky, **produktové texty anglicky**.

---

## Zdroje pravdy

@docs/kumu-kostra.md
@docs/kumu-design.md
@docs/kumu-copy-en.md
@docs/kumu-tokeny-a-komponenty.md

Když si dokumenty odporují, platí pořadí: copy → kostra → design → tokeny a komponenty. Rozpor nahlas, neřeš ho tiše.

---

## Nepřekročitelná pravidla

**Barva něco znamená, nebo tam není.**
- `--color-over` a `--color-under` výhradně na rozpočtovém čísle. Nikde jinde.
- `--color-accent` na výběru, aktivním stavu, průběhu a metrikách. **Nikdy na peněžní částce.**
- Akcent nikdy nenese význam sám — vždy s výplní, vahou nebo pozicí. Odstín samotný není pro část publika odlišitelný od textu.
- Karta s peněžní částkou stojí na `--surface-raised`, ne na `--surface`.
- Persimmon a Malachite v plné sytosti jen jako grafika, nikdy jako text.

**Žádná hodnota napevno.** Každá barva, velikost písma a odsazení jde přes token ze `styles/tokens.css`. Když token chybí, přidej ho tam a nahlas to — nedopisuj hodnotu do komponenty.

**Čísla pocházejí z jednoho místa.** Všechna čísla jsou v `kumu-kostra.md` §2 a jsou vnitřně provázaná napříč fázemi. Nikdy nedopočítávej odhadem, nikdy si nevymýšlej nové. Součet pěti vybraných nabídek ve F3 musí dát přesně 564 000 — když se změní jedna, dorovnej ostatní.

**Nezkratitelné věty se nepřepisují ani nezkracují.** V `kumu-copy-en.md` jsou označené tučně. Ani o slovo.

**AI negeneruje layout.** Asistent plní jeden z osmi bloků B1—B8 z kostry §3. Kdyby bylo potřeba devátý blok, je to signál, že koncept opakovatelných bloků nesedí — nahlas to, nepřidávej ho.

**Nic, co nebylo získáno, se nezobrazuje jako fakt.** Ve F2 neexistuje oslovená firma, takže tam nejsou jména ani konkrétní ceny na klíč, jen rozsah. Identita zákazníka se partnerovi odkrývá až ve F4.

**Věta o původu ceny u řemeslníka** nesmí naznačit, že cenu určila platforma. Nikde se nesmí objevit `recommended price`, `market rate` ani `competitive bid`.

---

## Terminologie

| V produktu (EN) | Nikdy |
|---|---|
| `trade`, `the trades` | `craftsman`, `contractor` |
| `One firm, whole job` | `turnkey` |
| `bid` | `offer`, `quote` |

Formát částek: `1,388,000 CZK`. V tabulkách a součtech s měnou, v souvislém textu bez ní.

Britský pravopis. Druhá osoba, přímo. Žádné vykřičníky. Tlačítka pojmenovávají výsledek, ne akci.

---

## Stav

Fáze (F1—F5) a role (zákazník / řemeslník / partner) jsou **dvě nezávislé osy globálního stavu**. Každá kombinace má definovaný obsah — žádná buňka není prázdná obrazovka. Když se role projektu v dané fázi netýká, je to samo o sobě informace a musí být vidět.

Interakce, které mění čísla, jsou funkční od prvního průchodu: páky, výběr nabídky, posun harmonogramu, schválení víceprací. **Nejsou to efekty, jsou to důkazy.** Nikdy je nepředstírej statickým obrázkem.

Demo chrome (přepínač role, fáze, scénáře) sedí v úzkém proužku **nad** horním pruhem Kumu, na `--surface-inverse`. Tmavý pruh dole patří produktu, ne demu. Při běhu scénáře se chrome skryje.

---

## Zařízení

Zákazník a partner desktop, řemeslník mobil v rámečku telefonu. Dotykové cíle minimálně 44 px. Responzivita mimo cílové zařízení každé role je mimo scope.

---

## Kontrola před dokončením obrazovky

- [ ] Každá plocha, text i linka odpovídá právě jednomu tokenu
- [ ] `--color-accent` není na žádném peněžním čísle
- [ ] `--color-over` a `--color-under` nejsou nikde mimo rozpočtové číslo
- [ ] Žádná barva, která nic neznamená
- [ ] Prvek z inventáře `kumu-tokeny-a-komponenty.md` §4 se nekreslí znovu jinak
- [ ] Typografie používá jen pět úrovní z kostry §7
- [ ] Karta s částkou stojí na `--surface-raised`
- [ ] Význam nikde nenese barva sama — kontrola černobílým tiskem

---

## Vizuální selhání není ošklivost, je to genericita

Vypadá takhle: všechno ve stejně širokých kartách pod sebou · vycentrovaný obsah bez důvodu · stejná velikost pro všechny nadpisy · rámeček kolem každé skupiny · trojice ikona + titulek + popisek · ikony jako dekorace · modální dialog pro rozhodnutí (B8 je vždy vsazený do stránky) · Cornsilk jako zvýraznění místo jako prostředí.

Proti tomu: plochy od kraje ke kraji · asymetrie místo středu · vlasové linky místo rámečků · velké skoky ve svislém rytmu · právě jeden překryv na obrazovku.

---

## Mimo scope

Registrace a přihlášení · správa účtu · platby · prázdné a chybové stavy · jiný projekt než tenhle · plné větve pilulek „Just an idea" a „I have drawings" · druhá větev F4 a F5 na klíč · editace profilu řemeslníka · admin · migrace uživatelů NŘ · cenotvorba pro partnery · blok B7.

Uveď to v prezentaci sám, dřív než se někdo zeptá.

---

## Pořadí stavby

`kumu-kostra.md` §9. Jedna session na krok. Po každém kroku commit a krátká poznámka, co se ukázalo — ne co se udělalo.

Když dojde čas, obětuj krok 7 (F4 a F5) dřív než kroky 4 a 5 (řemeslník a partner). Bez nich demo neukáže hlavní myšlenku; bez F4 a F5 ji ukáže, jen nedovypráví.
