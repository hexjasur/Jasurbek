---
title: "Anthropic Claude modellari 2026: Fable 5.1, Opus 5.5, Sonnet 5.5 va Haiku 5.5 — benchmarklar, narxlar va amaliy tanlov"
description: "2026-yil 7-noyabr holatiga Anthropic'ning joriy Claude modellari: çiqiş sanalari, API ID'lar, narxlar, rasmiy benchmark natijalari, benchmarkni töğri öqiş qoidalari, narx hisob-kitobi va model routing uçun işçi kod misollari."
pubDate: 2026-11-07
tags: ["anthropic", "claude", "ai", "benchmark", "llm", "api"]
---

> **Holat sanasi:** 2026-yil 7-noyabr. Modellar, narxlar va benchmark natijalari tez özgaradi. Production'ga qaror qilişdan oldin [Claude hujjatlari](https://docs.claude.com) va rasmiy e'lon sahifalarini qayta tekşiring. Bu maqoladagi har bir raqam manbasi bilan berilgan, öz hisoblarim esa alohida belgilangan.

AI funksiyasini production'ga çiqarayotgan har bir jamoa ertami-keçmi bir savolga duç keladi: *qaysi modelni tanlaymiz?* Bu savolning notöğri varianti — «eng kuçli model qaysi?». Töğri varianti esa şunday: «bu vazifa uçun qaysi model yetarli aniqlikni eng past narx va eng kam keçikiş bilan beradi?».

2026-yil kuzida Anthropic bu savolni ham osonlaştirdi, ham murakkablaştirdi. Lineup tört qatlamga bölindi: Fable, Opus, Sonnet va Haiku. Kiriş tokenlari böyiça narx farqi esa 100 baravarga yetdi: 1M token uçun Haiku 5.5 da $0.10, Fable 5.1 da $10. Demak, model tanlaş endi «bitta eng yaxşisini ol» masalasi emas, balki muhandislik qarori.

Bu maqolada joriy lineup'ni rasmiy manbalar asosida tahlil qilaman, benchmarklarni qanday öqiş kerakligini körsataman va narx hisoblaş, routing hamda öz eval'ingizni yoziş uçun işçi kod beraman.

## Qisqaça: joriy lineup

| Model | Çiqiş sanasi | API ID | Narx, 1M token (kiriş / çiqiş) | Anthropic körsatgan asosiy vazifa |
| :-- | :-- | :-- | :-- | :-- |
| Claude Fable 5.1 | 2026-09-01 | `claude-fable-5-1` | $10 / $50 | Umumiy maqsadli yuqori qatlam (GA) |
| Claude Opus 5.5 | 2026-09-22 | `claude-opus-5-5` | $4 / $20 | Murakkab agentic kodlaş va bilim işi |
| Claude Sonnet 5.5 | 2026-09-28 | `claude-sonnet-5-5` | $2 / $10 | Kundalik kodlaş, agentlar, bilim işi |
| Claude Haiku 5.5 | 2026-10-07 | `claude-haiku-5-5` | $0.10 / $0.50 (prompt ≤ 100k) | Yuqori hajmli vazifalar, subagentlar |

Qöşimça: Haiku 5.5 uçun 100k tokendan uzun promptlarda narx $0.50 / $2.50 ga çiqadi. **Claude Mythos 5.1** — Fable 5.1 bilan bir model, lekin yengilroq çeklovlar bilan; u faqat tekşirilgan taşkilotlarga beriladi (pastda batafsil).

Kontekst oynasi hajmi faqat Sonnet 5.5 uçun rasmiy sahifada körsatilgan (1M token). Qolgan modellar uçun e'lon sahifalarida raqam yöq, şuning uçun taxmin qilmadim.

## 2026-yil xronologiyasi

