// Document Submission Management System

export type DocumentStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'needs_correction';

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  uploadedAt: Date;
}

export interface DocumentSubmission {
  id: string;
  userId: string;
  documentType: string;
  documentTypeName: string;
  files: { [key: string]: DocumentFile };
  personalInfo: {
    name: string;
    idCard: string;
    address: string;
    phone: string;
    email: string;
  };
  status: DocumentStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
  progress: number; // 0-100
  estimatedCompletionDate?: Date;
}

export class DocumentSubmissionManager {
  private static submissions: DocumentSubmission[] = [
    // ข้อมูลตัวอย่าง
    {
      id: 'sub_001',
      userId: 'current_user',
      documentType: 'building_permit',
      documentTypeName: 'ใบอนุญาตก่อสร้าง',
      files: {
        'แบบแปลนอาคาร (PDF)': {
          id: 'file_001',
          name: 'building_plan.pdf',
          type: 'application/pdf',
          size: 2048000,
          uploadedAt: new Date('2024-12-20T10:30:00Z')
        },
        'หนังสือรับรองวิศวกร (PDF)': {
          id: 'file_002',
          name: 'engineer_certificate.pdf',
          type: 'application/pdf',
          size: 1536000,
          uploadedAt: new Date('2024-12-20T10:35:00Z')
        }
      },
      personalInfo: {
        name: 'สมชาย ใจดี',
        idCard: '1234567890123',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
        phone: '0812345678',
        email: 'john.doe@email.com'
      },
      status: 'pending',
      submittedAt: new Date('2024-12-20T10:40:00Z'),
      progress: 60,
      estimatedCompletionDate: new Date('2024-12-27T17:00:00Z')
    },
    {
      id: 'sub_002',
      userId: 'current_user',
      documentType: 'business_license',
      documentTypeName: 'ใบอนุญาตประกอบการ',
      files: {
        'สำเนาบัตรประชาชน (PDF/JPG)': {
          id: 'file_003',
          name: 'id_card.pdf',
          type: 'application/pdf',
          size: 1024000,
          uploadedAt: new Date('2024-12-15T09:15:00Z')
        },
        'หนังสือรับรองบริษัท (PDF)': {
          id: 'file_004',
          name: 'company_certificate.pdf',
          type: 'application/pdf',
          size: 2560000,
          uploadedAt: new Date('2024-12-15T09:20:00Z')
        },
        'แผนที่ตั้งสถานที่ (PDF/JPG)': {
          id: 'file_005',
          name: 'location_map.jpg',
          type: 'image/jpeg',
          size: 3072000,
          uploadedAt: new Date('2024-12-15T09:25:00Z')
        }
      },
      personalInfo: {
        name: 'สมชาย ใจดี',
        idCard: '1234567890123',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
        phone: '0812345678',
        email: 'john.doe@email.com'
      },
      status: 'approved',
      submittedAt: new Date('2024-12-15T09:30:00Z'),
      reviewedAt: new Date('2024-12-18T14:20:00Z'),
      reviewedBy: 'เจ้าหน้าที่ตรวจสอบ',
      reviewNotes: 'เอกสารครบถ้วน อนุมัติให้ดำเนินการ',
      progress: 100,
      estimatedCompletionDate: new Date('2024-12-18T17:00:00Z')
    },
    {
      id: 'sub_003',
      userId: 'current_user',
      documentType: 'driving_license',
      documentTypeName: 'ใบขับขี่',
      files: {
        'สำเนาบัตรประชาชน (PDF/JPG)': {
          id: 'file_006',
          name: 'id_card_copy.pdf',
          type: 'application/pdf',
          size: 1024000,
          uploadedAt: new Date('2024-12-10T14:00:00Z')
        }
      },
      personalInfo: {
        name: 'สมชาย ใจดี',
        idCard: '1234567890123',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
        phone: '0812345678',
        email: 'john.doe@email.com'
      },
      status: 'needs_correction',
      submittedAt: new Date('2024-12-10T14:05:00Z'),
      reviewedAt: new Date('2024-12-12T11:30:00Z'),
      reviewedBy: 'เจ้าหน้าที่ตรวจสอบ',
      reviewNotes: 'กรุณาเพิ่มใบรับรองแพทย์และรูปถ่าย 2 นิ้ว',
      progress: 30,
      estimatedCompletionDate: new Date('2024-12-20T17:00:00Z')
    }
  ];

