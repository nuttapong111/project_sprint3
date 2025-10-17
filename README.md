# แพลตฟอร์มดิจิทัลภาครัฐ (Government Digital Platform)

เว็บไซต์ frontend สำหรับแพลตฟอร์มดิจิทัลภาครัฐที่สร้างด้วย Next.js, Hero-UI, และ Tailwind CSS

## 🚀 ฟีเจอร์หลัก

- **หน้าหลักที่ทันสมัย** - แสดงฟีเจอร์หลักทั้งหมดของแพลตฟอร์ม
- **UI/UX ที่สวยงาม** - ใช้ Hero-UI และ Tailwind CSS
- **การแจ้งเตือน** - ใช้ SweetAlert2 สำหรับการแจ้งเตือน
- **Responsive Design** - รองรับทุกขนาดหน้าจอ
- **Animation** - ใช้ Framer Motion สำหรับ animation ที่ลื่นไหล

## 🛠️ เทคโนโลยีที่ใช้

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Hero-UI** - Modern UI components
- **Framer Motion** - Animation library
- **SweetAlert2** - Beautiful alerts

## 📦 การติดตั้ง

1. ติดตั้ง Node.js เวอร์ชันล่าสุด
2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

3. รันโปรเจค:
   ```bash
   npm run dev
   ```

4. เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

## 📁 โครงสร้างโปรเจค

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── HeroSection.tsx      # Hero section
│   ├── FeaturesSection.tsx  # Features showcase
│   ├── StatsSection.tsx     # Statistics section
│   └── Footer.tsx           # Footer
└── lib/
    └── mockData.ts          # Mock data for development
```

## 🎨 การออกแบบ

- **สีหลัก**: Blue gradient (Primary-600 to Secondary-600)
- **ฟอนต์**: Kanit (ไทย) + Inter (อังกฤษ)
- **Card Design**: Modern cards with hover effects
- **Animation**: Smooth transitions และ micro-interactions

## 📱 ฟีเจอร์ที่แสดงในหน้าหลัก

1. **กระเป๋าเอกสารดิจิทัล** - บัตรประชาชน, ใบขับขี่, บัตรประกันสังคม
2. **ระบบแจ้งเตือนอัจฉริยะ** - แจ้งเตือนเอกสารใกล้หมดอายุ
3. **ระบบนัดหมายแพทย์** - นัดหมายออนไลน์ ดึงข้อมูลอัตโนมัติ
4. **แจ้งความออนไลน์** - AI Chatbot ช่วยถามตอบ
5. **ยื่นขออนุญาตออนไลน์** - ใบอนุญาตต่างๆ
6. **แจ้งปัญหาและติดตาม** - แจ้งปัญหาโครงสร้างพื้นฐาน

## 🔧 การพัฒนา

- ใช้ TypeScript สำหรับ type safety
- ใช้ Tailwind CSS สำหรับ styling
- ใช้ Framer Motion สำหรับ animation
- ใช้ SweetAlert2 สำหรับการแจ้งเตือน
- รองรับ responsive design

## 📄 License

MIT License
