export interface User {
  id: string;
  thaiId: string;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'citizen' | 'officer' | 'admin';
  department?: string;
  position?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export const mockUsers: User[] = [
  // ประชาชน (Citizens)
  {
    id: 'user_001',
    thaiId: '1234567890123',
    email: 'john.doe@email.com',
    phone: '0812345678',
    password: 'password123',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    userType: 'citizen',
    isActive: true,
    createdAt: '2024-01-15T08:00:00Z',
    lastLogin: '2024-10-16T14:30:00Z'
  },
  {
    id: 'user_002',
    thaiId: '2345678901234',
    email: 'jane.smith@email.com',
    phone: '0823456789',
    password: 'password123',
    firstName: 'สมหญิง',
    lastName: 'รักดี',
    userType: 'citizen',
    isActive: true,
    createdAt: '2024-02-20T09:15:00Z',
    lastLogin: '2024-10-15T16:45:00Z'
  },
  {
    id: 'user_003',
    thaiId: '3456789012345',
    email: 'bob.wilson@email.com',
    phone: '0834567890',
    password: 'password123',
    firstName: 'วิชัย',
    lastName: 'สมบูรณ์',
    userType: 'citizen',
    isActive: true,
    createdAt: '2024-03-10T10:30:00Z',
    lastLogin: '2024-10-14T11:20:00Z'
  },

  // เจ้าหน้าที่ (Officers)
  {
    id: 'officer_001',
    thaiId: '4567890123456',
    email: 'officer1@gov.go.th',
    phone: '0845678901',
    password: 'officer123',
    firstName: 'นางสาว',
    lastName: 'รัฐบาล',
    userType: 'officer',
    department: 'กรมการปกครอง',
    position: 'เจ้าหน้าที่วิเคราะห์นโยบายและแผน',
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z',
    lastLogin: '2024-10-16T09:00:00Z'
  },
  {
    id: 'officer_002',
    thaiId: '5678901234567',
    email: 'officer2@gov.go.th',
    phone: '0856789012',
    password: 'officer123',
    firstName: 'นาย',
    lastName: 'บริการประชาชน',
    userType: 'officer',
    department: 'สำนักงานปลัดกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
    position: 'เจ้าหน้าที่พัฒนาระบบ',
    isActive: true,
    createdAt: '2024-01-05T08:30:00Z',
    lastLogin: '2024-10-16T10:15:00Z'
  },
  {
    id: 'officer_003',
    thaiId: '6789012345678',
    email: 'officer3@gov.go.th',
    phone: '0867890123',
    password: 'officer123',
    firstName: 'นาง',
    lastName: 'ดิจิทัลไทย',
    userType: 'officer',
    department: 'กรมส่งเสริมการปกครองท้องถิ่น',
    position: 'เจ้าหน้าที่เทคโนโลยีสารสนเทศ',
    isActive: true,
    createdAt: '2024-01-10T09:00:00Z',
    lastLogin: '2024-10-15T15:30:00Z'
  },

  // ผู้ดูแลระบบ (Admins)
  {
    id: 'admin_001',
    thaiId: '7890123456789',
    email: 'admin1@gov.go.th',
    phone: '0878901234',
    password: 'admin123',
    firstName: 'ดร.',
    lastName: 'ระบบดิจิทัล',
    userType: 'admin',
    department: 'สำนักงานปลัดกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
    position: 'ผู้อำนวยการกองเทคโนโลยีสารสนเทศ',
    isActive: true,
    createdAt: '2023-12-01T08:00:00Z',
    lastLogin: '2024-10-16T08:00:00Z'
  },
  {
    id: 'admin_002',
    thaiId: '8901234567890',
    email: 'admin2@gov.go.th',
    phone: '0889012345',
    password: 'admin123',
    firstName: 'ศ.ดร.',
    lastName: 'นวัตกรรมรัฐ',
    userType: 'admin',
    department: 'สำนักงานคณะกรรมการดิจิทัลเพื่อเศรษฐกิจและสังคมแห่งชาติ',
    position: 'ผู้อำนวยการสำนักนโยบายและยุทธศาสตร์',
    isActive: true,
    createdAt: '2023-11-15T08:00:00Z',
    lastLogin: '2024-10-16T07:30:00Z'
  },
  {
    id: 'admin_003',
    thaiId: '9012345678901',
    email: 'admin3@gov.go.th',
    phone: '0890123456',
    password: 'admin123',
    firstName: 'รศ.ดร.',
    lastName: 'ความปลอดภัยไซเบอร์',
    userType: 'admin',
    department: 'สำนักงานคณะกรรมการการรักษาความปลอดภัยไซเบอร์แห่งชาติ',
    position: 'ผู้อำนวยการกองความปลอดภัยไซเบอร์',
    isActive: true,
    createdAt: '2023-10-01T08:00:00Z',
    lastLogin: '2024-10-15T18:00:00Z'
  },

  // ข้อมูลเพิ่มเติมสำหรับการทดสอบ
  {
    id: 'user_004',
    thaiId: '0123456789012',
    email: 'test.citizen@email.com',
    phone: '0801234567',
    password: 'test123',
    firstName: 'ทดสอบ',
    lastName: 'ประชาชน',
    userType: 'citizen',
    isActive: true,
    createdAt: '2024-09-01T10:00:00Z',
    lastLogin: '2024-10-13T14:20:00Z'
  },
  {
    id: 'officer_004',
    thaiId: '1111111111111',
    email: 'test.officer@gov.go.th',
    phone: '0811111111',
    password: 'test123',
    firstName: 'ทดสอบ',
    lastName: 'เจ้าหน้าที่',
    userType: 'officer',
    department: 'กรมทดสอบระบบ',
    position: 'เจ้าหน้าที่ทดสอบ',
    isActive: true,
    createdAt: '2024-08-15T09:00:00Z',
    lastLogin: '2024-10-12T16:45:00Z'
  },
  {
    id: 'admin_004',
    thaiId: '2222222222222',
    email: 'test.admin@gov.go.th',
    phone: '0822222222',
    password: 'test123',
    firstName: 'ทดสอบ',
    lastName: 'ผู้ดูแลระบบ',
    userType: 'admin',
    department: 'สำนักงานทดสอบระบบ',
    position: 'ผู้ดูแลระบบทดสอบ',
    isActive: true,
    createdAt: '2024-07-01T08:00:00Z',
    lastLogin: '2024-10-11T12:30:00Z'
  }
];

// ฟังก์ชันค้นหาผู้ใช้
export const findUserByThaiId = (thaiId: string): User | undefined => {
  return mockUsers.find(user => user.thaiId === thaiId && user.isActive);
};

export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email && user.isActive);
};

export const findUserByPhone = (phone: string): User | undefined => {
  return mockUsers.find(user => user.phone === phone && user.isActive);
};

export const findUserByCredentials = (email: string, password: string): User | undefined => {
  return mockUsers.find(user => 
    (user.email === email || user.phone === email) && 
    user.password === password && 
    user.isActive
  );
};

// ฟังก์ชันสร้าง QR Code data สำหรับ Thai ID
export const generateThaiIdQRData = (thaiId: string): string => {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 15);
  return JSON.stringify({
    type: 'thai_id_login',
    thaiId: thaiId,
    timestamp: timestamp,
    sessionId: randomId,
    app: 'government_digital_platform'
  });
};
