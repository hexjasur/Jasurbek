---
title: "GitHub Actions bilan bepul CI/CD: portfolio'dan production'gacha"
description: "GitHub Actions yordamida portfolio va blog uchun bepul CI/CD qurish — ci.yml va deploy.yml'ni qator-qator tushuntirish, tekshiruv, build va GitHub Pages'ga avtomatik deploy."
pubDate: 2026-11-12
tags: ["github-actions", "ci-cd", "github-pages", "astro", "devops"]
---

## CI/CD nima va nega kerak?

CI/CD — bu kodni tekshirish va saytga chiqarishni avtomatlashtirish. Qo'lda qiladigan har bir qadam — xato qilish uchun imkoniyat.

Portfolio'da CI/CD bo'lmasa, odatda shunday bo'ladi: kodni yozasan, build qilishni unatasan, sayt buzilganini bir hafta keyin bilasan.

CI/CD bo'lsa, tartib sade:

1. Kodni branch'ga push qilasan.
2. GitHub avtomatik tekshiradi: type-check, build, qidiruv indeksi.
3. Hammasi joyida bo'lsa — `master`'ga push qilishing bilan sayt o'zi yangilanadi.

Ya'ni sen faqat kod yozasan, qolganini mashina bajaradi. Va bularning hammasi shaxsiy portfolio uchun bepul.

## Loyihada ikki workflow bor

Bu loyihada ikkita workflow ishlatiladi:

| Fayl | Qachon ishlaydi | Vazifasi |
| --- | --- | --- |
| `.github/workflows/ci.yml` | `master`'dan boshqa branch'ga push, pull request | Tekshiruv |
| `.github/workflows/deploy.yml` | `master`'ga push, qo'lda ishga tushirish | Build + GitHub Pages'ga chiqarish |

Ajratishning sababi sade: tekshiruvdan o'tmagan kod production'ga chiqmasligi kerak.

## ci.yml: qator-qator tushuntirish

Keling, tekshiruv workflow'ni qismlarga bo'lib ko'ramiz.

### 1. Nom va ishga tushish sharti

```yaml
name: CI
on:
  push:
    branches-ignore: [master]
  pull_request:
```

`name` — Actions sahifasida ko'rinadigan nom. `on` — workflow qachon ishlaydi.

Bu yerda qoida shunday: `master`'dan boshqa har qanday branch'ga push bo'lsa, yoki pull request ochilsa — tekshiruv boshlanadi. `master`'ning o'zi bu yerda tekshirilmaydi, chunki u deploy workflow'ning ishi.

### 2. Ruxsatlar va muhit

```yaml
permissions:
  contents: read
```

Tekshiruv workflow'ga faqat o'qish ruxsati kerak. U hech narsani o'zgartirmaydi, faqat tekshiradi. Bu xavfsizlik uchun yaxshi odat: har bir workflow'ga faqat kerakli ruxsatni ber.

### 3. Ish muhiti

```yaml
jobs:
  check:
    runs-on: ubuntu-latest
```

`jobs` — bajariladigan ishlar ro'yxati. Bu yerda bitta ish bor: `check`.

`runs-on: ubuntu-latest` — ish GitHub'ning Ubuntu serverida ishlaydi. Portfolio uchun Linux yetarli, tez va bepul.

### 4. Kodni olish va Bun o'rnatish

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
```

Har bir workflow ikki qadamdan boshlanadi:

- `checkout` — repo'dagi kodni serverga yuklaydi.
- `setup-bun` — Bun'ni o'rnatadi, chunki loyiha Bun bilan ishlaydi.

Agar loyiha pnpm yoki npm'da bo'lsa, bu qadam o'zgaradi, mantiq esa bir xil: avval kod, keyin package manager.

### 5. Bog'liqliklarni o'rnatish

```yaml
      - run: bun install --frozen-lockfile
```

`--frozen-lockfile` — juda muhim flag. U `bun.lock` faylidagi versiyalarni aynan o'rnatadi.

Nega kerak? Mahalliy kompyuteringda bir versiya, serverda boshqa versiya bo'lsa — build bir joyda ishlaydi, bir joyda ishlamaydi. Frozen lockfile shu muammoni yo'q qiladi.

### 6. Type-check va build

```yaml
      - run: bun run check
      - run: bun run build
