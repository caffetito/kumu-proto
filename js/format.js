// KUMU — formátovací pomocníci. Čísla s oddělovači tisíců a měnou vzadu.

export function czk(castka) {
  const znamenko = castka < 0 ? "-" : "";
  const abs = Math.abs(Math.round(castka));
  return `${znamenko}${abs.toLocaleString("en-GB")} CZK`;
}

const MESICE = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function fmtDate(isoDate) {
  if (!isoDate) return "—";
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${d} ${MESICE[m - 1]} ${y}`;
}

export function fmtRange(odIso, doIso) {
  if (!odIso || !doIso) return "Not scheduled yet";
  const [, om, od] = odIso.split("-").map(Number);
  const [, dm, dd] = doIso.split("-").map(Number);
  if (om === dm) return `${od}–${dd} ${MESICE[om - 1]}`;
  return `${od} ${MESICE[om - 1]} – ${dd} ${MESICE[dm - 1]}`;
}

export function initialy(jmeno) {
  return jmeno
    .split(" ")
    .filter(Boolean)
    .map((cast) => cast[0].toUpperCase())
    .slice(0, 2)
    .join("");
}
