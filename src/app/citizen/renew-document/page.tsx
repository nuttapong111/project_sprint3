'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { mockUsers } from '@/lib/mockUsers';

interface RenewalFormData {
  documentType: string;
  currentNumber: string;
  reason: string;
  preferredDate: string;
  contactPhone: string;
  additionalInfo: string;
}

export default function RenewDocumentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RenewalFormData>({
    documentType: '',
    currentNumber: '',
    reason: '',
    preferredDate: '',
    contactPhone: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentUser = mockUsers.find(user => user.role === 'citizen');

  const documentTypes = [
    { id: 'id_card', name: 'บัตรประจำตัวประชาชน', description: 'Thai National ID Card' },
    { id: 'driver_license', name: 'ใบขับขี่', description: 'Driver\'s License' },
    { id: 'passport', name: 'หนังสือเดินทาง', description: 'Passport' }
  ];

  const renewalReasons = [
    { id: 'expired', name: 'บัตรหมดอายุ', description: 'บัตรหมดอายุแล้ว' },
    { id: 'damaged', name: 'บัตรชำรุด', description: 'บัตรชำรุดหรือเสียหาย' },
    { id: 'lost', name: 'บัตรหาย', description: 'บัตรสูญหาย' },
    { id: 'change_info', name: 'เปลี่ยนข้อมูล', description: 'ต้องการเปลี่ยนข้อมูลในบัตร' },
    { id: 'other', name: 'อื่นๆ', description: 'เหตุผลอื่นๆ' }
  ];

  const handleInputChange = (field: keyof RenewalFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เลือกประเภทเอกสารที่ต้องการต่ออายุ</h3>
        <div className="grid grid-cols-1 gap-4">
          {documentTypes.map((type) => (
            <label key={type.id} className="relative">
              <input
                type="radio"
                name="documentType"
                value={type.id}
                checked={formData.documentType === type.id}
                onChange={(e) => handleInputChange('documentType', e.target.value)}
                className="sr-only"
              />
              <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.documentType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{type.name}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลเอกสารปัจจุบัน</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หมายเลขเอกสารปัจจุบัน
            </label>
            <input
              type="text"
              value={formData.currentNumber}
              onChange={(e) => handleInputChange('currentNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกหมายเลขเอกสารปัจจุบัน"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เบอร์โทรศัพท์ติดต่อ
            </label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="08X-XXX-XXXX"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เหตุผลในการต่ออายุ</h3>
        <div className="space-y-3">
          {renewalReasons.map((reason) => (
            <label key={reason.id} className="relative">
              <input
                type="radio"
                name="reason"
                value={reason.id}
                checked={formData.reason === reason.id}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                className="sr-only"
              />
              <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                formData.reason === reason.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div className="text-sm font-medium text-gray-900">{reason.name}</div>
                <div className="text-sm text-gray-500">{reason.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          วันที่ต้องการรับเอกสารใหม่
        </label>
        <input
          type="date"
          value={formData.preferredDate}
          onChange={(e) => handleInputChange('preferredDate', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลเพิ่มเติม</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมายเหตุเพิ่มเติม (ถ้ามี)
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกข้อมูลเพิ่มเติมที่ต้องการแจ้ง..."
          />
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">ข้อมูลการติดต่อ</h4>
        <div className="text-sm text-blue-800">
          <p>ชื่อ: {currentUser?.firstName} {currentUser?.lastName}</p>
          <p>อีเมล: {currentUser?.email}</p>
          <p>เบอร์โทร: {formData.contactPhone || 'ยังไม่ได้ระบุ'}</p>
        </div>
      </div>
    </div>
  );

  const renderSubmitted = () => (
    <div className="text-center py-12">
      <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2">ส่งคำขอต่ออายุเอกสารเรียบร้อยแล้ว</h3>
      <p className="text-gray-600 mb-6">
        ระบบได้รับคำขอต่ออายุเอกสารของคุณแล้ว<br />
        เจ้าหน้าที่จะติดต่อกลับภายใน 1-2 วันทำการ
      </p>
      <div className="space-y-3">
        <button
          onClick={() => router.push('/citizen/digital-wallet')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          กลับไปยังกระเป๋าเอกสารดิจิทัล
        </button>
        <button
          onClick={() => {
            setCurrentStep(1);
            setIsSubmitted(false);
            setFormData({
              documentType: '',
              currentNumber: '',
              reason: '',
              preferredDate: '',
              contactPhone: '',
              additionalInfo: ''
            });
          }}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors ml-3"
        >
          ส่งคำขอใหม่
        </button>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {renderSubmitted()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            กลับ
          </button>
          <h1 className="text-3xl font-bold text-gray-900">ต่ออายุเอกสาร</h1>
          <p className="text-gray-600 mt-2">กรอกข้อมูลเพื่อขอต่ออายุเอกสารของคุณ</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>เลือกเอกสาร</span>
            <span>ข้อมูลเอกสาร</span>
            <span>เหตุผล</span>
            <span>ข้อมูลเพิ่มเติม</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              ย้อนกลับ
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !formData.documentType) ||
                  (currentStep === 2 && (!formData.currentNumber || !formData.contactPhone)) ||
                  (currentStep === 3 && !formData.reason)
                }
                className={`px-6 py-2 rounded-lg transition-colors ${
                  (currentStep === 1 && !formData.documentType) ||
                  (currentStep === 2 && (!formData.currentNumber || !formData.contactPhone)) ||
                  (currentStep === 3 && !formData.reason)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                ถัดไป
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isSubmitting
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2 animate-spin" />
                    กำลังส่งคำขอ...
                  </div>
                ) : (
                  'ส่งคำขอต่ออายุ'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
