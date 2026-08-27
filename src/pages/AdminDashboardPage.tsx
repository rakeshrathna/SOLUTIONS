import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, StudentAdminItem } from '../stores/authStore';
import { UserPlus, ShieldAlert, LogOut, CheckCircle2, Copy, BookOpen, Users, Key, Sparkles, AlertCircle } from 'lucide-react';
import logoImg from '../assets/logo.png';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout, createStudent, fetchAdminStudents } = useAuthStore();
  const navigate = useNavigate();

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
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    loadStudents();
  }, [user, navigate]);

  const loadStudents = async () => {
    const list = await fetchAdminStudents();
    setStudents(list);
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

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-[#15009A] selection:text-white">
      {/* Top Navbar */}
      <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg">
              <img src={logoImg} alt="EDUiDEAL Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white">Learnova Admin</span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ADMINISTRATION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">EDUiDEAL Academy — PostgreSQL Backend Connected</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-200">Admin Register: {user.registerNumber}</p>
              <p className="text-[11px] text-slate-400 font-mono">Role: {user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#15009A] via-indigo-900 to-slate-800 border border-indigo-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-mono font-semibold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>PostgreSQL Transactional Administration</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Class 12 CBSE Student Enrollment Portal
            </h1>
            <p className="text-sm text-indigo-200/80 max-w-2xl">
              Create student accounts with auto-generated sequential register numbers (e.g. 00000001), secure password hashing, and Subject Enrollment controls.
            </p>
          </div>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setCreatedResult(null);
            }}
            className="z-10 px-6 py-3.5 rounded-2xl bg-white text-[#15009A] hover:bg-indigo-50 font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 shrink-0 group"
          >
            <UserPlus className="w-5 h-5 text-[#15009A] group-hover:scale-110 transition-transform" />
            <span>+ Add Student</span>
          </button>
        </div>

        {/* Generated Result Alert Card */}
        {createdResult && (
          <div className="p-6 rounded-3xl bg-emerald-950/80 border-2 border-emerald-500/60 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
              <h2 className="text-lg font-bold text-white">Student Account Created Successfully!</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30">
              <div>
                <p className="text-xs text-slate-400 font-mono">Register Number</p>
                <p className="text-xl font-extrabold text-emerald-400 font-mono">{createdResult.registerNumber}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Temporary Password</p>
                <p className="text-xl font-extrabold text-amber-400 font-mono">{createdResult.temporaryPassword}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Student Name</p>
                <p className="text-base font-bold text-white">{createdResult.studentName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Enrolled Subjects</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {createdResult.enrolledSubjects.map((sub) => (
                    <span key={sub} className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-300/80 font-mono">
              Provide these credentials (Register Number & Temporary Password) to the student for logging into their dashboard.
            </p>
          </div>
        )}

        {/* Registered Students Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Registered Students in PostgreSQL ({students.length})</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-xs font-mono uppercase text-slate-400">
                  <th className="py-3 px-4">Register Number</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class & Board</th>
                  <th className="py-3 px-4">Enrolled Subjects</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                      No students created yet. Click "+ Add Student" above to enroll students.
                    </td>
                  </tr>
                ) : (
                  students.map((st) => (
                    <tr key={st.registerNumber} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-emerald-400">{st.registerNumber}</td>
                      <td className="py-4 px-4 font-semibold text-white">{st.studentName}</td>
                      <td className="py-4 px-4 text-slate-300">{st.className} ({st.board})</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {st.enrolledSubjects.includes('CHEMISTRY') ? (
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              Chemistry ✓
                            </span>
                          ) : (
                            <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-slate-700 text-slate-500">
                              Chemistry ✗
                            </span>
                          )}

                          {st.enrolledSubjects.includes('PHYSICS') ? (
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              Physics ✓
                            </span>
                          ) : (
                            <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-slate-700 text-slate-500">
                              Physics ✗
                            </span>
                          )}

                          {st.enrolledSubjects.includes('MATHEMATICS') ? (
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Mathematics ✓
                            </span>
                          ) : (
                            <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-slate-700 text-slate-500">
                              Mathematics ✗
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ACTIVE
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Add New Student</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 transition-colors"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Kumar"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Class
                  </label>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 uppercase">
                    Board
                  </label>
                  <input
                    type="text"
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-2 uppercase">
                  Enrollment Subjects (Access Control)
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 cursor-pointer hover:border-slate-600 transition-all">
                    <span className="font-medium text-sm text-slate-200">Chemistry</span>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes('CHEMISTRY')}
                      onChange={() => handleToggleSubject('CHEMISTRY')}
                      className="w-5 h-5 rounded accent-indigo-600 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 cursor-pointer hover:border-slate-600 transition-all">
                    <span className="font-medium text-sm text-slate-200">Physics</span>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes('PHYSICS')}
                      onChange={() => handleToggleSubject('PHYSICS')}
                      className="w-5 h-5 rounded accent-indigo-600 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 cursor-pointer hover:border-slate-600 transition-all">
                    <span className="font-medium text-sm text-slate-200">Mathematics</span>
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes('MATHEMATICS')}
                      onChange={() => handleToggleSubject('MATHEMATICS')}
                      className="w-5 h-5 rounded accent-indigo-600 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#15009A] hover:bg-indigo-700 text-white text-xs font-bold shadow-lg shadow-indigo-900/40"
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
