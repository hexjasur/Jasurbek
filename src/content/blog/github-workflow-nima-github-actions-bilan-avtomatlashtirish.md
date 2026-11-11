---
title: "GitHub Workflow nima? GitHub Actions bilan avtomatlashtirishni boshlash"
description: "GitHub Actions orqali kodni tekshirish, build qilish va deploy qilishni avtomatlashtirishning asosiy tushunchalari, YAML shablonlari va amaliy misollar."
pubDate: 2026-11-11
updatedDate: 2026-11-11
tags: ["github", "devops", "automation", "cicd", "workflow", "astro"]
---

Zamonaviy dasturlashda kod yozishning o'zi yetarli emas. Har bir commit, pull request yoki release uchun avtomatik tekshirish, build va deploy qilish - bu zamonaviy ishlab chiquvchi va jamoa uchun standart amaliyotga aylangan.

GitHub Actions orqali buni ancha tez, ancha to'g'ri va ishonchli qilish mumkin. Bunday avtomatik jarayonlar "GitHub workflow" deb ataladi.

Ushbu maqolada men GitHub workflow nima ekanligini, uning asosiy qismlarini va amaliy misollarni tushuntiraman. Shuningdek, sizga 1 ta oddiy, 1 ta CI va 1 ta deploy workflowini ham ko'rsataman.

## GitHub workflow nima?

GitHub workflow - bu GitHub Actions yordamida yozilgan avtomatik ishlash sikli. U quyidagilarni bajarishi mumkin:

- kod push qilinganda
- pull request yaratilganda
- release chiqarilganda
- ma'lum vaqt oralig'ida
- qo'lda ishga tushganda

Workflowlar `.github/workflows/` papkasidagi YAML fayllar orqali yoziladi. Har bir workflow qaysi voqeada ishga tushishini, nima bajarilishini va qanday natija qaytarishini aniq belgilaydi.

## Nega workflow kerak?

Agar siz loyiha ustida ishlayotgan bo'lsangiz, workflow quyidagi foydalarni beradi:

- avtomatik test
- lint va format nazorati
- build jarayoni
- deploy qilish
- release yaratish
- kod sifati nazorati

Shu sababli workflowni qo'shish - faqat "yaxshi ko'rinish" emas, balki ishlab chiqish jarayonini ishonchli qilishning bir qismidir.

## Workflowning asosiy qismlari

### 1. Trigger

Workflow qachon ishga tushishini belgilaydi. Masalan:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

Bu misol shuni bildiradi:

- `main` branchga push bo'lganda
- pull request ochilganda
- workflow avtomatik ishga tushadi

### 2. Jobs

Workflow bir yoki bir nechta jobdan iborat bo'lishi mumkin. Har bir job alohida vazifani bajaradi.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

Bu xatda `build` nomli job Ubuntu mashinasida ishlaydi.

### 3. Steps

Job ichidagi qadamlar bo'lib, ular quyidagilarni bajarishi mumkin:

- repodan kodni olish
- environment tayyorlash
- dependencylarni o'rnatish
- test yoki lint ishlatish
- build qilish
- deploy qilish

```yaml
steps:
  - uses: actions/checkout@v4

  - name: Install dependencies
    run: npm install
```

### 4. Runner

Runner - workflowni bajaradigan mashina. GitHub taqdim etadigan runnerlar bo'lishi mumkin:

- ubuntu-latest
- windows-latest
- macos-latest

Shuningdek, siz o'zingizning self-hosted runnerini ham yaratishingiz mumkin.

## Workflow faylini qayerga yoziladi?

GitHub Actions fayllari odatda quyidagi papka ichida bo'ladi:

```bash
.github/workflows/
```

Masalan:

```bash
.github/workflows/ci.yml
.github/workflows/deploy.yml
```

YAML formatida yozilgan workflow quyidagicha ko'rinadi:

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

Bu oddiy, ammo juda kuchli workflowdir. U koddagi xatolarni oldindan aniqlash uchun ishlatilishi mumkin.

## Amaliy misol: Astro loyihasi uchun CI workflow

Agar siz Astro yoki boshqa frontend loyihada ishlayotgan bo'lsangiz, quyidagi workflow juda mos keladi:

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

Bu workflow qachon ishlaydi?

- `main` branchga push bo'lganda
- pull request ochilganda

Va nima qiladi?

- repozitoriyadan kod olinadi
- Bun o'rnatiladi
- dependencylar yuklanadi
- type check bajariladi
- production build ishlaydi

Agar bitta qadam ham xato bo'lsa, workflow fail bo'ladi va sizga xabar keladi. Bu esa kodingizni avtomatik tarzda himoya qiladi.

## Amaliy misol: GitHub Pages deploy

Agar siz statik site yaratgan bo'lsangiz va uni GitHub Pages ga deploy qilsangiz, workflow quyidagicha bo'ladi:

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

Bu pattern saytni avtomatik ravishda deploy qilishga yordam beradi. Ya'ni, kod main branchga push qilinganda, build ishlaydi va sayt yangilanadi.

## Workflow yozishda ko'pincha uchraydigan holatlar

### 1. `npm install` yoki `bun install`

Loyiha turi asosida dependencylarni o'rnatish kerak. Masalan:

```yaml
- run: npm install
```

yoki

```yaml
- run: bun install
```

### 2. Environment setup

