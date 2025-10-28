'use client';

import Link from 'next/link';
import { ArrowLeftIcon, QuestionMarkCircleIcon, PhoneIcon, EnvelopeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            กลับสู่หน้าหลัก
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ศูนย์ช่วยเหลือ</h1>
          <p className="text-xl text-gray-600">รวบรวมข้อมูลที่คุณต้องการเพื่อเริ่มต้นและแก้ปัญหาได้รวดเร็ว</p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/faq" className="card hover:shadow-lg transition-shadow duration-300 group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">คำถามที่พบบ่อย</h3>
                <p className="text-sm text-gray-600">FAQ</p>
              </div>
            </div>
          </Link>

          <Link href="/contact" className="card hover:shadow-lg transition-shadow duration-300 group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <PhoneIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">ติดต่อเจ้าหน้าที่</h3>
                <p className="text-sm text-gray-600">Contact</p>
              </div>
            </div>
          </Link>

          <Link href="/report" className="card hover:shadow-lg transition-shadow duration-300 group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">รายงานปัญหา</h3>
                <p className="text-sm text-gray-600">Report</p>
              </div>
            </div>
          </Link>

          <div className="card hover:shadow-lg transition-shadow duration-300 group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <EnvelopeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">อีเมลสนับสนุน</h3>
                <p className="text-sm text-gray-600">support@govdigital.go.th</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Getting Started */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">เริ่มต้นใช้งาน</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4">
                <h3 className="font-semibold text-gray-900">1. สมัครสมาชิก</h3>
                <p className="text-gray-600">กดปุ่ม "สมัครสมาชิก" บนมุมขวาบน และกรอกข้อมูลตามขั้นตอน</p>
              </div>
              <div className="border-l-4 border-secondary-500 pl-4">
                <h3 className="font-semibold text-gray-900">2. ยืนยันตัวตน</h3>
                <p className="text-gray-600">ใช้ Thai ID หรืออีเมล/เบอร์โทรศัพท์เพื่อยืนยันตัวตน</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">3. เริ่มใช้งาน</h3>
                <p className="text-gray-600">เข้าถึงบริการต่างๆ ผ่านเมนูหลัก</p>
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ปัญหาที่พบบ่อย</h2>
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="cursor-pointer font-medium text-gray-900 hover:text-primary-600">ลืมรหัสผ่านทำอย่างไร?</summary>
                <p className="text-gray-600 mt-2">กด "ลืมรหัสผ่าน" ที่หน้าเข้าสู่ระบบ แล้วทำตามขั้นตอนเพื่อรีเซ็ต</p>
              </details>
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="cursor-pointer font-medium text-gray-900 hover:text-primary-600">ไม่สามารถเข้าสู่ระบบได้</summary>
                <p className="text-gray-600 mt-2">ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต และลองใช้เบราว์เซอร์อื่น</p>
              </details>
              <details className="bg-gray-50 rounded-lg p-4">
                <summary className="cursor-pointer font-medium text-gray-900 hover:text-primary-600">เอกสารไม่แสดงผล</summary>
                <p className="text-gray-600 mt-2">ลองรีเฟรชหน้าเว็บ หรือล้างแคชเบราว์เซอร์</p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


