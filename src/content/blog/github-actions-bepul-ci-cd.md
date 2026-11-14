---
title: "GitHub Actions bilan bepul CI/CD: portfoliödan production'gaça"
description: "Portfolio saytining ci.yml va deploy.yml workflow'larini qator-qator tuşuntiraman: tekşiriş, build va GitHub Pages'ga avtomatik deploy."
pubDate: 2026-11-12
updatedDate: 2026-11-14
tags: ["github-actions", "ci-cd", "github-pages", "astro", "devops"]
---

CI/CD kodni tekşiriş va saytga çiqarişni avtomatlaştiriş. Qölda qilinadigan har bir qadam xato uçun imkoniyat. Bu maqolada şu saytning ikki workflow'ini, `ci.yml` va `deploy.yml` ni, qator-qator körib çiqaman. GitHub Actions'ning asosiy tuşunçalari (trigger, job, step, runner) bilan taniş bölmasangiz, avval [GitHub workflow nima?](/blog/github-workflow-nima-github-actions-bilan-avtomatlashtirish/) maqolasini öqing.

## Qanday işlaydi

1. Kodni `master`dan boşqa branch'ga push qilasiz yoki pull request oçasiz. `ci.yml` tekşiradi: type-check va build.
2. Kod `master`'ga tuşganda `deploy.yml` saytni yiğadi va GitHub Pages'ga çiqaradi.

![CI va deploy jarayoni: branch push va pull request ci.yml ni, master'ga push deploy.yml ni işga tuşiradi, deploy saytni GitHub Pages'ga çiqaradi](/images/blog/github-actions-bepul-ci-cd/pipeline.svg)

## Ikki workflow

| Fayl | Qaçon işlaydi | Vazifasi |
| --- | --- | --- |
| `.github/workflows/ci.yml` | `master`dan boşqa branch'ga push va pull request | Tekşiriş |
| `.github/workflows/deploy.yml` | `master`'ga push va qölda işga tuşiriş | Build va GitHub Pages'ga çiqariş |

Ajratişning sababi: CI har bir branch'da işlaydi va heç narsani çiqarmaydi. Deploy faqat `master`'da işlaydi va özi ham `check` va `build`ni qayta bajaradi, şuning uçun xatoli kod saytga tuşmaydi.

## ci.yml

### 1. Nom va trigger

```yaml
name: CI

on:
  push:
    branches-ignore: [ master ]
  pull_request:
```

`name` Actions sahifasida körinadigan nom. `branches-ignore` `master`dan boşqa barça branch'dagi push'ni oladi. `pull_request` esa har qanday pull request uçun işlaydi.

`master`'ga push bölganda CI işlamaydi, çunki şu push `deploy.yml`ni işga tuşiradi.

### 2. Ruxsat va parallellik

```yaml
permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

`contents: read` — workflow faqat reponi öqiydi, özgartirmaydi. Bu eng kam ruxsat.

`concurrency` — bir branch'da yangi push kelsa, eski tekşiriş töxtatiladi. Eskisining natijasi kerak emas, şuning uçun navbat töplanmaydi.

### 3. Job

```yaml
jobs:
  verify:
    name: Type-check and build
    runs-on: ubuntu-latest
```

`verify` — job identifikatori. `name` — Actions'da körinadigan matn. `runs-on: ubuntu-latest` — job GitHub'ning Ubuntu maşinasida işlaydi.

### 4. Kodni oliş va Bun örnatiş

```yaml
steps:
  - name: Checkout repository
    uses: actions/checkout@v4

  - name: Setup Bun
    uses: oven-sh/setup-bun@v2
    with:
      bun-version: latest
```

`checkout` reponing kodini maşinaga nusxalaydi. Bu qadam bölmasa, runnerda heç qanday fayl bölmaydi.

`setup-bun` Bun'ni örnatadi. `bun-version: latest` eng sönggi versiyani oladi. Bu qulay, ammo Bun'ning yangilanişi build'ni buziş mumkin. Şunday bölsa, versiyani aniq yozing.

### 5. Boğliqliklarni örnatiş

```yaml
- name: Install dependencies
  run: bun install --frozen-lockfile
```

`--frozen-lockfile` `bun.lock` dagi versiyalarni aynan örnatadi. `package.json` va `bun.lock` mos kelmasa, install yiqiladi va lock faylni jim özgartirmaydi.

Bu muhim: mahalliy kompyuterda bir versiya, serverda boşqa versiya bölsa, build bir joyda ötadi, boşqa joyda yiqiladi.

### 6. Type-check va build

```yaml
- name: Type-check (astro check)
  run: bun run check

