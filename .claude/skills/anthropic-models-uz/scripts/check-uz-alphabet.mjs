#!/usr/bin/env node
// Flags leftovers of the legacy (1995) Uzbek Latin spelling and stray characters
// in a Markdown file that must follow the October 21, 2026 reformed alphabet.
//
// Usage: node check-uz-alphabet.mjs <file.md> [more.md ...]
//
// It is a reviewer aid, not an automatic converter: it prints suspicious words with
// line numbers, and a human (or agent) decides. Code fences, inline code, URLs and
// a list of English technical terms are skipped.

import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node check-uz-alphabet.mjs <file.md> [more.md ...]');
  process.exit(2);
}

// English / technical words that legitimately contain "sh", "ch", "o'" or "g'".
const ENGLISH_OK = new RegExp(
  [
    'bench', 'cache', 'cached', 'caching', 'chart', 'launch', 'search', 'which', 'check', 'chain', 'channel',
    'china', 'chrome', 'chat', 'checkpoint', 'each', 'research', 'push', 'show', 'should', 'finish', 'flash',
    'publish', 'english', 'shell', 'share', 'schema', 'sharp', 'cloud', 'child', 'change', 'much', 'such',
    'chunk', 'switch', 'batch', 'match', 'pitch', 'fetch', 'catch', 'latch', 'watch', 'patch', 'branch',
    'architect', 'technical', 'technology', 'mechanism', 'psychology', 'charge', 'purchase', 'chip',
  ].join('|'),
  'i',
);

const LEGACY = /(o['‘’ʻʼ`´]|g['‘’ʻʼ`´]|sh|ch)/i;
const STRAY_AFTER_NEW = /[öÖğĞşŞçÇ]['‘’ʻʼ`´]/;
const NOT_UZBEK_LETTERS = /[üÜıİéèêâáàäëïñß]/;
const CYRILLIC = /[Ѐ-ӿ]/;
const DOUBLED = /(şş|çç|ğğ|öö)/i;

function stripNoise(text) {
  return text
    .replace(/^---[\s\S]*?\n---/, (fm) => fm.replace(/^\s*(tags|pubDate|updatedDate):.*$/gm, '')) // keep Uzbek title/description
    .replace(/```[\s\S]*?```/g, (m) => '\n'.repeat(m.split('\n').length - 1)) // code fences, keep line count
    .replace(/`[^`\n]*`/g, ' ')
    .replace(/\]\((?:[^)]*)\)/g, '] ') // link targets
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

let problems = 0;
for (const file of files) {
  const lines = stripNoise(readFileSync(file, 'utf8')).split('\n');
  lines.forEach((line, i) => {
    const words = line.split(/[^\p{L}\p{M}'‘’ʻʼ`´-]+/u).filter(Boolean);
    for (const raw of words) {
      const word = raw.replace(/^[-'‘’ʻʼ`´]+|[-`´]+$/g, '');
      if (!word) continue;
      const reasons = [];
      if (CYRILLIC.test(word) && /[A-Za-z]/.test(word)) reasons.push('mixed Latin/Cyrillic letters');
      if (NOT_UZBEK_LETTERS.test(word)) reasons.push('letter outside the Uzbek alphabet');
      if (STRAY_AFTER_NEW.test(word)) reasons.push('apostrophe after a reformed letter');
      if (DOUBLED.test(word)) reasons.push('doubled reformed letter');
      if (LEGACY.test(word) && !ENGLISH_OK.test(word)) reasons.push('legacy spelling (o\' g\' sh ch)');
      if (reasons.length) {
        problems += 1;
        console.log(`${file}:${i + 1}: ${word}  <- ${reasons.join('; ')}`);
      }
    }
  });
}

console.log(problems === 0 ? 'OK: no suspicious words found.' : `\n${problems} suspicious word(s) found. Review each one.`);
process.exit(problems === 0 ? 0 : 1);
