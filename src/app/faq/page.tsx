'use client';

import Link from 'next/link';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: 'การสมัครสมาชิก',
      questions: [
        {
          question: 'สมัครสมาชิกอย่างไร?',
          answer: 'กดปุ่ม "สมัครสมาชิก" บนมุมขวาบนของหน้าเว็บ กรอกข้อมูลส่วนตัวตามที่ระบุ และยืนยันตัวตนผ่านอีเมลหรือเบอร์โทรศัพท์'
        },
        {
          question: 'ต้องใช้เอกสารอะไรบ้างในการสมัคร?',
          answer: 'บัตรประชาชน, ใบขับขี่, หรือหนังสือเดินทาง พร้อมอีเมลและเบอร์โทรศัพท์ที่ใช้งานได้จริง'
        },
        {
          question: 'สมัครได้หลายบัญชีหรือไม่?',
          answer: 'ไม่สามารถสมัครได้หลายบัญชีด้วยข้อมูลเดียวกัน หนึ่งคนสามารถมีได้เพียงหนึ่งบัญชีเท่านั้น'
        }
      ]
    },
    {
      category: 'การเข้าสู่ระบบ',
      questions: [
        {
          question: 'ลืมรหัสผ่านทำอย่างไร?',
          answer: 'กด "ลืมรหัสผ่าน" ที่หน้าเข้าสู่ระบบ กรอกอีเมลหรือเบอร์โทรศัพท์ที่สมัครไว้ ระบบจะส่งลิงก์รีเซ็ตรหัสผ่านให้'
        },
        {
          question: 'ไม่สามารถเข้าสู่ระบบได้',
          answer: 'ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต ลองใช้เบราว์เซอร์อื่น หรือล้างแคชเบราว์เซอร์ หากยังไม่ได้ กรุณาติดต่อเจ้าหน้าที่'
        },
        {
          question: 'Thai ID Login ไม่ทำงาน',
          answer: 'ตรวจสอบว่าแอป Thai ID อัปเดตเป็นเวอร์ชันล่าสุด และเชื่อมต่ออินเทอร์เน็ตได้ หากยังไม่ได้ กรุณาลองใหม่อีกครั้ง'
        }
      ]
    },
    {
      category: 'การใช้งานบริการ',
      questions: [
        {
          question: 'เอกสารดิจิทัลไม่แสดงผล',
          answer: 'ลองรีเฟรชหน้าเว็บ ล้างแคชเบราว์เซอร์ หรือใช้เบราว์เซอร์อื่น หากยังไม่ได้ กรุณาติดต่อเจ้าหน้าที่'
        },
        {
          question: 'ไม่สามารถนัดหมายแพทย์ได้',
          answer: 'ตรวจสอบว่าโรงพยาบาลที่เลือกมีบริการนัดหมายออนไลน์ และมีเวลาว่างในวันที่ต้องการ หากยังไม่ได้ กรุณาติดต่อโรงพยาบาลโดยตรง'
        },
        {
          question: 'แจ้งความออนไลน์ไม่สำเร็จ',
          answer: 'ตรวจสอบว่ากรอกข้อมูลครบถ้วน และแนบหลักฐานตามที่ระบุ หากยังไม่ได้ กรุณาติดต่อเจ้าหน้าที่ตำรวจ'
        }
      ]
    },
    {
      category: 'ความปลอดภัย',
      questions: [
        {
          question: 'ข้อมูลส่วนตัวปลอดภัยหรือไม่?',
          answer: 'เราใช้เทคโนโลยีเข้ารหัสขั้นสูงและปฏิบัติตาม PDPA อย่างเคร่งครัด ข้อมูลของคุณจะถูกเก็บรักษาอย่างปลอดภัย'
        },
        {
          question: 'สามารถเปลี่ยนรหัสผ่านได้หรือไม่?',
          answer: 'ได้ สามารถเปลี่ยนรหัสผ่านได้ที่หน้า "จัดการบัญชี" ในเมนูส่วนตัว'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link href="/help" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            กลับสู่ศูนย์ช่วยเหลือ
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">คำถามที่พบบ่อย</h1>
          <p className="text-xl text-gray-600">คำตอบสำหรับคำถามที่ผู้ใช้ถามบ่อยที่สุด</p>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 10 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        <ChevronDownIcon 
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 card bg-primary-50 border-primary-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบคำตอบที่ต้องการ?</h3>
            <p className="text-gray-600 mb-4">ติดต่อเจ้าหน้าที่เพื่อรับความช่วยเหลือเพิ่มเติม</p>
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              ติดต่อเจ้าหน้าที่
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
