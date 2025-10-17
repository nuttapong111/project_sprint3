'use client';

import { useState } from 'react';
import { 
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  BellIcon,
  CogIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Header from '@/components/Header';

export default function OfficerDashboard() {
  const [user] = useState({
    name: 'นางสาว รัฐบาล',
    thaiId: '4567890123456',
    userType: 'officer',
    department: 'กรมการปกครอง',
    position: 'เจ้าหน้าที่ทะเบียน'
  });

  const quickActions = [
    { name: 'จัดการคำขอ', href: '/officer/requests', icon: ClipboardDocumentListIcon, color: 'blue' },
    { name: 'ตรวจสอบเอกสาร', href: '/officer/documents', icon: DocumentTextIcon, color: 'green' },
    { name: 'รายงาน', href: '/officer/reports', icon: ExclamationTriangleIcon, color: 'red' },
    { name: 'การแจ้งเตือน', href: '/officer/notifications', icon: BellIcon, color: 'purple' },
  ];

  const recentRequests = [
    { id: 1, type: 'success', title: 'คำขอใบอนุญาตขับขี่', time: '2 ชั่วโมงที่แล้ว', status: 'อนุมัติแล้ว', citizen: 'สมชาย ใจดี' },
    { id: 2, type: 'pending', title: 'คำขอใบอนุญาตก่อสร้าง', time: '1 วันที่แล้ว', status: 'รอการตรวจสอบ', citizen: 'สมหญิง รักดี' },
    { id: 3, type: 'warning', title: 'คำขอสูติบัตร', time: '3 วันที่แล้ว', status: 'ต้องแก้ไข', citizen: 'วิชัย สมบูรณ์' },
  ];

  const stats = [
    { name: 'คำขอทั้งหมด', value: '45', change: '+8', changeType: 'positive' },
    { name: 'รอดำเนินการ', value: '12', change: '-3', changeType: 'negative' },
    { name: 'อนุมัติแล้ว', value: '28', change: '+5', changeType: 'positive' },
    { name: 'ปฏิเสธ', value: '5', change: '+1', changeType: 'positive' },
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
      <Header isLoggedIn={true} userType="officer" />
      
      {/* Page Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard เจ้าหน้าที่</h1>
            <p className="text-gray-600">ยินดีต้อนรับ {user.name} - {user.position}</p>
            <p className="text-sm text-gray-500">{user.department}</p>
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">งานที่ต้องทำ</h2>
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
                          <p className="text-sm text-gray-600">คลิกเพื่อเข้าสู่งาน</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">คำขอล่าสุด</h2>
              <Link href="/officer/requests" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                ดูทั้งหมด
              </Link>
            </div>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getStatusIcon(request.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{request.title}</p>
                    <p className="text-sm text-gray-600 mt-1">ผู้ขอ: {request.citizen}</p>
                    <p className="text-xs text-gray-500 mt-1">{request.time}</p>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getStatusColor(request.type)}`}>
                      {request.status}
                    </span>
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
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(request.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">{request.title}</h3>
                      <p className="text-sm text-gray-600">ผู้ขอ: {request.citizen}</p>
                      <p className="text-sm text-gray-600">{request.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(request.type)}`}>
                    {request.status}
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
