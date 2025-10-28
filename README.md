# Government Digital Platform - Phase 1

## 📋 ภาพรวมโครงการ

แพลตฟอร์มดิจิทัลภาครัฐแบบครบวงจร เพื่อเพิ่มประสิทธิภาพการให้บริการประชาชนผ่าน Website และ Mobile Application โดยรวมบริการหลักของหน่วยงานรัฐไว้ในที่เดียว ลดขั้นตอนการยื่นเอกสาร และสามารถติดตามสถานะได้แบบเรียลไทม์

## 🎯 วัตถุประสงค์

1. ลดเวลาและขั้นตอนการให้บริการประชาชน
2. เพิ่มความโปร่งใสในการทำงานของภาครัฐ
3. ลดการใช้เอกสารกระดาษ
4. เพิ่มความสะดวกในการเข้าถึงบริการภาครัฐ
5. ปรับปรุงคุณภาพการให้บริการด้วยเทคโนโลジี

## ✨ ฟีเจอร์หลัก (Phase 1)

### 1. 💳 กระเป๋าเอกสารดิจิทัล (Digital Wallet)
- **บัตรประชาชนดิจิทัล** - พร้อม QR Code ยืนยันตัวตน
- **ใบขับขี่ดิจิทัล** - เชื่อมต่อกรมการขนส่ง
- **บัตรประกันสังคม** - แสดงสิทธิ์และประวัติการจ่าย

### 2. 🔔 ระบบแจ้งเตือนอัจฉริยะ
- แจ้งเตือนเอกสารใกล้หมดอายุ
- อัปเดตสถานะคำขอแบบเรียลไทม์
- แจ้งนัดหมายและกิจกรรมสำคัญ
- ข่าวสารจากหน่วยงานรัฐ

### 3. 🏥 ระบบนัดหมายแพทย์
- ค้นหาและเลือกโรงพยาบาล
- เลือกแผนกและแพทย์
- **ดึงข้อมูลอัตโนมัติ** - บัตรประชาชน, สิทธิ์การรักษา, ประวัติแพ้ยา
- ไม่ต้องกรอกข้อมูลซ้ำที่โรงพยาบาล
- รับ QR Code เช็คอิน

### 4. 👮 แจ้งความออนไลน์
- **AI Chatbot ช่วยถามตอบ** - รวบรวมข้อมูลเบื้องต้น
- ดึงข้อมูลผู้แจ้งอัตโนมัติ
- อัปโหลดหลักฐาน (รูป, วิดีโอ)
- ปักหมุดจุดเกิดเหตุบนแผนที่
- **ปริ้นสำนวนได้เลย** - ระบบส่งตรงเข้าสถานีตำรวจ
- ติดตามสถานะคดี

### 5. 📄 ยื่นขออนุญาตออนไลน์
- ใบอนุญาตก่อสร้าง/รื้อถอน
- ใบอนุญาตประกอบกิจการ
- ใบอนุญาตขายสุรา/บุหรี่
- ใบรับรองต่างๆ
- **ส่งข้อมูลตรงถึงหน่วยงาน** - ไม่ต้องไปยื่นด้วยตนเอง
- ติดตามสถานะตั้งแต่รับเรื่องถึงอนุมัติ

### 6. 🚧 แจ้งปัญหาและติดตาม
- แจ้งปัญหาโครงสร้างพื้นฐาน (ถนน, ไฟฟ้า, น้ำ)
- ถ่ายรูป + ปักหมุดแผนที่
- ระบบส่งตรงหน่วยงานที่รับผิดชอบ
- ติดตามความคืบหน้า
- ให้คะแนนหลังแก้ไข

---

## 👥 บทบาทผู้ใช้งาน (User Roles)

### 1. 🛡️ Admin (ผู้ดูแลระบบ)
**สิทธิ์:**
- จัดการผู้ใช้ทุก Role
- กำหนดสิทธิ์เจ้าหน้าที่แต่ละหน่วยงาน
- ดูข้อมูลทุกหน่วยงาน (Dashboard รวม)
- จัดการ Master Data
- ดู Audit Log ทั้งหมด
- จัดการ API Integration
- ตั้งค่าระบบ

### 2. 👔 เจ้าหน้าที่ (Officer) - แยกตามหน่วยงาน

#### 🏥 เจ้าหน้าที่โรงพยาบาล
- ดูรายการนัดหมายที่โรงพยาบาลตนเอง
- ดูข้อมูลผู้ป่วยที่ยินยอมแชร์เท่านั้น
- ยืนยัน/ยกเลิกการนัด
- บันทึกผลการตรวจ
- จัดการตารางแพทย์

