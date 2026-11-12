---
title: "Git'ni noldan örganing: örnatiş, sozlaş, branch va push"
description: "Git'ni örnatiş, sozlaş, branch yaratiş, commit va GitHub'ga push qiliş böyiça sodda, aniq qöllanma. AI hammuallif belgisi va Git tarixi ham bor."
pubDate: 2026-11-12
tags: ["git", "github", "tutorial", "claude"]
---

Git — kod va fayllaringiz tarixini saqlaydigan dastur. Har safar «saqlab qöydim» deganingizda, Git bir suratga olinadi. Bu suratni **commit** deymiz. Xato qilsangiz, eski holatga qaytiş mumkin.

Bu yozuvda Git'ni noldan örnatiş, sozlaş va asosiy ish oqimini ko'rib chiqamiz.

## Asosiy atamalar

- **Repo** — loyiha va uning butun tarixi saqlanadigan papka.
- **Commit** — bitta «surat» va qisqa xabar.
- **Branch** — asosiy chiziqdan ajratilgan alohida yöl. Git'da u commit'ga ishora qiluvçi nom.
- **HEAD** — hozir qaysi branch yoki commit'da turganingiz.
- **Remote** — repo'ning GitHub'dagi nusxasi. Odatda nomi `origin`.
- **Push / Pull** — push: kompyuterdan GitHub'ga yuborish. Pull: GitHub'dan olish.

## Örnatiş

Git'ni bir marta örnatasiz. Tizimingizni tanlang.

