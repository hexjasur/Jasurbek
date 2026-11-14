---
title: "Sonli usullarni brauzerda örganiş: Numeric Methods interaktiv labi qanday işlaydi"
description: "Numeric Methods: brauzerda işlaydigan interaktiv sonli usullar labi. Bisection, Newton, Simpson va boşqa usullar tajriba orqali örganiladi."
pubDate: 2026-11-12
updatedDate: 2026-11-15
tags: ["numeric-methods", "mathematics", "web", "education", "nextjs"]
---

## Muammo: sonli usullar faqat daftarda qoladi

Oliy matematikada sonli usullar odatda şunday örganiladi: doskada formula, daftarda hisob, imtihonda javob.

Formulani yodlaş mumkin, lekin usulning mohiyati tuşunilmaydi. Nega bisection sekin, lekin işonçli? Nega Newton tez, lekin ba'zan işlamay qoladi? Nega Simpson trapetsiyadan aniqroq?

Bu savollarga javobni tajriba beradi: qiymatlarni özgartirib, natija qanday özgarişini köriş kerak. Numeric Methods şu uçun qurilgan: örnatiş talab qilmaydigan, brauzerda işlaydigan interaktiv lab.

## Numeric Methods nima?

Numeric Methods — web, desktop va Android'da işlaydigan interaktiv sonli usullar labi. Ilova bitta kod bazasidan quriladi.

| Qatlam | Texnologiya |
| --- | --- |
| Web | Next.js, React |
| Desktop | Tauri v2, Rust |
| Mobil | Android (APK) |
| Hisob | Brauzerda |

