---
title: "Tailwind CSS 4'da dizayn tokenlari: ranglarni bitta joyda boşqariş"
description: "Tailwind CSS 4'da @theme bilan dizayn tokenlarini quriş: rang, şrift, masofa va soyalarni bitta joyda boşqariş, takrorlanişni kamaytiriş."
pubDate: 2026-11-12
updatedDate: 2026-11-14
tags: ["tailwind", "css", "design-tokens", "frontend", "design-system"]
---

## Muammo: rang hamma joyda tarqab ketadi

Köp loyihada bitta rang önlab joyga qölda yoziladi. Bir kuni dizayner rangni biroz özgartirmoqçi böladi. Şunda sen önlab faylni qidirib çiqasan, bir joyni unutasan, saytning bir qismi eski rangda qoladi.

```html
<!-- Hamma joyda bir xil rang, lekin har safar qölda yozilgan -->
<header class="bg-[#F1E9DC]">...</header>
<section class="bg-[#F1E9DC]">...</section>
<article class="bg-[#FBF6EC]">...</article>
<footer class="bg-[#2F4038] text-[#FBF6EC]">...</footer>
```

Kod işlaydi, lekin uni boşqarib bölmaydi. Yeçim — dizayn tokenlari.

## Dizayn tokeni nima?

Dizayn tokeni — dizayn qarorining nomlangan qiymati: rang, şrift, masofa, radius yoki soya. Ğoya sade: qiymatni emas, ma'noni yozasan.

```css
/* Yomon: qiymat */
background: #F1E9DC;

/* Yaxshi: ma'no */
background: var(--color-canvas);
```

`--color-canvas` rangning qiymatini emas, vazifasini aytadi: bu sahifa foni.

## Tokenlar qayerda turadi?

Tailwind CSS 4'da tokenlar `@theme` blokida yoziladi, odatda `src/styles/global.css` faylida:

```css
@import "tailwindcss";

@theme {
  --color-canvas: #F1E9DC;
  --color-paper: #FBF6EC;
  --color-sage: #C7D2B1;
  --color-rose: #DDA095;
  --color-clay: #B86752;
  --color-ink: #2F4038;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Georgia", serif;

  --radius-card: 1rem;
  --shadow-card: 0 10px 30px rgb(47 64 56 / 0.12);
}
```

Bu blokdan keyin Tailwind yangi utility klasslarni avtomatik yaratadi:

| Token | Hosil bölgan klass |
| --- | --- |
| `--color-canvas` | `bg-canvas`, `text-canvas`, `border-canvas` |
| `--color-paper` | `bg-paper`, `text-paper`, `border-paper` |
| `--color-ink` | `bg-ink`, `text-ink`, `border-ink` |
| `--radius-card` | `rounded-card` |
| `--shadow-card` | `shadow-card` |

## Tokenlarni qanday nomlaş kerak?

Nomlaş eng muhim qism. Yomon nom butun tizimni buzadi.

### 1. Qiymat bilan nomlama

```css
/* Yomon: rang özgarsa, nom yolğon böladi */
--color-light-green: #C7D2B1;
--color-reddish: #B86752;
```

Ertaga `#C7D2B1` ni asosiy rang qilsang, `light-green` nomi kulgili böladi.

### 2. Vazifa bilan nomla

```css
/* Yaxshi: nom vazifani aytadi */
--color-canvas: #F1E9DC;   /* sahifa foni */
--color-paper: #FBF6EC;    /* karta, panel */
--color-ink: #2F4038;      /* matn, chegara */
--color-primary: #C7D2B1;  /* asosiy urğu */
--color-accent: #B86752;   /* ikkinchi urğu */
```

Rang özgarsa ham, nom töğri qoladi: fon baribir fon, matn baribir matn.

### 3. Uç qavatli tizim

Katta loyihada uç qavat qulay. Qavatlar bir yönalişda boğlanadi: komponent semantik tokenni, semantik token xom qiymatni işlatadi. Xom qiymat komponentga töğridan-töğri ulanmaydi.

![Dizayn tokenlarining uç qavati: xom qiymatlar, semantik tokenlar va komponent tokenlari. Strelkalar var() orqali boğlanişni körsatadi](/images/blog/tailwind-css-4-dizayn-tokenlari/token-layers.svg)

```css
@theme {
  /* 1-qavat: xom qiymatlar, kamdan-kam ishlatiladi */
  --color-sage-300: #C7D2B1;
  --color-clay-500: #B86752;

  /* 2-qavat: semantik tokenlar, asosan shular ishlatiladi */
  --color-canvas: #F1E9DC;
  --color-paper: #FBF6EC;
  --color-ink: #2F4038;
  --color-primary: var(--color-sage-300);
  --color-accent: var(--color-clay-500);

  /* 3-qavat: komponent tokenlari, faqat kerak bölsa */
  --color-card-bg: var(--color-paper);
  --color-card-border: var(--color-ink);
}
```

Oddiy portfolio uçun 2-qavat yetarli. 3-qavat komponentlar köpayganda kerak böladi.

## Amaliy misol: eski kodni tokenga ötkaziş

Oldin:

```html
<article class="bg-[#FBF6EC] border border-[#2F4038] rounded-2xl shadow-[0_10px_30px_rgb(47_64_56/0.12)]">
  <h2 class="text-[#2F4038]">Maqola sarlavhasi</h2>
  <p class="text-[#2F4038]/80">Maqola matni...</p>
  <a href="#" class="bg-[#B86752] text-white px-4 py-2 rounded-full">Öqiş</a>
</article>
```

Keyin:

```html
<article class="bg-paper border border-ink rounded-card shadow-card">
  <h2 class="text-ink">Maqola sarlavhasi</h2>
  <p class="text-ink/80">Maqola matni...</p>
  <a href="#" class="bg-accent text-white px-4 py-2 rounded-full">Öqiş</a>
</article>
```

Farqi nimada?

- Kod qisqaroq, öqiliş osonroq.
- Rang özgarsa, bitta joyda özgartirasan.
- Yangi odam loyihaga kirsa, `bg-paper` nimani anglatişini darhol tuşunadi.

## Dark mode tokenlar bilan

Dark mode'ni har bir komponentda alohida yozma. Token darajasida hal qil.

```css
@theme {
  --color-canvas: #F1E9DC;
  --color-paper: #FBF6EC;
  --color-ink: #2F4038;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-canvas: #1E2A24;
    --color-paper: #2F4038;
    --color-ink: #F1E9DC;
  }
}
```

Komponentlar özgarmaydi. `bg-canvas` yoruğlikda ham, qoronğulikda ham işlaydi, faqat token qiymati özgaradi. Sahifaning körinişini bir joydan almaştiriş token tizimining eng katta kuçi.

## Masofa, şrift va boşqa tokenlar

Tokenlar faqat rang emas:

```css
@theme {
  /* Şrift */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Georgia", serif;

  /* Masofa */
  --spacing-section: 4rem;
  --spacing-card: 1.5rem;

  /* Radius */
  --radius-card: 1rem;
  --radius-pill: 999px;
}
```

Qoida: qiymat ikki yoki undan köp joyda takrorlansa, uni token qil.

## Yangi rang qöşişdan oldin

- [ ] Bu qiymat allaqaçon token sifatida bormi?
- [ ] Token nomi qiymatni emas, vazifani aytadimi?
- [ ] Token `global.css` dagi `@theme` içidami?
- [ ] Komponentda `[#...]` bilan qölda rang qoldimi?

Şundan keyin rangni özgartiriş bitta fayl bilan çeklanadi.
