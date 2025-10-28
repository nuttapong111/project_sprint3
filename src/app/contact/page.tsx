'use client';

import Link from 'next/link';
import { ArrowLeftIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับภายใน 24 ชั่วโมง');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/help" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            กลับสู่ศูนย์ช่วยเหลือ
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ติดต่อเจ้าหน้าที่</h1>
          <p className="text-xl text-gray-600">เราพร้อมให้ความช่วยเหลือและตอบคำถามของคุณ</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ข้อมูลติดต่อ</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">โทรศัพท์</h3>
                    <p className="text-gray-600">02-123-4567</p>
                    <p className="text-sm text-gray-500">จันทร์ - ศุกร์ 08:00 - 17:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">อีเมล</h3>
                    <p className="text-gray-600">support@govdigital.go.th</p>
                    <p className="text-sm text-gray-500">ตอบกลับภายใน 24 ชั่วโมง</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ที่อยู่</h3>
                    <p className="text-gray-600">สำนักงานพัฒนารัฐบาลดิจิทัล</p>
                    <p className="text-sm text-gray-500">กรุงเทพมหานคร ประเทศไทย</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">เวลาทำการ</h3>
                    <p className="text-gray-600">จันทร์ - ศุกร์: 08:00 - 17:00</p>
                    <p className="text-sm text-gray-500">เสาร์ - อาทิตย์: ปิดทำการ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">ตอบกลับด่วน</h3>
              <p className="text-gray-600 text-sm mb-4">
                สำหรับปัญหาด่วนหรือข้อร้องเรียน กรุณาโทรศัพท์ติดต่อโดยตรง
              </p>
              <a 
                href="tel:02-123-4567" 
                className="btn-primary text-sm"
              >
                โทร 02-123-4567
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ส่งข้อความ</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  หัวข้อ *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">เลือกหัวข้อ</option>
                  <option value="technical">ปัญหาทางเทคนิค</option>
                  <option value="account">ปัญหาบัญชีผู้ใช้</option>
                  <option value="service">คำถามเกี่ยวกับบริการ</option>
                  <option value="complaint">ข้อร้องเรียน</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  ข้อความ *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="กรอกรายละเอียดของปัญหา หรือคำถามของคุณ"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                ส่งข้อความ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
