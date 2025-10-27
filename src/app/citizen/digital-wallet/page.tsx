'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import apiService from '@/lib/api';

interface Document {
  id: string;
  type: string;
  typeThai: string;
  icon: string;
  iconColor: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  statusText: string;
  statusColor: string;
  canRenew?: boolean;
}

export default function DigitalWalletPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDigitalDocuments();
      
      // Transform API data to Document format
      const transformed = data.map((doc: any, index: number) => {
        // Determine icon and color based on document type
        const iconMap: { [key: string]: { icon: string; color: string } } = {
          id_card: { icon: '🆔', color: 'bg-purple-100 text-purple-600' },
          driving_license: { icon: '🚗', color: 'bg-red-100 text-red-600' },
          passport: { icon: '📘', color: 'bg-blue-100 text-blue-600' },
          birth_certificate: { icon: '👶', color: 'bg-yellow-100 text-yellow-600' }
        };

        const docType = iconMap[doc.document_type] || { icon: '📄', color: 'bg-gray-100 text-gray-600' };

        // Determine status based on expiry date
        let status: 'valid' | 'expiring' | 'expired' = 'valid';
        let statusText = 'ใช้งานได้';
        let statusColor = 'bg-green-100 text-green-800';
        
        if (doc.expiry_date) {
          const today = new Date();
          const expiryDate = new Date(doc.expiry_date);
          const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysUntilExpiry < 0) {
            status = 'expired';
            statusText = 'หมดอายุ';
            statusColor = 'bg-red-100 text-red-800';
          } else if (daysUntilExpiry <= 30) {
            status = 'expiring';
            statusText = 'ใกล้หมดอายุ';
            statusColor = 'bg-yellow-100 text-yellow-800';
          }
        }

        return {
          id: doc.id.toString(),
          type: doc.document_type,
          typeThai: doc.document_name,
          icon: docType.icon,
          iconColor: docType.color,
          number: doc.document_number,
          issueDate: doc.issue_date ? new Date(doc.issue_date).toLocaleDateString('th-TH') : '',
          expiryDate: doc.expiry_date ? new Date(doc.expiry_date).toLocaleDateString('th-TH') : 'ไม่มีวันหมดอายุ',
          status,
          statusText,
          statusColor,
          canRenew: doc.document_type !== 'birth_certificate'
        };
      });

      setDocuments(transformed);
      
      // Update summary counts
      const total = transformed.length;
      const valid = transformed.filter(d => d.status === 'valid').length;
      const expiring = transformed.filter(d => d.status === 'expiring').length;
      const expired = transformed.filter(d => d.status === 'expired').length;
      
      // Update summary cards (we'll need to make this dynamic)
    } catch (error: any) {
      console.error('Error loading documents:', error);
      setError(error.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      setSelectedDocument(document);
      setShowCardPopup(true);
    }
  };

  const handleDownloadDocument = (documentId: string) => {
    console.log('Download document:', documentId);
    // TODO: Implement download document functionality
  };

  const handleRenewDocument = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (!document) return;
    
    // Navigate to renewal page with document type
    router.push(`/citizen/renew-document?type=${document.type}&id=${documentId}`);
  };

  const closeCardPopup = () => {
    setShowCardPopup(false);
    setSelectedDocument(null);
  };

  // Calculate summary counts
  const summaryData = {
    total: documents.length,
    valid: documents.filter(d => d.status === 'valid').length,
    expiring: documents.filter(d => d.status === 'expiring').length,
    expired: documents.filter(d => d.status === 'expired').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="citizen" />
      
      <main className="w-full px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                กระเป๋าเอกสารดิจิทัล
              </h1>
              <p className="text-gray-600">
                จัดการเอกสารดิจิทัลของคุณ
              </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'เอกสารทั้งหมด', count: summaryData.total.toString(), icon: DocumentTextIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
            { title: 'ใช้งานได้', count: summaryData.valid.toString(), icon: CheckCircleIcon, color: 'text-green-600', bgColor: 'bg-green-100' },
            { title: 'ใกล้หมดอายุ', count: summaryData.expiring.toString(), icon: ClockIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
            { title: 'หมดอายุ', count: summaryData.expired.toString(), icon: ExclamationTriangleIcon, color: 'text-red-600', bgColor: 'bg-red-100' }
          ].map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {loading ? '...' : card.count}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Documents Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-yellow-800 mb-4">{error}</p>
              <p className="text-sm text-gray-600">กรุณาเข้าสู่ระบบเพื่อดูเอกสารดิจิทัลของคุณ</p>
              <button
                onClick={() => router.push('/login')}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                ไปที่หน้าล็อกอิน
              </button>
            </div>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">ยังไม่มีเอกสารดิจิทัล</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {documents.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              {/* Status Badge */}
              <div className="flex justify-end mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${document.statusColor}`}>
                  {document.statusText}
                </span>
              </div>

              {/* Document Icon and Type */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${document.iconColor}`}>
                  <span className="text-2xl">{document.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {document.typeThai}
                </h3>
              </div>

              {/* Document Details */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">หมายเลข</p>
                  <p className="text-sm font-medium text-gray-900">{document.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">วันที่ออก</p>
                  <p className="text-sm font-medium text-gray-900">{document.issueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">วันหมดอายุ</p>
                  <p className="text-sm font-medium text-gray-900">{document.expiryDate}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleViewDocument(document.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>ดู</span>
                </button>
                <button
                  onClick={() => handleDownloadDocument(document.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>ดาวน์โหลด</span>
                </button>
                </div>
                {document.canRenew && (
                  <button
                    onClick={() => handleRenewDocument(document.id)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-orange-300 rounded-lg text-orange-700 hover:bg-orange-50 transition-colors duration-200"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                    <span>ต่ออายุบัตร</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Card Popup Modal */}
      {showCardPopup && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeCardPopup}>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDocument.typeThai}
              </h3>
              <button
                onClick={closeCardPopup}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                <div className="text-center mb-6">
                  <div className="text-sm opacity-80 mb-2">{selectedDocument.typeThai}</div>
                  <div className="text-2xl font-bold">Digital Document</div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm opacity-80 mb-1">เลขที่</div>
                    <div className="text-lg font-semibold font-mono">
                      {selectedDocument.number}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-1">วันหมดอายุ</div>
                    <div className="text-lg font-semibold">
                      {selectedDocument.expiryDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-1">วันที่ออก</div>
                    <div className="text-lg font-semibold">{selectedDocument.issueDate}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-1">สถานะ</div>
                    <div className="text-lg font-semibold">{selectedDocument.statusText}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeCardPopup}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ปิด
              </button>
              <button
                onClick={() => handleDownloadDocument(selectedDocument.id)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                ดาวน์โหลด
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  </main>
</div>
  );
}