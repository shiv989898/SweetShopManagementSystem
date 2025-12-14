# Sweet Shop Management System

A full-stack web application built using Test-Driven Development (TDD) principles for managing a sweet shop's inventory, user authentication, and shopping cart functionality. This project demonstrates modern web development practices, clean code architecture, and effective use of AI tools in the development workflow.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [My AI Usage](#my-ai-usage)
- [Development Approach](#development-approach)

---

## 🎯 Project Overview

The Sweet Shop Management System is a comprehensive e-commerce platform that allows users to browse, search, and purchase sweets while providing administrators with complete inventory management capabilities. The application follows RESTful API design principles and implements secure authentication using JWT tokens.

### Key Capabilities
- **User Authentication**: Secure registration and login system with JWT-based authentication
- **Product Management**: Full CRUD operations for sweet products (admin-only)
- **Shopping Experience**: Browse catalog, search/filter products, and manage shopping cart
- **Inventory Control**: Real-time stock tracking with purchase and restock functionality
- **Role-Based Access**: Separate permissions for regular users and administrators

---

## ✨ Features

### User Features
- ✅ User registration and login with JWT authentication
- ✅ Browse all available sweets in a responsive grid layout
- ✅ Search sweets by name
- ✅ Filter by category and price range
- ✅ Add items to shopping cart with quantity controls
- ✅ Checkout process with real-time inventory updates
- ✅ Cart persistence using localStorage
- ✅ View product images and details
- ✅ Prices displayed in Indian Rupees (₹)

### Admin Features
- ✅ Add new sweets with name, category, price, quantity, description, and image URL
- ✅ Edit existing sweet details
- ✅ Delete sweets from inventory
- ✅ Restock functionality to increase inventory
- ✅ Real-time stock monitoring
- ✅ Admin-only protected routes

### Technical Features
- ✅ RESTful API design
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation and error handling
- ✅ Responsive UI with smooth animations
- ✅ Test coverage with 17 passing unit tests

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js (v16+)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud NoSQL Database)
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Testing**: Jest + ts-jest
- **Dev Tools**: nodemon, ts-node

### Frontend
- **Library**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS3 with custom animations

### Development Tools
- **Version Control**: Git & GitHub
- **Code Editor**: Visual Studio Code
- **AI Assistants**: GitHub Copilot, ChatGPT (GPT-4)
- **Testing Framework**: Jest
- **Package Manager**: npm

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/shiv989898/SweetShopManagementSystem.git
cd SweetShopManagementSystem
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the following variables:
```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Configuration
# Get your connection string from MongoDB Atlas Dashboard
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/sweet_shop

# JWT Configuration
# Generate a secure random string for production
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h
```

**⚠️ Security Note**: Never commit your actual credentials to Git. Use strong, unique passwords.

5. (Optional) Seed sample data:
```bash
node seedData.js
```
This will populate the database with 25 sample sweets (10 Indian sweets, 15 Western sweets) and create an admin user.

6. Run tests:
```bash
npm test
```

7. Start the development server:
```bash
npm run dev
```
Backend will be running at `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```
Frontend will be running at `http://localhost:3001`

### Step 4: Access the Application

1. Open your browser and go to `http://localhost:3001`
2. Register a new account or use the default admin credentials:
   - **Email**: admin@sweetshop.com
   - **Password**: admin123

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 201 Created
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "isAdmin": false
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "isAdmin": false
  }
}
```

### Sweet Management Endpoints (Protected)

**Note**: All sweet endpoints require authentication. Include JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Sweets
```http
GET /api/sweets

