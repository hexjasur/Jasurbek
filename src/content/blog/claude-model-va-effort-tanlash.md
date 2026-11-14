---
title: "Claude'da model va effort tanlaş: git commit'dan katta promptlargaça amaliy qöllanma"
description: "2026-yil 14-noyabr holatiga: model va effort darajasini qanday tanlaş, effort nimani özgartirmaydi, narx hisobi va routing misoli."
pubDate: 2026-11-09
updatedDate: 2026-11-14
tags: ["anthropic", "claude", "ai", "llm", "api", "effort"]
---

> **Holat sanasi:** 2026-yil 14-noyabr. Modellar, API ID'lar va narxlar [lineup postida](/blog/anthropic-claude-modellari-benchmark-2026). Effort qoidalari şu kuni rasmiy sahifadan qayta öqildi; sahifada sana yöq (pastda «Tekşirilmagan»).

«Qaysi Claude modelini işlataay?» degan savol töliq emas. Ikkita böşqaruv bor: **model**, ya'ni qaysi «miya» (Haiku, Sonnet, Opus, Fable), va **effort**, ya'ni öşa miya vazifaga qançalik köp mehnat sarflashi (`low` dan `max` gaça). Bir model ikkala darajada ham işlay oladi. Narx, tezlik va sifat esa ikkisining yiğindisiga boğliq.

Bu maqola uç savolga javob beradi: effort nimani özgartiradi, vazifaga qarab qaysi juftlikdan boşlaş kerak va narx qanday hisoblanadi. Modellar röyxati, narxlar va benchmarklar [lineup postida](/blog/anthropic-claude-modellari-benchmark-2026); bu yerda ular takrorlanmaydi.

## Effort nima qiladi

Effort Messages API'da `output_config.effort` orqali beriladi. Qiymat berilmasa, modelning standart darajasi işlaydi. Standart qiymatni aniq yoziş va umuman yozmaslik bir xil natija beradi.

| Daraja | Rasmiy tavsif (qisqartirilgan) | Odatiy qöllanilişi |
| :-- | :-- | :-- |
| `max` | Token sarfiga çeklovsiz, maksimal qobiliyat | Eng çuqur tahlil |
| `xhigh` | Uzoq muddatli (long-horizon) iş uçun kengaytirilgan qobiliyat | 30 daqiqadan uzoq agentic va kodlaş vazifalari |
| `high` | Vazifa talab qilgança token sarflaydi, a'lo natija uçun | Murakkab mulohaza, qiyin kodlaş |
| `medium` | Muvozanatli, mötadil token tejaş | Tezlik, narx va sifat orasidagi agentic vazifalar |
| `low` | Eng samarali: sezilarli tejaş, qobiliyat biroz kamayadi | Oddiy vazifalar, subagentlar |

Qaysi model qaysi darajani qöllaydi:

- `high`, `medium`, `low`: effortni qöllaydigan barça modellarda.
- `max`: Fable 5.2 va 5.1, Mythos 5.2 va 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5 va boşqalarda.
- `xhigh`: `max` ni qöllaydigan har bir model uni qöllamaydi (masalan, Sonnet 4.6 da yöq). Joriy lineup'da Fable, Mythos, Opus 5.5, Sonnet 5.5 va Haiku 5.5 da bor.

Standart daraja modelga qarab farq qiladi: Opus 5.5 va Haiku 5.5 da `medium`, Sonnet 5.5 da `high`, Fable 5.2 da API standarti `high`. Opus 5 dan köçişda bu muhim. Opus 5 da standart `high` edi, Opus 5.5 da esa effort yozilmasa sörov bir daraja pastda işlaydi. Sifat sababsiz pasaysa, avval şunga qarang.

### Effort nima emas

