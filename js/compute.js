// KUMU — všechny výpočty částek. Obrazovky si nepočítají nic samy.
// Nic se tu neukládá zpátky do dat — pořád jen čte a vrací číslo.

export function jobPolozkySoucet(job) {
  return job.polozky.reduce((sum, p) => sum + p.castka, 0);
}

export function jobUspora(job, vybranePaky) {
  return job.paky
    .filter((paka) => vybranePaky.includes(paka.id))
    .reduce((sum, paka) => sum + paka.uspora, 0);
}

export function jobOdhad(job, vybranePaky) {
  return jobPolozkySoucet(job) - jobUspora(job, vybranePaky);
}

export function jobCastka(job, vybranePaky) {
  if (job.vybranyKandidat) {
    const kandidat = (job.kandidati || []).find((k) => k.id === job.vybranyKandidat);
    if (kandidat) return kandidat.castka;
  }
  return jobOdhad(job, vybranePaky);
}

export function rozpocetProjektu(projekt, vybranePaky) {
  const jobySoucet = projekt.joby.reduce((sum, job) => sum + jobCastka(job, vybranePaky), 0);
  return jobySoucet + projekt.rezervaMimoJoby;
}

export function soucetSchvalenychVicepraci(projekt) {
  return projekt.vicepráce
    .filter((v) => v.stav === "schvaleno")
    .reduce((sum, v) => sum + v.castka, 0);
}

export function rozpocetSVicepracemi(projekt, vybranePaky) {
  return rozpocetProjektu(projekt, vybranePaky) + soucetSchvalenychVicepraci(projekt);
}

export function soucetVyuctovani(projekt) {
  return projekt.vyuctovani.reduce((sum, v) => sum + v.castka, 0);
}

export function celkemProjekt(projekt, vybranePaky) {
  return rozpocetProjektu(projekt, vybranePaky) + soucetVyuctovani(projekt);
}

export function rozdilProtiStropu(projekt, vybranePaky) {
  return projekt.zadani.strop - rozpocetProjektu(projekt, vybranePaky);
}

// Panel týmu na Projectu: kolik profesí je obsazeno kandidátem, kolik ne.
export function timStav(projekt) {
  const celkem = projekt.joby.length;
  const obsazeno = projekt.joby.filter((j) => j.vybranyKandidat).length;
  return { obsazeno, celkem };
}

// Odhad zbývajících (neobsazených) jobů — pro panel týmu.
export function odhadNeobsazenych(projekt, vybranePaky) {
  return projekt.joby
    .filter((j) => !j.vybranyKandidat)
    .reduce((sum, job) => sum + jobOdhad(job, vybranePaky), 0);
}