  // สร้างการยื่นเอกสารใหม่
  public static createSubmission(
    userId: string,
    documentType: string,
    documentTypeName: string,
    files: { [key: string]: DocumentFile },
    personalInfo: {
      name: string;
      idCard: string;
      address: string;
      phone: string;
      email: string;
    }
  ): DocumentSubmission {
    const submission: DocumentSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      userId,
      documentType,
      documentTypeName,
      files,
      personalInfo,
      status: 'pending',
      submittedAt: new Date(),
      progress: 0,
      estimatedCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 วัน
    };

    this.submissions.push(submission);
    return submission;
  }

  // ดึงการยื่นเอกสารตาม ID
  public static getSubmissionById(id: string): DocumentSubmission | undefined {
    return this.submissions.find(submission => submission.id === id);
  }

  // ดึงการยื่นเอกสารตาม User ID
  public static getSubmissionsByUserId(userId: string): DocumentSubmission[] {
    return this.submissions
      .filter(submission => submission.userId === userId)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  // ดึงการยื่นเอกสารทั้งหมด (สำหรับเจ้าหน้าที่)
  public static getAllSubmissions(): DocumentSubmission[] {
    return this.submissions.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  // อัปเดตสถานะการยื่นเอกสาร
  public static updateSubmissionStatus(
    id: string,
    status: DocumentStatus,
    reviewedBy?: string,
    reviewNotes?: string
  ): boolean {
    const submission = this.getSubmissionById(id);
    if (!submission) return false;

    submission.status = status;
    submission.reviewedAt = new Date();
    submission.reviewedBy = reviewedBy;
    submission.reviewNotes = reviewNotes;

    // อัปเดตความคืบหน้า
    switch (status) {
      case 'pending':
        submission.progress = 0;
        break;
      case 'under_review':
        submission.progress = 50;
        break;
      case 'approved':
        submission.progress = 100;
        break;
      case 'rejected':
        submission.progress = 0;
        break;
      case 'needs_correction':
        submission.progress = 30;
        break;
    }

    return true;
  }

  // ดึงการยื่นเอกสารล่าสุด (สำหรับแสดงในหน้าหลัก)
  public static getRecentSubmissions(userId: string, limit: number = 3): DocumentSubmission[] {
    return this.getSubmissionsByUserId(userId).slice(0, limit);
  }

  // ดึงสถิติการยื่นเอกสาร
  public static getSubmissionStats(userId: string) {
    const submissions = this.getSubmissionsByUserId(userId);
    return {
      total: submissions.length,
      pending: submissions.filter(s => s.status === 'pending').length,
      underReview: submissions.filter(s => s.status === 'under_review').length,
      approved: submissions.filter(s => s.status === 'approved').length,
      rejected: submissions.filter(s => s.status === 'rejected').length,
      needsCorrection: submissions.filter(s => s.status === 'needs_correction').length
    };
  }

  // ดึงสีสถานะ
  public static getStatusColor(status: DocumentStatus): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'needs_correction':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // ดึงข้อความสถานะภาษาไทย
  public static getStatusText(status: DocumentStatus): string {
    switch (status) {
      case 'pending':
        return 'รอการตรวจสอบ';
      case 'under_review':
        return 'กำลังตรวจสอบ';
      case 'approved':
        return 'อนุมัติแล้ว';
      case 'rejected':
        return 'ปฏิเสธ';
      case 'needs_correction':
        return 'ต้องแก้ไข';
      default:
        return 'ไม่ทราบสถานะ';
    }
  }
}