#### 👮 เจ้าหน้าที่ตำรวจ
- ดูเรื่องแจ้งความในสถานีตนเอง
- รับเรื่อง/ปฏิเสธ
- มอบหมายงานสืบสวน
- อัปเดตสถานะคดี
- พิมพ์สำนวนอย่างเป็นทางการ
- **ขอข้อมูลข้ามหน่วยงาน** (ต้องอนุมัติ)

#### 🏢 เจ้าหน้าที่สำนักงานเขต/เทศบาล
- ดูคำขออนุญาตในเขตตนเอง
- ตรวจสอบเอกสาร
- นัดตรวจสถานที่
- อนุมัติ/ไม่อนุมัติ
- ออกใบอนุญาต
- จัดการรายงานปัญหาในพื้นที่

#### 🚗 เจ้าหน้าที่กรมขนส่ง
- ตรวจสอบคำขอต่ออายุใบขับขี่
- อนุมัติการต่ออายุ
- อัปเดตข้อมูลใบขับขี่

### 3. 👤 ประชาชน (Citizen)
**สิทธิ์:**
- ดู/จัดการข้อมูลส่วนตัว
- ดูบัตรดิจิทัลทั้งหมด
- แชร์ข้อมูลให้หน่วยงาน (ตามความยินยอม)
- นัดหมายแพทย์
- แจ้งความออนไลน์
- ยื่นขออนุญาต
- แจ้งปัญหา
- ติดตามสถานะ
- รับการแจ้งเตือน
- ให้คะแนนบริการ
- ดู Audit Log การเข้าถึงข้อมูลตนเอง

---

## 🔐 ความปลอดภัยและความเป็นส่วนตัว

### หลักการสำคัญ

1. **Need-to-Know Basis**
   - เจ้าหน้าที่เห็นเฉพาะข้อมูลที่จำเป็นต่อการทำงาน
   - ข้อมูลแต่ละหน่วยงานถูกแยกออกจากกัน

2. **Consent Management (ความยินยอม)**
   - ประชาชนต้องอนุญาตก่อนแชร์ข้อมูล
   - แสดงชัดเจนว่าข้อมูลอะไรจะถูกส่งไปที่ไหน
   - สามารถเพิกถอนความยินยอมได้ตลอดเวลา

3. **Audit Trail**
   - บันทึกทุกการเข้าถึงข้อมูล (ใครเข้าถึงอะไรเมื่อไหร่)
   - ประชาชนดูประวัติการเข้าถึงข้อมูลตัวเองได้
   - Log ไม่สามารถแก้ไขหรือลบได้

4. **Data Encryption**
   - End-to-End Encryption สำหรับข้อมูลส่วนตัว
   - HTTPS/TLS 1.3 บังคับใช้
   - Database Encryption at Rest

5. **PDPA Compliance**
   - ปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล
   - สิทธิ์ในการลบข้อมูล (Right to be Forgotten)
   - Data Retention Policy (เก็บข้อมูลเท่าที่จำเป็น)

### ระบบขอข้อมูลข้ามหน่วยงาน

เมื่อหน่วยงานต้องการข้อมูลจากหน่วยงานอื่น:

```
1. เจ้าหน้าที่ยื่นคำขอผ่านระบบ
2. ระบุเหตุผลและแนบเอกสารอนุมัติ
3. ส่งคำขอไปยังหน่วยงานเจ้าของข้อมูล
4. หน่วยงานพิจารณาอนุมัติ/ปฏิเสธ
5. ถ้าอนุมัติ: ส่งข้อมูล (Encrypted) พร้อมกำหนดระยะเวลา
6. ระบบบันทึก Log และแจ้งเตือนประชาชนเจ้าของข้อมูล
```

---

## 🗺️ Site Map

### Portal ประชาชน (Citizen Portal)

