# Sweet Shop Management System

Full-stack TDD kata: React + TypeScript + Vite frontend, Node.js + Express + TypeScript backend, MongoDB Atlas, JWT auth, shopping cart, and rupee pricing.

## What You Get
- Auth: register/login with JWT; admin role for management tasks
- Products: add, edit, delete, restock; image URL support
- Catalog: search by name, filter by category and price range
- Cart: add multiple items, adjust quantities, checkout; prices in ₹
- Inventory logic: purchase reduces stock; restock increases stock
- Responsive UI with consistent card sizing and smooth animations
- Tests: 17 passing Jest unit tests for services (TDD)

## Architecture
- Frontend: React 18, TypeScript, Vite, React Router, Axios
- Backend: Node.js, TypeScript, Express, Mongoose (MongoDB Atlas)
- Auth: JWT + bcrypt
- State: Context API (auth + cart)

## Setup
```bash
git clone https://github.com/shiv989898/SweetShopManagementSystem.git
cd SweetShopManagementSystem

# Backend
cd backend
npm install
cp .env.example .env   # add your MongoDB URI + JWT secret
npm run dev             # http://localhost:5000

# Frontend (new terminal)
cd ../frontend
npm install
npm run dev             # http://localhost:3001
```

### Backend environment (backend/.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/sweet_shop
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=24h
```
**Never commit real credentials.** Replace placeholders with your own values.

### Seed sample data
```bash
cd backend
node seedData.js
```

### Default admin (from seed)
- Email: admin@sweetshop.com
- Password: admin123

## API (authenticated)
- POST /api/auth/register — create user
- POST /api/auth/login — login
- GET /api/sweets — list sweets
- GET /api/sweets/search — query by name/category/price range
- POST /api/sweets — create (admin)
- PUT /api/sweets/:id — update
- DELETE /api/sweets/:id — delete (admin)
- POST /api/sweets/:id/purchase — purchase with quantity
- POST /api/sweets/:id/restock — restock (admin)

## Tests
```bash
cd backend
npm test
npm test -- --coverage
```

## Dev Notes
- Ports: backend 5000, frontend 3001
- DB: MongoDB Atlas preferred; local MongoDB works
- Cart persists in localStorage

## License
Educational / kata use.
