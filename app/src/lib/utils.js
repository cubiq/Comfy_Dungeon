// Seeded random number generator
export function seededRandom(a) {
  return function () {
    a |= 0;
    a = (a + 0x9e3779b9) | 0;
    var t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}
// UUID generator
export function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

export function seed() {
  return Math.floor(Math.random() * 9999999999);
}

export function toggleDisplay(el, value = null) {
  if (value !== null) {
    el.style.display = value === true ? "" : "none";
    return;
  }

  el.style.display = el.style.display === "none" ? "" : "none";
}
