'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  IdentificationIcon,
  TruckIcon,
  GlobeAltIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';

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
    statusColor: 'bg-green-100 text-green-800'
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
    statusColor: 'bg-green-100 text-green-800'
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
    statusColor: 'bg-green-100 text-green-800'
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
    statusColor: 'bg-green-100 text-green-800'
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
  const [documents] = useState<Document[]>(mockDocuments);

  const handleViewDocument = (documentId: string) => {
    console.log('View document:', documentId);
    // TODO: Implement view document functionality
  };

  const handleDownloadDocument = (documentId: string) => {
    console.log('Download document:', documentId);
    // TODO: Implement download document functionality
  };

  const handleAddDocument = () => {
    console.log('Add new document');
    // TODO: Implement add document functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                กระเป๋าเอกสารดิจิทัล
              </h1>
              <p className="text-gray-600">
                จัดการเอกสารดิจิทัลของคุณ
              </p>
            </div>
            <button
              onClick={handleAddDocument}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>เพิ่มเอกสาร</span>
            </button>
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
            </motion.div>
          ))}
        </div>

        {/* Add New Document Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              เพิ่มเอกสารใหม่
            </h3>
            <p className="text-gray-600 mb-6">
              เพิ่มเอกสารดิจิทัลใหม่เข้าสู่กระเป๋าของคุณ
            </p>
            <button
              onClick={handleAddDocument}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <PlusIcon className="h-5 w-5" />
              <span>เพิ่มเอกสาร</span>
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}