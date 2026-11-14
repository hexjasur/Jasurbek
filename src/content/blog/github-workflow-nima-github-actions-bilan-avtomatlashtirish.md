---
title: "GitHub Workflow nima? GitHub Actions bilan avtomatlaştirişni boşlaş"
description: "GitHub workflow nima va trigger, job, step, runner nimani anglatişini bitta minimal YAML misolida tuşuntiraman. Töliq CI/CD alohida maqolada."
pubDate: 2026-11-11
updatedDate: 2026-11-14
tags: ["github", "devops", "automation", "cicd", "workflow", "astro"]
---

GitHub Actions kodni tekşiriş, build qiliş va deploy qilişni avtomatlaştiradi. Bunday avtomatik jarayon workflow deb ataladi. Bu maqolaning vazifasi bitta: workflow qanday tuzilganini tuşuntiriş. Töliq CI va deploy misoli bu yerda yöq, u [GitHub Actions bilan bepul CI/CD](/blog/github-actions-bepul-ci-cd/) maqolasida.

## Workflow nima?

Workflow — GitHub Actions bilan yozilgan avtomatik jarayon. U ma'lum voqea yuz berganda işga tuşadi: kod push qilinganda, pull request oçilganda, release çiqarilganda, jadval böyiça yoki qölda.

Workflow fayllari repodagi `.github/workflows/` papkasida YAML formatida turadi:

```bash
.github/workflows/ci.yml
.github/workflows/deploy.yml
```

## Asosiy qismlar

### Trigger

`on` bloki workflow qaçon işga tuşişini belgilaydi. Köp işlatiladiganlari: `push`, `pull_request`, `workflow_dispatch` (qölda işga tuşiriş) va `schedule` (jadval).

`branches`, `branches-ignore` va `tags` filtrlari voqeani aniq branch yoki tağga boğlaydi.

### Job

Workflow bir yoki bir neçta job'dan iborat. Har bir job alohida runner'da işlaydi. Job'lar odatda parallel işlaydi. Ketma-ketlik `needs:` bilan beriladi.

Job'lar orasida fayl ötmaydi. Natijani keyingi job'ga beriş uçun artefakt işlatiladi.

### Step

Job içidagi qadamlar ketma-ket bajariladi va bir xil maşinada işlaydi. Step ikki xil böladi:

- `uses` — tayyor action, masalan `actions/checkout@v4`.
- `run` — shell buyruği, masalan `bun run build`.

Biror step xato bersa, job töxtaydi va keyingi step'lar işlamaydi.

### Runner

Runner — job işlaydigan maşina. `runs-on` bilan tanlanadi: `ubuntu-latest`, `windows-latest` va `macos-latest` GitHub'ning tayyor runner'lari. Özingizning self-hosted runner'ingiz ham böliși mumkin.

## Minimal misol

```yaml
name: Hello

on:
  push:
    branches: [ master ]

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Fayllarni körsat
        run: ls -la
```

- `on` — `master`'ga push bölganda işga tuşadi.
- `jobs.hello` — bitta job. `runs-on` uni Ubuntu runner'da işlatadi.
- `uses: actions/checkout@v4` — repo kodini runner'ga nusxalaydi. Bu step bölmasa, runner'dagi papka böş böladi.
- `run: ls -la` — buyruq. Natijasi Actions sahifasidagi logda körinadi.

## Bilişiniz kerak bölgan qoidalar

- YAML'da indentatsiya muhim. Tab emas, böşliq işlating.
- Action'ni versiya bilan yozing: `actions/checkout@v4`.
- Secret'larni YAML yoki `.env` faylga yozmang. `${{ secrets.NAME }}` orqali GitHub Secrets'dan oling.
- `permissions` bilan GITHUB_TOKEN huquqini çeklang. Kerakli minimum: `contents: read`.
- Job'lar orasida fayl saqlanmaydi. Kerak bölsa, artefakt işlating.

## Release: tag böyiça işga tuşiriş

Release uçun odatda tag filtri işlatiladi. Quyidagi trigger `v1.2.0` kabi tag push qilinganda workflow'ni işga tuşiradi:

```yaml
on:
  push:
    tags: [ 'v*.*.*' ]
```

Build, changelog va GitHub release yaratiş alohida step'lar bilan qilinadi. Bu maqola doirasidan taşqarida.

## Keyingi qadam

Git'dan boşlamagan bölsangiz, avval [Git'ni noldan örganing](/blog/git-qollanma/). Haqiqiy loyiha uçun işlaydigan misol: [ci.yml va deploy.yml qator-qator](/blog/github-actions-bepul-ci-cd/).
