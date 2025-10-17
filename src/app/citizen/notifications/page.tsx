'use client';

import { useState } from 'react';
import { 
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  ClockIcon,
  TrashIcon,
  MarkAsReadIcon
} from '@heroicons/react/24/outline';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'เอกสารอนุมัติแล้ว',
      message: 'คำขอใบอนุญาตก่อสร้างของคุณได้รับการอนุมัติเรียบร้อย',
      time: '2 นาทีที่แล้ว',
      read: false,
      category: 'document'
    },
    {
      id: 2,
      type: 'warning',
      title: 'เอกสารใกล้หมดอายุ',
      message: 'บัตรประชาชนดิจิทัลของคุณจะหมดอายุใน 30 วัน',
      time: '1 ชั่วโมงที่แล้ว',
      read: false,
      category: 'document'
    },
    {
      id: 3,
      type: 'info',
      title: 'อัปเดตระบบ',
      message: 'มีการอัปเดตแพลตฟอร์มเพื่อเพิ่มประสิทธิภาพการใช้งาน',
      time: 'เมื่อวานนี้',
      read: true,
      category: 'system'
    },
    {
      id: 4,
      type: 'error',
      title: 'เข้าสู่ระบบล้มเหลว',
      message: 'ตรวจพบความพยายามในการเข้าสู่ระบบที่ไม่สำเร็จ',
      time: '2 วันที่แล้ว',
      read: false,
      category: 'security'
    },
    {
      id: 5,
      type: 'success',
      title: 'นัดหมายแพทย์ยืนยัน',
      message: 'นัดหมายแพทย์วันที่ 15 มกราคม 2567 ยืนยันแล้ว',
      time: '3 วันที่แล้ว',
      read: true,
      category: 'medical'
    },
    {
      id: 6,
      type: 'info',
      title: 'การแจ้งความอัปเดต',
      message: 'รายงานการขโมยรถจักรยานยนต์ของคุณอยู่ระหว่างการดำเนินการ',
      time: '1 สัปดาห์ที่แล้ว',
      read: true,
      category: 'crime'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'info': return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'error': return <ShieldExclamationIcon className="h-5 w-5 text-red-500" />;
      default: return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-400';
      case 'warning': return 'border-yellow-400';
      case 'info': return 'border-blue-400';
      case 'error': return 'border-red-400';
      default: return 'border-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'medical': return 'bg-green-100 text-green-800';
      case 'crime': return 'bg-red-100 text-red-800';
      case 'security': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'document': return 'เอกสาร';
      case 'medical': return 'การแพทย์';
      case 'crime': return 'การแจ้งความ';
      case 'security': return 'ความปลอดภัย';
      case 'system': return 'ระบบ';
      default: return 'อื่นๆ';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
  };

  const toggleSelection = (id: number) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(n => n !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  const deselectAll = () => {
    setSelectedNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">การแจ้งเตือน</h1>
              <p className="text-gray-600">จัดการการแจ้งเตือนทั้งหมดของคุณ</p>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="btn-secondary flex items-center"
                >
                  <MarkAsReadIcon className="h-5 w-5 mr-2" />
                  อ่านทั้งหมด
                </button>
              )}
              {selectedNotifications.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <TrashIcon className="h-5 w-5 mr-2" />
                  ลบที่เลือก
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BellIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ยังไม่อ่าน</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">อ่านแล้ว</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length - unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">วันนี้</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex space-x-2 mb-4 sm:mb-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'unread'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ยังไม่อ่าน
              </button>
              <button
                onClick={() => setFilter('document')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'document'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                เอกสาร
              </button>
              <button
                onClick={() => setFilter('medical')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'medical'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                การแพทย์
              </button>
            </div>
            <div className="flex items-center space-x-2">
              {selectedNotifications.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={selectAll}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    เลือกทั้งหมด
                  </button>
                  <button
                    onClick={deselectAll}
                    className="text-sm text-gray-600 hover:text-gray-700"
                  >
                    ยกเลิกการเลือก
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="card text-center py-12">
              <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีการแจ้งเตือน</h3>
              <p className="text-gray-600">ไม่มีข้อมูลการแจ้งเตือนที่ตรงกับเงื่อนไขการค้นหา</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`card transition-all duration-200 ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelection(notification.id)}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <div className={`flex-shrink-0 ${getBorderColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(notification.category)}`}>
                            {getCategoryText(notification.category)}
                          </span>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-primary-600 hover:text-primary-700 text-sm"
                          >
                            <MarkAsReadIcon className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-400 hover:text-red-600 text-sm"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
