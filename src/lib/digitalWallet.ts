// Digital Wallet Management System

export type DocumentType = 'id_card' | 'driving_license' | 'passport' | 'marriage_certificate' | 'birth_certificate' | 'other';

export type DocumentStatus = 'active' | 'expired' | 'pending' | 'rejected';

export interface DigitalDocument {
  id: string;
  userId: string;
  documentType: DocumentType;
  documentName: string;
  documentNumber: string;
  issuedDate: Date;
  expiryDate?: Date;
  issuingAuthority: string;
  status: DocumentStatus;
  fileUrl?: string;
  thumbnailUrl?: string;
  addedBy: string; // Officer ID who added this document
  addedAt: Date;
  notes?: string;
}

export class DigitalWalletManager {
  private static documents: DigitalDocument[] = [
    // ข้อมูลตัวอย่าง
    {
      id: 'doc_001',
      userId: 'current_user',
      documentType: 'id_card',
      documentName: 'บัตรประชาชน',
      documentNumber: '1234567890123',
      issuedDate: new Date('2020-01-15'),
      expiryDate: new Date('2030-01-15'),
      issuingAuthority: 'สำนักงานเขตบางรัก',
      status: 'active',
      fileUrl: '#',
      thumbnailUrl: '#',
      addedBy: 'officer_001',
      addedAt: new Date('2024-01-15'),
      notes: 'บัตรประชาชนที่ออกใหม่'
    },
    {
      id: 'doc_002',
      userId: 'current_user',
      documentType: 'driving_license',
      documentName: 'ใบขับขี่',
      documentNumber: 'DL123456789',
      issuedDate: new Date('2023-06-01'),
      expiryDate: new Date('2028-06-01'),
      issuingAuthority: 'กรมการขนส่งทางบก',
      status: 'active',
      fileUrl: '#',
      thumbnailUrl: '#',
      addedBy: 'officer_002',
      addedAt: new Date('2024-06-01'),
      notes: 'ใบขับขี่ที่ต่ออายุ'
    }
  ];

  // เพิ่มเอกสารใหม่
  public static addDocument(
    userId: string,
    documentType: DocumentType,
    documentName: string,
    documentNumber: string,
    issuedDate: Date,
    expiryDate: Date | undefined,
    issuingAuthority: string,
    addedBy: string,
    fileUrl?: string,
    thumbnailUrl?: string,
    notes?: string
  ): DigitalDocument {
    const document: DigitalDocument = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      userId,
      documentType,
      documentName,
      documentNumber,
      issuedDate,
      expiryDate,
      issuingAuthority,
      status: 'active',
      fileUrl,
      thumbnailUrl,
      addedBy,
      addedAt: new Date(),
      notes
    };

    this.documents.push(document);
    return document;
  }

  // ดึงเอกสารตาม User ID
  public static getDocumentsByUserId(userId: string): DigitalDocument[] {
    return this.documents
      .filter(doc => doc.userId === userId)
      .sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  }

  // ดึงเอกสารทั้งหมด (สำหรับเจ้าหน้าที่)
  public static getAllDocuments(): DigitalDocument[] {
    return this.documents.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  }

  // ดึงเอกสารตาม ID
  public static getDocumentById(id: string): DigitalDocument | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  // อัปเดตสถานะเอกสาร
  public static updateDocumentStatus(id: string, status: DocumentStatus): boolean {
    const document = this.getDocumentById(id);
    if (!document) return false;

    document.status = status;
    return true;
  }

  // ลบเอกสาร
  public static deleteDocument(id: string): boolean {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) return false;

    this.documents.splice(index, 1);
    return true;
  }

  // ดึงสถิติเอกสาร
  public static getDocumentStats(userId?: string) {
    const documents = userId ? this.getDocumentsByUserId(userId) : this.documents;
    return {
      total: documents.length,
      active: documents.filter(doc => doc.status === 'active').length,
      expired: documents.filter(doc => doc.status === 'expired').length,
      pending: documents.filter(doc => doc.status === 'pending').length,
      rejected: documents.filter(doc => doc.status === 'rejected').length
    };
  }

  // ดึงสีสถานะ
  public static getStatusColor(status: DocumentStatus): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // ดึงข้อความสถานะภาษาไทย
  public static getStatusText(status: DocumentStatus): string {
    switch (status) {
      case 'active':
        return 'ใช้งานได้';
      case 'expired':
        return 'หมดอายุ';
      case 'pending':
        return 'รอการอนุมัติ';
      case 'rejected':
        return 'ถูกปฏิเสธ';
      default:
        return 'ไม่ทราบสถานะ';
    }
  }

  // ดึงไอคอนประเภทเอกสาร
  public static getDocumentIcon(documentType: DocumentType): string {
    switch (documentType) {
      case 'id_card':
        return '🆔';
      case 'driving_license':
        return '🚗';
      case 'passport':
        return '📘';
      case 'marriage_certificate':
        return '💒';
      case 'birth_certificate':
        return '👶';
      default:
        return '📄';
    }
  }

  // ดึงชื่อประเภทเอกสารภาษาไทย
  public static getDocumentTypeName(documentType: DocumentType): string {
    switch (documentType) {
      case 'id_card':
        return 'บัตรประชาชน';
      case 'driving_license':
        return 'ใบขับขี่';
      case 'passport':
        return 'หนังสือเดินทาง';
      case 'marriage_certificate':
        return 'ใบสำคัญสมรส';
      case 'birth_certificate':
        return 'สูติบัตร';
      default:
        return 'เอกสารอื่น';
    }
  }
}
