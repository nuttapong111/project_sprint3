'use client';

import { useState } from 'react';
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
  ExclamationCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Header from '@/components/Header';

export default function CitizenDashboard() {
  const [user] = useState({
    name: 'สมชาย ใจดี',
    thaiId: '1234567890123',
    userType: 'citizen'
  });

  const quickActions = [
    { name: 'กระเป๋าเอกสารดิจิทัล', href: '/citizen/digital-wallet', icon: DocumentTextIcon, color: 'blue' },
    { name: 'แจ้งความออนไลน์', href: '/citizen/report-crime', icon: ExclamationTriangleIcon, color: 'red' },
    { name: 'ยื่นเอกสารออนไลน์', href: '/citizen/submit-documents', icon: ClipboardDocumentListIcon, color: 'green' },
    { name: 'พบแพทย์', href: '/citizen/medical-appointment', icon: HeartIcon, color: 'purple' },
  ];

  const recentActivities = [
    { id: 1, type: 'success', title: 'ยื่นคำขอใบอนุญาตขับขี่', time: '2 ชั่วโมงที่แล้ว', status: 'อนุมัติแล้ว' },
    { id: 2, type: 'pending', title: 'นัดหมายแพทย์', time: '1 วันที่แล้ว', status: 'รอการยืนยัน' },
    { id: 3, type: 'info', title: 'อัปเดตข้อมูลบัตรประชาชน', time: '3 วันที่แล้ว', status: 'เสร็จสิ้น' },
    { id: 4, type: 'warning', title: 'แจ้งความออนไลน์', time: '1 สัปดาห์ที่แล้ว', status: 'อยู่ระหว่างดำเนินการ' },
  ];

  const notifications = [
    { id: 1, title: 'เอกสารใกล้หมดอายุ', message: 'บัตรประชาชนดิจิทัลของคุณจะหมดอายุใน 30 วัน', type: 'warning', time: '2 นาทีที่แล้ว' },
    { id: 2, title: 'นัดหมายแพทย์ยืนยัน', message: 'นัดหมายแพทย์วันที่ 15 มกราคม 2567 ยืนยันแล้ว', type: 'success', time: '1 ชั่วโมงที่แล้ว' },
    { id: 3, title: 'เอกสารอนุมัติ', message: 'คำขอใบอนุญาตก่อสร้างได้รับการอนุมัติเรียบร้อย', type: 'info', time: 'เมื่อวานนี้' },
  ];

  const stats = [
    { name: 'เอกสารดิจิทัล', value: '5', change: '+2', changeType: 'positive' },
    { name: 'คำขอที่รอดำเนินการ', value: '3', change: '-1', changeType: 'negative' },
    { name: 'นัดหมายแพทย์', value: '2', change: '+1', changeType: 'positive' },
    { name: 'การแจ้งเตือน', value: '8', change: '+3', changeType: 'positive' },
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending': return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'warning': return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      default: return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'warning': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">ยินดีต้อนรับ {user.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">บริการด่วน</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Link
                      key={action.name}
                      href={action.href}
                      className="group p-6 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-200 transition-colors`}>
                          <IconComponent className={`h-6 w-6 text-${action.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {action.name}
                          </h3>
                          <p className="text-sm text-gray-600">คลิกเพื่อเข้าสู่บริการ</p>
                        </div>
                        <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">การแจ้งเตือน</h2>
              <Link href="/citizen/notifications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                ดูทั้งหมด
              </Link>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getStatusIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">กิจกรรมล่าสุด</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(activity.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.type)}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/citizen/activities" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                ดูกิจกรรมทั้งหมด
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
