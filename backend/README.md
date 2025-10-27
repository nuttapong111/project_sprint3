# Government Digital Platform - Backend API

Backend API server for the Government Digital Platform built with Express.js and PostgreSQL.

## Features

- **User Management**: Registration, authentication, and user management
- **Daily Reports**: AI-powered crime reporting system
- **Document Submissions**: Online document submission and review
- **Digital Wallet**: Digital document management
- **Medical Appointments**: Healthcare appointment booking
- **Notifications**: Real-time notification system

## Tech Stack

- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd government-digital-platform/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE government_digital_platform;
   ```

4. **Configure environment variables**
   ```bash
   cp config.env.example config.env
   ```
   
   Edit `config.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=government_digital_platform
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (admin only)
- `PATCH /api/users/:id/status` - Update user status
- `PATCH /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

### Daily Reports
- `GET /api/reports` - Get all reports (officer/admin)
- `GET /api/reports/user/:userId` - Get user reports
- `GET /api/reports/:id` - Get report by ID
- `POST /api/reports` - Create new report
- `PATCH /api/reports/:id/status` - Update report status

### Document Submissions
- `GET /api/documents` - Get all submissions (officer/admin)
- `GET /api/documents/user/:userId` - Get user submissions
- `GET /api/documents/:id` - Get submission by ID
- `POST /api/documents` - Create new submission
- `PATCH /api/documents/:id/status` - Update submission status

### Health Check
- `GET /api/health` - Server health check

## Database Schema

The application uses the following main tables:

- **users** - User accounts and profiles
- **daily_reports** - Crime reports and daily logs
- **document_submissions** - Document submission requests
- **digital_documents** - Digital wallet documents
- **medical_appointments** - Healthcare appointments
- **notifications** - System notifications

## Sample Data

The server automatically creates sample data on first run:

- **Sample Users**: 4 users (2 citizens, 1 officer, 1 admin)
- **Sample Reports**: 2 daily reports with different statuses
- **Sample Submissions**: 1 document submission

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error message"
}
```

## Development

### Running in Development Mode
```bash
npm run dev
```

This will start the server with nodemon for automatic restarts.

### Database Migrations
The server automatically creates tables and inserts sample data on startup.

### Testing
```bash
# Test database connection
curl http://localhost:5000/api/health

# Test user registration
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123","fullName":"Test User","phone":"0812345678","address":"Test Address","idCard":"1234567890123","birthDate":"1990-01-01","gender":"male"}'
```

## Production Deployment

1. **Set environment variables**
2. **Configure PostgreSQL connection**
3. **Set up SSL certificates**
4. **Configure reverse proxy (nginx)**
5. **Set up monitoring and logging**

## API Documentation

For detailed API documentation, visit:
- Swagger UI: `http://localhost:5000/api-docs` (if implemented)
- Postman Collection: Available in `/docs` folder

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

