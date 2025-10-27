# การตั้งค่า Google Gemini API สำหรับ Speech-to-Text

## 📋 วิธีการ

### 1. ขอ Gemini API Key
ไปที่ [Google AI Studio](https://makersuite.google.com/app/apikey) และสร้าง API key

### 2. สร้างไฟล์ `.env.local`

ที่ root ของโปรเจค (เช่น `government-digital-platform/`) ให้สร้างไฟล์ `.env.local` และใส่ API key ลงไป:

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Google Gemini API (for Speech-to-Text)
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Example
```bash
cp env.example .env.local
# แล้วแก้ไขไฟล์ .env.local โดยใส่ API key ของคุณ
```

### 4. Restart Development Server
```bash
npm run dev
```

## ⚠️ หมายเหตุ

- ถ้ายังไม่มี API key ระบบจะใช้การจำลอง (simulation) แทน
- Gemini API รองรับการแปลงเสียงเป็นข้อความภาษาไทย
- ตรวจสอบให้แน่ใจว่า API key มี quota เพียงพอ

## 📝 ไฟล์ที่เกี่ยวข้อง

- `src/app/citizen/report-crime/ai-chat/page.tsx` - ใช้ Gemini API สำหรับ Speech-to-Text
- `.env.local` - เก็บ API key (ไฟล์นี้จะไม่ถูก commit ขึ้น Git)

