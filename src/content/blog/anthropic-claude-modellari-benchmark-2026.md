---
title: "Anthropic Claude modellari 2026: Fable 5.2, Opus 5.5, Sonnet 5.5 va Haiku 5.5 — lineup, narxlar, benchmarklar"
description: "2026-yil 14-noyabr holatiga Claude modellari: API ID, narx, nima uçun möljallanganligi va Anthropic e'lon qilgan benchmark raqamlari."
pubDate: 2026-11-07
updatedDate: 2026-11-14
tags: ["anthropic", "claude", "ai", "benchmark", "llm", "api"]
---

> **Holat sanasi:** 2026-yil 14-noyabr. Lineup, API ID'lar va narxlar Claude Platform hujjatlaridan qayta tekşirildi. Benchmark raqamlari Opus 5.5 va Haiku 5.5 e'lonlaridan olingan; ularni bu safar qayta ochib bölmadi (pastda «Tekshirilmagan»).

Bu maqolada Claude modellarining jorij ro'yxati, API ID'lari, narxlari va Anthropic e'lon qilgan benchmark natijalari bor. Model va effort darajasini qanday tanlaş, narx hisobini va routing kodini [model va effort tanlaş maqolasida](/blog/claude-model-va-effort-tanlash) körib çiqaman.

## Joriy lineup

Narxlar 1M token uçun, USD. Claude Platform hujjatlariga köra, Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.1 va Fable 5.2 da kontekst oynasi 1M token, maksimal javob 128K token. Mythos modellari Fable bilan bir xil imkoniyat va narxga ega.

| Model | API ID | Çiqqan sana | Kiriş / çiqiş | Cache öqiş | Nima uçun möljallangan |
| :-- | :-- | :-- | :-- | :-- | :-- |
| Claude Fable 5.2 | `claude-fable-5-2` | 2026-11-09 | $8 / $40 | $0.20 | Umumiy maqsadli yuqori qatlam. Hozirgi Fable. |
| Claude Mythos 5.2 | Sahifada körsatilmagan | 2026-11-09 | $8 / $40 | $0.20 | Faqat tekşirilgan tashkilotlar uçun. Fable 5.2 bilan bir xil imkoniyat. |
| Claude Opus 5.5 | `claude-opus-5-5` | 2026-09-22 | $4 / $20 | $0.20 | Murakkab agentic kodlaş va bilim işi |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | 2026-09-28 | $2 / $10 | $0.10 | Kundalik kodlaş, agentlar, bilim işi |
| Claude Haiku 5.5 | `claude-haiku-5-5` | 2026-10-07 | $0.10 / $0.50 (≤ 100k prompt); $0.50 / $2.50 (100k dan uzun) | $0.01 (≤ 100k); $0.05 (100k dan uzun) | Xulosalaş, compaction, subagentlar, yuqori hajmli tor vazifalar |
| Claude Fable 5.1 (eski) | `claude-fable-5-1` | 2026-09-01 | $10 / $50 | $0.25 | Fable 5.2 bilan almaştirildi. Platform hujjatida öçiriş sanasi 2027-yil 1-sentyabrdan oldin emas. |
| Claude Mythos 5.1 (eski) | `claude-mythos-5-1` | 2026-09-01 | $10 / $50 | $0.25 | Tekşirilgan tashkilotlar uçun |

Opus 5.5 ning «fast» rejimi 2.5 baravar tez va $8 / $40 narxda. Bu Opus 5.5 e'lonidagi ma'lumot (pastda «Tekshirilmagan»).

### Mythos nima uçun alohida

Mythos Fable bilan bir xil imkoniyat va narxga ega, lekin unga kirish faqat Anthropic'ning Cyber Verification Program yoki Life Sciences Verification Program orqali tekşirilgan tashkilotlarga beriladi. Fable'da biologiya va kiberxavfsizlik bo'yicha qo'shimcha xavfsizlik choralari bor.

### Iyun 2026: kirish uzilishi

