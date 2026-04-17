# Portfolio Builder

Full-stack portfolio builder with:

- a public landing page
- authentication for admins and clients
- a builder area for managing portfolio content
- public portfolio pages rendered from a user slug
- an admin dashboard with overview stats

The project is split into two apps:

- `front/`: ReactJS/Vite + Vite + Tailwind CSS
- `back/`: NodeJS - Express + MySQL + ORM(Sequelize-CLI)

## Tech Stack

- Frontend: React 19, Vite, React Router, TanStack Query, Tailwind CSS 4
- Backend: Express 5, Sequelize, MySQL, JWT auth, Multer, Sharp
- Tooling: Nodemon, ESLint

## Main Features

- Public portfolio pages available at `/u/:slug`
- Multiple portfolio templates, including an accordion-based project section
- Admin area for stats and user management
- Builder area for client/admin content editing
- Image upload pipeline for certificates, project thumbnails, and project gallery images
- Static uploads served from the backend under `/uploads`

## Project Structure

```text
Portfolio/
├── front/     # React application
├── back/      # Express API + database logic
├── README.md
└── package.json
```

## Prerequisites

- Node.js 24+
- npm
- MySQL 8+

## Getting Started

### 1. Install dependencies

You can install everything from the repo root:

```bash
npm install
```

If you prefer, you can also install each app manually:

```bash
cd back && npm install
cd ../front && npm install
```

### 2. Configure the backend environment

Create the backend `.env` file from the example:

```bash
cp back/.env.example back/.env
```

Example variables used by the backend:

```env
PORT=3000

DB_NAME=portfoliobuilder
DB_USER=root
DB_PASSWORD=rootroot
DB_HOST=localhost
DB_PORT=3306

JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=12h
```

### 3. Create the MySQL database

Create a database matching `DB_NAME` from `back/.env`.

Example:

```sql
CREATE DATABASE portfoliobuilder;
```

### 4. Run migrations

From the backend folder:

```bash
cd back
npm run db:migrate
```

### 5. Seed demo data (optional but recommended)

```bash
cd back
npm run db:seed
```

This adds demo users, portfolios, projects, and certificates so you can test the app quickly.

## Launching the Project

Open two terminals from the repo root.

### Terminal 1: backend

```bash
npm run back
```

The API runs on `http://localhost:3000`.

### Terminal 2: frontend

```bash
npm run front
```

The frontend usually runs on `http://localhost:5173`.

## Useful Commands

### Root

```bash
npm run back
npm run front
```

### Backend

```bash
cd back
npm start
npm run db:migrate
npm run db:migrate:status
npm run db:migrate:undo
npm run db:migrate:undo:all
npm run db:seed
npm run dev:migrate
```

### Frontend

```bash
cd front
npm run dev
npm run build
npm run preview
npm run lint
```

## Demo Accounts

If you run the seeders, you can log in with:

- Admin: `admin@mbjtest.com` / `123456`
- Client: `client2@mbjtest.com` / `123456`

The login page also includes quick-login buttons for seeded accounts.

## Main Frontend Routes

- `/` - public home page
- `/contact` - contact page
- `/auth/login` - login
- `/auth/register` - registration
- `/u/:slug` - public portfolio
- `/u/:slug/certificates` - public certificates page
- `/builder` - builder dashboard for `ADMIN` and `CLIENT`
- `/admin` - admin dashboard

## Notes

- The frontend API base URL is currently hardcoded to `http://localhost:3000` in [front/src/api/config.js](/home/joao/Projects/Pro/Portfolio/front/src/api/config.js).
- Uploaded images are stored under `back/uploads/`.
- The backend serves uploaded files through `/uploads`.

## Status

There is no automated test suite configured yet, so the main verification flow right now is:

1. run migrations and seeds
2. start backend and frontend
3. verify login, builder uploads, and public portfolio pages manually
