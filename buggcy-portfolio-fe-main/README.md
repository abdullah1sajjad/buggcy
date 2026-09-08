# Buggcy Portfolio - Frontend

Corporate portfolio website with admin panel for managing blogs, careers, services, industries, success stories, and contact submissions.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 6 |
| Bundler | Vite 8 |
| Routing | React Router DOM 7 |
| State | Zustand 5 |
| Data Fetching | TanStack React Query 5 |
| HTTP Client | Axios |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| Forms | React Hook Form 7 + Zod 4 |
| Icons | Lucide React |
---

## Getting Started

### Prerequisites

- Node.js 18+
- Backend server running on `http://localhost:3000`

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173`.

### Environment Variables

Create `.env` in root:

```
VITE_API_URL=http://localhost:3000/api/v1
```

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

## Features

### Public Pages
- `/` - Home (Hero, Services, Industries, Team, TechStack, Contact)
- `/about` - About Us
- `/services` - All services
- `/services/:slug` - Service detail
- `/industries` - All industries
- `/industries/:slug` - Industry detail
- `/success-stories` - All success stories
- `/success-stories/:slug` - Story detail
- `/blog` - Blog listing
- `/blog/:id` - Blog detail
- `/blog/case-studies` - Case studies
- `/blog/ai-guides` - AI guides
- `/portfolio` - Portfolio
- `/careers` - Job listings
- `/careers/:id` - Job detail
- `/careers/:id/apply` - Job application form
- `/contact` - Contact form

### Admin Panel
- `/admin/login` - Login
- `/admin` - Dashboard with live counts
- `/admin/blogs` - Blog CRUD
- `/admin/careers` - Career CRUD
- `/admin/services` - Service CRUD
- `/admin/industries` - Industry CRUD
- `/admin/success-stories` - Success Story CRUD
- `/admin/contact-submissions` - View/delete contact submissions
- `/admin/applications` - View/delete job applications
- `/admin/users` - User management (super_admin only)

## Admin Credentials

```
Email: admin@company.com
Password: Admin@1234
```

## Build

```bash
npm run build
```

Output in `dist/`. Deploy to Vercel, Netlify, or any static host.