- name: Build and index search (astro build + pagefind)
  run: bun run build
```

`bun run check` — `astro check`. Astro va TypeScript xatolarini topadi. Xato bölsa, keyingi qadam işlamaydi.

`bun run build` — `astro build` va `pagefind --site dist`. Sahifalar, OG rasmlar, RSS, sitemap va Pagefind qidiruv indeksi yaratiladi. Pagefind indeksi faqat build'da hosil bölgani uçun, qidiruvni sinaş uçun ham build kerak.

## deploy.yml

### 1. Nom va trigger

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]
  workflow_dispatch:
```

`master`'ga push bölsa, deploy boşlanadi. `workflow_dispatch` Actions sahifasidagi «Run workflow» tugmasi uçun. Kod özgarmagan bölsa ham saytni qayta yiğiş kerak bölganda işlatiladi.

### 2. Ruxsat va parallellik

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false
```

- `contents: read` — kodni öqiş.
- `pages: write` — GitHub Pages'ga yoziş. Bu ruxsat bölmasa, deploy-pages qadami rad etiladi.
- `id-token: write` — `deploy-pages` işlatadigan qisqa muddatli token uçun.

`concurrency` ikkita deployni bir vaqtda işga tuşirmaydi. `cancel-in-progress: false` tufayli işlayotgan deploy töxtatilmaydi. Yangi deploy navbatda kutadi, navbatda faqat eng yangi run qoladi.

### 3. Build job

```yaml
jobs:
  build:
    name: Build Astro Site
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Type-check (astro check)
        run: bun run check

      - name: Build static site with Astro
        run: bun run build
        env:
          PUBLIC_REMOVE_BG_KEY: ${{ secrets.PUBLIC_REMOVE_BG_KEY }}
          PUBLIC_POOF_BG_KEY: ${{ secrets.PUBLIC_POOF_BG_KEY }}

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
```

Birinçi beş qadam CI bilan bir xil. Farqi oxirida: `env` ikkita kalitni build vaqtida beradi. Kalitlar GitHub Secrets'da turadi, kodda emas.

Eslatma: `PUBLIC_` prefiksli qiymatlar Astro tomonidan sayt kodiga qöşiladi, ya'ni brauzerda körinadi. Bu yerga maxfiy server kalitini qöymang.

`upload-pages-artifact` `dist/` papkasini deploy job uçun artefaktga yiğadi. Build natijasi şu yerda saqlanadi, keyingi job uni oladi.

### 4. Deploy job

```yaml
  deploy:
    name: Deploy to GitHub Pages
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

`needs: build` — deploy faqat build muvaffaqiyatli tugasa boşlanadi. Build yiqilsa, eski sayt öz holiça qoladi.

`environment: github-pages` deploy tarixini repodagi Environments bölimida körsatadi. `url` — deploy tugagaç sayt manzili.

## Pull request oçişdan oldin mahalliy tekşiriş

CI bölsa ham, mahalliy tekşiriş kerak. Pull request oçişdan oldin şu buyruqlarni işga tuşiring:

```bash
bun install --frozen-lockfile
bun run check
bun run build
```

Mahalliy build ötsa, CI odatda ham ötadi. Mahalliy build yiqilsa, CI ham yiqiladi.

## Eng köp uçraydigan 5 xato

| Xato | Sababi | Yeçimi |
| --- | --- | --- |
| Build mahalliy işlaydi, CI'da yiqiladi | `bun.lock` va örnatilgan versiyalar farqi | `bun install --frozen-lockfile` işlating |
| Pages ruxsati yöq | `permissions`da `pages: write` yöq | Deploy workflow'ga qöşing |
| Sayt oq sahifa körsatadi | `astro.config.mjs`dagi `base` notöğri | `base`ni tekşiring. Bu loyihada `base` yöq, sayt domen ildizida |
| Qidiruv işlamaydi | Pagefind faqat build'da indeks yaratadi | `bun run preview` bilan tekşiring, `dev`da emas |
| Ikkita deploy töqnaşdi | `concurrency` yöq | `group: pages` qöşing |

## Commit qilinmaydigan papkalar

```text
dist/
node_modules/
.astro/
```

Bular build natijasi yoki mahalliy fayllar. `.gitignore`da bor ekanini tekşiring.

## Keyingi qadam

Birinçi pull request'ni oçing va Actions sahifasida `CI` işini kuzating. Mahalliy tekşiriş va CI natijasi bir xil çiqsa, sozlaş töğri işlaydi.
