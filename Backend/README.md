# Product Management System - Backend

A RESTful API built with Node.js, Express, and MongoDB for managing products.

## Features

- CRUD operations for products
- MVC architecture
- MongoDB database with Mongoose ODM
- CORS enabled
- Proper error handling
- Input validation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/productdb
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## API Endpoints

### Get All Products
```
GET /products
```

### Create Product
```
POST /products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 50000,
  "category": "Electronics",
  "inStock": true
}
```

### Update Product
```
PUT /products/:id
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 55000,
  "category": "Electronics",
  "inStock": true
}
```

### Delete Product
```
DELETE /products/:id
```

## Project Structure

```
Backend/
├── server.js                 # Entry point
├── models/
│   └── Product.js           # Product schema
├── controllers/
│   └── productController.js # Business logic
├── routes/
│   └── productRoutes.js     # API routes
├── .env                     # Environment variables
└── package.json             # Dependencies
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
