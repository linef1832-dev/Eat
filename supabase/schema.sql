CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE departments (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL);
CREATE TABLE teams (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL);
CREATE TABLE shifts (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, start_time TIME, end_time TIME);
CREATE TABLE employees (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), code TEXT UNIQUE NOT NULL, name TEXT NOT NULL, department_id UUID REFERENCES departments(id), team_id UUID REFERENCES teams(id), shift_id UUID REFERENCES shifts(id), pin TEXT NOT NULL, role TEXT CHECK (role IN ('staff', 'manager')) DEFAULT 'staff', active BOOLEAN DEFAULT true);
CREATE TABLE duty_assignments (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), date DATE, team_id UUID REFERENCES teams(id), role TEXT, employee_id UUID REFERENCES employees(id));
