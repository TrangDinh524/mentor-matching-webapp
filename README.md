# Mentor Matching Platform

A web application that connects mentors and mentees, facilitating meaningful mentorship relationships.

## Technologies Used

### Frontend

- HTML5, CSS3, JavaScript
- http-server for local development
- Responsive design

### Backend

- Node.js
- Express.js
- MySQL2 for database
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin resource sharing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- Git

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=mentor_matching_db
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

## Configuration

### Database Setup
Open Command Prompt and run:
   ```bash
      mysql -u root -p < backend/db/schema.sql
   ```
### Environment Variables

- Backend requires environment variables for database connection and JWT secret
- Frontend runs on port 4000 by default
- Backend runs on port 3000 by default

## Development URLs

- Frontend: http://localhost:4000
- Backend API: http://localhost:3000

## Features

- User authentication (signup/login)
- Profile management
- Mentor browsing and matching
- Secure API endpoints
- Cross-origin resource sharing enabled

