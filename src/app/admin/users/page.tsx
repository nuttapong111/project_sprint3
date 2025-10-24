'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  IdentificationIcon,
  BuildingOfficeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import { UserManagement, User, UserRole, UserStatus } from '@/lib/userManagement';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    fullName: '',
    role: 'citizen' as UserRole,
    phone: '',
    address: '',
    idCard: '',
    department: '',
    position: '',
    notes: ''
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = UserManagement.getAllUsers();
    setUsers(allUsers);
  };

  const getStatusColor = (status: UserStatus) => {
    return UserManagement.getStatusColor(status);
  };

  const getStatusText = (status: UserStatus) => {
    return UserManagement.getStatusText(status);
  };

  const getRoleColor = (role: UserRole) => {
    return UserManagement.getRoleColor(role);
  };

  const getRoleText = (role: UserRole) => {
    return UserManagement.getRoleText(role);
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.idCard?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email || !newUser.fullName) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const user = UserManagement.createUser(
      newUser.username,
      newUser.email,
      newUser.fullName,
      newUser.role,
      newUser.phone || undefined,
      newUser.address || undefined,
      newUser.idCard || undefined,
      newUser.department || undefined,
      newUser.position || undefined,
      newUser.notes || undefined
    );

    if (user) {
      loadUsers();
      setShowAddModal(false);
      setNewUser({
        username: '',
        email: '',
        fullName: '',
        role: 'citizen',
        phone: '',
        address: '',
        idCard: '',
        department: '',
        position: '',
        notes: ''
      });
      alert('เพิ่มผู้ใช้เรียบร้อยแล้ว!');
    }
  };

  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    const success = UserManagement.changeUserStatus(userId, newStatus);
    if (success) {
      loadUsers();
      alert(`เปลี่ยนสถานะเป็น "${getStatusText(newStatus)}" เรียบร้อยแล้ว`);
    }
  };

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const success = UserManagement.changeUserRole(userId, newRole);
    if (success) {
      loadUsers();
      alert(`เปลี่ยนบทบาทเป็น "${getRoleText(newRole)}" เรียบร้อยแล้ว`);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) {
      const success = UserManagement.deleteUser(userId);
      if (success) {
        loadUsers();
        alert('ลบผู้ใช้เรียบร้อยแล้ว!');
      }
    }
  };

  const stats = UserManagement.getUserStats();

  const userRoles: { value: UserRole; label: string }[] = [
    { value: 'citizen', label: 'ประชาชน' },
    { value: 'officer', label: 'เจ้าหน้าที่' },
    { value: 'admin', label: 'ผู้ดูแลระบบ' }
  ];

  const officerRoles: { value: UserRole; label: string }[] = [
    { value: 'officer', label: 'เจ้าหน้าที่' },
    { value: 'admin', label: 'ผู้ดูแลระบบ' }
  ];

  const userStatuses: { value: UserStatus; label: string }[] = [
    { value: 'active', label: 'ใช้งานได้' },
    { value: 'inactive', label: 'ไม่ใช้งาน' },
    { value: 'suspended', label: 'ระงับการใช้งาน' },
    { value: 'pending', label: 'รอการอนุมัติ' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userType="admin" />
      
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
                จัดการผู้ใช้งาน
              </h1>
              <p className="text-gray-600">
                จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึงระบบ
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5" />
              <span>เพิ่มเจ้าหน้าที่</span>
            </button>
          </div>

          {/* สถิติ */}
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">ทั้งหมด</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">ใช้งานได้</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">รอการอนุมัติ</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
              <div className="text-sm text-gray-600">ระงับการใช้งาน</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.citizens}</div>
              <div className="text-sm text-gray-600">ประชาชน</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.officers}</div>
              <div className="text-sm text-gray-600">เจ้าหน้าที่</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.admins}</div>
              <div className="text-sm text-gray-600">ผู้ดูแลระบบ</div>
            </div>
          </div>

          {/* ตัวกรองและค้นหา */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาตามชื่อ, อีเมล, เบอร์โทร, หรือหมายเลขบัตร..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">บทบาททั้งหมด</option>
                  {userRoles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as UserStatus | 'all')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">สถานะทั้งหมด</option>
                  {userStatuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* รายการผู้ใช้ */}
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ไม่พบผู้ใช้
                </h3>
                <p className="text-gray-600">
                  ยังไม่มีผู้ใช้ในเงื่อนไขที่เลือก
                </p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gray-100 rounded-full">
                        <UserIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.fullName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          @{user.username} • {user.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          สมัครเมื่อ: {user.createdAt.toLocaleDateString('th-TH')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                        {getRoleText(user.role)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    {user.phone && (
                      <div className="flex items-center space-x-2">
                        <PhoneIcon className="h-4 w-4" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.department && (
                      <div className="flex items-center space-x-2">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span>{user.department}</span>
                      </div>
                    )}
                    {user.position && (
                      <div className="flex items-center space-x-2">
                        <BriefcaseIcon className="h-4 w-4" />
                        <span>{user.position}</span>
                      </div>
                    )}
                  </div>

                  {/* ปุ่มดำเนินการ */}
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>ดูรายละเอียด</span>
                    </button>
                    {user.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(user.id, 'active')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        <span>อนุมัติ</span>
                      </button>
                    )}
                    {user.status === 'active' && (
                      <button
                        onClick={() => handleStatusChange(user.id, 'suspended')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <XCircleIcon className="h-4 w-4" />
                        <span>ระงับการใช้งาน</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal รายละเอียดผู้ใช้ */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  รายละเอียดผู้ใช้
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
                  <div className="p-3 bg-gray-100 rounded-full">
                    <UserIcon className="h-8 w-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {selectedUser.fullName}
                    </h3>
                    <p className="text-gray-600">@{selectedUser.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                    <p className="text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">บทบาท</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(selectedUser.role)}`}>
                      {getRoleText(selectedUser.role)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedUser.status)}`}>
                      {getStatusText(selectedUser.status)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">วันที่สมัคร</label>
                    <p className="text-gray-900">{selectedUser.createdAt.toLocaleDateString('th-TH')}</p>
                  </div>
                  {selectedUser.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                      <p className="text-gray-900">{selectedUser.phone}</p>
                    </div>
                  )}
                  {selectedUser.idCard && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">หมายเลขบัตรประชาชน</label>
                      <p className="text-gray-900">{selectedUser.idCard}</p>
                    </div>
                  )}
                  {selectedUser.department && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">หน่วยงาน</label>
                      <p className="text-gray-900">{selectedUser.department}</p>
                    </div>
                  )}
                  {selectedUser.position && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ตำแหน่ง</label>
                      <p className="text-gray-900">{selectedUser.position}</p>
                    </div>
                  )}
                  {selectedUser.address && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
                      <p className="text-gray-900">{selectedUser.address}</p>
                    </div>
                  )}
                  {selectedUser.notes && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ</label>
                      <p className="text-gray-900">{selectedUser.notes}</p>
                    </div>
                  )}
                </div>

                {/* ปุ่มดำเนินการ */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    ปิด
                  </button>
                  {selectedUser.status === 'pending' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedUser.id, 'active');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      อนุมัติ
                    </button>
                  )}
                  {selectedUser.status === 'active' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedUser.id, 'suspended');
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      ระงับการใช้งาน
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal เพิ่มผู้ใช้ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  เพิ่มเจ้าหน้าที่/ผู้ดูแลระบบ
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
                      ชื่อผู้ใช้ *
                    </label>
                    <input
                      type="text"
                      value={newUser.username}
                      onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอกชื่อผู้ใช้"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      อีเมล *
                    </label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอกอีเมล"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อ-นามสกุล *
                    </label>
                    <input
                      type="text"
                      value={newUser.fullName}
                      onChange={(e) => setNewUser(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอกชื่อ-นามสกุล"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      บทบาท *
                    </label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as UserRole }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {officerRoles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอกเบอร์โทรศัพท์"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หมายเลขบัตรประชาชน
                    </label>
                    <input
                      type="text"
                      value={newUser.idCard}
                      onChange={(e) => setNewUser(prev => ({ ...prev, idCard: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอกหมายเลขบัตรประชาชน"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หน่วยงาน
                    </label>
                    <input
                      type="text"
                      value={newUser.department}
                      onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอกหน่วยงาน"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ตำแหน่ง
                    </label>
                    <input
                      type="text"
                      value={newUser.position}
                      onChange={(e) => setNewUser(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอกตำแหน่ง"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ที่อยู่
                    </label>
                    <textarea
                      value={newUser.address}
                      onChange={(e) => setNewUser(prev => ({ ...prev, address: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="กรอกที่อยู่"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หมายเหตุ
                    </label>
                    <textarea
                      value={newUser.notes}
                      onChange={(e) => setNewUser(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
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
                  onClick={handleAddUser}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>เพิ่มเจ้าหน้าที่</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