- **Qat'iy token budjeti emas.** Rasmiy sahifa uni «xulq signali» deydi: past darajada Claude kamroq öylaydi, lekin yetarliça qiyin masalada baribir öylaydi.
- **Faqat thinking bilan boğliq emas.** Matn, tool call'lar va ularning argumentlari ham ta'sirlanadi. Past effortda tool call'lar kamroq va qisqaroq bölişi mumkin.
- **Thinking öçmaydi.** Opus 5.5 da adaptiv thinking doim yoqiq, `thinking: {"type": "disabled"}` esa har qanday darajada 400 qaytaradi. Fable 5.2 da ham adaptiv thinking doim yoqiq. Haiku 5.5 da `disabled` faqat `high` va undan pastda işlaydi.
- **Raqamli va'da emas.** Rasmiy sahifada `low` va `medium` uçun foiz yoki keçikiş raqami yöq. Bu maqola ham tejaş foizini taxmin qilmaydi.

## Model va effort juftligi

| Vazifa | Model | Effort |
| :-- | :-- | :-- |
| Git commit xabari | Haiku 5.5 | `low` |
| Klassifikatsiya, triage, ekstraksiya | Haiku 5.5 | `low`, aniqlik yetmasa `medium` |
| Testni yurgizib, natijaga qarab push qiladigan ketma-ketlik | Haiku 5.5 yoki Sonnet 5.5 | `medium` |
| Chat javoblari | Sonnet 5.5 | `low` yoki `medium` |
| Aniq tavsiflangan kiçik bug fix | Sonnet 5.5 | `medium` |
| Köp faylli refactor, qiyin bug | Sonnet 5.5 | `high` |
| Noaniq, xavfli yoki uzoq davom etadigan vazifa | Opus 5.5 | `high`, keyin `xhigh` |
| 30 daqiqadan uzoq agent, millionlab token | Opus 5.5 yoki Fable 5.2 | `xhigh` |
| Eng qiyin masalalar, narx ikkinçi darajali | Fable 5.2 | `xhigh` yoki `max` |

Pastdan boşlang: jadvaldagi juftlik boşlanğiç nuqta, eval'da yetmasa bir poğona yuqoriga. Fable 5.1 eski model, u Fable 5.2 bilan almaştirilgan, yangi iş uçun 5.2 işlatiladi. `max` ni standart qilişdan oldin eval qiling: rasmiy hujjat `max` haqida Opus 4.7 uçun ogohlantiriş beradi (xarajat sezilarli, sifat öşişi nisbatan kiçik). Bu baho Opus 5.5 uçun tekşirilmagan.

## Misollar

**Git commit xabari.** Xato arzon: xabarni qayta yozasiz, heç narsa buzilmaydi. Şuning uçun bu yerda model kuçi emas, tezlik hal qiladi. Vazifani kutib ötirmaysiz.

**«Testni yurgiz, ötsa push qil».** Bu boşqa turdagi vazifa. Model xabar yozmaydi, ketma-ketlik bajaradi: testni yurgizadi, natijani öqiydi, qaror qiladi. `low` da tekşiruvni ötkazib yuboriş mumkin (rasmiy ogohlantiriş Haiku 5.5 uçun), şuning uçun `medium`. Push'ga ruxsatni modelga emas, tizim ruxsatlariga boğlang: `main` ga majburiy push modelning qarori bölmasin.

**Triage.** 10 000 murojaat, har biriga qisqa javob. Hajm va narx şu yerda hal qiluvçi, Haiku buning uçun möljallangan. Aniqlik yetmasa, avval Haiku `medium` ni, keyin Sonnet 5.5 `low` ni sinab köring.

**Kiçik bug fix.** Tavsif aniq bölsa, ortiqça öylaşga pul tölamaysiz. Rasmiy hujjat aniq tavsiflangan agentic kodlaş uçun `medium` dan boşlaşni tavsiya qiladi.

**Köp faylli refactor.** 30 ta fayl orasidagi boğliqlikni saqlaş kerak. `medium` da qadam taşlab ketiş ehtimoli oşadi. Sonnet 5.5 da agentic kodlaş uçun rasmiy tavsiya: `max_tokens` ni 128 000 ga qöyiş va stream qiliş. `high` da ham xato köp bölsa, Opus 5.5 ga öting.

