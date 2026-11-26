---
title: "Gemini 3.8 Flash vs Gemini 4 Hydrogen: nima farqi bor"
description: "Google'ning ikki modeli: tezkor 3.8 Flash va yangi 4 Hydrogen. Narx, tezlik, Artificial Analysis indeksi va Google'ning öz benchmarklari asosida soliştiriş, hamda prompt testlari haqida rostgoy izoh."
pubDate: 2026-11-26
updatedDate: 2026-11-26
tags: ["gemini", "google", "ai", "llm", "benchmark", "soliştiriş"]
---

Google'da bir vaqtning özida ikkita model yuribdi: tezkor va arzon **Gemini 3.8 Flash** hamda yangi, kuçliroq **Gemini 4 Hydrogen**. Köp odam bittasini tanlaşda qiynaladi. Bu maqolada ikkala model narx, tezlik va sifat böyiça qanday farq qilişini körib çiqamiz. Har bir raqamning manbasini ham körsatib boraman, çunki model e'lonlarida köpinça faqat eng yaxşi natija körsatiladi.

Holat sanasi: 2026-11-26. Ma'lumotlar Google'ning rasmiy sahifalari, DeepMind model kartasi, Artificial Analysis (AA) va BenchLM dan olingan.

## Qisqaça xulosa

- **3.8 Flash** arzon va tez. Kundalik vazifalar, katta hajmdagi matn va oddiy kodlaş uçun mos.
- **4 Hydrogen** qiyin mulohazalar, murakkab kodlaş va terminal vazifalarida ança kuçli. Narxi 3.8 Flashning standart narxiga teng.
- Intro narxi tufayli 2026-yil oxirigaça 3.8 Flash ança arzon. 2027-yil 1-yanvardan keyin farq faqat sifatda qoladi, narxda emas.
- Hammasi bir xil emas: ba'zi benchmarklar Google'ning öz harnesslarida ölçangan, şuning uçun ularni mustaqil natijalar bilan aralaştirmaslik kerak.

## Modellar haqida asosiy ma'lumot

| Körsatkiç | Gemini 3.8 Flash | Gemini 4 Hydrogen |
| --- | --- | --- |
| Çiqarilgan sana | 2026-09-02 (stable) | Google blogi: 2026-11-12 |
| Kiriş konteksti | 1 048 576 token | 1 000 000 token |
| Çiqiş limiti | 65 536 token | Google 1M gaça deydi |
| Narx (1M token, kiriş/çiqiş) | Intro: $0.75 / $3.75 (2026-12-31 gaça); keyin $1.50 / $7.50 | $1.50 / $7.50 |
| Fikrlaş darajalari | — | low, medium, high, xhigh |
| Bilim çegarasi | 2026-yil mart | — |

Bu jadvalda narxlar Google'ning rasmiy sahifalaridan. Hydrogen uçun fikrlaş darajalari (thinking levels) ham rasmiy e'londa körsatilgan. Ya'ni bitta modelning içida tezlik va sifat örtasida özingiz tanlov qilasiz.

![Narx: 1 million token uçun](/images/blog/gemini-3-8-flash-vs-gemini-4-hydrogen/price.webp)

*Rasm: 1 million token uçun narx. Ikkala model standart narxda bir xil. 3.8 Flashning intro narxi faqat 2026-yil oxirigaça amal qiladi. Grafik qayta çizilgan, Google sahifasidagi raqamlar asos qilib olingan.*

## Sifat: Artificial Analysis indeksi

Artificial Analysis (AA) turli benchmarklarni bitta umumiy Intelligence Index ga yiğadi. Bu raqam mustaqil platformadan, lekin ularning ölçaş şaroiti ham bor.

- **3.8 Flash**: 31 (High rejim), 30 (Medium), 22 (Low). AA uni eskirgan deb belgilagan va Hydrogen'ni tavsiya qiladi.
- **4 Hydrogen**: 51 (High), 54 (Xhigh), 41 (Medium), 27 (Low).

Demak, High rejimda Hydrogen indeksi 3.8 Flashdan deyarli 20 ball yuqori. Eng past (Low) rejimda esa 4 Hydrogen 27 ball oladi, bu 3.8 Flashning High rejimidan ham past. Ya'ni "Hydrogen har doim yaxşi" degan xulosa töğri emas, rejimni töğri tanlaş kerak.

![AA Intelligence Index](/images/blog/gemini-3-8-flash-vs-gemini-4-hydrogen/intelligence-index.webp)

*Rasm: Artificial Analysis Intelligence Index, High rejimdagi natijalar. Xhigh uçun 4 Hydrogen 54 ball oladi.*

## Tezlik va keçikiş

AA ikki narsani ölçagan: çiqiş tezligi (token/sekund) va birinçi tokengaça kutiş vaqti (TTFT).

- **Çiqiş tezligi**: 3.8 Flash ~100 token/s (High). 4 Hydrogen ~176 token/s (High), Xhigh rejimda ~173 token/s.
- **Birinçi token kutiş vaqti**: 3.8 Flash ~22 s (High). 4 Hydrogen ~18.4 s (High), Xhigh rejimda ~53.5 s.

Şunday qilib, Hydrogen çiqiş tezligida 3.8 Flashdan taxminan 1.7 marta tez, lekin Xhigh rejimda javobni boşlaşni ança kutadi. Google blogida Hydrogen "2.5 marta tez" deyilgan. Bu ularning öz ölçovi, AA raqamlari bu bilan töliq mos emas. Şuning uçun tezlikni özingiz tajribada tekşirgan ma'qul.