Ba'zan Node, Bun, Python yoki .NET o'rnatilishi kerak bo'ladi:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
```

### 3. Lint va test

Keng ishlatiladigan bosqichlar:

```yaml
- run: npm run lint
- run: npm test
- run: npm run build
```

### 4. Artifact yaratish

Agar build natijasi saqlanishi kerak bo'lsa:

```yaml
- uses: actions/upload-artifact@v4
```

Bu yordam beradi, masalan, production build yoki binary fayllarni qayta ishlatish uchun.

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
- changelog yaratish
- executable yoki build fayllar ishlab chiqish

### 4. Scheduled workflow

- kuniga bir marta ma'lum narsalarni tekshirish
- backup yoki report generator

### 5. Automated PR checks

- pull request ochilganda test ishlaydi
- xatolik bo'lsa, merge qilishga ruxsat berilmaydi

## Workflow yozishda eng muhim tamoyillar

- workflowlarni kichik va maqsadga yo'naltirilgan qiling
- har bir job bitta vazifani bajarsin
- xatolarni tushunarli qilib yozing
- secretsni `.env` faylda saqlamang, GitHub Secrets ishlatishingiz kerak
- build va deployni ajratib qo'ying

## Release avtomatlashtirish: versiya va changelog bilan ish qilish

Ko'p dasturchilar uchun eng noqulay jarayonlardan biri shuki, har safar release qilish uchun bir necha platforma uchun build yaratib, changelog yozib, fayllarni GitHub releasega yuklash kerak bo'ladi. Bu jarayon ko'p vaqt oladi va har safar xatolarga olib kelishi mumkin.

Masalan, desktop loyiha uchun Windows uchun `.exe`, Android uchun `.apk` yoki Linux uchun binary yaratish kerak bo'lsa, qo'lda bajariladigan vazifa bir vaqtni o'zida ko'plab bosqichlarni talab qiladi. Buni GitHub Actions orqali avtomatlashtirish mumkin.

### Nima uchun bunday workflow kerak?

- release jarayonini o'zgarmas qiladi
- versiya raqamlarini bir xil tartibda yuritadi
- changelogni avtomatik yaratadi
- build fayllarini bir vaqtning o'zida to'plashga yordam beradi
- har bir release uchun bir xil hududga yuklash va nashr qilish jarayonini bir xil qiladi

### Versiya nazorati nima?

Versiya nazorati deganda odatda `major.minor.patch` formatidagi versiyalar yoki git taglari tushuniladi. Masalan:

- `v1.2.0`
- `v1.2.1`
- `v2.0.0`

Bunday versiyalar GitHub release va changelog uchun ishlatilishi mumkin. Agar loyiha doimiy tarzda yangilanayotgan bo'lsa, `v1.2.3` kabi format eng qulay variantlardan biridir.

### Release workflowning oddiy sxemasi

1. `main` branch yoki tag ko'rsatilganda workflow boshlanadi.
2. Lint/test/build bajariladi.
3. Binary yoki build artifact yaratiladi.
4. Changelog hosil qilinadi.
5. GitHub release yaratilib, artifactlar yuklanadi.
6. Tag yoki release nomi avtomatik chiqariladi.

### Amaliy misol: tag bo'yicha avtomatik release

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

Bu workflow tag qo'shilganda ishlaydi. Masalan, siz `v1.2.0` tagini yozsangiz, GitHub avtomatik ravishda release hosil qiladi, build fayllarini yuklaydi va changelog yarata oladi.

### Windows, Android va Linux uchun bir vaqtning o'zida build

Agar loyiha bir nechta platforma uchun build yaratishi kerak bo'lsa, GitHub Actions matrixdan foydalanish mumkin:

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

Bu avtomatik build va artifact yaratishni birinchi bosqichdan oldin ishlatadi. Keyingi bosqichda esa bu fayllar releasega yuklanib, umumiy nashrga tayyor bo'ladi.

### Ishlatish jarayoni ancha tez

Qo'lda ishlatganda odatda bu jarayonlar ketma-ket bajariladi:

- loyiha lokal build qilinadi
- fayllar topiladi
- changelog yoziladi
- release sahifasi ochiladi
- fayllar yuklanadi
- versiya raqami tayinlanadi

Bularning barchasi bir necha daqiqadan bir necha soatgacha yetishi mumkin. GitHub Actions bilan esa bularning barchasi bir marta workflow bilan avtomatik amalga oshiriladi.

### Nima qilish kerak?

Agar siz release sodda va ishonchli bo'lishini xohlasangiz, quyidagi oqim yaxshi ishlaydi:

- `main` branchda kelishuv bo'lganda
- yangi tag yoki semver versiyasi ochiladi
- workflow ishga tushadi
- lint/test/build ishlaydi
- artifactlar yaratiladi
- GitHub release yaratiladi
- changelog avtomatik qayd qilinadi

Bu nafaqat vaqt tejaydi, balki release jarayonini standartlashtiradi.

## Xulosa

GitHub workflow - bu kodni avtomatik nazorat qilish va ishlab chiqish jarayonini soddalashtirish uchun ishlatiladigan kuchli vositadir. Bu sizning loyihangiz uchun nafaqat qulay, balki professional ishlash standartidir.

Agar siz kodingizni tez-tez yangilab borayotgan bo'lsangiz, workflow qo'shish sizga quyidagi imtiyozlarni beradi:

- kamroq qo'lda ish
- ko'proq ishonch
- tezroq xatoni aniqlash
- avtomatik deploy
- avtomatik release va changelog
- jamoa bilan yaxshiroq ishlash

Ayniqsa, release avtomatlashtirish dasturchilar uchun eng foydali workflowlardan biridir. Chunki har safar build qilish, changelog yozish va fayllarni yuklash qo'lda qiyin va zerikarli ish bo'ladi. GitHub Actions bilan esa bu jarayon bir necha daqiqada bajariladi.

Bundan tashqari, workflowlarni bizning bloglarimizda ham amaliy misollar bilan ko'rsatish juda yaxshi kirdi. Chunki o'quvchilar ko'pincha "nima?" degan savolni emas, "qanday yoziladi?" degan savolni ko'proq beradi.
