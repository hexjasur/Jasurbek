---
title: "Uzbek Alphabet 2026 Reform: Transition to Diacritics (Ö, Ğ, Ç, Ş)"
description: "On October 21, 2026, marking Uzbek Language Day, the finalized Uzbek Latin alphabet reform officially adopted diacritic letters (Ö, Ğ, Ç, Ş) to replace cumbersome apostrophes and digraphs."
pubDate: 2026-10-21
tags: ["uzbek", "linguistics", "unicode", "standards"]
---

## Overview of the October 21, 2026 Reform

On **October 21, 2026** — historically celebrated throughout the country as **Uzbek Language Day** (*O'zbek tili bayrami kuni*) — Uzbekistan formally finalized the transition to an updated Latin alphabet standard. This milestone marks the culmination of multi-year parliamentary debates, linguistic research, and digital standardizations aimed at resolving persistent orthographical friction.

The primary objective of this reform is eliminating the ambiguous modifier characters and digraphs introduced during the 1995 transition, aligning the writing system with global Turkic orthographies and modern computing standards.

## Key Character Replacements

The 2026 standard replaces two apostrophe-modified vowels and two English-style digraphs with standardized Unicode diacritics:

| Cyrillic | Old Latin (1995) | Reformed Latin (October 21, 2026) | IPA Phoneme |
| :--- | :--- | :--- | :--- |
| **Ў ў** | Oʻ oʻ | **Ö ö** | [o / ø] |
| **Ғ ғ** | Gʻ gʻ | **Ğ ğ** | [ʁ] |
| **Ш ш** | Sh sh | **Ş ş** | [ʃ] |
| **Ч ч** | Ch ch | **Ç ç** | [tʃ] |

## Why the 1995 System Needed Revision

The 1995 standard attempted to make typing feasible on standard US QWERTY typewriter layouts by employing inverted apostrophes (`ʻ`, U+02BB) for `Oʻ` and `Gʻ`, and digraphs (`sh`, `ch`) for postalveolar consonants. However, this introduced severe unintended challenges across the digital landscape:

### 1. Inconsistent Apostrophe Encoding
In practice, digital users and operating systems used inconsistent symbols:
- Straight single quote (`'`) — ASCII 0x27
- Left single quotation mark (`‘`) — U+2018
- Right single quotation mark (`’`) — U+2019
- Modifier letter turned comma (`ʻ`) — U+02BB

Because word boundaries and search indexing treat quotes as punctuation, search queries frequently broke. A search for `O'zbekiston` would fail to match `Oʻzbekiston` or index only `zbekiston`.

### 2. Phonetic Ambiguity with Digraphs
In the 1995 standard, when `s` and `h` appeared consecutively as distinct sounds (e.g., in loanwords or compound words such as *is-hot* or *mus-haq*), an apostrophe was required (`s'h`). This caused systematic orthographic errors and confusion in computational Natural Language Processing (NLP).

### 3. International and Turkic Standardization
The reformed characters **Ö, Ğ, Ç, Ş** correspond directly with common Turkic alphabets (Turkish, Azerbaijani, Turkmen), simplifying keyboard layouts, OCR pipelines, and cross-linguistic font support.

## Visual Comparison

```text
1995 Standard:
"O'zbekiston Respublikasi — go'zal va boy yurt. Biz o'zbek tilida gaplashamiz."

Reformed Standard (October 21, 2026):
"Özbekiston Respublikasi — gözal va boy yurt. Biz özbek tilida gaplaşamiz."
```

## Online Conversion Tool

To facilitate automatic document conversion between the legacy 1995 spelling, the October 21, 2026 standard, and Cyrillic script, I have integrated a client-side converter on this website. You can access it anytime under the [Tools](/tools) section.
