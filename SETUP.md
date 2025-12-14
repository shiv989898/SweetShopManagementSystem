# Setup Guide

## Quick Start Guide

Follow these steps to get the Sweet Shop Management System running on your local machine.

### Step 1: MongoDB Setup

1. **Install MongoDB** (if not already installed)
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: `sudo apt-get install -y mongodb-org`

2. **Start MongoDB service**
   - Windows: MongoDB service starts automatically after installation
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify MongoDB is running**
   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # You should see MongoDB shell prompt
   # Type 'exit' to quit
   exit
   ```

   The `sweet_shop` database will be created automatically when the application starts.

### Step 2: Backend Configuration

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file with your MongoDB connection:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sweet_shop
   JWT_SECRET=generate_a_random_secret_key_here
   ```

   **Note**: If you're using MongoDB Atlas (cloud), your URI will look like:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet_shop
   ```

5. The MongoDB collections will be created automatically when the application starts.

### Step 3: Frontend Configuration

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Step 4: Running the Application

1. **Start the Backend** (in backend directory):
   ```bash
   npm run dev
   ```
   You should see: "Server is running on port 5000"

2. **Start the Frontend** (in a new terminal, in frontend directory):
   ```bash
   npm run dev
   ```
   You should see: "Local: http://localhost:3000"

3. **Open your browser** and navigate to `http://localhost:3000`

### Step 5: Creating an Admin User

1. Register a normal user through the application

2. Open MongoDB shell:
   ```bash
   mongosh sweet_shop
   ```

3. Make the user an admin:
   ```javascript
   db.users.updateOne(
     { email: 'your_email@example.com' }, 
     { $set: { isAdmin: true } }
   )
   ```

4. Exit the shell:
   ```bash
   exit
   ```

5. Log out and log back in to see admin features

**Alternative**: Use MongoDB Compass (GUI) to find the user and change `isAdmin` to `true`

## Troubleshooting

### Database Connection Issues

If you see "MongoDB connection error":
- Verify MongoDB is running: `mongosh` should connect successfully
- Check your MONGODB_URI in .env file
- For Windows: Check if MongoDB service is running in Services
- For Mac/Linux: `brew services list` or `sudo systemctl status mongod`

### Port Already in Use

If port 5000 or 3000 is already in use:
- Backend: Change PORT in .env file
- Frontend: Change port in vite.config.ts

### Module Not Found

If you see module errors:
- Delete node_modules: `rm -rf node_modules`
- Delete package-lock.json: `rm package-lock.json`
- Reinstall: `npm install`

## Testing

Run tests to verify everything is working:

```bash
cd backend
npm test
```

You should see all tests passing.

## Next Steps

1. Register a user account
2. Make yourself an admin (see Step 5)
3. Add some sweets to the inventory
4. Test purchasing functionality
5. Explore search and filter features

## Git Setup

To start tracking your changes with Git:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Sweet Shop Management System

Set up full-stack application with:
- Express/TypeScript backend with MongoDB
- React/TypeScript frontend with Vite
- JWT authentication
- Complete TDD test suite
- RESTful API endpoints

Co-authored-by: GitHub Copilot <copilot@github.com>"

# Create GitHub repository and push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Sample Commit Messages with AI Co-authorship

When committing changes where you used AI assistance, use this format:

```bash
# Feature commit
git commit -m "feat: Add sweet search functionality

Implemented search endpoint with filters for name, category, and price range.
Used AI to generate initial query builder logic and test cases.

Co-authored-by: GitHub Copilot <copilot@github.com>"

# Test commit
git commit -m "test: Add unit tests for SweetService

Added comprehensive test coverage for CRUD operations and edge cases.
AI assisted in generating test scenarios and mock implementations.

Co-authored-by: ChatGPT <chatgpt@openai.com>"

# Fix commit
git commit -m "fix: Resolve CORS issues in API

Updated CORS configuration to allow frontend origin.
AI helped identify the CORS policy issue.

Co-authored-by: GitHub Copilot <copilot@github.com>"

# Refactor commit
git commit -m "refactor: Extract auth logic to middleware

Separated authentication logic into reusable middleware.
Manually refactored from AI-generated boilerplate.

Co-authored-by: GitHub Copilot <copilot@github.com>"
```

Remember: Be honest about AI usage and always review/understand the code before committing!
