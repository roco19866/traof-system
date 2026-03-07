-- Database Schema for Traof Certificate Management System

CREATE DATABASE IF NOT EXISTS traof_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE traof_db;

-- 1. Departments Table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    manager_name VARCHAR(255),
    status ENUM('نشط', 'غير نشط') DEFAULT 'نشط',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table (RBAC)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Manager', 'Staff') NOT NULL,
    dept_id INT,
    status ENUM('نشط', 'غير نشط') DEFAULT 'نشط',
    FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- 3. Programs Table
CREATE TABLE programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dept_id INT,
    type ENUM('Training', 'Workshop', 'Volunteer', 'Awareness', 'Appreciation') NOT NULL,
    trainer_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 4. Participants Table
CREATE TABLE participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    national_id VARCHAR(50),
    email VARCHAR(255),
    mobile VARCHAR(50),
    gender ENUM('ذكر', 'أنثى'),
    dept_id INT,
    program_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE SET NULL
);

-- 5. Certificate Templates Table
CREATE TABLE templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body_text TEXT NOT NULL,
    signature_name VARCHAR(255),
    signature_title VARCHAR(255),
    logo_url VARCHAR(500),
    background_url VARCHAR(500),
    type ENUM('Attendance', 'Participation', 'Training', 'Appreciation') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Issued Certificates Table
CREATE TABLE certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cert_number VARCHAR(100) UNIQUE NOT NULL, -- Format: TRF-2026-000001
    participant_id INT,
    program_id INT,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    qr_code_data TEXT,
    status ENUM('Valid', 'Invalid') DEFAULT 'Valid',
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);