**Windows** (PowerShell yoki Terminal'da):

```bash
winget install --id Git.Git -e --source winget
```

**macOS**:

```bash
# Command Line Tools (ichida git bor)
xcode-select --install

# Homebrew bölsa
brew install git
```

**Linux** (Ubuntu / Debian):

```bash
sudo apt update && sudo apt install -y git
```

Tekşiriş:

```bash
git --version
```

## Sozlaş

Git har commit'ga ismingiz va emailingizni yozib qöyadi. Bu işni bir marta qilasiz:

```bash
git config --global user.name "Ismingiz"
git config --global user.email "siz@misol.com"
```

Ism va email GitHub akkauntingiz bilan bir xil bölsa, commit'lar profilingizga ulanadi.

Sozlamaning uçta darajasi bor:

- `--system` — butun kompyuter uçun. Odatda kerak emas.
- `--global` — siz uçun, barça repo'larda.
- `--local` — faqat shu repo uçun. Eng ustuvor.

Qayerdan kelganini köriş uçun: `git config --list --show-origin`.

### Tayyor skript

Hammasini savollar bilan bir marta sozlaş uçun repo'dagi skriptni işga tuşiring:

```bash
bash scripts/git-setup.sh
```

Skript ism va emailni so'raydi, `main` standart branch nomini, satr oxiri sozlamasini va ixtiyoriy SSH kalitni o'rnatadi.

## AI identifikatori yoki author?

Köp söraladigan savol: commit'da AI nomi çiqsa, bu «author» böladimi? Qisqa javob: yöq.

- **Author** — commit'ni Git'da kim yaratgani. Git buni `user.name` va `user.email` dan biladi. Har commit'da bitta author bor.
- **Committer** — commit'ni repo'ga kiritgan odam. Köpinça author bilan bir xil. Rebase yoki cherry-pick'da farq qilişi mumkin.
- **Co-Authored-By** — commit xabarining oxiridagi qöşimça qator. Hissa qöşgan boşqa odam yoki AI'ni belgilaydi. Bu haqiqiy Git identifikatori emas, shunchaki matn. GitHub uni körib, hammuallif avatarini körsatadi.

Mana misol:

```
Git'ga sozlaş skripti qöşildi

Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_...
```

Xulosa: author — commit'ni Git'da kim yaratgani. Co-Authored-By — qöşimça hissa qöşganlar. AI esa şu yerda hammuallif sifatida yoziladi.

Kim nima qilganini tekşiriş uçun:

```bash
git log --format="%h %an: %s%n%(trailers:key=Co-Authored-By,valueonly)"
```

## Branch va push

Ishni alohida branch'da qiliş yaxshi. Quyidagi buyruqlar bilan branch'larni boşqaring:

```bash
git branch             # röyxat (yulduzça = hozirgisi)
git switch -c Claude   # yangi Claude branch yaratib, unga ötiş
git switch master      # master'ga qaytiş
```

Asosiy ish oqimi har safar şu tartibda:

```bash
git status                       # nima özgarganini köring
git add -A                       # hammasini tayyorlang
git commit -m "Qisqa, aniq xabar" # saqlang
git push -u origin Claude        # GitHub'ga yuboring
```

`-u` faqat birinçi marta kerak. Keyingisida shunchaki `git push`.

Yaxşi commit xabari: «Git sozlaş skripti qöşildi». Yomon xabar: «işladim».

## Git xronologiyasi

- **2002** — Linux yadrosi BitKeeper nomli xususiy versiya boşqaruv tizimidan foydalana boşlaydi.
- **2005, aprel** — BitKeeper'ning bepul litsenziyasi tugaydi. Linus Torvalds Git'ni yozishni boşlaydi. Birinçi commit — 7-aprel.
- **2005, iyul** — Junio Hamano Git'ning boşqaruvini öz zimmasiga oladi.
- **2005, dekabr** — Git 1.0 çiqadi.
- **2008** — GitHub işga tuşadi.
- **2014** — Git 2.0 çiqadi.
- **2018** — Microsoft GitHub'ni sotib oladi.
- **2020** — GitHub yangi repo'lar uçun standart branch nomini `master` dan `main` ga almaştiradi.

Manba: [Git tarixi — git-scm.com](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git)

## Buyruqlar

| Buyruq | Vazifasi |
| :--- | :--- |
| `git --version` | Git örnatilganini tekşiriş |
| `git config --global user.name "Ism"` | Ismni yoziş |
| `git config --global user.email "email"` | Emailni yoziş |
| `git init` | Joriy papkada yangi repo |
| `git clone <url>` | GitHub repo'sini kompyuterga nusxalaş |
| `git status` | Qaysi fayl özgarganini körsatadi |
| `git diff` | Saqlanmagan özgarişlarni körsatadi |
| `git log --oneline --graph --all` | Tarixni çiziq körinişida körsatadi |
| `git blame fayl.md` | Har qatorni kim yozganini körsatadi |
| `git add -A` | Hammasini commit'ga tayyorlaydi |
| `git add fayl.md` | Faqat bitta faylni tayyorlaydi |
| `git commit -m "xabar"` | Özgarişni saqlaydi |
| `git restore --staged fayl.md` | `add` ni bekor qiladi, özgariş qoladi |
| `git restore fayl.md` | **Ehtiyot:** saqlanmagan özgarişni bekor qiladi |
| `git branch` | Branchlar röyxati |
| `git switch -c Claude` | Yangi branch yaratib, unga ötiş |
| `git switch master` | Boşqa branch'ga ötiş |
| `git branch -d nom` | Birlaşgan branch'ni öçiriş |
| `git remote -v` | Remote URL'larni körsatadi |
| `git fetch` | Yangiliklarni oladi, lekin özgartirmaydi |
| `git pull` | Yangiliklarni oladi va birlaştiradi |
| `git push -u origin Claude` | Branch'ni birinçi marta GitHub'ga yuboradi |
| `git stash` | Vaqtinça özgarişlarni yaşiradi |
| `git stash pop` | Yaşirilgan özgarişni qaytaradi |
| `git tag v1.0.0` | Versiyaga belgi qöyadi |
| `git reset --hard` | **Xavfli:** saqlanmagan barça özgarişni öçiradi |
| `git push --force` | **Xavfli:** GitHub tarixini almaştiradi. Örniga `--force-with-lease` işlating |

## Köp uçraydigan xatolar

- **`Author identity unknown`** — Git sizni tanimadi. `git config --global user.name` va `user.email` ni sozlang.
- **`! [rejected] … (fetch first)`** — GitHub'da sizda yöq yangilik bor. Avval `git pull --rebase`, keyin qayta `git push`.
- **`fatal: not a git repository`** — Siz repo papkasida emassiz. `cd` bilan papkani tanlang yoki `git init` qiling.
- **`detached HEAD`** — Siz branch'da emas, eski commit'dasiz. `git switch Claude` bilan qaytiş.
- **`Permission denied (publickey)`** — SSH kalit ulanmagan. `ssh-keygen -t ed25519` qiling va oçiq kalitni GitHub Settings → SSH keys ga qöşing.
