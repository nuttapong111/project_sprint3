'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ShieldExclamationIcon,
  EyeIcon,
  TrashIcon,
  MarkAsReadIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
  category: 'document' | 'appointment' | 'system' | 'security';
}

const mockNotifications: Notification[] = [
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
    type: 'info',
    title: 'การนัดหมายแพทย์',
    message: 'คุณมีการนัดหมายแพทย์ที่โรงพยาบาลศิริราชในวันพรุ่งนี้',
    time: '3 วันที่แล้ว',
    read: true,
    category: 'appointment'
  },
  {
    id: 6,
    type: 'success',
    title: 'การแจ้งความเสร็จสิ้น',
    message: 'การแจ้งความเรื่องการทุจริตได้รับการดำเนินการเรียบร้อย',
    time: '1 สัปดาห์ที่แล้ว',
    read: true,
    category: 'document'
  }
];

const categories = [
  { id: 'all', name: 'ทั้งหมด', count: mockNotifications.length },
  { id: 'unread', name: 'ยังไม่อ่าน', count: mockNotifications.filter(n => !n.read).length },
  { id: 'document', name: 'เอกสาร', count: mockNotifications.filter(n => n.category === 'document').length },
  { id: 'appointment', name: 'การนัดหมาย', count: mockNotifications.filter(n => n.category === 'appointment').length },
  { id: 'system', name: 'ระบบ', count: mockNotifications.filter(n => n.category === 'system').length },
  { id: 'security', name: 'ความปลอดภัย', count: mockNotifications.filter(n => n.category === 'security').length }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const filteredNotifications = notifications.filter(notification => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'unread') return !notification.read;
    return notification.category === selectedCategory;
  });

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'info': return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'error': return <ShieldExclamationIcon className="h-5 w-5 text-red-500" />;
    }
  };

  const getBorderColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'border-l-green-400';
      case 'warning': return 'border-l-yellow-400';
      case 'info': return 'border-l-blue-400';
      case 'error': return 'border-l-red-400';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleSelect = (id: number) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(n => n !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                การแจ้งเตือน
              </h1>
              <p className="text-gray-600">
                จัดการการแจ้งเตือนและข้อมูลสำคัญ
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={markAllAsRead}
                className="btn-secondary flex items-center space-x-2"
              >
                <MarkAsReadIcon className="h-4 w-4" />
                <span>อ่านทั้งหมด</span>
              </button>
              {selectedNotifications.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>ลบที่เลือก ({selectedNotifications.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                หมวดหมู่
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedCategory === category.id
                          ? 'bg-primary-200 text-primary-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    ไม่มีการแจ้งเตือน
                  </h3>
                  <p className="text-gray-600">
                    {selectedCategory === 'unread' 
                      ? 'ไม่มีการแจ้งเตือนที่ยังไม่อ่าน'
                      : 'ไม่มีการแจ้งเตือนในหมวดหมู่นี้'
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleSelect(notification.id)}
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />

                        {/* Icon */}
                        <div className="flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className={`text-sm font-medium ${
                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                              )}
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                  title="ทำเครื่องหมายว่าอ่านแล้ว"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 text-gray-400 hover:text-red-600"
                                  title="ลบการแจ้งเตือน"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}