---
title: "Maple'da matematika: algebradan hosila va integralgaça — amaliy maşğulot misollari"
description: "4-kurs, 7-semestr amaliy maşğulotlarida işlagan Maple misollarim: simplify, expand, factor, trigonometrik tenglamalar va _EnvAllSolutions, töplamlar, matritsalar, hosilalar hamda aniq va aniqmas integrallar (Int va int, evalf) — kod, natija va izoh bilan."
pubDate: 2026-11-05
updatedDate: 2026-11-11
tags: ["maple", "matematika", "dasturlash", "universitet", "algebra", "hosila", "integral"]
---

4-kurs, 7-semestrda **Maple** dasturida amaliy maşğulotlar ötkazdik. Maple — qölda işlaş qiyin bölgan ifodalarni soddalaştiradigan, tenglamalarni yeçadigan, hosila va integral hisoblaydigan, grafik çizadigan kompyuter algebra tizimi.

Bu maqolada amaliy maşğulotlarda işlagan misollarimni mavzular böyiça tartib bilan yozib çiqdim: algebradan boşlab, trigonometriya, matritsalar va hosila orqali integralgaça. Har bir mavzuda aniq misol, kod, natija va qisqa izoh bor. Maqsad — buyruqlarni yodlaş emas, har bir natijaning nima uçun şunday çiqqanini tuşunişdir.

> Kodlar Maple'ning oddiy matn körinişida yozilgan. `:=` — qiymat beriş, `;` — natijani körsatiş, `:` — natijani yaşiriş.

## 1. Birinçi qadam: özgaruvçilar va oddiy hisob

Eng sodda misol — töğri törtburçakning yuzi:

```maple
a := 12:
b := 8:
S := a*b;
```

Natija: `S := 96`. Ikki nuqta (`:`) bilan tugagan qatorlar natijani ekranga çiqarmaydi, faqat qiymatni eslab qoladi.

## 2. simplify — ifodani soddalaştiriş

`simplify` murakkab ifodani eng sodda körinişga keltiradi.

```maple
simplify((x^2 - 1)/(x - 1));
```

Natija: `x + 1`. Maple `x^2 - 1` ni `(x-1)(x+1)` ga ajratib, `(x-1)` ni qisqartiradi. Bu işni biz uçun avtomatik bajaradi.

## 3. expand — qavslarni oçiş

`expand` ifodani yoyib, köphad körinişiga keltiradi.

```maple
expand((x - y)^2);
expand((x + 3)^2);
```

Natijalar:

- `x^2 - 2*x*y + y^2`
- `x^2 + 6*x + 9`

Bu qisqa köpaytiriş formulalari: `(a - b)^2 = a^2 - 2ab + b^2`. Formulani yodlaş şart emas, lekin natijani qölda tekşirib köriş foydali.

## 4. factor — köpaytuvçilarga ajratiş

`factor` — `expand` ning teskarisi.

```maple
factor(x^4 - 81);
factor(x^2 - 5*x + 6);
```

Natijalar:

- `(x - 3)*(x + 3)*(x^2 + 9)`
- `(x - 2)*(x - 3)`

Birinçi misolda `x^4 - 81` avval `(x^2 - 9)(x^2 + 9)` böladi, keyin `x^2 - 9` yana ajraladi. `x^2 + 9` esa haqiqiy sonlarda ajralmaydi.

## 5. Trigonometriya

Maple'da `sin`, `cos`, `tan`, `cot`, `sec`, `csc` funksiyalari bor. Burçak radianda beriladi, `Pi` — son π.

```maple
sin(Pi/2);
cos(Pi);
simplify(sin(x)^2 + cos(x)^2);
```

Natijalar: `1`, `-1` va `1`. Oxirgisi asosiy trigonometrik ayniyat.

Trigonometrik tenglamani `solve` bilan yeçamiz:

```maple
solve(sin(x) = 1/2, x);
```

Odatda Maple bitta (asosiy) yeçim beradi: `Pi/6`. Lekin `sin(x) = 1/2` tenglamaning yeçimlari çeksiz köp. Hammasini oliş uçun avval maxsus özgaruvçini yoqamiz:

```maple
_EnvAllSolutions := true:
solve(sin(x) = 1/2, x);
```

