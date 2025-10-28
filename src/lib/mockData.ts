// Mock data สำหรับแสดงผลในหน้าหลัก

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  features: string[];
  status: 'available' | 'coming-soon' | 'beta';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface DigitalCard {
  id: string;
  type: 'national_id' | 'driving_license' | 'social_security';
  title: string;
  number: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  icon: string;
  color: string;
}

export const features: Feature[] = [
  {
    id: 'digital-wallet',
    title: 'กระเป๋าเอกสารดิจิทัล',
    description: 'เก็บเอกสารสำคัญไว้ในมือถือ พร้อม QR Code ยืนยันตัวตน',
    icon: '💳',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    features: [
      'บัตรประชาชนดิจิทัล',
      'ใบขับขี่ดิจิทัล',
      'บัตรประกันสังคม',
      'QR Code ยืนยันตัวตน'
    ],
    status: 'available'
  },
  {
    id: 'smart-notifications',
    title: 'ระบบแจ้งเตือนอัจฉริยะ',
    description: 'แจ้งเตือนเอกสารใกล้หมดอายุ และอัปเดตสถานะแบบเรียลไทม์',
    icon: '🔔',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    features: [
      'แจ้งเตือนเอกสารใกล้หมดอายุ',
      'อัปเดตสถานะคำขอแบบเรียลไทม์',
      'แจ้งนัดหมายและกิจกรรมสำคัญ',
      'ข่าวสารจากหน่วยงานรัฐ'
    ],
    status: 'available'
  },
  {
    id: 'hospital-appointment',
    title: 'ระบบนัดหมายแพทย์',
    description: 'นัดหมายแพทย์ออนไลน์ ดึงข้อมูลอัตโนมัติ ไม่ต้องกรอกซ้ำ',
    icon: '🏥',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    features: [
      'ค้นหาและเลือกโรงพยาบาล',
      'เลือกแผนกและแพทย์',
      'ดึงข้อมูลอัตโนมัติ',
      'รับ QR Code เช็คอิน'
    ],
    status: 'available'
  },
  {
    id: 'online-police-report',
    title: 'แจ้งความออนไลน์',
    description: 'แจ้งความผ่าน AI Chatbot รวบรวมข้อมูลครบถ้วน ปริ้นสำนวนได้เลย',
    icon: '👮',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    features: [
      'AI Chatbot ช่วยถามตอบ',
      'ดึงข้อมูลผู้แจ้งอัตโนมัติ',
      'อัปโหลดหลักฐาน',
      'ปริ้นสำนวนได้เลย'
    ],
    status: 'available'
  },
  {
    id: 'online-licenses',
    title: 'ยื่นขออนุญาตออนไลน์',
    description: 'ยื่นขอใบอนุญาตต่างๆ ออนไลน์ ส่งข้อมูลตรงถึงหน่วยงาน',
    icon: '📄',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    features: [
      'ใบอนุญาตก่อสร้าง/รื้อถอน',
      'ใบอนุญาตประกอบกิจการ',
      'ใบอนุญาตขายสุรา/บุหรี่',
      'ติดตามสถานะออนไลน์'
    ],
    status: 'available'
  },
  {
    id: 'problem-reporting',
    title: 'แจ้งปัญหาและติดตาม',
    description: 'แจ้งปัญหาโครงสร้างพื้นฐาน ถ่ายรูป ปักหมุดแผนที่ ติดตามความคืบหน้า',
    icon: '🚧',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    features: [
      'แจ้งปัญหาโครงสร้างพื้นฐาน',
      'ถ่ายรูป + ปักหมุดแผนที่',
      'ระบบส่งตรงหน่วยงานที่รับผิดชอบ',
      'ให้คะแนนหลังแก้ไข'
    ],
    status: 'available'
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'บัตรประชาชนใกล้หมดอายุ',
    message: 'บัตรประชาชนของคุณจะหมดอายุในอีก 30 วัน กรุณาเตรียมเอกสารเพื่อต่ออายุ',
    type: 'warning',
    isRead: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'นัดหมายแพทย์ยืนยันแล้ว',
    message: 'การนัดหมายแพทย์ที่โรงพยาบาลจุฬาลงกรณ์ ในวันที่ 20 มกราคม 2567 เวลา 09:00 น. ได้รับการยืนยันแล้ว',
    type: 'success',
    isRead: true,
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    title: 'ใบอนุญาตก่อสร้างอนุมัติแล้ว',
    message: 'ใบอนุญาตก่อสร้างบ้านเลขที่ 123/45 ถนนสุขุมวิท ได้รับการอนุมัติแล้ว สามารถดาวน์โหลดได้',
    type: 'success',
    isRead: false,
    createdAt: '2024-01-13T16:45:00Z'
  }
];

export const digitalCards: DigitalCard[] = [
  {
    id: '1',
    type: 'national_id',
    title: 'บัตรประชาชน',
    number: '1234567890123',
    expiryDate: '2025-12-31',
    status: 'valid',
    icon: '🆔',
    color: 'text-blue-600'
  },
  {
    id: '2',
    type: 'driving_license',
    title: 'ใบขับขี่',
    number: '1234567890',
    expiryDate: '2024-06-15',
    status: 'expiring',
    icon: '🚗',
    color: 'text-green-600'
  },
  {
    id: '3',
    type: 'social_security',
    title: 'บัตรประกันสังคม',
    number: '1234567890123',
    expiryDate: '2025-03-20',
    status: 'valid',
    icon: '🏥',
    color: 'text-purple-600'
  }
];

export const stats = {
  totalUsers: '2,500,000+',
  totalServices: '50+',
  averageResponseTime: '< 2 วินาที',
  satisfactionRate: '95%'
};