```

Bu ikki qadam — tekshiruvning yuragi:

- `check` — Astro va TypeScript xatolarini topadi. Tip xato bo'lsa, build'ga ham o'tilmaydi.
- `build` — saytni to'liq yig'adi: sahifalar, OG rasmlar, RSS, sitemap va Pagefind qidiruv indeksi.

Agar shu ikki qadamdan biri yiqilsa — pull request'ni merge qilishdan oldin xatoni bilasan.

## deploy.yml: qator-qator tushuntirish

Deploy workflow faqat `master`'da ishlaydi.

### 1. Ishga tushish sharti

```yaml
name: Deploy
on:
  push:
    branches: [master]
  workflow_dispatch:
```

`push` — `master`'ga push bo'lsa, deploy boshlanadi. `workflow_dispatch` — Actions sahifasidan tugma bilan qo'lda ishga tushirish mumkin. Bu qulay: ba'zida kod o'zgarmagan bo'lsa ham saytni qayta yig'ish kerak bo'ladi.

### 2. Ruxsatlar

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Deploy uchun uchta ruxsat kerak:

- `contents: read` — kodni o'qish.
- `pages: write` — GitHub Pages'ga yozish.
- `id-token: write` — GitHub'ning deploy mexanizmi uchun token.

Bu ruxsatlarsiz deploy ishlamaydi. Ko'p boshlovchilar aynan shu joyda qolib ketadi.

### 3. Muhit

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

`concurrency` — bir vaqtning o'zida bitta deploy ishlashini ta'minlaydi. Agar ikki marta tez-tez push qilsang, ikkinchi deploy birinchisini to'xtatib qo'ymaydi — navbatda kutadi. Sayt yarim yig'ilgan holda qolmaydi.

### 4. Build ishchi

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - run: bun install --frozen-lockfile
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
```

Bu qadamlar CI'dagi kabi boshlanadi, lekin oxirida farq bor: `upload-pages-artifact` — yig'ilgan `dist/` papkasini GitHub Pages uchun artefakt sifatida yuklaydi.

Ya'ni build natijasi vaqtincha saqlanadi, keyingi ish uni olib saytga chiqaradi.

### 5. Deploy ishchi

```yaml
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`needs: build` — deploy faqat build muvaffaqiyatli bo'lsa boshlanadi. Build yiqilsa, eski sayt o'z joyida turadi — buzilgan versiya chiqmaydi.

`environment: github-pages` — GitHub Pages muhiti. `url` — deploy'dan keyin sayt manzili shu yerda ko'rinadi.

## Pull request ochishdan oldin mahalliy tekshiruv

CI bor degani, mahalliy tekshirmaslik mumkin degani emas. Pull request ochishdan oldin har doim shu uchta buyruqni ishga tushirgin:

```bash
bun install
bun run check
bun run build
```

Agar mahalliy build o'tsa, CI ham odatda o'tadi. Agar mahalliy build yiqilsa — CI ham yiqiladi, vaqt ketadi.

## Eng ko'p uchraydigan 5 xato

| Xato | Sababi | Yechimi |
| --- | --- | --- |
| Build mahalliy ishlaydi, CI'da yiqiladi | Lockfile'da versiya farqi | `bun install --frozen-lockfile` ishlat |
| Pages ruxsati yo'q | `permissions`'da `pages: write` yo'q | Deploy workflow'ga qo'sh |
| Sayt oq sahifa ko'rsatadi | `base` yo'li noto'g'ri | `astro.config.mjs`'da `base` ni tekshir |
| Qidiruv ishlamaydi | Pagefind faqat build'da ishlaydi | `bun run preview` bilan tekshir, `dev`'da emas |
| Ikkita deploy to'qnashdi | `concurrency` yo'q | `group: pages` qo'sh |

## Nimalarni commit qilmaslik kerak?

```text
dist/
node_modules/
.astro/
```

Bular build natijasi yoki mahalliy fayllar. Ular repo'ni og'irlashtiradi va deploy'ni buzadi. `.gitignore`'da borligini tekshirgin.

## Xulosa

Yaxshi CI/CD murakkab bo'lishi shart emas:

1. **CI** — har bir push'da tekshir.
2. **Deploy** — faqat `master`'da, faqat build o'tsa.
3. **Frozen lockfile** — versiyalar bir xil bo'lsin.
4. **Ruxsatlar** — har bir workflow'ga faqat kerakli ruxsat.

Bir marta sozlab qo'ysang, keyin har bir maqola va har bir o'zgarish avtomatik, xavfsiz va tez production'ga chiqadi.