```
Government Digital Platform
│
├── 🏠 หน้าหลัก (Home)
│   ├── แจ้งเตือนล่าสุด
│   ├── บริการยอดนิยม
│   ├── เอกสารใกล้หมดอายุ
│   └── สถานะคำขอล่าสุด
│
├── 👤 โปรไฟล์ (Profile)
│   ├── ข้อมูลส่วนตัว
│   ├── เปลี่ยนรหัสผ่าน
│   ├── ตั้งค่าการแจ้งเตือน
│   ├── ประวัติการใช้งาน
│   └── Log การเข้าถึงข้อมูล
│
├── 💳 กระเป๋าเอกสารดิจิทัล
│   ├── บัตรประชาชน
│   ├── ใบขับขี่
│   ├── บัตรประกันสังคม
│   └── ใบอนุญาตต่างๆ
│
├── 🔔 การแจ้งเตือน
│   ├── ทั้งหมด
│   ├── ยังไม่ได้อ่าน
│   ├── สำคัญ
│   └── ตั้งค่า
│
├── 🏥 บริการสาธารณสุข
│   ├── นัดหมายแพทย์
│   │   ├── นัดหมายใหม่
│   │   ├── นัดหมายของฉัน
│   │   └── ประวัติการนัด
│   ├── ตรวจสอบสิทธิ์
│   └── ประวัติการรักษา
│
├── 👮 บริการตำรวจ
│   ├── แจ้งความออนไลน์
│   │   ├── แจ้งความใหม่
│   │   ├── คำขอของฉัน
│   │   └── ติดตามสถานะ
│   └── ตรวจสอบใบสั่ง
│
├── 📄 ใบอนุญาต
│   ├── ยื่นขออนุญาตใหม่
│   │   ├── ก่อสร้าง/รื้อถอน
│   │   ├── ประกอบกิจการ
│   │   ├── ขายสุรา/บุหรี่
│   │   └── อื่นๆ
│   ├── คำขอของฉัน
│   ├── ติดตามสถานะ
│   └── ใบอนุญาตที่มีอยู่
│
├── 🚧 แจ้งปัญหา
│   ├── แจ้งปัญหาใหม่
│   ├── ปัญหาของฉัน
│   ├── ติดตามสถานะ
│   └── แผนที่ปัญหาในพื้นที่
│
├── 💰 การเงิน
│   ├── ชำระค่าบริการ
│   ├── ประวัติการชำระเงิน
│   └── ใบเสร็จ
│
├── ℹ️ ศูนย์ช่วยเหลือ
│   ├── คำถามที่พบบ่อย
│   ├── วิธีใช้งาน
│   ├── ติดต่อเจ้าหน้าที่
│   └── Chatbot
│
└── ⚙️ ตั้งค่า
    ├── ภาษา
    ├── แจ้งเตือน
    ├── ความปลอดภัย
    └── ลบบัญชี
```

### Portal เจ้าหน้าที่ (Officer Portal)

```
Officer Portal
│
├── 📊 Dashboard
│   ├── สถิติรวม
│   ├── คำขอที่รอดำเนินการ
│   ├── แจ้งเตือนสำคัญ
│   └── งานที่มอบหมายให้ฉัน
│
├── 📥 คำขอใหม่
│   ├── [แยกตามประเภทบริการ]
│   ├── กรองและค้นหา
│   └── มอบหมายงาน
│
├── 📋 คำขอทั้งหมด
│   ├── กรองตามสถานะ
│   ├── ค้นหา
│   └── Export ข้อมูล
│
├── 🔍 ขอข้อมูลข้ามหน่วยงาน
│   ├── ยื่นคำขอใหม่
│   ├── คำขอของฉัน
│   └── อนุมัติคำขอ (ถ้าเป็นเจ้าของข้อมูล)
│
├── 👥 จัดการประชาชน
│   └── ดูข้อมูล (ตามสิทธิ์)
│
├── 📊 รายงาน
│   ├── รายงานประจำวัน/เดือน
│   ├── สถิติการให้บริการ
│   └── Dashboard Analytics
│
└── ⚙️ ตั้งค่า
    ├── โปรไฟล์
    └── Notification
```

### Portal Admin

```
Admin Portal
│
├── 📊 Dashboard รวม
│   ├── ภาพรวมทุกหน่วยงาน
│   ├── Real-time Statistics
│   └── Alert & Warning
│
├── 👥 จัดการผู้ใช้
│   ├── Admin
│   ├── เจ้าหน้าที่ (แยกหน่วยงาน)
│   └── ประชาชน
│
├── 🏢 จัดการหน่วยงาน
│   ├── เพิ่ม/แก้ไข/ลบ
│   ├── กำหนดสิทธิ์
│   └── ตั้งค่า SLA
│
├── 🔐 จัดการสิทธิ์
│   ├── Role Management
│   └── Permission Matrix
│
├── 📊 Master Data
│   ├── ประเภทปัญหา
│   ├── ประเภทใบอนุญาต
│   ├── SLA Configuration
│   └── Notification Template
│
├── 🔍 Audit Log
│   ├── ค้นหาการเข้าถึง
│   ├── ดู Log ทั้งหมด
│   └── Export
│
├── 🔗 API Management
│   ├── Integration List
│   ├── API Keys
│   ├── Monitoring
│   └── Rate Limiting
│
├── 📢 Notification System
│   ├── ส่งประกาศ
│   ├── Template Management
│   └── Scheduled Messages
│
└── ⚙️ System Settings
    ├── ตั้งค่าทั่วไป
    ├── Backup & Restore
    ├── Maintenance Mode
    └── System Health
```

---

## 🔄 System Flows

### Flow 1: ระบบนัดหมายแพทย์

