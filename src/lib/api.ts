// API Service for connecting to backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(username: string, password: string) {
    const response = await this.request<{
      message: string;
      token: string;
      user: {
        id: number;
        username: string;
        email: string;
        fullName: string;
        role: string;
        status: string;
      };
    }>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    this.token = response.token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
    }

    return response;
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    address: string;
    idCard: string;
    birthDate: string;
    gender: string;
  }) {
    return this.request<{
      message: string;
      user: any;
    }>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  logout() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // User methods
  async getUsers(filters?: {
    role?: string;
    status?: string;
    search?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.role) params.append('role', filters.role);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    const endpoint = queryString ? `/users?${queryString}` : '/users';
    
    return this.request<any[]>(endpoint);
  }

  async getUser(id: number) {
    return this.request<any>(`/users/${id}`);
  }

  async createUser(userData: {
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: string;
    phone?: string;
    address?: string;
    idCard?: string;
    department?: string;
    position?: string;
    notes?: string;
  }) {
    return this.request<{
      message: string;
      user: any;
    }>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUserStatus(id: number, status: string) {
    return this.request<{
      message: string;
      user: any;
    }>(`/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async updateUserRole(id: number, role: string) {
    return this.request<{
      message: string;
      user: any;
    }>(`/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(id: number) {
    return this.request<{
      message: string;
      user: any;
    }>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async getUserStats() {
    return this.request<{
      total: number;
      active: number;
      pending: number;
      suspended: number;
      citizens: number;
      officers: number;
      admins: number;
    }>('/users/stats/overview');
  }

  // Reports methods
  async getReports(filters?: { status?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);

    const queryString = params.toString();
    const endpoint = queryString ? `/reports?${queryString}` : '/reports';
    
    return this.request<any[]>(endpoint);
  }

  async getUserReports(userId: number) {
    return this.request<any[]>(`/reports/user/${userId}`);
  }

  async getReport(id: number) {
    return this.request<any>(`/reports/${id}`);
  }

  async createReport(reportData: {
    reportType: string;
    userAnswers: { [key: string]: string };
    personalInfo: {
      name: string;
      idCard: string;
      address: string;
      phone: string;
      email: string;
    };
    attachments?: any[];
  }) {
    return this.request<{
      message: string;
      report: any;
    }>('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  async updateReportStatus(id: number, status: string, reviewNotes?: string) {
    return this.request<{
      message: string;
      report: any;
    }>(`/reports/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reviewNotes }),
    });
  }

  async getReportStats() {
    return this.request<{
      total: number;
      pending: number;
      approved: number;
      rejected: number;
    }>('/reports/stats/overview');
  }

  // Document submissions methods
  async getDocumentSubmissions(filters?: { status?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);

    const queryString = params.toString();
    const endpoint = queryString ? `/documents?${queryString}` : '/documents';
    
    return this.request<any[]>(endpoint);
  }

  async getUserDocumentSubmissions(userId: number) {
    return this.request<any[]>(`/documents/user/${userId}`);
  }

  async getDocumentSubmission(id: number) {
    return this.request<any>(`/documents/${id}`);
  }

  async createDocumentSubmission(submissionData: {
    documentType: string;
    documentTypeName: string;
    files: { [key: string]: any };
    personalInfo: {
      name: string;
      idCard: string;
      address: string;
      phone: string;
      email: string;
    };
  }) {
    return this.request<{
      message: string;
      submission: any;
    }>('/documents', {
      method: 'POST',
      body: JSON.stringify(submissionData),
    });
  }

  async updateDocumentSubmissionStatus(
    id: number,
    status: string,
    reviewNotes?: string,
    progress?: number
  ) {
    return this.request<{
      message: string;
      submission: any;
    }>(`/documents/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reviewNotes, progress }),
    });
  }

  async getDocumentSubmissionStats() {
    return this.request<{
      total: number;
      pending: number;
      approved: number;
      rejected: number;
    }>('/documents/stats/overview');
  }

  // Health check
  async healthCheck() {
    return this.request<{
      status: string;
      message: string;
      timestamp: string;
    }>('/health');
  }

  // Digital Documents methods
  async getDigitalDocuments() {
    return this.request<any[]>('/digital-documents');
  }

  async getDigitalDocument(id: number) {
    return this.request<any>(`/digital-documents/${id}`);
  }

  async createDigitalDocument(documentData: {
    userId: number;
    documentType: string;
    documentName: string;
    documentNumber: string;
    issueDate: string;
    expiryDate: string | null;
    status?: string;
    issuedBy: string;
    officerNotes?: string;
    fileUrl?: string;
  }) {
    return this.request<{
      message: string;
      document: any;
    }>('/digital-documents', {
      method: 'POST',
      body: JSON.stringify(documentData),
    });
  }

  async updateDigitalDocument(id: number, updates: any) {
    return this.request<{
      message: string;
      document: any;
    }>(`/digital-documents/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Notifications methods
  async getNotifications(isRead?: boolean) {
    const params = new URLSearchParams();
    if (isRead !== undefined) params.append('isRead', isRead.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/notifications?${queryString}` : '/notifications';
    
    return this.request<any[]>(endpoint);
  }

  async getUnreadCount() {
    return this.request<{ count: number }>('/notifications/unread-count');
  }

  async markNotificationAsRead(id: number) {
    return this.request<{
      message: string;
      notification: any;
    }>(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request<{
      message: string;
      count: number;
    }>('/notifications/mark-all-read', {
      method: 'PATCH',
    });
  }

  async deleteNotification(id: number) {
    return this.request<{
      message: string;
    }>(`/notifications/${id}`, {
      method: 'DELETE',
    });
  }
}

// Create singleton instance
const apiService = new ApiService(API_BASE_URL);

export default apiService;

