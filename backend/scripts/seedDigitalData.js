const { Pool } = require('pg');
require('dotenv').config({ path: './config.env' });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'government_digital_platform',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function seedDigitalData() {
  try {
    console.log('Starting digital data seeding...');

    // Get user ID
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', ['john.doe@email.com']);
    if (userResult.rows.length === 0) {
      console.log('❌ User not found. Please run seed.js first.');
      await pool.end();
      return;
    }
    const userId = userResult.rows[0].id;

    // Check if data already exists
    const existingDocs = await pool.query('SELECT COUNT(*) as count FROM digital_documents WHERE user_id = $1', [userId]);
    const existingNotifs = await pool.query('SELECT COUNT(*) as count FROM notifications WHERE user_id = $1', [userId]);

    if (parseInt(existingDocs.rows[0].count) > 0 || parseInt(existingNotifs.rows[0].count) > 0) {
      console.log('📊 Digital data already exists, skipping...');
      await pool.end();
      return;
    }

    // Insert digital documents
    console.log('📄 Inserting digital documents...');
    const documents = [
      {
        user_id: userId,
        document_type: 'id_card',
        document_name: 'บัตรประชาชน',
        document_number: '1234567890123',
        issue_date: '2020-01-01',
        expiry_date: '2030-01-01',
        status: 'active',
        issued_by: 'สำนักงานเขตวัฒนา'
      },
      {
        user_id: userId,
        document_type: 'driving_license',
        document_name: 'ใบขับขี่',
        document_number: '1234567890',
        issue_date: '2022-06-15',
        expiry_date: '2027-06-15',
        status: 'active',
        issued_by: 'กรมการขนส่งทางบก'
      },
      {
        user_id: userId,
        document_type: 'passport',
        document_name: 'หนังสือเดินทาง',
        document_number: 'A1234567',
        issue_date: '2023-03-10',
        expiry_date: '2033-03-10',
        status: 'active',
        issued_by: 'กรมการกงสุล'
      },
      {
        user_id: userId,
        document_type: 'birth_certificate',
        document_name: 'สูติบัตร',
        document_number: 'BC123456789',
        issue_date: '1990-05-20',
        expiry_date: null, // Birth certificate doesn't expire
        status: 'active',
        issued_by: 'สำนักงานปกครองท้องถิ่น'
      }
    ];

    for (const doc of documents) {
      await pool.query(
        `INSERT INTO digital_documents (user_id, document_type, document_name, document_number, issue_date, expiry_date, status, issued_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [doc.user_id, doc.document_type, doc.document_name, doc.document_number, doc.issue_date, doc.expiry_date, doc.status, doc.issued_by]
      );
      console.log(`  ✓ Inserted: ${doc.document_name}`);
    }

    // Insert notifications
    console.log('📬 Inserting notifications...');
    const notifications = [
      {
        user_id: userId,
        title: 'บัตรประชาชนใกล้หมดอายุ',
        message: 'บัตรประชาชนของคุณจะหมดอายุในอีก 30 วัน กรุณาเตรียมเอกสารเพื่อต่ออายุ',
        type: 'warning'
      },
      {
        user_id: userId,
        title: 'นัดหมายแพทย์ยืนยันแล้ว',
        message: 'การนัดหมายแพทย์ที่โรงพยาบาลจุฬาลงกรณ์ ในวันที่ 20 มกราคม 2567 เวลา 09:00 น. ได้รับการยืนยันแล้ว',
        type: 'success',
        is_read: true
      },
      {
        user_id: userId,
        title: 'ใบอนุญาตก่อสร้างอนุมัติแล้ว',
        message: 'ใบอนุญาตก่อสร้างบ้านเลขที่ 123/45 ถนนสุขุมวิท ได้รับการอนุมัติแล้ว สามารถดาวน์โหลดได้',
        type: 'success',
        is_read: false
      },
      {
        user_id: userId,
        title: 'เอกสารอนุมัติแล้ว',
        message: 'คำขอใบอนุญาตก่อสร้างของคุณได้รับการอนุมัติเรียบร้อย',
        type: 'success'
      },
      {
        user_id: userId,
        title: 'เอกสารใกล้หมดอายุ',
        message: 'บัตรประชาชนดิจิทัลของคุณจะหมดอายุใน 30 วัน',
        type: 'warning',
        is_read: false
      },
      {
        user_id: userId,
        title: 'อัปเดตระบบ',
        message: 'มีการอัปเดตแพลตฟอร์มเพื่อเพิ่มประสิทธิภาพการใช้งาน',
        type: 'info',
        is_read: true
      },
      {
        user_id: userId,
        title: 'การนัดหมายแพทย์',
        message: 'คุณมีการนัดหมายแพทย์ที่โรงพยาบาลศิริราชในวันพรุ่งนี้',
        type: 'info',
        is_read: true
      }
    ];

    for (const notif of notifications) {
      await pool.query(
        `INSERT INTO notifications (user_id, title, message, type, is_read)
         VALUES ($1, $2, $3, $4, $5)`,
        [notif.user_id, notif.title, notif.message, notif.type, notif.is_read || false]
      );
      console.log(`  ✓ Inserted: ${notif.title}`);
    }

    console.log('\n✅ Digital data seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding digital data:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the seeding function
seedDigitalData();