![Çiqiş tezligi](/images/blog/gemini-3-8-flash-vs-gemini-4-hydrogen/output-speed.webp)

*Rasm: Çiqiş tezligi, token/sekund. AA High rejimi. Xhigh rejimda Hydrogen ~173 token/s, bu ham 3.8 Flashdan yuqori.*

## Google'ning öz benchmarklari

Google blogida 4 Hydrogen'ning 3.8 Flash bilan taqqoslangan natijalari bor. Eng katta farq Terminal-Bench 4.1 da:

- Terminal-Bench 4.1: **4 Hydrogen 57.0%**, 3.8 Flash 18.2% (Google hisobi böyiça).

Blogda yana HLE-Diamond (58.8%), Agents' Last Exam v1.1 (71.6%) va MKA (53.4%) kabi natijalar ham bor. Lekin 3.8 Flash uçun bu körsatkiçlar köpinça yöq yoki boşqa versiyada. Google özi bir joyda taqqoslaşda "Gemini 3.5 Flash" deb ham yozgan, bu çalkaşlik keltiradi.

![Terminal-Bench 4.1](/images/blog/gemini-3-8-flash-vs-gemini-4-hydrogen/terminal-bench-41.webp)

*Rasm: Terminal-Bench 4.1 natijalari, Google e'loni böyiça. Bu vendor-reported raqam, mustaqil tekşiruv emas.*

### Muhim izoh: versiyalar aralaşmasin

Terminal-Bench'ning bir neçta versiyasi bor: 2.1, 4.0 va 4.1. 3.8 Flashning model kartasida Terminal-Bench 2.1 da 89.4% va 4.0 da 19.1% körsatilgan. Hydrogen uçun esa 4.1 da 57.0%. Ya'ni 3.8 Flashning "89.4%" natijasini Hydrogenning "57.0%" bilan soliştiriş notöğri böladi, çunki ular turli testlar. Haqiqiy taqqoslaş faqat bir xil versiyada mumkin, va u hozirça mavjud emas.

## Mustaqil reyting: BenchLM

BenchLM 2026-yil 23-noyabrga köra umumiy ballni hisoblagan: 4 Hydrogen **78.8** ball, 216 ta model içida **11-örin**. 3.8 Flash esa **68.0** ball. Bu reyting ham turli benchmarklar yiğindisi, şuning uçun uni ham mutlaq hukm deb qabul qilmaslik kerak.

## Prompt testlari haqida rostini aytsam

Maqsadda prompt testlari va ularning natijalari ham bor edi. Lekin bu muhitda Gemini API'ga kiriş yöq, şuning uçun men testlarni işga tuşira olmadim. Şu sababli bu maqoladagi heç bir "test natijasi" men tomonimdan ölçanmagan. Hamma raqamlar yuqorida manbalari körsatilgan e'lonlardan olingan.

Agar özingiz sinab körmoqçi bölsangiz, quyidagi tört turdagi promptni ikkala modelga bir xil şaroitda (bir xil fikrlaş darajasi, bir xil temperatura, bir xil kiriş) berib köring:

1. **Matematik mulohaza**: "Ketma-ketlikning 10-hadini toping va isbotlang" kabi köp bosqiçli masala.
2. **Kod**: bitta funksiyadagi xatoni topiş va tuzatiş, testlar bilan birga.
3. **Uzun kontekst**: 100 sahifalik hujjatdan aniq bir faktni topiş.
4. **Tezlik**: bir xil qisqa savolga javob vaqti va token/sekund.

Har bir natijani qölda tekşiring. Benchmarkdan köra özingiz işlatadigan vazifadagi natija muhimroq.

## Qaysi birini tanlaş kerak

- **Katta hajmdagi, arzon va tez vazifalar** (tarjima, tasniflash, qisqa javoblar, çatbot): 3.8 Flash. Intro narxi tugagunça juda arzon.
- **Murakkab mulohaza, köp bosqiçli kodlaş, terminal vazifalari**: 4 Hydrogen. High rejimi köpçilik uçun yetarli, Xhigh esa eng qiyin masalalar uçun.
- **Eng past keçikiş kerak bölsa**: 3.8 Flash ba'zi holatda oldinda, çunki Hydrogen Xhigh rejimida birinçi tokenni ança kutadi.

## Kiçik hazil

Google modellarini davriy jadvaldan tanlayotganga öxşaydi. Hydrogen — jadvaldagi eng yengil element. 3.8 Flash esa nomi bilan tezligini oşkor qiliş. BenchLM röyxatida Gemini 4 Carbon va Neon ham bor, şuning uçun keyingi model nomi qanday bölişini taxmin qilish qiyin emas. Lekin nomga emas, raqamlarga qaraymiz.

## Manbalar

- [Google blogi: Gemini 4 Hydrogen](https://blog.google/)
- [Gemini 3.8 Flash hujjatlari va model kartasi](https://ai.google.dev/)
- [DeepMind model kartasi](https://deepmind.google/)
- [Artificial Analysis: Gemini 4 Hydrogen](https://artificialanalysis.ai/)
- [Artificial Analysis: Gemini 3.8 Flash](https://artificialanalysis.ai/)
- [BenchLM: Gemini 4 Hydrogen](https://benchlm.ai/)
