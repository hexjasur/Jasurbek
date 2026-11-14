---
title: "GitHub Actions bilan bepul CI/CD: portfoliödan production'gaça"
description: "GitHub Actions yordamida portfolio va blog uçun bepul CI/CD quriş — ci.yml va deploy.yml'ni qator-qator tuşuntiriş, tekşiruv, build va GitHub Pages'ga avtomatik deploy."
pubDate: 2026-11-12
updatedDate: 2026-11-14
tags: ["github-actions", "ci-cd", "github-pages", "astro", "devops"]
---

## CI/CD nima va nega kerak?

CI/CD — bu kodni tekşiriş va saytga çiqarişni avtomatlaştiriş. Qölda qiladigan har bir qadam — xato qiliş uçun imkoniyat.

Portfoliöda CI/CD bölmasa, odatda şunday böladi: kodni yozasan, build qilişni unatasan, sayt buzilganini bir hafta keyin bilasan.

CI/CD bölsa, tartib sade:

1. Kodni branch'ga push qilasan.
2. GitHub avtomatik tekşiradi: type-check, build, qidiruv indeksi.
3. Hammasi joyida bölsa — `master`'ga push qilişing bilan sayt özi yangilanadi.

Ya'ni sen faqat kod yozasan, qolganini maşina bajaradi. Va bularning hammasi şaxsiy portfolio uçun bepul.

## Loyihada ikki workflow bor

Bu loyihada ikkita workflow işlatiladi:

| Fayl | Qaçon işlaydi | Vazifasi |
| --- | --- | --- |
| `.github/workflows/ci.yml` | `master`'dan boşqa branch'ga push, pull request | Tekşiruv |
| `.github/workflows/deploy.yml` | `master`'ga push, qölda işga tuşiriş | Build + GitHub Pages'ga çiqariş |

Ajratişning sababi sade: tekşiruvdan ötmagan kod production'ga çiqmasligi kerak.

## ci.yml: qator-qator tuşuntiriş

Keling, tekşiruv workflow'ni qismlarga bölib köramiz.

### 1. Nom va işga tuşiş şarti

```yaml
name: CI
on:
  push:
    branches-ignore: [master]
  pull_request:
```

`name` — Actions sahifasida körinadigan nom. `on` — workflow qaçon işlaydi.

Bu yerda qoida şunday: `master`'dan boşqa har qanday branch'ga push bölsa, yoki pull request oçilsa — tekşiruv boşlanadi. `master`'ning özi bu yerda tekşirilmaydi, çunki u deploy workflow'ning işi.

### 2. Ruxsatlar va muhit

```yaml
permissions:
  contents: read
```

Tekşiruv workflow'ga faqat öqiş ruxsati kerak. U heç narsani özgartirmaydi, faqat tekşiradi. Bu xavfsizlik uçun yaxşi odat: har bir workflow'ga faqat kerakli ruxsatni ber.

### 3. Iş muhiti

```yaml
jobs:
  check:
    runs-on: ubuntu-latest
```

`jobs` — bajariladigan işlar röyxati. Bu yerda bitta iş bor: `check`.

`runs-on: ubuntu-latest` — iş GitHub'ning Ubuntu serverida işlaydi. Portfolio uçun Linux yetarli, tez va bepul.

### 4. Kodni oliş va Bun örnatiş

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
```

Har bir workflow ikki qadamdan boşlanadi:

- `checkout` — repödagi kodni serverga yuklaydi.
- `setup-bun` — Bun'ni örnatadi, çunki loyiha Bun bilan işlaydi.

Agar loyiha pnpm yoki npm'da bölsa, bu qadam özgaradi, mantiq esa bir xil: avval kod, keyin package manager.

### 5. Boğliqliklarni örnatiş

```yaml
      - run: bun install --frozen-lockfile
```

`--frozen-lockfile` — juda muhim flag. U `bun.lock` faylidagi versiyalarni aynan örnatadi.

Nega kerak? Mahalliy kompyuteringda bir versiya, serverda boşqa versiya bölsa — build bir joyda işlaydi, bir joyda işlamaydi. Frozen lockfile şu muammoni yöq qiladi.

### 6. Type-check va build

```yaml
      - run: bun run check
      - run: bun run build
