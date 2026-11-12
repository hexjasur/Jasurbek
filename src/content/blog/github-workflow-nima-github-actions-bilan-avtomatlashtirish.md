---
title: "GitHub Workflow nima? GitHub Actions bilan avtomatlaştirişni boşlaş"
description: "GitHub Actions orqali kodni tekşiriş, build qiliş va deploy qilişni avtomatlaştirişning asosiy tuşunçalari, YAML şablonlari va amaliy misollar."
pubDate: 2026-11-11
updatedDate: 2026-11-12
tags: ["github", "devops", "automation", "cicd", "workflow", "astro"]
---

Zamonaviy dasturlaşda kod yozişning özi yetarli emas. Har bir commit, pull request yoki release uçun avtomatik tekşiriş, build va deploy qiliş — bu zamonaviy işlab çiquvçi va jamoa uçun standart amaliyotga aylangan.

GitHub Actions orqali buni ança tez, ança töğri va işonçli qiliş mumkin. Bunday avtomatik jarayonlar «GitHub workflow» deb ataladi.

Uşbu maqolada men GitHub workflow nima ekanligini, uning asosiy qismlarini va amaliy misollarni tuşuntiraman. Şuningdek, sizga 1 ta oddiy, 1 ta CI va 1 ta deploy workflowini ham körsataman.

## GitHub workflow nima?

GitHub workflow — bu GitHub Actions yordamida yozilgan avtomatik işlaş sikli. U quyidagilarni bajarişi mumkin:

- kod push qilinganda
- pull request yaratilganda
- release çiqarilganda
- ma'lum vaqt oraliğida
- qölda işga tuşganda

Workflowlar `.github/workflows/` papkasidagi YAML fayllar orqali yoziladi. Har bir workflow qaysi voqeada işga tuşişini, nima bajarilişini va qanday natija qaytarişini aniq belgilaydi.

## Nega workflow kerak?

Agar siz loyiha ustida işlayotgan bölsangiz, workflow quyidagi foydalarni beradi:

- avtomatik test
- lint va format nazorati
- build jarayoni
- deploy qiliş
- release yaratiş
- kod sifati nazorati

Şu sababli workflowni qöşiş — faqat «yaxşi köriniş» emas, balki işlab çiqiş jarayonini işonçli qilişning bir qismidir.

## Workflowning asosiy qismlari

### 1. Trigger

Workflow qaçon işga tuşişini belgilaydi. Masalan:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

Bu misol şuni bildiradi:

- `main` branchga push bölganda
- pull request oçilganda
- workflow avtomatik işga tuşadi

### 2. Jobs

Workflow bir yoki bir neçta jobdan iborat bölişi mumkin. Har bir job alohida vazifani bajaradi.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

Bu qatorda `build` nomli job Ubuntu maşinasida işlaydi.

### 3. Steps

Job içidagi qadamlar bölib, ular quyidagilarni bajarişi mumkin:

- repodan kodni oliş
- environment tayyorlaş
- dependencylarni örnatiş
- test yoki lint işlatiş
- build qiliş
- deploy qiliş

```yaml
steps:
  - uses: actions/checkout@v4

  - name: Install dependencies
    run: npm install
```

### 4. Runner

Runner — workflowni bajaradigan maşina. GitHub taqdim etadigan runnerlar bölişi mumkin:

- ubuntu-latest
- windows-latest
- macos-latest

Şuningdek, siz özingizning self-hosted runnerini ham yaratişingiz mumkin.

## Workflow fayli qayerga yoziladi?

GitHub Actions fayllari odatda quyidagi papka içida böladi:

```bash
.github/workflows/
```

Masalan:

```bash
.github/workflows/ci.yml
.github/workflows/deploy.yml
```

YAML formatida yozilgan workflow quyidagiça körinadi:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run build
        run: npm run build
```

Bu oddiy, ammo juda kuçli workflowdir. U koddagi xatolarni oldindan aniqlaş uçun işlatilişi mumkin.

## Amaliy misol: Astro loyihasi uçun CI workflow

Agar siz Astro yoki boşqa frontend loyihada işlayotgan bölsangiz, quyidagi workflow juda mos keladi:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Run type check
        run: bun run check

      - name: Run build
        run: bun run build
```

