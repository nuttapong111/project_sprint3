'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  PlusIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Link from 'next/link';
import { DocumentSubmissionManager, DocumentSubmission } from '@/lib/documentSubmission';

const documentTypes = [
  {
    id: 'building_permit',
    name: 'ใบอนุญาตก่อสร้าง',
    description: 'ยื่นขอใบอนุญาตก่อสร้างอาคาร',
    icon: '🏗️',
    color: 'bg-orange-100 text-orange-600',
    requiredDocs: ['แบบแปลนอาคาร', 'หนังสือรับรองวิศวกร', 'หลักฐานการเป็นเจ้าของที่ดิน']
  },
  {
    id: 'business_license',
    name: 'ใบอนุญาตประกอบการ',
    description: 'ยื่นขอใบอนุญาตประกอบธุรกิจ',
    icon: '🏪',
    color: 'bg-green-100 text-green-600',
    requiredDocs: ['สำเนาบัตรประชาชน', 'หนังสือรับรองบริษัท', 'แผนที่ตั้งสถานที่']
  },
  {
    id: 'driving_license',
    name: 'ใบขับขี่',
    description: 'ยื่นขอหรือต่ออายุใบขับขี่',
    icon: '🚗',
    color: 'bg-blue-100 text-blue-600',
    requiredDocs: ['สำเนาบัตรประชาชน', 'ใบรับรองแพทย์', 'รูปถ่าย']
  },
  {
    id: 'passport',
    name: 'หนังสือเดินทาง',
    description: 'ยื่นขอหนังสือเดินทาง',
    icon: '📘',
    color: 'bg-purple-100 text-purple-600',
    requiredDocs: ['สำเนาบัตรประชาชน', 'สำเนาทะเบียนบ้าน', 'รูปถ่าย']
  },
  {
    id: 'marriage_certificate',
    name: 'ใบสำคัญสมรส',
    description: 'ยื่นขอใบสำคัญสมรส',
    icon: '💍',
    color: 'bg-pink-100 text-pink-600',
    requiredDocs: ['สำเนาบัตรประชาชน', 'สำเนาทะเบียนบ้าน', 'หลักฐานการหย่า (ถ้ามี)']
  }
];

const recentSubmissions = [
  {
    id: '1',
    type: 'ใบอนุญาตก่อสร้าง',
    date: '20/12/2024',
    status: 'รอการตรวจสอบ',
    statusColor: 'bg-yellow-100 text-yellow-800',
    progress: 60
  },
  {
    id: '2',
    type: 'ใบอนุญาตประกอบการ',
    date: '15/12/2024',
    status: 'อนุมัติแล้ว',
    statusColor: 'bg-green-100 text-green-800',
    progress: 100
  },
  {
    id: '3',
    type: 'ใบขับขี่',
    date: '10/12/2024',
    status: 'ต้องแก้ไข',
    statusColor: 'bg-red-100 text-red-800',
    progress: 30
  }
];

export default function SubmitDocumentsPage() {
  const [selectedType, setSelectedType] = useState('');
  const [recentSubmissions, setRecentSubmissions] = useState<DocumentSubmission[]>([]);

  useEffect(() => {
    loadRecentSubmissions();
  }, []);

  const loadRecentSubmissions = () => {
    const submissions = DocumentSubmissionManager.getRecentSubmissions('current_user', 3);
    setRecentSubmissions(submissions);
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleViewSubmission = (submission: DocumentSubmission) => {
    // นำไปยังหน้าประวัติการยื่นเอกสาร
    window.location.href = '/citizen/document-history';
  };

  const getStatusColor = (status: string) => {
    return DocumentSubmissionManager.getStatusColor(status as any);
  };

  const getStatusText = (status: string) => {
    return DocumentSubmissionManager.getStatusText(status as any);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ยื่นเอกสารออนไลน์
          </h1>
          <p className="text-gray-600">
            ยื่นเอกสารต่างๆ ทางออนไลน์ได้อย่างสะดวกและรวดเร็ว
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Types */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              เลือกประเภทเอกสารที่ต้องการยื่น
            </h2>
            <div className="space-y-4">
              {documentTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${type.color}`}>
                      <span className="text-2xl">{type.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {type.description}
                      </p>
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">
                          เอกสารที่ต้องเตรียม:
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {type.requiredDocs.map((doc, docIndex) => (
                            <li key={docIndex} className="flex items-center space-x-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
                <Link
                  href="/citizen/submit-documents/start"
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
                >
                  <ArrowUpTrayIcon className="h-5 w-5" />
                  <span>เริ่มยื่นเอกสาร</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Recent Submissions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              การยื่นเอกสารล่าสุด
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  {recentSubmissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-l-4 border-primary-500 pl-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                      onClick={() => handleViewSubmission(submission)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {submission.documentTypeName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {getStatusText(submission.status)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        {submission.submittedAt.toLocaleDateString('th-TH')}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${submission.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {submission.progress}% เสร็จสิ้น
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link
                    href="/citizen/document-history"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    ดูประวัติการยื่นเอกสารทั้งหมด →
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                เคล็ดลับการยื่นเอกสาร
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>ตรวจสอบเอกสารให้ครบถ้วนก่อนยื่น</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>อัปโหลดไฟล์ในรูปแบบ PDF หรือ JPG</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>ขนาดไฟล์ไม่เกิน 10 MB ต่อไฟล์</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}