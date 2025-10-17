'use client';

import { useState } from 'react';
import { 
  CogIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [profileData, setProfileData] = useState({
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    thaiId: '1234567890123',
    email: 'somchai@email.com',
    phone: '0812345678',
    address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพมหานคร 10110',
    birthDate: '1990-01-15',
    gender: 'male',
    password: 'password123'
  });

  const [editData, setEditData] = useState(profileData);

  const tabs = [
    { id: 'personal', name: 'ข้อมูลส่วนตัว', icon: UserIcon },
    { id: 'security', name: 'ความปลอดภัย', icon: ShieldCheckIcon },
    { id: 'preferences', name: 'การตั้งค่า', icon: CogIcon }
  ];

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    alert('บันทึกข้อมูลเรียบร้อยแล้ว');
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900">{profileData.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">นามสกุล</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900">{profileData.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">หมายเลขบัตรประชาชน</label>
        <p className="text-gray-900">{profileData.thaiId}</p>
        <p className="text-sm text-gray-500">ไม่สามารถแก้ไขได้</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
          {isEditing ? (
            <input
              type="email"
              value={editData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900">{profileData.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
          {isEditing ? (
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900">{profileData.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
        {isEditing ? (
          <textarea
            value={editData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        ) : (
          <p className="text-gray-900">{profileData.address}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">วันเกิด</label>
          {isEditing ? (
            <input
              type="date"
              value={editData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900">{profileData.birthDate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">เพศ</label>
          {isEditing ? (
            <select
              value={editData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
              <option value="other">อื่นๆ</option>
            </select>
          ) : (
            <p className="text-gray-900">{profileData.gender === 'male' ? 'ชาย' : profileData.gender === 'female' ? 'หญิง' : 'อื่นๆ'}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSecurityInfo = () => (
    <div className="space-y-6">
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-center space-x-3">
          <ShieldCheckIcon className="h-6 w-6 text-yellow-600" />
          <div>
            <h3 className="font-semibold text-yellow-900">ความปลอดภัยของบัญชี</h3>
            <p className="text-sm text-yellow-800">ตรวจสอบการตั้งค่าความปลอดภัยของบัญชีของคุณ</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านปัจจุบัน</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={profileData.password}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
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
        <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
          เปลี่ยนรหัสผ่าน
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">การเข้าสู่ระบบล่าสุด</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">เข้าสู่ระบบสำเร็จ</p>
                <p className="text-sm text-gray-600">IP: 192.168.1.100</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">วันนี้ 14:30</p>
              <p className="text-xs text-gray-500">Chrome, Windows</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">เข้าสู่ระบบล้มเหลว</p>
                <p className="text-sm text-gray-600">IP: 192.168.1.101</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">เมื่อวาน 22:15</p>
              <p className="text-xs text-gray-500">Safari, iOS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">การแจ้งเตือน</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">การแจ้งเตือนทางอีเมล</p>
              <p className="text-sm text-gray-600">รับการแจ้งเตือนผ่านอีเมล</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">การแจ้งเตือนทาง SMS</p>
              <p className="text-sm text-gray-600">รับการแจ้งเตือนผ่าน SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">การแจ้งเตือนในแอป</p>
              <p className="text-sm text-gray-600">รับการแจ้งเตือนในแอปพลิเคชัน</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ความเป็นส่วนตัว</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">แชร์ข้อมูลเพื่อการวิจัย</p>
              <p className="text-sm text-gray-600">อนุญาตให้ใช้ข้อมูลเพื่อการวิจัยและพัฒนาบริการ</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ตั้งค่าโปรไฟล์</h1>
              <p className="text-gray-600">จัดการข้อมูลส่วนตัวและการตั้งค่าของคุณ</p>
            </div>
            {!isEditing ? (
              <button onClick={handleEdit} className="btn-primary flex items-center">
                <PencilIcon className="h-5 w-5 mr-2" />
                แก้ไขข้อมูล
              </button>
            ) : (
              <div className="flex space-x-3">
                <button onClick={handleCancel} className="btn-secondary flex items-center">
                  <XMarkIcon className="h-5 w-5 mr-2" />
                  ยกเลิก
                </button>
                <button onClick={handleSave} className="btn-primary flex items-center">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  บันทึก
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card">
              {activeTab === 'personal' && renderPersonalInfo()}
              {activeTab === 'security' && renderSecurityInfo()}
              {activeTab === 'preferences' && renderPreferences()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
