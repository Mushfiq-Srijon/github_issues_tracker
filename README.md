# GitHub Issues Tracker

A full-stack issue tracking application.

The application allows users to create, manage, search, filter, and track software issues through a responsive web interface. Authentication is handled using JWT stored in HTTP-only cookies, while issue data is persisted in a MySQL database.

## Live Application

**Frontend:** https://github-issues-tracker-five.vercel.app/

**Backend API:** https://github-issues-tracker.onrender.com/

## Features

### Authentication

* User registration
* Login and logout
* Unique email validation
* Password validation
* Password confirmation
* JWT-based authentication
* JWT stored in HTTP-only cookies
* Protected application routes

### Dashboard

* Total Issues
* Open Issues
* In Progress Issues
* Closed Issues
* Recent activity
* Dynamic status distribution chart
* Resolution rate

### Issue Management

* Create new issues
* View issue details
* Edit own issues
* Update issue status
* Delete own issues
* Issue priority:

  * Low
  * Medium
  * High
  * Critical
* Issue status:

  * Open
  * In Progress
  * Closed
* Issue labels:

  * Bug
  * Feature
  * Documentation
  * UI/UX
  * Backend
  * Frontend

### Search and Filtering

* Search issues by title
* Filter by status
* Filter by priority
* Multiple status and priority filters
* Dynamic issue results from the backend

## Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### Backend

* Laravel
* PHP
* RESTful API
* JWT Authentication

### Database

* MySQL

### Deployment

* Vercel — Frontend
* Render — Backend API
* Aiven — MySQL Database

## System Architecture

```text
React/Vite Frontend
        |
        | REST API
        v
Laravel Backend
        |
        | MySQL
        v
Aiven Database
```

Authentication uses JWT tokens stored in HTTP-only cookies. Protected API routes verify the authenticated user before allowing access to dashboard and issue-management operations.

## User Permissions

The application uses a single user role.

Users can:

* Register
* Login
* View their dashboard
* Create issues
* View their own issues
* Update their own issues
* Delete their own issues
* Logout

Users cannot modify or delete issues belonging to another user.

## Project Structure

```text
github_issues_tracker/
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   └── Models/
│   ├── config/
│   ├── database/
│   │   └── migrations/
│   ├── routes/
│   │   └── api.php
│   ├── Dockerfile
│   ├── nginx.conf
│   └── start.sh
│
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── IssuesList/
│   │   └── Modals/
│   ├── pages/
│   ├── styles/
│   ├── api.js
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

## Running Locally

### Prerequisites

Make sure the following are installed:

* Node.js
* PHP 8.2+
* Composer
* MySQL

### Frontend

From the project root:

```bash
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The frontend uses the `VITE_API_URL` environment variable to determine the backend API URL.

For local development, the default API URL is:

```text
http://localhost:8000/api
```

### Backend

Open a second terminal:

```bash
cd backend
composer install
php artisan migrate
php artisan serve
```

The Laravel API will normally be available at:

```text
http://localhost:8000
```

### Environment Configuration

Create a `.env` file inside the `backend` directory and configure:

```text
APP_ENV=local
APP_DEBUG=true
APP_KEY=

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=github_issues_tracker
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Generate the JWT secret:

```bash
php artisan jwt:secret
```

Never commit the `.env` file or any secret keys to GitHub.

## API Overview

### Authentication

```text
POST /api/register
POST /api/login
POST /api/logout
POST /api/refresh
GET  /api/user
```

### Dashboard

```text
GET /api/dashboard
```

### Issues

```text
GET    /api/issues
POST   /api/issues
GET    /api/issues/{issue}
PUT    /api/issues/{issue}
DELETE /api/issues/{issue}
```

## Deployment

The production application uses the following architecture:

```text
Vercel
  |
  | HTTPS REST API
  v
Render
  |
  | MySQL
  v
Aiven
```

The frontend is deployed as a Vite application on Vercel. The Laravel REST API runs on Render using Docker, while the production MySQL database is hosted on Aiven.

## Security

* Passwords are hashed before being stored in the database.
* JWT authentication is used for protected API endpoints.
* JWT tokens are stored in HTTP-only cookies.
* Production authentication cookies use secure HTTPS settings.
* Users can only modify or delete their own issues.
* Database credentials and application secrets are kept in environment variables.
