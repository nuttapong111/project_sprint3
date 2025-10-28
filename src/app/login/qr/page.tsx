'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon,
  QrCodeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { findUserByThaiId, generateThaiIdQRData } from '@/lib/mockUsers';

export default function QRCodePage() {
  const searchParams = useSearchParams();
  const thaiId = searchParams.get('thaiId');
  const [qrData, setQrData] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'waiting' | 'scanning' | 'success' | 'error'>('waiting');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (thaiId) {
      const foundUser = findUserByThaiId(thaiId);
      if (foundUser) {
        setUser(foundUser);
        const qrCodeData = generateThaiIdQRData(thaiId);
        setQrData(qrCodeData);
      }
    }
  }, [thaiId]);

  const handleStartScanning = () => {
    setIsScanning(true);
    setScanStatus('scanning');
    
    // Simulate scanning process
    setTimeout(() => {
      setScanStatus('success');
      setIsScanning(false);
    }, 3000);
  };

  const handleRetry = () => {
    setScanStatus('waiting');
    setIsScanning(false);
  };

  if (!thaiId || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              เกิดข้อผิดพลาด
            </h2>
            <p className="text-gray-600 mb-6">
              ไม่พบข้อมูลผู้ใช้ กรุณาลองใหม่อีกครั้ง
            </p>
            <Link 
              href="/login"
              className="btn-primary"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          href="/login"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCodeIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              สแกน QR Code
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              ใช้แอป Thai ID สแกน QR Code เพื่อเข้าสู่ระบบ
            </p>
          </div>

          {/* User Info */}
          <div className="card mb-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">👤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                หมายเลขบัตรประชาชน: {user.thaiId}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                ประเภท: {user.userType === 'citizen' ? 'ประชาชน' : 
                        user.userType === 'officer' ? 'เจ้าหน้าที่' : 'ผู้ดูแลระบบ'}
              </p>
              {user.department && (
                <p className="text-sm text-gray-500">
                  {user.department}
                </p>
              )}
            </div>
          </div>

          {/* QR Code Section */}
          <div className="card">
            <div className="text-center space-y-6">
              {/* QR Code Display */}
              <div className="relative">
                {scanStatus === 'waiting' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-80 h-96 mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
                    </div>
                    
                    {/* Header */}
                    <div className="text-center mb-6 relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-2">เข้าสู่ระบบ</h3>
                      <p className="text-blue-100 text-lg">ด้วย ThaiID</p>
                      <p className="text-blue-200 text-sm font-medium">thportal</p>
                    </div>

                    {/* QR Code Mockup */}
                    <div className="w-48 h-48 bg-white rounded-xl p-4 shadow-lg relative z-10 mb-6">
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center relative">
                        {/* Mock QR Code Pattern */}
                        <div className="grid grid-cols-8 gap-1 w-32 h-32">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm ${
                                Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                              }`}
                            />
                          ))}
                        </div>
                        
                        {/* ThaiID Logo in center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
                            ThaiID
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center px-6 relative z-10">
                      <p className="text-white text-sm leading-relaxed mb-2">
                        คิวอาร์โค้ดนี้เป็นสิ่งยืนยันตนทางดิจิทัล
                      </p>
                      <p className="text-white text-sm leading-relaxed mb-4">
                        ออกให้โดย กรมการปกครอง กระทรวงมหาดไทย
                      </p>
                      <p className="text-blue-200 text-xs">v.1.2.1</p>
                    </div>
                  </motion.div>
                )}

                {scanStatus === 'scanning' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-80 h-96 mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {/* Animated scanning effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-30"></div>
                    
                    {/* Header */}
                    <div className="text-center mb-6 relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-2">เข้าสู่ระบบ</h3>
                      <p className="text-blue-100 text-lg">ด้วย ThaiID</p>
                      <p className="text-blue-200 text-sm font-medium">thportal</p>
                    </div>

                    {/* QR Code with scanning animation */}
                    <div className="w-48 h-48 bg-white rounded-xl p-4 shadow-lg relative z-10 mb-6">
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* Mock QR Code Pattern */}
                        <div className="grid grid-cols-8 gap-1 w-32 h-32">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm ${
                                Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                              }`}
                            />
                          ))}
                        </div>
                        
                        {/* ThaiID Logo in center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
                            ThaiID
                          </div>
                        </div>

                        {/* Scanning line */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-blue-500 animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center px-6 relative z-10">
                      <p className="text-white text-sm leading-relaxed mb-2">
                        กำลังสแกน QR Code...
                      </p>
                      <p className="text-blue-200 text-xs">v.1.2.1</p>
                    </div>
                  </motion.div>
                )}

                {scanStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-80 h-96 mx-auto bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {/* Success animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                    
                    {/* Header */}
                    <div className="text-center mb-6 relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-2">เข้าสู่ระบบสำเร็จ</h3>
                      <p className="text-green-100 text-lg">ด้วย ThaiID</p>
                      <p className="text-green-200 text-sm font-medium">thportal</p>
                    </div>

                    {/* Success Icon */}
                    <div className="w-48 h-48 bg-white rounded-xl p-4 shadow-lg relative z-10 mb-6 flex items-center justify-center">
                      <CheckCircleIcon className="h-24 w-24 text-green-600" />
                    </div>

                    {/* Footer Text */}
                    <div className="text-center px-6 relative z-10">
                      <p className="text-white text-sm leading-relaxed mb-2">
                        ยืนยันตัวตนสำเร็จ
                      </p>
                      <p className="text-green-200 text-xs">v.1.2.1</p>
                    </div>
                  </motion.div>
                )}

                {scanStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-80 h-96 mx-auto bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    {/* Error animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                    
                    {/* Header */}
                    <div className="text-center mb-6 relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-2">เข้าสู่ระบบล้มเหลว</h3>
                      <p className="text-red-100 text-lg">ด้วย ThaiID</p>
                      <p className="text-red-200 text-sm font-medium">thportal</p>
                    </div>

                    {/* Error Icon */}
                    <div className="w-48 h-48 bg-white rounded-xl p-4 shadow-lg relative z-10 mb-6 flex items-center justify-center">
                      <ExclamationTriangleIcon className="h-24 w-24 text-red-600" />
                    </div>

                    {/* Footer Text */}
                    <div className="text-center px-6 relative z-10">
                      <p className="text-white text-sm leading-relaxed mb-2">
                        การสแกน QR Code ล้มเหลว
                      </p>
                      <p className="text-red-200 text-xs">v.1.2.1</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <DevicePhoneMobileIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span>เปิดแอป Thai ID บนมือถือ</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <QrCodeIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span>กดปุ่ม "สแกน QR Code" ในแอป</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <ClockIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span>QR Code จะหมดอายุใน 5 นาที</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckCircleIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span>ยืนยันตัวตนด้วยลายนิ้วมือหรือ PIN</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {scanStatus === 'waiting' && (
                  <div className="space-y-3">
                    <button
                      onClick={handleStartScanning}
                      className="w-full btn-primary text-lg py-4"
                    >
                      เริ่มสแกน QR Code
                    </button>
                    <p className="text-sm text-gray-500 text-center">
                      QR Code จะแสดงขึ้นเมื่อกดปุ่มเริ่มสแกน
                    </p>
                  </div>
                )}

                {scanStatus === 'scanning' && (
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center space-x-2 text-primary-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      <span className="text-sm font-medium">กำลังรอการสแกน...</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      กรุณาใช้แอป Thai ID สแกน QR Code ด้านบน
                    </p>
                  </div>
                )}

                {scanStatus === 'success' && (
                  <div className="space-y-3">
                    <div className="text-center text-green-600 font-medium text-lg">
                      ยินดีต้อนรับ {user.firstName} {user.lastName}!
                    </div>
                    <div className="text-center text-sm text-gray-600 mb-4">
                      ยืนยันตัวตนสำเร็จแล้ว
                    </div>
                    <Link 
                      href="/"
                      className="w-full btn-primary text-lg py-4"
                    >
                      เข้าสู่ระบบ
                    </Link>
                  </div>
                )}

                {scanStatus === 'error' && (
                  <div className="space-y-3">
                    <div className="text-center text-red-600 font-medium">
                      การสแกน QR Code ล้มเหลว
                    </div>
                    <p className="text-sm text-gray-500 text-center mb-4">
                      กรุณาลองใหม่อีกครั้ง
                    </p>
                    <button
                      onClick={handleRetry}
                      className="w-full btn-primary text-lg py-4"
                    >
                      ลองใหม่
                    </button>
                    <Link 
                      href="/login"
                      className="w-full btn-secondary text-lg py-4"
                    >
                      กลับไปหน้าเข้าสู่ระบบ
                    </Link>
                  </div>
                )}
              </div>

              {/* QR Code Data (for development) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">QR Code Data (Development):</p>
                  <code className="text-xs text-gray-700 break-all">
                    {qrData}
                  </code>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              หากมีปัญหาในการสแกน QR Code กรุณาติดต่อเจ้าหน้าที่
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
