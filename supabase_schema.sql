--
-- PostgreSQL database dump
--

\restrict EdhuWTl1TLuHfbVJNd5RUyFjCbTKXBuh6Yj51UlzluaWkraeGEK7a5PEcazOiFv

-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enrollments (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    end_date timestamp(6) without time zone,
    payment_status character varying(255),
    start_date timestamp(6) without time zone,
    status character varying(255),
    created_by_admin_id bigint,
    student_id bigint NOT NULL,
    subject_id bigint NOT NULL
);


--
-- Name: enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.enrollments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: enrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.enrollments_id_seq OWNED BY public.enrollments.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id bigint NOT NULL,
    amount numeric(10,2),
    created_at timestamp(6) without time zone,
    payment_date timestamp(6) without time zone,
    payment_reference character varying(255),
    payment_status character varying(255),
    created_by_admin_id bigint,
    student_id bigint NOT NULL,
    subject_id bigint NOT NULL
);


--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id bigint NOT NULL,
    board character varying(255) NOT NULL,
    class_name character varying(255) NOT NULL,
    created_at timestamp(6) without time zone,
    status character varying(255) NOT NULL,
    student_name character varying(255) NOT NULL,
    user_id bigint NOT NULL
);


--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: subjects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.subjects (
    id bigint NOT NULL,
    code character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    status character varying(255) NOT NULL
);


--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    password_hash character varying(255) NOT NULL,
    register_number character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['ADMIN'::character varying, 'STUDENT'::character varying])::text[])))
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: enrollments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN id SET DEFAULT nextval('public.enrollments_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.enrollments (id, created_at, end_date, payment_status, start_date, status, created_by_admin_id, student_id, subject_id) FROM stdin;
1	2026-08-27 13:26:20.88346	\N	COMPLETED	2026-08-27 13:26:20.88346	ACTIVE	1	1	1
2	2026-08-27 13:26:20.89118	\N	COMPLETED	2026-08-27 13:26:20.89118	ACTIVE	1	1	2
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payments (id, amount, created_at, payment_date, payment_reference, payment_status, created_by_admin_id, student_id, subject_id) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students (id, board, class_name, created_at, status, student_name, user_id) FROM stdin;
1	CBSE	Class 12	2026-08-27 13:26:20.875896	ACTIVE	Rahul Kumar	2
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.subjects (id, code, name, status) FROM stdin;
1	CHEMISTRY	Chemistry	ACTIVE
2	PHYSICS	Physics	ACTIVE
3	MATHEMATICS	Mathematics	ACTIVE
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, created_at, password_hash, register_number, role, status) FROM stdin;
1	2026-08-27 13:26:03.044427	$2a$10$koSpIorODlquDy1Bai.wl.quAWzmflAItZYDOBxn2tvOliySgy3gG	212224040265	ADMIN	ACTIVE
2	2026-08-27 13:26:20.797801	$2a$10$BeQCzxOZb8AasYuHutznq.Q4HraE/0Ura1r8DU2xpoj..BBB4AWqC	00000001	STUDENT	ACTIVE
\.


--
-- Name: enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.enrollments_id_seq', 2, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_id_seq', 1, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.subjects_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- Name: subjects uk_aodt3utnw0lsov4k9ta88dbpr; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT uk_aodt3utnw0lsov4k9ta88dbpr UNIQUE (name);


--
-- Name: users uk_cqhf01uh9dowjtif83jcbg22k; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_cqhf01uh9dowjtif83jcbg22k UNIQUE (register_number);


--
-- Name: students uk_g4fwvutq09fjdlb4bb0byp7t; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT uk_g4fwvutq09fjdlb4bb0byp7t UNIQUE (user_id);


--
-- Name: subjects uk_rg7x1lyii7kdyycw98d45vep5; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT uk_rg7x1lyii7kdyycw98d45vep5 UNIQUE (code);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: payments fk6ooq278k2bs5xi8t5o6oort1v; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk6ooq278k2bs5xi8t5o6oort1v FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: enrollments fk8kf1u1857xgo56xbfmnif2c51; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT fk8kf1u1857xgo56xbfmnif2c51 FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: enrollments fkafb6li7i3h6dod4u5krqrhe1j; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT fkafb6li7i3h6dod4u5krqrhe1j FOREIGN KEY (created_by_admin_id) REFERENCES public.users(id);


--
-- Name: students fkdt1cjx5ve5bdabmuuf3ibrwaq; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT fkdt1cjx5ve5bdabmuuf3ibrwaq FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: payments fkemi47df3vv1t5yxbvi6nj4t7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fkemi47df3vv1t5yxbvi6nj4t7 FOREIGN KEY (created_by_admin_id) REFERENCES public.users(id);


--
-- Name: enrollments fknq1d261xf53vkhedgg3jf5nf4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT fknq1d261xf53vkhedgg3jf5nf4 FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- Name: payments fkteaj2sq0wyetkeeyvx67v3qye; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fkteaj2sq0wyetkeeyvx67v3qye FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- PostgreSQL database dump complete
--

\unrestrict EdhuWTl1TLuHfbVJNd5RUyFjCbTKXBuh6Yj51UlzluaWkraeGEK7a5PEcazOiFv

