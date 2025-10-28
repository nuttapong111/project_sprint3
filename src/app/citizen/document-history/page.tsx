'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  PaperClipIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Link from 'next/link';
import { DocumentSubmissionManager, DocumentSubmission, DocumentStatus } from '@/lib/documentSubmission';

export default function DocumentHistoryPage() {
  const [submissions, setSubmissions] = useState<DocumentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<DocumentSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | 'all'>('all');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const userSubmissions = DocumentSubmissionManager.getSubmissionsByUserId('current_user');
    setSubmissions(userSubmissions);
  };

  const getStatusColor = (status: DocumentStatus) => {
    return DocumentSubmissionManager.getStatusColor(status);
  };

  const getStatusText = (status: DocumentStatus) => {
    return DocumentSubmissionManager.getStatusText(status);
  };

  const filteredSubmissions = submissions.filter(submission => 
    filterStatus === 'all' || submission.status === filterStatus
  );

  const handleViewDetails = (submission: DocumentSubmission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const handleDownload = (submission: DocumentSubmission) => {
    if (submission.status === 'approved') {
      // สร้างไฟล์ PDF หรือ ZIP สำหรับดาวน์โหลด
      console.log('Downloading submission:', submission.id);
      alert('ดาวน์โหลดเอกสารเรียบร้อยแล้ว!');
    } else {
      alert('เอกสารยังไม่ได้รับการอนุมัติ ไม่สามารถดาวน์โหลดได้');
    }
  };

  const handleResubmit = (submission: DocumentSubmission) => {
    if (submission.status === 'needs_correction' || submission.status === 'rejected') {
      // นำไปยังหน้าแก้ไขเอกสาร
      window.location.href = `/citizen/submit-documents/start?edit=${submission.id}`;
    }
  };

  const getStats = () => {
    return DocumentSubmissionManager.getSubmissionStats('current_user');
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ประวัติการยื่นเอกสาร
            </h1>
            <p className="text-gray-600">
              ติดตามสถานะการยื่นเอกสารของคุณ
            </p>
          </div>

          {/* สถิติ */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">ทั้งหมด</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">รอตรวจสอบ</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.underReview}</div>
              <div className="text-sm text-gray-600">กำลังตรวจสอบ</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-gray-600">อนุมัติแล้ว</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected + stats.needsCorrection}</div>
              <div className="text-sm text-gray-600">ต้องแก้ไข</div>
            </div>
          </div>

          {/* ตัวกรอง */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ทั้งหมด ({stats.total})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                รอตรวจสอบ ({stats.pending})
              </button>
              <button
                onClick={() => setFilterStatus('under_review')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === 'under_review'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                กำลังตรวจสอบ ({stats.underReview})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === 'approved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                อนุมัติแล้ว ({stats.approved})
              </button>
              <button
                onClick={() => setFilterStatus('needs_correction')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === 'needs_correction'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ต้องแก้ไข ({stats.needsCorrection})
              </button>
            </div>
          </div>

          {/* รายการยื่นเอกสาร */}
          <div className="space-y-4">
            {filteredSubmissions.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ไม่พบการยื่นเอกสาร
                </h3>
                <p className="text-gray-600 mb-4">
                  ยังไม่มีการยื่นเอกสารในสถานะนี้
                </p>
                <Link
                  href="/citizen/submit-documents/start"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  เริ่มยื่นเอกสาร
                </Link>
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {submission.documentType === 'building_permit' && '🏗️'}
                        {submission.documentType === 'business_license' && '🏢'}
                        {submission.documentType === 'driving_license' && '🚗'}
                        {submission.documentType === 'passport' && '📘'}
                        {submission.documentType === 'marriage_certificate' && '💒'}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {submission.documentTypeName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ส่งเมื่อ: {submission.submittedAt.toLocaleDateString('th-TH')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                        {getStatusText(submission.status)}
                      </span>
                      <button
                        onClick={() => handleViewDetails(submission)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* แถบความคืบหน้า */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>ความคืบหน้า</span>
                      <span>{submission.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${submission.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* ไฟล์แนบ */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <PaperClipIcon className="h-4 w-4" />
                      <span>ไฟล์แนบ: {Object.keys(submission.files).length} ไฟล์</span>
                    </div>
                  </div>

                  {/* หมายเหตุจากเจ้าหน้าที่ */}
                  {submission.reviewNotes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">หมายเหตุจากเจ้าหน้าที่:</p>
                          <p className="text-sm text-yellow-700">{submission.reviewNotes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ปุ่มดำเนินการ */}
                  <div className="flex justify-end space-x-3">
                    {submission.status === 'approved' && (
                      <button
                        onClick={() => handleDownload(submission)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        <span>ดาวน์โหลด</span>
                      </button>
                    )}
                    
                    {(submission.status === 'needs_correction' || submission.status === 'rejected') && (
                      <button
                        onClick={() => handleResubmit(submission)}
                        className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                        <span>แก้ไขเอกสาร</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleViewDetails(submission)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>ดูรายละเอียด</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal รายละเอียด */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  รายละเอียดการยื่นเอกสาร
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">ประเภทเอกสาร</h3>
                  <p className="text-gray-600">{selectedSubmission.documentTypeName}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">สถานะ</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSubmission.status)}`}>
                    {getStatusText(selectedSubmission.status)}
                  </span>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">ไฟล์แนบ</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedSubmission.files).map(([docName, file]) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">
                            {file.type.startsWith('image/') ? '🖼️' : '📄'}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">{docName}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedSubmission.reviewNotes && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">หมายเหตุจากเจ้าหน้าที่</h3>
                    <p className="text-gray-600 bg-yellow-50 p-3 rounded-lg">
                      {selectedSubmission.reviewNotes}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    ปิด
                  </button>
                  {selectedSubmission.status === 'approved' && (
                    <button
                      onClick={() => handleDownload(selectedSubmission)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      ดาวน์โหลด
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
