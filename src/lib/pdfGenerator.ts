// PDF Generator for Daily Reports
export interface DailyReportData {
  reportType: string;
  userAnswers: { [key: string]: string };
  personalInfo: {
    name: string;
    idCard: string;
    address: string;
    phone: string;
    email: string;
  };
  reportDate: Date;
  attachments?: {
    name: string;
    type: string;
    size: number;
    url?: string;
  }[];
}

export class PDFGenerator {
  private static generateHeader(): string {
    return `
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
        <h1 style="color: #1e40af; font-size: 24px; margin: 0;">บันทึกประจำวัน</h1>
        <p style="color: #64748b; font-size: 14px; margin: 5px 0;">Daily Report</p>
        <p style="color: #64748b; font-size: 12px; margin: 0;">ระบบบันทึกประจำวันออนไลน์ - กรมการปกครอง</p>
      </div>
    `;
  }

  private static generatePersonalInfo(data: DailyReportData): string {
    return `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1e40af; font-size: 18px; margin-bottom: 15px; border-left: 4px solid #2563eb; padding-left: 10px;">
          ข้อมูลผู้บันทึก
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold; width: 30%;">
              ชื่อ-นามสกุล
            </td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.personalInfo.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">
              เลขบัตรประชาชน
            </td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.personalInfo.idCard}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">
              ที่อยู่
            </td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.personalInfo.address}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">
              เบอร์โทรศัพท์
            </td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.personalInfo.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">
              อีเมล
            </td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.personalInfo.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb; background-color: #f9fafb; font-weight: bold;">
              วันที่บันทึก
            </td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.reportDate.toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</td>
          </tr>
        </table>
      </div>
    `;
  }

  private static generateCrimeDetails(data: DailyReportData): string {
    const reportTypeNames: { [key: string]: string } = {
      theft: 'การลักทรัพย์',
      fraud: 'การทุจริต',
      violence: 'การใช้ความรุนแรง',
      cyber: 'อาชญากรรมไซเบอร์',
      other: 'อื่นๆ'
    };

    return `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1e40af; font-size: 18px; margin-bottom: 15px; border-left: 4px solid #2563eb; padding-left: 10px;">
          รายละเอียดการบันทึก
        </h2>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1e40af;">
            ประเภทการบันทึก: ${reportTypeNames[data.reportType] || data.reportType}
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #374151; font-size: 16px; margin-bottom: 10px;">รายละเอียดการบันทึกประจำวัน</h3>
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
            ${Object.entries(data.userAnswers).map(([question, answer], index) => `
              <div style="margin-bottom: 15px; ${index < Object.entries(data.userAnswers).length - 1 ? 'border-bottom: 1px solid #f3f4f6; padding-bottom: 15px;' : ''}">
                <p style="font-weight: bold; color: #374151; margin-bottom: 5px; font-size: 14px;">
                  คำถาม: ${question}
                </p>
                <p style="color: #6b7280; margin: 0; line-height: 1.6;">
                  คำตอบ: ${answer}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  private static generateAttachments(data: DailyReportData): string {
    if (!data.attachments || data.attachments.length === 0) {
      return '';
    }

    return `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #1e40af; font-size: 18px; margin-bottom: 15px; border-left: 4px solid #2563eb; padding-left: 10px;">
          หลักฐานที่แนบ
        </h2>
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            ${data.attachments.map((attachment, index) => `
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; background-color: #f9fafb;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <div style="width: 40px; height: 40px; background-color: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <span style="color: white; font-weight: bold; font-size: 14px;">
                      ${attachment.type === 'image' ? '🖼️' : attachment.type === 'video' ? '🎥' : attachment.type === 'audio' ? '🎵' : '📄'}
                    </span>
                  </div>
                  <div style="flex: 1;">
                    <p style="margin: 0; font-weight: bold; color: #374151; font-size: 14px; word-break: break-all;">
                      ${attachment.name}
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">
                      ${(attachment.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div style="border-top: 1px solid #e5e7eb; padding-top: 8px;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    ประเภท: ${attachment.type === 'image' ? 'รูปภาพ' : attachment.type === 'video' ? 'วิดีโอ' : attachment.type === 'audio' ? 'เสียง' : 'เอกสาร'}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  private static generateFooter(): string {
    return `
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
        <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">
          บันทึกนี้ถูกสร้างขึ้นโดยระบบบันทึกประจำวันออนไลน์
        </p>
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          กรมการปกครอง กระทรวงมหาดไทย
        </p>
        <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">
          สร้างเมื่อ: ${new Date().toLocaleString('th-TH')}
        </p>
      </div>
    `;
  }

  public static generateHTML(data: DailyReportData): string {
    return `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>บันทึกประจำวัน</title>
        <style>
          body {
            font-family: 'Sarabun', 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #374151;
            margin: 0;
            padding: 20px;
            background-color: #ffffff;
          }
          @page {
            margin: 1in;
            size: A4;
          }
          h1, h2, h3 {
            font-family: 'Sarabun', sans-serif;
          }
          table {
            font-size: 14px;
          }
          .page-break {
            page-break-before: always;
          }
        </style>
      </head>
      <body>
        ${this.generateHeader()}
        ${this.generatePersonalInfo(data)}
        ${this.generateCrimeDetails(data)}
        ${this.generateAttachments(data)}
        ${this.generateFooter()}
      </body>
      </html>
    `;
  }

  public static async generatePDF(data: DailyReportData): Promise<Blob> {
    // In a real implementation, you would use a library like jsPDF or Puppeteer
    // For now, we'll return a mock PDF blob
    const html = this.generateHTML(data);
    
    // This is a simplified version - in production you'd use a proper PDF library
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html, data })
    });
    
    return await response.blob();
  }

  public static downloadPDF(data: DailyReportData, filename?: string): void {
    const html = this.generateHTML(data);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `บันทึกประจำวัน_${data.reportType}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
