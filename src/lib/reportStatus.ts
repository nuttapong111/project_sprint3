// Report Status Management
export type ReportStatus = 'pending' | 'approved' | 'rejected' | 'under_review';

export interface DailyReport {
  id: string;
  userId: string;
  reportType: string;
  userAnswers: { [key: string]: string };
  personalInfo: {
    name: string;
    idCard: string;
    address: string;
    phone: string;
    email: string;
  };
  attachments?: {
    name: string;
    type: string;
    size: number;
    url?: string;
  }[];
  status: ReportStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
  downloadUrl?: string;
}

export class ReportStatusManager {
  private static reports: DailyReport[] = [
    // ข้อมูลตัวอย่างสำหรับการทดสอบ
    {
      id: 'report_001',
      userId: 'current_user',
      reportType: 'การลักทรัพย์',
      userAnswers: {
        'กรุณาบอกรายละเอียดของทรัพย์สินที่ถูกขโมย': 'โทรศัพท์มือถือ iPhone 14 Pro สีม่วง',
        'มูลค่าของทรัพย์สินที่ถูกขโมยประมาณเท่าไหร่': '45,000 บาท',
        'เหตุการณ์เกิดขึ้นเมื่อไหร่และที่ไหน': 'เมื่อวานนี้เวลา 14:00 น. ที่ห้างสรรพสินค้าเซ็นทรัล',
        'มีพยานหรือหลักฐานอะไรบ้าง': 'มีกล้องวงจรปิดในห้าง',
        'คุณสงสัยว่าใครเป็นผู้กระทำผิด': 'ไม่ทราบ'
      },
      personalInfo: {
        name: 'สมชาย ใจดี',
        idCard: '1234567890123',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
        phone: '0812345678',
        email: 'john.doe@email.com'
      },
      attachments: [
        {
          name: 'receipt_phone.jpg',
          type: 'image',
          size: 2048000,
          url: '#'
        }
      ],
      status: 'pending',
      submittedAt: new Date('2024-10-24T10:30:00Z')
    },
    {
      id: 'report_002',
      userId: 'current_user',
      reportType: 'การทุจริต',
      userAnswers: {
        'กรุณาอธิบายการทุจริตที่เกิดขึ้น': 'เจ้าหน้าที่เรียกเก็บเงินเกินจำนวนที่กำหนด',
        'จำนวนเงินที่เกี่ยวข้องเท่าไหร่': '5,000 บาท',
        'ใครเป็นผู้กระทำผิด': 'เจ้าหน้าที่ที่ทำหน้าที่เรียกเก็บเงิน',
        'เหตุการณ์เกิดขึ้นเมื่อไหร่': 'เมื่อวันที่ 20 ตุลาคม 2567',
        'คุณมีหลักฐานอะไรบ้าง': 'มีใบเสร็จและหลักฐานการโอนเงิน'
      },
      personalInfo: {
        name: 'สมชาย ใจดี',
        idCard: '1234567890123',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
        phone: '0812345678',
        email: 'john.doe@email.com'
      },
      attachments: [
        {
          name: 'receipt_corruption.pdf',
          type: 'document',
          size: 1024000,
          url: '#'
        }
      ],
      status: 'approved',
      submittedAt: new Date('2024-10-20T09:15:00Z'),
      reviewedAt: new Date('2024-10-21T14:30:00Z'),
      reviewedBy: 'เจ้าหน้าที่ตรวจสอบ',
      reviewNotes: 'ตรวจสอบแล้ว ข้อมูลครบถ้วน อนุมัติให้ดำเนินการ',
      downloadUrl: '#download-report-002'
    },
    {
      id: 'report_003',
      userId: 'current_user',
      reportType: 'อาชญากรรมไซเบอร์',
      userAnswers: {
        'กรุณาอธิบายการหลอกลวงที่เกิดขึ้น': 'ได้รับข้อความ SMS หลอกลวงให้โอนเงิน',
        'คุณเสียเงินไปเท่าไหร่': '10,000 บาท',
        'การหลอกลวงเกิดขึ้นผ่านช่องทางไหน': 'SMS และโทรศัพท์',
        'คุณมีหลักฐานการสนทนาหรือไม่': 'มีภาพหน้าจอข้อความ SMS',
        'คุณรู้จักผู้หลอกลวงหรือไม่': 'ไม่รู้จัก'
      },
      personalInfo: {
        name: 'สมชาย ใจดี',
        idCard: '1234567890123',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
        phone: '0812345678',
        email: 'john.doe@email.com'
      },
      attachments: [
        {
          name: 'sms_screenshot.png',
          type: 'image',
          size: 1536000,
          url: '#'
        }
      ],
      status: 'rejected',
      submittedAt: new Date('2024-10-18T16:45:00Z'),
      reviewedAt: new Date('2024-10-19T11:20:00Z'),
      reviewedBy: 'เจ้าหน้าที่ตรวจสอบ',
      reviewNotes: 'ข้อมูลไม่ครบถ้วน กรุณาเพิ่มหลักฐานการโอนเงินและรายละเอียดเพิ่มเติม'
    },
    {
      id: 'report_004',
      userId: 'current_user',
      reportType: 'การใช้ความรุนแรง',
      userAnswers: {
        'กรุณาอธิบายเหตุการณ์ที่เกิดขึ้น': 'ถูกทำร้ายร่างกายที่หน้าบ้าน',
        'คุณได้รับบาดเจ็บหรือไม่': 'มีบาดแผลที่แขนและขา',
        'เหตุการณ์เกิดขึ้นเมื่อไหร่และที่ไหน': 'เมื่อวันที่ 15 ตุลาคม 2567 เวลา 20:00 น. ที่หน้าบ้าน',
        'มีพยานหรือไม่': 'เพื่อนบ้านเห็นเหตุการณ์',
        'คุณรู้จักผู้กระทำผิดหรือไม่': 'ไม่รู้จัก'
      },
      personalInfo: {
        name: 'สมชาย ใจดี',
        idCard: '1234567890123',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
        phone: '0812345678',
        email: 'john.doe@email.com'
      },
      attachments: [
        {
          name: 'medical_certificate.pdf',
          type: 'document',
          size: 1536000,
          url: '#'
        },
        {
          name: 'injury_photos.jpg',
          type: 'image',
          size: 3072000,
          url: '#'
        }
      ],
      status: 'approved',
      submittedAt: new Date('2024-10-15T20:30:00Z'),
      reviewedAt: new Date('2024-10-16T09:15:00Z'),
      reviewedBy: 'เจ้าหน้าที่ตรวจสอบ',
      reviewNotes: 'ตรวจสอบแล้ว หลักฐานครบถ้วน อนุมัติให้ดำเนินคดี',
      downloadUrl: '#download-report-004'
    }
  ];

