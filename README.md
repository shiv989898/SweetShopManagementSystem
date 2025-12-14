# Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory with user authentication, product management, and purchase functionality.

## 🎯 Project Overview

This application provides a complete solution for managing a sweet shop's inventory. Users can browse and purchase sweets, while administrators have additional capabilities to add, update, delete, and restock items. The system is built with modern web technologies and follows Test-Driven Development principles.

## ✨ Features

- **User Authentication**: Secure registration and login with JWT token-based authentication
- **Sweet Management**: Browse, search, and filter sweets by name, category, and price range
- **Purchase System**: Purchase sweets with real-time inventory updates
- **Admin Controls**: 
  - Add new sweets to inventory
  - Update sweet details
  - Delete sweets
  - Restock inventory
- **Responsive Design**: Modern, mobile-friendly UI with smooth animations
- **Real-time Stock Updates**: Automatic quantity tracking and out-of-stock indicators

## 🛠️ Technology Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** - RESTful API framework
- **MongoDB** with **Mongoose** - NoSQL database
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Jest** - Testing framework

### Frontend
- **React 18** with **TypeScript**
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Custom styling with animations

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v5 or higher)

## 🚀 Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone <your-repository-url>
cd SweetShopManagementSystem
\`\`\`

### 2. Database Setup

1. Install MongoDB if not already installed:
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: Follow instructions at https://docs.mongodb.com/manual/administration/install-on-linux/

2. Start MongoDB:
   - Windows: MongoDB service starts automatically
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

The database `sweet_shop` will be created automatically when the application starts.

### 3. Backend Setup

\`\`\`bash
cd backend
npm install
\`\`\`

Create a \`.env\` file in the backend directory:

\`\`\`env
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/sweet_shop

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=24h
\`\`\`

### 4. Frontend Setup

\`\`\`bash
cd frontend
npm install
\`\`\`

## 🏃 Running the Application

### Start Backend Server

\`\`\`bash
cd backend
npm run dev
\`\`\`

The backend server will start on http://localhost:5000

### Start Frontend Development Server

\`\`\`bash
cd frontend
npm run dev
\`\`\`

The frontend application will start on http://localhost:3000

## 🧪 Running Tests

### Backend Tests

\`\`\`bash
cd backend
npm test
\`\`\`

For test coverage report:

\`\`\`bash
npm test -- --coverage
\`\`\`

## 📡 API Endpoints

### Authentication

- \`POST /api/auth/register\` - Register a new user
  - Body: \`{ "email": "user@example.com", "password": "password123" }\`
  
- \`POST /api/auth/login\` - Login user
  - Body: \`{ "email": "user@example.com", "password": "password123" }\`

### Sweets (Protected)

- \`GET /api/sweets\` - Get all sweets
- \`GET /api/sweets/search\` - Search sweets
  - Query params: \`name\`, \`category\`, \`minPrice\`, \`maxPrice\`
- \`POST /api/sweets\` - Add new sweet (Admin only)
- \`PUT /api/sweets/:id\` - Update sweet
- \`DELETE /api/sweets/:id\` - Delete sweet (Admin only)

### Inventory (Protected)

- \`POST /api/sweets/:id/purchase\` - Purchase a sweet
  - Body: \`{ "quantity": 1 }\`
- \`POST /api/sweets/:id/restock\` - Restock a sweet (Admin only)
  - Body: \`{ "quantity": 10 }\`

## 👤 User Roles

### Regular User
- Register and login
- Browse and search sweets
- Purchase sweets

### Admin User
- All regular user capabilities
- Add new sweets
- Update sweet details
- Delete sweets
- Restock inventory

**Note**: The first user can be made admin by directly updating the database:
\`\`\`bash
# Using MongoDB shell
mongosh sweet_shop
db.users.updateOne({ email: 'admin@example.com' }, { \$set: { isAdmin: true } })
exit
\`\`\`

Or use MongoDB Compass GUI to update the `isAdmin` field to `true`.

## 📸 Screenshots

### Login Page
![Login Page](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Admin View
![Admin Controls](./screenshots/admin.png)

## 🤖 My AI Usage

### Tools Used

I utilized **GitHub Copilot** and **ChatGPT (GPT-4)** throughout the development of this project.

### How I Used AI

1. **Project Setup & Boilerplate**
   - Used AI to generate initial project structure and configuration files
   - Generated TypeScript configurations and ESLint rules
   - Created package.json files with appropriate dependencies

2. **Backend Development**
   - AI assisted in creating database schema and connection logic
   - Generated boilerplate for Express routes and controllers
   - Helped write service layer methods with proper error handling
   - Created middleware for authentication and authorization

3. **Test-Driven Development**
   - AI generated initial test cases for services and routes
   - Helped structure test suites following best practices
   - Suggested edge cases and validation scenarios
   - Assisted in mocking database connections for unit tests

4. **Frontend Development**
   - Generated React component boilerplate
   - Created TypeScript interfaces for type safety
   - Helped design the authentication context and routing logic
   - Suggested CSS animations and responsive design patterns

5. **Debugging & Optimization**
   - AI helped identify and fix CORS issues
   - Assisted in optimizing database queries
   - Suggested improvements for error handling
   - Helped resolve TypeScript type errors

6. **Documentation**
   - AI assisted in writing this README
   - Generated API documentation
   - Created meaningful code comments

### My Reflection

Using AI tools significantly accelerated the development process, especially for:
- Generating repetitive boilerplate code
- Writing comprehensive test cases
- Catching potential bugs early
- Learning best practices for TypeScript and React patterns

However, I maintained full understanding and control over the codebase by:
- Reviewing and understanding all AI-generated code
- Manually testing all functionality
- Refactoring code to match my preferences
- Making architectural decisions independently
- Writing custom business logic

The AI tools acted as an intelligent pair programmer, allowing me to focus on problem-solving and architecture while accelerating implementation details.

## 🧑‍💻 Development Workflow

This project was developed following TDD principles:

1. **Red**: Write failing tests first
2. **Green**: Implement minimal code to pass tests
3. **Refactor**: Improve code while keeping tests green

Git commits follow this pattern with clear messages indicating TDD stages and AI assistance where applicable.

## 📦 Building for Production

### Backend

\`\`\`bash
cd backend
npm run build
npm start
\`\`\`

### Frontend

\`\`\`bash
cd frontend
npm run build
npm run preview
\`\`\`

## 🚀 Deployment

The application can be deployed to:
- **Backend**: Heroku, AWS, DigitalOcean, Railway
- **Frontend**: Vercel, Netlify
- **Database**: MongoDB Atlas (free tier available), AWS DocumentDB

## 📝 License

This project is created for educational purposes as part of a TDD Kata assignment.

## 🙏 Acknowledgments

- AI tools (GitHub Copilot, ChatGPT) for development assistance
- MongoDB and Express.js communities for excellent documentation
- React and Vite teams for modern frontend tooling
- Mongoose ODM for elegant MongoDB object modeling
