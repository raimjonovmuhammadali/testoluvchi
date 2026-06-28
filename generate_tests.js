import fs from 'fs';

const exhaustiveQuestions = [
  // SECTION 1: HTML Asoslari
  { type: 'choice', text: "HTML (HyperText Markup Language) qanday vazifani bajaradi?", options: ["Veb-sahifaning dizaynini chizadi", "Veb-sahifalarning strukturasini yaratadi", "Ma'lumotlar bazasini boshqaradi", "Foydalanuvchi ma'lumotlarini tekshiradi", "Serverni sozlaydi"], correctAnswerIndex: 1 },
  { type: 'text', text: "HTML qisqartmasining to'liq ma'nosini yozing.", correctAnswerText: "HyperText Markup Language" },
  { type: 'choice', text: "Veb-dasturlashda kod yozish uchun eng qulay va bepul kod muharriri qaysi?", options: ["Sublime Text", "Atom", "Notepad", "VS Code", "WebStorm"], correctAnswerIndex: 3 },
  { type: 'choice', text: "Yozilgan kodlarni brauzerda avtomatik ravishda yangilab ko'rsatuvchi VS Code kengaytmasi nima?", options: ["Auto Reload", "Live Server Extension", "Code Runner", "Browser Sync", "HTML Preview"], correctAnswerIndex: 1 },
  { type: 'code', text: "Hujjat HTML5 standartida ekanligini anglatuvchi kodni yozing.", correctAnswerCode: "<!DOCTYPE html>" },
  { type: 'code', text: "Sahifa tilini o'zbek tiliga sozlaydigan tagni to'liq yozing.", correctAnswerCode: "<html lang=\"uz\">" },
  { type: 'choice', text: "Sahifaning texnik qismi (meta-taglar, sarlavha, CSS ulanmalari) qayerda joylashadi?", options: ["<body>", "<head>", "<html>", "<title>", "<meta>"], correctAnswerIndex: 1 },
  { type: 'code', text: "O'zbek harflari va maxsus belgilarni to'g'ri o'qish uchun <meta> tagini to'liq yozing.", correctAnswerCode: "<meta charset=\"UTF-8\">" },
  { type: 'text', text: "Foydalanuvchiga ko'rinadigan barcha kontent joylashadigan qism tagining nomini yozing (qavslarsiz).", correctAnswerText: "body" },
  { type: 'code', text: "Google qidiruv tizimiga (https://google.com) havolani yangi oynada ochadigan qilib yozing (matni: Google).", correctAnswerCode: "<a href=\"https://google.com\" target=\"_blank\">Google</a>" },

  // SECTION 2: Sarlavhalar, Xatboshilar va Izohlar
  { type: 'choice', text: "SEO (Qidiruv tizimini optimallashtirish) uchun <h1> sarlavhasi sahifada necha marta yozilishi kerak?", options: ["Istalgancha", "3 marta", "Umuman yozilmasligi kerak", "1 marta", "10 martagacha"], correctAnswerIndex: 3 },
  { type: 'text', text: "Eng kichik sarlavhani ifodalovchi tagni yozing (faqat tag nomi).", correctAnswerText: "h6" },
  { type: 'choice', text: "Paragraf uchun qaysi tag ishlatiladi?", options: ["<br>", "<p>", "<div>", "<span>", "<text>"], correctAnswerIndex: 1 },
  { type: 'text', text: "Yangi qatorga o'tish uchun qaysi tag ishlatiladi? (qavslarsiz)", correctAnswerText: "br" },
  { type: 'choice', text: "Brauzerda ko'rinmaydigan, dasturchilar uchun yoziladigan kod qismi nima deyiladi?", options: ["Atributlar", "Izohlar (Comments)", "Head qismi", "Meta taglar", "Elementlar"], correctAnswerIndex: 1 },
  { type: 'code', text: "Matni 'Izoh' bo'lgan kod izohini (comment) to'g'ri HTML sintaksisida yozing.", correctAnswerCode: "<!-- Izoh -->" },

  // SECTION 3: CSS Asoslari va Havolalar/Rasmlar
  { type: 'choice', text: "CSS ni ulashning nechta asosiy usuli ko'rsatilgan?", options: ["1", "2", "3", "4", "5"], correctAnswerIndex: 2 },
  { type: 'code', text: "'p' tagi ichida Inline CSS orqali matnni qizil rangga (red) kirgizing. (Matn: Qizil matn)", correctAnswerCode: "<p style=\"color: red;\">Qizil matn</p>" },
  { type: 'choice', text: "<head> qismida <style> tagi yordamida yoziladigan CSS qaysi usulga kiradi?", options: ["Inline CSS", "External CSS", "Internal CSS", "Import CSS", "Global CSS"], correctAnswerIndex: 2 },
  { type: 'code', text: "External CSS ulash uchun 'head' ichida qanday kod yoziladi (fayl nomi 'style.css')?", correctAnswerCode: "<link rel=\"stylesheet\" href=\"style.css\">" },
  { type: 'code', text: "Rasmni sahifaga ulash kodini yozing: rasm manzili 'rasm.jpg', muqobil matni 'Rasm tavsifi', kengligi '300'.", correctAnswerCode: "<img src=\"rasm.jpg\" alt=\"Rasm tavsifi\" width=\"300\">" },
  { type: 'choice', text: "Tartiblanmagan (nuqtali) ro'yxat yaratish uchun qaysi tagdan foydalaniladi?", options: ["<ol>", "<ul>", "<li>", "<list>", "<dl>"], correctAnswerIndex: 1 },
  { type: 'text', text: "Tartiblangan (raqamli) ro'yxat qaysi tag orqali yoziladi? (qavslarsiz)", correctAnswerText: "ol" },
  { type: 'choice', text: "Jadval (<table>) da sarlavha katagini belgilash uchun qaysi tag ishlatiladi?", options: ["<tr>", "<td>", "<th>", "<thead>", "<tbody>"], correctAnswerIndex: 2 },

  // SECTION 4: Class va ID, Block va Inline
  { type: 'choice', text: "Class va ID o'rtasidagi asosiy farq nima?", options: ["Farqi yo'q", "Class noyob, ID esa bir nechta elementga berilishi mumkin", "Class faqat CSSda, ID faqat JavaScriptda ishlatiladi", "ID sahifada faqat bitta bo'ladigan noyob nom, Class bitta nomni bir nechta elementga berish mumkin", "Ikkalasi ham noyob bo'lishi shart"], correctAnswerIndex: 3 },
  { type: 'text', text: "CSS-da ID qanday belgi bilan chaqiriladi?", correctAnswerText: "#" },
  { type: 'choice', text: "Yangi qatordan boshlanib butun kenglikni egallaydigan elementlar qanday elementlar deyiladi?", options: ["Inline", "Flex", "Grid", "Block", "Absolute"], correctAnswerIndex: 3 },
  { type: 'choice', text: "Qaysi biri Inline element hisoblanadi?", options: ["<div>", "<p>", "<h1>", "<span>", "<ul>"], correctAnswerIndex: 3 },
  { type: 'code', text: "Ma'lumot yuborish uchun 'form' yaratuvchi asosiy tag nima? (ochiluvchi tagning o'zini yozing)", correctAnswerCode: "<form>" },
  { type: 'code', text: "Foydalanuvchidan matnli (text) Ismini qabul qiladigan inputni yozing (placeholder=\"Ismingiz\").", correctAnswerCode: "<input type=\"text\" placeholder=\"Ismingiz\">" },
  { type: 'code', text: "Formani yuborish (submit) tugmasini matni 'Yuborish' deb yozing.", correctAnswerCode: "<button type=\"submit\">Yuborish</button>" },

  // SECTION 5: Multimediya & Best Practices
  { type: 'code', text: "Ovozli faylni joylashtirish kodini yozing (manzil: 'audio.mp3', controls qo'shilgan holatda).", correctAnswerCode: "<audio src=\"audio.mp3\" controls></audio>" },
  { type: 'text', text: "Youtube videosini sahifaga joylash uchun asosan qaysi tagdan foydalaniladi? (qavslarsiz)", correctAnswerText: "iframe" },
  { type: 'choice', text: "Qaysi biri HTML Best Practices (eng yaxshi amaliyotlar) sirasiga kiradi?", options: ["Hammasi katta harfda yozish", "Kodlarni surib yozish (indentation), rasmlarga alt yozish", "Faqat ID dan foydalanish", "Inline CSS dan doimiy foydalanish", "<body> tagini yozmaslik"], correctAnswerIndex: 1 },

  // SECTION 6: CSS Kirish & Selectors
  { type: 'text', text: "CSS qisqartmasining to'liq ma'nosini yozing.", correctAnswerText: "Cascading Style Sheets" },
  { type: 'choice', text: "Barcha elementlarga ta'sir qiluvchi Universal Selector qaysi belgi orqali yoziladi?", options: ["#", ".", "*", "&", "@"], correctAnswerIndex: 2 },
  { type: 'text', text: "Class Selector qanday belgi orqali yoziladi?", correctAnswerText: "." },
  { type: 'code', text: "Barcha h1, h2, h3 sarlavhalarni guruhlab, ularning rangini qora (#333) qiluvchi CSS ni yozing.", correctAnswerCode: "h1, h2, h3 { color: #333; }" },

  // SECTION 7: Borders
  { type: 'choice', text: "Nuqtali chegarani ifodalash uchun border-style ga qanday qiymat beriladi?", options: ["solid", "dashed", "dotted", "double", "none"], correctAnswerIndex: 2 },
  { type: 'code', text: "Qalinligi 2px, turi uzuq-uzuq (dashed) va rangi qizil (red) bo'lgan chegarani bir qatorda yozing (border: ...).", correctAnswerCode: "border: 2px dashed red;" },
  { type: 'code', text: "Elementning burchaklarini mukammal doira qilish uchun qaysi css xususiyati va qiymati ishlatiladi?", correctAnswerCode: "border-radius: 50%;" },

  // SECTION 8: Margins & Paddings
  { type: 'choice', text: "Element chegarasidan tashqaridagi bo'shliq nima deb ataladi?", options: ["Padding", "Border", "Margin", "Outline", "Width"], correctAnswerIndex: 2 },
  { type: 'choice', text: "Element kontenti va uning chegarasi orasidagi bo'shliq nima deb ataladi?", options: ["Padding", "Margin", "Border", "Box-sizing", "Height"], correctAnswerIndex: 0 },
  { type: 'code', text: "Block elementni sahifaning o'rtasiga tekislash (markazga tushirish) uchun ishlatiladigan CSS qoidasini yozing.", correctAnswerCode: "margin: 0 auto;" },

  // SECTION 9: Height & Width
  { type: 'text', text: "Mobil moslashuvchanlik uchun ishlatiladigan, ekrandan chiqib ketmaslikni ta'minlaydigan 'maksimal kenglik' xususiyatini yozing.", correctAnswerText: "max-width" },

  // SECTION 10: Box Model
  { type: 'choice', text: "Padding va border o'lchamlarini umumiy kenglik ichiga kiritish va tartib buzilishini oldini olish uchun qaysi CSS xususiyat ishlatiladi?", options: ["box-shadow: none", "box-sizing: border-box", "display: block", "width: auto", "margin: 0"], correctAnswerIndex: 1 },
  { type: 'code', text: "Elementning umumiy kengligini buzmaslik uchun beriladigan qoidani (box-sizing) to'liq yozing.", correctAnswerCode: "box-sizing: border-box;" },

  // SECTION 11: Text Decoration
  { type: 'choice', text: "Matnni ikki tomonga teng taqsimlash uchun text-align ga qanday qiymat beriladi?", options: ["left", "right", "center", "justify", "align-all"], correctAnswerIndex: 3 },
  { type: 'text', text: "Havolalarning (links) tagidagi standart chiziqni o'chirish uchun qaysi css xususiyati \"none\" ga tenglashtiriladi?", correctAnswerText: "text-decoration" },
  { type: 'code', text: "Matn o'rtasidan chiziq tortish (o'chirilgan so'z effekti) uchun CSS kodini yozing.", correctAnswerCode: "text-decoration: line-through;" },
  { type: 'code', text: "Matn tagiga qizil to'lqinli chiziq chizish (shorthand text-decoration) CSS qoidasini yozing.", correctAnswerCode: "text-decoration: underline red wavy;" }
];

function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const variants = {};
for (let i = 1; i <= 5; i++) {
  // Take 20 random questions out of our comprehensive pool
  variants[i] = shuffle(exhaustiveQuestions).slice(0, 20).map((q, idx) => ({ ...q, id: idx + 1 }));
}

const tests = [
  {
    id: "html-css-qollanma",
    title: "HTML & CSS Qo'llanma",
    description: "Berilgan HTML va CSS asoslari bo'yicha bilimingizni sinab ko'ring.",
    category: "Web Development",
    duration: 30,
    variants: variants
  }
];

fs.writeFileSync('data/tests.json', JSON.stringify(tests, null, 2));
console.log('Final comprehensive tests generated successfully. Pool size: ' + exhaustiveQuestions.length);
