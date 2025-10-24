// User Management System for Admin

export type UserRole = 'citizen' | 'officer' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  lastLoginAt?: Date;
  phone?: string;
  address?: string;
  idCard?: string;
  department?: string; // For officers
  position?: string; // For officers
  notes?: string;
}

export class UserManagement {
  private static users: User[] = [
    // ข้อมูลตัวอย่าง
    {
      id: 'user_001',
      username: 'john_doe',
      email: 'john.doe@email.com',
      fullName: 'สมชาย ใจดี',
      role: 'citizen',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastLoginAt: new Date('2024-12-24T10:30:00Z'),
      phone: '0812345678',
      address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
      idCard: '1234567890123'
    },
    {
      id: 'user_002',
      username: 'jane_smith',
      email: 'jane.smith@email.com',
      fullName: 'สมหญิง รักดี',
      role: 'citizen',
      status: 'active',
      createdAt: new Date('2024-02-20'),
      lastLoginAt: new Date('2024-12-23T14:20:00Z'),
      phone: '0823456789',
      address: '456 ถนนราชดำริ กรุงเทพฯ 10330',
      idCard: '9876543210987'
    },
    {
      id: 'user_003',
      username: 'officer_001',
      email: 'officer1@gov.th',
      fullName: 'นพ. สมศักดิ์ ใจกล้า',
      role: 'officer',
      status: 'active',
      createdAt: new Date('2024-01-10'),
      lastLoginAt: new Date('2024-12-24T09:15:00Z'),
      phone: '0834567890',
      address: '789 ถนนลาดพร้าว กรุงเทพฯ 10230',
      idCard: '5555555555555',
      department: 'สำนักงานเขตบางรัก',
      position: 'เจ้าหน้าที่ตรวจสอบเอกสาร'
    },
    {
      id: 'user_004',
      username: 'officer_002',
      email: 'officer2@gov.th',
      fullName: 'นางสาว สมหญิง ใจงาม',
      role: 'officer',
      status: 'active',
      createdAt: new Date('2024-03-05'),
      lastLoginAt: new Date('2024-12-23T16:45:00Z'),
      phone: '0845678901',
      address: '321 ถนนวิภาวดีรังสิต กรุงเทพฯ 10900',
      idCard: '1111111111111',
      department: 'กรมการขนส่งทางบก',
      position: 'เจ้าหน้าที่ตรวจสอบใบขับขี่'
    },
    {
      id: 'user_005',
      username: 'admin_001',
      email: 'admin@gov.th',
      fullName: 'ดร. ระบบดิจิทัล',
      role: 'admin',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      lastLoginAt: new Date('2024-12-24T08:00:00Z'),
      phone: '0856789012',
      address: '999 ถนนราชดำเนิน กรุงเทพฯ 10200',
      idCard: '9999999999999',
      department: 'สำนักงานรัฐบาลดิจิทัล',
      position: 'ผู้ดูแลระบบ'
    },
    {
      id: 'user_006',
      username: 'pending_user',
      email: 'pending@email.com',
      fullName: 'รอการอนุมัติ',
      role: 'citizen',
      status: 'pending',
      createdAt: new Date('2024-12-24'),
      phone: '0867890123',
      address: '555 ถนนสุขุมวิท กรุงเทพฯ 10110',
      idCard: '7777777777777'
    }
  ];

  // ดึงผู้ใช้ทั้งหมด
  public static getAllUsers(): User[] {
    return this.users.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // ดึงผู้ใช้ตาม ID
  public static getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // ดึงผู้ใช้ตามบทบาท
  public static getUsersByRole(role: UserRole): User[] {
    return this.users.filter(user => user.role === role);
  }

  // ดึงผู้ใช้ตามสถานะ
  public static getUsersByStatus(status: UserStatus): User[] {
    return this.users.filter(user => user.status === status);
  }

  // เพิ่มผู้ใช้ใหม่
  public static createUser(
    username: string,
    email: string,
    fullName: string,
    role: UserRole,
    phone?: string,
    address?: string,
    idCard?: string,
    department?: string,
    position?: string,
    notes?: string
  ): User {
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      username,
      email,
      fullName,
      role,
      status: 'pending',
      createdAt: new Date(),
      phone,
      address,
      idCard,
      department,
      position,
      notes
    };

    this.users.push(user);
    return user;
  }

  // อัปเดตผู้ใช้
  public static updateUser(
    id: string,
    updates: Partial<Omit<User, 'id' | 'createdAt'>>
  ): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return true;
  }

  // ลบผู้ใช้
  public static deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }

  // เปลี่ยนสถานะผู้ใช้
  public static changeUserStatus(id: string, status: UserStatus): boolean {
    return this.updateUser(id, { status });
  }

  // เปลี่ยนบทบาทผู้ใช้
  public static changeUserRole(id: string, role: UserRole): boolean {
    return this.updateUser(id, { role });
  }

  // ดึงสถิติผู้ใช้
  public static getUserStats() {
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter(user => user.status === 'active').length;
    const pendingUsers = this.users.filter(user => user.status === 'pending').length;
    const suspendedUsers = this.users.filter(user => user.status === 'suspended').length;
    
    const citizens = this.users.filter(user => user.role === 'citizen').length;
    const officers = this.users.filter(user => user.role === 'officer').length;
    const admins = this.users.filter(user => user.role === 'admin').length;

    return {
      total: totalUsers,
      active: activeUsers,
      pending: pendingUsers,
      suspended: suspendedUsers,
      citizens,
      officers,
      admins
    };
  }

  // ดึงสีสถานะ
  public static getStatusColor(status: UserStatus): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // ดึงข้อความสถานะภาษาไทย
  public static getStatusText(status: UserStatus): string {
    switch (status) {
      case 'active':
        return 'ใช้งานได้';
      case 'inactive':
        return 'ไม่ใช้งาน';
      case 'suspended':
        return 'ระงับการใช้งาน';
      case 'pending':
        return 'รอการอนุมัติ';
      default:
        return 'ไม่ทราบสถานะ';
    }
  }

  // ดึงสีบทบาท
  public static getRoleColor(role: UserRole): string {
    switch (role) {
      case 'citizen':
        return 'bg-blue-100 text-blue-800';
      case 'officer':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // ดึงข้อความบทบาทภาษาไทย
  public static getRoleText(role: UserRole): string {
    switch (role) {
      case 'citizen':
        return 'ประชาชน';
      case 'officer':
        return 'เจ้าหน้าที่';
      case 'admin':
        return 'ผู้ดูแลระบบ';
      default:
        return 'ไม่ทราบบทบาท';
    }
  }

  // ค้นหาผู้ใช้
  public static searchUsers(query: string): User[] {
    const lowercaseQuery = query.toLowerCase();
    return this.users.filter(user => 
      user.username.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      user.fullName.toLowerCase().includes(lowercaseQuery) ||
      user.phone?.toLowerCase().includes(lowercaseQuery) ||
      user.idCard?.toLowerCase().includes(lowercaseQuery)
    );
  }
}
