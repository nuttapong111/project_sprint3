'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  LockClosedIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { findUserByThaiId, findUserByCredentials } from '@/lib/mockUsers';

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'thaiid' | 'email' | 'phone'>('thaiid');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    thaiId: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (loginMethod === 'thaiid') {
        // Thai ID login - redirect to QR code page
        const user = findUserByThaiId(formData.thaiId);
        if (user) {
          router.push(`/login/qr?thaiId=${formData.thaiId}`);
        } else {
          setError('ไม่พบหมายเลขบัตรประชาชนในระบบ');
        }
      } else {
        // Email/Phone login with password
        const user = findUserByCredentials(
          loginMethod === 'email' ? formData.email : formData.phone,
          formData.password
        );
               if (user) {
                 console.log('Login successful:', user);
                 // Redirect to appropriate dashboard based on user type
                 if (user.userType === 'citizen') {
                   router.push('/citizen/dashboard');
                 } else if (user.userType === 'officer') {
                   router.push('/officer/dashboard');
                 } else if (user.userType === 'admin') {
                   router.push('/admin/dashboard');
                 } else {
                   router.push('/');
                 }
               } else {
          setError('อีเมล/เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง');
        }
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoading(false);
    }
  };

  const loginMethods = [
    {
      id: 'thaiid',
      name: 'Thai ID',
      icon: UserIcon,
      description: 'เข้าสู่ระบบด้วยหมายเลขบัตรประชาชน'
    },
    {
      id: 'email',
      name: 'อีเมล',
      icon: EnvelopeIcon,
      description: 'เข้าสู่ระบบด้วยอีเมล'
    },
    {
      id: 'phone',
      name: 'เบอร์โทรศัพท์',
      icon: PhoneIcon,
      description: 'เข้าสู่ระบบด้วยเบอร์โทรศัพท์'
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          กลับสู่หน้าหลัก
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
              <span className="text-white font-bold text-2xl">🇹🇭</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              เข้าสู่ระบบ
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              เข้าสู่ระบบแพลตฟอร์มดิจิทัลภาครัฐ
            </p>
          </div>

          {/* Login Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Login Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  วิธีการเข้าสู่ระบบ
                </label>
                <div className="space-y-2">
                  {loginMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setLoginMethod(method.id as any)}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        loginMethod === method.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className="h-5 w-5" />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                {loginMethod === 'thaiid' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      หมายเลขบัตรประชาชน
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="thaiId"
                        value={formData.thaiId}
                        onChange={handleInputChange}
                        placeholder="กรอกหมายเลขบัตรประชาชน 13 หลัก"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        maxLength={13}
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      หลังจากกรอกหมายเลขบัตรประชาชนแล้ว จะแสดง QR Code สำหรับสแกนด้วยแอป Thai ID
                    </p>
                  </div>
                )}

                {loginMethod === 'email' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        อีเมล
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="กรอกอีเมลของคุณ"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        รหัสผ่าน
                      </label>
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="กรอกรหัสผ่าน"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {loginMethod === 'phone' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        เบอร์โทรศัพท์
                      </label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="กรอกเบอร์โทรศัพท์ 10 หลัก"
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        รหัสผ่าน
                      </label>
                      <div className="relative">
                        <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="กรอกรหัสผ่าน"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    จดจำการเข้าสู่ระบบ
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-primary-600 hover:text-primary-700">
                    ลืมรหัสผ่าน?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    กำลังเข้าสู่ระบบ...
                  </div>
                ) : (
                  'เข้าสู่ระบบ'
                )}
              </button>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  ยังไม่มีบัญชี?{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    สมัครสมาชิก
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Mock Data Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">ข้อมูลทดสอบ:</h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>Thai ID:</strong> 1234567890123, 2345678901234, 3456789012345</p>
              <p><strong>Email:</strong> john.doe@email.com, jane.smith@email.com, bob.wilson@email.com</p>
              <p><strong>Phone:</strong> 0812345678, 0823456789, 0834567890</p>
              <p><strong>Password:</strong> password123 (สำหรับ email/phone)</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              การเข้าสู่ระบบแสดงว่าคุณยอมรับ{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                เงื่อนไขการใช้งาน
              </a>{' '}
              และ{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                นโยบายความเป็นส่วนตัว
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
