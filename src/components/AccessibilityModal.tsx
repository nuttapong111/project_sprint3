'use client';

import { useState } from 'react';
import { XMarkIcon, EyeIcon, SpeakerWaveIcon, CursorArrowRaysIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityModal({ isOpen, onClose }: AccessibilityModalProps) {
  const [preferences, setPreferences] = useState({
    highContrast: false,
    largeText: false,
    textToSpeech: false,
    voiceControl: false
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleApply = () => {
    // Apply accessibility settings
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    if (preferences.largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }

    // Save preferences
    localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    onClose();
  };

  const accessibilityFeatures = [
    {
      id: 'highContrast',
      name: 'โหมดความคมชัดสูง',
      description: 'เพิ่มความคมชัดของสีและข้อความเพื่อให้อ่านง่ายขึ้น',
      icon: AdjustmentsHorizontalIcon,
      color: 'blue'
    },
    {
      id: 'largeText',
      name: 'ตัวอักษรขนาดใหญ่',
      description: 'ขยายขนาดตัวอักษรให้ใหญ่ขึ้นเพื่อความสะดวกในการอ่าน',
      icon: EyeIcon,
      color: 'green'
    },
    {
      id: 'textToSpeech',
      name: 'การอ่านเสียง',
      description: 'อ่านข้อความบนหน้าจอออกเสียงให้ฟัง',
      icon: SpeakerWaveIcon,
      color: 'purple'
    },
    {
      id: 'voiceControl',
      name: 'ควบคุมด้วยเสียง',
      description: 'ใช้คำสั่งเสียงในการนำทางและควบคุมเว็บไซต์',
      icon: CursorArrowRaysIcon,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      blue: isActive ? 'bg-blue-100 text-blue-600' : 'bg-blue-50 text-blue-500',
      green: isActive ? 'bg-green-100 text-green-600' : 'bg-green-50 text-green-500',
      purple: isActive ? 'bg-purple-100 text-purple-600' : 'bg-purple-50 text-purple-500',
      orange: isActive ? 'bg-orange-100 text-orange-600' : 'bg-orange-50 text-orange-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

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
                      <EyeIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">ข้อกำหนดการเข้าถึง</h3>
                      <p className="text-sm text-gray-600">ปรับแต่งการแสดงผลเพื่อความสะดวกในการใช้งาน</p>
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
                    เราให้ความสำคัญกับการเข้าถึงได้สำหรับทุกคน 
                    คุณสามารถปรับแต่งการแสดงผลตามความต้องการของคุณได้
                  </p>
                </div>

                {/* Accessibility Features */}
                <div className="space-y-4 mb-6">
                  {accessibilityFeatures.map((feature) => {
                    const IconComponent = feature.icon;
                    const isActive = preferences[feature.id as keyof typeof preferences];
                    
                    return (
                      <div key={feature.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(feature.color, isActive)}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">{feature.name}</h4>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                          <div className="ml-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isActive}
                                onChange={() => handleToggle(feature.id as keyof typeof preferences)}
                                className="sr-only peer"
                              />
                              <div className={`w-11 h-6 rounded-full peer transition-colors ${
                                isActive ? 'bg-primary-600' : 'bg-gray-200'
                              }`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                                  isActive ? 'translate-x-5' : 'translate-x-0.5'
                                } mt-0.5`} />
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <EyeIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">มาตรฐานการเข้าถึง</h4>
                      <p className="text-sm text-blue-800">
                        เว็บไซต์นี้ได้รับการออกแบบให้สอดคล้องกับแนวทาง WCAG 2.1 ระดับ AA 
                        เพื่อให้ทุกคนสามารถเข้าถึงและใช้งานได้อย่างสะดวก
                      </p>
                    </div>
                  </div>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">คีย์บอร์ดชอร์ตคัต</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ข้ามไปยังเนื้อหาหลัก</span>
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Tab</kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">เปิด/ปิดเมนู</span>
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ย้อนกลับ</span>
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Alt + ←</kbd>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ไปข้างหน้า</span>
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Alt + →</kbd>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleApply}
                  className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  ใช้การตั้งค่านี้
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
