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
  PencilSquareIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import { DocumentSubmissionManager, DocumentSubmission, DocumentStatus } from '@/lib/documentSubmission';

export default function DocumentReviewPage() {
  const [submissions, setSubmissions] = useState<DocumentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<DocumentSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | 'all'>('all');
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const allSubmissions = DocumentSubmissionManager.getAllSubmissions();
    setSubmissions(allSubmissions);
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
    setReviewNotes(submission.reviewNotes || '');
  };

  const handleStatusChange = (submissionId: string, newStatus: DocumentStatus) => {
    const success = DocumentSubmissionManager.updateSubmissionStatus(
      submissionId,
      newStatus,
      'เจ้าหน้าที่ตรวจสอบ',
      reviewNotes
    );
    
    if (success) {
      loadSubmissions();
      setShowModal(false);
      alert(`อัปเดตสถานะเป็น "${getStatusText(newStatus)}" เรียบร้อยแล้ว`);
    } else {
      alert('เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    }
  };

  const getStats = () => {
    const allSubmissions = DocumentSubmissionManager.getAllSubmissions();
    return {
      total: allSubmissions.length,
      pending: allSubmissions.filter(s => s.status === 'pending').length,
      underReview: allSubmissions.filter(s => s.status === 'under_review').length,
      approved: allSubmissions.filter(s => s.status === 'approved').length,
      rejected: allSubmissions.filter(s => s.status === 'rejected').length,
      needsCorrection: allSubmissions.filter(s => s.status === 'needs_correction').length
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="officer" />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ตรวจสอบการยื่นเอกสาร
            </h1>
            <p className="text-gray-600">
              ตรวจสอบและอนุมัติการยื่นเอกสารของประชาชน
            </p>
          </div>

          {/* สถิติ */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
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
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">ปฏิเสธ</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.needsCorrection}</div>
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
                onClick={() => setFilterStatus('rejected')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === 'rejected'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ปฏิเสธ ({stats.rejected})
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
                <p className="text-gray-600">
                  ยังไม่มีการยื่นเอกสารในสถานะนี้
                </p>
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

                  {/* ข้อมูลผู้ยื่น */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <UserIcon className="h-4 w-4" />
                      <span>{submission.personalInfo.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{submission.personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{submission.personalInfo.address}</span>
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

                  {/* ปุ่มดำเนินการ */}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleViewDetails(submission)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>ตรวจสอบ</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal รายละเอียดและอนุมัติ */}
      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  ตรวจสอบการยื่นเอกสาร
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ข้อมูลการยื่นเอกสาร */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">ข้อมูลการยื่นเอกสาร</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ประเภท:</span>
                        <span className="font-medium">{selectedSubmission.documentTypeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">สถานะ:</span>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedSubmission.status)}`}>
                          {getStatusText(selectedSubmission.status)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ส่งเมื่อ:</span>
                        <span>{selectedSubmission.submittedAt.toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>
                  </div>

                  {/* ข้อมูลผู้ยื่น */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">ข้อมูลผู้ยื่น</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ชื่อ:</span>
                        <span className="font-medium">{selectedSubmission.personalInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">โทรศัพท์:</span>
                        <span>{selectedSubmission.personalInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">อีเมล:</span>
                        <span>{selectedSubmission.personalInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ที่อยู่:</span>
                        <span className="text-right max-w-xs">{selectedSubmission.personalInfo.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* ไฟล์แนบ */}
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
                </div>

                {/* ฟอร์มตรวจสอบ */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">การตรวจสอบ</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        หมายเหตุการตรวจสอบ
                      </label>
                      <textarea
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="กรอกหมายเหตุการตรวจสอบ..."
                      />
                    </div>
                  </div>

                  {/* ปุ่มอนุมัติ/ปฏิเสธ */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">การดำเนินการ</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={() => handleStatusChange(selectedSubmission.id, 'approved')}
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                        <span>อนุมัติ</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedSubmission.id, 'needs_correction')}
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                        <span>ขอแก้ไข</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedSubmission.id, 'rejected')}
                        className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <XCircleIcon className="h-5 w-5" />
                        <span>ปฏิเสธ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ปุ่มปิด */}
              <div className="flex justify-end mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
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