  // สร้างรายงานใหม่
  public static createReport(reportData: Omit<DailyReport, 'id' | 'status' | 'submittedAt'>): DailyReport {
    const report: DailyReport = {
      ...reportData,
      id: `report_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      status: 'pending',
      submittedAt: new Date()
    };
    
    this.reports.push(report);
    return report;
  }

  // ดึงรายงานตาม ID
  public static getReportById(id: string): DailyReport | undefined {
    return this.reports.find(report => report.id === id);
  }

  // ดึงรายงานตาม User ID
  public static getReportsByUserId(userId: string): DailyReport[] {
    return this.reports.filter(report => report.userId === userId);
  }

  // ดึงรายงานทั้งหมด (สำหรับเจ้าหน้าที่)
  public static getAllReports(): DailyReport[] {
    return this.reports.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  // ดึงรายงานตามสถานะ
  public static getReportsByStatus(status: ReportStatus): DailyReport[] {
    return this.reports.filter(report => report.status === status);
  }

  // อัปเดตสถานะรายงาน
  public static updateReportStatus(
    reportId: string, 
    status: ReportStatus, 
    reviewedBy: string, 
    reviewNotes?: string,
    downloadUrl?: string
  ): boolean {
    const report = this.getReportById(reportId);
    if (!report) return false;

    report.status = status;
    report.reviewedAt = new Date();
    report.reviewedBy = reviewedBy;
    if (reviewNotes) report.reviewNotes = reviewNotes;
    if (downloadUrl) report.downloadUrl = downloadUrl;

    return true;
  }

  // ดึงรายงานที่รอการตรวจสอบ
  public static getPendingReports(): DailyReport[] {
    return this.getReportsByStatus('pending');
  }

  // ดึงรายงานที่อนุมัติแล้ว
  public static getApprovedReports(): DailyReport[] {
    return this.getReportsByStatus('approved');
  }

  // ดึงรายงานที่ถูกปฏิเสธ
  public static getRejectedReports(): DailyReport[] {
    return this.getReportsByStatus('rejected');
  }

  // สร้าง Notification สำหรับประชาชน
  public static createNotification(reportId: string, status: ReportStatus): {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'success' | 'warning' | 'error';
    reportId: string;
    createdAt: Date;
  } {
    const report = this.getReportById(reportId);
    if (!report) throw new Error('Report not found');

    let title: string;
    let message: string;
    let type: 'success' | 'warning' | 'error';

    switch (status) {
      case 'approved':
        title = 'บันทึกประจำวันได้รับการอนุมัติ';
        message = `บันทึกประจำวันเรื่อง${report.reportType} ได้รับการอนุมัติแล้ว คุณสามารถดาวน์โหลดได้เลย`;
        type = 'success';
        break;
      case 'rejected':
        title = 'บันทึกประจำวันถูกปฏิเสธ';
        message = `บันทึกประจำวันเรื่อง${report.reportType} ถูกปฏิเสธ กรุณาติดต่อเจ้าหน้าที่เพื่อสอบถามรายละเอียด`;
        type = 'error';
        break;
      case 'under_review':
        title = 'บันทึกประจำวันอยู่ระหว่างการตรวจสอบ';
        message = `บันทึกประจำวันเรื่อง${report.reportType} อยู่ระหว่างการตรวจสอบโดยเจ้าหน้าที่`;
        type = 'warning';
        break;
      default:
        title = 'อัปเดตสถานะบันทึกประจำวัน';
        message = `บันทึกประจำวันเรื่อง${report.reportType} มีการอัปเดตสถานะ`;
        type = 'warning';
    }

    return {
      id: `notification_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      userId: report.userId,
      title,
      message,
      type,
      reportId,
      createdAt: new Date()
    };
  }
}
