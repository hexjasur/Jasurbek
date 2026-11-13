---
title: "Git'ni noldan o'rganing"
description: "Git'ni o'rnatish, sozlash, branch, commit va push qadamlari: boshlovchilar uchun qadamma-qadam qo'llanma."
pubDate: 2026-11-12
tags: ["git", "github", "boshlovchilar"]
draft: false
---

Bu qo'llanmada Git'ni kompyuteringizga o'rnatishdan boshlab, o'z o'zgarishlaringizni GitHub'ga yuborishgacha bo'lgan jarayonni qadamma-qadam ko'rib chiqamiz. Har bir buyruq qanday ishlashi bilan birga yozilgan, shuning uchun ularni shunchaki nusxalab qo'yish o'rniga nima qilayotganingizni ham tushunasiz.

**Mundarija**

- [1. Git nima?](#1-git-nima)
- [2. O'rnatish](#2-ornatish)
- [3. Sozlash](#3-sozlash)
- [4. Branch](#4-branch)
- [5. Commit va push](#5-commit-va-push)
- [6. Buyruqlar jadvali](#6-buyruqlar-jadvali)
- [7. Ko'p uchraydigan xatolar](#7-kop-uchraydigan-xatolar)
- [8. Tekshiruv](#8-tekshiruv)

## 1. Git nima?

Git — fayllaringizning o'zgarish tarixini saqlab boradigan dastur. Siz kodni yoki matnni o'zgartirib, «hozirgi holatni saqlab qo'yay» deganingizda, Git o'sha paytdagi holatni tarixga yozib qo'yadi. Bu yozuv **commit** deyiladi. Keyinroq xato qilsangiz, eski commit'ga qaytib olishingiz mumkin.

Qo'llanmada ko'p uchraydigan atamalar:

- **Repository (repo):** loyiha va uning butun tarixi joylashgan papka.
- **Commit:** tarixdagi bitta yozuv. Unda nima o'zgargani va qisqa izoh bo'ladi.
- **Branch:** loyihaning alohida nusxa yo'li. Undagi o'zgarishlar asosiy yo'lga ta'sir qilmaydi.
- **Remote:** repo'ning internetdagi nusxasi, ya'ni GitHub. Odatda nomi `origin`.
- **Push:** o'zgarishlaringizni kompyuterdan GitHub'ga yuborish.
- **Pull:** GitHub'dagi yangiliklarni kompyuteringizga olish.

Git qanday paydo bo'lgani qiziqarli. Qisqa tarixi:

<img src="/git/git-timeline.svg" alt="Git tarixi: 2002 dan 2020 gacha bo'lgan asosiy voqealar" />

## 2. O'rnatish

Git'ni kompyuteringizga bir marta o'rnatasiz. Tizimingizni tanlang.

**Windows** (PowerShell yoki Terminal'da):

```bash
winget install --id Git.Git -e --source winget
```

Git Bash ham birga o'rnatiladi. Yoki rasmiy saytdan yuklab oling: [git-scm.com/downloads](https://git-scm.com/downloads)

**macOS:**

```bash
# Command Line Tools (ichida git bor)
xcode-select --install

# Homebrew bo'lsa
brew install git
```

**Linux:**

```bash
# Ubuntu / Debian
sudo apt update && sudo apt install -y git

# Fedora
sudo dnf install -y git
```

O'rnatilganini tekshiring:

```bash
git --version
# natija: git version 2.43.0 (raqam boshqacha bo'lishi mumkin)
```

## 3. Sozlash

Har bir commit'da kim o'zgartirgani yoziladi. Git buni sizning sozlamalaringizdan oladi, shuning uchun ularni bir marta kiritib qo'yasiz:

```bash
git config --global user.name "github-username"
git config --global user.email "siz@misol.com"
```

- `user.name` — GitHub username'ingiz. Masalan, `hexjasur`.
- `user.email` — GitHub akkauntingizga ulangan email.

Email GitHub'dagi bilan bir xil bo'lsa, commit'lar sizning profilingizga bog'lanadi.

Sozlamalar uch darajada saqlanadi:

- `--system` — butun kompyuter uchun. Odatda kerak emas.
- `--global` — sizning barcha loyihalaringiz uchun. Yuqoridagi buyruqlar shu darajada ishlaydi.
- `--local` — faqat bitta repo uchun. Agar bir repo'da boshqa nom kerak bo'lsa, shu yerda o'zgartiriladi.

Joriy sozlamalarni va ular qayerdan kelganini ko'rish uchun: `git config --list --show-origin`

## 4. Branch

Branch — loyihaning alohida nusxa yo'li. Siz ishni shu yo'lda qilasiz, asosiy yo'l (`main` yoki `master`) esa o'zgarmasdan qoladi. Ish tugagach, o'zgarishlarni asosiy yo'lga birlashtirish mumkin.

<img src="/git/git-branch.svg" alt="Branch chizmasi: main asosiy chiziq, ish-branch undan ajralib ketgan, HEAD ish-branch'da turibdi" />

Chizmada `HEAD` — hozir qaysi yo'lda turganingizni ko'rsatadi. Yangi branch yaratish va unga o'tish:

```bash
git branch              # barcha branch'lar ro'yxati (yulduzcha — hozirgisi)
git switch -c ish-branch  # yangi branch yaratib, unga o'tish
git switch main         # asosiy branch'ga qaytish
```

`ish-branch` — misol nom. Branch'ga o'zingiz tushunadigan nom bering, masalan `yangi-maqola` yoki `sozlamalar`.

## 5. Commit va push

Asosiy ish oqimi. O'zgarish qilganingizdan keyin har safar shu tartibda bajaring:

1. `git status` — qaysi fayllar o'zgarganini ko'ring.
2. `git add -A` — o'zgargan fayllarni keyingi commit'ga tayyorlang. Faqat bitta fayl bo'lsa: `git add fayl.md`.
3. `git commit -m "Qisqa, aniq izoh"` — tayyorlangan o'zgarishlarni tarixga yozing.
4. `git push -u origin ish-branch` — commit'ni GitHub'ga yuboring.

```bash
git status
git add -A
git commit -m "Git sozlash skripti qo'shildi"
git push -u origin ish-branch
```

> **Maslahat:** `-u` faqat branch'ni birinchi marta yuborganda kerak. Keyingi safar shunchaki `git push` yetarli.
>
> Yaxshi izoh: «Git sozlash skripti qo'shildi». Yomon izoh: «ishladim».

## 6. Buyruqlar jadvali

**Sozlash**

| Buyruq | Nima qiladi |
|---|---|
| `git --version` | Git o'rnatilganini va versiyasini ko'rsatadi |
| `git config --global user.name "username"` | Commit'larda yoziladigan GitHub username'ingizni saqlaydi |
| `git config --global user.email "email"` | Commit'larda yoziladigan emailingizni saqlaydi |
| `git config --list --show-origin` | Hozirgi sozlamalarni va ular qayerdan kelganini ko'rsatadi |

**Boshlash**

| Buyruq | Nima qiladi |
|---|---|
| `git init` | Joriy papkani Git nazoratiga oladi: ichida yashirin `.git` papkasini yaratadi va shu papkadagi o'zgarishlar tarixini yozishni boshlaydi. Yangi loyihada bir marta ishlatiladi. |
| `git clone <url>` | GitHub'dagi repo'ni tarixi bilan birga kompyuteringizga to'liq ko'chiradi. |

**Ko'rish**

| Buyruq | Nima qiladi |
|---|---|
| `git status` | Qaysi fayllar o'zgarganini va ular commit'ga tayyormi yo'qmi, ko'rsatadi |
| `git diff` | Saqlanmagan o'zgarishlarni qator bo'yicha aniq ko'rsatadi |
| `git log --oneline --graph --all` | Barcha commit'larni qisqa ro'yxat va branch chizig'i bilan ko'rsatadi |
| `git blame fayl.md` | Fayldagi har bir qatorni oxirgi marta kim o'zgartirgani haqida ma'lumot beradi |

**Saqlash**

| Buyruq | Nima qiladi |
|---|---|
| `git add -A` | Barcha o'zgargan fayllarni keyingi commit'ga qo'shishga tayyorlaydi |
| `git add fayl.md` | Faqat bitta faylni commit'ga tayyorlaydi |
| `git commit -m "izoh"` | Tayyorlangan o'zgarishlarni tarixga yozadi |
| `git restore --staged fayl.md` | `git add` buyrug'ini bekor qiladi. Fayldagi o'zgarish joyida qoladi. |
| `git restore fayl.md` | **EHTIYOT:** fayldagi saqlanmagan o'zgarishni o'chirib, oxirgi commit holatiga qaytaradi |

**Branch**

| Buyruq | Nima qiladi |
|---|---|
| `git branch` | Barcha branch'lar ro'yxatini ko'rsatadi. Yulduzcha hozir turgan branch'ni bildiradi. |
| `git switch -c nom` | Yangi branch yaratib, unga o'tadi |
| `git switch main` | Boshqa branch'ga o'tadi |
| `git branch -d nom` | Asosiy branch'ga birlashtirilgan branch'ni o'chiradi |

**GitHub bilan**

| Buyruq | Nima qiladi |
|---|---|
| `git remote -v` | GitHub repo manzilini (`origin`) ko'rsatadi |
| `git fetch` | GitHub'dagi yangiliklarni yuklab oladi, lekin sizning fayllaringizga tegmaydi |
| `git pull` | GitHub'dagi yangiliklarni yuklab, joriy branch'ingizga qo'shadi |
| `git push -u origin nom` | Branch'ni birinchi marta GitHub'ga yuboradi va unga bog'laydi |
| `git push` | Keyingi o'zgarishlarni GitHub'ga yuboradi |

**Vaqtincha saqlash va teg**

| Buyruq | Nima qiladi |
|---|---|
| `git stash` | Saqlanmagan o'zgarishlarni vaqtincha yashiradi, shunda branch toza bo'ladi |
| `git stash pop` | Yashirilgan o'zgarishlarni qaytarib beradi |
| `git tag v1.0.0` | Muhim commit'ga versiya nomini beradi |

**Xavfli buyruqlar**

| Buyruq | Nima qiladi |
|---|---|
| `git reset --hard` | **XAVFLI:** saqlanmagan barcha o'zgarishni butunlay o'chiradi |
| `git push --force` | **XAVFLI:** GitHub'dagi tarixni almashtiradi va boshqalarning ishini o'chirib yuborishi mumkin. O'rniga `git push --force-with-lease` ishlating. |

## 7. Ko'p uchraydigan xatolar

**`Author identity unknown`**
Git sizni tanimadi. Username va emailni kiriting: `git config --global user.name "username"` va `user.email`.

**`! [rejected] … (fetch first)`**
GitHub'da sizda yo'q yangilik bor. Avval `git pull --rebase` buyrug'ini bajarib, keyin qayta `git push` qiling.

**`fatal: not a git repository`**
Siz Git repo'si bo'lmagan papkadasiz. `cd` bilan to'g'ri papkani tanlang yoki papka loyiha bo'lsa, `git init` qiling.

**`You are in 'detached HEAD' state`**
Siz branch'da emas, eski commit'da turibsiz. `git switch ish-branch` bilan branch'ga qaytasiz.

**`Permission denied (publickey)`**
SSH kalit GitHub'ga ulanmagan. `ssh-keygen -t ed25519` bilan kalit yarating va ochiq kalitni GitHub → Settings → SSH and GPG keys bo'limiga qo'shing.

## 8. Tekshiruv

Har bir qadamni tugatganda belgilang:

- [ ] Git o'rnatildi (`git --version` ishlaydi)
- [ ] GitHub username va email sozlandi
- [ ] Repo kompyuterga ko'chirildi (`git clone`)
- [ ] Yangi branch yaratildi (`git switch -c`)
- [ ] Birinchi commit qilindi
- [ ] Commit GitHub'ga yuborildi (`git push`)

## Keyingi qadam: GitHub CLI

Buyruqlar orqali GitHub bilan ishlashni xohlasangiz (masalan, repo yaratish yoki pull request ochish), GitHub CLI (`gh`) o'rnating: [GitHub CLI'ni Windows'ga o'rnatish](/blog/installing-github-cli-on-windows)