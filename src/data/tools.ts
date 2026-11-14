export interface ToolEntry {
  id: string;
  num: number;
  title: string;
  description: string;
  slug: string;
}

/** Single source of truth for the tools list (index page, OG images, sitemap-friendly metadata). */
export const toolsList: ToolEntry[] = [
  {
    id: 'markdown-table-editor',
    num: 10,
    title: 'Markdown Table Visual Editor (GFM, CSV, TSV, JSON)',
    description: 'Edit Markdown tables in a spreadsheet-style grid with per-column alignment. Import CSV, TSV, JSON or existing GFM tables and export Markdown, HTML, CSV or TSV.',
    slug: 'markdown-table-editor',
  },
  {
    id: 'pagespeed-checker',
    num: 9,
    title: 'Website Speed & Performance Checker',
    description: 'Enter any website URL and jump straight to its Google PageSpeed Insights report: Core Web Vitals, performance score, and mobile or desktop analysis.',
    slug: 'pagespeed-checker',
  },
  {
    id: 'credit-module-calculator',
    num: 8,
    title: 'Kredit-Modul Hisoblagiç (HEMIS / ECTS)',
    description: "OTM talabalari uçun akademik qarzdorlik (qayta öqiş), fanlar farqi va 1 kredit qiymatini yillik kontrakt asosida aniq hisoblaş kalkulyatori.",
    slug: 'credit-module-calculator',
  },
  {
    id: 'base64-url',
    num: 7,
    title: 'Base64 & URL Encoder / Decoder',
    description: 'Encode and decode Base64, URL-safe Base64URL and percent-encoded URL components with full UTF-8 support.',
    slug: 'base64-url',
  },
  {
    id: 'clamp-generator',
    num: 6,
    title: 'CSS clamp() Fluid Typography Generator',
    description: 'Generate accessible, rem-based clamp() values for fluid font sizes and spacing, with a live preview and a table of computed sizes.',
    slug: 'clamp-generator',
  },
  {
    id: 'contrast-checker',
    num: 5,
    title: 'WCAG Color Contrast Checker',
    description: 'Check the contrast ratio of any two colors against WCAG 2.2 AA and AAA for normal text, large text and UI components.',
    slug: 'contrast-checker',
  },
  {
    id: 'minifier',
    num: 4,
    title: 'Code & Data Minifier / Beautifier',
    description: 'Compress or beautify JSON payloads, CSS stylesheets, and JavaScript code with live payload size savings metrics.',
    slug: 'minifier',
  },
  {
    id: 'uuid-generator',
    num: 3,
    title: 'Cryptographic UUID & NanoID Generator',
    description: 'Generate cryptographically secure version 4 UUIDs (standard, uppercase, no hyphens) and URL-safe NanoIDs using native WebCrypto.',
    slug: 'uuid-generator',
  },
  {
    id: 'json-to-typescript',
    num: 2,
    title: 'JSON to TypeScript Interface Generator',
    description: 'Paste raw JSON data to instantly produce strongly-typed TypeScript interfaces with automatic nested type resolution.',
    slug: 'json-to-typescript',
  },
  {
    id: 'uzbek-alphabet',
    num: 1,
    title: 'Uzbek Alphabet Converter (October 21, 2026 Reform)',
    description: 'Convert text between 1995 legacy Latin, the official reformed Latin standard (Ö, Ğ, Ç, Ş), and Uzbek Cyrillic script.',
    slug: 'uzbek-alphabet',
  },
];
