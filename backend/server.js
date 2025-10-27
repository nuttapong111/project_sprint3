const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/digital-documents', require('./routes/digitalDocuments'));
app.use('/api/notifications', require('./routes/notifications'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Government Digital Platform API is running',
    timestamp: new Date().toISOString()
  });
});

// Initialize database
async function initializeDatabase() {
  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection established');

    // Create tables if they don't exist
    const fs = require('fs');
    const path = require('path');
    const schemaPath = path.join(__dirname, 'config', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }
    
    console.log('✅ Database tables created/verified');
    
    // Insert sample data if tables are empty
    await insertSampleData();
    
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }
}

// Insert sample data
async function insertSampleData() {
  try {
    // Check if users table is empty
    const userCount = await pool.query('SELECT COUNT(*) as count FROM users');
    
    if (parseInt(userCount.rows[0].count) === 0) {
      console.log('📝 Inserting sample data...');
      
      // Insert sample users
      const bcrypt = require('bcryptjs');
      const sampleUsers = [
        {
          username: 'john_doe',
          email: 'john.doe@email.com',
          password: 'password123',
          full_name: 'สมชาย ใจดี',
          role: 'citizen',
          status: 'active',
          phone: '0812345678',
          address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
          id_card: '1234567890123'
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
          id_card: '9876543210987'
        },
        {
          username: 'officer_001',
          email: 'officer1@gov.th',
          password: 'password123',
          full_name: 'นพ. สมศักดิ์ ใจกล้า',
          role: 'officer',
          status: 'active',
          phone: '0834567890',
          address: '789 ถนนลาดพร้าว กรุงเทพฯ 10230',
          id_card: '5555555555555',
          department: 'สำนักงานเขตบางรัก',
          position: 'เจ้าหน้าที่ตรวจสอบเอกสาร'
        },
        {
          username: 'admin_001',
          email: 'admin@gov.th',
          password: 'password123',
          full_name: 'ดร. ระบบดิจิทัล',
          role: 'admin',
          status: 'active',
          phone: '0856789012',
          address: '999 ถนนราชดำเนิน กรุงเทพฯ 10200',
          id_card: '9999999999999',
          department: 'สำนักงานรัฐบาลดิจิทัล',
          position: 'ผู้ดูแลระบบ'
        }
      ];

      for (const user of sampleUsers) {
        const passwordHash = await bcrypt.hash(user.password, 10);
        await pool.query(
          `INSERT INTO users (username, email, password_hash, full_name, role, status, phone, address, id_card, department, position)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [user.username, user.email, passwordHash, user.full_name, user.role, user.status, user.phone, user.address, user.id_card, user.department, user.position]
        );
      }

      // Insert sample daily reports
      const sampleReports = [
        {
          user_id: 1,
          report_type: 'การลักทรัพย์',
          user_answers: JSON.stringify({
            'เกิดอะไรขึ้น': 'มีคนขโมยกระเป๋าเงิน',
            'เมื่อไหร่': 'เมื่อวานตอน 2 ทุ่ม',
            'ที่ไหน': 'หน้าห้างสรรพสินค้า'
          }),
          personal_info: JSON.stringify({
            name: 'สมชาย ใจดี',
            idCard: '1234567890123',
            address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
            phone: '0812345678',
            email: 'john.doe@email.com'
          }),
          status: 'approved'
        },
        {
          user_id: 2,
          report_type: 'การทุจริต',
          user_answers: JSON.stringify({
            'เกิดอะไรขึ้น': 'เจ้าหน้าที่เรียกเก็บเงินใต้โต๊ะ',
            'เมื่อไหร่': 'เมื่อวาน',
            'ที่ไหน': 'ที่ทำการเขต'
          }),
          personal_info: JSON.stringify({
            name: 'สมหญิง รักดี',
            idCard: '9876543210987',
            address: '456 ถนนราชดำริ กรุงเทพฯ 10330',
            phone: '0823456789',
            email: 'jane.smith@email.com'
          }),
          status: 'pending'
        }
      ];

      for (const report of sampleReports) {
        await pool.query(
          `INSERT INTO daily_reports (user_id, report_type, user_answers, personal_info, status, submitted_at)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [report.user_id, report.report_type, report.user_answers, report.personal_info, report.status, new Date()]
        );
      }

      // Insert sample document submissions
      const sampleSubmissions = [
        {
          user_id: 1,
          document_type: 'building_permit',
          document_type_name: 'ใบอนุญาตก่อสร้าง',
          files: JSON.stringify({
            'แบบแปลนอาคาร (PDF)': {
              id: 'file_001',
              name: 'building_plan.pdf',
              type: 'application/pdf',
              size: 2048000,
              uploadedAt: new Date().toISOString()
            }
          }),
          personal_info: JSON.stringify({
            name: 'สมชาย ใจดี',
            idCard: '1234567890123',
            address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
            phone: '0812345678',
            email: 'john.doe@email.com'
          }),
          status: 'approved',
          progress: 100
        }
      ];

      for (const submission of sampleSubmissions) {
        await pool.query(
          `INSERT INTO document_submissions (user_id, document_type, document_type_name, files, personal_info, status, progress, submitted_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [submission.user_id, submission.document_type, submission.document_type_name, submission.files, submission.personal_info, submission.status, submission.progress, new Date()]
        );
      }

      console.log('✅ Sample data inserted successfully');
    } else {
      console.log('📊 Database already contains data, skipping sample data insertion');
    }
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

