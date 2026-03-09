# Traof Certificates Management System

A professional, RTL-compatible system for managing organizations, programs, participants, and issuing/verifying certificates.

## Structure
- `/backend`: Node.js/Express API with MySQL, PDFKit, and ExcelJS.
- `/frontend`: React/Vite with Tailwind CSS and Lucide icons.

## Quick Start
1. Setup the database using `schema.sql`.
2. Configure `.env` in the `backend` folder.
3. Install dependencies in both folders:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. Run both servers to start using the system.
