---
title: "Tailwind CSS 4'da dizayn tokenlari bilan ishlash: rangni har joyda qo'lda yozmasdan bitta token tizimi qurish"
description: "Tailwind CSS 4'da @theme bilan dizayn tokenlari qurish — rang, shrift, masofa va soyalarni bitta joyda boshqarish, takrorlanishdan qutulish va saytni bir xil ko'rinishda saqlash."
pubDate: 2026-11-12
tags: ["tailwind", "css", "design-tokens", "frontend", "design-system"]
---

## Muammo: rang hamma joyda tarqab ketadi

Ko'p loyihada shunday holat bo'ladi: bitta rang o'nlab joyda yozilgan. Bir kun dizayner rangni biroz o'zgartirmoqchi bo'ladi — va sen 40 ta faylni ochib qidirasan.

Misol:

```html
<!-- Hamma joyda bir xil rang, lekin har safar qo'lda yozilgan -->
<header class="bg-[#F1E9DC]">...</header>
<section class="bg-[#F1E9DC]">...</section>
<article class="bg-[#FBF6EC]">...</article>
<footer class="bg-[#2F4038] text-[#FBF6EC]">...</footer>
```

Bu kod ishlaydi. Lekin uni boshqarib bo'lmaydi. Bir rangni o'zgartirsang, bir joyni unutib qoldirasan — va saytning bir qismi eski rangda qoladi.

Yechim — dizayn tokenlari.

## Dizayn tokeni nima?

Dizayn tokeni — bu dizayn qarorining bitta nomli o'zgaruvchisi. Rang, shrift, masofa, radius, soya — barchasi token bo'lishi mumkin.

G'oya sade: qiymatni emas, ma'noni yozasan.

```css
/* Yomon: qiymat */
background: #F1E9DC;

/* Yaxshi: ma'no */
background: var(--color-canvas);
```

`--color-canvas` — bu token. U qayerda ishlatilishini emas, nima ekanini aytadi: sahifa foni.

## Tailwind CSS 4'da tokenlar qayerda turadi?

Tailwind CSS 4'da tokenlar `@theme` ichida yoziladi. Odatda bu `src/styles/global.css` faylida bo'ladi.

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

Bu blokdan keyin Tailwind avtomatik ravishda yangi utility klasslar yaratadi:

| Token | Hosil bo'lgan klass |
| --- | --- |
| `--color-canvas` | `bg-canvas`, `text-canvas`, `border-canvas` |
| `--color-paper` | `bg-paper`, `text-paper`, `border-paper` |
| `--color-ink` | `bg-ink`, `text-ink`, `border-ink` |
| `--radius-card` | `rounded-card` |
| `--shadow-card` | `shadow-card` |

Ya'ni token yozishing bilan — klass tayyor.

## Tokenlarni qanday nomlash kerak?

Nomlash — eng muhim qism. Yomon nom token tizimini ham tarqatib yuboradi.

### 1. Qiymat bilan nomlama

```css
/* Yomon: rang o'zgarsa, nom yolg'on bo'ladi */
--color-light-green: #C7D2B1;
--color-reddish: #B86752;
```

Ertaga `#C7D2B1`'ni ko'k qilsang, `light-green` degan nom kulgili bo'lib qoladi.

### 2. Vazifa bilan nomla

```css
/* Yaxshi: nom vazifani aytadi */
--color-canvas: #F1E9DC;   /* sahifa foni */
--color-paper: #FBF6EC;    /* karta, panel */
--color-ink: #2F4038;      /* matn, chegara */
--color-primary: #C7D2B1;  /* asosiy urg'u */
--color-accent: #B86752;  /* ikkinchi urg'u */
```

Rang o'zgarsa ham, nom to'g'ri qoladi: fon baribir fon, matn baribir matn.

### 3. Uch qavatli tizim ishlat

Katta loyihada uch qavat qulay:

