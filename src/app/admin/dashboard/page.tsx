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
import { DocumentSubmissionManager } from '@/lib/documentSubmission';
import { ReportStatusManager } from '@/lib/reportStatus';
import { UserManagement } from '@/lib/userManagement';
import Link from 'next/link';

interface DashboardStats {
  totalUsers: number;
  totalReports: number;
  totalSubmissions: number;
  totalAppointments: number;
  pendingReports: number;
  pendingSubmissions: number;
  approvedReports: number;
  approvedSubmissions: number;
  rejectedReports: number;
  rejectedSubmissions: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalReports: 0,
    totalSubmissions: 0,
    totalAppointments: 0,
    pendingReports: 0,
    pendingSubmissions: 0,
    approvedReports: 0,
    approvedSubmissions: 0,
    rejectedReports: 0,
    rejectedSubmissions: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const allReports = ReportStatusManager.getAllReports();
    const allSubmissions = DocumentSubmissionManager.getAllSubmissions();
    const userStats = UserManagement.getUserStats();
    
    setStats({
      totalUsers: userStats.total,
      totalReports: allReports.length,
      totalSubmissions: allSubmissions.length,
      totalAppointments: 89, // Mock data
      pendingReports: allReports.filter(r => r.status === 'pending').length,
      pendingSubmissions: allSubmissions.filter(s => s.status === 'pending').length,
      approvedReports: allReports.filter(r => r.status === 'approved').length,
      approvedSubmissions: allSubmissions.filter(s => s.status === 'approved').length,
      rejectedReports: allReports.filter(r => r.status === 'rejected').length,
      rejectedSubmissions: allSubmissions.filter(s => s.status === 'rejected').length
    });
  };

  const statCards = [
    {
      title: 'ผู้ใช้งานทั้งหมด',
      value: stats.totalUsers.toLocaleString(),
      icon: UsersIcon,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'บันทึกประจำวัน',
      value: stats.totalReports.toLocaleString(),
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'การยื่นเอกสาร',
      value: stats.totalSubmissions.toLocaleString(),
      icon: ClipboardDocumentListIcon,
      color: 'bg-green-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'การนัดหมายแพทย์',
      value: stats.totalAppointments.toLocaleString(),
      icon: HeartIcon,
      color: 'bg-purple-500',
      change: '+5%',
      changeType: 'positive'
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
      color: 'text-yellow-600'
    },
    {
      id: '2',
      type: 'submission',
      title: 'การยื่นเอกสารใหม่',
      description: 'ใบอนุญาตก่อสร้าง - สมหญิง รักดี',
      time: '5 นาทีที่แล้ว',
      status: 'pending',
      icon: ClipboardDocumentListIcon,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'appointment',
      title: 'การนัดหมายแพทย์',
      description: 'อายุรกรรม - โรงพยาบาลศิริราช',
      time: '10 นาทีที่แล้ว',
      status: 'confirmed',
      icon: HeartIcon,
      color: 'text-green-600'
    },
    {
      id: '4',
      type: 'report',
      title: 'อนุมัติบันทึกประจำวัน',
      description: 'การทุจริต - อนุมัติแล้ว',
      time: '15 นาทีที่แล้ว',
      status: 'approved',
      icon: CheckCircleIcon,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="admin" />
      
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
              แดชบอร์ดแอดมิน
            </h1>
            <p className="text-gray-600">
              ภาพรวมระบบและสถิติการใช้งาน
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
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    <p className={`text-sm ${
                      card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {card.change} จากเดือนที่แล้ว
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
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
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                            activity.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.status === 'pending' ? 'รอตรวจสอบ' :
                             activity.status === 'approved' ? 'อนุมัติแล้ว' :
                             activity.status === 'confirmed' ? 'ยืนยันแล้ว' :
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
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${(stats.approvedReports / stats.totalReports) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    อัตราการอนุมัติ: {stats.totalReports > 0 ? Math.round((stats.approvedReports / stats.totalReports) * 100) : 0}%
                  </p>
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
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(stats.approvedSubmissions / stats.totalSubmissions) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    อัตราการอนุมัติ: {stats.totalSubmissions > 0 ? Math.round((stats.approvedSubmissions / stats.totalSubmissions) * 100) : 0}%
                  </p>
                </div>
              </div>

              {/* การจัดการระบบ */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 mr-2 text-blue-600" />
                  การจัดการระบบ
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/admin/users"
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 block"
                  >
                    <div className="flex items-center space-x-3">
                      <UserGroupIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">จัดการผู้ใช้งาน</p>
                        <p className="text-sm text-gray-600">ดูและจัดการบัญชีผู้ใช้</p>
                      </div>
                    </div>
                  </Link>
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <ChartBarIcon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">รายงานสถิติ</p>
                        <p className="text-sm text-gray-600">ดูรายงานและสถิติการใช้งาน</p>
                      </div>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">ตั้งค่าระบบ</p>
                        <p className="text-sm text-gray-600">จัดการการตั้งค่าระบบ</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}