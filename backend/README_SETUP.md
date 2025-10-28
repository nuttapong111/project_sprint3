# คู่มือการตั้งค่าและเชื่อมต่อ Database

## การติดตั้งและรัน Backend

### 1. ติดตั้ง Dependencies

```bash
cd backend
npm install
```

### 2. ตั้งค่า Database (PostgreSQL)

#### ติดตั้ง PostgreSQL (ถ้ายังไม่มี)

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### สร้าง Database

```bash
# เข้าสู่ PostgreSQL
psql -U postgres

# หรือถ้าใช้ user อื่น
psql -U your_username
```

```sql
-- สร้าง database
CREATE DATABASE government_digital_platform;

-- เชื่อมต่อ database
\c government_digital_platform;

-- รัน schema (อยู่ใน config/schema.sql)
\i config/schema.sql
```

#### ตั้งค่า Database Configuration

แก้ไขไฟล์ `config.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=government_digital_platform
DB_USER=postgres
DB_PASSWORD=password
```

### 3. รัน Seed Script เพื่อใส่ข้อมูลทดสอบ

```bash
cd backend

# รัน seed script
node scripts/seed.js
```

คุณควรจะเห็นข้อความ:
```
✓ Inserted user: john_doe (citizen)
✓ Inserted user: jane_smith (citizen)
...
✓ User seeding completed successfully!
```

### 4. รัน Backend Server

```bash
npm start
```

คุณควรจะเห็น:
```
✅ Database connection established
✅ Database tables created/verified
🚀 Server running on port 5000
📡 API endpoints available at http://localhost:5000/api
```

## การทดสอบ API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Login (Email)
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john.doe@email.com", "password": "password123"}'
```

### Test Login (Phone)
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "0812345678", "password": "password123"}'
```

## ข้อมูลผู้ใช้ทดสอบ

### ประชาชน (Citizens)
- **Email:** john.doe@email.com
- **Phone:** 0812345678  
- **Password:** password123
- **Thai ID:** 1234567890123

- **Email:** jane.smith@email.com
- **Phone:** 0823456789
- **Password:** password123
- **Thai ID:** 2345678901234

### เจ้าหน้าที่ (Officers)
- **Email:** officer1@gov.go.th
- **Phone:** 0845678901
- **Password:** officer123

### ผู้ดูแลระบบ (Admins)
- **Email:** admin1@gov.go.th
- **Phone:** 0878901234
- **Password:** admin123

## API Endpoints

### Authentication
- `POST /api/users/register` - สมัครสมาชิก
- `POST /api/users/login` - เข้าสู่ระบบ

### Users (Admin only)
- `GET /api/users` - ดึงรายชื่อผู้ใช้ทั้งหมด
- `GET /api/users/:id` - ดึงข้อมูลผู้ใช้ตาม ID
- `POST /api/users` - สร้างผู้ใช้ใหม่
- `PATCH /api/users/:id/status` - อัปเดตสถานะผู้ใช้
- `PATCH /api/users/:id/role` - อัปเดตบทบาทผู้ใช้
- `DELETE /api/users/:id` - ลบผู้ใช้
- `GET /api/users/stats/overview` - สถิติผู้ใช้

### Reports
- `GET /api/reports` - ดึงรายการรายงานทั้งหมด
- `GET /api/reports/user/:userId` - ดึงรายงานของผู้ใช้
- `GET /api/reports/:id` - ดึงรายงานตาม ID
- `POST /api/reports` - สร้างรายงานใหม่
- `PATCH /api/reports/:id/status` - อัปเดตสถานะรายงาน
- `GET /api/reports/stats/overview` - สถิติรายงาน

### Documents
- `GET /api/documents` - ดึงรายการยื่นเอกสารทั้งหมด
- `GET /api/documents/user/:userId` - ดึงเอกสารของผู้ใช้
- `GET /api/documents/:id` - ดึงเอกสารตาม ID
- `POST /api/documents` - ยื่นเอกสารใหม่
- `PATCH /api/documents/:id/status` - อัปเดตสถานะเอกสาร
- `GET /api/documents/stats/overview` - สถิติเอกสาร

## Frontend Configuration

ตรวจสอบว่าใน frontend มีการตั้งค่า API_URL ที่ถูกต้อง:

```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
```

และใน `.env.local` (frontend):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## การแก้ไขปัญหา

### Database Connection Error
ตรวจสอบว่า PostgreSQL กำลังรันอยู่:
```bash
# macOS
brew services list

# Linux
sudo systemctl status postgresql
```

### Port Already in Use
```bash
# เปลี่ยน PORT ใน config.env
PORT=5001
```

### JWT Secret Error
ตรวจสอบว่า JWT_SECRET ใน `config.env` ไม่ว่างเปล่า


