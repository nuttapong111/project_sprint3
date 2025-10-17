'use client';

import Link from 'next/link';
import { ArrowLeftIcon, DocumentTextIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            กลับสู่หน้าหลัก
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">เงื่อนไขการใช้งาน</h1>
          <p className="text-xl text-gray-600">ข้อกำหนดและเงื่อนไขในการใช้บริการแพลตฟอร์มดิจิทัลภาครัฐ</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Acceptance */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">การยอมรับเงื่อนไข</h2>
                <p className="text-gray-600 leading-relaxed">
                  การเข้าใช้งานแพลตฟอร์มดิจิทัลภาครัฐนี้ถือว่าคุณได้อ่าน ทำความเข้าใจ และยอมรับเงื่อนไขการใช้งานทั้งหมดแล้ว 
                  หากคุณไม่ยอมรับเงื่อนไขใดๆ กรุณาหยุดการใช้งานทันที
                </p>
              </div>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">ความรับผิดชอบของผู้ใช้</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  ผู้ใช้บริการมีหน้าที่และความรับผิดชอบดังนี้:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• ให้ข้อมูลที่ถูกต้อง ครบถ้วน และเป็นปัจจุบัน</li>
                  <li>• รักษาความลับของรหัสผ่านและข้อมูลการเข้าสู่ระบบ</li>
                  <li>• ใช้บริการตามวัตถุประสงค์ที่กำหนดไว้เท่านั้น</li>
                  <li>• ไม่กระทำการใดๆ ที่อาจก่อให้เกิดความเสียหายต่อระบบ</li>
                  <li>• ปฏิบัติตามกฎหมายและระเบียบที่เกี่ยวข้อง</li>
                  <li>• แจ้งเจ้าหน้าที่ทันทีหากพบการใช้งานที่ไม่เหมาะสม</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">กิจกรรมที่ห้าม</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  ห้ามมิให้ผู้ใช้กระทำการดังต่อไปนี้:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• ใช้ข้อมูลปลอมหรือของผู้อื่นในการสมัครสมาชิก</li>
                  <li>• พยายามเข้าถึงระบบโดยไม่ได้รับอนุญาต</li>
                  <li>• ส่งข้อมูลที่เป็นอันตรายหรือไวรัส</li>
                  <li>• ใช้ระบบเพื่อกิจกรรมที่ผิดกฎหมาย</li>
                  <li>• ลบหรือแก้ไขข้อมูลของผู้อื่นโดยไม่ได้รับอนุญาต</li>
                  <li>• ใช้ระบบเพื่อการค้าหรือประโยชน์ส่วนตัว</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Availability */}
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">การให้บริการ</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  เราให้บริการตามความสามารถและทรัพยากรที่มี โดย:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• อาจมีการหยุดให้บริการเพื่อการบำรุงรักษา</li>
                  <li>• ไม่รับประกันความต่อเนื่องของการให้บริการ 100%</li>
                  <li>• อาจปรับปรุงหรือเปลี่ยนแปลงระบบได้ตามความเหมาะสม</li>
                  <li>• ไม่อาจรับผิดชอบต่อความเสียหายที่เกิดจากการใช้งาน</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ทรัพย์สินทางปัญญา</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              เนื้อหา ข้อมูล และซอฟต์แวร์ทั้งหมดในระบบนี้เป็นทรัพย์สินของรัฐบาลไทย 
              ผู้ใช้ไม่มีสิทธิ์ในการคัดลอก แจกจ่าย หรือใช้เพื่อการค้าโดยไม่ได้รับอนุญาต
            </p>
          </div>

          {/* Privacy */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ความเป็นส่วนตัว</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              การเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลเป็นไปตามนโยบายความเป็นส่วนตัว 
              ซึ่งเป็นส่วนหนึ่งของเงื่อนไขการใช้งานนี้
            </p>
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
              อ่านนโยบายความเป็นส่วนตัว →
            </Link>
          </div>

          {/* Termination */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">การยกเลิกบัญชี</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีผู้ใช้ได้ทันที หากพบการละเมิดเงื่อนไขการใช้งาน 
              หรือการกระทำที่อาจก่อให้เกิดความเสียหายต่อระบบ
            </p>
          </div>

          {/* Changes */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">การเปลี่ยนแปลงเงื่อนไข</h2>
            <p className="text-gray-600 leading-relaxed">
              เราขอสงวนสิทธิ์ในการแก้ไข เปลี่ยนแปลง หรือเพิ่มเติมเงื่อนไขการใช้งานได้ตลอดเวลา 
              การเปลี่ยนแปลงจะมีผลทันทีเมื่อประกาศในเว็บไซต์ การใช้งานต่อเนื่องถือว่ายอมรับเงื่อนไขใหม่
            </p>
          </div>

          {/* Contact */}
          <div className="card bg-primary-50 border-primary-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ติดต่อเรา</h2>
            <p className="text-gray-600 mb-4">
              หากมีคำถามเกี่ยวกับเงื่อนไขการใช้งาน
            </p>
            <div className="space-y-2 text-gray-600">
              <p>📧 อีเมล: legal@govdigital.go.th</p>
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
