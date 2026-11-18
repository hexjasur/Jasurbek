/**
 * Uzbek alphabet conversion (reformed Latin 2026 <-> legacy Latin <-> Cyrillic).
 * Pure functions: safe to run at build time (search aliases) and in the browser (AlphabetSwitcher).
 */

const APOSTROPHES = "[ʻ'’`‘\\u02BC\\u02BB\\u00B4]";

const cyrillicToLatinMap: Record<string, string> = {
  'А': 'A', 'а': 'a', 'Б': 'B', 'б': 'b', 'В': 'V', 'в': 'v',
  'Г': 'G', 'г': 'g', 'Д': 'D', 'д': 'd', 'Е': 'E', 'е': 'e',
  'Ё': 'Yo', 'ё': 'yo', 'Ж': 'J', 'ж': 'j', 'З': 'Z', 'з': 'z',
  'И': 'I', 'и': 'i', 'Й': 'Y', 'й': 'y', 'К': 'K', 'к': 'k',
  'Л': 'L', 'М': 'M', 'м': 'm', 'Н': 'N', 'н': 'n',
  'О': 'O', 'о': 'o', 'П': 'P', 'п': 'p', 'Р': 'R', 'р': 'r',
  'С': 'S', 'с': 's', 'Т': 'T', 'т': 't', 'У': 'U', 'у': 'u',
  'Ф': 'F', 'Х': 'X', 'х': 'x', 'Ц': 'Ts', 'ц': 'ts',
  'Ч': 'Ç', 'ч': 'ç', 'Ш': 'Ş', 'ш': 'ş', 'Ъ': 'ʼ', 'ъ': 'ʼ',
  'Ь': '', 'ь': '', 'Э': 'E', 'э': 'e', 'Ю': 'Yu', 'ю': 'yu',
  'Я': 'Ya', 'я': 'ya', 'Ў': 'Ö', 'ў': 'ö', 'Қ': 'Q', 'қ': 'q',
  'Ғ': 'Ğ', 'ғ': 'ğ', 'Ҳ': 'H', 'ҳ': 'h',
};

const latinToCyrillicMap: Record<string, string> = {
  'A': 'А', 'a': 'а', 'B': 'Б', 'b': 'б', 'D': 'Д', 'd': 'д',
  'E': 'Е', 'e': 'е', 'F': 'Ф', 'f': 'ф', 'G': 'Г', 'g': 'г',
  'H': 'Ҳ', 'h': 'ҳ', 'I': 'И', 'i': 'и', 'J': 'Ж', 'j': 'ж',
  'K': 'К', 'k': 'к', 'L': 'Л', 'l': 'л', 'M': 'М', 'm': 'м',
  'N': 'Н', 'n': 'н', 'O': 'О', 'o': 'о', 'P': 'П', 'p': 'п',
  'Q': 'Қ', 'q': 'қ', 'R': 'Р', 'r': 'р', 'S': 'С', 's': 'с',
  'T': 'Т', 't': 'т', 'U': 'У', 'u': 'у', 'V': 'В', 'v': 'в',
  'X': 'Х', 'x': 'х', 'Y': 'Й', 'y': 'й', 'Z': 'З', 'z': 'з',
  'Ö': 'Ў', 'ö': 'ў', 'Ğ': 'Ғ', 'ğ': 'ғ', 'Ş': 'Ш', 'ş': 'ш',
  'Ç': 'Ч', 'ç': 'ч',
};

// Multi-character forms first: legacy digraphs and apostrophe letters.
const latinDigraphs: [RegExp, string][] = [
  [new RegExp(`O${APOSTROPHES}`, 'g'), 'Ў'], [new RegExp(`o${APOSTROPHES}`, 'g'), 'ў'],
  [new RegExp(`G${APOSTROPHES}`, 'g'), 'Ғ'], [new RegExp(`g${APOSTROPHES}`, 'g'), 'ғ'],
  [/SH/g, 'Ш'], [/Sh/g, 'Ш'], [/sh/g, 'ш'],
  [/CH/g, 'Ч'], [/Ch/g, 'Ч'], [/ch/g, 'ч'],
  [/TS/g, 'Ц'], [/Ts/g, 'Ц'], [/ts/g, 'ц'],
  [/YO/g, 'Ё'], [/Yo/g, 'Ё'], [/yo/g, 'ё'],
  [/YU/g, 'Ю'], [/Yu/g, 'Ю'], [/yu/g, 'ю'],
  [/YA/g, 'Я'], [/Ya/g, 'Я'], [/ya/g, 'я'],
];

/** Legacy (1995) Latin -> reformed Latin: O' -> Ö, G' -> Ğ, Sh -> Ş, Ch -> Ç. */
export function oldToNew(text: string): string {
  return text
    .replace(new RegExp(`O${APOSTROPHES}`, 'g'), 'Ö')
    .replace(new RegExp(`o${APOSTROPHES}`, 'g'), 'ö')
    .replace(new RegExp(`G${APOSTROPHES}`, 'g'), 'Ğ')
    .replace(new RegExp(`g${APOSTROPHES}`, 'g'), 'ğ')
    .replace(/SH/g, 'Ş').replace(/Sh/g, 'Ş').replace(/sh/g, 'ş')
    .replace(/CH/g, 'Ç').replace(/Ch/g, 'Ç').replace(/ch/g, 'ç');
}

/** Reformed Latin -> legacy Latin. */
export function newToOld(text: string): string {
  return text
    .replace(/Ö/g, 'Oʻ').replace(/ö/g, 'oʻ')
    .replace(/Ğ/g, 'Gʻ').replace(/ğ/g, 'gʻ')
    .replace(/Ş/g, 'Sh').replace(/ş/g, 'sh')
    .replace(/Ç/g, 'Ch').replace(/ç/g, 'ch');
}

/** Cyrillic -> reformed Latin. */
export function cyrillicToNew(text: string): string {
  let res = '';
  for (const char of text) {
    res += cyrillicToLatinMap[char] !== undefined ? cyrillicToLatinMap[char] : char;
  }
  return res;
}

/** Reformed (or legacy) Latin -> Cyrillic. */
export function latinToCyrillic(text: string): string {
  let res = text;
  for (const [re, cyr] of latinDigraphs) res = res.replace(re, cyr);
  let out = '';
  for (const char of res) {
    out += latinToCyrillicMap[char] !== undefined ? latinToCyrillicMap[char] : char;
  }
  return out;
}

/** Reformed Latin -> plain ASCII (ö->o, ğ->g, ş->s, ç->c). Used for search aliases. */
export function asciiFold(text: string): string {
  return text.replace(/[ÖöĞğŞşÇç]/g, (c) => ({ Ö: 'O', ö: 'o', Ğ: 'G', ğ: 'g', Ş: 'S', ş: 's', Ç: 'C', ç: 'c' } as Record<string, string>)[c]);
}

export type UzbekScript = 'new' | 'old' | 'cyrillic';

/** Convert reformed-Latin text into one of the three display scripts. */
export function convertFromNew(text: string, script: UzbekScript): string {
  if (script === 'old') return newToOld(text);
  if (script === 'cyrillic') return latinToCyrillic(text);
  return text;
}
