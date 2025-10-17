'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';

const hospitals = [
  {
    id: '1',
    name: 'โรงพยาบาลศิริราช',
    address: 'ถนนวังหลัง แขวงศิริราช เขตบางกอกน้อย กรุงเทพมหานคร',
    phone: '02-419-7000',
    specialties: ['อายุรกรรม', 'ศัลยกรรม', 'กุมารเวชกรรม', 'สูติ-นรีเวชกรรม'],
    availableSlots: 15
  },
  {
    id: '2',
    name: 'โรงพยาบาลจุฬาลงกรณ์',
    address: 'ถนนพระราม 4 แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร',
    phone: '02-256-4000',
    specialties: ['อายุรกรรม', 'ศัลยกรรม', 'กุมารเวชกรรม', 'จิตเวช'],
    availableSlots: 8
  },
  {
    id: '3',
    name: 'โรงพยาบาลรามาธิบดี',
    address: 'ถนนพระราม 6 แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร',
    phone: '02-201-1000',
    specialties: ['อายุรกรรม', 'ศัลยกรรม', 'กุมารเวชกรรม', 'ทันตกรรม'],
    availableSlots: 12
  }
];

const specialties = [
  { id: 'internal', name: 'อายุรกรรม', icon: '🩺' },
  { id: 'surgery', name: 'ศัลยกรรม', icon: '🏥' },
  { id: 'pediatrics', name: 'กุมารเวชกรรม', icon: '👶' },
  { id: 'obstetrics', name: 'สูติ-นรีเวชกรรม', icon: '🤱' },
  { id: 'cardiology', name: 'โรคหัวใจ', icon: '❤️' },
  { id: 'dermatology', name: 'ผิวหนัง', icon: '🧴' }
];

const recentAppointments = [
  {
    id: '1',
    hospital: 'โรงพยาบาลศิริราช',
    doctor: 'นพ. สมชาย ใจดี',
    specialty: 'อายุรกรรม',
    date: '25/12/2024',
    time: '09:00',
    status: 'ยืนยันแล้ว',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: '2',
    hospital: 'โรงพยาบาลจุฬาลงกรณ์',
    doctor: 'นพ. สมหญิง รักดี',
    specialty: 'กุมารเวชกรรม',
    date: '28/12/2024',
    time: '14:30',
    status: 'รอยืนยัน',
    statusColor: 'bg-yellow-100 text-yellow-800'
  }
];

const insuranceInfo = {
  type: 'บัตรทอง',
  number: '1234567890123',
  status: 'ใช้งานได้',
  expiryDate: '31/12/2025'
};

export default function MedicalAppointmentPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [appointments] = useState(recentAppointments);

  const handleSpecialtySelect = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
  };

  const handleHospitalSelect = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
  };

  const handleBookAppointment = () => {
    console.log('Book appointment:', selectedSpecialty, selectedHospital);
    // TODO: Implement appointment booking
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            พบแพทย์
          </h1>
          <p className="text-gray-600">
            นัดหมายแพทย์และตรวจสอบสิทธิ์ประกันสุขภาพ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Insurance Status */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                สิทธิ์ประกันสุขภาพ
              </h2>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{insuranceInfo.type}</p>
                    <p className="text-sm text-gray-600">หมายเลข: {insuranceInfo.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-800">{insuranceInfo.status}</p>
                  <p className="text-xs text-gray-600">หมดอายุ: {insuranceInfo.expiryDate}</p>
                </div>
              </div>
            </div>

            {/* Specialty Selection */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                เลือกสาขาแพทย์
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specialties.map((specialty, index) => (
                  <motion.button
                    key={specialty.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleSpecialtySelect(specialty.id)}
                    className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                      selectedSpecialty === specialty.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{specialty.icon}</div>
                    <p className="text-sm font-medium text-gray-900">{specialty.name}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hospital Selection */}
            {selectedSpecialty && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  เลือกโรงพยาบาล
                </h2>
                <div className="space-y-4">
                  {hospitals.map((hospital, index) => (
                    <motion.div
                      key={hospital.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedHospital === hospital.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleHospitalSelect(hospital.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {hospital.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPinIcon className="h-4 w-4" />
                              <span>{hospital.address}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <PhoneIcon className="h-4 w-4" />
                              <span>{hospital.phone}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {hospital.specialties.map((specialty, specIndex) => (
                              <span
                                key={specIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-primary-600">
                            {hospital.availableSlots} ช่องว่าง
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Book Appointment Button */}
            {selectedSpecialty && selectedHospital && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={handleBookAppointment}
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>นัดหมายแพทย์</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  การนัดหมายล่าสุด
                </h2>
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-l-4 border-primary-500 pl-4"
                    >
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {appointment.hospital}
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">
                        {appointment.doctor} • {appointment.specialty}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        {appointment.date} เวลา {appointment.time}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${appointment.statusColor}`}>
                        {appointment.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a
                    href="#"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    ดูประวัติการนัดหมายทั้งหมด →
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                เคล็ดลับการนัดหมาย
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>นัดหมายล่วงหน้า 1-2 สัปดาห์</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>เตรียมบัตรประชาชนและบัตรประกัน</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>มาถึงก่อนเวลานัด 15 นาที</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}