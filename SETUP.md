# Government Digital Platform - Setup Instructions

## Prerequisites

1. **Node.js** (v14 or higher)
2. **PostgreSQL** (v12 or higher)
3. **npm** or **yarn**

## Database Setup

1. **Install PostgreSQL**
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

2. **Create Database**
   ```sql
   # Connect to PostgreSQL
   sudo -u postgres psql
   
   # Create database
   CREATE DATABASE government_digital_platform;
   
   # Create user (optional)
   CREATE USER gov_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE government_digital_platform TO gov_user;
   ```

## Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Edit config.env file
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=government_digital_platform
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start backend server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

   The server will:
   - Connect to PostgreSQL
   - Create tables automatically
   - Insert sample data
   - Start on http://localhost:5000

## Frontend Setup

1. **Navigate to project root**
   ```bash
   cd .. # Go back to project root
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start frontend server**
   ```bash
   npm run dev
   ```

   The frontend will start on http://localhost:3000

## Running the Complete System

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
npm run dev
```

## Sample Data

The system automatically creates sample data:

### Users
- **Admin**: admin@gov.th / password123
- **Officer**: officer1@gov.th / password123
- **Citizens**: john.doe@email.com / password123

### Features Available
- User registration and authentication
- Daily report creation and management
- Document submission and review
- Digital wallet management
- Medical appointment booking
- Admin dashboard with statistics

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### User Management (Admin)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PATCH /api/users/:id/status` - Update user status
- `DELETE /api/users/:id` - Delete user

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create report
- `PATCH /api/reports/:id/status` - Update report status

### Documents
- `GET /api/documents` - Get all submissions
- `POST /api/documents` - Create submission
- `PATCH /api/documents/:id/status` - Update submission status

## Testing the System

1. **Register a new user**
   - Go to http://localhost:3000/register
   - Fill in the registration form
   - Submit the form

2. **Login as admin**
   - Go to http://localhost:3000/login
   - Use admin@gov.th / password123
   - Access admin dashboard

3. **Test user management**
   - Go to Admin Dashboard
   - Click "จัดการผู้ใช้งาน"
   - View, create, and manage users

4. **Test daily reports**
   - Login as citizen
   - Go to "บันทึกประจำวัน"
   - Create a new report

## Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check if database exists
sudo -u postgres psql -l

# Test connection
psql -h localhost -U postgres -d government_digital_platform
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### API Connection Issues
- Check if backend is running on port 5000
- Verify API_BASE_URL in frontend
- Check CORS configuration in backend

## Production Deployment

1. **Set up production database**
2. **Configure environment variables**
3. **Build frontend**: `npm run build`
4. **Start backend**: `npm start`
5. **Set up reverse proxy (nginx)**
6. **Configure SSL certificates**

## Support

For issues and questions:
1. Check the logs in both terminals
2. Verify database connection
3. Check API endpoints with curl or Postman
4. Review the README files in backend/ and frontend/

## File Structure

```
government-digital-platform/
├── backend/                 # Backend API server
│   ├── config/             # Database configuration
│   ├── routes/             # API routes
│   ├── middleware/          # Authentication middleware
│   └── server.js           # Main server file
├── src/                    # Frontend Next.js app
│   ├── app/               # Next.js 13+ app directory
│   ├── components/        # React components
│   └── lib/               # Utilities and API service
└── README.md              # Project documentation
```

