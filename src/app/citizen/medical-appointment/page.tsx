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
  PlusIcon,
  XMarkIcon,
  CalendarDaysIcon,
  UserGroupIcon
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
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    reason: '',
    hospital: '',
    specialty: ''
  });

  const handleSpecialtySelect = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
  };

  const handleHospitalSelect = (hospitalId: string) => {
    setSelectedHospital(hospitalId);
  };

  const handleBookAppointment = () => {
    if (!selectedSpecialty || !selectedHospital) {
      alert('กรุณาเลือกสาขาและโรงพยาบาล');
      return;
    }
    setShowAppointmentModal(true);
    setAppointmentForm(prev => ({
      ...prev,
      hospital: hospitals.find(h => h.id === selectedHospital)?.name || '',
      specialty: specialties.find(s => s.id === selectedSpecialty)?.name || ''
    }));
  };

  const handleFormChange = (field: string, value: string) => {
    setAppointmentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitAppointment = () => {
    if (!appointmentForm.name || !appointmentForm.phone || !appointmentForm.date || !appointmentForm.time) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    console.log('Appointment submitted:', appointmentForm);
    alert('นัดหมายเรียบร้อยแล้ว! คุณจะได้รับ SMS ยืนยัน');
    setShowAppointmentModal(false);
    setAppointmentForm({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      reason: '',
      hospital: '',
      specialty: ''
    });
  };

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
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

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <CalendarDaysIcon className="h-6 w-6 mr-2 text-blue-600" />
                  นัดหมายแพทย์
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* ข้อมูลการนัดหมาย */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">ข้อมูลการนัดหมาย</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700 font-medium">โรงพยาบาล:</span>
                      <span className="ml-2 text-blue-800">{appointmentForm.hospital}</span>
                    </div>
                    <div>
                      <span className="text-blue-700 font-medium">สาขา:</span>
                      <span className="ml-2 text-blue-800">{appointmentForm.specialty}</span>
                    </div>
                  </div>
                </div>

                {/* ฟอร์มข้อมูลส่วนตัว */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <UserIcon className="h-5 w-5 mr-2 text-gray-600" />
                    ข้อมูลส่วนตัว
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ชื่อ-นามสกุล *
                      </label>
                      <input
                        type="text"
                        value={appointmentForm.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="กรอกชื่อ-นามสกุล"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        เบอร์โทรศัพท์ *
                      </label>
                      <input
                        type="tel"
                        value={appointmentForm.phone}
                        onChange={(e) => handleFormChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="08X-XXX-XXXX"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        อีเมล
                      </label>
                      <input
                        type="email"
                        value={appointmentForm.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* วันที่และเวลา */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
                    วันที่และเวลา
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        วันที่นัดหมาย *
                      </label>
                      <input
                        type="date"
                        value={appointmentForm.date}
                        onChange={(e) => handleFormChange('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        เวลานัดหมาย *
                      </label>
                      <select
                        value={appointmentForm.time}
                        onChange={(e) => handleFormChange('time', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">เลือกเวลา</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* เหตุผลในการนัดหมาย */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เหตุผลในการนัดหมาย
                  </label>
                  <textarea
                    value={appointmentForm.reason}
                    onChange={(e) => handleFormChange('reason', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="อธิบายอาการหรือเหตุผลในการนัดหมาย..."
                  />
                </div>

                {/* ข้อกำหนด */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">ข้อกำหนดการนัดหมาย</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• มาถึงก่อนเวลานัด 15 นาที</li>
                    <li>• นำบัตรประชาชนและบัตรประกันสุขภาพ</li>
                    <li>• หากไม่สามารถมาสามารถยกเลิกได้ล่วงหน้า 24 ชั่วโมง</li>
                    <li>• การนัดหมายจะได้รับการยืนยันผ่าน SMS</li>
                  </ul>
                </div>
              </div>

              {/* ปุ่มดำเนินการ */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSubmitAppointment}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>ยืนยันการนัดหมาย</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}