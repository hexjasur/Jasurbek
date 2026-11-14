---
title: "Sonli usullarni brauzerda örganiş: Numeric Methods interaktiv labi qanday işlaydi"
description: "Numeric Methods — brauzerda işlaydigan interaktiv sonli usullar laboratoriyasi: bisection, Newton, Simpson va boşqa usullarni formula bilan emas, tajriba bilan örganiş."
pubDate: 2026-11-12
updatedDate: 2026-11-14
tags: ["numeric-methods", "mathematics", "web", "education", "nextjs"]
---

## Muammo: sonli usullar faqat daftarda qoladi

Oliy matematikada sonli usullarni odatda şunday örganamiz: doskada formula, daftar’da hisob, imtihonda javob.

Lekin muammo şunda: formula yodlanadi, usulning mohiyati tuşunilmaydi. Nega bisection sekin, lekin işonçli? Nega Newton tez, lekin ba'zida işlamay qoladi? Nega Simpson trapetsiyadan aniqroq?

Bu savollarga javobni faqat tajriba beradi — qiymatlarni özgartirib, natija qanday özgarişini köriş kerak.

Numeric Methods loyihasi aynan şu uçun qurilgan: brauzerda işlaydigan, örnatiş talab qilmaydigan interaktiv lab.

## Numeric Methods nima?

Numeric Methods — bu web, desktop va Android'da işlaydigan interaktiv sonli usullar laboratoriyasi.

| Qatlam | Texnologiya |
| --- | --- |
| Web | Next.js, React |
| Desktop | Tauri v2, Rust |
| Mobil | Android |
| Hisob | Brauzerda, real vaqtida |

Öquvçi saytni oçadi, usulni tanlaydi, funksiyani va boşlanğiç qiymatlarni kiritadi — natijani darhol jadval va grafikda köradi. Heç narsa yuklab oliş şart emas, heç narsa serverga yuborilmaydi.

## Qaysi usullar bor?

Lab hozir uçta katta bölimni qamrab oladi.

### 1. Tenglamalarni yeçiş — ildiz topiş

Berilgan funksiyaning noli — ya'ni `f(x) = 0` böladigan nuqta — topiladi.

| Usul | Ğoya | Tezligi | Xavfi |
| --- | --- | --- | --- |
| Bisection | Oraliqni har safar yarmiga böliş | Sekin, lekin barqaror | Har doim işlaydi, agar oraliqda ildiz bölsa |
| Newton-Raphson | Urinma çiziq bilan yaqinlaşiş | Juda tez | Yomon boşlanğiç nuqtada uzoqlaşib ketişi mumkin |
| Secant | Ikkita nuqta orqali kesuvçi | Tez | Hosila kerak emas, lekin beqaror bölişi mumkin |

Lab'da har bir usulning har bir qadami jadvalda körinadi: qaysi nuqta olindi, xato qança böldi, keyingi qadam qayerda böladi.

### 2. Integrallarni hisoblaş

Aniq integralni analitik yeçiş har doim ham mumkin emas. Şunda sonli integrallaş işlatiladi.

| Usul | Ğoya |
| --- | --- |
| Trapetsiya | Egri çiziq ostini trapetsiyalar bilan töldiriş |
| Simpson 1/3 | Parabola bilan yaqinlaşiş, trapetsiyadan aniqroq |
| Gauss kvadraturasi | Maxsus nuqtalarda hisoblaş, kam nuqta bilan yuqori aniqlik |

Öquvçi `n` — bölak sonini oşirgan sari xato qanday kamayişini grafikda köradi. Bu — formulani yodlaşdan köra kuçliroq dars.

### 3. Differensial tenglamalar

| Usul | Ğoya |
| --- | --- |
| Euler | Kiçik qadamlar bilan oldinga yuriş |
| Heun | Oldindan başorat + tuzatiş |
| Runge-Kutta 4 | Törtta baholaşning vaznli örtaçasi, eng köp işlatiladigan |

Bu bölimda qadam kattaligi `h`'ni özgartiriş — natija qanday buzilişini darhol körsatadi. Katta qadam — tez, lekin notöğri. Kiçik qadam — aniq, lekin sekin.

## Interaktiv lab qanday işlaydi?

Har bir usul sahifasi bir xil mantiqda qurilgan:

### 1. Kiriş — nimani hisoblaysan?

Öquvçi avval funksiyani yozadi. Masalan:

```text
f(x) = x^3 - x - 2
```

Keyin usulga kerakli parametrlar: oraliq, boşlanğiç nuqta, aniqlik, maksimal qadam soni.

### 2. Hisob — brauzerda, real vaqtida

Hisob serverga bormaydi. JavaScript funksiyani öqiydi, usulni qadam-qadam bajaradi va har bir qadamni saqlaydi.

```ts
// Soddalashtirilgan bisection g'oyasi
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

Bu kodning mohiyati: har bir qadamni eslab qoliş. Çunki öquvçiga faqat javob emas, yöl kerak.

### 3. Natija — jadval + grafik

Natija uç qismda körsatiladi:

- **Javob:** ildiz yoki integral qiymati, xato bilan birga.
- **Qadamlar jadvali:** har bir iteratsiya — qanday qiymat olindi, xato qança böldi.
- **Grafik:** funksiya çiziği, usul qanday yaqinlaşgani, qadamlar ketma-ketligi.

Grafik — eng muhim qism. Newton nima uçun ba'zida uzoqlaşib ketişini faqat grafikda tuşuniş mumkin.

## Nega aynan brauzerda?

Uçta sabab bor:

**1. Örnatiş yöq.** Talaba Maple yoki MATLAB örnatişi şart emas. Linkni oçdi — lab tayyor.

**2. Xavfsizlik va maxfiylik.** Hisob brauzerda böladi. Funksiya va natijalar serverga ketmaydi.

**3. Tajriba tezligi.** Qiymatni özgartirding — natija darhol yangilanadi. Qoğozda bir misol 20 daqiqa, lab'da 20 soniya.

## Talaba lab'dan qanday foydalanişi kerak?

Tasodifiy tugmalarni bosiş — örganiş emas. Lab'dan töğri foydalaniş tartibi şunday:

1. **Avval qölda bitta qadamni hisobla.** Formulani tuşunmasdan lab'ga kirma.
2. **Lab'da tekşir.** Sening qöl hisobing bilan lab natijasi bir xilmi?
3. **Parametrni özgartir.** Boşlanğiç nuqtani, `n`'ni, `h`'ni özgartir — natija qanday özgaradi?
4. **Usullarni taqqosla.** Bir xil masalani Bisection va Newton bilan yeç — qaysi biri neça qadamda yetdi?
5. **Çek holatni sinab kör.** Newton qaçon işlamaydi? Simpson qaçon xato beradi? Ataylab buzib kör — buzilişdan ham örganiladi.

## Misol: bitta masala, ikki usul

Masala: `f(x) = x^3 - x - 2` funksiyaning ildizini top.

**Bisection bilan:**

| Qadam | a | b | c | f(c) |
| --- | --- | --- | --- | --- |
| 1 | 1 | 2 | 1.5 | -0.125 |
| 2 | 1.5 | 2 | 1.75 | 1.609 |
| 3 | 1.5 | 1.75 | 1.625 | 0.666 |
| ... | ... | ... | ... | ... |

Sekin, lekin har qadamda oraliq yarmiga qisqaradi. Işonçli.

**Newton bilan:**

Boşlanğiç nuqta `x0 = 1.5`, hosila `f'(x) = 3x^2 - 1`.

| Qadam | x | f(x) | Keyingi x |
| --- | --- | --- | --- |
| 1 | 1.5 | -0.125 | 1.5217 |
| 2 | 1.5217 | 0.0021 | 1.5214 |
| 3 | 1.5214 | ~0 | Töxtadi |

3 qadamda javob. Lekin boşlanğiç nuqtani notöğri tanlasang — usul uzoqlaşib ketişi mumkin. Lab'da buni özing sinab körişing mumkin.

## Xulosa

Sonli usullarni örganişning eng yaxşi yöli — formulani yodlaş emas, usulni işlatib köriş.

Numeric Methods şu ğoyada qurilgan:

1. Funksiyani kirit.
2. Usulni tanla.
3. Qadamlarni kör, grafikni kuzat.
4. Parametrlarni özgartirib, usulning xarakterini tuşun.

Matematika qoğozda emas, tajribada örganiladi.
