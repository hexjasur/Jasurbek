---
title: "Sonli usullarni brauzerda o'rganish: Numeric Methods interaktiv labi qanday ishlaydi"
description: "Numeric Methods — brauzerda ishlaydigan interaktiv sonli usullar laboratoriyasi: bisection, Newton, Simpson va boshqa usullarni formula bilan emas, tajriba bilan o'rganish."
pubDate: 2026-11-12
tags: ["numeric-methods", "mathematics", "web", "education", "nextjs"]
---

## Muammo: sonli usullar faqat daftarda qoladi

Oliy matematikada sonli usullarni odatda shunday o'rganamiz: doskada formula, daftar’da hisob, imtihonda javob.

Lekin muammo shunda: formula yodlanadi, usulning mohiyati tushunilmaydi. Nega bisection sekin, lekin ishonchli? Nega Newton tez, lekin ba'zida ishlamay qoladi? Nega Simpson trapetsiyadan aniqroq?

Bu savollarga javobni faqat tajriba beradi — qiymatlarni o'zgartirib, natija qanday o'zgarishini ko'rish kerak.

Numeric Methods loyihasi aynan shu uchun qurilgan: brauzerda ishlaydigan, o'rnatish talab qilmaydigan interaktiv lab.

## Numeric Methods nima?

Numeric Methods — bu web, desktop va Android'da ishlaydigan interaktiv sonli usullar laboratoriyasi.

| Qatlam | Texnologiya |
| --- | --- |
| Web | Next.js, React |
| Desktop | Tauri v2, Rust |
| Mobil | Android |
| Hisob | Brauzerda, real vaqtida |

O'quvchi saytni ochadi, usulni tanlaydi, funksiyani va boshlang'ich qiymatlarni kiritadi — natijani darhol jadval va grafikda ko'radi. Hech narsa yuklab olish shart emas, hech narsa serverga yuborilmaydi.

## Qaysi usullar bor?

Lab hozir uchta katta bo'limni qamrab oladi.

### 1. Tenglamalarni yechish — ildiz topish

Berilgan funksiyaning noli — ya'ni `f(x) = 0` bo'ladigan nuqta — topiladi.

| Usul | G'oya | Tezligi | Xavfi |
| --- | --- | --- | --- |
| Bisection | Oraliqni har safar yarmiga bo'lish | Sekin, lekin barqaror | Har doim ishlaydi, agar oraliqda ildiz bo'lsa |
| Newton-Raphson | Urinma chiziq bilan yaqinlashish | Juda tez | Yomon boshlang'ich nuqtada uzoqlashib ketishi mumkin |
| Secant | Ikkita nuqta orqali kesuvchi | Tez | Hosila kerak emas, lekin beqaror bo'lishi mumkin |

Lab'da har bir usulning har bir qadami jadvalda ko'rinadi: qaysi nuqta olindi, xato qancha bo'ldi, keyingi qadam qayerda bo'ladi.

### 2. Integrallarni hisoblash

Aniq integralni analitik yechish har doim ham mumkin emas. Shunda sonli integrallash ishlatiladi.

| Usul | G'oya |
| --- | --- |
| Trapetsiya | Egri chiziq ostini trapetsiyalar bilan to'ldirish |
| Simpson 1/3 | Parabola bilan yaqinlashish, trapetsiyadan aniqroq |
| Gauss kvadraturasi | Maxsus nuqtalarda hisoblash, kam nuqta bilan yuqori aniqlik |

O'quvchi `n` — bo'lak sonini oshirgan sari xato qanday kamayishini grafikda ko'radi. Bu — formulani yodlashdan ko'ra kuchliroq dars.

### 3. Differensial tenglamalar

| Usul | G'oya |
| --- | --- |
| Euler | Kichik qadamlar bilan oldinga yurish |
| Heun | Oldindan bashorat + tuzatish |
| Runge-Kutta 4 | To'rtta baholashning vaznli o'rtachasi, eng ko'p ishlatiladigan |

Bu bo'limda qadam kattaligi `h`'ni o'zgartirish — natija qanday buzilishini darhol ko'rsatadi. Katta qadam — tez, lekin noto'g'ri. Kichik qadam — aniq, lekin sekin.

## Interaktiv lab qanday ishlaydi?

Har bir usul sahifasi bir xil mantiqda qurilgan:

