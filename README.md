
# Audiobook Web Application

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [System Architecture](#system-architecture)
4. [Frontend](#frontend)
5. [Backend](#backend)
6. [API Endpoints](#api-endpoints)
7. [User Guide](#user-guide)
8. [Deployment](#deployment)

## Introduction
This web application allows users to browse audiobooks, view details, and submit reviews and ratings. It is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Features
- Browse audiobooks
- Filter and sort audiobooks
- View audiobook details
- Submit reviews and ratings
- User-friendly interface with keyboard shortcuts
- Save heard books after rating

## System Architecture
- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB

## Frontend
### Technologies Used
- React.js

### Key Components
- Navbar
- AudioBookList
- AudioBookDetails
- StarRating

### User Interface
- Left Section: List of all audiobooks
- Right Section: "Your Heard Books" or specific book details

### Key Features
- Search functionality by author
- Filtering by rating and genre
- Responsive design
- Title change on book selection
- Keyboard shortcuts (ESCAPE, ENTER)

## Backend
### Technologies Used
- Node.js
- Express.js
- MongoDB

### Project Structure
- Models: MongoDB schemas
- Routes: API endpoints
- Controllers: Request handling logic

### Middleware
- cors
- dotenv
- mongoose

## API Endpoints
### Book Routes
Base URL: `localhost:8080/book`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /        | Create a new book |
| POST   | /review  | Create a review for a book |
| DELETE | /:id     | Delete a book by ID |
| GET    | /:id     | Get a single book by ID |
| GET    | /        | Get all books |

### Filter Routes
Base URL: `localhost:8080/filter`

| Method | Endpoint      | Description |
|--------|---------------|-------------|
| GET    | /author/:name | Get books by author name |
| GET    | /genre/:genre | Get books by genre |
| GET    | /orderBy      | Get books ordered ascending or descending |

## User Guide
1. Browse audiobooks
2. View book details
3. Submit reviews and ratings

## Deployment
### Hosting
- Frontend: Github
- Backend: Github
- Database: MongoDB Atlas

### Environment Variables
- `MONGODB_URL`: Connection string for MongoDB database
- `PORT`: Port number for the server (8080) (check whether this port is busy or not lsof -i :8080 and then kill -9 <PID>)

### Deployment Steps
1. Clone GitHub repo
2. Set up Frontend: cd client/ and  npm run dev
3. cd api/
    - nodemon index.js –import (this will import the data in your mongo database from books.json)
    - nodemon index.js –delete (this will delete all the data)
    - Crtl + C (Important)
    - Now as the data is setup we can run npm start to start server

   