Bu workflow qaçon işlaydi?

- `main` branchga push bölganda
- pull request oçilganda

Va nima qiladi?

- repozitoriyadan kod olinadi
- Bun örnatiladi
- dependencylar yuklanadi
- type check bajariladi
- production build işlaydi

Agar bitta qadam ham xato bölsa, workflow fail böladi va sizga xabar keladi. Bu esa kodingizni avtomatik tarzda himoya qiladi.

## Amaliy misol: GitHub Pages deploy

Agar siz statik sayt yaratgan bölsangiz va uni GitHub Pages'ga deploy qilsangiz, workflow quyidagiça böladi:

```yaml
name: Deploy Astro site to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

Bu pattern saytni avtomatik ravişda deploy qilişga yordam beradi. Ya'ni, kod `main` branchga push qilinganda, build işlaydi va sayt yangilanadi.

## Workflow yozişda köpinça uçraydigan holatlar

### 1. `npm install` yoki `bun install`

Loyiha turi asosida dependencylarni örnatiş kerak. Masalan:

```yaml
- run: npm install
```

yoki

```yaml
- run: bun install
```

### 2. Environment setup

Ba'zan Node, Bun, Python yoki .NET örnatilişi kerak böladi:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
```

### 3. Lint va test

Keng işlatiladigan bosqiçlar:

```yaml
- run: npm run lint
- run: npm test
- run: npm run build
```

### 4. Artifact yaratiş

Agar build natijasi saqlanişi kerak bölsa:

```yaml
- uses: actions/upload-artifact@v4
```

Bu yordam beradi, masalan, production build yoki binary fayllarni qayta işlatiş uçun.

## GitHub workflowning foydali turlari

### 1. CI workflow

- lint
- test
- build

### 2. Deploy workflow

- production build
- Pages yoki server deploy

### 3. Release workflow

- version tag
- changelog yaratiş
- executable yoki build fayllar işlab çiqiş

### 4. Rejalaştirilgan (`scheduled`) workflow

- kuniga bir marta ma'lum narsalarni tekşiriş
- backup yoki report generator

### 5. Automated PR checks

- pull request oçilganda test işlaydi
- xatolik bölsa, merge qilişga ruxsat berilmaydi

## Workflow yozişda eng muhim tamoyillar

- workflowlarni kiçik va maqsadga yönaltirilgan qiling
- har bir job bitta vazifani bajarsin
- xatolarni tuşunarli qilib yozing
- secretsni `.env` faylda saqlamang, GitHub Secrets işlatişingiz kerak
- build va deployni ajratib qöying

## Release avtomatlaştiriş: versiya va changelog bilan iş qiliş

Köp dasturçilar uçun eng noqulay jarayonlardan biri şuki, har safar release qiliş uçun bir neça platforma uçun build yaratib, changelog yozib, fayllarni GitHub release'ga yuklaş kerak böladi. Bu jarayon köp vaqt oladi va har safar xatolarga olib kelişi mumkin.

Masalan, desktop loyiha uçun Windows uçun `.exe`, Android uçun `.apk` yoki Linux uçun binary yaratiş kerak bölsa, qölda bajariladigan vazifa bir vaqtning özida köplab bosqiçlarni talab qiladi. Buni GitHub Actions orqali avtomatlaştiriş mumkin.

### Nima uçun bunday workflow kerak?

- release jarayonini özgarmas qiladi
- versiya raqamlarini bir xil tartibda yuritadi
- changelogni avtomatik yaratadi
- build fayllarini bir vaqtning özida töplaşga yordam beradi
- har bir release uçun bir xil hududga yuklaş va naşr qiliş jarayonini bir xil qiladi

### Versiya nazorati nima?

Versiya nazorati deganda odatda `major.minor.patch` formatidagi versiyalar yoki git taglari tuşuniladi. Masalan:

- `v1.2.0`
- `v1.2.1`
- `v2.0.0`

Bunday versiyalar GitHub release va changelog uçun işlatilişi mumkin. Agar loyiha doimiy tarzda yangilanayotgan bölsa, `v1.2.3` kabi format eng qulay variantlardan biridir.

