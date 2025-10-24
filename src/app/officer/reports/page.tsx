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
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import { ReportStatusManager, DailyReport, ReportStatus } from '@/lib/reportStatus';
import { PDFGenerator } from '@/lib/pdfGenerator';

export default function OfficerReportsPage() {
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<DailyReport | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<ReportStatus | 'all'>('all');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    const allReports = ReportStatusManager.getAllReports();
    setReports(allReports);
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return 'รอการตรวจสอบ';
      case 'approved':
        return 'อนุมัติแล้ว';
      case 'rejected':
        return 'ปฏิเสธ';
      case 'under_review':
        return 'อยู่ระหว่างการตรวจสอบ';
      default:
        return 'ไม่ทราบสถานะ';
    }
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-4 w-4" />;
      case 'approved':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'rejected':
        return <XCircleIcon className="h-4 w-4" />;
      case 'under_review':
        return <EyeIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const handleApprove = (reportId: string) => {
    const success = ReportStatusManager.updateReportStatus(
      reportId,
      'approved',
      'เจ้าหน้าที่ (จำลอง)',
      reviewNotes,
      `#download-${reportId}`
    );
    
    if (success) {
      setShowModal(false);
      setSelectedReport(null);
      setReviewNotes('');
      loadReports();
      alert('อนุมัติบันทึกประจำวันเรียบร้อยแล้ว');
    }
  };

  const handleReject = (reportId: string) => {
    if (!reviewNotes.trim()) {
      alert('กรุณาใส่เหตุผลในการปฏิเสธ');
      return;
    }

    const success = ReportStatusManager.updateReportStatus(
      reportId,
      'rejected',
      'เจ้าหน้าที่ (จำลอง)',
      reviewNotes
    );
    
    if (success) {
      setShowModal(false);
      setSelectedReport(null);
      setReviewNotes('');
      loadReports();
      alert('ปฏิเสธบันทึกประจำวันเรียบร้อยแล้ว');
    }
  };

  const handleReview = (reportId: string) => {
    const success = ReportStatusManager.updateReportStatus(
      reportId,
      'under_review',
      'เจ้าหน้าที่ (จำลอง)',
      reviewNotes
    );
    
    if (success) {
      setShowModal(false);
      setSelectedReport(null);
      setReviewNotes('');
      loadReports();
      alert('เปลี่ยนสถานะเป็นอยู่ระหว่างการตรวจสอบแล้ว');
    }
  };

  const filteredReports = reports.filter(report => 
    filterStatus === 'all' || report.status === filterStatus
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="officer" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ตรวจสอบบันทึกประจำวัน
          </h1>
          <p className="text-gray-600">
            ตรวจสอบและอนุมัติบันทึกประจำวันจากประชาชน
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'all' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              ทั้งหมด ({reports.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'pending' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              รอการตรวจสอบ ({ReportStatusManager.getPendingReports().length})
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'approved' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              อนุมัติแล้ว ({ReportStatusManager.getApprovedReports().length})
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'rejected' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              ปฏิเสธ ({ReportStatusManager.getRejectedReports().length})
            </button>
          </div>
        </div>

        {/* Reports List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    บันทึกประจำวัน #{report.id.substring(0, 8)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ประเภท: {report.reportType}
                  </p>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {getStatusIcon(report.status)}
                  <span>{getStatusText(report.status)}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <UserIcon className="h-4 w-4 mr-2" />
                  <span>{report.personalInfo.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{report.submittedAt.toLocaleDateString('th-TH')}</span>
                </div>
                {report.attachments && report.attachments.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <PaperClipIcon className="h-4 w-4 mr-2" />
                    <span>แนบไฟล์ {report.attachments.length} ไฟล์</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedReport(report);
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>ดูรายละเอียด</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">ไม่มีรายการบันทึกประจำวัน</p>
          </div>
        )}

        {/* Review Modal */}
        {showModal && selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    รายละเอียดบันทึกประจำวัน
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลผู้บันทึก</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">{selectedReport.personalInfo.name}</span>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">{selectedReport.personalInfo.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">{selectedReport.personalInfo.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">รายละเอียดการบันทึก</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedReport.userAnswers).map(([question, answer], index) => (
                        <div key={index} className="border-l-4 border-primary-500 pl-4">
                          <p className="font-medium text-gray-900 text-sm mb-1">{question}</p>
                          <p className="text-gray-700 text-sm">{answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                {selectedReport.attachments && selectedReport.attachments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">ไฟล์แนบ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedReport.attachments.map((attachment, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                              <PaperClipIcon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(attachment.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Review Notes */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    หมายเหตุการตรวจสอบ
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="ใส่หมายเหตุการตรวจสอบ..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={() => handleReview(selectedReport.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    อยู่ระหว่างการตรวจสอบ
                  </button>
                  <button
                    onClick={() => handleReject(selectedReport.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    ปฏิเสธ
                  </button>
                  <button
                    onClick={() => handleApprove(selectedReport.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    อนุมัติ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
