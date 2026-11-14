---
title: "Maple'da matematika: algebradan hosila va integralgaça — amaliy maşğulot misollari"
description: "Maple bilan soddalaştiriş, tenglama, matritsa, hosila va integral: har bir misolning kodi, natijasi va qölda tekşiruvi."
pubDate: 2026-11-05
updatedDate: 2026-11-14
tags: ["maple", "matematika", "programming", "universitet", "algebra", "hosila", "integral"]
---

4-kurs, 7-semestrda Maple dasturida amaliy maşğulotlar ötkazdik. Maple — ifodalarni soddalaştiradigan, tenglamalarni yeçadigan, hosila va integral hisoblaydigan kompyuter algebra tizimi.

Bu maqolada maşğulotlardagi misollarimni mavzu böyiça yiğdim: algebradan boşlab hosila va integralgaça. Har bir misolda kod, natija va natijani qölda tekşiriş yoli bor. Maqsad — buyruqlarni yodlaş emas, har bir natijaning nega şunday çiqqanini tuşunuş.

## Işga tayyorlaniş

Maple'da har bir buyruq `;` yoki `:` bilan tugaydi:

- `;` — natijani ekranga çiqaradi.
- `:` — natijani yaşiradi, lekin qiymat saqlanib qoladi.
- `:=` — özgaruvçiga qiymat beradi.

`restart;` barça özgaruvçilarni va muhit sozlamalarini tozalaydi. Eski qiymatlar keyingi natijalarga ta'sir qilgani uçun, yangi hisobni şu buyruqdan boşlaş qulay.

## 1. Özgaruvçilar va oddiy hisob

```maple
a := 12:
b := 8:
S := a*b;
```

Natija: `S := 96`. Ikki nuqta bilan tugagan `a` va `b` qatorlari heç narsa çiqarmaydi, faqat qiymatni saqlaydi.

## 2. Ifodani soddalaştiriş

### simplify, expand va factor

```maple
simplify((x^2 - 1)/(x - 1));
```

Natija: `x + 1`. Maple `x^2 - 1` ni `(x - 1)(x + 1)` körinişga keltiradi va `(x - 1)` ni qisqartiradi.

Xato: bu qisqartiriş `x = 1` da töğri emas. Asl ifodada `x = 1` da maxraj nolga aylanadi, `x + 1` esa `2` ni beradi. Soddalaştiriş ifodaning aniqlaniş sohasini özgartirişi mumkin.

`expand` ifodani yoyadi:

```maple
expand((x - y)^2);
expand((x + 3)^2);
```

Natijalar: `x^2 - 2*x*y + y^2` va `x^2 + 6*x + 9`. Birinçisi `(a - b)^2 = a^2 - 2ab + b^2` formulasidan kelib çiqadi.

`factor` — `expand` ning teskarisi:

```maple
factor(x^4 - 81);
factor(x^2 - 5*x + 6);
```

Natijalar: `(x - 3)*(x + 3)*(x^2 + 9)` va `(x - 2)*(x - 3)`. Birinçi misolda `x^4 - 81 = (x^2 - 9)(x^2 + 9)`, `x^2 - 9` esa yana ajraladi. `x^2 + 9` haqiqiy sonlarda köpaytuvçilarga ajralmaydi, şuning uçun Maple şu yerda töxtaydi.

## 3. Tenglama va tengsizlik

### Çiziqli va kvadrat tenglama

```maple
solve(2*x + 5 = 15, x);
solve(x^2 - 5*x + 6 = 0, x);
```

Natijalar: `5` va `2, 3`. Tenglamaning taqribiy yeçimi kerak bölsa, `solve` örniga `fsolve` işlatiladi: u raqamli (önli kasr) javob beradi.

### Tengsizlik

```maple
solve(5*x + 4 <= 19, x);
solve(x^2 - 5*x + 6 > 0, x);
```

Birinçisi natijasi `x <= 3`. Ikkinçisida `x < 2` yoki `x > 3` çiqadi, ya'ni oraliqda `(-∞, 2) ∪ (3, ∞)`.