Ilovada 10 ta usul bor. Töliq röyxat [loyiha README'sida](https://github.com/hexjasur/numeric-methods). Quyida maqolada tasvirlangan asosiy usullar.

## Qaysi usullar bor?

### 1. Tenglama ildizi

Berilgan funksiyaning noli, ya'ni `f(x) = 0` böladigan nuqta topiladi.

| Usul | Ğoya | Tezligi | Xavfi |
| --- | --- | --- | --- |
| Bisection | Oraliqni har safar yarmiga böliş | Sekin, lekin barqaror | Oraliqda ildiz bölsa, har doim topadi |
| Newton-Raphson | Urinma çiziq bilan yaqinlaşiş | Juda tez | Yomon boşlanğiç nuqtada uzoqlaşib ketişi mumkin |

Lab'da har bir qadam jadvalda körinadi: qaysi nuqta olindi, xato qançaga kamaydi, keyingi qadam qayerda.

### 2. Integrallarni hisoblaş

Aniq integralni analitik yeçiş har doim mumkin emas. Şunda sonli integrallaş işlatiladi.

| Usul | Ğoya |
| --- | --- |
| Töğri törtburçaklar | Egri çiziq ostini törtburçaklar bilan töldiriş |
| Trapetsiya | Egri çiziq ostini trapetsiyalar bilan töldiriş |
| Simpson 1/3 | Parabola bilan yaqinlaşiş, trapetsiyadan aniqroq |

`n`, bölaklar soni oşgani sari xato qanday kamayişini grafikda körasiz.

### 3. Differensial tenglamalar

| Usul | Ğoya |
| --- | --- |
| Euler | Kiçik qadamlar bilan oldinga yuriş |
| Heun | Oldindan başorat qiliş + tuzatiş (lab'da "Takomillaşgan Eyler" rejimi) |
| Runge-Kutta 4 | Tört bahoning vaznli örtaçasi, eng köp işlatiladigan |

Bu bölimda qadam kattaligi `h` ni özgartiriş natija qanday buzilişini darhol körsatadi. Katta qadam tez, lekin notöğri. Kiçik qadam aniq, lekin sekin.

## Interaktiv lab qanday işlaydi?

Har bir usul sahifasi bir xil mantiqda qurilgan.

### 1. Kiritiş

Öquvçi avval funksiyani yozadi, masalan:

```text
f(x) = x^3 - x - 2
```

Söng usulga kerakli parametrlarni kiritadi: oraliq, boşlanğiç nuqta, aniqlik va maksimal qadamlar soni.

### 2. Hisob brauzerda

Hisob brauzerda bajariladi. JavaScript funksiyani öqiydi, usulni qadam-qadam bajaradi va har bir qadamni saqlaydi.

```ts
// Soddalaştirilgan bisection ğoyası (lab'dagi haqiqiy kod emas)
function bisection(f: (x: number) => number, a: number, b: number) {
  const steps = [];
  for (let i = 0; i < 50; i++) {
    const c = (a + b) / 2;
    steps.push({ i, a, b, c, f_c: f(c) });
    if (f(a) * f(c) < 0) b = c;
    else a = c;
    if (Math.abs(b - a) < 0.0001) break;
  }
  return steps;
}
```

Muhim jihati: har bir qadam saqlanadi. Öquvçiga faqat javob emas, yöl ham kerak.

### 3. Natija: jadval va grafik

Natija pastda körsatiladi:

- **Javob:** ildiz yoki integral qiymati, xato bilan birga.
- **Qadamlar jadvali:** har bir iteratsiya, qanday qiymat olingani va xato qançaga kamaygani.
- **Grafik:** funksiya çiziği, usul qanday yaqinlaşgani, qadamlar ketma-ketligi.

Newton nega ba'zan uzoqlaşişini grafikda köriş osonroq.

## Nega brauzerda?

1. **Örnatiş şart emas.** Havolani oçing, lab tayyor. Maple yoki MATLAB kerak emas.
2. **Hisob brauzerda bajariladi.** Parametrni özgartirsangiz, natija darhol yangilanadi.

## Talaba lab'dan qanday foydalanişi kerak?

Tasodifiy tugmalarni bosiş örganiş emas. Lab'dan töğri foydalaniş tartibi:

1. **Avval qölda bitta qadamni hisoblang.** Formulani tuşunmasdan lab'ga kirmang.
2. **Lab'da tekşiring.** Qölda hisobingiz lab natijasi bilan bir xilmi?
3. **Parametrni özgartiring.** Boşlanğiç nuqtani, `n`ni yoki `h`ni özgartiring. Natija qanday özgaradi?
4. **Usullarni taqqoslang.** Bir xil masalani Bisection va Newton bilan yeçing. Qaysi biri neça qadamda yetdi?
5. **Çegara holatini sinab köring.** Newton qaçon işlamaydi? Simpson qaçon xato beradi? Ataylab buzib köring: buzilişdan ham örganiladi.

## Misol: bitta masala, ikki usul

Masala: `f(x) = x^3 - x - 2` funksiyaning ildizini toping.

**Bisection bilan:**

| Qadam | a | b | c | f(c) |
| --- | --- | --- | --- | --- |
| 1 | 1 | 2 | 1.5 | -0.125 |
| 2 | 1.5 | 2 | 1.75 | 1.609 |
| 3 | 1.5 | 1.75 | 1.625 | 0.666 |
| ... | ... | ... | ... | ... |

Har qadamda oraliq yarmiga qisqaradi. Sekin, lekin işonçli.

![Bisection: [1, 2] oraliq uç qadamda yarmiga bölinadi. Qadam 1: a=1, b=2, c=1.5. Qadam 2: a=1.5, b=2, c=1.75. Qadam 3: a=1.5, b=1.75, c=1.625.](/images/blog/sonli-usullar-brauzerda/bisection.svg)

**Newton bilan:**

Boşlanğiç nuqta `x0 = 1.5`, hosila `f'(x) = 3x^2 - 1`, demak `f(x0) = -0.125` va `f'(x0) = 5.75`.

| Qadam | x | f(x) | Keyingi x |
| --- | --- | --- | --- |
| 1 | 1.5 | -0.125 | 1.5217 |
| 2 | 1.5217 | 0.0021 | 1.5214 |
| 3 | 1.5214 | ~0 | Töxtadi |

![Newton: x0 = 1.5 nuqtasidagi urinma x-öqni x1 ≈ 1.5217 nuqtada kesadi. f(x0) = −0.125, f'(x0) = 5.75.](/images/blog/sonli-usullar-brauzerda/newton-tangent.svg)

Uç qadamda javob çiqdi. Lekin boşlanğiç nuqtani notöğri tanlasangiz, usul uzoqlaşib ketişi mumkin. Buni lab'da özingiz sinab körişingiz mumkin.

## Xulosa

Sonli usullarni örganişning eng yaxşi yöli: formulani yodlaş emas, usulni işlatib köriş. Funksiyani kiriting, usulni tanlang, qadamlarni kuzating va parametrlarni özgartiring.
