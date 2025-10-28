// Interface for logged in user from API
export interface ApiUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  phone?: string;
  address?: string;
  idCard?: string;
}

// Context สำหรับจัดการข้อมูลผู้ใช้ปัจจุบัน
export class UserContext {
  private static currentUser: ApiUser | null = null;

  // ตั้งค่าผู้ใช้ปัจจุบัน
  public static setCurrentUser(user: ApiUser): void {
    this.currentUser = user;
    // เก็บข้อมูลใน localStorage เพื่อให้คงอยู่ระหว่างการรีเฟรช
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  // ดึงข้อมูลผู้ใช้ปัจจุบัน
  public static getCurrentUser(): ApiUser | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    // ถ้าไม่มีใน memory ให้ลองดึงจาก localStorage
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          this.currentUser = JSON.parse(storedUser);
          return this.currentUser;
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('currentUser');
        }
      }
    }

    return null;
  }

  // ลบข้อมูลผู้ใช้ปัจจุบัน
  public static clearCurrentUser(): void {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('auth_token');
    }
  }

  // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
  public static isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  // ดึงข้อมูลส่วนตัวของผู้ใช้
  public static getPersonalInfo() {
    const user = this.getCurrentUser();
    if (!user) {
      return {
        name: 'ผู้ใช้ไม่ระบุ',
        idCard: 'ไม่ระบุ',
        address: 'ไม่ระบุ',
        phone: 'ไม่ระบุ',
        email: 'ไม่ระบุ'
      };
    }

    return {
      name: user.fullName || 'ไม่ระบุชื่อ',
      idCard: user.idCard || 'ไม่ระบุ',
      address: user.address || 'ไม่ระบุ',
      phone: user.phone || 'ไม่ระบุ',
      email: user.email || 'ไม่ระบุ'
    };
  }
}