```

Bu ikki qadam — tekşiruvning yuragi:

- `check` — Astro va TypeScript xatolarini topadi. Tip xato bölsa, build'ga ham ötilmaydi.
- `build` — saytni töliq yiğadi: sahifalar, OG rasmlar, RSS, sitemap va Pagefind qidiruv indeksi.

Agar şu ikki qadamdan biri yiqilsa — pull request'ni merge qilişdan oldin xatoni bilasan.

## deploy.yml: qator-qator tuşuntiriş

Deploy workflow faqat `master`'da işlaydi.

### 1. Işga tuşiş şarti

```yaml
name: Deploy
on:
  push:
    branches: [master]
  workflow_dispatch:
```

`push` — `master`'ga push bölsa, deploy boşlanadi. `workflow_dispatch` — Actions sahifasidan tugma bilan qölda işga tuşiriş mumkin. Bu qulay: ba'zida kod özgarmagan bölsa ham saytni qayta yiğiş kerak böladi.

### 2. Ruxsatlar

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Deploy uçun uçta ruxsat kerak:

- `contents: read` — kodni öqiş.
- `pages: write` — GitHub Pages'ga yoziş.
- `id-token: write` — GitHub'ning deploy mexanizmi uçun token.

Bu ruxsatlarsiz deploy işlamaydi. Köp boşlovçilar aynan şu joyda qolib ketadi.

### 3. Muhit

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

`concurrency` — bir vaqtning özida bitta deploy işlaşini ta'minlaydi. Agar ikki marta tez-tez push qilsang, ikkinçi deploy birinçisini töxtatib qöymaydi — navbatda kutadi. Sayt yarim yiğilgan holda qolmaydi.

### 4. Build işçi

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

Bu qadamlar CI'dagi kabi boşlanadi, lekin oxirida farq bor: `upload-pages-artifact` — yiğilgan `dist/` papkasini GitHub Pages uçun artefakt sifatida yuklaydi.

Ya'ni build natijasi vaqtinça saqlanadi, keyingi iş uni olib saytga çiqaradi.

### 5. Deploy işçi

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

`needs: build` — deploy faqat build muvaffaqiyatli bölsa boşlanadi. Build yiqilsa, eski sayt öz joyida turadi — buzilgan versiya çiqmaydi.

`environment: github-pages` — GitHub Pages muhiti. `url` — deploy'dan keyin sayt manzili şu yerda körinadi.

## Pull request oçişdan oldin mahalliy tekşiruv

CI bor degani, mahalliy tekşirmaslik mumkin degani emas. Pull request oçişdan oldin har doim şu uçta buyruqni işga tuşirgin:

```bash
bun install
bun run check
bun run build
```

Agar mahalliy build ötsa, CI ham odatda ötadi. Agar mahalliy build yiqilsa — CI ham yiqiladi, vaqt ketadi.

## Eng köp uçraydigan 5 xato

| Xato | Sababi | Yeçimi |
| --- | --- | --- |
| Build mahalliy işlaydi, CI'da yiqiladi | Lockfile'da versiya farqi | `bun install --frozen-lockfile` işlat |
| Pages ruxsati yöq | `permissions`'da `pages: write` yöq | Deploy workflow'ga qöş |
| Sayt oq sahifa körsatadi | `base` yöli notöğri | `astro.config.mjs`'da `base` ni tekşir |
| Qidiruv işlamaydi | Pagefind faqat build'da işlaydi | `bun run preview` bilan tekşir, `dev`'da emas |
| Ikkita deploy töqnaşdi | `concurrency` yöq | `group: pages` qöş |

## Nimalarni commit qilmaslik kerak?

```text
dist/
node_modules/
.astro/
```

Bular build natijasi yoki mahalliy fayllar. Ular repöni oğirlaştiradi va deploy'ni buzadi. `.gitignore`'da borligini tekşirgin.

## Xulosa

Yaxşi CI/CD murakkab bölişi şart emas:

1. **CI** — har bir push'da tekşir.
2. **Deploy** — faqat `master`'da, faqat build ötsa.
3. **Frozen lockfile** — versiyalar bir xil bölsin.
4. **Ruxsatlar** — har bir workflow'ga faqat kerakli ruxsat.

Bir marta sozlab qöysang, keyin har bir maqola va har bir özgariş avtomatik, xavfsiz va tez production'ga çiqadi.
