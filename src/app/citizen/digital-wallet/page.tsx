'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DigitalWallet() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const documents = [
    {
      id: 'id-card',
      name: 'บัตรประชาชน',
      type: 'ID Card',
      number: '1234567890123',
      issueDate: '01/01/2020',
      expiryDate: '01/01/2030',
      status: 'active',
      icon: '🆔',
      color: 'blue'
    },
    {
      id: 'driver-license',
      name: 'ใบขับขี่',
      type: 'Driver License',
      number: '1234567890',
      issueDate: '15/06/2022',
      expiryDate: '15/06/2027',
      status: 'active',
      icon: '🚗',
      color: 'green'
    },
    {
      id: 'passport',
      name: 'หนังสือเดินทาง',
      type: 'Passport',
      number: 'A1234567',
      issueDate: '10/03/2023',
      expiryDate: '10/03/2033',
      status: 'active',
      icon: '📘',
      color: 'purple'
    },
    {
      id: 'birth-cert',
      name: 'สูติบัตร',
      type: 'Birth Certificate',
      number: 'BC123456789',
      issueDate: '20/05/1990',
      expiryDate: 'ไม่มีวันหมดอายุ',
      status: 'active',
      icon: '👶',
      color: 'pink'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'expiring': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ใช้งานได้';
      case 'expired': return 'หมดอายุ';
      case 'expiring': return 'ใกล้หมดอายุ';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'expired': return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      case 'expiring': return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">กระเป๋าเอกสารดิจิทัล</h1>
              <p className="text-gray-600">จัดการเอกสารดิจิทัลของคุณ</p>
            </div>
            <button className="btn-primary">
              <PlusIcon className="h-5 w-5 mr-2" />
              เพิ่มเอกสาร
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">เอกสารทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ใช้งานได้</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ใกล้หมดอายุ</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">หมดอายุ</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{doc.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.type}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                  {getStatusText(doc.status)}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">หมายเลข:</span>
                  <span className="font-medium">{doc.number}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">วันที่ออก:</span>
                  <span className="font-medium">{doc.issueDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">วันหมดอายุ:</span>
                  <span className="font-medium">{doc.expiryDate}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedDocument(doc.id)}
                  className="flex-1 btn-secondary text-sm py-2"
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  ดู
                </button>
                <button className="flex-1 btn-secondary text-sm py-2">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  ดาวน์โหลด
                </button>
                <button className="btn-secondary text-sm py-2 px-3">
                  <QrCodeIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Document Card */}
        <div className="mt-8">
          <div className="card border-2 border-dashed border-gray-300 hover:border-primary-400 transition-colors">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">เพิ่มเอกสารใหม่</h3>
              <p className="text-gray-600 mb-4">เพิ่มเอกสารดิจิทัลใหม่เข้าสู่กระเป๋าของคุณ</p>
              <button className="btn-primary">
                <PlusIcon className="h-5 w-5 mr-2" />
                เพิ่มเอกสาร
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedDocument(null)} />
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                    <DocumentTextIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">รายละเอียดเอกสาร</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        เอกสารที่เลือก: {documents.find(d => d.id === selectedDocument)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setSelectedDocument(null)}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