```css
@theme {
  /* 1-qavat: xom qiymatlar — kamdan-kam ishlatiladi */
  --color-sage-300: #C7D2B1;
  --color-clay-500: #B86752;

  /* 2-qavat: semantik tokenlar — asosan shu ishlatiladi */
  --color-canvas: #F1E9DC;
  --color-paper: #FBF6EC;
  --color-primary: var(--color-sage-300);
  --color-accent: var(--color-clay-500);

  /* 3-qavat: komponent tokenlari — faqat kerak bo'lsa */
  --color-card-bg: var(--color-paper);
  --color-card-border: var(--color-ink);
}
```

Oddiy portfolio uchun 2-qavat yetarli. 3-qavat faqat komponentlar ko'payganda kerak bo'ladi.

## Amaliy misol: eski kodni token'ga o'tkazish

Oldin:

```html
<article class="bg-[#FBF6EC] border border-[#2F4038] rounded-2xl shadow-[0_10px_30px_rgb(47_64_56/0.12)]">
  <h2 class="text-[#2F4038]">Maqola sarlavhasi</h2>
  <p class="text-[#2F4038]/80">Maqola matni...</p>
  <a href="#" class="bg-[#B86752] text-white px-4 py-2 rounded-full">O'qish</a>
</article>
```

Keyin:

```html
<article class="bg-paper border border-ink rounded-card shadow-card">
  <h2 class="text-ink">Maqola sarlavhasi</h2>
  <p class="text-ink/80">Maqola matni...</p>
  <a href="#" class="bg-accent text-white px-4 py-2 rounded-full">O'qish</a>
</article>
```

Farqi nima?

- Kod qisqaroq va o'qilishi osonroq.
- Rang o'zgarsa — bitta joyda o'zgartirasan.
- Yangi odam loyihaga kirsa — `bg-paper` nimani anglatishini darhol tushunadi.

## Dark mode tokenlar bilan

Dark mode'ni har bir komponentda alohida yozma. Token darajasida hal qilgin.

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

Komponentlar o'zgarmaydi — `bg-canvas` yorug'likda ham, qorong'ulikda ham ishlaydi. Faqat token qiymati o'zgaradi.

Bu — token tizimining eng katta kuchi: sahifaning ko'rinishini bir joydan almashtirish.

## Masofa, shrift va boshqa tokenlar

Tokenlar faqat rang emas.

```css
@theme {
  /* Shrift */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Georgia", serif;

  /* Masofa */
  --spacing-section: 4rem;
  --spacing-card: 1.5rem;

  /* Radius */
  --radius-card: 1rem;
  --radius-pill: 999px;

  /* Chegara */
  --border-card: 1px solid var(--color-ink);
}
```

Qoida: agar qiymat ikki joyda takrorlansa — u token bo'lishi kerak. Uch joyda takrorlansa — albatta token bo'lishi kerak.

## Tekshiruv ro'yxati: token tiziming sog'lommi?

Yangi rang qo'shishdan oldin shu savollarga javob ber:

- [ ] Bu qiymat allaqachon token sifatida bormi?
- [ ] Token nomi qiymatni emas, vazifani aytadimi?
- [ ] Token `global.css`'da, `@theme` ichidami?
- [ ] Dark mode'da bu token nimaga aylanadi?
- [ ] Komponentda `#[...]` bilan qo'lda rang qoldimi?

Agar oxirgi savolga javobing “ha” bo'lsa — o'sha joyni token'ga o'tkazgin.

## Xulosa

Dizayn tokenlari — bu “chiroyli kod” uchun emas, boshqaruv uchun kerak.

1. Qiymatni emas, ma'noni nomla.
2. Tokenlarni bitta joyda saqla — `@theme` ichida.
3. Komponentda faqat token klasslarini ishlat.
4. Yangi rang qo'shishdan oldin eskisini tekshir.

Bir marta to'g'ri qursang, keyin saytning butun rangini bitta faylda, bir daqiqada o'zgartirasan.