Response: 200 OK
[
  {
    "id": "sweet_id",
    "name": "Gulab Jamun",
    "category": "Indian",
    "price": 120,
    "quantity": 50,
    "description": "Soft milk-solid-based sweet",
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Search Sweets
```http
GET /api/sweets/search?name=gulab&category=Indian&minPrice=50&maxPrice=200

Response: 200 OK
[Array of matching sweets]
```

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Content-Type: application/json

{
  "name": "Chocolate Truffle",
  "category": "Western",
  "price": 330,
  "quantity": 25,
  "description": "Rich chocolate dessert",
  "imageUrl": "https://example.com/truffle.jpg"
}

Response: 201 Created
{Sweet object}
```

#### Update Sweet
```http
PUT /api/sweets/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 150,
  "quantity": 30
}

Response: 200 OK
{Updated sweet object}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id

Response: 200 OK
{
  "message": "Sweet deleted successfully"
}
```

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Content-Type: application/json

{
  "quantity": 2
}

Response: 200 OK
{Updated sweet object with reduced quantity}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Content-Type: application/json

{
  "quantity": 20
}

Response: 200 OK
{Updated sweet object with increased quantity}
```

---

## 🧪 Testing

### Test Coverage

The project includes comprehensive unit tests for backend services following TDD principles.

**Test Suite Summary:**
- ✅ **17 passing tests**
- **Test Suites**: 2 passed
- **Coverage**: Services and authentication logic

### Running Tests

```bash
# Navigate to backend directory
cd backend

# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Structure

```
backend/src/services/
├── authService.test.ts     # 8 tests for authentication
└── sweetService.test.ts    # 9 tests for sweet operations
```

### Test Coverage Details

**Authentication Service Tests:**
- ✓ User registration with password hashing
- ✓ Successful user login
- ✓ Login with invalid credentials
- ✓ Token generation
- ✓ Duplicate email prevention
- ✓ Password validation
- ✓ Email format validation
- ✓ JWT expiration handling

**Sweet Service Tests:**
- ✓ Create new sweet
- ✓ Get all sweets
- ✓ Search sweets by name
- ✓ Filter by category and price range
- ✓ Update sweet details
- ✓ Delete sweet
- ✓ Purchase sweet (inventory reduction)
- ✓ Restock sweet (inventory increase)
- ✓ Insufficient stock handling

### Sample Test Output
```
PASS  src/services/authService.test.ts
  AuthService
    ✓ should register a new user (45 ms)
    ✓ should login with correct credentials (38 ms)
    ✓ should reject invalid password (25 ms)
    ...

PASS  src/services/sweetService.test.ts
  SweetService
    ✓ should create a new sweet (32 ms)
    ✓ should purchase sweet and decrease quantity (28 ms)
    ✓ should restock sweet and increase quantity (26 ms)
    ...

Test Suites: 2 passed, 2 total
Tests:       17 passed, 17 total
```

---

## 📸 Screenshots

### User Dashboard
![Dashboard](screenshots/dashboard.png)
*Main dashboard showing all available sweets with search and filter options*

### Shopping Cart
![Shopping Cart](screenshots/cart.png)
*Shopping cart with quantity controls and checkout functionality*

### Admin Panel
![Admin Panel](screenshots/admin.png)
*Admin interface for managing inventory with add, edit, and delete options*

### Login Page
![Login](screenshots/login.png)
*User authentication interface*

**Note**: Screenshots are placeholders. Actual screenshots should be added to a `screenshots/` directory in the repository.

---

## 🤖 My AI Usage

### AI Tools Used

Throughout the development of this project, I leveraged several AI tools to enhance productivity and code quality:

1. **GitHub Copilot** (Primary Tool)
   - Integrated directly in VS Code
   - Used for: Code completion, boilerplate generation, test scaffolding

2. **ChatGPT (GPT-4)** (Secondary Tool)
   - Used for: Architecture decisions, debugging, documentation

### How I Used AI

#### 1. Initial Setup & Boilerplate (30% AI-assisted)
- **Task**: Setting up project structure, TypeScript configurations, and initial Express server
- **AI Usage**: GitHub Copilot suggested the basic Express server setup and middleware configuration
- **My Role**: I customized the suggestions to fit our specific requirements, added error handling, and configured MongoDB connection with proper environment variables
- **Example**: Copilot generated the basic Express route structure, but I modified it to include proper JWT authentication middleware and error handling

#### 2. Service Layer & Business Logic (20% AI-assisted)
- **Task**: Implementing authentication service and sweet management service
- **AI Usage**: Used Copilot for method signatures and basic CRUD operations
- **My Role**: I wrote all the complex business logic manually, including:
  - Password hashing and comparison logic
  - JWT token generation and validation
  - Inventory management rules (stock validation, purchase quantity checks)
  - Error handling for edge cases
- **Example**: AI suggested basic Mongoose CRUD operations, but I added validation, error handling, and business rules manually

#### 3. Test-Driven Development (40% AI-assisted)
- **Task**: Writing unit tests for all services
- **AI Usage**: ChatGPT helped me generate initial test case structures and Jest setup
- **My Role**: 
  - Defined all test cases based on requirements
  - Wrote assertions manually
  - Added edge cases and error scenarios
  - Ensured tests followed Red-Green-Refactor pattern
- **Example**: Asked ChatGPT: "How should I structure unit tests for a service that handles user authentication?" Used the suggested structure but wrote all actual test implementations myself

#### 4. Frontend Components (25% AI-assisted)
- **Task**: Building React components with TypeScript
- **AI Usage**: Copilot suggested React component boilerplate and TypeScript interfaces
- **My Role**: 
  - Designed all component architecture
  - Implemented state management with Context API
  - Added all business logic and API integration
  - Created custom CSS animations and responsive design
- **Example**: Copilot generated basic component structure, but I implemented all state management, event handlers, and API calls

#### 5. API Integration (15% AI-assisted)
- **Task**: Setting up Axios interceptors and API client
- **AI Usage**: Copilot suggested Axios configuration patterns
- **My Role**: Implemented JWT token management, error handling, and retry logic manually

#### 6. Styling & UI/UX (10% AI-assisted)
- **Task**: Creating modern, responsive CSS with animations
- **AI Usage**: Asked ChatGPT for CSS gradient ideas and animation timing functions
- **My Role**: Designed entire UI/UX, created all custom styles, implemented responsive layouts, and added accessibility features

#### 7. Documentation (35% AI-assisted)
- **Task**: Writing README, API documentation, and code comments
- **AI Usage**: ChatGPT helped structure README sections and suggested documentation format
- **My Role**: Wrote all technical content, setup instructions, and added project-specific details

#### 8. Debugging & Problem Solving (20% AI-assisted)
- **Task**: Resolving issues during development
- **AI Usage**: 
  - Used ChatGPT to understand MongoDB _id to id conversion issues
  - Asked Copilot for TypeScript type error solutions
- **My Role**: Analyzed root causes, implemented fixes, and added proper error handling
- **Example**: When facing "delete operator" TypeScript errors, ChatGPT suggested using object destructuring, which I then implemented with proper typing

### Specific Examples of AI-Assisted Commits

1. **Commit**: "feat: Implement authentication service with JWT"
   ```
   Co-authored-by: GitHub Copilot <github-copilot@users.noreply.github.com>
   ```
   - AI helped with: Basic service structure and JWT signing boilerplate
   - I added: Password validation, error handling, and database integration

2. **Commit**: "test: Add comprehensive unit tests for sweet service"
   ```
   Co-authored-by: ChatGPT <chatgpt@users.noreply.github.com>
   ```
   - AI helped with: Test structure recommendations
   - I added: All test cases, assertions, and edge case handling

3. **Commit**: "fix: Convert MongoDB _id to id for frontend compatibility"
   ```
   Co-authored-by: ChatGPT <chatgpt@users.noreply.github.com>
   ```
   - AI helped with: Understanding the issue and suggesting solutions
   - I implemented: Complete fix across all service methods

### AI Impact on My Workflow

#### Positive Impacts
1. **Speed**: AI helped me write boilerplate code 40% faster
2. **Learning**: Discovered new TypeScript patterns and best practices through AI suggestions
3. **Testing**: AI helped me think of edge cases I might have missed
4. **Documentation**: Structured and professional documentation created more efficiently
5. **Debugging**: Faster identification of common issues and anti-patterns

#### Challenges & Limitations
1. **Over-reliance**: Had to be careful not to accept AI suggestions blindly
2. **Context Understanding**: AI sometimes suggested solutions that didn't fit the overall architecture
3. **Security**: Had to manually review all AI-generated authentication and validation code
4. **Business Logic**: AI couldn't understand complex business requirements without extensive prompting
5. **Testing Quality**: AI-generated tests sometimes lacked meaningful assertions

### My Development Process

1. **Requirements Analysis** (100% manual): Read and understood all kata requirements
2. **Architecture Design** (80% manual, 20% AI consultation): Designed overall system architecture
3. **TDD Implementation** (60% manual, 40% AI-assisted): Wrote tests first, used AI for boilerplate
4. **Code Review** (100% manual): Reviewed all AI suggestions before accepting
5. **Refactoring** (70% manual, 30% AI-assisted): Used AI for pattern suggestions
6. **Documentation** (65% manual, 35% AI-assisted): AI helped with structure, I wrote content

### Reflection

Using AI tools significantly accelerated my development process, especially for repetitive tasks and boilerplate code. However, the true value came from my ability to:
- **Critically evaluate** AI suggestions
- **Understand** when to use AI and when to rely on manual implementation
- **Combine** AI efficiency with human creativity and problem-solving
- **Maintain** code quality by reviewing and testing all AI-generated code

**Key Lesson**: AI is a powerful assistant, not a replacement for understanding software architecture, business logic, and best practices. The most effective approach is using AI as a productivity multiplier while maintaining full understanding and control over the codebase.

---

## 💻 Development Approach

### Test-Driven Development (TDD)

This project strictly follows the Red-Green-Refactor cycle:

1. **Red**: Write failing test first
2. **Green**: Write minimal code to pass the test
3. **Refactor**: Improve code while keeping tests green

**Evidence in Git History**: Commit messages follow the pattern of test-first development, with test files committed before implementation files.

### Clean Code Principles

- **SOLID Principles**: Service layer follows Single Responsibility and Dependency Inversion
- **DRY**: Reusable components and utility functions
- **Meaningful Names**: Clear variable and function names
- **Error Handling**: Comprehensive try-catch blocks and user-friendly error messages
- **Type Safety**: Full TypeScript coverage with strict mode enabled
- **Code Comments**: Documented complex logic and business rules

### Git Workflow

- Frequent commits with descriptive messages
- Feature branches for major changes
- Clear commit history showing TDD progression
- AI co-authorship attribution in relevant commits

---

## 📦 Project Structure

```
SweetShopManagementSystem/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Sweet.ts           # Mongoose schema for sweets
│   │   │   └── User.ts            # Mongoose schema for users
│   │   ├── routes/
│   │   │   ├── authRoutes.ts      # Authentication endpoints
│   │   │   └── sweetRoutes.ts     # Sweet management endpoints
│   │   ├── services/
│   │   │   ├── authService.ts     # Auth business logic
│   │   │   ├── authService.test.ts
│   │   │   ├── sweetService.ts    # Sweet CRUD logic
│   │   │   └── sweetService.test.ts
│   │   ├── middleware/
│   │   │   └── auth.ts            # JWT verification middleware
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript interfaces
│   │   └── server.ts              # Express app entry point
│   ├── .env.example               # Environment template
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── seedData.js                # Database seeder
│   └── createAdmin.js             # Admin user creator
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddSweetModal.tsx
│   │   │   ├── EditSweetModal.tsx
│   │   │   ├── SweetCard.tsx
│   │   │   └── Cart.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   └── CartContext.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Modal.css
│   │   │   ├── SweetCard.css
│   │   │   └── Cart.css
│   │   ├── api/
│   │   │   └── api.ts             # Axios configuration
│   │   └── App.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
├── .gitignore
└── README.md
```

---

## 🚀 Deployment

This application can be deployed using various platforms:

### Backend Deployment Options
- **Heroku**: Node.js applications with MongoDB Atlas
- **Railway**: Modern deployment platform
- **Render**: Free tier with MongoDB support
- **AWS EC2**: Full control over infrastructure

### Frontend Deployment Options
- **Vercel**: Optimized for React applications
- **Netlify**: Easy integration with GitHub
- **GitHub Pages**: Static hosting for SPA

### Environment Variables for Production
Ensure all production deployments use:
- Strong JWT secrets (32+ characters)
- MongoDB Atlas production cluster
- HTTPS for all API endpoints
- CORS properly configured for frontend domain

---

## 🔐 Security Considerations

- ✅ JWT tokens with expiration
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Input validation on all endpoints
- ✅ Protected routes with authentication middleware
- ✅ Role-based access control (admin vs user)
- ✅ Environment variables for sensitive data
- ✅ CORS configuration
- ✅ MongoDB injection prevention with Mongoose

---

## 🐛 Known Issues & Future Enhancements

### Known Issues
- None at this time

### Future Enhancements
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Order history for users
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Image upload instead of URL
- [ ] Admin analytics dashboard
- [ ] Export inventory reports

---

## 📞 Contact & Support

For questions or issues, please open an issue on the GitHub repository.

**Repository**: [https://github.com/shiv989898/SweetShopManagementSystem](https://github.com/shiv989898/SweetShopManagementSystem)

---

## 📄 License

This project is created for educational purposes as part of a TDD kata assignment.

---

**Built with ❤️ using Test-Driven Development, TypeScript, React, and MongoDB**
