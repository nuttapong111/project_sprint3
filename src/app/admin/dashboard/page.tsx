'use client';

import { useState } from 'react';
import { 
  HomeIcon,
  UserIcon,
  CogIcon,
  ExclamationTriangleIcon,
  BellIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Header from '@/components/Header';

export default function AdminDashboard() {
  const [user] = useState({
    name: 'ดร. ระบบดิจิทัล',
    thaiId: '7890123456789',
    userType: 'admin',
    department: 'สำนักงานพัฒนารัฐบาลดิจิทัล',
    position: 'ผู้ดูแลระบบหลัก'
  });

  const quickActions = [
    { name: 'จัดการผู้ใช้', href: '/admin/users', icon: UserGroupIcon, color: 'blue' },
    { name: 'จัดการระบบ', href: '/admin/system', icon: CogIcon, color: 'green' },
    { name: 'รายงาน', href: '/admin/reports', icon: ExclamationTriangleIcon, color: 'red' },
    { name: 'การแจ้งเตือน', href: '/admin/notifications', icon: BellIcon, color: 'purple' },
  ];

  const systemStats = [
    { name: 'ผู้ใช้ทั้งหมด', value: '1,234', change: '+45', changeType: 'positive' },
    { name: 'คำขอวันนี้', value: '89', change: '+12', changeType: 'positive' },
    { name: 'ระบบออนไลน์', value: '99.9%', change: '+0.1%', changeType: 'positive' },
    { name: 'ข้อผิดพลาด', value: '2', change: '-1', changeType: 'negative' },
  ];

  const recentActivities = [
    { id: 1, type: 'success', title: 'ผู้ใช้ใหม่ลงทะเบียน', time: '5 นาทีที่แล้ว', details: 'สมชาย ใจดี - ประชาชน' },
    { id: 2, type: 'info', title: 'อัปเดตระบบ', time: '1 ชั่วโมงที่แล้ว', details: 'เวอร์ชัน 1.2.3 ใช้งานได้' },
    { id: 3, type: 'warning', title: 'การเข้าสู่ระบบผิดปกติ', time: '2 ชั่วโมงที่แล้ว', details: 'IP: 192.168.1.100' },
    { id: 4, type: 'success', title: 'สำรองข้อมูล', time: '3 ชั่วโมงที่แล้ว', details: 'สำรองข้อมูลสำเร็จ' },
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'info': return <ShieldCheckIcon className="h-5 w-5 text-blue-500" />;
      case 'warning': return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error': return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default: return <CheckCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="admin" />
      
      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard ผู้ดูแลระบบ</h1>
            <p className="text-gray-600">ยินดีต้อนรับ {user.name} - {user.position}</p>
            <p className="text-sm text-gray-500">{user.department}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat) => (
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">การจัดการระบบ</h2>
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
                          <p className="text-sm text-gray-600">คลิกเพื่อเข้าสู่การจัดการ</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">สถานะระบบ</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-900">เว็บไซต์</span>
                </div>
                <span className="text-sm text-green-600 font-medium">ปกติ</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-900">ฐานข้อมูล</span>
                </div>
                <span className="text-sm text-green-600 font-medium">ปกติ</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-900">API</span>
                </div>
                <span className="text-sm text-green-600 font-medium">ปกติ</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-900">การสำรองข้อมูล</span>
                </div>
                <span className="text-sm text-yellow-600 font-medium">กำลังดำเนินการ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">กิจกรรมระบบล่าสุด</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(activity.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.type)}`}>
                    {activity.type === 'success' ? 'สำเร็จ' : 
                     activity.type === 'info' ? 'ข้อมูล' : 
                     activity.type === 'warning' ? 'เตือน' : 'ข้อผิดพลาด'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