```
[ประชาชน]                    [ระบบ]                    [โรงพยาบาล]
    |                           |                           |
    |---(1) ค้นหา รพ.--------->|                           |
    |<--(2) แสดงรายการ---------|                           |
    |                           |                           |
    |---(3) เลือกแผนก+วันเวลา->|                           |
    |<--(4) แสดงช่วงว่าง-------|                           |
    |                           |                           |
    |---(5) ยืนยันนัด---------->|                           |
    |<--(6) ขอความยินยอม-------|                           |
    |                           |                           |
    |---(7) อนุญาตแชร์ข้อมูล--->|                           |
    |                           |---(8) ดึงข้อมูล---------->|
    |                           |    • บัตรประชาชน (DOPA)  |
    |                           |    • สิทธิ์การรักษา (NHSO)|
    |                           |    • ประวัติแพ้ยา         |
    |                           |<--(9) รับข้อมูล----------|
    |                           |                           |
    |                           |---(10) ส่งคำขอนัด------->|
    |                           |<--(11) ยืนยันนัด---------|
    |                           |                           |
    |<--(12) Confirmation+QR---|                           |
    |                           |                           |
    |==== วันนัดหมาย ====                                   |
    |                           |                           |
    |---(13) สแกน QR เช็คอิน--->|                           |
    |                           |---(14) ยืนยันเช็คอิน---->|
    |                           |                           |
    |                           |<--(15) บันทึกผลตรวจ-----|
    |<--(16) รับผลตรวจ---------|                           |
```

**Key Points:**
- ดึงข้อมูลอัตโนมัติจาก 3 แหล่ง: DOPA, NHSO/SSO, Hospital HIS
- ประชาชนต้องให้ความยินยอมก่อนแชร์ข้อมูล
- QR Code มีอายุ 24 ชม. สำหรับการเช็คอิน
- ข้อมูลเข้ารหัสตลอดการส่งผ่าน

---

### Flow 2: แจ้งความออนไลน์

```
[ประชาชน]              [AI Chatbot]           [ตำรวจ]            [ระบบภายนอก]
    |                       |                       |                     |
    |---(1) เริ่มแจ้งความ-->|                       |                     |
    |<--(2) ถามประเภท------|                       |                     |
    |                       |                       |                     |
    |---(3) ตอบ: หลอกลวง--->|                       |                     |
    |<--(4) ถามรายละเอียด--|                       |                     |
    |                       |                       |                     |
    |---(5) ตอบคำถาม------->|                       |                     |
    |    • เกิดเหตุเมื่อไหร่|                       |                     |
    |    • จำนวนเงิน        |                       |                     |
    |    • เลขบัญชีผู้รับ   |                       |                     |
    |    • อัปโหลดหลักฐาน   |                       |                     |
    |                       |                       |                     |
    |                       |---(6) ดึงข้อมูลผู้แจ้ง----------------->|
    |                       |<--(7) ข้อมูลจาก DOPA-----------------|
    |                       |                       |                     |
    |<--(8) สรุปสำนวน------|                       |                     |
    |    แสดงให้ตรวจสอบ    |                       |                     |
    |                       |                       |                     |
    |---(9) ยืนยัน---------->|                       |                     |
    |                       |---(10) ส่งเรื่อง----->|                     |
    |                       |                       |                     |
    |                       |<--(11) รับเรื่อง------|                     |
    |<--(12) เลขที่สำนวน---|<--(13) สร้าง Ticket--|                     |
    |                       |                       |                     |
    |                       |                       |---(14) มอบหมายงาน->|
    |                       |                       |     สืบสวน          |
    |                       |                       |                     |
    |<---------(15) แจ้งเตือนสถานะ-----------------|                     |
    |           • รับเรื่อง → สืบสวน → ดำเนินคดี   |                     |
    |                       |                       |                     |
    |                       |                       |---(16) สำนวนพร้อม->|
    |<---------(17) แจ้งปริ้นสำนวนได้--------------|                     |
```

**Key Features:**
- AI ถามตอบเพื่อรวบรวมข้อมูลครบถ้วน
- ดึงข้อมูลผู้แจ้งจาก DOPA อัตโนมัติ
- ระบบจับคู่สถานีตำรวจตามพื้นที่เกิดเหตุ
- สามารถปริ้นสำนวนเป็นทางการได้ทันที

---

### Flow 3: ยื่นขออนุญาต

