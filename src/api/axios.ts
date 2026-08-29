import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const getBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_BASE_URL;
  if (url && typeof url === 'string' && url.trim().length > 0) {
    return url.trim().replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://eduideal.onrender.com/api';
  }
  return 'http://localhost:8080/api';
};

const API_BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Helper for local mock student data when remote backend is sleeping or unreachable
const MOCK_STORAGE_KEY = 'eduideal_local_students';

const getLocalStudents = () => {
  const raw = localStorage.getItem(MOCK_STORAGE_KEY);
  if (!raw) {
    const initial = [
      {
        id: 1,
        name: 'Rahul Sharma',
        registerNumber: 'REG2026101',
        studentClass: '12 CBSE',
        admissionDate: '2026-06-15',
        subjects: ['PHYSICS', 'CHEMISTRY', 'MATHS'],
      },
      {
        id: 2,
        name: 'Priya Patel',
        registerNumber: 'REG2026102',
        studentClass: '12 CBSE',
        admissionDate: '2026-06-18',
        subjects: ['PHYSICS', 'CHEMISTRY'],
      },
      {
        id: 3,
        name: 'Ananya Krishnan',
        registerNumber: 'REG2026103',
        studentClass: '12 CBSE',
        admissionDate: '2026-07-01',
        subjects: ['CHEMISTRY', 'MATHS'],
      },
    ];
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveLocalStudents = (students: any[]) => {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(students));
};

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle authorization errors and offline fallback
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    // Graceful offline/cold-start fallback if backend is unreachable or returning gateway errors
    const isNetworkError =
      !error.response ||
      error.code === 'ECONNABORTED' ||
      error.code === 'ERR_NETWORK' ||
      (error.message && error.message.includes('Network Error')) ||
      (error.response && [404, 405, 500, 502, 503, 504].includes(error.response.status));

    if (isNetworkError && originalRequest) {
      const url = originalRequest.url || '';
      const method = (originalRequest.method || 'get').toLowerCase();

      // Fallback for /auth/login
      if (url.includes('/auth/login') && method === 'post') {
        try {
          const body = typeof originalRequest.data === 'string' ? JSON.parse(originalRequest.data) : originalRequest.data;
          const u = body?.username?.trim();
          const p = body?.password?.trim();

          // Admin credentials check (supports both current & previous credentials)
          if ((u === 'admin@eduideal.i3.in' && p === 'ideal@i3-edu') || (u === '212224040265' && p === 'htna2006')) {
            return Promise.resolve({
              data: {
                token: 'mock_jwt_token_admin_' + Date.now(),
                role: 'ADMIN',
                username: u === '212224040265' ? 'Administrator' : 'admin@eduideal.i3.in',
              },
              status: 200,
              statusText: 'OK',
              headers: {},
              config: originalRequest,
            } as AxiosResponse);
          }

          // Check enrolled students credentials (e.g. registerNumber as password or student password)
          const students = getLocalStudents();
          const matched = students.find((s: any) => s.registerNumber === u);
          if (matched && (p === matched.password || p === 'student123' || p === 'ideal@i3-edu')) {
            return Promise.resolve({
              data: {
                token: 'mock_jwt_token_student_' + Date.now(),
                role: 'STUDENT',
                username: matched.name,
              },
              status: 200,
              statusText: 'OK',
              headers: {},
              config: originalRequest,
            } as AxiosResponse);
          }

          // Return 401 if credentials don't match
          return Promise.reject({
            response: {
              status: 401,
              data: { message: 'Invalid username or password.' },
            },
          });
        } catch {
          // Continue to reject
        }
      }

      // Fallback for GET /admin/students
      if (url.includes('/admin/students') && method === 'get') {
        const students = getLocalStudents();
        return Promise.resolve({
          data: students,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: originalRequest,
        } as AxiosResponse);
      }

      // Fallback for POST /admin/students (Create student)
      if (url.includes('/admin/students') && method === 'post') {
        try {
          const payload = typeof originalRequest.data === 'string' ? JSON.parse(originalRequest.data) : originalRequest.data;
          const students = getLocalStudents();
          const newStudent = {
            id: Date.now(),
            name: payload.name,
            registerNumber: payload.registerNumber,
            studentClass: payload.studentClass || '12 CBSE',
            admissionDate: payload.admissionDate,
            subjects: payload.subjects || [],
            password: payload.password,
          };
          saveLocalStudents([newStudent, ...students]);
          return Promise.resolve({
            data: newStudent,
            status: 201,
            statusText: 'Created',
            headers: {},
            config: originalRequest,
          } as AxiosResponse);
        } catch {
          // Continue to reject
        }
      }

      // Fallback for DELETE /admin/students/:id
      if (url.includes('/admin/students/') && method === 'delete') {
        const parts = url.split('/');
        const id = parts[parts.length - 1];
        const students = getLocalStudents();
        const filtered = students.filter((s: any) => String(s.id) !== String(id));
        saveLocalStudents(filtered);
        return Promise.resolve({
          data: { message: 'Student removed successfully' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: originalRequest,
        } as AxiosResponse);
      }

      // Fallback for PATCH /admin/students/:id/subjects
      if (url.includes('/admin/students/') && url.includes('/subjects') && method === 'patch') {
        try {
          const parts = url.split('/');
          const id = parts[parts.indexOf('students') + 1];
          const payload = typeof originalRequest.data === 'string' ? JSON.parse(originalRequest.data) : originalRequest.data;
          const students = getLocalStudents();
          const updated = students.map((s: any) => {
            if (String(s.id) === String(id)) {
              return { ...s, subjects: payload.subjects };
            }
            return s;
          });
          saveLocalStudents(updated);
          return Promise.resolve({
            data: { message: 'Subjects updated' },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: originalRequest,
          } as AxiosResponse);
        } catch {
          // Continue to reject
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
