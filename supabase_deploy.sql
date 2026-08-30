-- ============================================================================
-- EDUiDEAL ACADEMY - SUPABASE POSTGRESQL MIGRATION & SEED SCRIPT
-- Paste this entire script into the Supabase SQL Editor (supabase.com -> SQL Editor -> New Query)
-- ============================================================================

-- 1. Create Core Tables
CREATE TABLE IF NOT EXISTS public.users (
    id BIGSERIAL PRIMARY KEY,
    register_number VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'STUDENT',
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.students (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    class_name VARCHAR(255) NOT NULL DEFAULT 'Class 12',
    board VARCHAR(255) NOT NULL DEFAULT 'CBSE',
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.subjects (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS public.enrollments (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
    subject_id BIGINT REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
    created_by_admin_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    payment_status VARCHAR(50) DEFAULT 'COMPLETED',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payments (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
    subject_id BIGINT REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
    created_by_admin_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    amount NUMERIC(10,2) DEFAULT 0.00,
    payment_reference VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'COMPLETED',
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Seed Pre-configured Subjects (Chemistry, Physics, Mathematics)
INSERT INTO public.subjects (id, code, name, status)
VALUES 
    (1, 'CHEMISTRY', 'Chemistry', 'ACTIVE'),
    (2, 'PHYSICS', 'Physics', 'ACTIVE'),
    (3, 'MATHEMATICS', 'Mathematics', 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

-- 3. Seed Default Admin User (Register: 212224040265, Password: htna2006)
INSERT INTO public.users (id, register_number, password_hash, role, status)
VALUES 
    (1, '212224040265', '$2a$10$koSpIorODlquDy1Bai.wl.quAWzmflAItZYDOBxn2tvOliySgy3gG', 'ADMIN', 'ACTIVE')
ON CONFLICT (register_number) DO NOTHING;

-- 4. Seed Demo Student User (Register: 00000001, Password: student123)
INSERT INTO public.users (id, register_number, password_hash, role, status)
VALUES 
    (2, '00000001', '$2a$10$BeQCzxOZb8AasYuHutznq.Q4HraE/0Ura1r8DU2xpoj..BBB4AWqC', 'STUDENT', 'ACTIVE')
ON CONFLICT (register_number) DO NOTHING;

-- 5. Seed Demo Student Profile
INSERT INTO public.students (id, user_id, student_name, class_name, board, status)
VALUES 
    (1, 2, 'Rahul Kumar', 'Class 12', 'CBSE', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Demo Student Enrollments (Chemistry + Physics)
INSERT INTO public.enrollments (id, student_id, subject_id, created_by_admin_id, payment_status, status)
VALUES 
    (1, 1, 1, 1, 'COMPLETED', 'ACTIVE'),
    (2, 1, 2, 1, 'COMPLETED', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- 7. Sync Sequence counters
SELECT setval('public.users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.users));
SELECT setval('public.students_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.students));
SELECT setval('public.subjects_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.subjects));
SELECT setval('public.enrollments_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.enrollments));
SELECT setval('public.payments_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.payments));

-- 8. Configure Row Level Security (RLS) & Public Access Policies for Supabase
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous / client operations
DROP POLICY IF EXISTS "Allow public read users" ON public.users;
DROP POLICY IF EXISTS "Allow public insert users" ON public.users;
DROP POLICY IF EXISTS "Allow public update users" ON public.users;
CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update users" ON public.users FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public read students" ON public.students;
DROP POLICY IF EXISTS "Allow public insert students" ON public.students;
DROP POLICY IF EXISTS "Allow public update students" ON public.students;
CREATE POLICY "Allow public read students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public insert students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update students" ON public.students FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public read subjects" ON public.subjects;
CREATE POLICY "Allow public read subjects" ON public.subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow public insert enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Allow public update enrollments" ON public.enrollments;
CREATE POLICY "Allow public read enrollments" ON public.enrollments FOR SELECT USING (true);
CREATE POLICY "Allow public insert enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update enrollments" ON public.enrollments FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public read payments" ON public.payments;
DROP POLICY IF EXISTS "Allow public insert payments" ON public.payments;
CREATE POLICY "Allow public read payments" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Allow public insert payments" ON public.payments FOR INSERT WITH CHECK (true);