Fable 5 va Mythos 5 9-iyunda chiqdi. 12-iyunda AQŞ Savdo departamenti eksport nazorati talablari tufayli Anthropic ikkala model uchun kirishni töxtatdi. Cheklov 30-iyunda bekor qilindi, kirish 1-iyulda tiklandi ([Anthropic bayonoti](https://www.anthropic.com/news/fable-mythos-access)).

## Benchmark natijalari

Quyidagi raqamlar Anthropic'ning o'z e'lonlaridan. Bular vendor-reported natijalar, mustaqil tekşiruv emas. Har jadvalda manba va versiya körsatilgan.

### Opus 5.5 e'loni (2026-09-22)

Anthropic'ning Opus 5.5 e'lonidagi jadval. Fable 5.1 ustuni eski Fable, Fable 5.2 emas.

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

Opus 5.5 bu jadvalda hamma qatorda Fable 5.1 dan yuqori. Bu Anthropic'ning o'z testi; boshqa vendorlarning testlari bilan solishtirilmagan.

### Haiku 5.5 e'loni (2026-10-07)

Anthropic'ning Haiku 5.5 e'lonidagi jadval. Sonnet 5.5 ustuni shu e'londa berilgan. FrontierCode uchun effort Xhigh.

| Benchmark | Haiku 5.5 | Haiku 4.5 | Sonnet 5.5 |
| :-- | --: | --: | --: |
| GDPval-AA v2.1 (Elo) | 1620 | 735 | 1840 |
| AA-Briefcase v1.1 | 1578 | 614 | 1824 |
| OSWorld 2.1 (offline subset) | 72.4% | 15.7% | 83.9% |
| Humanity's Last Exam (tools'siz) | 45.9% | 10.2% | 56.9% |
| Humanity's Last Exam (tools bilan) | 57.4% | 18.7% | 64.5% |
| Terminal-Bench 4.0 | 39.2% | 0.0% | 70.6% |
| FrontierCode 1.1 (Main) | 46.4% | — | 52.1% (Xhigh) |
| Chartography (tools'siz) | 46.4% | 6.4% | 61.6% |

### Fable 5.1 va Mythos 5.1 (ikkilamchi manba)

Vellum xulosasida Mythos 5.1 uchun e'lon qilingan yagona raqam: Terminal-Bench 4.0 — 60.9% (Fable 5.1: 55.8%). Vellumdagi boshqa Fable 5.1 raqamlari (OSWorld 2.0, GDPval-AA v2, CursorBench 3.2.0) yuqoridagi jadvallarning versiyasiga töğri kelmaydi, şuning uçun bu maqolaga kiritilmadi.

## Benchmarkni öqiş qoidalari

- **Kim e'lon qilgan.** Bu raqamlar Anthropic'ning o'z testlari (vendor-reported). Mustaqil replikatsiya bu maqolada yo'q.
- **Versiya.** GDPval-AA v2 va v2.1 bir xil emas. Fable 5.1 uchun Opus 5.5 e'lonida (v2.1) 1735, Vellum xulosasida (v2) 1853. Bu 118 ballik farq benchmark versiyasidan, modeldan emas.
- **Effort va harness.** Terminal-Bench 4.0 da Sonnet 5.5 — 70.6%, Opus 5.5 — 66.4%. Ikki raqam ikki sahifadan, effort yoki harness boshqacha bo'lishi mumkin. Shuning uchun «Sonnet Opus'dan kuçli» degan xulosa çiqmaydi.
- **Subset va protokol.** "partial", "strict" va "offline subset" — boşqa-boşqa testlar. Opus 5.5 ning OSWorld 2.1 (partial) natijasi 81.8%, Sonnet 5.5 ning OSWorld 2.1 (offline subset) natijasi 83.9%. Bularni bir qatorga qöymang.
- **Xavfsizlik filtrlari.** Vellum xulosasiga köra, OSWorld 2.0 da Fable 5.1 ning xavfsizlik filtrlari ishga tuşgan vazifalar nolga hisoblangan. Bunday qatorlar modelning sof qobiliyati emas, pastki çegara.
- **Şovqin.** Terminal-Bench-Science da standart xato ±3.5–4.5 punkt (Vellum). 1–2 punktlik farq bu yerda heç narsani isbotlamaydi. Bunday savolga faqat o'z vazifangizda o'lchash javob beradi.

## Tekshirilmagan

- Anthropic e'lon sahifalari (`anthropic.com/claude-opus-5-5`, `/claude/sonnet`, `/claude-haiku-5-5`) va Fable/Mythos bayonoti 2026-11-14 da ochilmadi: sandbox'dan so'rov 403 bilan rad etildi. Benchmark jadvallari, Opus 5.5 fast rejimi va iyun voqealari oldingi o'qishdan olingan.
- Fable 5.2 va Mythos 5.2 uchun benchmark raqamlari topilmadi. Fable 5.2 e'lonidagi "30% tezroq" va "55% kam keraksiz blok" da'volari mustaqil tekşirilmagan.
- Mythos 5.2 API ID'i rasmiy sahifada körsatilmagan. Uning çiqqan sanasi (2026-11-09) ikkilamchi manbadan ([SD Times](https://sdtimes.com/ai/anthropic-introduces-claude-fable-5-2-mythos-5-2/)). Mythos 5.1 dagi AQŞ cheklovi Mythos 5.2 uchun ham qolganmi, bilmayman.

## Manbalar

Rasmiy, 2026-11-14 da o'qilgan:

- [Claude Fable 5.2 — Platform hujjati](https://platform.claude.com/docs/en/models/fable-5-2/overview)
- [Claude Fable 5.1 — Platform hujjati](https://platform.claude.com/docs/en/models/fable-5-1)
- [Claude Mythos 5.1 — Platform hujjati](https://platform.claude.com/docs/en/models/mythos-5-1/overview)
- [Claude Opus 5.5 — Platform hujjati](https://platform.claude.com/docs/en/models/opus-5-5/overview)
- [Claude Sonnet 5.5 — Platform hujjati](https://platform.claude.com/docs/en/models/sonnet-5-5/overview)
- [Claude Haiku 5.5 — Platform hujjati](https://platform.claude.com/docs/en/models/haiku-5-5/overview)

Anthropic e'lonlari, avval o'qilgan (2026-11-14 da qayta ochilmadi):

- [Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5)
- [Claude Sonnet](https://www.anthropic.com/claude/sonnet)
- [Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5)
- [Fable va Mythos modellariga kirish bayonoti](https://www.anthropic.com/news/fable-mythos-access)

Ikkilamchi:

- [SD Times: Fable 5.2 va Mythos 5.2 e'loni](https://sdtimes.com/ai/anthropic-introduces-claude-fable-5-2-mythos-5-2/) (2026-11-09)
- [Vellum: Fable 5.1 va Mythos 5.1 benchmarklari](https://www.vellum.ai/blog/claude-fable-5-1-mythos-5-1-benchmarks-explained)
