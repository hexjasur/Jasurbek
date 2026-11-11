---
title: "Claude'da model va effort tanlaş: git commit'dan katta promptlargaça amaliy qöllanma"
description: "2026-yil 8-noyabr holatiga: Haiku 5.5, Sonnet 5.5, Opus 5.5 va Fable 5.1 ni qaçon tanlaş kerak, effort'ning low'dan max'gaça darajalari nima beradi, oddiy va murakkab misollar, narx hisobi hamda işçi kod."
pubDate: 2026-11-09
updatedDate: 2026-11-09
tags: ["anthropic", "claude", "ai", "llm", "api", "effort"]
---

> **Holat sanasi:** 2026-yil 8-noyabr. Model lineup'i, narxlar va effort qoidalari tez özgaradi. Production'ga qaror qilişdan oldin [rasmiy effort sahifasi](https://platform.claude.com/docs/en/build-with-claude/effort)ni qayta oçib tekşiring. Rasmiy manbadan olingan gaplar manbasi bilan berilgan, öz hisoblarim va tavsiyalarim alohida belgilangan.

«Qaysi Claude modelini işlatay?» degan savol yarim savol. Claude'da ikkita boşqaruv bor:

1. **Model** — qaysi «miya» (Haiku, Sonnet, Opus, Fable).
2. **Effort** — şu miya bu vazifaga qançalik köp mehnat sarflaydi (`low` dan `max` gaça).

Bir xil model `low` da ham, `max` da ham işlay oladi. Narx, tezlik va sifat esa ikkalasining yiğindisiga boğliq. Bu maqolada ikkala boşqaruvni birga tanlaşni oddiy vazifadan (git commit xabari) katta promptli uzoq agent seansigaça misollar bilan körib çiqaman.

Modellarning özi, çiqiş sanalari va benchmarklar haqida [oldingi maqolamda](/blog/anthropic-claude-modellari-benchmark-2026) batafsil yozganman. Bu yerda faqat tanlaş masalasi.

## Qisqaça: vazifaga qarab model va effort

Quyidagi jadval — **mening tavsiyam**, rasmiy qoida emas. Rasmiy tavsiyalar keyingi bölimlarda alohida körsatilgan.

| Vazifa | Model | Effort | Nima uçun |
| :-- | :-- | :-- | :-- |
| Git commit xabari yoziş | Haiku 5.5 | `low` | Tor, aniq, kiçik kiriş |
| Klassifikatsiya, triage, ekstraksiya | Haiku 5.5 | `low`, qiyinroqda `medium` | Yuqori hajm, narx muhim |
| «Testni yurgiz, ötsa push qil» kabi tekşiruvli ketma-ketlik | Haiku 5.5 yoki Sonnet 5.5 | `medium` | `low` da tekşiruvni taşlab ketişi mumkin |
| Chat javoblari | Sonnet 5.5 | `low` yoki `medium` | Tezlik muhim |
| Aniq tavsiflangan kiçik bug fix | Sonnet 5.5 | `medium` | Yetarli aqlli, arzon |
| Köp faylli refactor, qiyin bug | Sonnet 5.5 | `high` | Köproq öylaş kerak |
| Noaniq, xavfli yoki uzoq davom etadigan vazifa | Opus 5.5 | `high`, keyin `xhigh` | Ketma-ket qaror qabul qilişda kuçliroq |
| 30 daqiqadan uzoq agent, millionlab token | Opus 5.5 yoki Fable 5.1 | `xhigh` | Uzoq muddatli iş uçun möljallangan daraja |
| Eng qiyin masalalar, narx ikkinçi darajali | Fable 5.1 | `xhigh` yoki `max` | Eng yuqori qatlam |

Qoida: **pastdan boşlang, eval'da çiqmasa yuqoriga çiqing.** Pastdan boşlaş arzon, yuqoridan boşlab tuşiş esa köpinça unutiladi.

## Effort nima va nima emas

### Rasmiy holat (GA va beta)

[Rasmiy effort sahifasi](https://platform.claude.com/docs/en/build-with-claude/effort) böyiça:

- Effort Messages API'da `output_config.effort` orqali beriladi. Qiymat bermasangiz, modelning standart darajasi qöllanadi.
- Yuqori darajadagi (top-level) effort «barça qöllab-quvvatlanadigan modellarda beta header'siz» mavjud, ya'ni **GA**.
- **Suhbat içida effort özgartiriş** (per-message effort) hali **beta**: `mid-conversation-output-config-2026-07-01` header'i kerak.
- Claude Haiku 4.5 va Claude Sonnet 4.5 effort'ni qöllab-quvvatlamaydi.

Sahifada aniq «as of» sanasi yöq. Lekin Fable 5.1, Mythos 5.1 va Opus 5.5 ni joriy modellar sifatida sanaydi, şuning uçun bu maqola yozilgan lineup'ga mos.

### Beş daraja

| Daraja | Rasmiy tavsif (qisqartirilgan) | Odatiy qöllanilişi |
| :-- | :-- | :-- |
| `max` | Token sarfiga çeklovsiz, maksimal qobiliyat | Eng çuqur tahlil |
| `xhigh` | Uzoq muddatli (long-horizon) iş uçun kengaytirilgan qobiliyat | 30 daqiqadan uzoq agentic va kodlaş vazifalari |
| `high` | Vazifa talab qilgança token sarflaydi, ajoyib natija uçun | Murakkab mulohaza, qiyin kodlaş |
| `medium` | Muvozanatli, mötadil token tejaş | Tezlik, narx va sifat orasidagi agentic vazifalar |
| `low` | Eng samarali: sezilarli tejaş, qobiliyat bir oz kamayadi | Oddiy vazifalar, subagentlar |

Qaysi model qaysi darajani qöllab-quvvatlaydi (rasmiy sahifa):

- `max`: Fable 5.1, Mythos 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5 va ilgari çiqqan bir qança model.
- `xhigh`: Fable 5.1, Mythos 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5 va ilgari çiqqan bir qança model. `max` ni qöllaydigan har bir model `xhigh` ni qöllamaydi (masalan, Sonnet 4.6).
- `high`, `medium`, `low`: effort'ni qöllaydigan barça modellarda.

### Standart daraja modelga qarab farq qiladi

| Model | API'dagi standart effort |
| :-- | :-- |
| Opus 5.5 | `medium` |
| Haiku 5.5 | `medium` |
| Sonnet 5.5 va köpçilik boşqalar | `high` |

Muhim nuans: Opus 5.5 da `effort` ni yozmasangiz, sörov Opus 5 ga qaraganda **bir daraja pastda** işlaydi (Opus 5 standarti `high` edi). Opus 5 dan köçib ötganda sifat «sababsiz» pasaysa, avval şunga qarang.

Sonnet 5.5, Haiku 5.5 va Opus 5.5 ning Claude Code'dagi standart darajasi haqidagi gap (hammasida `medium`) faqat ikkinçi darajali manbada ([Developers Digest](https://www.developersdigest.tech/blog/claude-opus-5-5-vs-sonnet-5-5-vs-haiku-5-5), 2026-10-08) bor. Rasmiy Claude Code hujjatini oça olmadim, şuning uçun buni tasdiqlangan deb hisoblamang.

### Effort nima emas

- **Qat'iy token budjeti emas.** Rasmiy sahifa uni «xulq signali» deb ataydi: past darajada Claude öşa masalada kamroq öylaydi, lekin yetarliça qiyin masalada baribir öylaydi.
- **Faqat thinking'ga tegişli emas.** U barça çiqiş tokenlariga ta'sir qiladi: matn, tool call'lar va ularning argumentlari, thinking. Past effort'da tool call'lar kamroq va qisqaroq bölişi mumkin, yuqorida köproq va tafsilotliroq.
- **Thinking'ni öçirib qöyiş emas.** Opus 5.5 da thinking öçirib bölmaydi: `thinking: {"type": "disabled"}` har qanday effort'da 400 qaytaradi. Sarfni effort bilan boşqarasiz.
- **Raqamli va'da emas.** Hujjatda `low` va `medium` uçun «sezilarli» va «mötadil» tejaş deyilgan, lekin aniq foiz, keçikiş yoki narx raqami yöq. Men ham özimdan raqam çiqarmadim.

## Qaysi model nimaga mos

Narxlar 1M token uçun (kiriş / çiqiş). Opus 5.5, Sonnet 5.5 va Haiku 5.5 narxlari rasmiy sahifalardan, Fable 5.1 narxi ikkinçi darajali manbadan ([Vellum](https://www.vellum.ai/blog/claude-fable-5-1-mythos-5-1-benchmarks-explained)) olingan.

| Model | Narx | Rasmiy effort tavsiyasi |
| :-- | :-- | :-- |
| Haiku 5.5 | $0.10 / $0.50 (prompt ≤ 100k), $0.50 / $2.50 (100k dan uzun) | Standart `medium`. Chat va oddiy yuqori hajmli iş uçun `low`. |
| Sonnet 5.5 | $2 / $10 | `high` dan boşlang. Aniq tavsiflangan agentic kodlaş uçun `medium`dan, chat uçun `medium` yoki `low` dan boşlang. |
| Opus 5.5 | $4 / $20 | Standart `medium`. Thinking öçirib bölmaydi. |
| Fable 5.1 | $10 / $50 | `high` dan boşlang. Kuçli talab qilinadigan agentic va kodlaş işida `xhigh` yoki `max`, oddiy işda eval ötsa `medium` yoki `low`. |

Haiku haqida muhim ogohlantiriş (rasmiy sahifadan): uzun agent promptlarida `low` darajada Haiku 5.5 «qidiruvni taşlab ketişi, erta töxtaşi yoki tekşiruvni qoldiriş» ehtimoli yuqoriroq.

Sonnet 5.5 uçun yana: agentic kodlaşda `max_tokens` ni 128 000 ga qöyib, stream qilişni tavsiya qiladi. Sonnet 5.5 kontekst oynasi 1M token (rasmiy Sonnet sahifasi). Qolgan modellar uçun kontekst hajmi e'lon sahifalarida körsatilmagan, şuning uçun taxmin qilmadim.

## Oddiy misollar

### 1. «Git commit xabari yoz»

Vazifa: 3 000 tokenlik diff'ga qarab bir qator commit xabari yoziş.

- **Tavsiyam:** Haiku 5.5, `low`.
- **Nima uçun:** tor vazifa, javob qisqa, xato qimmatga tuşmaydi (xabarni qayta yozişingiz mumkin).
- **Narx (öz hisobim):** 3 000 kiriş va 150 çiqiş token deb faraz qilsak, Haiku 5.5 da ≈ $0.0004, Sonnet 5.5 da ≈ $0.0075. Farq 20 baravar, lekin ikkalasi ham tiyin.

Bu yerda eng muhim sabab narx emas, tezlik: bu vazifani kutib turmaysiz.

### 2. «Testni yurgiz, ötsa push qil»

Bu boşqa hayvon. Model faqat xabar yozmaydi, ketma-ketlik bajaradi: testni yurgizadi, natijani öqiydi, keyin qaror qiladi.

- **Tavsiyam:** Haiku 5.5 yoki Sonnet 5.5, `medium`. `low` dan qoçing.
- **Nima uçun:** rasmiy ogohlantiriş — Haiku 5.5 `low` da tekşiruvni taşlab ketişi mumkin. Bu «testlarni tekşirmay push qildi» degani bölişi mumkin.
- **Qöşimça (mening fikrim):** `push` tavsiyasi model tanlovidan muhimroq. `main` ga force push qilişga ruxsatni model emas, siz (yoki tizim ruxsatlari) boşqaring.

### 3. Klassifikatsiya va triage

Vazifa: kelgan 10 000 ta murojaatni «xato / savol / taklif» ga bölib çiqiş.

- **Tavsiyam:** Haiku 5.5, `low`. Eval'da aniqlik yetmasa — `medium`, keyin Sonnet 5.5 `low`.
- **Nima uçun:** yuqori hajm, har bir javob qisqa, narx tez yiğiladi. Haiku bu uçun möljallangan.

### 4. Kiçik, aniq bug fix

Vazifa: «`parseDate` UTC'da notöğri qaytaradi, mana test» kabi aniq tavsiflangan xato.

- **Tavsiyam:** Sonnet 5.5, `medium`.
- **Nima uçun:** rasmiy sahifa aniq tavsiflangan agentic kodlaş uçun `medium` dan boşlaşni tavsiya qiladi. Vazifa aniq bölsa, ortiqça öylaşga pul tölamaysiz.

## Murakkab misollar

### 5. Köp faylli refactor

Vazifa: 30 ta faylda bir API'ni almaştiriş, tiplarni yangilaş, testlarni yurgizib tuzatiş.

- **Tavsiyam:** Sonnet 5.5, `high`. `max_tokens` ni katta qöying (rasmiy: agentic kodlaş uçun 128 000) va stream qiling.
- **Nima uçun:** köp fayl orasidagi boğliqlikni uşlab turiş kerak, `medium` da qadam taşlab ketiş ehtimoli oşadi.
- **Eskalatsiya:** `high` da ham xato köp bölsa — Opus 5.5 `high`.

### 6. Noaniq arxitektura qarori yoki uzoq agent seansi

Vazifa: «monolitni xizmatlarga böliş rejasini tuz va bosqiçma-bosqiç bajar», yoki bir neça soat davom etadigan tadqiqot.

- **Tavsiyam:** Opus 5.5, `high`, uzoq (30 daqiqadan köp) agentlarda `xhigh`.
- **Rasmiy tavsif:** `xhigh` — uzoq muddatli iş uçun, token budjeti millionlarça bölgan holatlar uçun. Hujjat `xhigh` va `max` da katta `max_tokens` qöyişni maslahat beradi (boşlanğiç nuqta sifatida 64k).
- **Eslatma:** Anthropic Opus 5.5 ni «noaniq va uzoq» vazifalarda Sonnet'dan kuçliroq deb ta'riflaydi (bu gapni men ikkinçi darajali manbadan oldim, [Developers Digest](https://www.developersdigest.tech/blog/claude-opus-5-5-vs-sonnet-5-5-vs-haiku-5-5)). Lekin benchmarkda aniq bir vazifada Sonnet 5.5 yuqori çiqqan: Terminal-Bench 4.0 da Sonnet 5.5 — 70.6%, Opus 5.5 — 66.4% (`xhigh`). Bu ikki raqam Anthropic'ning ikki alohida sahifasidan, effort va harness farq qilişi mumkin, şuning uçun ularni bir-biriga töğridan-töğri qarşi qöymang. Anthropic'ning özi e'lon qilgan natijalar, mustaqil tasdiq emas.

### 7. Katta prompt (100k tokendan köp)

Vazifa: 150 000 tokenlik kod bazasi va 60 000 token çiqiş.

- **Haiku 5.5:** 100k dan uzun promptda narx $0.10 / $0.50 dan $0.50 / $2.50 ga çiqadi (5 baravar). Haiku tanlaş uçun avval promptni 100k dan pastga tuşirib böladimi, tekşiring.
- **Sonnet 5.5:** 1M kontekst oynasi bor.
- **Opus 5.5 va Fable 5.1:** kontekst oynasi e'lon sahifalarida körsatilmagan. Uzun prompt yuborişdan oldin [Claude hujjatlaridan](https://docs.claude.com) tekşiring.

## Narx qanday körinadi (öz hisobim)

Quyidagi jadvalda kiriş tokenlari vazifaga mos real, **çiqiş tokenlari esa mening farazim**. Çiqiş tokenlariga thinking ham kiradi, ular effort'ga qarab keskin özgaradi. Haiku 5.5 uçun 100k çegarasi butun sörovga qöllangan deb hisobladim.

| Vazifa | Kiriş | Çiqiş (faraz) | Haiku 5.5 | Sonnet 5.5 | Opus 5.5 | Fable 5.1 |
| :-- | --: | --: | --: | --: | --: | --: |
| Git commit xabari | 3 000 | 150 | $0.0004 | $0.0075 | $0.0150 | $0.0375 |
| Kiçik bug fix | 20 000 | 2 500 | $0.0032 | $0.0650 | $0.1300 | $0.3250 |
| Köp faylli refactor | 80 000 | 12 000 | $0.0140 | $0.2800 | $0.5600 | $1.4000 |
| Uzoq agent seansi | 150 000 | 60 000 | $0.2250 | $0.9000 | $1.8000 | $4.5000 |

Nimani körsatadi:

- Röyxat narxida Opus 5.5 — Sonnet 5.5 dan 2 baravar, Fable 5.1 — 5 baravar qimmat.
- Haiku 5.5 kiçik sörovlarda Sonnet'dan ≈ 20 baravar arzon, lekin 100k çegarasidan keyin farq ≈ 4 baravarga qisqaradi (oxirgi qator).
- **Token narxi ≠ vazifa narxi.** Qayta urinişlar, thinking tokenlari va effort darajasi yakuniy summani özgartiradi. Arzon model uç marta xato qilsa, qimmat modeldan qimmatga tuşadi. Şuning uçun hisobni `cost_per_success` bilan yuriting (pastdagi eval).

Hisoblaş kodi:

```python
# Narx kalkulyatori: narxlar 1M token uçun (kiriş, çiqiş), USD
PRICES = {
    "haiku-5.5": (0.10, 0.50),   # prompt <= 100k
    "sonnet-5.5": (2.00, 10.00),
    "opus-5.5": (4.00, 20.00),
    "fable-5.1": (10.00, 50.00),
}
HAIKU_LONG = (0.50, 2.50)  # prompt > 100k


def cost(model: str, in_tok: int, out_tok: int) -> float:
    p_in, p_out = PRICES[model]
    if model == "haiku-5.5" and in_tok > 100_000:
        p_in, p_out = HAIKU_LONG
    return (in_tok * p_in + out_tok * p_out) / 1_000_000


print(f"${cost('sonnet-5.5', 20_000, 2_500):.4f}")  # $0.0650
```

## Effort, cache va max_tokens

Bu uç narsa bir-biriga boğliq va xato qilinadigan joy aynan şu yer.

### Effort'ni özgartirsangiz, cache ketadi

Rasmiy hujjat böyiça:

- Ketma-ket sörovlarda bir xil thinking sozlamasi va effort'ni saqlasangiz, prompt cache saqlanadi.
- Yuqori darajadagi effort'ni sörovlar orasida özgartirsangiz, cache breakpoint'lari bekor böladi (hujjatdagi misolda standartdan `low` ga almaştirgandan keyin cache miss körsatilgan).
- Effort'ni modelning standart qiymatiga aniq yozişingiz uni umuman yozmaslik bilan bir xil va cache'ni buzmaydi.
- Amaliy maslahat: har bir suhbat uçun bitta thinking konfiguratsiyasi va bitta effort tanlang va ularni özgartirmang.
- Suhbat içida effort kerak bölsa, per-message effort (beta) cache'ni saqlaydi. Uni qöllamaydigan modellar 400 qaytaradi.

Xulosa: «bu qadam oddiy, `low` ga tuşiray» deb har sörovda effort almaştirsangiz, cache tejaşi yöqoladi. Oddiy qadamlarni alohida (arzon model + `low`) çaqiriq qiling yoki beta'dagi per-message effort'dan foydalaning.

### max_tokens — qattiq çegara, effort — yumşoq yöl-yöriq

- `max_tokens` thinking va javob matnining **yiğindisi** uçun qattiq çegara.
- Effort esa şu çegaraning qançasi thinking'ga ajratilişi haqida yumşoq körsatma.
- Thinking uçun alohida token budjeti yöq. Tool-use sikllarida har bir sörovning öz `max_tokens` i bor, şuning uçun u butun seans sarfini çeklamaydi.

Javob `stop_reason: "max_tokens"` bilan kesilsa, hujjatning qoidasi: kesilgan javoblar mulohazaga muhtoj bölgan bölsa — `max_tokens` ni oşiring; artiqça öylangan bölsa — effort'ni pasaytiring.

### Prompt bilan «kamroq öyla» deyiş işonçsiz

Rasmiy hujjat: Sonnet 5.5 da system prompt'da «kamroq öyla» deyiş thinking'ni işonçli kamaytirmaydi, Haiku 5.5 da esa «töğridan javob ber» iborasi işonçli işlamaydi. Birinçi riçag — effort, prompt — ikkinçisi.

## Kod: model va effort'ni birga tanlaş

Quyidagi kod oddiy routing jadvali. Jadvaldagi juftliklar — **mening tavsiyam** (yuqoridagi jadval), hujjatda tayyor qoida yöq.

```python
import anthropic

client = anthropic.Anthropic()

# vazifa turi -> (model, effort). Bu mening boşlanğiç tavsiyam, öz eval'ingizda tekşiring.
ROUTES = {
    "commit_message": ("claude-haiku-5-5", "low"),
    "classify": ("claude-haiku-5-5", "low"),
    "test_then_push": ("claude-sonnet-5-5", "medium"),
    "bugfix": ("claude-sonnet-5-5", "medium"),
    "refactor": ("claude-sonnet-5-5", "high"),
    "long_agent": ("claude-opus-5-5", "xhigh"),
}


def run(kind: str, prompt: str, max_tokens: int = 4096) -> str:
    model, effort = ROUTES[kind]
    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=[{"role": "user", "content": prompt}],
        output_config={"effort": effort},
    )
    if response.stop_reason == "max_tokens":
        # kesilgan: max_tokens ni oşiring yoki effort'ni pasaytiring
        raise RuntimeError(f"{kind}: javob max_tokens da kesildi")
    return "".join(b.text for b in response.content if b.type == "text")
```

## Özingizning eval'ingiz: model × effort setkasi

Tavsiyalar boşlanğiç nuqta. Haqiqiy javobni sizning vazifalaringiz beradi. 30–100 ta haqiqiy misol oling va har bir (model, effort) juftligini yurgizing:

```python
import time

GRID = [
    ("claude-haiku-5-5", "low"),
    ("claude-haiku-5-5", "medium"),
    ("claude-sonnet-5-5", "medium"),
    ("claude-sonnet-5-5", "high"),
    ("claude-opus-5-5", "high"),
]


def run_case(model: str, effort: str, prompt: str, max_tokens: int = 8192) -> dict:
    t0 = time.perf_counter()
    r = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        messages=[{"role": "user", "content": prompt}],
        output_config={"effort": effort},
    )
    details = getattr(r.usage, "output_tokens_details", None)
    return {
        "model": model,
        "effort": effort,
        "seconds": round(time.perf_counter() - t0, 2),
        "output_tokens": r.usage.output_tokens,
        "thinking_tokens": getattr(details, "thinking_tokens", None),
        "truncated": r.stop_reason == "max_tokens",
        "text": "".join(b.text for b in r.content if b.type == "text"),
    }


def cost_per_success(total_cost: float, passed: int) -> float:
    return float("inf") if passed == 0 else total_cost / passed
```

Har bir juftlik uçun uç narsani soliştiring: **ötgan testlar uluşi**, **vazifa uçun örtaça narx** (`cost_per_success`) va **keçikiş**. Rasmiy hujjat ham şuni maslahat beradi: «vakillik qiladigan trafikda thinking blokiş çastotasi, çiqiş tokenlari, keçikiş va javob sifatini soliştiring».

## Qaror tartibi

Bu ham **mening tavsiyam**:

1. Vazifa tor va aniqmi (xabar, klassifikatsiya, ekstraksiya)? **Haiku 5.5, `low`.**
2. Bir neça qadamli, lekin tekşiruvli ketma-ketlikmi? **`medium`** ga çiqing.
3. Aniq tavsiflangan kodlaş vazifasimi? **Sonnet 5.5, `medium`.**
4. Qiyin yoki köp fayllimi? **Sonnet 5.5, `high`.**
5. Hali ham xato köpmi, vazifa noaniq yoki uzoqmi? **Opus 5.5, `high`, keyin `xhigh`.**
6. `max` yoki Fable 5.1 — faqat eval'da yuqoridagilar yetmasligini körsatsangiz.

Rasmiy hujjatda `max` haqida bitta ehtiyotkor gap bor, lekin u Opus 4.7 uçun: «`max` salmoqli xarajat qöşadi, sifat öşişi esa nisbatan kiçik». Buni Opus 5.5 ga köçirmayman, lekin `max` ni standart qilib qöyişdan oldin eval qilişni tavsiya qilaman.

## Çeklovlar va tekşirilmagan jihatlar

- **Claude Code:** rasmiy Claude Code hujjatini (`code.claude.com`) oça olmadim. Claude Code'dagi standart effort va buyruqlar haqida rasmiy ma'lumot bermadim. «Hammasida `medium`» degan gap ikkinçi darajali manbadan.
- **Effort raqamlari yöq:** rasmiy sahifa `low` / `medium` uçun foiz yoki keçikiş raqami bermaydi. Men ham töqimadim. Jadvaldagi çiqiş tokenlari — faraz.
- **Kontekst hajmi:** Opus 5.5, Haiku 5.5 va Fable 5.1 uçun e'lon sahifalarida körsatilmagan, yozmadim.
- **Fable 5.1 narxi** ikkinçi darajali manbadan (Vellum), rasmiy sahifadan tasdiqlanmagan. Mythos 5.1 faqat tekşirilgan taşkilotlar uçun, şuning uçun tavsiyalarga kiritmadim.
- **Haiku narx çegarasi:** 100k dan oşganda yangi narx butun sörovga qöllanadi deb hisobladim. Hujjatda bu tafsilot yöq.
- **Kod:** Python kodi sintaksisi tekşirildi, narx kalkulyatori işga tuşirib körildi. API'ga haqiqiy çaqiriq qilib sinalmadi. `usage.output_tokens_details.thinking_tokens` maydoni rasmiy JSON misolida bor, SDK'dagi aniq atribut nomini özingiz tekşiring (kodda `getattr` bilan himoyalangan).
- **Benchmark:** Terminal-Bench 4.0 raqamlari vendor tomonidan e'lon qilingan, mustaqil tasdiq emas, ikki alohida sahifadan olingan.
- **Effort sahifasida sana yöq.** Bu maqola 2026-11-08 da öqilgan versiyaga tayanadi.

## Manbalar

Rasmiy:

- [Effort — Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/effort)
- [Steering thinking — Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost)
- [Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)
- [Claude Sonnet](https://www.anthropic.com/claude/sonnet)
- [Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5)

Ikkinçi darajali (belgilangan):

- [Developers Digest: Opus 5.5 vs Sonnet 5.5 vs Haiku 5.5](https://www.developersdigest.tech/blog/claude-opus-5-5-vs-sonnet-5-5-vs-haiku-5-5) (2026-10-08, muallif özi testlamagan, Anthropic raqamlarini keltiradi)
- [Vellum: Fable 5.1 va Mythos 5.1](https://www.vellum.ai/blog/claude-fable-5-1-mythos-5-1-benchmarks-explained)
