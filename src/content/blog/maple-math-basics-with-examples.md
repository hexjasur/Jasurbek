---
title: "Maple'da matematika: ifodani soddalashtirish, yoyish, ko'paytuvchilarga ajratish, trigonometrik tenglamalar, matritsalar va hosila (misollar bilan)"
description: "Maple darsida işlagan misollarim: ifodani soddalaştiriş, yoyiş, köpaytuvçilarga ajratiş, trigonometrik tenglamalar va _EnvAllSolutions, töplamlar, matritsalar, vektorlar va hosilalar (oddiy, yuqori tartibli, xususiy)."
pubDate: 2026-11-05
tags: ["maple", "matematika", "dasturlash", "universitet", "algebra", "hosila"]
---

Bu semestrda **Maple** dasturida laboratoriya maşğulotlari ötkazdik. Maple — qölda işlaş qiyin bölgan ifodalarni soddalaştiradigan, tenglamalarni yeçadigan, hosila hisoblaydigan va grafik çizadigan kompyuter algebra tizimi. Bu maqolada darsda işlagan misollarimni mavzular böyiça tartib bilan yozib çiqdim. Har bir mavzuga bitta aniq misol bor: kod, natija va qisqa izoh.

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
| `det`, `inverse`, `eigenvalues` | matritsa xossalari |

Natijani doim qölda ham tekşirib köriş kerak: Maple xato qilmaydi, lekin kiritişda xato qiliş oson.