### Release workflowning oddiy sxemasi

1. `main` branch yoki tag körsatilganda workflow boşlanadi.
2. Lint/test/build bajariladi.
3. Binary yoki build artifact yaratiladi.
4. Changelog hosil qilinadi.
5. GitHub release yaratilib, artifactlar yuklanadi.
6. Tag yoki release nomi avtomatik çiqariladi.

### Amaliy misol: tag böyiça avtomatik release

```yaml
name: Release

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm run test -- --run

      - name: Build app
        run: npm run build

      - name: Generate changelog
        run: |
          git log $(git describe --tags --abbrev=0 HEAD^)..HEAD --pretty=format:"* %s" > CHANGELOG.md

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: |
            dist/*
          generate_release_notes: true
          body_path: CHANGELOG.md
```

Bu workflow tag qöşilganda işlaydi. Masalan, siz `v1.2.0` tagini yozsangiz, GitHub avtomatik ravişda release hosil qiladi, build fayllarini yuklaydi va changelog yarata oladi.

### Windows, Android va Linux uçun bir vaqtning özida build

Agar loyiha bir neçta platforma uçun build yaratişi kerak bölsa, GitHub Actions matrixdan foydalaniş mumkin:

```yaml
name: Multi-platform Release

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        include:
          - os: ubuntu-latest
            artifact: app-linux.tar.gz
          - os: windows-latest
            artifact: app-windows.zip
          - os: macos-latest
            artifact: app-macos.zip

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install deps
        run: npm install

      - name: Build project
        run: npm run build

      - name: Package artifact
        run: |
          mkdir -p release
          cp -r dist release/
          tar -czf ${{ matrix.artifact }} -C release .

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.artifact }}
          path: ${{ matrix.artifact }}
```

Bu avtomatik build va artifact yaratişni birinçi bosqiçdan oldin işlatadi. Keyingi bosqiçda esa bu fayllar release'ga yuklanib, umumiy naşrga tayyor böladi.

### Işlatiş jarayoni ança tez

Qölda işlatganda odatda bu jarayonlar ketma-ket bajariladi:

- loyiha lokal build qilinadi
- fayllar topiladi
- changelog yoziladi
- release sahifasi oçiladi
- fayllar yuklanadi
- versiya raqami tayinlanadi

Bularning barçasi bir neça daqiqadan bir neça soatgaça yetişi mumkin. GitHub Actions bilan esa bularning barçasi bir marta workflow bilan avtomatik amalga oşiriladi.

### Nima qiliş kerak?

Agar siz release sodda va işonçli bölişini xohlasangiz, quyidagi oqim yaxşi işlaydi:

- `main` branchda kelişuv bölganda
- yangi tag yoki semver versiyasi oçiladi
- workflow işga tuşadi
- lint/test/build işlaydi
- artifactlar yaratiladi
- GitHub release yaratiladi
- changelog avtomatik qayd qilinadi

Bu nafaqat vaqt tejaydi, balki release jarayonini standartlaştiradi.

## Xulosa

GitHub workflow — bu kodni avtomatik nazorat qiliş va işlab çiqiş jarayonini soddalaştiriş uçun işlatiladigan kuçli vositadir. Bu sizning loyihangiz uçun nafaqat qulay, balki professional işlaş standartidir.

Agar siz kodingizni tez-tez yangilab borayotgan bölsangiz, workflow qöşiş sizga quyidagi imtiyozlarni beradi:

- kamroq qölda iş
- köproq işonç
- tezroq xatoni aniqlaş
- avtomatik deploy
- avtomatik release va changelog
- jamoa bilan yaxşiroq işlaş

Ayniqsa, release avtomatlaştiriş dasturçilar uçun eng foydali workflowlardan biridir. Çunki har safar build qiliş, changelog yoziş va fayllarni yuklaş qölda qiyin va zerikarli iş böladi. GitHub Actions bilan esa bu jarayon bir neça daqiqada bajariladi.

Bundan taşqari, workflowlarni bizning bloglarimizda ham amaliy misollar bilan körsatiş juda yaxşi kirdi. Çunki öquvçilar köpinça «nima?» degan savolni emas, «qanday yoziladi?» degan savolni köproq beradi.
