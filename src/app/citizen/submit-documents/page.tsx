'use client';

import { useState } from 'react';
import { 
  ClipboardDocumentListIcon,
  DocumentArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function SubmitDocuments() {
  const [selectedForm, setSelectedForm] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableForms = [
    {
      id: 'building-permit',
      name: 'ใบอนุญาตก่อสร้าง',
      description: 'ยื่นขออนุญาตก่อสร้างอาคาร',
      icon: '🏗️',
      requiredDocs: ['แบบแปลนอาคาร', 'หนังสือรับรองวิศวกร', 'เอกสารกรรมสิทธิ์ที่ดิน'],
      processingTime: '15-30 วัน'
    },
    {
      id: 'business-license',
      name: 'ใบอนุญาตประกอบธุรกิจ',
      description: 'ยื่นขออนุญาตประกอบธุรกิจ',
      icon: '🏪',
      requiredDocs: ['สำเนาบัตรประชาชน', 'หนังสือรับรองบริษัท', 'แผนที่ตั้งร้าน'],
      processingTime: '7-14 วัน'
    },
    {
      id: 'marriage-cert',
      name: 'ใบสำคัญสมรส',
      description: 'ยื่นขอใบสำคัญสมรส',
      icon: '💒',
      requiredDocs: ['สำเนาบัตรประชาชน', 'สำเนาทะเบียนบ้าน', 'หลักฐานการหย่า (ถ้ามี)'],
      processingTime: '3-7 วัน'
    },
    {
      id: 'birth-cert',
      name: 'สูติบัตร',
      description: 'ยื่นขอสูติบัตร',
      icon: '👶',
      requiredDocs: ['หนังสือรับรองแพทย์', 'สำเนาบัตรประชาชนผู้ปกครอง', 'สำเนาทะเบียนสมรส'],
      processingTime: '1-3 วัน'
    },
    {
      id: 'death-cert',
      name: 'มรณบัตร',
      description: 'ยื่นขอมรณบัตร',
      icon: '🕊️',
      requiredDocs: ['หนังสือรับรองแพทย์', 'สำเนาบัตรประชาชนผู้ตาย', 'หลักฐานการตาย'],
      processingTime: '1-3 วัน'
    },
    {
      id: 'id-card',
      name: 'บัตรประชาชน',
      description: 'ยื่นขอ/ต่ออายุบัตรประชาชน',
      icon: '🆔',
      requiredDocs: ['รูปถ่าย', 'หลักฐานการเปลี่ยนชื่อ (ถ้ามี)', 'หลักฐานการเปลี่ยนที่อยู่'],
      processingTime: '7-14 วัน'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedForm || uploadedFiles.length === 0) {
      alert('กรุณาเลือกแบบฟอร์มและอัปโหลดเอกสาร');
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('ยื่นเอกสารเรียบร้อยแล้ว หมายเลขคำขอ: #DOC2024001');
      setSelectedForm('');
      setUploadedFiles([]);
    }, 2000);
  };

  const selectedFormData = availableForms.find(form => form.id === selectedForm);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">ยื่นเอกสารออนไลน์</h1>
            <p className="text-gray-600">ยื่นคำขอเอกสารต่างๆ ทางออนไลน์</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Selection */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">เลือกแบบฟอร์ม</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableForms.map((form) => (
                  <button
                    key={form.id}
                    onClick={() => setSelectedForm(form.id)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      selectedForm === form.id
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                        : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{form.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{form.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{form.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {form.processingTime}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            {selectedFormData && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">เอกสารที่ต้องใช้</h3>
                <ul className="space-y-2">
                  {selectedFormData.requiredDocs.map((doc, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      ระยะเวลาดำเนินการ: {selectedFormData.processingTime}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">อัปโหลดเอกสาร</h2>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="btn-primary cursor-pointer"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  เลือกไฟล์
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ไฟล์ที่อัปโหลด</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <DocumentArrowUpIcon className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedForm || uploadedFiles.length === 0}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังยื่นเอกสาร...
                </>
              ) : (
                <>
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                  ยื่นเอกสาร
                </>
              )}
            </button>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">คำขอที่ยื่นล่าสุด</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ใบอนุญาตก่อสร้าง</h3>
                    <p className="text-sm text-gray-600">หมายเลขคำขอ: #DOC2024001</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    อนุมัติแล้ว
                  </span>
                  <p className="text-sm text-gray-500 mt-1">15 มกราคม 2567</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ใบอนุญาตประกอบธุรกิจ</h3>
                    <p className="text-sm text-gray-600">หมายเลขคำขอ: #DOC2024002</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    อยู่ระหว่างดำเนินการ
                  </span>
                  <p className="text-sm text-gray-500 mt-1">20 มกราคม 2567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
