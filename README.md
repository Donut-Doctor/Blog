# Vagabond's Diary - MERN Blog Platform

Vagabond’s Diary is a full-featured blogging platform built using the MERN stack. It supports user authentication, post management, category filtering, and search functionality.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete blog posts
- Categorized posts and filter by category
- Search posts by title or content
- Responsive design with multiple sidebar layouts
- Postman collection for API testing

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT, bcrypt
- Styling: CSS

## Getting Started

### Clone the repository
```
git clone https://github.com/Donut-Doctor/Blog.git
cd vagabonds-diary
```

### Backend Setup
```
cd server
npm install
```

Create a `.env` file with:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_db
ACCESS_TOKEN_SECRET=your_secret_key
```

Run the server:
```
node server.js
```

### Frontend Setup
```
cd ../client
npm install
npm start
```

## Folder Structure
```
/client     - frontend
/server     - backend
/postman    - Postman collection
```

## API Endpoints

Auth:
- POST /auth/register
- POST /auth/login

Posts:
- GET /posts
- GET /posts/:id
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

Categories:
- GET /categories
- GET /category/:name

## Postman Collection

Import `Postman_Collection.json` in Postman to test all routes.

## Seeding Posts (Optional)
```
cd server/seed
node postsSeeder.js
```
