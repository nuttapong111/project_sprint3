# คู่มือการเชื่อมต่อ Frontend กับ Backend API

## สรุปการเปลี่ยนแปลง

### 1. ✅ สร้าง Seed Script
สร้างไฟล์ `backend/scripts/seed.js` เพื่อใส่ข้อมูล mock users ลงใน database

### 2. ✅ ปรับปรุง Login Page
แก้ไขไฟล์ `src/app/login/page.tsx`:
- เปลี่ยนจากการใช้ `mockUsers` เป็นการเรียก API ผ่าน `apiService`
- เก็บ user ใน `UserContext` หลังจาก login สำเร็จ
- แสดง error message ที่เหมาะสมเมื่อ login ล้มเหลว

### 3. ✅ ปรับปรุง UserContext
แก้ไขไฟล์ `src/lib/userContext.ts`:
- เปลี่ยน interface จาก `mockUsers.User` เป็น `ApiUser` ที่รับจาก API
- รองรับข้อมูลจาก backend (id, username, email, fullName, role, status, phone, address, idCard)

### 4. ✅ สร้าง Setup Documentation
สร้างไฟล์ `backend/README_SETUP.md`:
- คำแนะนำการติดตั้งและตั้งค่า database
- คำแนะนำการรัน seed script
- ข้อมูลผู้ใช้ทดสอบ
- รายละเอียด API endpoints

## วิธีการใช้งาน

### 1. ตั้งค่า Backend

```bash
cd government-digital-platform/backend

# ติดตั้ง dependencies
npm install

# ตั้งค่า PostgreSQL และสร้าง database
# ดูคำแนะนำใน backend/README_SETUP.md

# รัน seed script เพื่อใส่ข้อมูลทดสอบ
node scripts/seed.js

# รัน backend server
npm start
```

### 2. ตั้งค่า Frontend

สร้างไฟล์ `.env.local` ที่ root ของ frontend:

```bash
cd government-digital-platform
```

สร้างไฟล์ `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

หรือ export environment variable:
```bash
export NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. รัน Frontend

```bash
# ติดตั้ง dependencies (ถ้ายังไม่ติดตั้ง)
npm install

# รัน frontend
npm run dev
```

เปิด browser ไปที่ `http://localhost:3000`

## การทดสอบ

### ทดสอบ Login

1. เปิด browser ไปที่ `http://localhost:3000/login`
2. เลือกวิธีการ login (อีเมล หรือเบอร์โทรศัพท์)
3. ใช้ข้อมูลทดสอบ:
   - **Email:** john.doe@email.com
   - **Phone:** 0812345678
   - **Password:** password123

### ทดสอบ API โดยตรง

```bash
# Health check
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john.doe@email.com", "password": "password123"}'
```

## ข้อมูลผู้ใช้ทดสอบ

### ประชาชน
- **username:** john_doe
- **email:** john.doe@email.com  
- **phone:** 0812345678
- **password:** password123
- **Thai ID:** 1234567890123

### เจ้าหน้าที่
- **username:** officer1
- **email:** officer1@gov.go.th
- **phone:** 0845678901
- **password:** officer123

### ผู้ดูแลระบบ
- **username:** admin1
- **email:** admin1@gov.go.th
- **phone:** 0878901234
- **password:** admin123

## โครงสร้าง API

### Authentication
- `POST /api/users/login` - Login ด้วย email/phone และ password
- `POST /api/users/register` - สมัครสมาชิก

### Users (ต้องมี authentication token)
- `GET /api/users` - ดึงรายชื่อผู้ใช้ (admin only)
- `GET /api/users/:id` - ดึงข้อมูลผู้ใช้
- `GET /api/users/stats/overview` - สถิติผู้ใช้

### Reports
- `POST /api/reports` - สร้างรายงานใหม่
- `GET /api/reports/user/:userId` - ดึงรายงานของผู้ใช้
- `PATCH /api/reports/:id/status` - อัปเดตสถานะรายงาน

### Documents
- `POST /api/documents` - ยื่นเอกสารใหม่
- `GET /api/documents/user/:userId` - ดึงเอกสารของผู้ใช้
- `PATCH /api/documents/:id/status` - อัปเดตสถานะเอกสาร

## การแก้ไขปัญหา

### Error: Network error
- ตรวจสอบว่า backend server กำลังรันอยู่
- ตรวจสอบว่า API_URL ใน `.env.local` ถูกต้อง
- ตรวจสอบ CORS settings ใน backend

### Error: Invalid credentials
- ตรวจสอบว่าได้รัน seed script แล้ว
- ตรวจสอบว่า username และ password ถูกต้อง

### Database connection error
- ตรวจสอบว่า PostgreSQL กำลังรันอยู่
- ตรวจสอบ database configuration ใน `config.env`
- ลองรัน `node scripts/seed.js` อีกครั้ง

## สิ่งที่ยังต้องทำ

### เพิ่ม API Endpoints
- [ ] Digital documents API (สำหรับ digital wallet)
- [ ] Medical appointments API
- [ ] Notifications API
- [ ] Thai ID login API (QR code authentication)

### ปรับปรุง Frontend
- [ ] เชื่อมต่อ digital wallet กับ API
- [ ] เชื่อมต่อ medical appointments กับ API
- [ ] เชื่อมต่อ notifications กับ API
- [ ] เชื่อมต่อ reports กับ API
- [ ] เชื่อมต่อ document submissions กับ API

### เพิ่ม Features
- [ ] File upload สำหรับ attachments
- [ ] PDF generation
- [ ] QR code generation
- [ ] Email notifications

