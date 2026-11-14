---
title: "Tailwind CSS 4'da dizayn tokenlari bilan işlaş: rangni har joyda qölda yozmasdan bitta token tizimi quriş"
description: "Tailwind CSS 4'da @theme bilan dizayn tokenlari quriş — rang, şrift, masofa va soyalarni bitta joyda boşqariş, takrorlanişdan qutuliş va saytni bir xil körinişda saqlaş."
pubDate: 2026-11-12
updatedDate: 2026-11-14
tags: ["tailwind", "css", "design-tokens", "frontend", "design-system"]
---

## Muammo: rang hamma joyda tarqab ketadi

Köp loyihada şunday holat böladi: bitta rang önlab joyda yozilgan. Bir kun dizayner rangni biroz özgartirmoqçi böladi — va sen 40 ta faylni oçib qidirasan.

Misol:

```html
<!-- Hamma joyda bir xil rang, lekin har safar qo'lda yozilgan -->
<header class="bg-[#F1E9DC]">...</header>
<section class="bg-[#F1E9DC]">...</section>
<article class="bg-[#FBF6EC]">...</article>
<footer class="bg-[#2F4038] text-[#FBF6EC]">...</footer>
```

Bu kod işlaydi. Lekin uni boşqarib bölmaydi. Bir rangni özgartirsang, bir joyni unutib qoldirasan — va saytning bir qismi eski rangda qoladi.

Yeçim — dizayn tokenlari.

## Dizayn tokeni nima?

Dizayn tokeni — bu dizayn qarorining bitta nomli özgaruvçisi. Rang, şrift, masofa, radius, soya — barçasi token bölişi mumkin.

Ğoya sade: qiymatni emas, ma'noni yozasan.

```css
/* Yomon: qiymat */
background: #F1E9DC;

/* Yaxshi: ma'no */
background: var(--color-canvas);
```

`--color-canvas` — bu token. U qayerda işlatilişini emas, nima ekanini aytadi: sahifa foni.

## Tailwind CSS 4'da tokenlar qayerda turadi?

Tailwind CSS 4'da tokenlar `@theme` içida yoziladi. Odatda bu `src/styles/global.css` faylida böladi.

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

Bu blokdan keyin Tailwind avtomatik ravişda yangi utility klasslar yaratadi:

| Token | Hosil bölgan klass |
| --- | --- |
| `--color-canvas` | `bg-canvas`, `text-canvas`, `border-canvas` |
| `--color-paper` | `bg-paper`, `text-paper`, `border-paper` |
| `--color-ink` | `bg-ink`, `text-ink`, `border-ink` |
| `--radius-card` | `rounded-card` |
| `--shadow-card` | `shadow-card` |

Ya'ni token yozişing bilan — klass tayyor.

## Tokenlarni qanday nomlaş kerak?

Nomlaş — eng muhim qism. Yomon nom token tizimini ham tarqatib yuboradi.

### 1. Qiymat bilan nomlama

```css
/* Yomon: rang o'zgarsa, nom yolg'on bo'ladi */
--color-light-green: #C7D2B1;
--color-reddish: #B86752;
```

Ertaga `#C7D2B1`'ni kök qilsang, `light-green` degan nom kulgili bölib qoladi.

### 2. Vazifa bilan nomla

```css
/* Yaxshi: nom vazifani aytadi */
--color-canvas: #F1E9DC;   /* sahifa foni */
--color-paper: #FBF6EC;    /* karta, panel */
--color-ink: #2F4038;      /* matn, chegara */
--color-primary: #C7D2B1;  /* asosiy urg'u */
--color-accent: #B86752;  /* ikkinchi urg'u */
```

Rang özgarsa ham, nom töğri qoladi: fon baribir fon, matn baribir matn.

### 3. Uç qavatli tizim işlat

Katta loyihada uç qavat qulay:

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

Oddiy portfolio uçun 2-qavat yetarli. 3-qavat faqat komponentlar köpayganda kerak böladi.

## Amaliy misol: eski kodni token'ga ötkaziş

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

- Kod qisqaroq va öqilişi osonroq.
- Rang özgarsa — bitta joyda özgartirasan.
- Yangi odam loyihaga kirsa — `bg-paper` nimani anglatişini darhol tuşunadi.

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

Komponentlar özgarmaydi — `bg-canvas` yoruğlikda ham, qoronğulikda ham işlaydi. Faqat token qiymati özgaradi.

Bu — token tizimining eng katta kuçi: sahifaning körinişini bir joydan almaştiriş.

## Masofa, şrift va boşqa tokenlar

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

Qoida: agar qiymat ikki joyda takrorlansa — u token bölişi kerak. Uç joyda takrorlansa — albatta token bölişi kerak.

## Tekşiruv röyxati: token tiziming soğlommi?

Yangi rang qöşişdan oldin şu savollarga javob ber:

- [ ] Bu qiymat allaqaçon token sifatida bormi?
- [ ] Token nomi qiymatni emas, vazifani aytadimi?
- [ ] Token `global.css`'da, `@theme` içidami?
- [ ] Dark mode'da bu token nimaga aylanadi?
- [ ] Komponentda `#[...]` bilan qölda rang qoldimi?

Agar oxirgi savolga javobing “ha” bölsa — öşa joyni token'ga ötkazgin.

## Xulosa

Dizayn tokenlari — bu “çiroyli kod” uçun emas, boşqaruv uçun kerak.

1. Qiymatni emas, ma'noni nomla.
2. Tokenlarni bitta joyda saqla — `@theme` içida.
3. Komponentda faqat token klasslarini işlat.
4. Yangi rang qöşişdan oldin eskisini tekşir.

Bir marta töğri qursang, keyin saytning butun rangini bitta faylda, bir daqiqada özgartirasan.