### 1. Kirish — nimani hisoblaysan?

O'quvchi avval funksiyani yozadi. Masalan:

```text
f(x) = x^3 - x - 2
```

Keyin usulga kerakli parametrlar: oraliq, boshlang'ich nuqta, aniqlik, maksimal qadam soni.

### 2. Hisob — brauzerda, real vaqtida

Hisob serverga bormaydi. JavaScript funksiyani o'qiydi, usulni qadam-qadam bajaradi va har bir qadamni saqlaydi.

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

Bu kodning mohiyati: har bir qadamni eslab qolish. Chunki o'quvchiga faqat javob emas, yo'l kerak.

### 3. Natija — jadval + grafik

Natija uch qismda ko'rsatiladi:

- **Javob:** ildiz yoki integral qiymati, xato bilan birga.
- **Qadamlar jadvali:** har bir iteratsiya — qanday qiymat olindi, xato qancha bo'ldi.
- **Grafik:** funksiya chizig'i, usul qanday yaqinlashgani, qadamlar ketma-ketligi.

Grafik — eng muhim qism. Newton nima uchun ba'zida uzoqlashib ketishini faqat grafikda tushunish mumkin.

## Nega aynan brauzerda?

Uchta sabab bor:

**1. O'rnatish yo'q.** Talaba Maple yoki MATLAB o'rnatishi shart emas. Linkni ochdi — lab tayyor.

**2. Xavfsizlik va maxfiylik.** Hisob brauzerda bo'ladi. Funksiya va natijalar serverga ketmaydi.

**3. Tajriba tezligi.** Qiymatni o'zgartirding — natija darhol yangilanadi. Qog'ozda bir misol 20 daqiqa, lab'da 20 soniya.

## Talaba lab'dan qanday foydalanishi kerak?

Tasodifiy tugmalarni bosish — o'rganish emas. Lab'dan to'g'ri foydalanish tartibi shunday:

1. **Avval qo'lda bitta qadamni hisobla.** Formulani tushunmasdan lab'ga kirma.
2. **Lab'da tekshir.** Sening qo'l hisobing bilan lab natijasi bir xilmi?
3. **Parametrni o'zgartir.** Boshlang'ich nuqtani, `n`'ni, `h`'ni o'zgartir — natija qanday o'zgaradi?
4. **Usullarni taqqosla.** Bir xil masalani Bisection va Newton bilan yech — qaysi biri necha qadamda yetdi?
5. **Chek holatni sinab ko'r.** Newton qachon ishlamaydi? Simpson qachon xato beradi? Ataylab buzib ko'r — buzilishdan ham o'rganiladi.

## Misol: bitta masala, ikki usul

Masala: `f(x) = x^3 - x - 2` funksiyaning ildizini top.

**Bisection bilan:**

| Qadam | a | b | c | f(c) |
| --- | --- | --- | --- | --- |
| 1 | 1 | 2 | 1.5 | -0.125 |
| 2 | 1.5 | 2 | 1.75 | 1.609 |
| 3 | 1.5 | 1.75 | 1.625 | 0.666 |
| ... | ... | ... | ... | ... |

Sekin, lekin har qadamda oraliq yarmiga qisqaradi. Ishonchli.

**Newton bilan:**

Boshlang'ich nuqta `x0 = 1.5`, hosila `f'(x) = 3x^2 - 1`.

| Qadam | x | f(x) | Keyingi x |
| --- | --- | --- | --- |
| 1 | 1.5 | -0.125 | 1.5217 |
| 2 | 1.5217 | 0.0021 | 1.5214 |
| 3 | 1.5214 | ~0 | To'xtadi |

3 qadamda javob. Lekin boshlang'ich nuqtani noto'g'ri tanlasang — usul uzoqlashib ketishi mumkin. Lab'da buni o'zing sinab ko'rishing mumkin.

## Xulosa

Sonli usullarni o'rganishning eng yaxshi yo'li — formulani yodlash emas, usulni ishlatib ko'rish.

Numeric Methods shu g'oyada qurilgan:

1. Funksiyani kirit.
2. Usulni tanla.
3. Qadamlarni ko'r, grafikni kuzat.
4. Parametrlarni o'zgartirib, usulning xarakterini tushun.

Matematika qog'ozda emas, tajribada o'rganiladi.