```
[ผู้ขอ]                [ระบบ]              [เจ้าหน้าที่]         [ระบบภายนอก]
    |                      |                      |                      |
    |---(1) เลือกประเภท--->|                      |                      |
    |<--(2) แสดงฟอร์ม------|                      |                      |
    |    • เงื่อนไข        |                      |                      |
    |    • เอกสารที่ต้องใช้|                      |                      |
    |                      |                      |                      |
    |---(3) กรอกฟอร์ม----->|                      |                      |
    |                      |---(4) ดึงข้อมูล------------------------->|
    |                      |<--(5) ข้อมูลนิติบุคคล (DBD)-------------|
    |                      |<--(6) ข้อมูลที่ดิน (กรมที่ดิน)----------|
    |                      |                      |                      |
    |---(7) อัปโหลดเอกสาร->|                      |                      |
    |    • แบบแปลน         |                      |                      |
    |    • สำเนาโฉนด       |                      |                      |
    |    • อื่นๆ           |                      |                      |
    |                      |                      |                      |
    |---(8) ชำระเงิน------->|                      |                      |
    |<--(9) ยืนยันชำระ-----|                      |                      |
    |                      |                      |                      |
    |<--(10) เลขที่คำขอ----|---(11) แจ้งเตือน--->|                      |
    |                      |                      |                      |
    |                      |<--(12) ตรวจเอกสาร---|                      |
    |                      |                      |                      |
    |                      | ถ้าไม่ครบ            |                      |
    |<--(13) ขอเอกสารเพิ่ม-|<--(14) ปฏิเสธชั่วคราว|                     |
    |---(15) ส่งเพิ่ม------>|---(16) แจ้งเจ้าหน้าที่>|                     |
    |                      |                      |                      |
    |                      | ถ้าครบ               |                      |
    |                      |<--(17) นัดตรวจสถานที่|                      |
    |<--(18) แจ้งนัดตรวจ--|                      |                      |
    |                      |                      |                      |
    |                      |<--(19) บันทึกผลตรวจ-|                      |
    |                      |                      |                      |
    |                      |<--(20) อนุมัติ------|                      |
    |<--(21) ใบอนุญาตดิจิทัล|                     |                      |
    |    พร้อมใช้งาน       |                      |                      |
```

**Status Lifecycle:**
1. ส่งคำขอแล้ว (Submitted)
2. รอตรวจสอบ (Pending Review)
3. ต้องการเอกสารเพิ่มเติม (Documents Required)
4. กำลังตรวจสอบสถานที่ (Site Inspection)
5. อนุมัติ (Approved) / ไม่อนุมัติ (Rejected)

---

### Flow 4: ขอข้อมูลข้ามหน่วยงาน

```
[หน่วยงาน A]         [ระบบกลาง]          [หน่วงงาน B]        [ประชาชน]
  (ผู้ขอ)                                   (เจ้าของข้อมูล)
    |                      |                      |                   |
    |---(1) ขอข้อมูล------>|                      |                   |
    |    • ระบุเหตุผล      |                      |                   |
    |    • แนบเอกสารอนุมัติ|                      |                   |
    |                      |                      |                   |
    |                      |---(2) แจ้งเตือน---->|                   |
    |                      |                      |                   |
    |                      |<--(3) ตรวจสอบคำขอ--|                   |
    |                      |    • เหตุผล          |                   |
    |                      |    • เอกสาร          |                   |
    |                      |    • Legal basis     |                   |
    |                      |                      |                   |
    |                      |<--(4) อนุมัติ/ปฏิเสธ|                   |
    |                      |                      |                   |
    |                      | ถ้าอนุมัติ            |                   |
    |                      |<--(5) ส่งข้อมูล-----|                   |
    |                      |    (Encrypted)       |                   |
    |<--(6) รับข้อมูล------|                      |                   |
    |    (กำหนดอายุ 30 วัน)|                      |                   |
    |                      |                      |                   |
    |                      |---(7) บันทึก Log--------------------------->|
    |                      |    • ใครขอ                               |
    |                      |    • ขออะไร                              |
    |                      |    • จากหน่วยงานไหน                      |
    |                      |    • เมื่อไหร่                           |
    |                      |                      |                   |
    |                      |---(8) แจ้งเตือนประชาชน------------------>|
    |                      |    "ข้อมูลของคุณถูกเข้าถึง"             |
    |                      |                      |                   |
    |==== หมดอายุข้อมูล (30 วัน) ====                                |
    |                      |                      |                   |
    |                      |---(9) ลบข้อมูลอัตโนมัติ----------------->|
    |    ไม่สามารถเข้าถึงได้|                      |                   |
```

**Access Control Rules:**
- ต้องระบุเหตุผลที่ชัดเจน
- ต้องมีเอกสารอนุมัติจากผู้มีอำนาจ
- ข้อมูลมีอายุจำกัด (Time-bound access)
- บันทึก Log ทุกการเข้าถึง
- แจ้งเตือนเจ้าของข้อมูลทุกครั้ง

---

### Flow 5: แจ้งปัญหาและติดตาม

