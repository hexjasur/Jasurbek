# Blog yozish qoidalari

Bu hujjat blog postlarini yozish va tahrirlashda majburiy. Maqsad: o'quvchi maqolani bir marta ökib, nima qilish kerakligini va nima uchun shunday qilish kerakligini tushunsin.

## Asosiy tamoyillar

1. **Bitta maqola — bitta vazifa.** O'quvchi maqoladan keyin nimani bilishi yoki qila olishi kerakligini bir gapda ayta olishi kerak. Bunday gap bo'lmasa, maqola bo'lib ketgan.
2. **Oldin kontekst, keyin qadam.** Nega kerak, qachon kerak, nimasi kerak. Keyin buyruq yoki kod.
3. **Har bir tushuncha: ta'rif → sabab → minimal misol → natija → keng tarqalgan xato.** Hamma bo'limlarga bu shart emas, lekin yangi atama uchun ta'rif va sabab har doim bo'lsin.
4. **Kamroq, lekin aniqroq.** Bir fikrni ikki marta aytmang. Xulosa bo'limi asosiy matnni takrorlamasin: bitta amaliy xulosa yoki keyingi qadam yetarli.
5. **Har bir raqam, versiya va buyruq tekshirilgan bo'lsin.** Manbasi yo'q raqamni yozmang. Taxminni "taxmin" deb belgilang.

## Ilmiy asos

- **Worked-example effect (Sweller, cognitive load theory).** Yangi o'rganuvchilar uchun to'liq yechilgan misol ko'pincha masalani o'zi yechishdan samaraliroq. Misollarni asta-sekin kamaytirib boring (fading). Har bir qadamga *nega* ni qo'shing (self-explanation). Matn va rasm bir joyda bo'lsin (split-attention'dan qoching). Ilg'or o'quvchi uchun misol ortiqcha bo'lishi mumkin (expertise reversal).
- **Desirable difficulties (Bjork).** Ba'zi qiyinchiliklar uzoq muddatli o'rganishni kuchaytiradi: o'zini sinash (retrieval), taqsimlangan takrorlash (spacing), turli mavzularni aralashtirish (interleaving). Qayta o'qish va bir xil turdagi mashqlarni ketma-ket bajarish esa tez ishlaydi, lekin keyin unutiladi. Shuning uchun maqolada o'quvchiga o'zi tekshiradigan savol yoki "buni o'zingiz sinab ko'ring" qadami bo'lsin.
- **Mayer, multimedia learning.** Keraksiz bezak va ortiqcha matnni olib tashlang (coherence). O'quvchi nimaga e'tibor berishi kerakligini ko'rsating (signaling). Rasmni u bilan bog'liq matn yoniga qo'ying (spatial contiguity). Katta matnni bo'laklarga bo'ling (segmenting). Asosiy tushunchalarni avval tushuntiring (pre-training). Bir xil ma'lumotni rasm, matn va ovozda bir vaqtda takrorlamang (redundancy).

Manbalar: [Worked-example effect — Wikipedia](https://en.wikipedia.org/wiki/Worked-example_effect), [Desirable Difficulties — Association for Psychological Science](https://www.psychologicalscience.org/observer/desirable-difficulties), [Mayer's multimedia learning principles — Ohio State University](https://u.osu.edu/multimedialearning/?p=11).

## Ton va ovoz

- Muallif birinchi shaxsda gapiradi: "men", "biz" (kitobxon bilan birga). Haqiqiy tajriba bo'lsa, shuni yozing: nima ishladi, nima ishlamadi.
- Quruq va aniq. Maqtov, hayajon, "ajoyib", "kuchli", "inqilobiy" kabi so'zlar yo'q.
- Qisqa gaplar aralashsin. Bir xil uzunlikdagi gaplar ketma-ket kelmasin.
- Tushunarli so'zlar. Atama kerak bo'lsa, birinchi marta ta'rifi bilan keling.
- Savol bilan ochmang ("Hech o'ylab ko'rganmisiz?"), "Keling, ko'rib chiqamiz" kabi ko'rsatma so'zlar bilan boshlamang, "Qiziq jihati shundaki" demang.

## AI yozuvining belgilari (olib tashlang)

- Bir xil tuzilmadagi bo'limlar: har biri "Nima?", "Nega?", "Qanday?", "Xulosa" bilan.
- Har bo'limni takroriy xulosa bilan tugatish.
- Ruknli uch so'zlik (ro'yxat) ko'nikmasdan.
- "Bu muhim" / "Eslatib o'tamiz" / "Quyida ko'rsatilgan" kabi bo'sh iboralar.
- Ortiqcha jirnoq (qalin shrift) va emoji.
- Har bir jumlada "ya'ni", "shuningdek", "bundan tashqari" kabi bog'lovchilarni zanjir qilish.
- Ro'yxat ichida ro'yxat, jadvalni matn bilan qayta aytish.

## Tuzilma

- Sarlavha (`title`) — aniq va qidiruvga mos. Ta'rif (`description`) — 160 belgidan kam, bir yoki ikki oddiy gap.
- Kirish: 2–4 jumla. Maqola nima haqida, kimga kerak, nima oldindan bilish kerak.
- Bo'limlar `##` bilan. Kichik bo'limlar `###` bilan.
- Har bir amaliy qadam uchun: buyruq → kutilgan natija → nima xato bo'lishi mumkin.
- Yakun: bitta qisqa amaliy xulosa yoki keyingi qadam. "Xulosa" degan sarlavha majburiy emas.

## Kod va buyruqlar

- Har bir kod bloki tilini ko'rsating (`bash`, `powershell`, `ts`, `yaml`, `maple`).
- Kodni ishlatib tekshiring yoki tekshirilmaganini aytib qo'ying.
- Natijani kod bloki ostida yoki yonida ko'rsating, lekin uzun chiqishni to'liq ko'chirmang.

## Sana va yangilanish

- Yangi post: `pubDate` bugungi sana.
- Mavjud postni tahrirlasangiz: `updatedDate` ni tahrir kuniga qo'ying, `pubDate` ni o'zgartirmang (AGENTS.md).
- Versiya, narx, reja, model nomi kabi tez o'zgaradigan ma'lumot uchun "holat sanasi"ni yozing.

## O'zbek tili

- Yangi isloh qilingan lotin alifbosi: `O'`→`Ö`, `G'`→`Ğ`, `sh`→`Ş`, `ch`→`Ç`. Tutuq belgisi (`'`) `ma'lumot`, `ta'lim` uchun saqlanadi.
- URL, fayl nomi, frontmatter kalitlari, kod identifikatorlari o'zgarmaydi.
- Tekshirish: `node .claude/skills/anthropic-models-uz/scripts/check-uz-alphabet.mjs src/content/blog/<fayl>.md`.
- Ingliz tilidagi postlar ingliz tilida qoladi.

## Oldin tekshirish ro'yxati

- [ ] O'quvchi maqoladan keyin nima qila olishini bir gapda ayta olaman.
- [ ] Har bir atama birinchi marta tushuntirilgan.
- [ ] Takrorlangan bo'lim, paragraf yoki xulosa yo'q.
- [ ] Har bir raqam, versiya va buyruq manbasi yoki tekshiruvi bor.
- [ ] Ichki havolalar saytning ildizidan (`/blog/...`) va ishlaydi.
- [ ] Tashqi havolalar ishlaydi, buzilgan belgilar yo'q (masalan `Arçives`).
- [ ] Rasm uchun ma'noli `alt` matni bor.
- [ ] `updatedDate` yangilangan (agar post tahrirlangan bo'lsa).
- [ ] `bun run build` o'tadi.
