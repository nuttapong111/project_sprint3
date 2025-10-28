'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  IdentificationIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  thaiId: string;
  address: string;
  dateOfBirth: string;
  userType: string;
  department?: string;
  position?: string;
}

const mockProfile: UserProfile = {
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  email: 'john.doe@email.com',
  phone: '0812345678',
  thaiId: '1234567890123',
  address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพมหานคร 10110',
  dateOfBirth: '15/03/1990',
  userType: 'ประชาชน',
  department: undefined,
  position: undefined
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile);

  const handleEdit = () => {
    setEditedProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const profileFields = [
    {
      key: 'firstName' as keyof UserProfile,
      label: 'ชื่อ',
      icon: UserIcon,
      editable: true
    },
    {
      key: 'lastName' as keyof UserProfile,
      label: 'นามสกุล',
      icon: UserIcon,
      editable: true
    },
    {
      key: 'email' as keyof UserProfile,
      label: 'อีเมล',
      icon: EnvelopeIcon,
      editable: true
    },
    {
      key: 'phone' as keyof UserProfile,
      label: 'เบอร์โทรศัพท์',
      icon: PhoneIcon,
      editable: true
    },
    {
      key: 'thaiId' as keyof UserProfile,
      label: 'หมายเลขบัตรประชาชน',
      icon: IdentificationIcon,
      editable: false
    },
    {
      key: 'address' as keyof UserProfile,
      label: 'ที่อยู่',
      icon: MapPinIcon,
      editable: true
    },
    {
      key: 'dateOfBirth' as keyof UserProfile,
      label: 'วันเกิด',
      icon: CalendarIcon,
      editable: true
    },
    {
      key: 'userType' as keyof UserProfile,
      label: 'ประเภทผู้ใช้',
      icon: UserIcon,
      editable: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                โปรไฟล์ส่วนตัว
              </h1>
              <p className="text-gray-600">
                จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชี
              </p>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="btn-primary flex items-center space-x-2"
              >
                <PencilIcon className="h-4 w-4" />
                <span>แก้ไขข้อมูล</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span>ยกเลิก</span>
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center space-x-2"
                >
                  <CheckIcon className="h-4 w-4" />
                  <span>บันทึก</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  ข้อมูลส่วนตัว
                </h2>
                <div className="space-y-6">
                  {profileFields.map((field, index) => {
                    const IconComponent = field.icon;
                    const value = isEditing ? editedProfile[field.key] : profile[field.key];
                    
                    return (
                      <motion.div
                        key={field.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                          </label>
                          {isEditing && field.editable ? (
                            <input
                              type={field.key === 'email' ? 'email' : field.key === 'phone' ? 'tel' : 'text'}
                              value={value || ''}
                              onChange={(e) => handleInputChange(field.key, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="text-sm text-gray-900">
                              {value || '-'}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Summary & Actions */}
          <div className="space-y-6">
            {/* Profile Avatar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white font-bold">
                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {profile.userType}
                </p>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                สถานะบัญชี
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">สถานะการยืนยัน</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    ยืนยันแล้ว
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">การเข้าสู่ระบบล่าสุด</span>
                  <span className="text-sm text-gray-900">เมื่อวานนี้</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">จำนวนการเข้าสู่ระบบ</span>
                  <span className="text-sm text-gray-900">45 ครั้ง</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                การดำเนินการ
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  เปลี่ยนรหัสผ่าน
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  การแจ้งเตือน
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  ความเป็นส่วนตัว
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  ลบบัญชี
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}