```
[ประชาชน]           [ระบบ]            [หน่วยงาน]         [ทีมงาน]
    |                   |                    |                  |
    |---(1) แจ้งปัญหา--->|                    |                  |
    |    • ประเภท        |                    |                  |
    |    • รูปถ่าย       |                    |                  |
    |    • ตำแหน่ง GPS   |                    |                  |
    |    • ความรุนแรง    |                    |                  |
    |                   |                    |                  |
    |                   |---(2) Auto-routing ตาม GPS--------->|
    |                   |                    |                  |
    |<--(3) Ticket No.--|                    |                  |
    |                   |                    |                  |
    |                   |                    |<--(4) รับเรื่อง--|
    |                   |                    |                  |
    |                   |                    |---(5) ประเมินและมอบหมาย->|
    |                   |                    |    กำหนด SLA    |
    |                   |                    |                  |
    |<--------(6) แจ้งเตือน: กำลังดำเนินการ------------------|
    |                   |                    |                  |
    |                   |                    |                  |<--(7) ออกสำรวจ
    |                   |                    |                  |
    |<--------(8) อัปเดต: พบปัญหา ใช้เวลาซ่อม X วัน----------|
    |                   |                    |                  |
    |                   |                    |                  |<--(9) แก้ไขเสร็จ
    |                   |                    |                  |    ถ่ายรูปหลังแก้
    |                   |                    |                  |
    |<--------(10) แจ้งเสร็จ พร้อมรูปก่อน-หลัง---------------|
    |                   |                    |                  |
    |---(11) ให้คะแนน--->|                    |                  |
    |    ⭐⭐⭐⭐⭐ + Comment|                   |                  |
    |                   |                    |                  |
    |                   |---(12) ส่ง Feedback---------------->|
    |                   |                    |<--(13) ปิดเรื่อง-|
```

**SLA (Service Level Agreement):**
- 🔴 **ฉุกเฉิน:** ตอบรับ 1 ชม., แก้ไข 24 ชม.
- 🟠 **สูง:** ตอบรับ 4 ชม., แก้ไข 3 วัน
- 🟡 **กลาง:** ตอบรับ 1 วัน, แก้ไข 7 วัน
- 🟢 **ต่ำ:** ตอบรับ 3 วัน, แก้ไข 30 วัน

---


## 🔧 Tech Stack

### Frontend
- **Web:** React.js + TypeScript, Next.js
- **Mobile:** 
  - Alternative: flutter (Cross-platform)
- **State Management:** Redux Toolkit / Zustand
- **UI Framework:** Tailwind CSS, Hero-UI
- **Maps:** Google Maps API / Mapbox

### Backend
- **API Framework:** Node.js + Express 
- **Language:** TypeScript
- **Authentication:** JWT + OAuth 2.0
- **Real-time:** WebSocket (Socket.io)

### Database
- **Primary DB:** PostgreSQL 14+ (ACID compliance)
- **Cache:** Redis (Session, API cache)
- **Search Engine:** Elasticsearch (ค้นหาเอกสาร)

### File Storage
- **Object Storage:** AWS S3 
- **CDN:** CloudFront / Cloudflare

### AI/ML
- **Chatbot:** Dialogflow / Rasa
- **NLP:** spaCy (Thai language)
- **OCR:** Google Cloud Vision API / Tesseract

### Payment
- **PromptPay:** Thai QR Payment Standard

---

## 📊 Database Schema (ตัวอย่างหลัก)

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id VARCHAR(13) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(10) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    role ENUM('citizen', 'officer', 'admin') DEFAULT 'citizen',
    agency_id UUID REFERENCES agencies(id), -- สำหรับ officer/admin
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE INDEX idx_users_citizen_id ON users(citizen_id);
CREATE INDEX idx_users_email ON users(email);
```

### Digital Wallet Table
```sql
CREATE TABLE digital_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    card_type ENUM('national_id', 'driving_license', 'social_security') NOT NULL,
    card_number VARCHAR(50) NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    issuer VARCHAR(100),
    digital_signature TEXT, -- Blockchain hash
    qr_code_data TEXT,
    metadata JSONB, -- ข้อมูลเพิ่มเติมตามประเภทบัตร
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_digital_cards_user_id ON digital_cards(user_id);
CREATE INDEX idx_digital_cards_expiry ON digital_cards(expiry_date);
```

### Hospital Appointments Table
```sql
CREATE TABLE hospital_appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    hospital_id UUID REFERENCES hospitals(id),
    department VARCHAR(100),
    doctor_name VARCHAR(100),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'checked_in', 'completed', 'cancelled') DEFAULT 'pending',
    qr_code TEXT,
    medical_history_shared BOOLEAN DEFAULT false,
    consent_given BOOLEAN DEFAULT false,
    consent_timestamp TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_appointments_user_id ON hospital_appointments(user_id);
CREATE INDEX idx_appointments_date ON hospital_appointments(appointment_date);
CREATE INDEX idx_appointments_hospital ON hospital_appointments(hospital_id);
```

### Police Reports Table
```sql
CREATE TABLE police_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    police_station_id UUID REFERENCES police_stations(id),
    report_type ENUM('theft', 'fraud', 'harassment', 'other') NOT NULL,
    incident_date TIMESTAMP NOT NULL,
    incident_location GEOGRAPHY(POINT), -- PostGIS
    description TEXT NOT NULL,
    ai_summary TEXT, -- สรุปจาก AI
    status ENUM('submitted', 'received', 'investigating', 'closed') DEFAULT 'submitted',
    assigned_officer_id UUID REFERENCES users(id),
    evidence_urls TEXT[], -- Array of file URLs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_user_id ON police_reports(user_id);