### `_EnvAllSolutions` nima?

`_EnvAllSolutions` — Maple'ning **muhit özgaruvçisi** (environment variable). Uning nomi `_Env` bilan boşlanadi, çunki u `solve` kabi buyruqlarning işlaş tartibini özgartiradi. Qiymati ikki xil böladi:

- `false` (standart): `solve` faqat **asosiy yeçimni** qaytaradi. Masalan, `sin(x) = 1/2` uçun faqat `Pi/6`.
- `true`: `solve` **barça yeçimlarni** qaytaradi. Davriy funksiyalarda bu davr böyiça takrorlanuvçi butun parametr bilan yoziladi: `x = Pi/6 + 2*Pi*_Z1` va `x = 5*Pi/6 + 2*Pi*_Z1`.

Natijadagi `_Z1` — ixtiyoriy **butun son** (`..., -1, 0, 1, 2, ...`). Maple oxiriga `~` belgisini qöyib (`_Z1~`) bu son haqida taxmin (assumption) borligini bildiradi. Matematikada buni `x = π/6 + 2πk, k ∈ ℤ` deb yozamiz.

Boşqa parametrlar ham bor: `_B1` — ikki qiymatli (0 yoki 1), `_NN1` — manfiy bölmagan butun son. Eng köp uçraydigani `_Z1`.

Ikki eslatma:

- Muhit özgaruvçisi `restart` yoki yangi sessiyadan keyin boşlanğiç holatiga qaytadi. Şuning uçun uni har safar qayta yoziş kerak.
- Yana bir öxşaş özgaruvçi — `_EnvExplicit`. Agar `true` bölsa, `solve` yeçimni `RootOf(...)` körinişida emas, aniq ifoda qilib berişga harakat qiladi.

Grafikni esa şunday çizamiz:

```maple
plot(sin(x), x = 0 .. 2*Pi);
```

## 6. Ketma-ketlik tuziş

`seq` buyruği qoida böyiça ketma-ketlik hosil qiladi. Kvadratlar ketma-ketligi:

```maple
seq(n^2, n = 1 .. 6);
```

Natija: `1, 4, 9, 16, 25, 36`. Yiğindi kerak bölsa, `sum(n^2, n = 1 .. 6)` ni işlatamiz, natija `91`.

## 7. Logarifm

Maple'da natural logarifm `ln`, istalgan asosli logarifm esa `log[asos](son)` körinişida yoziladi.

```maple
simplify(log[2](8));
solve(ln(x) = 2, x);
solve(2^x = 8, x);
```

