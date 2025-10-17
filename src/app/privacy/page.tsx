'use client';

import Link from 'next/link';
import { ArrowLeftIcon, ShieldCheckIcon, EyeIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            กลับสู่หน้าหลัก
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">นโยบายความเป็นส่วนตัว</h1>
          <p className="text-xl text-gray-600">การคุ้มครองข้อมูลส่วนบุคคลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">ข้อมูลที่เรารวบรวม</h2>
                <p className="text-gray-600 leading-relaxed">
                  เราเก็บรวบรวมข้อมูลส่วนบุคคลของคุณเพื่อให้บริการที่เหมาะสมและปลอดภัย 
                  ข้อมูลที่เรารวบรวม ได้แก่:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• ข้อมูลส่วนตัว: ชื่อ-นามสกุล, หมายเลขบัตรประชาชน, วันเกิด</li>
                  <li>• ข้อมูลติดต่อ: อีเมล, เบอร์โทรศัพท์, ที่อยู่</li>
                  <li>• ข้อมูลการใช้งาน: ประวัติการเข้าใช้, กิจกรรมในระบบ</li>
                  <li>• ข้อมูลเทคนิค: IP Address, Browser, Device Information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Purpose */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <EyeIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">วัตถุประสงค์การใช้งาน</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  เราใช้ข้อมูลส่วนบุคคลของคุณเพื่อ:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• ให้บริการดิจิทัลภาครัฐตามที่ร้องขอ</li>
                  <li>• ยืนยันตัวตนและป้องกันการฉ้อโกง</li>
                  <li>• ปรับปรุงและพัฒนาบริการให้ดีขึ้น</li>
                  <li>• ตอบสนองต่อการร้องเรียนและข้อเสนอแนะ</li>
                  <li>• ปฏิบัติตามกฎหมายและระเบียบที่เกี่ยวข้อง</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <LockClosedIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">การรักษาความปลอดภัย</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  เรามีมาตรการรักษาความปลอดภัยข้อมูลที่เข้มงวด:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• การเข้ารหัสข้อมูล (Encryption) ขั้นสูง</li>
                  <li>• ระบบควบคุมการเข้าถึงข้อมูล (Access Control)</li>
                  <li>• การตรวจสอบและติดตามการใช้งาน (Audit Trail)</li>
                  <li>• การสำรองข้อมูลอย่างปลอดภัย (Secure Backup)</li>
                  <li>• การฝึกอบรมเจ้าหน้าที่ด้านความปลอดภัยข้อมูล</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rights */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">สิทธิ์ของคุณ</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล คุณมีสิทธิ์:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• ขอเข้าถึงข้อมูลส่วนบุคคลของตนเอง</li>
                  <li>• ขอแก้ไขข้อมูลที่ไม่ถูกต้อง</li>
                  <li>• ขอลบข้อมูลส่วนบุคคล</li>
                  <li>• ขอระงับการใช้ข้อมูล</li>
                  <li>• ขอคัดค้านการประมวลผลข้อมูล</li>
                  <li>• ขอข้อมูลเกี่ยวกับการประมวลผลข้อมูล</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="card bg-primary-50 border-primary-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ติดต่อเรา</h2>
            <p className="text-gray-600 mb-4">
              หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว หรือต้องการใช้สิทธิ์ตามกฎหมาย
            </p>
            <div className="space-y-2 text-gray-600">
              <p>📧 อีเมล: privacy@govdigital.go.th</p>
              <p>📞 โทร: 02-123-4567</p>
              <p>🏢 ที่อยู่: สำนักงานพัฒนารัฐบาลดิจิทัล กรุงเทพมหานคร</p>
            </div>
          </div>

          {/* Update */}
          <div className="card bg-gray-100">
            <p className="text-sm text-gray-600">
              <strong>วันที่อัปเดตล่าสุด:</strong> 1 มกราคม 2567<br/>
              <strong>เวอร์ชัน:</strong> 1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
