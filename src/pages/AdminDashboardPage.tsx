import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, StudentAdminItem, UserInfo } from '../stores/authStore';
import { UserPlus, LogOut, CheckCircle2, Users, Sparkles, AlertCircle } from 'lucide-react';
import eduidealLogo from '../assets/eduideal-logo.png';

const BRAND = '#DA434C';
const BRAND_HOVER = '#C93640';

const getEffectiveUser = (storeUser: UserInfo | null): UserInfo | null => {
  if (storeUser) return storeUser;
  const raw = localStorage.getItem('learnova_auth_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const AdminDashboardPage: React.FC = () => {
  const { user: storeUser, logout, createStudent, fetchAdminStudents } = useAuthStore();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<UserInfo | null>(() => getEffectiveUser(storeUser));
  const [students, setStudents] = useState<StudentAdminItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('Class 12');
  const [board, setBoard] = useState('CBSE');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['CHEMISTRY', 'PHYSICS']);

  const [createdResult, setCreatedResult] = useState<StudentAdminItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const active = getEffectiveUser(storeUser);
    if (!active || active.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    setCurrentUser(active);
    loadStudents();
  }, [storeUser, navigate]);

  const loadStudents = async () => {
    try {
      const list = await fetchAdminStudents();
      setStudents(Array.isArray(list) ? list : []);
    } catch {
      setStudents([]);
    }
  };

  const handleToggleSubject = (code: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const result = await createStudent({
        studentName: studentName.trim(),
        className,
        board,
        subjects: selectedSubjects,
      });

      setCreatedResult(result);
      setStudentName('');
      setSelectedSubjects(['CHEMISTRY', 'PHYSICS']);
      setIsModalOpen(false);
      await loadStudents();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const effectiveAdmin = currentUser || getEffectiveUser(storeUser);

  if (!effectiveAdmin || effectiveAdmin.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-[#E5E5E5] rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#DA434C] border border-rose-200 flex items-center justify-center mx-auto text-xl">
            🔒
          </div>
          <h2 className="text-xl font-black text-black">Admin Authorization Required</h2>
          <p className="text-xs text-[#555555] font-mono">
            Please sign in with administrator credentials (212224040265 / htna2006) to view the admin dashboard.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 rounded-xl text-white font-extrabold text-xs shadow-md cursor-pointer"
            style={{ background: BRAND }}
          >
            Go to Login Portal
          </button>
        </div>
      </div>
    );
  }

  const safeStudents = Array.isArray(students) ? students : [];

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-[#DA434C] selection:text-white">
      {/* ── STICKY WHITE HEADER ────────────────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={eduidealLogo} alt="EDUiDEAL Logo" className="h-8 sm:h-9 w-auto object-contain block" />
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-black">Learnova Admin</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#DA434C] border border-rose-200">
                  ADMINISTRATION
                </span>
              </div>
              <p className="text-xs text-[#555555] font-mono">EDUiDEAL Academy — Managed Student Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-black">Admin Reg: {effectiveAdmin.registerNumber}</p>
              <p className="text-[11px] text-[#555555] font-mono">Role: {effectiveAdmin.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#DA434C] text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTAINER ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Section */}
        <div
          className="p-8 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ background: BRAND, boxShadow: '0 10px 25px -3px rgba(218, 67, 76, 0.25)' }}
        >
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-semibold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Transactional Student Enrollment Management</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Class 12 CBSE Student Administration
            </h1>
            <p className="text-sm text-white/90 max-w-2xl">
              Create student accounts with auto-generated sequential register numbers (e.g. 00000001), secure password hashing, and Subject Access Controls.
            </p>
          </div>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setCreatedResult(null);
            }}
            className="z-10 px-6 py-3.5 rounded-2xl bg-white text-[#DA434C] hover:bg-rose-50 font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0 group cursor-pointer"
          >
            <UserPlus className="w-5 h-5 text-[#DA434C] group-hover:scale-110 transition-transform" />
            <span>+ Add Student</span>
          </button>
        </div>

        {/* Generated Result Alert Card */}
        {createdResult && (
          <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-400 shadow-lg space-y-4">
            <div className="flex items-center gap-3 text-emerald-800">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h2 className="text-lg font-bold">Student Account Created Successfully!</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs">
              <div>
                <p className="text-xs text-[#555555] font-mono">Register Number</p>
                <p className="text-xl font-extrabold text-[#DA434C] font-mono">{createdResult.registerNumber}</p>
              </div>
              <div>
                <p className="text-xs text-[#555555] font-mono">Temporary Password</p>
                <p className="text-xl font-extrabold text-amber-700 font-mono">{createdResult.temporaryPassword}</p>
              </div>
              <div>
                <p className="text-xs text-[#555555] font-mono">Student Name</p>
                <p className="text-base font-bold text-black">{createdResult.studentName}</p>
              </div>
              <div>
                <p className="text-xs text-[#555555] font-mono">Enrolled Subjects</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(createdResult.enrolledSubjects || []).map((sub) => (
                    <span key={sub} className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-[#DA434C] font-bold border border-rose-200">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-800 font-mono">
              Provide these credentials (Register Number & Temporary Password) to the student for logging into their dashboard.
            </p>
          </div>
        )}

        {/* Registered Students Table */}
        {/* Registered Students Table */}
        <div className="bg-white border border-[#E5E5E5] rounded-3xl p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#DA434C]" />
              <h2 className="text-lg font-extrabold text-black">Registered Students ({safeStudents.length})</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] text-xs font-mono uppercase text-[#555555]">
                  <th className="py-3 px-4">Register Number</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class & Board</th>
                  <th className="py-3 px-4">Enrolled Subjects</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {safeStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#555555] text-sm font-medium">
                      No students created yet. Click "+ Add Student" above to enroll students.
                    </td>
                  </tr>
                ) : (
                  safeStudents.map((st) => {
                    const enrolled = Array.isArray(st.enrolledSubjects) ? st.enrolledSubjects : [];
                    return (
                      <tr key={st.registerNumber || st.studentId} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 font-mono font-extrabold text-[#DA434C]">{st.registerNumber}</td>
                        <td className="py-4 px-4 font-bold text-black">{st.studentName}</td>
                        <td className="py-4 px-4 text-[#555555] font-medium">{st.className} ({st.board})</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1.5">
                            {enrolled.includes('CHEMISTRY') ? (
                              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Chemistry ✓
                              </span>
                            ) : (
                              <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-[#FAFAFA] text-slate-400 border border-[#E5E5E5]">
                                Chemistry ✗
                              </span>
                            )}

                            {enrolled.includes('PHYSICS') ? (
                              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-rose-50 text-[#DA434C] border border-rose-200">
                                Physics ✓
                              </span>
                            ) : (
                              <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-[#FAFAFA] text-slate-400 border border-[#E5E5E5]">
                                Physics ✗
                              </span>
                            )}

                            {enrolled.includes('MATHEMATICS') ? (
                              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-rose-50 text-[#DA434C] border border-rose-200">
                                Mathematics ✓
                              </span>
                            ) : (
                              <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-[#FAFAFA] text-slate-400 border border-[#E5E5E5]">
                                Mathematics ✗
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ACTIVE
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E5E5] rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-6 h-6 text-[#DA434C]" />
                <h2 className="text-xl font-extrabold text-black">Add New Student</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAFAFA] hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold text-black mb-1.5 uppercase">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Kumar"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-black placeholder-[#777777] focus:outline-none focus:border-[#DA434C] focus:ring-2 focus:ring-[#DA434C]/20 text-sm shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-black mb-1.5 uppercase">
                    Class
                  </label>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-black text-sm shadow-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-black mb-1.5 uppercase">
                    Board
                  </label>
                  <input
                    type="text"
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-black text-sm shadow-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-black mb-2 uppercase">
                  Enrollment Subjects (Access Control)
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] cursor-pointer hover:border-slate-300 transition-all">
                    <span className="font-bold text-sm text-black">Chemistry</span>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes('CHEMISTRY')}
                      onChange={() => handleToggleSubject('CHEMISTRY')}
                      className="w-5 h-5 rounded accent-[#DA434C] cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] cursor-pointer hover:border-slate-300 transition-all">
                    <span className="font-bold text-sm text-black">Physics</span>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes('PHYSICS')}
                      onChange={() => handleToggleSubject('PHYSICS')}
                      className="w-5 h-5 rounded accent-[#DA434C] cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] cursor-pointer hover:border-slate-300 transition-all">
                    <span className="font-bold text-sm text-black">Mathematics</span>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes('MATHEMATICS')}
                      onChange={() => handleToggleSubject('MATHEMATICS')}
                      className="w-5 h-5 rounded accent-[#DA434C] cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E5E5E5]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAFAFA] hover:bg-slate-200 text-black text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-md cursor-pointer"
                  style={{ background: BRAND }}
                >
                  {isSubmitting ? 'Creating Student...' : 'Create Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
