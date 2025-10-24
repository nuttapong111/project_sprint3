'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CalendarIcon,
  UserGroupIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Link from 'next/link';
import { DocumentSubmissionManager } from '@/lib/documentSubmission';
import { ReportStatusManager } from '@/lib/reportStatus';

interface OfficerStats {
  totalReports: number;
  totalSubmissions: number;
  pendingReports: number;
  pendingSubmissions: number;
  approvedReports: number;
  approvedSubmissions: number;
  rejectedReports: number;
  rejectedSubmissions: number;
  todayReports: number;
  todaySubmissions: number;
}

export default function OfficerDashboardPage() {
  const [stats, setStats] = useState<OfficerStats>({
    totalReports: 0,
    totalSubmissions: 0,
    pendingReports: 0,
    pendingSubmissions: 0,
    approvedReports: 0,
    approvedSubmissions: 0,
    rejectedReports: 0,
    rejectedSubmissions: 0,
    todayReports: 0,
    todaySubmissions: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const allReports = ReportStatusManager.getAllReports();
    const allSubmissions = DocumentSubmissionManager.getAllSubmissions();
    
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    setStats({
      totalReports: allReports.length,
      totalSubmissions: allSubmissions.length,
      pendingReports: allReports.filter(r => r.status === 'pending').length,
      pendingSubmissions: allSubmissions.filter(s => s.status === 'pending').length,
      approvedReports: allReports.filter(r => r.status === 'approved').length,
      approvedSubmissions: allSubmissions.filter(s => s.status === 'approved').length,
      rejectedReports: allReports.filter(r => r.status === 'rejected').length,
      rejectedSubmissions: allSubmissions.filter(s => s.status === 'rejected').length,
      todayReports: allReports.filter(r => r.submittedAt >= todayStart).length,
      todaySubmissions: allSubmissions.filter(s => s.submittedAt >= todayStart).length
    });
  };

  const statCards = [
    {
      title: 'บันทึกประจำวันวันนี้',
      value: stats.todayReports,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      href: '/officer/reports',
      description: 'รายการใหม่ที่ต้องตรวจสอบ'
    },
    {
      title: 'การยื่นเอกสารวันนี้',
      value: stats.todaySubmissions,
      icon: ClipboardDocumentListIcon,
      color: 'bg-green-500',
      href: '/officer/document-review',
      description: 'เอกสารใหม่ที่ต้องตรวจสอบ'
    },
    {
      title: 'รอตรวจสอบทั้งหมด',
      value: stats.pendingReports + stats.pendingSubmissions,
      icon: ClockIcon,
      color: 'bg-yellow-500',
      href: '#',
      description: 'รายการที่รอการตรวจสอบ'
    },
    {
      title: 'อนุมัติแล้วทั้งหมด',
      value: stats.approvedReports + stats.approvedSubmissions,
      icon: CheckCircleIcon,
      color: 'bg-blue-500',
      href: '#',
      description: 'รายการที่อนุมัติแล้ว'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'report',
      title: 'บันทึกประจำวันใหม่',
      description: 'การลักทรัพย์ - สมชาย ใจดี',
      time: '2 นาทีที่แล้ว',
      status: 'pending',
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-600',
      href: '/officer/reports'
    },
    {
      id: '2',
      type: 'submission',
      title: 'การยื่นเอกสารใหม่',
      description: 'ใบอนุญาตก่อสร้าง - สมหญิง รักดี',
      time: '5 นาทีที่แล้ว',
      status: 'pending',
      icon: ClipboardDocumentListIcon,
      color: 'text-blue-600',
      href: '/officer/document-review'
    },
    {
      id: '3',
      type: 'report',
      title: 'อนุมัติบันทึกประจำวัน',
      description: 'การทุจริต - อนุมัติแล้ว',
      time: '10 นาทีที่แล้ว',
      status: 'approved',
      icon: CheckCircleIcon,
      color: 'text-green-600',
      href: '/officer/reports'
    },
    {
      id: '4',
      type: 'submission',
      title: 'อนุมัติการยื่นเอกสาร',
      description: 'ใบขับขี่ - อนุมัติแล้ว',
      time: '15 นาทีที่แล้ว',
      status: 'approved',
      icon: CheckCircleIcon,
      color: 'text-green-600',
      href: '/officer/document-review'
    }
  ];

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              แดชบอร์ดเจ้าหน้าที่
            </h1>
            <p className="text-gray-600">
              ภาพรวมงานที่ต้องตรวจสอบและอนุมัติ
            </p>
          </div>

          {/* สถิติหลัก */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" />
        </div>
                  <Link
                    href={card.href}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>
      </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
              </motion.div>
          ))}
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* กิจกรรมล่าสุด */}
          <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
                    กิจกรรมล่าสุด
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg"
                      >
                        <div className={`p-2 rounded-full bg-gray-100`}>
                          <activity.icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                    <Link
                            href={activity.href}
                            className="text-sm font-medium text-gray-900 hover:text-blue-600"
                          >
                            {activity.title}
                          </Link>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.status === 'pending' ? 'รอตรวจสอบ' :
                             activity.status === 'approved' ? 'อนุมัติแล้ว' :
                             'ไม่ทราบสถานะ'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                        </div>
                      </div>
              </div>
            </div>

            {/* สถิติรายละเอียด */}
            <div className="space-y-6">
              {/* สถิติบันทึกประจำวัน */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-red-600" />
                  บันทึกประจำวัน
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">รอตรวจสอบ</span>
                    <span className="font-semibold text-yellow-600">{stats.pendingReports}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">อนุมัติแล้ว</span>
                    <span className="font-semibold text-green-600">{stats.approvedReports}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ปฏิเสธ</span>
                    <span className="font-semibold text-red-600">{stats.rejectedReports}</span>
            </div>
          </div>
                <div className="mt-4">
                  <Link
                    href="/officer/reports"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 text-center block"
                  >
                    ตรวจสอบบันทึกประจำวัน
              </Link>
            </div>
              </div>

              {/* สถิติการยื่นเอกสาร */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2 text-green-600" />
                  การยื่นเอกสาร
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">รอตรวจสอบ</span>
                    <span className="font-semibold text-yellow-600">{stats.pendingSubmissions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">อนุมัติแล้ว</span>
                    <span className="font-semibold text-green-600">{stats.approvedSubmissions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ปฏิเสธ</span>
                    <span className="font-semibold text-red-600">{stats.rejectedSubmissions}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/officer/document-review"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-center block"
                  >
                    ตรวจสอบการยื่นเอกสาร
                  </Link>
          </div>
        </div>

              {/* เครื่องมือด่วน */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 mr-2 text-blue-600" />
                  เครื่องมือด่วน
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/officer/reports"
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 block"
                  >
                    <div className="flex items-center space-x-3">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">ตรวจสอบบันทึกประจำวัน</p>
                        <p className="text-sm text-gray-600">ดูและอนุมัติบันทึกประจำวัน</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/officer/document-review"
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 block"
                  >
                    <div className="flex items-center space-x-3">
                      <ClipboardDocumentListIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">ตรวจสอบการยื่นเอกสาร</p>
                        <p className="text-sm text-gray-600">ดูและอนุมัติการยื่นเอกสาร</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/officer/digital-wallet"
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 block"
                  >
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="h-5 w-5 text-purple-600" />
                    <div>
                        <p className="font-medium text-gray-900">จัดการกระเป๋าเอกสาร</p>
                        <p className="text-sm text-gray-600">เพิ่มเอกสารให้ประชาชน</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/officer/requests"
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 block"
                  >
                    <div className="flex items-center space-x-3">
                      <UserGroupIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">จัดการคำขอ</p>
                        <p className="text-sm text-gray-600">จัดการคำขออื่นๆ</p>
                    </div>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}