CREATE INDEX idx_reports_station ON police_reports(police_station_id);
CREATE INDEX idx_reports_status ON police_reports(status);
```

### License Applications Table
```sql
CREATE TABLE license_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    agency_id UUID REFERENCES agencies(id),
    license_type VARCHAR(100) NOT NULL,
    business_name VARCHAR(255),
    business_address TEXT,
    location GEOGRAPHY(POINT), -- PostGIS
    status ENUM('submitted', 'reviewing', 'documents_required', 'site_inspection', 'approved', 'rejected') DEFAULT 'submitted',
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    payment_amount DECIMAL(10,2),
    documents JSONB, -- Array of document metadata
    inspection_date DATE,
    inspection_notes TEXT,
    rejection_reason TEXT,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_applications_user_id ON license_applications(user_id);
CREATE INDEX idx_applications_status ON license_applications(status);
CREATE INDEX idx_applications_agency ON license_applications(agency_id);
```

### Problem Reports Table
```sql
CREATE TABLE problem_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    category ENUM('infrastructure', 'utilities', 'safety', 'environment', 'other') NOT NULL,
    subcategory VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location GEOGRAPHY(POINT) NOT NULL, -- PostGIS
    address TEXT,
    severity ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('submitted', 'assigned', 'in_progress', 'resolved', 'closed') DEFAULT 'submitted',
    agency_id UUID REFERENCES agencies(id),
    assigned_to UUID REFERENCES users(id),
    photos TEXT[], -- Array of photo URLs
    before_photos TEXT[],
    after_photos TEXT[],
    resolution_notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    sla_due_date TIMESTAMP,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_problem_reports_user_id ON problem_reports(user_id);
CREATE INDEX idx_problem_reports_status ON problem_reports(status);
CREATE INDEX idx_problem_reports_location ON problem_reports USING GIST(location);
```

### Audit Logs Table
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL, -- 'view', 'create', 'update', 'delete', 'share'
    resource_type VARCHAR(100) NOT NULL, -- 'appointment', 'report', 'application'
    resource_id UUID NOT NULL,
    target_user_id UUID REFERENCES users(id), -- เจ้าของข้อมูลที่ถูกเข้าถึง
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_target_user ON audit_logs(target_user_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

### Data Access Requests Table (สำหรับขอข้อมูลข้ามหน่วยงาน)
```sql
CREATE TABLE data_access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requesting_agency_id UUID REFERENCES agencies(id),
    requesting_officer_id UUID REFERENCES users(id),
    target_agency_id UUID REFERENCES agencies(id),
    data_subject_user_id UUID REFERENCES users(id), -- เจ้าของข้อมูล
    data_type VARCHAR(100) NOT NULL,
    purpose TEXT NOT NULL,
    legal_basis TEXT,
    supporting_documents TEXT[],
    status ENUM('pending', 'approved', 'rejected', 'expired') DEFAULT 'pending',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    access_granted_until TIMESTAMP, -- วันหมดอายุการเข้าถึง
    data_accessed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_data_requests_requesting ON data_access_requests(requesting_agency_id);
