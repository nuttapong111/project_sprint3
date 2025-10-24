'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CameraIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';

const reportTypes = [
  {
    id: 'theft',
    name: 'การลักทรัพย์',
    description: 'แจ้งความเกี่ยวกับการขโมยหรือลักทรัพย์',
    icon: '🔒',
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 'fraud',
    name: 'การทุจริต',
    description: 'แจ้งความเกี่ยวกับการทุจริตหรือคอร์รัปชัน',
    icon: '💰',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 'violence',
    name: 'การใช้ความรุนแรง',
    description: 'แจ้งความเกี่ยวกับการใช้ความรุนแรง',
    icon: '⚠️',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'cyber',
    name: 'อาชญากรรมไซเบอร์',
    description: 'แจ้งความเกี่ยวกับการหลอกลวงทางออนไลน์',
    icon: '💻',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'other',
    name: 'อื่นๆ',
    description: 'แจ้งความเรื่องอื่นๆ',
    icon: '📋',
    color: 'bg-gray-100 text-gray-600'
  }
];

const recentReports = [
  {
    id: '1',
    type: 'การทุจริต',
    title: 'การทุจริตในหน่วยงานราชการ',
    date: '20/10/2024',
    status: 'อนุมัติแล้ว',
    statusColor: 'bg-green-100 text-green-800',
    href: '/citizen/reports-history'
  },
  {
    id: '2',
    type: 'การใช้ความรุนแรง',
    title: 'การทำร้ายร่างกาย',
    date: '15/10/2024',
    status: 'อนุมัติแล้ว',
    statusColor: 'bg-green-100 text-green-800',
    href: '/citizen/reports-history'
  },
  {
    id: '3',
    type: 'การลักทรัพย์',
    title: 'ขโมยโทรศัพท์มือถือ',
    date: '24/10/2024',
    status: 'รอการตรวจสอบ',
    statusColor: 'bg-yellow-100 text-yellow-800',
    href: '/citizen/reports-history'
  }
];

export default function ReportCrimePage() {
  const [selectedType, setSelectedType] = useState('');
  const [reports] = useState(recentReports);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleSubmitReport = () => {
    if (selectedType) {
      // Redirect to AI Chat page with crime type
      window.location.href = `/citizen/report-crime/ai-chat?type=${selectedType}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            บันทึกประจำวันออนไลน์
          </h1>
          <p className="text-gray-600">
            บันทึกประจำวันผ่านระบบออนไลน์อย่างปลอดภัยและรวดเร็ว
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Types */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              เลือกประเภทการบันทึกประจำวัน
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((type, index) => (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                    selectedType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${type.color}`}>
                      <span className="text-2xl">{type.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Submit Button */}
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <button
                  onClick={handleSubmitReport}
                  className="w-full btn-primary text-lg py-4"
                >
                  เริ่มบันทึกประจำวัน
                </button>
              </motion.div>
            )}
          </div>

          {/* Recent Reports */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              บันทึกประจำวันล่าสุด
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  {reports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-l-4 border-primary-500 pl-4"
                    >
                      <a
                        href={report.href}
                        className="block hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 mb-1">
                              {report.title}
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                              {report.type} • {report.date}
                            </p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${report.statusColor}`}>
                              {report.status}
                            </span>
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a
                    href="/citizen/reports-history"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    ดูประวัติการบันทึกประจำวันทั้งหมด →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-6 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                ข้อมูลสำคัญ
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>ข้อมูลจะถูกส่งไปยังหน่วยงานที่เกี่ยวข้อง</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>สามารถติดตามสถานะได้ตลอดเวลา</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>ข้อมูลส่วนตัวจะถูกปกป้องอย่างปลอดภัย</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}