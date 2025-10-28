const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './config.env' });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'government_digital_platform',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

const mockUsers = [
  // ประชาชน (Citizens)
  {
    username: 'john_doe',
    email: 'john.doe@email.com',
    password: 'password123',
    full_name: 'สมชาย ใจดี',
    role: 'citizen',
    status: 'active',
    phone: '0812345678',
    address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
    id_card: '1234567890123',
    birth_date: '1990-01-15',
    gender: 'ชาย'
  },
  {
    username: 'jane_smith',
    email: 'jane.smith@email.com',
    password: 'password123',
    full_name: 'สมหญิง รักดี',
    role: 'citizen',
    status: 'active',
    phone: '0823456789',
    address: '456 ถนนราชดำริ กรุงเทพฯ 10330',
    id_card: '2345678901234',
    birth_date: '1992-03-20',
    gender: 'หญิง'
  },
  {
    username: 'bob_wilson',
    email: 'bob.wilson@email.com',
    password: 'password123',
    full_name: 'วิชัย สมบูรณ์',
    role: 'citizen',
    status: 'active',
    phone: '0834567890',
    address: '789 ถนนสุขุมวิท กรุงเทพฯ 10110',
    id_card: '3456789012345',
    birth_date: '1988-05-10',
    gender: 'ชาย'
  },
  // เจ้าหน้าที่ (Officers)
  {
    username: 'officer1',
    email: 'officer1@gov.go.th',
    password: 'officer123',
    full_name: 'นางสาว รัฐบาล',
    role: 'officer',
    status: 'active',
    phone: '0845678901',
    address: '789 ถนนราชดำเนิน กรุงเทพฯ 10200',
    id_card: '4567890123456',
    birth_date: '1985-08-15',
    gender: 'หญิง',
    department: 'กรมการปกครอง',
    position: 'เจ้าหน้าที่วิเคราะห์นโยบายและแผน'
  },
  {
    username: 'officer2',
    email: 'officer2@gov.go.th',
    password: 'officer123',
    full_name: 'นาย บริการประชาชน',
    role: 'officer',
    status: 'active',
    phone: '0856789012',
    address: '123 ถนนลาดพร้าว กรุงเทพฯ 10230',
    id_card: '5678901234567',
    birth_date: '1983-10-20',
    gender: 'ชาย',
    department: 'สำนักงานปลัดกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
    position: 'เจ้าหน้าที่พัฒนาระบบ'
  },
  {
    username: 'officer3',
    email: 'officer3@gov.go.th',
    password: 'officer123',
    full_name: 'นาง ดิจิทัลไทย',
    role: 'officer',
    status: 'active',
    phone: '0867890123',
    address: '456 ถนนบางนา กรุงเทพฯ 10260',
    id_card: '6789012345678',
    birth_date: '1987-12-10',
    gender: 'หญิง',
    department: 'กรมส่งเสริมการปกครองท้องถิ่น',
    position: 'เจ้าหน้าที่เทคโนโลยีสารสนเทศ'
  },
  // ผู้ดูแลระบบ (Admins)
  {
    username: 'admin1',
    email: 'admin1@gov.go.th',
    password: 'admin123',
    full_name: 'ดร. ระบบดิจิทัล',
    role: 'admin',
    status: 'active',
    phone: '0878901234',
    address: '789 ถนนแจ้งวัฒนะ กรุงเทพฯ 10220',
    id_card: '7890123456789',
    birth_date: '1975-06-01',
    gender: 'ชาย',
    department: 'สำนักงานปลัดกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม',
    position: 'ผู้อำนวยการกองเทคโนโลยีสารสนเทศ'
  },
  {
    username: 'admin2',
    email: 'admin2@gov.go.th',
    password: 'admin123',
    full_name: 'ศ.ดร. นวัตกรรมรัฐ',
    role: 'admin',
    status: 'active',
    phone: '0889012345',
    address: '123 ถนนพหลโยธิน กรุงเทพฯ 10400',
    id_card: '8901234567890',
    birth_date: '1970-03-15',
    gender: 'ชาย',
    department: 'สำนักงานคณะกรรมการดิจิทัลเพื่อเศรษฐกิจและสังคมแห่งชาติ',
    position: 'ผู้อำนวยการสำนักนโยบายและยุทธศาสตร์'
  },
  {
    username: 'admin3',
    email: 'admin3@gov.go.th',
    password: 'admin123',
    full_name: 'รศ.ดร. ความปลอดภัยไซเบอร์',
    role: 'admin',
    status: 'active',
    phone: '0890123456',
    address: '456 ถนนวิภาวดี กรุงเทพฯ 10400',
    id_card: '9012345678901',
    birth_date: '1978-09-10',
    gender: 'ชาย',
    department: 'สำนักงานคณะกรรมการการรักษาความปลอดภัยไซเบอร์แห่งชาติ',
    position: 'ผู้อำนวยการกองความปลอดภัยไซเบอร์'
  }
];

async function seedUsers() {
  try {
    console.log('Starting user seeding...');

    for (const user of mockUsers) {
      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $2',
        [user.username, user.email]
      );

      if (existingUser.rows.length > 0) {
        console.log(`User ${user.username} already exists, skipping...`);
        continue;
      }

      // Hash password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(user.password, saltRounds);

      // Insert user
      await pool.query(
        `INSERT INTO users (username, email, password_hash, full_name, role, status, phone, address, id_card, birth_date, gender, department, position)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          user.username,
          user.email,
          passwordHash,
          user.full_name,
          user.role,
          user.status,
          user.phone,
          user.address,
          user.id_card,
          user.birth_date,
          user.gender,
          user.department || null,
          user.position || null
        ]
      );

      console.log(`✓ Inserted user: ${user.username} (${user.role})`);
    }

    console.log('\n✓ User seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the seeding function
seedUsers();