**Noaniq arxitektura qarori yoki uzoq agent.** «Monolitni xizmatlarga böliş rejasini tuz va bosqiçma-bosqiç bajar» kabi vazifada Opus 5.5 `high` dan boşlanadi, 30 daqiqadan uzoq işda `xhigh` dan. `xhigh` va `max` da hujjat `max_tokens` uçun 64k dan boşlaşni maslahat beradi. Ikkinçi darajali manba ([Developers Digest](https://www.developersdigest.tech/blog/claude-opus-5-5-vs-sonnet-5-5-vs-haiku-5-5)) Anthropic'ning Opus 5.5 ni noaniq uzoq vazifada Sonnet'dan kuçliroq deb ta'riflaganini yozadi. Bu gap mustaqil tekşirilmagan. Benchmarklarni qanday öqişni [benchmark postida](/blog/anthropic-claude-modellari-benchmark-2026) köriş mumkin.

**100k dan katta prompt.** Haiku 5.5 da prompt 100k dan oşsa, narx poğonasi özgaradi (narxlar lineup postida). Avval promptni 100k dan pastga tuşiriş mumkinmi, tekşiring. Joriy modellarda kontekst oynasi 1M token (lineup postida), şuning uçun bu yerda çegarani narx belgilaydi, kontekst emas.

## Narx hisobi

Narx 1M token uçun, USD. Röyxat narxlari [lineup postida](/blog/anthropic-claude-modellari-benchmark-2026). Çiqiş tokenlari faraz: thinking ham şu yerga kiradi va effortga qarab keskin özgaradi. Haiku 5.5 ning 100k çegarasi butun sörovga qöllangan deb hisoblandi.

Formula: `narx = (kiriş × kiriş narxi + çiqiş × çiqiş narxi) / 1 000 000`

```python
# Narx kalkulyatori. Narxlar 1M token uçun (kiriş, çiqiş), USD.
# Manba: model lineup postidagi narxlar (holat sanasi 2026-11-14).
PRICES = {
    "haiku-5.5": (0.10, 0.50),   # prompt <= 100k
    "sonnet-5.5": (2.00, 10.00),
    "opus-5.5": (4.00, 20.00),
    "fable-5.2": (8.00, 40.00),
}
HAIKU_LONG = (0.50, 2.50)  # prompt > 100k


def cost(model: str, in_tok: int, out_tok: int) -> float:
    p_in, p_out = PRICES[model]
    if model == "haiku-5.5" and in_tok > 100_000:
        p_in, p_out = HAIKU_LONG
    return (in_tok * p_in + out_tok * p_out) / 1_000_000


print(f"${cost('sonnet-5.5', 20_000, 2_500):.4f}")  # $0.0650

TASKS = [
    ("Git commit xabari", 3_000, 150),
    ("Kiçik bug fix", 20_000, 2_500),
    ("Köp faylli refactor", 80_000, 12_000),
    ("Uzoq agent seansi", 150_000, 60_000),
]
for name, i, o in TASKS:
    print(name, *[f"{cost(m, i, o):.4f}" for m in PRICES])
```

Skript çiqişi (hisob USD, çiqiş tokenlari faraz):

| Vazifa | Kiriş | Çiqiş (faraz) | Haiku 5.5 | Sonnet 5.5 | Opus 5.5 | Fable 5.2 |
| :-- | --: | --: | --: | --: | --: | --: |
| Git commit xabari | 3 000 | 150 | $0.0004 | $0.0075 | $0.0150 | $0.0300 |
| Kiçik bug fix | 20 000 | 2 500 | $0.0032 | $0.0650 | $0.1300 | $0.2600 |
| Köp faylli refactor | 80 000 | 12 000 | $0.0140 | $0.2800 | $0.5600 | $1.1200 |
| Uzoq agent seansi | 150 000 | 60 000 | $0.2250 | $0.9000 | $1.8000 | $3.6000 |

Nimani körsatadi:

- Kiçik sörovda Haiku Sonnet'dan 20 marta arzon. 100k dan katta prompt (150 000 kiriş) da farq 4 martaga tuşadi, çunki Haiku'ning uzun prompt narxi qimmatroq.
- Röyxat narxida Fable 5.2 Sonnet'dan 4 marta, Opus 5.5 esa 2 marta qimmat.
- **Token narxi ≠ vazifa narxi.** Qayta uriniş, thinking va effort yakuniy summani özgartiradi. Haiku 20 marta arzon, lekin 20 marta qayta urinsa, narx Sonnet bilan tenglaşadi. Şuning uçun hisobni `cost_per_success` bilan yuriting (pastdagi eval).

## Effort, cache va max_tokens

- **Cache.** Ketma-ket sörovlarda thinking va effort bir xil bölsa, prompt cache saqlanadi. Top-level effortni sörovlar orasida özgartirsangiz, oldingi bosqiçlarning cache prefiksi buziladi. Har suhbat uçun bitta effort va bitta thinking sozlamasi tanlang.
- **Suhbat içida özgartiriş.** Per-message effort (beta) cache'ni saqlaydi. Sonnet 5.5 (`between_tools`) va Haiku 5.5 (`disabled`) da boşqa darajadagi per-message effort 400 qaytaradi.
- **max_tokens.** Thinking va javob matni uçun qattiq çegara. Effort esa şu çegaradan qançasi thinking uçun ajratiliş haqida yumşoq körsatma. Thinking uçun alohida budjet yöq, tool-use sikllarida har sörovning öz `max_tokens` i bor. Javob `stop_reason: "max_tokens"` bilan kesilsa: kesilgan javob mulohazaga muhtoj bölsa, `max_tokens` ni oşiring; ortiqça öylangan bölsa, effortni pasaytiring.
- **Prompt bilan «kamroq öyla» işonçsiz.** Sonnet 5.5 da system promptdagi «kamroq öyla» körsatmasi mulohazani işonçli kamaytirmaydi, Haiku 5.5 da esa «töğridan javob ber» işonçli işlamaydi. Birinçi riçag effort, prompt ikkinçi.

## Kod: model va effort routing

Quyidagi kod yuqoridagi jadvalni lögatga aylantiradi. Model ID'lari lineup postidagi röyxatga mos. Juftliklar boşlanğiç nuqta, ularni öz eval'ingiz bilan tekşiring. Şablon: `ANTHROPIC_API_KEY` sozlangan bölişi kerak.

```python
import anthropic

client = anthropic.Anthropic()

# vazifa turi -> (model, effort). Boşlanğiç nuqta, eval bilan tekşiring.
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

## Eval setkasi: model × effort

Boşlanğiç tavsiyalar nuqta, javob esa sizning vazifalaringizdan çiqadi. 30–100 ta haqiqiy misol oling va har juftlikni yurgizing:

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

Har juftlik uçun uçta narsani soliştiring: ötgan testlar uluşi, vazifa uçun örtaça narx (`cost_per_success`) va keçikiş. Rasmiy hujjat ham vakillik trafikda thinking bloklari çastotasi, çiqiş tokenlari, keçikiş va sifatni ölçaşni tavsiya qiladi.

## Tekşirilmagan

- Claude Code'dagi standart effort (hammasida `medium`) faqat ikkinçi darajali manbada bor. Rasmiy Claude Code hujjati öçilmadi.
- Effort sahifasi umumlaştirilgan holda öqildi, sana yöq. «Kamroq öyla» tavsiyasi, effortning tool call'larga ta'siri va beta header nomi bu tahrirda qayta tasdiqlanmadi.
- Narx jadvalidagi çiqiş tokenlari faraz. Kod API'ga yuborib sinalmadi: faqat sintaksis va narx kalkulyatori tekşirildi. `thinking_tokens` maydonini SDK'da tekşiring.

## Manbalar

- [Effort — Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/effort)
- [Steering thinking — Claude Platform Docs](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost)
- [Developers Digest: Opus 5.5 vs Sonnet 5.5 vs Haiku 5.5](https://www.developersdigest.tech/blog/claude-opus-5-5-vs-sonnet-5-5-vs-haiku-5-5) (ikkinçi darajali, 2026-10-08)
- Modellar, narxlar va benchmarklar: [Anthropic Claude modellari 2026](/blog/anthropic-claude-modellari-benchmark-2026)