CREATE INDEX idx_data_requests_target ON data_access_requests(target_agency_id);
CREATE INDEX idx_data_requests_status ON data_access_requests(status);
```

---

## 🔐 API Endpoints (ตัวอย่าง)

### Authentication
```
POST   /api/v1/auth/register          - ลงทะเบียนผู้ใช้ใหม่
POST   /api/v1/auth/login             - เข้าสู่ระบบ
POST   /api/v1/auth/logout            - ออกจากระบบ
POST   /api/v1/auth/refresh-token     - ต่ออายุ Token
POST   /api/v1/auth/forgot-password   - ลืมรหัสผ่าน
POST   /api/v1/auth/verify-otp        - ยืนยัน OTP
```

### Digital Wallet
```
GET    /api/v1/wallet/cards           - ดูบัตรทั้งหมด
GET    /api/v1/wallet/cards/:id       - ดูบัตรเฉพาะ
GET    /api/v1/wallet/cards/:id/qr    - สร้าง QR Code
POST   /api/v1/wallet/cards/verify    - ยืนยันบัตร (สำหรับเจ้าหน้าที่)
```

### Hospital Appointments
```
GET    /api/v1/hospitals              - ค้นหาโรงพยาบาล
GET    /api/v1/hospitals/:id          - ข้อมูลโรงพยาบาล
GET    /api/v1/hospitals/:id/available-slots  - ช่วงเวลาว่าง
POST   /api/v1/appointments           - สร้างนัดหมาย
GET    /api/v1/appointments           - ดูนัดหมายของฉัน
GET    /api/v1/appointments/:id       - รายละเอียดนัดหมาย
PUT    /api/v1/appointments/:id       - แก้ไขนัดหมาย
DELETE /api/v1/appointments/:id       - ยกเลิกนัดหมาย
POST   /api/v1/appointments/:id/checkin - เช็คอิน
POST   /api/v1/appointments/:id/consent - ให้ความยินยอม
```

### Police Reports
```
POST   /api/v1/police/reports         - แจ้งความใหม่
GET    /api/v1/police/reports         - ดูรายการแจ้งความ
GET    /api/v1/police/reports/:id     - รายละเอียดเรื่องแจ้ง
PUT    /api/v1/police/reports/:id/status - อัปเดตสถานะ (เจ้าหน้าที่)
POST   /api/v1/police/reports/:id/evidence - อัปโหลดหลักฐาน
GET    /api/v1/police/chatbot         - AI Chatbot endpoint
```

### License Applications
```
GET    /api/v1/licenses/types         - ประเภทใบอนุญาต
POST   /api/v1/licenses/applications  - ยื่นขออนุญาต
GET    /api/v1/licenses/applications  - ดูคำขอของฉัน
GET    /api/v1/licenses/applications/:id - รายละเอียดคำขอ
PUT    /api/v1/licenses/applications/:id - แก้ไขคำขอ
POST   /api/v1/licenses/applications/:id/documents - อัปโหลดเอกสาร
POST   /api/v1/licenses/applications/:id/payment - ชำระเงิน
PUT    /api/v1/licenses/applications/:id/review - พิจารณาคำขอ (เจ้าหน้าที่)
```

### Problem Reports
```
POST   /api/v1/problems               - แจ้งปัญหา
GET    /api/v1/problems               - ดูปัญหาทั้งหมด
GET    /api/v1/problems/:id           - รายละเอียดปัญหา
PUT    /api/v1/problems/:id/status    - อัปเดตสถานะ
POST   /api/v1/problems/:id/photos    - อัปโหลดรูปภาพ
POST   /api/v1/problems/:id/rating    - ให้คะแนน
GET    /api/v1/problems/map           - ปัญหาบนแผนที่
```

### Notifications
```
GET    /api/v1/notifications          - ดูการแจ้งเตือนทั้งหมด
GET    /api/v1/notifications/unread   - ยังไม่ได้อ่าน
PUT    /api/v1/notifications/:id/read - ทำเครื่องหมายอ่านแล้ว
PUT    /api/v1/notifications/settings - ตั้งค่าการแจ้งเตือน
```

### Data Access Requests (ข้ามหน่วยงาน)
```
POST   /api/v1/data-access/request    - ขอข้อมูล
GET    /api/v1/data-access/requests   - ดูคำขอทั้งหมด
GET    /api/v1/data-access/requests/:id - รายละเอียดคำขอ
PUT    /api/v1/data-access/requests/:id/approve - อนุมัติ
PUT    /api/v1/data-access/requests/:id/reject  - ปฏิเสธ
```

### External API Integrations
```
POST   /api/v1/external/dopa/verify   - ตรวจสอบบัตรประชาชน (DOPA)
POST   /api/v1/external/dlt/license   - ข้อมูลใบขับขี่ (DLT)
POST   /api/v1/external/sso/rights    - สิทธิ์ประกันสังคม (SSO)
POST   /api/v1/external/nhso/rights   - สิทธิ์บัตรทอง (NHSO)
```

---

## 📈 Performance Requirements

### Response Time
- API Response: < 500ms (95th percentile)
- Page Load: < 3 seconds (First Contentful Paint)
- Database Query: < 100ms
- Search Results: < 1 second

### Throughput
- Concurrent Users: 100,000+
- Requests per Second: 10,000+
- Database Transactions: 50,000/second

### Availability
- Uptime: 99.9% (8.76 hours downtime/year)
- Recovery Time Objective (RTO): < 4 hours
- Recovery Point Objective (RPO): < 1 hour

---

## 🛡️ Security Requirements

### Authentication & Authorization
- Multi-Factor Authentication (2FA)
- JWT with short expiration (15 minutes)
- Refresh Token rotation
- Role-Based Access Control (RBAC)
- IP Whitelisting (สำหรับ Admin)

### Data Protection
- Encryption at Rest: AES-256
- Encryption in Transit: TLS 1.3
- Database Encryption: Transparent Data Encryption
- PII Data Masking in logs
- Secure Key Management (Vault)

### Application Security
- OWASP Top 10 compliance
- SQL Injection prevention
- XSS protection
- CSRF tokens
- Rate Limiting (100 requests/minute/user)
- Input validation & sanitization
- Regular Security Audits
- Penetration Testing (quarterly)

 





