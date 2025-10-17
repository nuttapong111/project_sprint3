'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, CookieIcon, ShieldCheckIcon, CogIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiePolicyModal({ isOpen, onClose }: CookiePolicyModalProps) {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    onClose();
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    onClose();
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setCookiePreferences(onlyNecessary);
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary));
    onClose();
  };

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'คุกกี้ที่จำเป็น',
      description: 'คุกกี้ที่จำเป็นสำหรับการทำงานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้',
      required: true
    },
    {
      id: 'analytics',
      name: 'คุกกี้วิเคราะห์',
      description: 'ช่วยให้เราวิเคราะห์การใช้งานเว็บไซต์เพื่อปรับปรุงบริการ',
      required: false
    },
    {
      id: 'marketing',
      name: 'คุกกี้การตลาด',
      description: 'ใช้เพื่อแสดงโฆษณาที่เกี่ยวข้องกับความสนใจของคุณ',
      required: false
    },
    {
      id: 'functional',
      name: 'คุกกี้ฟังก์ชัน',
      description: 'ช่วยให้เว็บไซต์จดจำการตั้งค่าและความชอบของคุณ',
      required: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
            >
              {/* Header */}
              <div className="bg-primary-50 px-6 py-4 border-b border-primary-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <CookieIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">นโยบายคุกกี้</h3>
                      <p className="text-sm text-gray-600">จัดการการตั้งค่าคุกกี้ของคุณ</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ 
                    คุณสามารถเลือกประเภทคุกกี้ที่ต้องการอนุญาตได้
                  </p>
                </div>

                {/* Cookie Types */}
                <div className="space-y-4 mb-6">
                  {cookieTypes.map((type) => (
                    <div key={type.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{type.name}</h4>
                            {type.required && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                จำเป็น
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                        <div className="ml-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={cookiePreferences[type.id as keyof typeof cookiePreferences]}
                              onChange={(e) => {
                                if (!type.required) {
                                  setCookiePreferences(prev => ({
                                    ...prev,
                                    [type.id]: e.target.checked
                                  }));
                                }
                              }}
                              disabled={type.required}
                              className="sr-only peer"
                            />
                            <div className={`w-11 h-6 rounded-full peer transition-colors ${
                              cookiePreferences[type.id as keyof typeof cookiePreferences] 
                                ? 'bg-primary-600' 
                                : 'bg-gray-200'
                            } ${type.required ? 'opacity-50' : ''}`}>
                              <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                                cookiePreferences[type.id as keyof typeof cookiePreferences] 
                                  ? 'translate-x-5' 
                                  : 'translate-x-0.5'
                              } mt-0.5`} />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">ข้อมูลเพิ่มเติม</h4>
                      <p className="text-sm text-blue-800">
                        ข้อมูลส่วนบุคคลของคุณจะถูกเก็บรักษาอย่างปลอดภัยตามนโยบายความเป็นส่วนตัว 
                        คุณสามารถเปลี่ยนการตั้งค่าได้ตลอดเวลา
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <div className="flex space-x-3">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ปฏิเสธทั้งหมด
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    บันทึกการตั้งค่า
                  </button>
                </div>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  ยอมรับทั้งหมด
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
