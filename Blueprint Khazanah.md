# Project Blueprint: Khazanah Kitab (خزانة الكتاب)
**คลังตำราวิชาการอิสลามพหุภาษา (อาหรับ • มลายู รูมี-ยาวี • ไทย)**

## 1. Site Metadata & Identity
- **ชื่อหลัก (Brand):** Khazanah Kitab (`خزانة الكتاب`)
- **คำโปรย:** คลังตำราวิชาการอิสลามพหุภาษา: อาหรับ • มลายู (รูมี-ยาวี) • ไทย
- **ภาษาและอักษรที่รองรับ:**
  1. ภาษาไทย (`th` - LTR)
  2. ภาษามลายู อักษรรูมี (`ms` - LTR)
  3. ภาษามลายู อักษรยาวี (`ms-Arab` - RTL)
  4. ภาษาอาหรับ (`ar` - RTL)

## 2. สถาปัตยกรรมระบบ (System Architecture)
- **Web Engine:** Astro + Starlight Template (Layout 2 คอลัมน์แบบ `r-graphics.org` พร้อมระบบค้นหา Pagefind ในตัว)
- **Content Storage:** ไฟล์ Markdown (`.md` / `.mdx`) จัดเก็บใน GitHub Repository (`solargaria/khazanah-kitab`)
- **Media & Scans Storage:** Cloudflare R2 (ฟรี 10 GB สำหรับเก็บไฟล์ภาพสแกนตำราเก่าหรือ PDF)
- **Hosting & Auto-Deploy:** Cloudflare Pages (ฟรีถาวร อัปเดตอัตโนมัติเมื่อ `git push`)
- **Local AI Pipeline (MacBook Air):**
  - `gemma4:12b`: ถอดความจากภาพสแกน (OCR), ตรวจอักษรยาวีพิเศษ (`ڽ, ڠ, ݢ, ڤ, چ`) และปริวรรต ยาวี ↔ รูมี
  - `qwen3.5:9b`: ทำความสะอาดข้อความ (Data Cleaning) และจัดรูปแบบ Markdown/Frontmatter

## 3. โครงสร้างโฟลเดอร์โปรเจกต์ (Directory Structure)
```text
khazanah-kitab/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                     # โลโก้และภาพปกตำรา
│   ├── content/
│   │   └── docs/                   # คลังเนื้อหาตำราทั้งหมด
│   │       ├── index.mdx           # หน้า Home (ปกคลังตำรา, คำนำ, ทางเข้าแต่ละหมวดภาษา)
│   │       ├── tafsir/             # หมวดตัฟซีร (เช่น Fi Zilalil Qur'an)
│   │       ├── aqidah/             # หมวดอะกีดะฮ์ / หลักศรัทธา
│   │       ├── fiqh/               # หมวดฟิกฮ์ / นิติศาสตร์อิสลาม
│   │       └── turath-jawi/        # หมวดตำราคลาสสิกอักษรยาวี
│   ├── styles/
│   │   └── custom.css              # ตั้งค่าฟอนต์ Amiri / Noto Naskh Arabic + โหมด Sepia
│   └── content.config.ts           # สคีมาตรวจสอบ Metadata ของทุกบทความ
├── astro.config.mjs                # ตั้งค่าเว็บ สารบัญ (Sidebar) และสลับภาษา (i18n)
└── package.json