- **9-iyun:** Claude Fable 5 va Claude Mythos 5 çiqarildi.
- **12-iyun:** AQŞ Savdo departamenti (Department of Commerce) eksport nazorati talablariga rioya qiliş uçun Anthropic ikkala modelga kirişni töxtatdi.
- **30-iyun va 1-iyul:** Departament çeklovlarni bekor qildi (30-iyun), Anthropic kirişni tikladi (1-iyul). Tafsilot: [Anthropic bayonoti](https://www.anthropic.com/news/fable-mythos-access).
- **1-sentyabr:** Fable 5.1 va Mythos 5.1.
- **22-sentyabr:** Opus 5.5.
- **28-sentyabr:** Sonnet 5.5.
- **7-oktyabr:** Haiku 5.5, şuningdek Max va Team rejalari uçun oylik API kreditlari.

Mening kuzatuvim: Anthropic'ning joriy sur'ati — taxminan har 1–3 haftada bitta yangi model yoki yirik yangilaniş. Demak, qotib qolgan «model tanlaş hujjati» tez eskiradi; tanlovni kod va eval darajasida boşqarib boriş kerak.

## Benchmarkni öqişdan oldin: 6 qoida

Benchmark jadvali marketing va muhandislik çegarasida turadi. Quyidagi 6 qoida xato xulosadan saqlaydi, ayniqsa öz hisobingizda.

### 1. Natijani kim e'lon qilgan?

Bu maqoladagi raqamlarning köpçiligi — Anthropic'ning özi e'lon qilgan (*vendor-reported*) natijalar. Masalan, Opus 5.5 e'lonini yoritgan mustaqil naşr ham alohida ta'kidlaydi: performans va narx da'volari Anthropic'ning öz baholaşi, mustaqil tasdiq emas ([LetsDataScience](https://letsdatascience.com/news/anthropic-launches-claude-opus-55-with-safeguards-5d52f322)).

### 2. Benchmark versiyasi

Bir xil nom ostida boşqa-boşqa versiyalar yuradi. Aniq misol: **GDPval-AA**.

- Opus 5.5 e'lonida (v2.1): Fable 5.1 — 1735, Opus 5 — 1708.
- Fable 5.1 xulosasida (v2): Fable 5.1 — 1853, Opus 5 — 1824.

Ikkala son ham Fable 5.1 haqida, lekin farqi 100 dan ortiq, çunki versiya boşqa. Ularni bir jadvalga qöysangiz, xato xulosa çiqadi. Xuddi şunday: OSWorld 2.0 va 2.1, CursorBench 3.2.0 va 4.0 bir-biriga mos kelmaydi.

### 3. Effort va sozlamalar

Yangi modellarda «thinking effort» bor. Opus 5.5 e'lonida FrontierCode uçun asosiy jadvalda 54.4% körsatilgan, matn qismida esa standart (medium) effort bilan 54.6%. Haiku 5.5 e'lonida Sonnet 5.5 natijasi `Xhigh` effort bilan berilgan. Effort körsatilmagan ikki sonni soliştirmang.

### 4. Subset va protokol

OSWorld 2.1 natijalari ba'zan «partial» yoki «offline subset» deb belgilanadi. Töliq benchmark bilan subsetni bir qatorga qöyib bölmaydi.

### 5. Safeguard nollari

Anthropic Fable 5.1 ni production safeguard'lar yoqilgan holda ölçagan: OSWorld 2.0 da safeguard aralaşgan vazifalar nol ball olgan. Jadval ostidagi izoh buni oçiq aytadi va bu qatorlarni «ehtimol quyi çegara» deb ataydi ([Vellum xulosasi](https://www.vellum.ai/blog/claude-fable-5-1-mythos-5-1-benchmarks-explained)). Ya'ni, Fable'ning ba'zi ballari modelning «sof» qobiliyati emas, safeguard bilan birgalikdagi natija.

### 6. Statistik şovqin

Terminal-Bench-Science uçun standart xato har bir model böyiça ±3.5–4.5 punkt (Vellum). 1–2 punktlik farq bu yerda heç narsani isbotlamaydi.

## Claude Opus 5.5 (2026-09-22)

[Rasmiy e'longa](https://www.anthropic.com/claude-opus-5-5) köra, Opus 5.5 — Opus 5 dan arzonroq va tezroq, köpçilik testlarda esa yuqoriroq natija beradigan model.

**Narx va tezlik**

- Kiriş $4, çiqiş $20 (Opus 5: $5 / $25). Token böyiça farq — 20%.
- Cache öqiş $0.20 (Opus 5: $0.50), cache yoziş $5 (Opus 5: $6.25).
- Çiqiş tezligi Opus 5 dan 30% dan köproq yuqori.
- *Fast mode*: 2.5 baravargaça tez, narxi $8 kiriş / $40 çiqiş (Claude Code va Claude Platform'da).
- Anthropic'ning aytişiça, Enterprise yangiliklarida Opus 5.5 tipik işlarda Opus 5 dan taxminan 40% arzon ([Releasebot](https://releasebot.io/updates/anthropic/claude)).

**Muhim texnik özgarişlar**

- *Adaptive thinking* va **thinking'ni öçirib bölmaydi**. API integratsiyasi uçun bu muhim: keçikiş va token sarfini ölçaş kerak.
- *Preserved thinking*: anti-distillation himoyasi; 2026-yil 31-avgustda yoki undan keyin yaratilgan API akkauntlarida işlaydi.
- Zero data retention mavjud; EU AI Act talabi uçun watermark qöllanadi.

**Anthropic'ning özi e'lon qilgan natijalar**

| Benchmark | Opus 5.5 | Fable 5.1 | Opus 5 |
| :-- | --: | --: | --: |
| Terminal-Bench 4.0 | 66.4% | 55.8% | 52.3% |
| FrontierCode v1.1 (Main) | 54.4% | 50.3% | 48.0% |
| CursorBench 4.0 | 57.8% | 51.8% | 46.6% |
| GDPval-AA v2.1 (Elo) | 1846 | 1735 | 1708 |
| AutomationBench | 40.0% | 31.4% | 26.9% |
| Humanity's Last Exam (tools bilan) | 67.7% | 65.6% | 63.6% |
| Terminal-Bench-Science 0.1 | 58.7% | 52.6% | 29.0% |
| OSWorld 2.1 (partial) | 81.8% | 80.7% | 74.0% |
| Chartography (tools bilan) | 89.0% | 88.4% | 83.4% |

Xulosa: Anthropic'ning öz jadvalida Opus 5.5 barça qatorda Fable 5.1 dan yuqori, narxi esa 2.5 baravar past ($4 va $10). Lekin bu hamma testda yetakçi degani emas. Xuddi şu e'londagi GPT-6 Astra ustunida AutomationBench 41.4% (Opus 5.5: 40.0%) va Terminal-Bench-Science 64.6% (Opus 5.5: 58.7%) körsatilgan.

**Xavfsizlik jihatlari**

Anthropic yozişiça, Opus 5.5 avtomatlaştirilgan xulq-atvor auditida (taxminan 2000 stsenariy) sinalgan modellar içida eng yaxşi natijani körsatgan. Çeklovlardan çiqişga urinişlar Opus 5 va Mythos 5.1 ga nisbatan taxminan 85% kam bölgan; urinişlarning barçasi past darajadagi va modelning özi xabar bergan holatlar. Şu bilan birga e'londa model özini baholanayotganini sezişi mumkinligi qayd etilgan — bu evaluation natijalarining real hayotga ekstrapolyatsiyasini çeklaydi. Kiberxavfsizlik vazifalarining köpçiligi Opus 4.8 ga yönaltiriladi; Cyber Verification Program Opus 5.5 ni ham qamrab oladi.

## Claude Sonnet 5.5 (2026-09-28)

[Sonnet sahifasiga](https://www.anthropic.com/claude/sonnet) köra, Sonnet 5.5 — Opus 5.5 ni töldiruvçi, tezroq va arzonroq model. U aniq çegaralangan kundalik vazifalar uçun möljallangan: kodlaş, agentlar va bilim işi.

- Kontekst oynasi: **1M token**.
- Narx: $2 kiriş / $10 çiqiş. Prompt caching 90% gaça, batch 50% gaça tejaş beradi. AQŞ-only inference uçun narx 1.1 baravar.
- Sonnet 5 ga nisbatan: 30% tezroq va tipik token-hisobli işlarda 30% gaça arzon.
- Cache öqiş narxi $0.20 dan $0.10 ga tuşirildi (Haiku 5.5 e'lonida qayd etilgan; Anthropic buni agentic işlarda taxminan 20% tejaş deb baholaydi).
- Hybrid reasoning; API'da effort'ni aniq boşqariş mumkin.

**Natijalar** (Haiku 5.5 e'lonidagi Anthropic jadvalidan):

| Benchmark | Sonnet 5.5 |
| :-- | --: |
| Terminal-Bench 4.0 | 70.6% |
| GDPval-AA v2.1 (Elo) | 1840 |
| AA-Briefcase v1.1 | 1824 |
| OSWorld 2.1 (offline subset) | 83.9% |
| Humanity's Last Exam (tools'siz) | 56.9% |
| Humanity's Last Exam (tools bilan) | 64.5% |
| FrontierCode 1.1 (Main, Xhigh effort) | 52.1% |
| Chartography (tools'siz) | 61.6% |

Qiziq nuqta: Anthropic'ning ikki sahifasida Terminal-Bench 4.0 böyiça Sonnet 5.5 — 70.6%, Opus 5.5 — 66.4%. Benchmark nomi bir xil, lekin effort va harness bir xil bölmasligi mumkin. Bundan «Sonnet Opus'dan kuçli» degan xulosa çiqarmang. Muhimi — öz vazifangizda ölçaş. Qöşimça: Cursor keltirgan CursorBench 4.0 natijasi 55.5% (Opus 5.5 dan keyin ikkinçi).

Mijozlar tomonidan bildirilgan (standart benchmark emas) natijalardan ikkitasi: 2441 ta moliyaviy vazifada Sonnet 5.5 javob boşiga taxminan 121k token işlatgan (Sonnet 5: 497k); 118 ta ilova qurişda har bir build uçun 3.6 iteratsiya kerak bölgan (Opus 5: 7.7). Bular mijozlarning özi ölçagan raqamlar, ularni öz iş yukingizga köçirib bölmaydi.

## Claude Haiku 5.5 (2026-10-07)

[Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5) — Anthropic'ning özi ta'riflaşiça, eng arzon, eng tez va eng qobiliyatli kiçik model.

- Narx (≤ 100k / > 100k prompt): kiriş $0.10 / $0.50, çiqiş $0.50 / $2.50, cache öqiş $0.01 / $0.05.
- Haiku 4.5 ga nisbatan örtaça taxminan 75% arzon: 100k gaça sörovlarda 90%, undan uzun sörovlarda 50%.
- Yangi tokenizer sababli bir vazifaga biroz köproq token ketadi.
- Haiku sinfida birinçi marta sozlanuvçi effort: Low, Med, High, Xhigh, Max.
- Computer use va browser use beta holatida (Python va TypeScript SDK orqali).
- Anthropic tavsiyasi: murakkab agentic kodlaş uçun Sonnet 5.5 yoki Opus 5.5; Haiku esa xulosalaş, compaction, subagent, jonli mijozlarni qöllab-quvvatlaş va browser use uçun.

| Benchmark | Haiku 5.5 | Haiku 4.5 | Sonnet 5.5 |
| :-- | --: | --: | --: |
| GDPval-AA v2.1 (Elo) | 1620 | 735 | 1840 |
| AA-Briefcase v1.1 | 1578 | 614 | 1824 |
| OSWorld 2.1 (offline subset) | 72.4% | 15.7% | 83.9% |
| HLE (tools'siz) | 45.9% | 10.2% | 56.9% |
| HLE (tools bilan) | 57.4% | 18.7% | 64.5% |
| Terminal-Bench 4.0 | 39.2% | 0.0% | 70.6% |
| FrontierCode 1.1 (Main) | 46.4% | — | 52.1% (Xhigh) |
| Chartography (tools'siz) | 46.4% | 6.4% | 61.6% |

Anthropic jadvalidagi GPT-6 Luna uçun natija körsatilgan barça qatorlarda Haiku 5.5 yuqori. Mijoz misollaridan: Box Haiku 4.5 ga nisbatan 11 punkt yuqori natija va taxminan yarim keçikiş körsatgan; HubSpot öz CRM töplamida uç yurişning örtaçasi 92.8% olgan.

**Amaliy tuzoq:** Haiku 5.5 kiriş narxi prompt 100k tokendan oşganda $0.10 dan $0.50 ga, ya'ni 5 baravar sakraydi (öz hisobim). Agent tarixi çözilib ketsa, «eng arzon model» birdan arzon bölmay qoladi. Compaction va kontekstni qisqartiriş aynan şu yerda foyda beradi.

## Claude Fable 5.1 va Mythos 5.1 (2026-09-01)

Bu qatlam haqidagi raqamlarni [Vellum xulosasidan](https://www.vellum.ai/blog/claude-fable-5-1-mythos-5-1-benchmarks-explained) oldim (Anthropic natijalarining ikkilamçi manbasi), şuning uçun ularni bir daraja ehtiyotkorroq öqing.

- **Fable 5.1:** `claude-fable-5-1`, Claude API, AWS, Google Cloud va Microsoft Azure'da umumiy foydalaniş uçun.
- **Mythos 5.1:** şu model, lekin yengilroq safeguard'lar bilan. Cyber Verification Program va Life Sciences Verification Program orqali tekşirilgan taşkilotlargagina beriladi; hozirça faqat AQŞ.
- Narx Fable 5 bilan bir xil: $10 / $50. Cache öqiş $0.25 — Fable 5 dan 75% arzon. Tipik işlarda taxminan 25%, juda agentic işlarda 45% gaça tejaş.
- Kiber safeguard'larning notöğri işga tuşişi (false positive) 60% kamaygan; Fable 5.1 zaifliklarni topişga yordam beradi, lekin exploit işlab çiqmaydi. Penetratsion testlar va exploit generatsiyasi Opus modellariga yönaltiriladi.
- Biologiya safeguard'lari oddiy tibbiy va elementar biologiya savollarida 85% kam işga tuşadi; tadqiqot darajasidagi iş Mythos 5.1 ga ötadi.

| Benchmark | Fable 5.1 | Opus 5 | Fable 5 |
| :-- | --: | --: | --: |
| Terminal-Bench 4.0 | 55.8% | 52.3% | 42.0% |
| Terminal-Bench-Science 0.1 | 52.6% | 29.0% | 24.7% |
| GDPval-AA v2 (Elo) | 1853 | 1824 | 1723 |
| OSWorld 2.0 (partial) | 77.9% | 75.4% | 72.9% |
| OSWorld 2.0 (strict) | 41.7% | 39.6% | 36.1% |
| HLE (tools'siz) | 60.9% | 56.6% | 57.8% |
| HLE (tools bilan) | 65.0% | 63.6% | 63.8% |
| AutomationBench | 31.4% | 26.9% | 17.1% |
| CursorBench 3.2.0 | 73.4% | 70.0% | 70.5% |

Mythos 5.1 uçun yagona e'lon qilingan natija — Terminal-Bench 4.0: 60.9% (Fable 5.1: 55.8%). Bu jadvaldagi GDPval-AA va OSWorld versiyalari yuqoridagi Opus 5.5 jadvalidan farq qiladi (2-qoidaga qarang), şuning uçun ikki jadvalni bir-biriga qöşmang.

## Amaliyot: kod bilan

Quyidagi misollar özaro boğliq: oddiy sörov, narx hisob-kitobi, caching, routing va özingizning eval'ingiz.

### 1. Birinçi sörov

```python
import anthropic

client = anthropic.Anthropic()  # ANTHROPIC_API_KEY muhit özgaruvçisidan öqiladi

resp = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Bu funksiyadagi xatoni toping: ..."}],
)

# Adaptive thinking yoqilgan modellarda javob bloklari orasida 'thinking' bölişi mumkin,
# şuning uçun faqat 'text' bloklarini yiğamiz.
text = "".join(b.text for b in resp.content if b.type == "text")
print(text)
print(resp.usage.input_tokens, resp.usage.output_tokens)
```

### 2. Narxni oldindan hisoblaş

Quyidagi kod yuqoridagi jadvallardagi narxlarni ($ / 1M token) işlatadi va Haiku 5.5 uçun 100k çegarasini hisobga oladi.

```python
from dataclasses import dataclass

M = 1_000_000


@dataclass(frozen=True)
class Price:
    input: float
    output: float
    cache_read: float


# Manba: Anthropic e'lon sahifalari (Opus 5.5, Sonnet 5.5, Haiku 5.5) va Fable 5.1 uçun Vellum xulosasi.
PRICES: dict[str, Price] = {
    "claude-haiku-5-5": Price(0.10, 0.50, 0.01),        # prompt <= 100k
    "claude-haiku-5-5@long": Price(0.50, 2.50, 0.05),   # prompt > 100k
    "claude-sonnet-5-5": Price(2.00, 10.00, 0.10),
    "claude-opus-5-5": Price(4.00, 20.00, 0.20),
    "claude-fable-5-1": Price(10.00, 50.00, 0.25),
}


def price_key(model: str, prompt_tokens: int) -> str:
    if model == "claude-haiku-5-5" and prompt_tokens > 100_000:
        return "claude-haiku-5-5@long"
    return model


def task_cost(model: str, fresh_in: int, cached_in: int, out: int) -> float:
    """Bitta sörov narxi (USD). Cache yoziş narxi hisobga olinmagan."""
    p = PRICES[price_key(model, fresh_in + cached_in)]
    return (fresh_in * p.input + cached_in * p.cache_read + out * p.output) / M


def cost_per_success(cost_per_attempt: float, success_rate: float) -> float:
    """Muvaffaqiyatli yeçilgan bitta vazifaning haqiqiy narxi."""
    return cost_per_attempt / success_rate


for model in ("claude-haiku-5-5", "claude-sonnet-5-5", "claude-opus-5-5", "claude-fable-5-1"):
    one = task_cost(model, fresh_in=30_000, cached_in=60_000, out=6_000)
    print(f"{model:20s} 1 vazifa: ${one:.4f} | 1000 vazifa: ${one * 1000:,.2f}")
```

Senariy: har bir vazifada 30k yangi kiriş tokeni, 60k cache'dan öqilgan token va 6k çiqiş tokeni. Kodni işga tuşirib olingan natija (mening hisobim, Anthropic'niki emas):

| Model | 1 vazifa | 1000 vazifa |
| :-- | --: | --: |
| Haiku 5.5 | $0.0066 | $6.60 |
| Sonnet 5.5 | $0.1260 | $126.00 |
| Opus 5.5 | $0.2520 | $252.00 |
| Fable 5.1 | $0.6150 | $615.00 |

Bu hisob-kitobning çegaralari: har bir model boşqa tokenizer işlatişi mumkin (Haiku 5.5 biroz köproq token sarflaydi), cache yoziş narxi qöşilmagan, thinking tokenlari ham çiqiş sifatida hisoblanadi. Şuning uçun `cost_per_success` muhim: Opus 5.5 bir urinişda hal qilgan vazifani Sonnet 5.5 ikki urinişda hal qilsa, «arzon» model aslida arzon bölmasligi mumkin. Buni faqat öz eval'ingiz körsatadi.

### 3. Prompt caching

Uzun, takrorlanuvçi qismni (tizim prompti, hujjatlar, vosita ta'riflari) keşlaş — eng arzon optimizatsiyalardan biri. Sonnet 5.5 da cache öqiş narxi kiriş narxining 5% i ($0.10 / $2.00, öz hisobim).

```python
import anthropic

client = anthropic.Anthropic()

LONG_CONTEXT = open("handbook.md", encoding="utf-8").read()  # uzun, özgarmaydigan matn

resp = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=512,
    system=[
        {
            "type": "text",
            "text": LONG_CONTEXT,
            "cache_control": {"type": "ephemeral"},
        }
    ],
    messages=[{"role": "user", "content": "Işga qabul qiliş jarayonining 3-bosqiçini qisqaça yozing."}],
)

u = resp.usage
hit = u.cache_read_input_tokens or 0
written = u.cache_creation_input_tokens or 0
print(f"cache'dan öqildi: {hit}, yangidan yozildi: {written}, oddiy kiriş: {u.input_tokens}")
```

Production'da `cache_read_input_tokens` uluşini monitoring qiling: agar ikkinçi sörovdan keyin ham nolga yaqin bölsa, prompt boşida özgaruvçan qism (vaqt, foydalanuvçi ID) bor, ya'ni keş prefiksi buzilyapti. Minimal keşlanadigan hajm modelga boğliq; aniq çegarani hujjatdan tekşiring.

### 4. Routing va eskalatsiya (TypeScript)

Eng amaliy naqş — arzon modeldan boşlab, validatsiyadan ötmasa, kuçliroq modelga ötiş.

```ts
import Anthropic from "@anthropic-ai/sdk";

const LADDER = ["claude-haiku-5-5", "claude-sonnet-5-5", "claude-opus-5-5"] as const;

async function ask(client: Anthropic, model: string, prompt: string): Promise<string> {
  const res = await client.messages.create({
    model,
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });
  // 'thinking' bloklarini taşlab, faqat matnni olamiz
  return res.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
}

export async function runWithEscalation(
  client: Anthropic,
  prompt: string,
  validate: (text: string) => boolean,
): Promise<{ model: string; text: string }> {
  for (const model of LADDER) {
    const text = await ask(client, model, prompt);
    if (validate(text)) return { model, text };
  }
  throw new Error("Heç bir model validatsiyadan ötmadi — vazifani yoki validatorni qayta körib çiqing");
}

// Misol: javob töğri JSON bölişi şart
const isJson = (t: string) => {
  try {
    JSON.parse(t);
    return true;
  } catch {
    return false;
  }
};
```

Bu naqşning ikki şarti bor: *validator deterministik bölişi kerak* (JSON sxemasi, regex, unit test) va *eskalatsiya foizini* ölçaş kerak. Agar sörovlarning yarmi Opus'ga yetib borsa, Haiku bosqiçi faqat keçikiş va pul qöşadi.

### 5. Özingizning mini-benchmark'ingiz

Ommaviy benchmark'lar sizning iş yukingizni körsatmaydi. 30–100 ta haqiqiy misol, deterministik tekşiruv va uçta metrika yetarli: pass@1, muvaffaqiyat boşiga narx, p50/p95 keçikiş.

```python
import statistics
import time

import anthropic

client = anthropic.Anthropic()

CASES = [
    {"prompt": "2026-11-07 sanasini ISO formatda yozing. Faqat sanani yozing.", "expect": "2026-11-07"},
    # ... özingizning haqiqiy vazifalaringiz
]


def run_model(model: str, price_in: float, price_out: float) -> dict:
    passed, latencies, cost = 0, [], 0.0
    for case in CASES:
        t0 = time.perf_counter()
        resp = client.messages.create(
            model=model,
            max_tokens=1024,
            messages=[{"role": "user", "content": case["prompt"]}],
        )
        latencies.append(time.perf_counter() - t0)
        text = "".join(b.text for b in resp.content if b.type == "text").strip()
        cost += (resp.usage.input_tokens * price_in + resp.usage.output_tokens * price_out) / 1_000_000
        passed += case["expect"] in text
    return {
        "model": model,
        "pass@1": passed / len(CASES),
        "cost_per_success": cost / passed if passed else float("inf"),
        "p50_s": statistics.median(latencies),
        "p95_s": statistics.quantiles(latencies, n=20)[-1] if len(latencies) >= 2 else latencies[0],
    }


for model, pin, pout in [
    ("claude-haiku-5-5", 0.10, 0.50),
    ("claude-sonnet-5-5", 2.00, 10.00),
    ("claude-opus-5-5", 4.00, 20.00),
]:
    print(run_model(model, pin, pout))
```

Eval qoidalari:

- Model ID'ni qotiring (`claude-sonnet-5-5`), «latest» alias'iga tayanmang.
- Effort va `max_tokens` ni barça modellarda bir xil saqlang yoki aniq yozib qöying.
- Avval deterministik tekşiruv (`==`, regex, JSON sxema, unit test), LLM-hakamni oxirgi çora sifatida işlating.
- Har bir yangi model çiqqanda eval'ni qayta yurgizing; natijani sana bilan saqlang.

## Oxirgi yangiliklar (2026-11-07 holati)

Rasmiy [Claude release notes](https://support.claude.com/en/articles/12138966-release-notes) sahifasiga köra, noyabrda hozirça yangi model e'lon qilinmagan. Lekin atrofdagi mahsulot va platforma yangiliklari köp:

- **2-noyabr — Messages API'da message threads (public beta).** Agentlar har bir qadamda butun tarixni emas, faqat yangi xabarlarni yuboradi. Thread oxirgi sörovdan 5 daqiqa keyin tugaydi. Muhim nuqta: token sarfi özgarmaydi, çunki Claude baribir butun suhbatni öqiydi; tejaladigan narsa — sörov hajmi ([Releasebot](https://releasebot.io/updates/anthropic/claude)).
- **5-noyabr — Personal Finance (beta).** Pro, Max va Ultra foydalanuvçilari uçun, faqat AQŞ. Plaid orqali bank va kredit karta hisoblari ulanadi; vosita faqat öqiş rejimida — pul köçira olmaydi, boşqarmaydi va investitsiya qilmaydi. Anthropic'ning aytişiça, bu bölimdagi suhbatlar modellarni öqitişda işlatilmaydi ([TechCrunch](https://techcrunch.com/2026/11/05/claude-can-now-analyze-your-spending-with-its-new-personal-finance-tool/)).
- **5-noyabr — Claude Enterprise uçun xavfsizlik va admin boşqaruvi:** security center, inference hooks, markazlaştirilgan boşqaruv (ba'zilari beta).
- **6-noyabr — Cost code böyiça xarajat kuzatuvi (beta)** — Enterprise taşkilotlari uçun.
- **23-oktyabr — Claude for Enterprise birlaştirildi:** Chat va Cowork bitta tajribaga köçdi; yangi *Efficient mode* Sonnet va Haiku modellarida qoladi.
- **22-oktyabr — subagentlarni asosiy agent siklga qöşiş böyiça yöriqnoma** va migratsiya töplami. Postda ta'kidlanişiça, ilğor modellar uçun Claude Code tizim prompti 80% dan köp qisqartirilgan.
- **21-oktyabr — Claude Duet research preview** (Pro va Max): Claude proaktiv agent sifatida işlaydigan yangi ilova.

## Qaysi vazifa uçun qaysi model?

Quyidagi jadval — **mening tavsiyam**, rasmiy qoida emas. Anthropic'ning özi aytgani: murakkab agentic kodlaş uçun Sonnet 5.5 yoki Opus 5.5, yuqori hajmli tor vazifalar uçun Haiku 5.5.

| Vazifa turi | Boşlanğiç model | Qaçon almaştiriş kerak |
| :-- | :-- | :-- |
| Klassifikatsiya, ekstraksiya, xulosalaş, compaction | Haiku 5.5 | Eval'da pass@1 pasaysa yoki prompt 100k dan oşsa |
| Kundalik kodlaş, RAG javoblari, standart agentlar | Sonnet 5.5 | Köp bosqiçli, uzoq davom etadigan vazifalarda xato köpaysa |
| Eng murakkab agentic kodlaş, uzun tadqiqot, qiyin tahlil | Opus 5.5 | Opus xarajati oqlanmasa — Sonnet'ga qaytiş |
| Kiber yoki biologiya tadqiqoti (tekşirilgan taşkilotlar) | Mythos 5.1 | Faqat verification program orqali |

Iş tartibi, men tavsiya qiladigan:

1. **Sonnet 5.5 dan boşlang.** U eng keng vazifalar spektrini yopadi va 1M kontekstga ega.
2. **30–100 ta haqiqiy misolda eval yozing** (yuqoridagi 5-bölim).
3. **Pastga tekşiring:** Haiku 5.5 qaysi vazifalarda Sonnet bilan teng? Eng katta tejaş şu yerda.
4. **Yuqoriga tekşiring:** Opus 5.5 qaysi vazifalarda ortiqça pulga arziydi? `cost_per_success` bilan ölçang.
5. Natijani routing qoidasiga aylantiring va har yangi model çiqqanda qayta yurgizing.

## Çeklovlar va tekşirilmagan jihatlar

- Anthropic e'lonlaridagi barça raqam *vendor-reported*. Mustaqil qaytarilgan natijalarni alohida tekşirmadim.
- SWE-bench natijalari Opus 5.5 va Haiku 5.5 rasmiy sahifalarida körsatilmagan, şuning uçun maqolaga kiritmadim.
- Fable 5.1 va Mythos 5.1 raqamlari ikkilamçi manbadan (Vellum) olingan.
- Kontekst oynasi va maksimal çiqiş hajmi Sonnet 5.5 dan boşqa modellar uçun rasmiy e'lon sahifalarida körsatilmagan; qiymat yozmadim.
- Narx hisob-kitobi (jadval va kod) — mening hisobim; haqiqiy hisob modelga xos tokenizatsiya va thinking tokenlariga boğliq.

## Manbalar

- Anthropic: [Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5) (2026-09-22), [Claude Sonnet 5.5](https://www.anthropic.com/claude/sonnet) (2026-09-28), [Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5) (2026-10-07).
- Anthropic: [Fable va Mythos modellariga kiriş bayonoti](https://www.anthropic.com/news/fable-mythos-access).
- [Claude release notes](https://support.claude.com/en/articles/12138966-release-notes) va [Releasebot: Claude yangilanişlari](https://releasebot.io/updates/anthropic/claude).
- [Vellum: Fable 5.1 va Mythos 5.1 benchmarklari](https://www.vellum.ai/blog/claude-fable-5-1-mythos-5-1-benchmarks-explained) (ikkilamçi manba).
- [TechCrunch: Claude Personal Finance](https://techcrunch.com/2026/11/05/claude-can-now-analyze-your-spending-with-its-new-personal-finance-tool/) (2026-11-05).
- [LetsDataScience: Opus 5.5 e'lonining yoritilişi](https://letsdatascience.com/news/anthropic-launches-claude-opus-55-with-safeguards-5d52f322).
- [Claude Platform hujjatlari](https://docs.claude.com).
