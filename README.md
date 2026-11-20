# VidForge

A full-stack web application for video production and media services, built with a React + Vite frontend and a Node.js + Express + PostgreSQL backend.

## 🚀 Features

- **Frontend**: Built with React, Vite, Bootstrap, and FontAwesome.
- **Backend**: RESTful API powered by Node.js, Express, and PostgreSQL (`pg`).
- **Database**: PostgreSQL schema with relational tables for products, categories, orders, carts, wishlists, blogs, testimonials, services, pricing plans, team members, and reviews.
- **Authentication**: JWT-based user authentication.
- **File Uploads**: Media asset handling with Multer.

---

## 📁 Project Structure

```text
VidForge/
├── Backend/              # Express & Node.js API server
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth & file upload middlewares
│   ├── models/           # Database queries & models
│   ├── routes/           # Express API routes
│   ├── uploads/          # Uploaded media assets
│   ├── .env.example      # Example environment variables
│   ├── package.json      # Backend dependencies
│   └── server.js         # Entry point
├── frontend/             # React + Vite client
│   ├── src/              # React components, pages & assets
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
├── dump.sql              # PostgreSQL database dump
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

---

## 🛠️ Getting Started

### 1. Database Setup

Make sure PostgreSQL is installed and running on your machine.

Create the database and restore the schema and seed data from `dump.sql`:

```bash
# Create database
createdb -U postgres vidforge

# Import database dump
psql -U postgres -d vidforge -f dump.sql
```

### 2. Backend Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Copy `.env.example` to `.env` and adjust database credentials as needed:
   ```bash
   cp .env.example .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   node server.js
   # or with nodemon if installed:
   # npx nodemon server.js
   ```
   The backend API will run on `http://localhost:8080`.

### 3. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open the browser at the URL shown in your terminal (typically `http://localhost:5173`).
