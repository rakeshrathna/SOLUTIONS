import { create } from 'zustand';

export interface UserInfo {
  id: number;
  registerNumber: string;
  role: 'ADMIN' | 'STUDENT';
  studentName?: string;
  studentId?: number;
}

export interface SubjectStatus {
  code: string;
  name: string;
  status: 'ACTIVE' | 'LOCKED';
}

export interface StudentDashboardData {
  studentName: string;
  className: string;
  board: string;
  registerNumber: string;
  subjects: SubjectStatus[];
}

export interface StudentAdminItem {
  registerNumber: string;
  temporaryPassword?: string;
  studentId: number;
  studentName: string;
  className: string;
  board: string;
  enrolledSubjects: string[];
}

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  studentDashboard: StudentDashboardData | null;
  isLoading: boolean;
  error: string | null;
  login: (registerNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchStudentDashboard: () => Promise<void>;
  createStudent: (data: { studentName: string; className: string; board: string; subjects: string[] }) => Promise<StudentAdminItem>;
  fetchAdminStudents: () => Promise<StudentAdminItem[]>;
}

const getStoredToken = (): string | null => {
  return localStorage.getItem('learnova_auth_token');
};

const getStoredUser = (): UserInfo | null => {
  const raw = localStorage.getItem('learnova_auth_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const parseResponseData = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return { message: 'Invalid server JSON response' };
    }
  }
  const text = await response.text();
  return { message: text || `Server returned error (${response.status})` };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: getStoredToken(),
  user: getStoredUser(),
  studentDashboard: null,
  isLoading: false,
  error: null,

  login: async (registerNumber, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registerNumber, password }),
      });

      const data = await parseResponseData(response);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Invalid register number or password.');
      }

      localStorage.setItem('learnova_auth_token', data.token);
      localStorage.setItem('learnova_auth_user', JSON.stringify(data.user));

      set({
        token: data.token,
        user: data.user,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (err: any) {
      set({ error: err.message || 'Authentication error', isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('learnova_auth_token');
    localStorage.removeItem('learnova_auth_user');
    set({ token: null, user: null, studentDashboard: null, error: null });
  },

  fetchStudentDashboard: async () => {
    const { token } = get();
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/student/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await parseResponseData(response);
      if (response.ok) {
        set({ studentDashboard: data, isLoading: false });
      } else {
        set({ error: data.message || 'Failed to load student dashboard', isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  createStudent: async (formData) => {
    const { token } = get();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch('/api/admin/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await parseResponseData(response);
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create student');
    }
    return data;
  },

  fetchAdminStudents: async () => {
    const { token } = get();
    if (!token) return [];

    try {
      const response = await fetch('/api/admin/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        return await parseResponseData(response);
      }
    } catch {
      return [];
    }
    return [];
  },
}));