### Logarifm va körsatkiçli tenglama

```maple
simplify(log[2](8));
solve(ln(x) = 2, x);
solve(2^x = 8, x);
```

Natijalar: `3`, `exp(2)` (ya'ni e²) va `3`. Maple'da natural logarifm `ln`, istalgan asosli logarifm `log[asos](son)` körinişida yoziladi.

### Trigonometrik tenglama: barça yeçimlar

Maple'da burçak radianda beriladi, `Pi` — π soni. Oddiy ayniyatlar:

```maple
sin(Pi/2);
cos(Pi);
simplify(sin(x)^2 + cos(x)^2);
```

Natijalar: `1`, `-1` va `1`.

`sin(x) = 1/2` tenglamani yeçamiz:

```maple
solve(sin(x) = 1/2, x);
```

Natija: `Pi/6`. Standart holatda Maple faqat asosiy yeçimni beradi. Barça yeçimlarni oliş uçun muhit özgaruvçisini yoqamiz:

```maple
_EnvAllSolutions := true:
solve(sin(x) = 1/2, x);
```

Natijalar: `x = Pi/6 + 2*Pi*_Z1` va `x = 5*Pi/6 + 2*Pi*_Z1`. Matematikada bu `x = π/6 + 2πk` va `x = 5π/6 + 2πk`, bu yerda `k ∈ ℤ`.

![Birlik aylanada sin x = 1/2 tenglamaning ikki yeçimi: π/6 va 5π/6 burçaklari, y = 1/2 çiziği bilan kesişgan nuqtalar](/images/blog/maple-math-basics-with-examples/sin-half-solutions.svg)

Bu rasmda iki yeçim birlik aylanadagi ikki nuqta. Har biri `2π` qadamda takrorlanadi, şuning uçun natijada `2*Pi*_Z1` qöşiladi.

`_EnvAllSolutions` — Maple muhit özgaruvçisi (environment variable). Nomi `_Env` bilan boşlanadi: Maple'da muhit özgaruvçilari şu prefiksga ega. Qiymati:

- `false` (standart) — `solve` faqat asosiy yeçimni beradi.
- `true` — `solve` barça yeçimni beradi. Davriy funksiyada yeçim butun parametr orqali yoziladi.

`_Z1` — ixtiyoriy butun son (`..., -1, 0, 1, ...`). Natijada `_Z1~` körinişi ham uçraydi: `~` belgisi bu parametr butun son ekanini bildiradi. Şuningdek `_B1` (0 yoki 1) va `_NN1` (manfiy bölmagan butun son) kabi parametrlar bor. Eng köp uçraydigani `_Z1`.

Ikki eslatma: `restart` yoki yangi sessiya `_EnvAllSolutions` ni standart holatga qaytaradi, şuning uçun uni har safar qayta yoziş kerak. `_EnvExplicit` ni `true` qilsangiz, `solve` yeçimni `RootOf(...)` körinişida emas, aniq ifoda körinişida berişga harakat qiladi.

### Tenglamalar sistemasi

```maple
eq1 := x + y = 5:
eq2 := x - y = 1:
solve({eq1, eq2}, {x, y});
```

Natija: `{x = 3, y = 2}`. Tekşiriş: `3 + 2 = 5`, `3 - 2 = 1`. Figurali qavs sistemaning yeçimini töplam körinişida beradi.

## 4. Töplamlar, ketma-ketlik, vektor va matritsa

### Töplamlar

```maple
A := {1, 2, 3, 4, 5}:
B := {4, 5, 6, 7, 8}:
A union B;
A intersect B;
A minus B;
symmdiff(A, B);
```

| Amal | Buyruq | Natija |
| :--- | :--- | :--- |
| birlaşma | `A union B` | `{1, 2, 3, 4, 5, 6, 7, 8}` |
| kesişma | `A intersect B` | `{4, 5}` |
| ayirma | `A minus B` | `{1, 2, 3}` |
| simmetrik ayirma | `symmdiff(A, B)` | `{1, 2, 3, 6, 7, 8}` |

Qöşimça: `member(3, A)` — element töplamga tegişlimi, `nops(A)` — elementlar soni, `issubset(A, B)` — A, B ning qism töplami ekanini tekşiriş.

### Ketma-ketlik

`seq` qoida böyiça ketma-ketlik hosil qiladi:

```maple
seq(n^2, n = 1 .. 6);
sum(n^2, n = 1 .. 6);
```

Natijalar: `1, 4, 9, 16, 25, 36` va `91`.

### Vektor

Vektorlar uçun `linalg` paketini ulaymiz:

```maple
with(linalg):
a := vector([1, 2, 3]):
b := vector([2, -1, 0]):
evalm(a + b);
dotprod(a, b);
angle(a, b);
```

Natijalar: `[3, 1, 3]`, `0` va `Pi/2`. Skalyar köpaytma nolga teng, şuning uçun vektorlar özaro perpendikulyar.

### Matritsa

```maple
A := matrix([[2, 1], [3, 4]]):
B := matrix([[1, 0], [-1, 2]]):
evalm(A + B);
multiply(A, B);
```

Natijalar: `[[3, 1], [2, 6]]` va `[[1, 2], [-1, 8]]`.

```maple
det(A);
trace(A);
inverse(A);
transpose(A);
eigenvalues(A);
```

Natijalar: determinant `5`, iz `6`, teskari matritsa `[[4/5, -1/5], [-3/5, 2/5]]`, transponirlangan `[[2, 3], [1, 4]]`, xos qiymatlar `1` va `5`. Tekşiriş: xos qiymatlar `λ^2 - 6λ + 5 = 0` tenglamaning yeçimi, `(λ - 1)(λ - 5) = 0`.

`linalg` — eski paket. Yangi Maple versiyalarida `LinearAlgebra` tavsiya etiladi, lekin dars `linalg` bilan ötdi.

## 5. Hosila

Hosila `diff(ifoda, x)` bilan hisoblanadi.

```maple
f := 3*x^4 + 5*x^3 - 7*x^2 + 4*x + 9;
diff(f, x);
```

Natija: `12*x^3 + 15*x^2 - 14*x + 4`. Qölda tekşiriş: `(3x^4)' = 12x^3`, `(5x^3)' = 15x^2`, `(-7x^2)' = -14x`, `(4x)' = 4`, özgarmasning hosilasi esa nol.

### Yuqori tartibli hosila

Ikkinçi, uçinçi va undan keyingi hosila uçun `$` belgisi işlatiladi: `x$2` — `x` böyiça ikki marta.

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

### Trigonometrik funksiya va köpaytma

```maple
f := sin(x) + cos(x) + tan(x):
diff(f, x);

f := x^2*sin(x):
diff(f, x);
```

Natijalar: `cos(x) - sin(x) + 1 + tan(x)^2` (bu `cos x - sin x + sec² x`) va `2*x*sin(x) + x^2*cos(x)`. Ikkinçi misolda köpaytma qoidasi `(uv)' = u'v + uv'` işlatilgan.

### Diff va diff: murakkab funksiya

`Diff` hosilani hisoblamay, faqat yozib körsatadi. `diff` esa hisoblaydi. Ikkisini tenglik bilan yozsak, tayyor formula hosil böladi:

```maple
Diff(sin(x^2), x) = diff(sin(x^2), x);
```

Natija: `d/dx sin(x^2) = 2*x*cos(x^2)`. Bu murakkab funksiya qoidasi: taşqi funksiyaning hosilasi (`cos`) içki funksiyaning hosilasiga (`2x`) köpaytiriladi.

Törtinçi tartibli hosila bir yozuvda:

```maple
Diff(cos(2*x)^2, x$4) = diff(cos(2*x)^2, x$4);
```

Maple natijani `-128*sin(2*x)^2 + 128*cos(2*x)^2` körinişida beradi. Uni `128*cos(4*x)` ga soddalaştiriş mumkin, çunki `cos^2(2x) = (1 + cos 4x)/2`.

### D operatori

`diff` ifodaning hosilasini oladi, `D` esa funksiyaning özining hosilasini:

```maple
D(sin);
(D(sin))(Pi);
f := x -> ln(x^2) + exp(3*x):
D(f);
```

Natijalar: `cos`, `-1` (çunki `cos(π) = -1`) va `x -> 2/x + 3*exp(3*x)`.

### Xususiy hosila

Köp özgaruvçili funksiyada hosila har bir özgaruvçi böyiça alohida olinadi:

```maple
f := arctan(x/y):
diff(f, x);
diff(f, y);
```

Natijalar: `y/(x^2 + y^2)` va `-x/(x^2 + y^2)`.

Ikkinçi tartibli xususiy hosilalar uçun `f = (x - y)/(x + y)`:

```maple
f := (x - y)/(x + y):
Diff(f, x$2) = simplify(diff(f, x$2));
Diff(f, y$2) = simplify(diff(f, y$2));
Diff(f, x, y) = diff(f, x, y);
```

Natijalar: `f_xx = -4*y/(x + y)^3`, `f_yy = 4*x/(x + y)^3`, `f_xy = 2*(x - y)/(x + y)^3`. Aralaş hosila `diff(f, x, y)` avval `x`, keyin `y` böyiça olinadi. `x + y ≠ 0` bölgan sohada aralaş hosilalar tartibga boğliq emas, şuning uçun `diff(f, y, x)` ham şu natijani beradi.

## 6. Integral

Integral `int(ifoda, x)` bilan hisoblanadi. `Int` (katta harf bilan) integralni hisoblamay yozib körsatadi, `int` esa hisoblaydi:

```maple
Int(x^2, x = 0 .. 1) = int(x^2, x = 0 .. 1);
```

Natija: `∫₀¹ x² dx = 1/3`. Çegaralar `x = a .. b` körinişida beriladi. Çegara berilmasa, **aniqmas integral** hisoblanadi.

### Aniq integral: köphad

```maple
Int(3*x^2 + 2*x + 1, x = 0 .. 2) = int(3*x^2 + 2*x + 1, x = 0 .. 2);
int(x^4 - 2*x^2 + 3*x - 1, x = 0 .. 1);
```

Natijalar: `14` va `1/30`. Qölda tekşiriş Nyuton–Leybnis formulasi bilan: `∫ₐᵇ f(x) dx = F(b) - F(a)`.

- Birinçisi uçun `F(x) = x^3 + x^2 + x`: `F(2) - F(0) = (8 + 4 + 2) - 0 = 14`.
- Ikkinçisi uçun `F(x) = x^5/5 - 2x^3/3 + 3x^2/2 - x`: `F(1) - F(0) = 1/5 - 2/3 + 3/2 - 1 = 1/30`.

### Aniq integral: trigonometrik funksiya

```maple
Int(sin(x), x = 0 .. Pi) = int(sin(x), x = 0 .. Pi);
int(cos(x), x = 0 .. Pi);
Int((1 + cos(x))^2, x = 0 .. Pi) = int((1 + cos(x))^2, x = 0 .. Pi);
```

Natijalar: `2`, `0` va `3*Pi/2`. `sin x` ning `[0, π]` dagi yuzi `2`. Uçinçi misolda qavsni avval oçamiz: `(1 + cos x)^2 = 1 + 2cos x + cos^2 x`. Ularning integrallari ketma-ket `π`, `0` va `π/2` beradi, yiğindisi `3π/2`.

Xato: `int(cos(x), x = 0 .. Pi)` nolga teng. Bu yuza nol degani emas: `cos x` ning `[0, π/2]` dagi musbat va `[π/2, π]` dagi manfiy yuzlari bir-birini bekor qiladi. Integral işorali yuzni hisoblaydi.

### Aniqmas integral: köpaytmani yiğindiga aylantiriş

Aniqmas integralda natija funksiya böladi. Özgarmas `C` Maple tomonidan yozilmaydi.

```maple
Int(cos(x)*cos(2*x)*cos(3*x), x) = int(cos(x)*cos(2*x)*cos(3*x), x);
```

Natija:

```text
∫ cos(x) cos(2x) cos(3x) dx = (1/8) sin(2x) + (1/16) sin(4x) + (1/24) sin(6x) + x/4
```

Qölda bu integral uçun avval köpaytma yiğindiga aylantiriladi: `cos x cos 3x = (cos 2x + cos 4x)/2`, keyin yana `cos 2x` ga köpaytirib, formula yana bir marta qöllaniladi. Maple bu zanjirni bir qadamda bajaradi. Natijani tekşiriş uçun `diff` bilan differensiallaş yetarli.

### Aniqmas integral: ratsional kasr

```maple
Int((3*x^4 + 4)/(x^2*(x^2 + 1)^3), x) = int((3*x^4 + 4)/(x^2*(x^2 + 1)^3), x);
```

Natija:

```text
-(57/8) arctan(x) - 25x/(8(x²+1)) - 4/x - 7x/(4(x²+1)²)
```

Qölda bu misol oddiy kasrlarga ajratişni (`4/x²`, `(…)/(x²+1)`, `(…)/(x²+1)²`, `(…)/(x²+1)³`) va har birini alohida integrallaşni talab qiladi. Ajratişni körmoqçi bölsak, `convert(f, parfrac, x)` buyruği işlatiladi.

### Elementar bölmagan integral: evalf

Hamma integral elementar funksiyalar bilan yozilavermaydi. `cos(x)/x` ning boşlanğiç funksiyasi kosinus-integral `Ci(x)`. Bunday holda aniq integralning sonli qiymatini olamiz:

```maple
restart;
Int(cos(x)/x, x = Pi/6 .. Pi/4) = evalf(int(cos(x)/x, x = Pi/6 .. Pi/4), 15);
```

Natija: `0.322922981113732`. `evalf(ifoda, 15)` ifodani 15 xonali aniqlikda hisoblaydi. Nomi «evaluate float» degani.

## 7. Uziliş, ekstremum va oraliqdagi eng katta, eng kiçik qiymat

Bu bölimda beşta buyruq bor. `discont`, `extrema`, `maximize` va `minimize` — eski kutubxona funksiyalari, şuning uçun birinçi marta işlatişdan oldin `readlib(...)` bilan yuklaymiz. `singular` esa bunday yuklaşni talab qilmaydi.

### Uziliş nuqtalari: discont

```maple
readlib(discont);
discont(exp(1/(x + 3)), x);
```

Natija: `{-3}`. `x = -3` da maxraj nolga aylanadi. `1/(x + 3)` esa x = -3 dan öngda `+∞`, çapda `-∞` ga intiladi, şuning uçun `exp(1/(x + 3))` ning öng va çap limitlari har xil. Bu ikkinçi tur uzilişi.

### Maxsus nuqtalar: singular

```maple
singular(tan(x/(2 - x)));
```

Natija ikki töplamdan iborat:

```text
{x = 2}, { x = 2*Pi*(2*_Z1 + 1) / (2*Pi*_Z1 + Pi - 2) }
```

Birinçisi: `x = 2` da `2 - x` nolga teng, ifoda aniqlanmaydi. Ikkinçisi: `tan` funksiyasi `x/(2 - x) = π/2 + πk` tenglamani qanoatlantiradigan har bir nuqtada uziladi. `_Z1` — `_EnvAllSolutions` bölimidagi butun son.

### Lokal ekstremum: extrema

```maple
readlib(extrema);
extrema(arctan(x) - (1/2)*ln(x^2 + 1), {}, x, 'xo');
```

Natija: `{1/4*Pi - 1/2*ln(2)}`. `{}` — çeklaş yöqligini (erkin ekstremum) bildiradi. Törtinçi argument — tirnoq içidagi `'xo'` — ekstremum nuqtasining özi saqlanadigan nom. Nuqtani köriş uçun `xo;` deb yozamiz.

Tekşiriş: `f' = 1/(1 + x^2) - x/(x^2 + 1) = (1 - x)/(1 + x^2)`. Hosila `x = 1` da nolga aylanadi. `f(1) = π/4 - (1/2)ln 2`, bu natijaga mos.

Murakkab ifodada `extrema` natijani `RootOf(...)` içida qaytariş mumkin. Bu xato emas: Maple «yeçim bor, lekin uni elementar funksiyalar bilan yopiq yozib bölmaydi» deb javob beradi.

```maple
readlib(extrema);
y := (1/2)*(x^2 - 1/2)*arcsin(x) + x*sqrt((1 - x^2)/4 - Pi*x);
extrema(y, {}, x, 's');
s;
```

Bunday javobni `evalf` yoki `fsolve` bilan songa aylantirib işlatiş qulay.

### Oraliqda eng katta va eng kiçik qiymat: maximize va minimize

`extrema` lokal ekstremumlarni topadi. `maximize` va `minimize` esa berilgan yopiq oraliqda, çegara nuqtalarini ham hisobga olib, eng katta va eng kiçik qiymatni topadi.

```maple
readlib(maximize);
readlib(minimize);
f := proc (x) options operator, arrow; x^2*ln(x) end proc;
maximize(f(x), x = 1 .. 2);
minimize(f(x), x = 0 .. 1);
simplify(%);
```

`proc (x) options operator, arrow; ... end proc` — funksiyani e'lon qiliş tölik yoziluvi, `f := x -> x^2*ln(x)` bilan bir xil.

Natijalar:

- `maximize`: `4*ln(2)`. Maksimum `x = 2` da. `f' = x(2ln x + 1)` `[1, 2]` da musbat, şuning uçun f şu oraliqda ösadi.
- `minimize`: avval soddalaştirilmagan körinişda çiqadi. `simplify(%)` bilan `-1/2*exp(-1)` ga keladi. Minimum `x = e^(-1/2)` da. `%` — Maple'da oxirgi hisoblangan natija.

Agar natija sodda son bölmasa, `evalf` bilan songa aylantiring yoki natijani boşqa özgaruvçiga yozing.

Endi `y` funksiyasini şu usulda tekşiramiz. Ildiz ostidagi `(1 - x^2)/4 - Pi*x` ifoda `x ≈ 0,0787` dan katta bölsa manfiy böladi. Şuning uçun `[-1, 1]` oraliq bu funksiya uçun mos emas: öng tomonda ildiz ostida manfiy son çiqadi. Biz `[-1, 0]` ni olamiz:

```maple
y := (1/2)*(x^2 - 1/2)*arcsin(x) + x*sqrt((1 - x^2)/4 - Pi*x);
ymax := maximize(y, x = -1 .. 0);
ymin := minimize(y, x = -1 .. 0);
```

Qölda tekşiriş: `y(0) = 0`, bu `[-1, 0]` da eng katta qiymat (`ymax = 0`, `x = 0` da). `y(-1) = (1/2)(1/2)(-π/2) - √π = -π/8 - √π ≈ -2,165`, bu eng kiçik qiymat (`ymin`, `x = -1` da). Maple'da ham şu natijani köriş kerak; boşqaça çiqsa, oraliqni qayta tekşiring.

### Keng tarqalgan xato: extrema'ning oxirgi argumenti

Törtinçi argument — ekstremum nuqtasi yoziladigan **nom** (`'xo'` yoki `'s'` kabi), hisoblanadigan ifoda emas. Agar unga ifoda berilsa, Maple uni nom sifatida qabul qilmaydi va nuqtalar töplami tölmay qoladi:

```maple
y := x^3/(-x^2 + 4);
readlib(extrema);
extrema(y, {}, (diff(x, x))*(diff(s(x), x)));
s(x);
```

Bu yerda `extrema` faqat ekstremum qiymatini (`{-x^3/(x^2 - 4)}`) qaytaradi. `s(x)` esa boğlanmagan holiça qoladi. Töğri yoziluv: `extrema(y, {}, x, 's')`, şundan keyin `s;` nuqtalarni körsatadi.

## 8. Grafiklar

Quyidagi grafiklar `plot` va `implicitplot` bilan çizilgan. Har bir rasmning altida nima körsatilgani yozilgan.

### Funksiya grafigi: sin(x)/x

```maple
plot(sin(x)/x, x = -4*Pi .. 4*Pi, labels = [x, y], labelfont = [Times, ITALIC, 12], thickness = 3);
```

![sin(x)/x funksiyasining grafigi, x oraliqi −4π dan 4π gaça; x = 0 atrofida egri 1 ga yaqinlaşadi](/images/maple/plot-sinc.svg)

Funksiya `x = 0` da aniqlanmagan (`0/0`), lekin limit mavjud va `1` ga teng. Bu bartaraf etiladigan uziliş.

### Bir neçta funksiya bir grafikda

```maple
plot([x^2-x+3, 2*x+3], x = -10 .. 10, y = 0 .. 30, labels = [x, y]);
```

![x^2 - x + 3 parabolasi va 2x + 3 töğri çiziği, x dan −10 gaça 10 gaça, y dan 0 gaça 30 gaça](/images/maple/plot-parabola-line.svg)

`y = 0 .. 30` oraliqdan taşqaridagi parabola qismi çizilmaydi.

### Parametrik egri çiziq

`[x(t), y(t), t = a .. b]` körinişida beriladi:

```maple
plot([sin(2*t), cos(3*t), t = 0 .. 2*Pi], axes = BOXED, labels = [x, y], color = purple, thickness = 6);
```

![sin(2t) va cos(3t) parametrik egri çiziği; x va y koordinatalari −1 dan 1 gaça](/images/maple/plot-lissajous.svg)

### Kvadrat funksiya

```maple
plot([x^2-5*x+6], x = -10 .. 15, labels = [x, y]);
```

![x^2 - 5x + 6 parabolasi; x öqini x = 2 va x = 3 nuqtalarda kesadi](/images/maple/plot-quadratic.svg)

Parabola x öqini `x = 2` va `x = 3` da kesadi. Bular `x^2 - 5x + 6 = 0` tenglamaning yeçimlari.

### Yaşirin tenglama: implicitplot

Tenglama `y = f(x)` körinişida bölmasa, `plots` paketidagi `implicitplot` işlatiladi:

```maple
with(plots):
implicitplot((1/4)*x^2-(1/2)*y^2 = 16, x = -20 .. 20, y = -16 .. 16);
```

![(1/4)x^2 - (1/2)y^2 = 16 giperbolasi; ikki tarmoqli, tarmoqlar x = ±8 nuqtalardan boşlanadi](/images/maple/plot-hyperbola.svg)

Umumiy köriniş: `implicitplot(tenglama, x = a .. b, y = c .. d)`.

Xato: `plot` buyruğiga `infinity` bilan çeksiz oraliq bermang. Uning örniga katta çekli son bering, masalan `x = -40 .. 40`.

## Buyruqlar jadvali

| Buyruq | Vazifasi |
| :-- | :-- |
| `simplify` | soddalaştiriş |
| `expand` | qavslarni oçiş |
| `factor` | köpaytuvçilarga ajratiş |
| `solve` / `fsolve` | aniq / taqribiy yeçiş |
| `seq`, `sum` | ketma-ketlik va yiğindi |
| `plot`, `implicitplot` | grafik (`implicitplot` uçun `with(plots)` kerak) |
| `diff` / `Diff` | hosilani hisoblaş / yozib körsatiş |
| `D` | funksiyaning hosilasi |
| `int` / `Int` | integralni hisoblaş / yozib körsatiş |
| `evalf` | sonli qiymat |
| `det`, `inverse`, `eigenvalues` | matritsa xossalari |
| `discont`, `singular` | uziliş va maxsus nuqtalar |
| `extrema` | lokal ekstremumlar |
| `maximize` / `minimize` | oraliqdagi eng katta / eng kiçik qiymat |
| `readlib` | eski kutubxona funksiyasini yuklaş |

Maple buyruqni bajaradi, lekin nötöğri kiritilgan ifodaga ham natija beradi. Şuning uçun har bir natijani qölda, heç bölmasa bitta misolda tekşiring.
