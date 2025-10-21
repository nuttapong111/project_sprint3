'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  IdentificationIcon,
  TruckIcon,
  GlobeAltIcon,
  UserIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import { mockUsers, User } from '@/lib/mockUsers';

interface Document {
  id: string;
  type: string;
  typeThai: string;
  icon: string;
  iconColor: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  statusText: string;
  statusColor: string;
  canRenew?: boolean;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    type: 'id_card',
    typeThai: 'บัตรประชาชน',
    icon: '🆔',
    iconColor: 'bg-purple-100 text-purple-600',
    number: '1234567890123',
    issueDate: '01/01/2020',
    expiryDate: '01/01/2030',
    status: 'valid',
    statusText: 'ใช้งานได้',
    statusColor: 'bg-green-100 text-green-800',
    canRenew: true
  },
  {
    id: '2',
    type: 'driver_license',
    typeThai: 'ใบขับขี่',
    icon: '🚗',
    iconColor: 'bg-red-100 text-red-600',
    number: '1234567890',
    issueDate: '15/06/2022',
    expiryDate: '15/06/2027',
    status: 'valid',
    statusText: 'ใช้งานได้',
    statusColor: 'bg-green-100 text-green-800',
    canRenew: true
  },
  {
    id: '3',
    type: 'passport',
    typeThai: 'หนังสือเดินทาง',
    icon: '📘',
    iconColor: 'bg-blue-100 text-blue-600',
    number: 'A1234567',
    issueDate: '10/03/2023',
    expiryDate: '10/03/2033',
    status: 'valid',
    statusText: 'ใช้งานได้',
    statusColor: 'bg-green-100 text-green-800',
    canRenew: true
  },
  {
    id: '4',
    type: 'birth_certificate',
    typeThai: 'สูติบัตร',
    icon: '👶',
    iconColor: 'bg-yellow-100 text-yellow-600',
    number: 'BC123456789',
    issueDate: '20/05/1990',
    expiryDate: 'ไม่มีวันหมดอายุ',
    status: 'valid',
    statusText: 'ใช้งานได้',
    statusColor: 'bg-green-100 text-green-800',
    canRenew: false
  }
];

const summaryCards = [
  {
    title: 'เอกสารทั้งหมด',
    count: '4',
    icon: DocumentTextIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'ใช้งานได้',
    count: '4',
    icon: CheckCircleIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'ใกล้หมดอายุ',
    count: '0',
    icon: ClockIcon,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    title: 'หมดอายุ',
    count: '0',
    icon: ExclamationTriangleIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  }
];

