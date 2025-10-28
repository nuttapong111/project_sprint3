'use client';

import Link from 'next/link';
import { ArrowLeftIcon, ExclamationTriangleIcon, DocumentIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ReportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issueType: '',
    description: '',
    steps: '',
    expectedResult: '',
    actualResult: '',
    priority: 'medium'
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Report submitted:', formData, attachments);
    alert('ส่งรายงานปัญหาเรียบร้อยแล้ว เราจะดำเนินการแก้ไขโดยเร็วที่สุด');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/help" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            กลับสู่ศูนย์ช่วยเหลือ
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">รายงานปัญหา</h1>
          <p className="text-xl text-gray-600">ช่วยเราปรับปรุงบริการด้วยการรายงานปัญหาที่พบ</p>
        </div>

        {/* Report Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ข้อมูลติดต่อ</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="กรอกชื่อ-นามสกุล"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="กรอกอีเมล"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="กรอกเบอร์โทรศัพท์"
                  />
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    ระดับความเร่งด่วน *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="low">ต่ำ - ไม่กระทบการใช้งาน</option>
                    <option value="medium">ปานกลาง - มีปัญหาแต่ยังใช้งานได้</option>
                    <option value="high">สูง - ใช้งานไม่ได้บางส่วน</option>
                    <option value="critical">วิกฤต - ใช้งานไม่ได้เลย</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Issue Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">รายละเอียดปัญหา</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-2">
                    ประเภทปัญหา *
                  </label>
                  <select
                    id="issueType"
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">เลือกประเภทปัญหา</option>
                    <option value="login">ไม่สามารถเข้าสู่ระบบได้</option>
                    <option value="performance">ระบบช้า/ค้าง</option>
                    <option value="display">แสดงผลผิดปกติ</option>
                    <option value="function">ฟังก์ชันไม่ทำงาน</option>
                    <option value="mobile">ปัญหาในมือถือ</option>
                    <option value="security">ปัญหาด้านความปลอดภัย</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    อธิบายปัญหา *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="อธิบายปัญหาที่พบอย่างละเอียด"
                  />
                </div>

                <div>
                  <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-2">
                    ขั้นตอนที่ทำให้เกิดปัญหา *
                  </label>
                  <textarea
                    id="steps"
                    name="steps"
                    value={formData.steps}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="1. เข้าหน้าเว็บไซต์&#10;2. คลิกปุ่ม...&#10;3. เกิดปัญหา..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="expectedResult" className="block text-sm font-medium text-gray-700 mb-2">
                      ผลลัพธ์ที่คาดหวัง
                    </label>
                    <textarea
                      id="expectedResult"
                      name="expectedResult"
                      value={formData.expectedResult}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="อธิบายว่าควรจะเกิดอะไรขึ้น"
                    />
                  </div>

                  <div>
                    <label htmlFor="actualResult" className="block text-sm font-medium text-gray-700 mb-2">
                      ผลลัพธ์ที่เกิดขึ้นจริง
                    </label>
                    <textarea
                      id="actualResult"
                      name="actualResult"
                      value={formData.actualResult}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="อธิบายสิ่งที่เกิดขึ้นจริง"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">แนบหลักฐาน</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
                    รูปภาพ/วิดีโอ/ไฟล์ (ไม่เกิน 10MB)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <CameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                    <input
                      type="file"
                      id="attachments"
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="attachments"
                      className="btn-secondary cursor-pointer"
                    >
                      เลือกไฟล์
                    </label>
                  </div>
                </div>

                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">ไฟล์ที่เลือก:</p>
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <DocumentIcon className="h-4 w-4" />
                        <span>{file.name}</span>
                        <span className="text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/help" className="btn-secondary">
                ยกเลิก
              </Link>
              <button
                type="submit"
                className="btn-primary"
              >
                <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                ส่งรายงานปัญหา
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 card bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 เคล็ดลับการรายงานปัญหา</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• อธิบายปัญหาให้ชัดเจนและละเอียด</li>
            <li>• แนบรูปภาพหน้าจอที่เกิดปัญหา</li>
            <li>• บอกข้อมูลเบราว์เซอร์และอุปกรณ์ที่ใช้</li>
            <li>• ระบุเวลาที่เกิดปัญหา</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
