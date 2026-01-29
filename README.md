# 🛒 Technobizzar - Product Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing products with a modern, responsive UI and robust backend API.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Technobizzar is a complete product management solution that allows users to create, read, update, and delete (CRUD) products. Built with modern web technologies, it provides a seamless user experience with a clean, responsive interface powered by React and Tailwind CSS on the frontend, and a robust RESTful API built with Node.js and MongoDB on the backend.

## ✨ Features

### Frontend
- ✅ Modern, responsive UI built with React 19
- ✅ Styled with Tailwind CSS for a clean, professional look
- ✅ Product form with real-time validation
- ✅ Product list with edit and delete functionality
- ✅ Fast development with Vite
- ✅ Icons from Lucide React
- ✅ ESLint configuration for code quality

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ MVC architecture for clean code organization
- ✅ CORS enabled for cross-origin requests
- ✅ Environment variable configuration
- ✅ Error handling and validation
- ✅ Auto-reload in development mode with Nodemon

## 🚀 Tech Stack

### Frontend
- **React** 19.1.0 - UI library
- **Vite** 6.3.5 - Build tool and dev server
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **Axios** 1.9.0 - HTTP client
- **Lucide React** - Icon library
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.0.3 - MongoDB ODM
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.3.1 - Environment variables
- **Nodemon** 3.0.2 - Development auto-reload

## 📁 Project Structure

```
Technobizzar/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.jsx      # Product creation/edit form
│   │   │   └── ProductList.jsx      # Display products
│   │   ├── api/
│   │   │   └── axios.js             # Axios configuration
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   └── netlify.toml                 # Netlify deployment config
│
├── Backend/
│   ├── controllers/
│   │   └── productController.js     # Business logic
│   ├── models/
│   │   └── Product.js               # MongoDB schema
│   ├── routes/
│   │   └── productRoutes.js         # API routes
│   ├── server.js                    # Entry point
│   ├── package.json
│   └── .env                         # Environment variables
│
├── netlify.toml
└── README.md
```

## 🏁 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Technobizzar
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `Backend` directory:
   ```bash
   cd Backend
   touch .env
   ```

2. Add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/technobizzar
   ```

   **For MongoDB Atlas:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/technobizzar?retryWrites=true&w=majority
   ```

### Frontend Configuration

The frontend is configured to connect to the backend API. Update the API base URL in `Frontend/src/api/axios.js` if your backend runs on a different port:

```javascript
const API_BASE_URL = 'http://localhost:5000';
```

## 🚀 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```
The backend server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

### Option 2: Run from Frontend Directory

The frontend has a server script that can run both:
```bash
cd Frontend
npm run server
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Get All Products
```http
GET /products
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "price": 50000,
    "category": "Electronics",
    "inStock": true,
    "createdAt": "2026-01-29T10:00:00.000Z",
    "updatedAt": "2026-01-29T10:00:00.000Z"
  }
]
```

#### Create Product
```http
POST /products
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Laptop",
  "price": 50000,
  "category": "Electronics",
  "inStock": true
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "price": 50000,
  "category": "Electronics",
  "inStock": true,
  "createdAt": "2026-01-29T10:00:00.000Z",
  "updatedAt": "2026-01-29T10:00:00.000Z"
}
```

#### Update Product
```http
PUT /products/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Laptop",
  "price": 55000,
  "category": "Electronics",
  "inStock": true
}
```

#### Delete Product
```http
DELETE /products/:id
```

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

## 🌐 Deployment

### Deploy to Netlify (Frontend)

1. Build the frontend:
   ```bash
   cd Frontend
   npm run build
   ```

2. The `netlify.toml` is already configured for deployment.

3. Deploy using Netlify CLI or connect your GitHub repository to Netlify.

### Deploy Backend

You can deploy the backend to:
- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean**
- **AWS**
- **Google Cloud**

Make sure to:
1. Set environment variables on your hosting platform
2. Update the MongoDB connection string
3. Update CORS settings to allow your frontend domain

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created with ❤️ by Vijay Shankar Shewale

## 🙏 Acknowledgments

- React Team for the amazing UI library
- MongoDB Team for the robust database
- Tailwind CSS for the utility-first CSS framework
- Vite for the lightning-fast build tool
- All open-source contributors

---

**Happy Coding! 🚀**