Natijalar: `3`, `exp(2)` (ya'ni `e^2`) va `3`. Körsatkiçli va logarifmik tenglamalarni bir xil usulda, `solve` bilan yeçamiz.

## 8. Tenglamalar va tengsizliklar

Çiziqli tenglama:

```maple
solve(2*x + 5 = 15, x);
```

Natija: `5`. Kvadrat tenglama:

```maple
solve(x^2 - 5*x + 6 = 0, x);
```

Natija: `2, 3`. Tenglamani taqribiy yeçiş kerak bölsa, `solve` örniga `fsolve` işlatiladi: u raqamli (kasr) javob beradi. Tengsizliklar ham xuddi şunday yeçiladi:

```maple
solve(5*x + 4 <= 19, x);
solve(x^2 - 5*x + 6 > 0, x);
```

Natijalar: `x <= 3` va `x < 2` yoki `x > 3`, ya'ni oraliqlar körinişida `(-∞, 2) ∪ (3, ∞)`.

## 9. Tenglamalar sistemasi

Ikki noma'lumli sistemani bir buyruq bilan yeçamiz:

```maple
eq1 := x + y = 5:
eq2 := x - y = 1:
solve({eq1, eq2}, {x, y});
```

Natija: `{x = 3, y = 2}`. Figurali qavslar sistemaning tenglamalari va noma'lumlarini töplam sifatida beradi.

## 10. Töplamlar ustida amallar

Maple töplamlarni figurali qavsda yozadi:

```maple
A := {1, 2, 3, 4, 5}:
B := {4, 5, 6, 7, 8}:
A union B;
A intersect B;
A minus B;
symmdiff(A, B);
```

Natijalar:

- birlaşma: `{1, 2, 3, 4, 5, 6, 7, 8}`
- kesişma: `{4, 5}`
- ayirma: `{1, 2, 3}`
- simmetrik ayirma: `{1, 2, 3, 6, 7, 8}`

Qöşimça buyruqlar: `member(3, A)` — element tegişliligi, `nops(A)` — elementlar soni, `issubset(A, B)` — qism töplam ekanini tekşiriş.

## 11. Vektorlar

Vektorlar bilan işlaş uçun ham `linalg` paketini ulaymiz:

```maple
with(linalg):
a := vector([1, 2, 3]):
b := vector([2, -1, 0]):
evalm(a + b);
dotprod(a, b);
angle(a, b);
```

Natijalar: yiğindi `[3, 1, 3]`, skalyar köpaytma `0`, vektorlar orasidagi burçak `Pi/2`. Skalyar köpaytma nolga teng bölgani uçun vektorlar özaro perpendikulyar.

## 12. Matritsalar

```maple
A := matrix([[2, 1], [3, 4]]):
B := matrix([[1, 0], [-1, 2]]):
evalm(A + B);
multiply(A, B);
```

Natijalar: yiğindi `[[3, 1], [2, 6]]`, köpaytma `[[1, 2], [-1, 8]]`. Matritsaning boşqa xossalari ham bitta buyruq bilan topiladi:

```maple
det(A);
trace(A);
inverse(A);
transpose(A);
eigenvalues(A);
```

`A` matritsa uçun: determinant `5`, iz (trace) `6`, teskari matritsa `[[4/5, -1/5], [-3/5, 2/5]]`, transponirlangan matritsa `[[2, 3], [1, 4]]`, xos qiymatlar esa `1` va `5`.

> Eslatma: `linalg` eski paket hisoblanadi. Yangi Maple versiyalarida `LinearAlgebra` paketi tavsiya etiladi, lekin dars davomida biz `linalg` bilan işladik.

## 13. Hosila: diff

Endi eng qiziq qismga keldik: **hosila**. Maple'da hosila `diff(ifoda, x)` bilan hisoblanadi.

```maple
f := 3*x^4 + 5*x^3 - 7*x^2 + 4*x + 9;
diff(f, x);
```

Natija: `12*x^3 + 15*x^2 - 14*x + 4`. Qölda ham tekşiramiz: `(3x^4)' = 12x^3`, `(5x^3)' = 15x^2`, `(-7x^2)' = -14x`, `(4x)' = 4`, özgarmasning hosilasi esa nol.

### Yuqori tartibli hosilalar

Ikkinçi, uçinçi va undan keyingi hosilalar uçun `$` belgisi işlatiladi. `x$2` — «`x` böyiça ikki marta».

```maple
f := 2*x^5 - 3*x^4 + 4*x^3 - 5*x^2 + 6*x - 7:
f1 := diff(f, x);
f2 := diff(f, x$2);
f3 := diff(f, x$3);
```

Natijalar:

- `f1 = 10*x^4 - 12*x^3 + 12*x^2 - 10*x + 6`
- `f2 = 40*x^3 - 36*x^2 + 24*x - 10`
- `f3 = 120*x^2 - 72*x + 24`

### Trigonometrik funksiyalar va köpaytma hosilasi

```maple
f := sin(x) + cos(x) + tan(x):
diff(f, x);

f := x^2*sin(x):
diff(f, x);
```

Natijalar: birinçisi `cos(x) - sin(x) + 1 + tan(x)^2` (ya'ni `cos x − sin x + sec² x`), ikkinçisi `2*x*sin(x) + x^2*cos(x)`. Ikkinçi misolda köpaytma hosilasi qoidasi `(uv)' = u'v + uv'` işlatilgan.

### Murakkab funksiya va `Diff`

`Diff` (boş harf bilan) hosilani **hisoblamasdan**, faqat çiroyli yozib körsatadi. `diff` esa hisoblaydi. Ikkisini tenglik bilan yozsak, tayyor formula hosil böladi:

```maple
Diff(sin(x^2), x) = diff(sin(x^2), x);
```

Natija: `d/dx sin(x^2) = 2*x*cos(x^2)`. Bu murakkab funksiya hosilasi qoidasi: taşqi funksiya hosilasi (`cos`) içki funksiya hosilasiga (`2x`) köpaytiriladi.

Bitta yozuvda törtinçi tartibli hosila:

```maple
Diff(cos(2*x)^2, x$4) = diff(cos(2*x)^2, x$4);
```

Maple natijani `-128*sin(2*x)^2 + 128*cos(2*x)^2` körinişida beradi. Uni `128*cos(4*x)` deb soddalaştiriş mumkin: `cos(2x)^2 = (1 + cos 4x)/2` ayniyatidan kelib çiqadi.

### D operatori

`diff` ifodaning hosilasini oladi, `D` esa **funksiyaning** özining hosilasini oladi:

```maple
D(sin);
(D(sin))(Pi);
```

Natijalar: `cos` va `-1`, çunki `cos(π) = -1`. Funksiyani strelka bilan ham beriş mumkin:

```maple
f := x -> ln(x^2) + exp(3*x):
D(f);
```

Natija: `x -> 2/x + 3*exp(3*x)`.

### Xususiy hosilalar

Köp özgaruvçili funksiyada hosila har bir özgaruvçi böyiça alohida olinadi. Avval `arctan(x/y)` funksiyasi:

```maple
f := arctan(x/y):
diff(f, x);
diff(f, y);
```

Natijalar: `y/(x^2 + y^2)` va `-x/(x^2 + y^2)`.

Ikkinçi misolda `f = (x - y)/(x + y)` funksiyasining ikkinçi tartibli xususiy hosilalarini topamiz:

```maple
f := (x - y)/(x + y):
Diff(f, x$2) = simplify(diff(f, x$2));
Diff(f, y$2) = simplify(diff(f, y$2));
Diff(f, x, y) = diff(f, x, y);
```

Natijalar:

- `f_xx = -4*y/(x + y)^3`
- `f_yy = 4*x/(x + y)^3`
- `f_xy = 2*(x - y)/(x + y)^3`

Aralaş hosila `diff(f, x, y)` — avval `x`, keyin `y` böyiça. Bu yerda `diff(f, y, x)` ham xuddi şu natijani beradi, çunki funksiya uzluksiz hosilalarga ega. `simplify` esa natijani ixçam kasr körinişiga keltiradi.

## 14. Integral: int va Int

Hosiladan keyin teskari amal — **integral**. Maple'da integral `int(ifoda, x)` bilan hisoblanadi. Hosiladagi qoida bu yerda ham işlaydi: `Int` (boş harf bilan) integralni **hisoblamasdan**, faqat çiroyli yozib körsatadi, `int` esa hisoblaydi. Ikkisini tenglik bilan yozsak, tayyor formula hosil böladi:

```maple
Int(x^2, x = 0 .. 1) = int(x^2, x = 0 .. 1);
```

Natija: `∫₀¹ x² dx = 1/3`. Chegaralar `x = a .. b` körinişida beriladi. Chegara berilmasa, **aniqmas integral** hisoblanadi.

### Aniq integral: köphad

```maple
Int(3*x^2 + 2*x + 1, x = 0 .. 2) = int(3*x^2 + 2*x + 1, x = 0 .. 2);
int(x^4 - 2*x^2 + 3*x - 1, x = 0 .. 1);
```

Natijalar: `14` va `1/30`. Qölda tekşiramiz: birinçisining boşlanğiç funksiyasi `x³ + x² + x`, uni `2` da hisoblasak `8 + 4 + 2 = 14`, `0` da esa nol. Ikkinçisida `1/5 − 2/3 + 3/2 − 1 = 1/30`. Bu Nyuton–Leybnis formulasi: `∫ₐᵇ f(x) dx = F(b) − F(a)`.

### Aniq integral: trigonometrik funksiyalar

```maple
Int(sin(x), x = 0 .. Pi) = int(sin(x), x = 0 .. Pi);
int(cos(x), x = 0 .. Pi);
Int((1 + cos(x))^2, x = 0 .. Pi) = int((1 + cos(x))^2, x = 0 .. Pi);
```

Natijalar: `2`, `0` va `3*Pi/2`. `sin x` ning `[0, π]` dagi yuzi `2` ga teng. `cos x` esa `[0, π/2]` da musbat, `[π/2, π]` da manfiy bölgani uçun yuzlar bir-birini bekor qiladi va yiğindi nol çiqadi.

Uçinçi misolda qavsni avval oçamiz: `(1 + cos x)² = 1 + 2cos x + cos² x`. Ularning integrallari ketma-ket `π`, `0` va `π/2` beradi, yiğindisi `3π/2`.

> Eslatma: `int(cos(x), x = 0 .. Pi)` ning nol çiqişi «yuz nol» degani emas. Integral işorali yuzni hisoblaydi.

### Aniqmas integral: köpaytmani yiğindiga aylantiriş

Aniqmas integralda natija funksiya böladi (özgarmas `C` Maple tomonidan yozilmaydi):

```maple
Int(cos(x)*cos(2*x)*cos(3*x), x) = int(cos(x)*cos(2*x)*cos(3*x), x);
```

Natija:

```text
∫ cos(x) cos(2x) cos(3x) dx = (1/8) sin(2x) + (1/16) sin(4x) + (1/24) sin(6x) + x/4
```

Qölda bu integralni olişda avval köpaytmani yiğindiga aylantiriş kerak: `cos x cos 3x = (cos 2x + cos 4x)/2`, keyin yana `cos 2x` ga köpaytirib, yana bir marta formulani qöllaymiz. Maple bu bütün zanjirni bir qadamda bajaradi. Natijani tekşiriş uçun uni differensiallaş yetarli: `diff` bizni boşlanğiç funksiyaga qaytarişi kerak.

### Aniqmas integral: ratsional kasr

Eng murakkab misol — ratsional funksiya:

```maple
Int((3*x^4 + 4)/(x^2*(x^2 + 1)^3), x) = int((3*x^4 + 4)/(x^2*(x^2 + 1)^3), x);
```

Natija:

```text
-(57/8) arctan(x) - 25x/(8(x²+1)) - 4/x - 7x/(4(x²+1)²)
```

Qölda bu misol oddiy kasrlarga ajratiş (`4/x²`, `(…)/(x²+1)`, `(…)/(x²+1)²`, `(…)/(x²+1)³`) va har birini alohida integrallaşni talab qiladi. Maple esa `arctan(x)` ni va qolgan ratsional qismlarni darhol topadi. Ajratişni körmoqçi bölsak, `convert(f, parfrac, x)` buyruği işlatiladi.

### Aniq integral, lekin elementar emas: evalf

Hamma integralning javobi elementar funksiyalar bilan yozilavermaydi. Misol uçun `cos(x)/x` ning boşlanğiç funksiyasi — kosinus-integral `Ci(x)`. Bunday holda ham aniq integralning **sonli qiymatini** olişimiz mumkin:

```maple
restart;
Int(cos(x)/x, x = Pi/6 .. Pi/4) = evalf(int(cos(x)/x, x = Pi/6 .. Pi/4), 15);
```

Natija: `0.322922981113732`. `evalf(ifoda, 15)` ifodani `15` xonali aniqlikda hisoblaydi. Buyruq nomi `evalf` — «evaluate float» (kasr songa hisobla) degani. `restart;` esa Maple xotirasini tozalaydi: oldin berilgan barça özgaruvçilar va muhit sozlamalari (`_EnvAllSolutions` ham) tozalanadi.

### Integral bilan işlaşda foydali odatlar

- Avval `Int(...) = int(...)` körinişida yozing: natija formula körinişida çiqadi va daftarga köçiriş oson.
- Natijani tekşiriş uçun `diff(javob, x)` ni hisoblang. Aniqmas integralda u boşlanğiç funksiyani qaytarişi kerak.
- Javob çiqmasa yoki murakkab bölsa, `evalf(int(...))` bilan sonli qiymatini oling.
- Aniq integral işorali yuzni beradi: `cos x` misolidagi kabi nol çiqişi mumkin.

## 15. Ekstremum, maksimum-minimum va uziliş nuqtalari

Köpinça funksiyani tahlil qilişda uning qayerda «buzilişini» (uzilişini) va qayerda eng katta yoki eng kiçik qiymatga yetişini biliş kerak böladi. Maple buning uçun tört buyruqqa ega: `discont` (uziliş nuqtalari), `singular` (maxsus nuqtalar), `extrema` (lokal ekstremumlar) va `maximize`/`minimize` (berilgan oraliqdagi eng katta/eng kiçik qiymat). Bu töttasi — `discont`, `extrema`, `maximize`, `minimize` — eski kutubxona funksiyalari, şuning uçun ularni ilk marta işlatişdan oldin `readlib(...)` bilan yuklaş kerak.

### Uziliş nuqtalari: discont

`discont(ifoda, özgaruvçi)` funksiyaning uzluksiz emasligi — uzilişi — qayerda sodir bölişini topadi.

```maple
readlib(discont);
discont(exp(1/(x + 3)), x);
```

Natija: `{-3}`. `x = -3` da maxraj nolga aylanadi, körsatkiçdagi `1/(x+3)` çeksizlikka intiladi va funksiya şu nuqtada uzilaadi (ikkinçi tur uzilişi).

### Maxsus nuqtalar: singular

`singular(ifoda)` ifodaning maxsus (osobennost) nuqtalarini — funksiya aniqlanmay qoladigan joylarni — töplam körinişida qaytaradi.

```maple
singular(tan(x/(2 - x)));
```

Natija ikkita töplamdan iborat:

```text
{x = 2}, { x = 2*Pi*(2*_Z1 + 1) / (2*Pi*_Z1 + Pi - 2) }
```

Birinçisi — `x = 2` da içki kasr `2 - x` nolga aylanadi, butun ifoda aniqlanmaydi. Ikkinçisi — `tan` funksiyasining özi `x/(2-x) = Pi/2 + Pi*k` tenglamani qanoatlantiradigan har bir nuqtada uzilaadi; `_Z1` — avval `_EnvAllSolutions` bölimida körgan ixtiyoriy butun son parametri.

### Lokal ekstremumlar: extrema

`extrema(ifoda, çeklaşlar, özgaruvçi, 'nom')` funksiyaning lokal ekstremum **qiymatlarini** qaytaradi; töttinçi argumentdagi (tirnoq içidagi) nomga esa ekstremum **nuqtalarining** özi yoziladi.

```maple
readlib(extrema);
extrema(arctan(x) - (1/2)*ln(x^2 + 1), {}, x, 'xo');
```

Natija: `{1/4*Pi - 1/2*ln(2)}`. `{}` — çeklaş yöqligini (erkin ekstremum) bildiradi. Nuqtaning özi `xo` nomida saqlanadi; uni körmoqçi bölsak, alohida `xo;` deb yozamiz.

Har doim ham javob şunday ixçam çiqavermaydi. Murakkabroq ifodada `extrema` natijani `RootOf(...)` içida qaytarişi mumkin — bu «tenglamaning yeçimi bor, lekin elementar funksiyalar bilan yopiq körinişda yozib bölmaydi» degani:

```maple
readlib(extrema);
y := (1/2)*(x^2 - 1/2)*arcsin(x) + x*sqrt((1 - x^2)/4 - Pi*x);
extrema(y, {}, x, 's');
s;
```

Bunday holda natija bir neça qatorli, kosinus va sinusdan tuzilgan `RootOf(...)` ifodasi böladi — Maple ekstremum nuqtasining aniq qiymatini emas, uni qanoatlantiradigan tenglamani qaytaradi. Amalda bunday javobni `evalf` yoki `fsolve` bilan songa aylantirib işlatiş qulayroq.

> Eslatma: `RootOf` çiqişi xato emas — bu Maple'ning «yeçim bor, lekin yopiq körinişda yöq» degan tabiiy javobi.

`RootOf` çiqqan paytda eng amaliy yöl — ekstremum nuqtasining özini qidiriş örniga, funksiyaning **berilgan kesmadagi** eng katta va eng kiçik qiymatini tögridan-tögri soraş: buning uçun aynan `maximize`/`minimize` buyruqlari bor (keyingi bölimda batafsil).

```maple
ymax := maximize(y, x = -1 .. 1);
ymin := minimize(y, x = -1 .. 1);
```

Natijalar: `ymax := 0` va `ymin := 0`. Demak, `y` funksiyasi `[-1, 1]` kesmasida eng katta hamda eng kiçik qiymatlarining ikkisi ham nolga teng. `RootOf`li natijani körgaç darhol qol siltamay, aynan şu usul — `maximize`/`minimize` bilan sonli javob oliş — ekstremumni amalda «yopiş» uçun eng işonçli yöl.

### Oraliqda eng katta va eng kiçik qiymat: maximize va minimize

`extrema` lokal ekstremumlarni topadi, `maximize` va `minimize` esa berilgan **yopiq oraliqda** (çegara nuqtalarini ham hisobga olib) funksiyaning eng katta/eng kiçik qiymatini topadi.

```maple
readlib(maximize);
readlib(minimize);
f := proc (x) options operator, arrow; x^2*ln(x) end proc;
maximize(f(x), x = 1 .. 2);
minimize(f(x), x = 0 .. 1);
simplify(%);
```

Natijalar: `maximize` — `4*ln(2)` (`x = 2` çegarasida yetişiladi), `minimize` esa avval soddalaştirilmagan körinişda çiqadi, söng `simplify(%)` bilan `-1/2*exp(-1)` ga keltiriladi (`%` — Maple'da oxirgi hisoblangan natijani belgilaydigan maxsus özgaruvçi). `proc (x) options operator, arrow; ... end proc` — funksiya e'lon qilişning tölik yoziluvi; qisqaçasi `f := x -> x^2*ln(x)` biz avval `D` operatori bölimida körgan edik.

`maximize`/`minimize` har doim ham sodda songa qisqaravermaydi: ifoda murakkab bölsa, natija özi — hisoblanmagan, pretty-printlangan `maximize(...)` çaqiruvi körinişida — qaytişi mumkin. Bunday holda ifodani `evalf` bilan songa aylantiriş yoki natijani boşqa özgaruvçiga qölda beriş kerak böladi.

### Keng tarqalgan xato: extrema'ning söngi argumenti

`extrema`ning töttinçi argumenti — ekstremum nuqtalari yoziladigan **nom** (yuqoridagi `'xo'` yoki `'s'` kabi), hisoblaniş kerak bölgan ifoda emas. Agar örniga hisoblangan ifoda (masalan, `diff(...)` natijasi) berilsa, Maple uni nom sifatida qabul qilmaydi va nuqtalar töplami tölinmay qoladi:

```maple
y := x^3/(-x^2 + 4);
readlib(extrema);
extrema(y, {}, (diff(x, x))*(diff(s(x), x)));
s(x);
```

Bu yerda töttinçi argument örnida notöğri ifoda (`diff(x,x)*diff(s(x),x)`) berilgan, şuning uçun `extrema` faqat ekstremum qiymatini (`{-x^3/(x^2-4)}`) qaytaradi, `s(x)` esa heç qayerga boğlanmagan holiça özgarmay çiqadi. Töğri yoziluv — nom tirnoq içida beriladi: `extrema(y, {}, x, 's')`, şundan keyingina `s;` buyruği nuqtalarni körsatadi.

## Xulosa

Maple bilan işlaşning asosiy qoidasi oddiy: buyruq nomi iş turini bildiradi.

| Buyruq | Vazifasi |
| :-- | :-- |
| `simplify` | soddalaştiriş |
| `expand` | qavslarni oçiş |
| `factor` | köpaytuvçilarga ajratiş |
| `solve` / `fsolve` | aniq / taqribiy yeçiş |
| `seq` | ketma-ketlik tuziş |
| `plot` | grafik çiziş |
| `diff` / `Diff` | hosilani hisoblaş / yozib körsatiş |
| `D` | funksiyaning hosilasi |
| `int` / `Int` | integralni hisoblaş / yozib körsatiş |
| `evalf` | kasr (sonli) qiymatini hisoblaş |
| `det`, `inverse`, `eigenvalues` | matritsa xossalari |
| `discont` | uziliş nuqtalarini topiş |
| `singular` | maxsus (osobennost) nuqtalarni topiş |
| `extrema` | lokal ekstremumlarni topiş |
| `maximize` / `minimize` | oraliqdagi eng katta / eng kiçik qiymat |
| `readlib` | eski kutubxona funksiyasini yuklaş |

Natijani doim qölda ham tekşirib köriş kerak: Maple xato qilmaydi, lekin kiritişda xato qiliş oson.