'use client';

import { useState } from 'react';
import { 
  ExclamationTriangleIcon,
  MicrophoneIcon,
  StopIcon,
  PlayIcon,
  PaperAirplaneIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function ReportCrime() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportType, setReportType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const reportTypes = [
    { id: 'theft', name: 'การขโมย', icon: '🔓' },
    { id: 'fraud', name: 'การฉ้อโกง', icon: '💳' },
    { id: 'violence', name: 'การใช้ความรุนแรง', icon: '👊' },
    { id: 'drug', name: 'ยาเสพติด', icon: '💊' },
    { id: 'traffic', name: 'การจราจร', icon: '🚗' },
    { id: 'other', name: 'อื่นๆ', icon: '📋' }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setTranscript('มีคนขโมยรถจักรยานยนต์ของฉันที่หน้าบ้านเมื่อคืนนี้ ต้องการให้ตำรวจมาดูกล้องวงจรปิด');
      setIsRecording(false);
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleSubmitReport = async () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('ส่งรายงานเรียบร้อยแล้ว หมายเลขรายงาน: #CR2024001');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">แจ้งความออนไลน์</h1>
            <p className="text-gray-600">รายงานเหตุการณ์ผ่าน AI Assistant</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Chat Interface */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                <p className="text-sm text-gray-600">พูดคุยกับ AI เพื่อรายงานเหตุการณ์</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 mb-6 h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-900">สวัสดีครับ ผมคือ AI Assistant ของตำรวจ</p>
                  <p className="text-sm text-gray-900">กรุณาบอกเล่าเหตุการณ์ที่เกิดขึ้นให้ผมฟังครับ</p>
                </div>
              </div>

              {transcript && (
                <div className="flex items-start space-x-2 justify-end">
                  <div className="bg-primary-100 p-3 rounded-lg shadow-sm max-w-xs">
                    <p className="text-sm text-gray-900">{transcript}</p>
                  </div>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">กำลังบันทึกเสียง...</span>
                </div>
              )}
            </div>

            {/* Voice Controls */}
            <div className="flex space-x-3">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="flex-1 btn-primary flex items-center justify-center"
                >
                  <MicrophoneIcon className="h-5 w-5 mr-2" />
                  เริ่มบันทึกเสียง
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <StopIcon className="h-5 w-5 mr-2" />
                  หยุดบันทึก
                </button>
              )}
            </div>
          </div>

          {/* Report Form */}
          <div className="space-y-6">
            {/* Report Type */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ประเภทการแจ้งความ</h3>
              <div className="grid grid-cols-2 gap-3">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setReportType(type.id)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      reportType === type.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">สถานที่เกิดเหตุ</h3>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="กรอกสถานที่เกิดเหตุ"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">รายละเอียดเพิ่มเติม</h3>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="กรอกรายละเอียดเพิ่มเติมเกี่ยวกับเหตุการณ์"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitReport}
              disabled={isProcessing || !reportType || !location}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังส่งรายงาน...
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                  ส่งรายงาน
                </>
              )}
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8 card bg-red-50 border-red-200">
          <div className="flex items-center space-x-3 mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">กรณีฉุกเฉิน</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🚨</div>
              <p className="font-semibold text-red-900">191</p>
              <p className="text-sm text-red-700">ตำรวจ</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🚑</div>
              <p className="font-semibold text-red-900">1669</p>
              <p className="text-sm text-red-700">รถพยาบาล</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔥</div>
              <p className="font-semibold text-red-900">199</p>
              <p className="text-sm text-red-700">ดับเพลิง</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