export default function DigitalWalletPage() {
  const router = useRouter();
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showCardPopup, setShowCardPopup] = useState(false);
  
  // ข้อมูล user ปัจจุบัน (ใช้ user แรกเป็นตัวอย่าง)
  const currentUser = mockUsers.find(user => user.userType === 'citizen') || mockUsers[0];

  const handleViewDocument = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      setSelectedDocument(document);
      setShowCardPopup(true);
    }
  };

  const handleDownloadDocument = (documentId: string) => {
    console.log('Download document:', documentId);
    // TODO: Implement download document functionality
  };

  const handleRenewDocument = (documentId: string) => {
    const document = mockDocuments.find(doc => doc.id === documentId);
    if (!document) return;
    
    // Navigate to renewal page with document type
    router.push(`/citizen/renew-document?type=${document.type}&id=${documentId}`);
  };

  const closeCardPopup = () => {
    setShowCardPopup(false);
    setSelectedDocument(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                กระเป๋าเอกสารดิจิทัล
              </h1>
              <p className="text-gray-600">
                จัดการเอกสารดิจิทัลของคุณ
              </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {card.count}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {documents.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              {/* Status Badge */}
              <div className="flex justify-end mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${document.statusColor}`}>
                  {document.statusText}
                </span>
              </div>

              {/* Document Icon and Type */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${document.iconColor}`}>
                  <span className="text-2xl">{document.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {document.typeThai}
                </h3>
              </div>

              {/* Document Details */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">หมายเลข</p>
                  <p className="text-sm font-medium text-gray-900">{document.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">วันที่ออก</p>
                  <p className="text-sm font-medium text-gray-900">{document.issueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">วันหมดอายุ</p>
                  <p className="text-sm font-medium text-gray-900">{document.expiryDate}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleViewDocument(document.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>ดู</span>
                </button>
                <button
                  onClick={() => handleDownloadDocument(document.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>ดาวน์โหลด</span>
                </button>
                </div>
                {document.canRenew && (
                  <button
                    onClick={() => handleRenewDocument(document.id)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-orange-300 rounded-lg text-orange-700 hover:bg-orange-50 transition-colors duration-200"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                    <span>ต่ออายุบัตร</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </main>

      {/* Card Popup Modal */}
      {showCardPopup && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDocument.typeThai}
              </h3>
              <button
                onClick={closeCardPopup}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {selectedDocument.type === 'id_card' && (
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                  <div className="text-center mb-6">
                    <div className="text-sm opacity-80 mb-2">บัตรประจำตัวประชาชน</div>
                    <div className="text-2xl font-bold">Thai National ID Card</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-sm opacity-80 mb-1">ชื่อ-นามสกุล</div>
                      <div className="text-lg font-semibold">
                        {currentUser.firstName} {currentUser.lastName}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">เลขประจำตัวประชาชน</div>
                      <div className="text-lg font-semibold font-mono">
                        {currentUser.thaiId}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">วันเกิด</div>
                      <div className="text-lg font-semibold">01 มกราคม 2530</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">ศาสนา</div>
                      <div className="text-lg font-semibold">พุทธ</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm opacity-80 mb-1">ที่อยู่</div>
                      <div className="text-lg font-semibold">
                        123/45 ถนนสุขุมวิท เขตวัฒนา กรุงเทพมหานคร 10110
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm opacity-80 mb-1">วันออกบัตร</div>
                      <div className="text-base font-semibold">{selectedDocument.issueDate}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">เจ้าพนักงานออกบัตร</div>
                      <div className="text-base font-semibold">นายทะเบียน</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">วันหมดอายุ</div>
                      <div className="text-base font-semibold">{selectedDocument.expiryDate}</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedDocument.type === 'driver_license' && (
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-6 text-white">
                  <div className="text-center mb-6">
                    <div className="text-sm opacity-80 mb-2">ใบอนุญาตขับขี่รถยนต์ส่วนบุคคล</div>
                    <div className="text-2xl font-bold">Private Car Driving Licence</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-sm opacity-80 mb-1">ชื่อ-นามสกุล</div>
                      <div className="text-lg font-semibold">
                        {currentUser.firstName} {currentUser.lastName}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">เลขที่บัตรประจำตัว</div>
                      <div className="text-lg font-semibold font-mono">
                        {currentUser.thaiId}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">เกิดวันที่</div>
                      <div className="text-lg font-semibold">23 พฤษภาคม 2538</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">หมายเลขใบอนุญาต</div>
                      <div className="text-lg font-semibold font-mono">
                        {selectedDocument.number}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-sm opacity-80 mb-1">วันออก</div>
                      <div className="text-base font-semibold">{selectedDocument.issueDate}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80 mb-1">วันหมดอายุ</div>
                      <div className="text-base font-semibold">{selectedDocument.expiryDate}</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedDocument.type === 'passport' && (
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                  <div className="text-center mb-6">
                    <div className="text-sm opacity-80 mb-2">หนังสือเดินทาง</div>
                    <div className="text-xs opacity-60">PASSPORT</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
                    <div className="text-sm opacity-80 mb-1">ชื่อ-นามสกุล</div>
                    <div className="text-lg font-semibold mb-2">
                      {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <div className="text-sm opacity-80 mb-1">เลขหนังสือเดินทาง</div>
                    <div className="text-lg font-mono tracking-wider">
                      {selectedDocument.number}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="opacity-80 mb-1">สัญชาติ</div>
                      <div className="font-semibold">ไทย</div>
                    </div>
                    <div>
                      <div className="opacity-80 mb-1">เลขประจำตัวประชาชน</div>
                      <div className="font-semibold">{currentUser.thaiId}</div>
                    </div>
                    <div>
                      <div className="opacity-80 mb-1">วันที่ออก</div>
                      <div className="font-semibold">{selectedDocument.issueDate}</div>
                    </div>
                    <div>
                      <div className="opacity-80 mb-1">วันหมดอายุ</div>
                      <div className="font-semibold">{selectedDocument.expiryDate}</div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-xs opacity-60">
                      กรมการกงสุล กระทรวงการต่างประเทศ
                    </div>
                  </div>
                </div>
              )}

              {selectedDocument.type === 'birth_certificate' && (
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-6 text-white">
                  <div className="text-center mb-6">
                    <div className="text-sm opacity-80 mb-2">สูติบัตร</div>
                    <div className="text-xs opacity-60">BIRTH CERTIFICATE</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
                    <div className="text-sm opacity-80 mb-1">ชื่อ-นามสกุล</div>
                    <div className="text-lg font-semibold mb-2">
                      {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <div className="text-sm opacity-80 mb-1">เลขสูติบัตร</div>
                    <div className="text-lg font-mono tracking-wider">
                      {selectedDocument.number}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="opacity-80 mb-1">วันเกิด</div>
                      <div className="font-semibold">20 พฤษภาคม 2533</div>
                    </div>
                    <div>
                      <div className="opacity-80 mb-1">เพศ</div>
                      <div className="font-semibold">ชาย</div>
                    </div>
                    <div>
                      <div className="opacity-80 mb-1">วันที่ออก</div>
                      <div className="font-semibold">{selectedDocument.issueDate}</div>
                    </div>
                    <div>
                      <div className="opacity-80 mb-1">สถานะ</div>
                      <div className="font-semibold">ไม่มีวันหมดอายุ</div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-xs opacity-60">
                      สำนักงานเขต
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeCardPopup}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ปิด
              </button>
            <button
                onClick={() => handleDownloadDocument(selectedDocument.id)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
                ดาวน์โหลด
            </button>
          </div>
        </motion.div>
        </div>
      )}
    </div>
  );
}