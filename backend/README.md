# Traof Certificate Management System - Backend

## Setup
1. Clone the repository.
2. Run `npm install` in the `backend` directory.
3. Create a `.env` file based on the following:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=traof_db
   PORT=5000
   ```
4. Import `schema.sql` into your MySQL database.
5. Run the server:
   ```bash
   npm start
   ```

## API Endpoints
- `GET /api/departments`: Get all departments.
- `GET /api/programs`: Get all programs.
- `GET /api/participants`: Get all participants.
- `POST /api/participants/bulk`: Import participants from Excel.
- `POST /api/certificates`: Issue a new certificate.
