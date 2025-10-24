'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  PaperClipIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Link from 'next/link';

// ประเภทคำขอเอกสาร
const documentTypes = [
  {
    id: 'building_permit',
    name: 'ใบอนุญาตก่อสร้างอาคาร',
    description: 'ขออนุญาตก่อสร้างอาคารใหม่หรือต่อเติม',
    requiredDocuments: [
      'แบบแปลนอาคาร (PDF)',
      'หนังสือรับรองวิศวกร (PDF)',
      'หลักฐานการเป็นเจ้าของที่ดิน (PDF)',
      'หนังสือรับรองจากเทศบาล (PDF)'
    ],
    icon: '🏗️'
  },
  {
    id: 'business_license',
    name: 'ใบอนุญาตประกอบการ',
    description: 'ขออนุญาตประกอบธุรกิจ',
    requiredDocuments: [
      'สำเนาบัตรประชาชน (PDF/JPG)',
      'หนังสือรับรองบริษัท (PDF)',
      'แผนที่ตั้งสถานที่ (PDF/JPG)',
      'หนังสือรับรองจากกรมการค้า (PDF)'
    ],
    icon: '🏢'
  },
  {
    id: 'driving_license',
    name: 'ใบขับขี่',
    description: 'ขอใบขับขี่ใหม่หรือต่ออายุ',
    requiredDocuments: [
      'สำเนาบัตรประชาชน (PDF/JPG)',
      'ใบรับรองแพทย์ (PDF)',
      'รูปถ่าย 2 นิ้ว (JPG)',
      'ใบรับรองการอบรม (PDF)'
    ],
    icon: '🚗'
  },
  {
    id: 'passport',
    name: 'หนังสือเดินทาง',
    description: 'ขอหนังสือเดินทางใหม่หรือต่ออายุ',
    requiredDocuments: [
      'สำเนาบัตรประชาชน (PDF/JPG)',
      'สำเนาทะเบียนบ้าน (PDF/JPG)',
      'รูปถ่าย 2 นิ้ว (JPG)',
      'หนังสือรับรองจากสถานทูต (PDF)'
    ],
    icon: '📘'
  },
  {
    id: 'marriage_certificate',
    name: 'ใบสำคัญสมรส',
    description: 'ขอใบสำคัญสมรส',
    requiredDocuments: [
      'สำเนาบัตรประชาชน (PDF/JPG)',
      'สำเนาทะเบียนบ้าน (PDF/JPG)',
      'หลักฐานการหย่า (PDF) - ถ้ามี',
      'หนังสือรับรองจากอำเภอ (PDF)'
    ],
    icon: '💒'
  }
];

interface DocumentFile {
  id: string;
  name: string;
  file: File;
  type: string;
  size: number;
  preview?: string;
}

interface DocumentSubmission {
  documentType: string;
  files: { [key: string]: DocumentFile };
}

export default function StartDocumentSubmissionPage() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [submission, setSubmission] = useState<DocumentSubmission>({
    documentType: '',
    files: {}
  });
  const [showPreview, setShowPreview] = useState(false);

  const selectedDocumentType = documentTypes.find(type => type.id === selectedType);

  const handleFileUpload = (documentName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ตรวจสอบประเภทไฟล์
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('กรุณาอัปโหลดไฟล์ PDF หรือ JPG เท่านั้น');
      return;
    }

    // ตรวจสอบขนาดไฟล์ (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('ขนาดไฟล์ต้องไม่เกิน 10 MB');
      return;
    }

    const fileId = `${documentName}_${Date.now()}`;
    const newFile: DocumentFile = {
      id: fileId,
      name: file.name,
      file,
      type: file.type,
      size: file.size,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    };

    setSubmission(prev => ({
      ...prev,
      files: {
        ...prev.files,
        [documentName]: newFile
      }
    }));
  };

  const removeFile = (documentName: string) => {
    setSubmission(prev => {
      const newFiles = { ...prev.files };
      if (newFiles[documentName]?.preview) {
        URL.revokeObjectURL(newFiles[documentName].preview!);
      }
      delete newFiles[documentName];
      return {
        ...prev,
        files: newFiles
      };
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    return '📁';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isSubmissionComplete = () => {
    if (!selectedDocumentType) return false;
    return selectedDocumentType.requiredDocuments.every(doc => 
      submission.files[doc] !== undefined
    );
  };

  const handleSubmit = () => {
    if (!isSubmissionComplete()) {
      alert('กรุณาอัปโหลดไฟล์ให้ครบถ้วน');
      return;
    }

    // ส่งข้อมูลไปยังระบบ
    console.log('Submitting documents:', submission);
    alert('ส่งเอกสารเรียบร้อยแล้ว! คุณสามารถติดตามสถานะได้ในประวัติการยื่นเอกสาร');
    
    // Reset form
    setSelectedType('');
    setSubmission({ documentType: '', files: {} });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              เริ่มยื่นเอกสารออนไลน์
            </h1>
            <p className="text-gray-600">
              เลือกประเภทคำขอและแนบเอกสารที่จำเป็น
            </p>
          </div>

          {!selectedType ? (
            /* เลือกประเภทคำขอ */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all"
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{type.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {type.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {type.description}
                    </p>
                    <div className="text-blue-600 font-medium">
                      เอกสารที่ต้องเตรียม: {type.requiredDocuments.length} รายการ
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* แนบไฟล์เอกสาร */
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedDocumentType?.icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedDocumentType?.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedDocumentType?.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedType('');
                    setSubmission({ documentType: '', files: {} });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {selectedDocumentType?.requiredDocuments.map((document, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          {document}
                        </span>
                      </div>
                      {submission.files[document] && (
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-green-600">อัปโหลดแล้ว</span>
                        </div>
                      )}
                    </div>

                    {!submission.files[document] ? (
                      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <div className="text-center">
                          <ArrowUpTrayIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            คลิกเพื่ออัปโหลดไฟล์
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF หรือ JPG (ไม่เกิน 10MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(document, e)}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {getFileIcon(submission.files[document].type)}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">
                              {submission.files[document].name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatFileSize(submission.files[document].size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {submission.files[document].preview && (
                            <button
                              onClick={() => setShowPreview(true)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => removeFile(document)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* สรุปการส่ง */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">สรุปการส่งเอกสาร</h3>
                    <p className="text-sm text-gray-600">
                      อัปโหลดแล้ว {Object.keys(submission.files).length} / {selectedDocumentType?.requiredDocuments.length} ไฟล์
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((Object.keys(submission.files).length / (selectedDocumentType?.requiredDocuments.length || 1)) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">ความคืบหน้า</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(Object.keys(submission.files).length / (selectedDocumentType?.requiredDocuments.length || 1)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* ปุ่มส่ง */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setSelectedType('');
                    setSubmission({ documentType: '', files: {} });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isSubmissionComplete()}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isSubmissionComplete()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  ส่งเอกสาร
                </button>
              </div>
            </div>
          )}

          {/* เคล็ดลับการยื่นเอกสาร */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-3">เคล็ดลับการยื่นเอกสาร</h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li className="flex items-start space-x-2">
                <CheckCircleIcon className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span>ตรวจสอบเอกสารให้ครบถ้วนก่อนยื่น</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircleIcon className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span>อัปโหลดไฟล์ในรูปแบบ PDF หรือ JPG</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircleIcon className="h-4 w-4 mt-0.5 text-yellow-600" />
                <span>ขนาดไฟล์ไม่เกิน 10 MB ต่อไฟล์</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
