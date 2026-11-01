import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { SITE_CONFIG } from '../config';

/**
 * Build-time Open Graph image generator.
 * Mirrors the site's "flora" theme: cream card, deep-green outline, hard offset shadow,
 * sage + terracotta accents, Gelasio (Georgia-like) headings and DM Sans body text.
 */

export interface OgEntry {
  slug: string;
  kicker: string;
  title: string;
  description?: string;
  tags?: string[];
}

const SERIF = 'Gelasio, Gelasio Ext';
const SANS = 'DM Sans, DM Sans Ext';
const WIDTH = 1200;
const HEIGHT = 630;

const COLORS = {
  outer: '#d8cfc0',
  card: '#fbf6ec',
  ink: '#2f4038',
  muted: '#4d6055',
  line: '#31473b',
  shadow: '#35483b',
  sage: '#c7d2b1',
  terracotta: '#b86752',
};

const root = process.cwd();
const fontFile = (pkg: string, file: string) =>
  fs.readFileSync(path.join(root, 'node_modules', '@fontsource', pkg, 'files', file));

// Latin + Latin-Ext (registered as separate families, used as font-family fallbacks)
// so Uzbek letters (Ö Ğ Ç Ş) render correctly.
const fonts = [
  { name: 'Gelasio', data: fontFile('gelasio', 'gelasio-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
  { name: 'Gelasio Ext', data: fontFile('gelasio', 'gelasio-latin-ext-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
  { name: 'DM Sans', data: fontFile('dm-sans', 'dm-sans-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'DM Sans Ext', data: fontFile('dm-sans', 'dm-sans-latin-ext-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'DM Sans', data: fontFile('dm-sans', 'dm-sans-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
  { name: 'DM Sans Ext', data: fontFile('dm-sans', 'dm-sans-latin-ext-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
];

let assetsPromise: Promise<{ flora: string; avatar: string }> | undefined;

function loadAssets() {
  assetsPromise ??= (async () => {
    const pub = (p: string) => path.join(root, 'public', 'images', p);
    const flora = await sharp(pub('flora/floral-corner.webp'))
      .resize({ width: 460 })
      .png()
      .toBuffer();
    const avatar = await sharp(pub('jasur-flora.webp'))
      .resize(180, 180, { fit: 'cover', position: 'top' })
      .png()
      .toBuffer();
    const uri = (b: Buffer) => `data:image/png;base64,${b.toString('base64')}`;
    return { flora: uri(flora), avatar: uri(avatar) };
  })();
  return assetsPromise;
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, props: Record<string, unknown>, ...children: unknown[]): Node => ({
  type,
  props: { ...props, children: children.length <= 1 ? children[0] : children },
});

const clip = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

function titleSize(title: string): number {
  if (title.length <= 24) return 72;
  if (title.length <= 40) return 62;
  if (title.length <= 58) return 52;
  if (title.length <= 80) return 46;
  return 42;
}

export async function renderOgImage(entry: OgEntry): Promise<Buffer> {
  const { flora, avatar } = await loadAssets();
  const title = clip(entry.title, 110);
  const description = entry.description ? clip(entry.description, 120) : '';
  const tags = (entry.tags ?? []).slice(0, 4);

  const tree = h(
    'div',
    {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        position: 'relative',
        backgroundColor: COLORS.outer,
        backgroundImage:
          'radial-gradient(circle at 8% 10%, rgba(221,160,149,0.45), rgba(221,160,149,0) 360px), radial-gradient(circle at 92% 82%, rgba(130,153,140,0.4), rgba(130,153,140,0) 420px)',
        fontFamily: SANS,
      },
    },
    // hard offset shadow
    h('div', {
      style: {
        position: 'absolute',
        left: 56,
        top: 56,
        width: 1112,
        height: 534,
        boxSizing: 'border-box',
        borderRadius: 30,
        backgroundColor: COLORS.shadow,
      },
    }),
    // card
    h(
      'div',
      {
        style: {
          position: 'absolute',
          left: 40,
          top: 40,
          width: 1112,
          height: 534,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px 56px 36px',
          borderRadius: 30,
          border: `4px solid ${COLORS.line}`,
          backgroundColor: COLORS.card,
          overflow: 'hidden',
        },
      },
      h('img', {
        src: flora,
        width: 460,
        height: 460,
        style: { position: 'absolute', top: -92, right: -118, opacity: 0.5, transform: 'rotate(-16deg)' },
      }),
      // top: kicker pill
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignSelf: 'flex-start',
            padding: '8px 22px',
            border: `3px solid ${COLORS.line}`,
            borderRadius: 999,
            backgroundColor: COLORS.sage,
            boxShadow: `4px 4px 0 ${COLORS.shadow}`,
            color: COLORS.ink,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
          },
        },
        entry.kicker,
      ),
      // middle: title + description + tags
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', maxWidth: 840 } },
        h(
          'div',
          {
            style: {
              display: 'flex',
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: titleSize(title),
              lineHeight: 1.12,
              color: COLORS.ink,
            },
          },
          title,
        ),
        description
          ? h(
              'div',
              {
                style: {
                  display: 'flex',
                  marginTop: 20,
                  fontSize: 26,
                  lineHeight: 1.4,
                  color: COLORS.muted,
                  lineClamp: 2,
                },
              },
              description,
            )
          : h('div', { style: { display: 'none' } }),
        tags.length
          ? h(
              'div',
              { style: { display: 'flex', marginTop: 18 } },
              ...tags.map((tag) =>
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      marginRight: 12,
                      padding: '4px 16px',
                      borderRadius: 999,
                      border: `2px solid ${COLORS.line}`,
                      backgroundColor: COLORS.card,
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.terracotta,
                    },
                  },
                  `#${tag}`,
                ),
              ),
            )
          : h('div', { style: { display: 'none' } }),
      ),
      // bottom: author + domain
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center' } },
          h('img', {
            src: avatar,
            width: 76,
            height: 76,
            style: {
              borderRadius: 18,
              border: `3px solid ${COLORS.line}`,
              boxShadow: `4px 4px 0 ${COLORS.shadow}`,
            },
          }),
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', marginLeft: 22 } },
            h(
              'div',
              { style: { display: 'flex', fontFamily: SERIF, fontWeight: 700, fontSize: 32, color: COLORS.ink } },
              SITE_CONFIG.author,
            ),
            h(
              'div',
              { style: { display: 'flex', fontSize: 22, color: COLORS.muted } },
              'Software engineer · Portfolio & tech blog',
            ),
          ),
        ),
        h(
          'div',
          { style: { display: 'flex', fontSize: 24, fontWeight: 700, color: COLORS.terracotta } },
          SITE_CONFIG.domain,
        ),
      ),
    ),
  );

  const svg = await satori(tree as never, { width: WIDTH, height: HEIGHT, fonts });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
