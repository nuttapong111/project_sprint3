'use client';

import { useState } from 'react';
import { 
  HeartIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function MedicalAppointment() {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const hospitals = [
    {
      id: 'rajavithi',
      name: 'โรงพยาบาลราชวิถี',
      address: '2 ถนนราชวิถี แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร 10400',
      phone: '02-354-8100',
      departments: ['อายุรกรรม', 'ศัลยกรรม', 'กุมารเวชกรรม', 'สูติ-นารีเวชกรรม', 'จักษุวิทยา'],
      availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    },
    {
      id: 'siriraj',
      name: 'โรงพยาบาลศิริราช',
      address: '2 ถนนวังหลัง แขวงศิริราช เขตบางกอกน้อย กรุงเทพมหานคร 10700',
      phone: '02-419-7000',
      departments: ['อายุรกรรม', 'ศัลยกรรม', 'กุมารเวชกรรม', 'สูติ-นารีเวชกรรม', 'จักษุวิทยา', 'หูคอจมูก'],
      availableSlots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']
    },
    {
      id: 'ramathibodi',
      name: 'โรงพยาบาลรามาธิบดี',
      address: '270 ถนนพระราม 6 แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร 10400',
      phone: '02-201-1000',
      departments: ['อายุรกรรม', 'ศัลยกรรม', 'กุมารเวชกรรม', 'สูติ-นารีเวชกรรม', 'จักษุวิทยา', 'หูคอจมูก', 'จิตเวช'],
      availableSlots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    }
  ];

  const insuranceTypes = [
    { id: 'gold', name: 'บัตรทอง', coverage: '100%', icon: '🏥' },
    { id: 'social', name: 'ประกันสังคม', coverage: '80%', icon: '🛡️' },
    { id: 'private', name: 'ประกันเอกชน', coverage: 'ตามเงื่อนไข', icon: '💼' },
    { id: 'self', name: 'จ่ายเอง', coverage: '0%', icon: '💰' }
  ];

  const selectedHospitalData = hospitals.find(h => h.id === selectedHospital);

  const handleBookAppointment = async () => {
    if (!selectedHospital || !selectedDepartment || !selectedDate || !selectedTime) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setIsBooking(true);
    // Simulate booking
    setTimeout(() => {
      setIsBooking(false);
      alert('นัดหมายสำเร็จแล้ว หมายเลขนัดหมาย: #APT2024001');
      // Reset form
      setSelectedHospital('');
      setSelectedDepartment('');
      setSelectedDate('');
      setSelectedTime('');
      setSymptoms('');
    }, 2000);
  };

  const upcomingAppointments = [
    {
      id: 1,
      hospital: 'โรงพยาบาลราชวิถี',
      department: 'อายุรกรรม',
      date: '25 มกราคม 2567',
      time: '10:00',
      status: 'confirmed',
      doctor: 'นพ.สมชาย ใจดี'
    },
    {
      id: 2,
      hospital: 'โรงพยาบาลศิริราช',
      department: 'จักษุวิทยา',
      date: '30 มกราคม 2567',
      time: '14:00',
      status: 'pending',
      doctor: 'นพ.สมหญิง รักดี'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'ยืนยันแล้ว';
      case 'pending': return 'รอยืนยัน';
      case 'cancelled': return 'ยกเลิกแล้ว';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">พบแพทย์</h1>
            <p className="text-gray-600">นัดหมายแพทย์และตรวจสอบสิทธิ์ประกัน</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hospital Selection */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">เลือกโรงพยาบาล</h2>
              <div className="space-y-4">
                {hospitals.map((hospital) => (
                  <button
                    key={hospital.id}
                    onClick={() => setSelectedHospital(hospital.id)}
                    className={`w-full p-4 border rounded-lg text-left transition-all ${
                      selectedHospital === hospital.id
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                        : 'border-gray-300 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <HeartIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{hospital.address}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <PhoneIcon className="h-4 w-4" />
                            <span>{hospital.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Department & Time Selection */}
            {selectedHospitalData && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">เลือกแผนกและเวลานัดหมาย</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">แผนก</label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">เลือกแผนก</option>
                      {selectedHospitalData.departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">วันที่</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">เวลาที่ต้องการ</label>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedHospitalData.availableSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          selectedTime === time
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">อาการเบื้องต้น</label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                    placeholder="กรอกรายละเอียดอาการที่พบ"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Insurance Check */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">ตรวจสอบสิทธิ์ประกัน</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {insuranceTypes.map((insurance) => (
                  <div
                    key={insurance.id}
                    className="p-4 border border-gray-200 rounded-lg text-center hover:border-primary-300 transition-colors cursor-pointer"
                  >
                    <div className="text-2xl mb-2">{insurance.icon}</div>
                    <h3 className="font-semibold text-gray-900">{insurance.name}</h3>
                    <p className="text-sm text-gray-600">{insurance.coverage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleBookAppointment}
              disabled={isBooking || !selectedHospital || !selectedDepartment || !selectedDate || !selectedTime}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isBooking ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังนัดหมาย...
                </>
              ) : (
                <>
                  <CalendarDaysIcon className="h-5 w-5 mr-2" />
                  นัดหมายแพทย์
                </>
              )}
            </button>
          </div>

          {/* Upcoming Appointments */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">นัดหมายที่ใกล้จะถึง</h2>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{appointment.hospital}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{appointment.department}</p>
                    <p className="text-sm text-gray-600 mb-1">แพทย์: {appointment.doctor}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="card bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-900">กรณีฉุกเฉิน</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-800">รถพยาบาล</span>
                  <span className="font-semibold text-red-900">1669</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-800">ตำรวจ</span>
                  <span className="font-semibold text-red-900">191</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
