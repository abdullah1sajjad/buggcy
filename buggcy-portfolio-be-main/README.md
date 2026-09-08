# Buggcy Portfolio - Backend

NestJS REST API for the corporate portfolio website. Handles authentication, content management (blogs, careers, services, industries, success stories), job applications, contact submissions, and file uploads via Cloudinary.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | NestJS 10 |
| Language | TypeScript 5 |
| Database | PostgreSQL (Neon) |
| ORM | TypeORM 0.3 |
| Auth | JWT + Passport |
| Validation | Zod 4 |
| File Upload | Cloudinary + Multer |
| API Docs | Swagger |
| Runtime | Node.js |
---

## 🚀 Local Setup Guide

Follow these steps to set up the project on your local machine for development.

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **PostgreSQL** database (We recommend using [Neon.tech](https://neon.tech) for a free serverless Postgres DB, or install it locally)
- **Git** (for cloning the repository)

### Step-by-Step Setup

**1. Clone the repository**
```bash
git clone https://github.com/abdullah1sajjad/buggcy-portfolio-be.git
cd buggcy-portfolio-be
```

**2. Install dependencies**
Install all required Node modules using npm:
```bash
npm install
```

**3. Configure Environment Variables**
We need to set up the environment variables so the app can connect to the database and third-party services.
- Create a copy of the example file:
  ```bash
  cp .env.example .env
  ```
- Open the `.env` file in your editor and fill in your actual credentials (database URL, Cloudinary keys, etc.). 
> **Important:** Do not skip the `DATABASE_URL`! You must provide a valid PostgreSQL connection string.

**4. Seed the Database (Initial Data)**
To create the default admin user so you can log in, run the seed script:
```bash
npm run seed 
```
*(Note: If you run into issues, ensure your Database is running and the `DATABASE_URL` is correct).*

**5. Start the Development Server**
Run the app in watch mode (auto-restarts on code changes):
```bash
npm run start:dev
```

🎉 **Success!** Your backend should now be running.
- **API Base URL:** `http://localhost:3000/api/v1`
- **Swagger Documentation:** `http://localhost:3000/api/docs` (View and test all APIs here)

### Environment Variables

```env
# App
NODE_ENV=development
APP_PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Auth
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Admin Seed
ADMIN_EMAIL=admin@company.com
ADMIN_PASSWORD=Admin@1234

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Scripts

```bash
npm run start:dev     # Development with nodemon (auto-restart)
npm run start:debug   # Debug mode
npm run build         # Compile TypeScript
npm run start:prod    # Run compiled code
npm run seed          # Seed admin user
npm run lint          # ESLint
npm run test          # Jest tests
```

## API Endpoints

Base URL: `http://localhost:3000/api/v1`


## Swagger

API documentation available at `/api/docs` when server is running.

## 🌐 Server Deployment Guide

When you are ready to deploy the application to a production server (like VPS, AWS EC2, DigitalOcean, Render, etc.), follow these steps.

### Prerequisites on Server
- Node.js 18+ and npm installed
- PM2 installed globally (for process management) `npm install -g pm2`
- PostgreSQL Database accessible by the server

### Standard Deployment (Node + PM2)

**1. Clone the repository on the server**
```bash
git clone https://github.com/abdullah1sajjad/buggcy-portfolio-be.git
cd buggcy-portfolio-be
```

**2. Install Production Dependencies**
```bash
npm install
```

**3. Setup Environment Variables**
Create your `.env` file on the server and add your production credentials:
```bash
cp .env.example .env
nano .env  # Edit the file with your production database, Cloudinary keys, and a strong JWT_SECRET
```
*Make sure `NODE_ENV=production` in your `.env` file.*

**4. Build the Project**
Compile the TypeScript code to plain JavaScript:
```bash
npm run build
```


### Environment Checklist for Production
Before going live, double-check that you have configured:
- [ ] `DATABASE_URL` (Production database)
- [ ] `JWT_SECRET` (A long, random, secure string)
- [ ] `ALLOWED_ORIGINS` (Your production frontend URL, e.g., `https://your-frontend-domain.com`)
- [ ] `CLOUDINARY_*` (Valid Cloudinary credentials for uploads)
