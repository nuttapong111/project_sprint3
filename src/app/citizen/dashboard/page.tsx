'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  BellIcon,
  CogIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';

const quickActions = [
  {
    name: 'กระเป๋าเอกสารดิจิทัล',
    href: '/citizen/digital-wallet',
    icon: DocumentTextIcon,
    color: 'bg-blue-500',
    description: 'จัดการเอกสารดิจิทัล'
  },
  {
    name: 'แจ้งความออนไลน์',
    href: '/citizen/report-crime',
    icon: ExclamationTriangleIcon,
    color: 'bg-red-500',
    description: 'แจ้งความผ่านระบบออนไลน์'
  },
  {
    name: 'ยื่นเอกสารออนไลน์',
    href: '/citizen/submit-documents',
    icon: ClipboardDocumentListIcon,
    color: 'bg-green-500',
    description: 'ยื่นเอกสารต่างๆ ทางออนไลน์'
  },
  {
    name: 'พบแพทย์',
    href: '/citizen/medical-appointment',
    icon: HeartIcon,
    color: 'bg-pink-500',
    description: 'นัดหมายแพทย์และตรวจสอบสิทธิ์'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'document',
    title: 'ดาวน์โหลดบัตรประชาชน',
    time: '2 ชั่วโมงที่แล้ว',
    status: 'completed',
    icon: CheckCircleIcon,
    color: 'text-green-500'
  },
  {
    id: 2,
    type: 'appointment',
    title: 'นัดหมายแพทย์ - โรงพยาบาลศิริราช',
    time: 'เมื่อวานนี้',
    status: 'pending',
    icon: ClockIcon,
    color: 'text-yellow-500'
  },
  {
    id: 3,
    type: 'report',
    title: 'แจ้งความ - เรื่องการทุจริต',
    time: '3 วันที่แล้ว',
    status: 'processing',
    icon: ExclamationCircleIcon,
    color: 'text-blue-500'
  }
];

const stats = [
  {
    title: 'เอกสารดิจิทัล',
    value: '4',
    change: '+1 เอกสารใหม่',
    changeType: 'positive',
    icon: DocumentTextIcon
  },
  {
    title: 'การนัดหมาย',
    value: '2',
    change: '1 รอการยืนยัน',
    changeType: 'neutral',
    icon: HeartIcon
  },
  {
    title: 'คำร้องที่ยื่น',
    value: '3',
    change: '2 กำลังดำเนินการ',
    changeType: 'neutral',
    icon: ClipboardDocumentListIcon
  },
  {
    title: 'การแจ้งเตือน',
    value: '5',
    change: '2 ยังไม่อ่าน',
    changeType: 'warning',
    icon: BellIcon
  }
];

export default function CitizenDashboard() {
  const [activities] = useState(recentActivities);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ยินดีต้อนรับ, สมชาย ใจดี
          </h1>
          <p className="text-gray-600">
            ภาพรวมการใช้งานแพลตฟอร์มดิจิทัลภาครัฐ
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className={`text-xs ${
                      stat.changeType === 'positive' ? 'text-green-600' :
                      stat.changeType === 'warning' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              บริการหลัก
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <motion.a
                    key={action.name}
                    href={action.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {action.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              กิจกรรมล่าสุด
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="space-y-4">
                  {activities.map((activity, index) => {
                    const IconComponent = activity.icon;
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className={`p-2 rounded-lg bg-gray-100`}>
                          <IconComponent className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status === 'completed' ? 'เสร็จสิ้น' :
                           activity.status === 'pending' ? 'รอดำเนินการ' :
                           'กำลังดำเนินการ'}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a
                    href="/citizen/notifications"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    ดูทั้งหมด →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}