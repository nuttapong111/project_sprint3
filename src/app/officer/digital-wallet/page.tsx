'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import { DigitalWalletManager, DigitalDocument, DocumentType, DocumentStatus } from '@/lib/digitalWallet';

export default function OfficerDigitalWalletPage() {
  const [documents, setDocuments] = useState<DigitalDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DigitalDocument | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newDocument, setNewDocument] = useState({
    userId: '',
    documentType: 'id_card' as DocumentType,
    documentName: '',
    documentNumber: '',
    issuedDate: '',
    expiryDate: '',
    issuingAuthority: '',
    notes: ''
  });

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const allDocuments = DigitalWalletManager.getAllDocuments();
    setDocuments(allDocuments);
  };

  const getStatusColor = (status: DocumentStatus) => {
    return DigitalWalletManager.getStatusColor(status);
  };

  const getStatusText = (status: DocumentStatus) => {
    return DigitalWalletManager.getStatusText(status);
  };

  const getDocumentIcon = (documentType: DocumentType) => {
    return DigitalWalletManager.getDocumentIcon(documentType);
  };

  const getDocumentTypeName = (documentType: DocumentType) => {
    return DigitalWalletManager.getDocumentTypeName(documentType);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesSearch = doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.userId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDocument = (document: DigitalDocument) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  const handleAddDocument = () => {
    if (!newDocument.userId || !newDocument.documentName || !newDocument.documentNumber) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const document = DigitalWalletManager.addDocument(
      newDocument.userId,
      newDocument.documentType,
      newDocument.documentName,
      newDocument.documentNumber,
      new Date(newDocument.issuedDate),
      newDocument.expiryDate ? new Date(newDocument.expiryDate) : undefined,
      newDocument.issuingAuthority,
      'officer_current', // Current officer ID
      undefined, // fileUrl
      undefined, // thumbnailUrl
      newDocument.notes
    );

    if (document) {
      loadDocuments();
      setShowAddModal(false);
      setNewDocument({
        userId: '',
        documentType: 'id_card',
        documentName: '',
        documentNumber: '',
        issuedDate: '',
        expiryDate: '',
        issuingAuthority: '',
        notes: ''
      });
      alert('เพิ่มเอกสารเรียบร้อยแล้ว!');
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบเอกสารนี้?')) {
      const success = DigitalWalletManager.deleteDocument(documentId);
      if (success) {
        loadDocuments();
        alert('ลบเอกสารเรียบร้อยแล้ว!');
      }
    }
  };

  const documentTypes: { value: DocumentType; label: string }[] = [
    { value: 'id_card', label: 'บัตรประชาชน' },
    { value: 'driving_license', label: 'ใบขับขี่' },
    { value: 'passport', label: 'หนังสือเดินทาง' },
    { value: 'marriage_certificate', label: 'ใบสำคัญสมรส' },
    { value: 'birth_certificate', label: 'สูติบัตร' },
    { value: 'other', label: 'เอกสารอื่น' }
  ];

  const stats = DigitalWalletManager.getDocumentStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="officer" />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                จัดการกระเป๋าเอกสารดิจิทัล
              </h1>
              <p className="text-gray-600">
                เพิ่มและจัดการเอกสารดิจิทัลให้ประชาชน
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5" />
              <span>เพิ่มเอกสาร</span>
            </button>
          </div>

          {/* สถิติ */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">ทั้งหมด</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">ใช้งานได้</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
              <div className="text-sm text-gray-600">หมดอายุ</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">รอการอนุมัติ</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">ถูกปฏิเสธ</div>
            </div>
          </div>

          {/* ตัวกรองและค้นหา */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาตามชื่อเอกสาร, หมายเลข, หรือ User ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    filterStatus === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ทั้งหมด ({stats.total})
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    filterStatus === 'active'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ใช้งานได้ ({stats.active})
                </button>
                <button
                  onClick={() => setFilterStatus('expired')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    filterStatus === 'expired'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  หมดอายุ ({stats.expired})
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    filterStatus === 'pending'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  รอการอนุมัติ ({stats.pending})
                </button>
              </div>
            </div>
          </div>

          {/* รายการเอกสาร */}
          <div className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ไม่พบเอกสาร
                </h3>
                <p className="text-gray-600">
                  ยังไม่มีเอกสารในสถานะนี้
                </p>
              </div>
            ) : (
              filteredDocuments.map((document) => (
                <motion.div
                  key={document.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{getDocumentIcon(document.documentType)}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {document.documentName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          หมายเลข: {document.documentNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          ผู้ใช้: {document.userId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(document.status)}`}>
                        {getStatusText(document.status)}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDocument(document)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(document.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>ออกเมื่อ: {document.issuedDate.toLocaleDateString('th-TH')}</span>
                    </div>
                    {document.expiryDate && (
                      <div className="flex items-center space-x-2">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <span>หมดอายุ: {document.expiryDate.toLocaleDateString('th-TH')}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      <span>{document.issuingAuthority}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal รายละเอียดเอกสาร */}
      {showModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  รายละเอียดเอกสาร
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{getDocumentIcon(selectedDocument.documentType)}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedDocument.documentName}
                    </h3>
                    <p className="text-gray-600">หมายเลข: {selectedDocument.documentNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ผู้ใช้</label>
                    <p className="text-gray-900">{selectedDocument.userId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDocument.status)}`}>
                      {getStatusText(selectedDocument.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">วันที่ออก</label>
                    <p className="text-gray-900">{selectedDocument.issuedDate.toLocaleDateString('th-TH')}</p>
                  </div>
                  {selectedDocument.expiryDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">วันหมดอายุ</label>
                      <p className="text-gray-900">{selectedDocument.expiryDate.toLocaleDateString('th-TH')}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">หน่วยงานที่ออก</label>
                    <p className="text-gray-900">{selectedDocument.issuingAuthority}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">เพิ่มโดย</label>
                    <p className="text-gray-900">{selectedDocument.addedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">วันที่เพิ่ม</label>
                    <p className="text-gray-900">{selectedDocument.addedAt.toLocaleDateString('th-TH')}</p>
                  </div>
                  {selectedDocument.notes && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ</label>
                      <p className="text-gray-900">{selectedDocument.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal เพิ่มเอกสาร */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  เพิ่มเอกสารใหม่
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      User ID *
                    </label>
                    <input
                      type="text"
                      value={newDocument.userId}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, userId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอก User ID ของประชาชน"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ประเภทเอกสาร *
                    </label>
                    <select
                      value={newDocument.documentType}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, documentType: e.target.value as DocumentType }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {documentTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อเอกสาร *
                    </label>
                    <input
                      type="text"
                      value={newDocument.documentName}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, documentName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="เช่น บัตรประชาชน, ใบขับขี่"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หมายเลขเอกสาร *
                    </label>
                    <input
                      type="text"
                      value={newDocument.documentNumber}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, documentNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="หมายเลขบัตรประชาชน, ใบขับขี่"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันที่ออก *
                    </label>
                    <input
                      type="date"
                      value={newDocument.issuedDate}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, issuedDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันหมดอายุ
                    </label>
                    <input
                      type="date"
                      value={newDocument.expiryDate}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หน่วยงานที่ออก *
                    </label>
                    <input
                      type="text"
                      value={newDocument.issuingAuthority}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, issuingAuthority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="เช่น สำนักงานเขตบางรัก, กรมการขนส่งทางบก"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หมายเหตุ
                    </label>
                    <textarea
                      value={newDocument.notes}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="หมายเหตุเพิ่มเติม..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleAddDocument}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>เพิ่มเอกสาร</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
