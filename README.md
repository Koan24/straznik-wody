# Strażnik Wody

Full-stack water quality monitoring and fault reporting system. Built with **Node.js + Express + React + Vite + PostgreSQL**.

## 📋 Project Structure

```
straznik-wody/
├── backend/              # Node.js + Express API server
│   ├── src/
│   │   └── index.js     # Main server file (routes, auth, CRUD)
│   ├── prisma/
│   │   └── schema.prisma # Database schema (User, Wodowskaz, Zgloszenie)
│   ├── .env.example     # Environment template (copy to .env)
│   ├── package.json     # Dependencies & scripts
│   └── README.md        # Backend-specific setup
│
├── frontend/             # React + Vite SPA
│   ├── src/
│   │   ├── pages/       # Page components (Login, Home, etc.)
│   │   ├── services/    # API client functions (fetch calls)
│   │   ├── context/     # React context (Auth, Zgloszenia, etc.)
│   │   ├── components/  # Reusable UI components
│   │   └── main.jsx     # Entry point
│   ├── .env.example     # Not needed (hardcoded to localhost:4000)
│   ├── package.json     # Dependencies & scripts
│   ├── vite.config.js   # Vite build config
│   └── README.md        # Frontend-specific setup
│
└── docs/                 # Documentation (diagrams, API specs, etc.)
```

## ⚡ Quick Start

### Prerequisites

- **Node.js** 18+ (https://nodejs.org/)
- **PostgreSQL** 12+ (https://www.postgresql.org/download/)

### 1. Clone & Install

```bash
git clone <repo-url>
cd straznik-wody

# Install backend
cd backend
npm install

# Install frontend (in new terminal)
cd frontend
npm install
```

### 2. Database Setup

Create a PostgreSQL database and user:

```sql
CREATE DATABASE straznik;
CREATE USER straznik_user WITH PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE straznik TO straznik_user;
```

### 3. Configure Backend Environment

Copy and edit backend environment variables:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```
DATABASE_URL="postgresql://straznik_user:your_strong_password@localhost:5432/straznik?w=1"
JWT_SECRET="choose_a_long_random_string_here"
PORT=4000
```

### 4. Initialize Database

From the `backend/` folder:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This creates all tables (User, Wodowskaz, Zgloszenie).

### 5. Start Both Servers

**Backend** (from `backend/` folder):

```bash
npm run dev
```

Server runs on `http://localhost:4000`

**Frontend** (from `frontend/` folder, in new terminal):

```bash
npm run dev
```

App runs on `http://localhost:5173`

Open http://localhost:5173 in your browser.

## 🔑 Key Features

- **User Authentication**: Register, login with JWT tokens
- **Water Gauge Stations** (Wodowskazy): Create, view, update on map
- **Fault Reports** (Zgloszenia): Submit reports, track status, view on map
- **Role-Based Access**: Admin users can manage other users
- **Real-Time Data**: All data persisted in PostgreSQL

## 🛠 Available Scripts

**Backend** (`npm run dev` or `npm start`):

- `npm run dev` — Start with auto-reload (nodemon)
- `npm start` — Start production server
- `npm run prisma:generate` — Generate Prisma client
- `npm run prisma:migrate` — Run database migrations

**Frontend** (`npm run dev`, `npm run build`, `npm run preview`):

- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## 📡 API Endpoints

All endpoints require JWT token in `Authorization: Bearer <token>` header (except register/login/GET requests).

### Authentication

- `POST /api/register` — Register new user
- `POST /api/login` — Login, get JWT token

### Users

- `GET /api/uzytkownicy` — List all users
- `GET /api/uzytkownicy/:id` — Get user by ID

### Water Gauge Stations (Wodowskazy)

- `GET /api/wodowskazy` — List all stations
- `POST /api/wodowskazy` — Create new station _(auth required)_
- `PUT /api/wodowskazy/:id` — Update station _(auth required)_
- `DELETE /api/wodowskazy/:id` — Delete station _(auth required)_

### Fault Reports (Zgloszenia)

- `GET /api/zgloszenia` — List all reports
- `POST /api/zgloszenia` — Create new report
- `PUT /api/zgloszenia/:id` — Update report _(auth required)_
- `DELETE /api/zgloszenia/:id` — Delete report _(auth required)_

## 🗄 Database Schema

### User

- `id` (PK, auto-increment)
- `imie` (first name)
- `email` (unique)
- `password` (bcrypt hashed)
- `rola` (role: "user" or "admin")
- `createdAt`, `updatedAt`

### Wodowskaz (Water Gauge)

- `id` (PK)
- `nazwa` (station name)
- `lat`, `lng` (GPS coordinates)
- `opis` (description)
- `createdAt`, `updatedAt`

### Zgloszenie (Fault Report)

- `id` (PK)
- `tytul` (report title)
- `opis` (report description)
- `lat`, `lng` (location of fault)
- `status` (default: "open")
- `userId` (FK to User, optional)
- `createdAt`, `updatedAt`

## 🔐 Authentication Flow

1. User registers at `/register` → creates User in DB
2. User logs in → JWT token returned, stored in localStorage
3. All protected requests include token in `Authorization` header
4. Token expires in 8 hours

## 🛣 Frontend Routes

After login, available pages:

- `/home` — Dashboard
- `/wodowskazy` — List water gauges
- `/wodowskazy/dodaj` — Add new gauge
- `/wodowskazy/mapa` — View gauges on map
- `/obiekty/zgloszenie` — Create fault report
- `/obiekty/lista` — List all reports
- `/obiekty/mapa` — View reports on map
- `/admin` — Admin panel (user management)

## 📝 Environment Variables

### Backend (`.env`)

```
DATABASE_URL=postgresql://user:password@host:port/dbname?w=1
JWT_SECRET=your_secret_key
PORT=4000
```

### Frontend

No `.env` needed — API URL is hardcoded to `http://localhost:4000` in service files.
To change, edit `frontend/src/services/*.js` and update `API_URL`.

## 🚀 Deployment

### Deploy Backend

Options: Render, Railway, Heroku, AWS, DigitalOcean

1. Set `DATABASE_URL` and `JWT_SECRET` as environment variables
2. Run migrations: `npx prisma migrate deploy`
3. Start: `npm start`

### Deploy Frontend

Options: Vercel, Netlify, GitHub Pages

1. Update `API_URL` in service files to your production backend URL
2. Run: `npm run build`
3. Deploy `dist/` folder

## 🐛 Troubleshooting

**Backend won't start:**

- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Run migrations: `npx prisma migrate dev`

**Frontend blank page:**

- Check browser console (F12) for errors
- Ensure backend is running on `localhost:4000`
- Check CORS is enabled in backend (already configured)

**Can't connect to database:**

- Test connection: `psql postgresql://user:password@localhost:5432/straznik`
- Verify user has permissions: `GRANT ALL PRIVILEGES ON DATABASE straznik TO straznik_user;`

## 📚 Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vite.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## 📄 License

[Your license here]

## 👥 Contributors

- Your Name (backend lead)
- Other Names (frontend lead, etc.)

---

**Questions?** Check the `backend/README.md` or `frontend/README.md` for more details.
