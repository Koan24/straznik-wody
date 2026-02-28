# Backend — Strażnik Wody API

Node.js + Express + Prisma + PostgreSQL REST API for water quality monitoring.

## 📦 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18
- **ORM**: Prisma 5.x
- **Database**: PostgreSQL 12+
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **CORS**: Enabled for frontend communication

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- A PostgreSQL database and user created

```sql
CREATE DATABASE straznik;
CREATE USER straznik_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE straznik TO straznik_user;
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

`.env` should contain:

```
DATABASE_URL="postgresql://straznik_user:your_password@localhost:5432/straznik?w=1"
JWT_SECRET="your_secret_key_here"
PORT=4000
```

### 4. Initialize Database

Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This creates all tables based on `prisma/schema.prisma`.

### 5. Start Server

**Development** (with auto-reload):

```bash
npm run dev
```

**Production**:

```bash
npm start
```

Server will listen on `http://localhost:4000` (or whatever `PORT` you set).

## 📡 API Routes

### Authentication (No auth required)

```
POST /api/register
  Body: { imie: string, email: string, password: string }
  Returns: { id, imie, email, rola, createdAt, updatedAt }

POST /api/login
  Body: { email: string, password: string }
  Returns: { token: "jwt_token_here" }
```

### Users (GET doesn't require auth, DELETE/POST require auth)

```
GET /api/uzytkownicy
  Returns: [{ id, imie, email, rola, createdAt }]

GET /api/uzytkownicy/:id
  Returns: { id, imie, email, rola }
```

### Water Gauge Stations (Wodowskazy)

```
GET /api/wodowskazy
  Returns: [{ id, nazwa, lat, lng, opis, createdAt, updatedAt }]

POST /api/wodowskazy (auth required)
  Body: { nazwa, lat, lng, opis? }
  Returns: { id, nazwa, lat, lng, opis, createdAt, updatedAt }

PUT /api/wodowskazy/:id (auth required)
  Body: { nazwa?, lat?, lng?, opis? }
  Returns: updated object

DELETE /api/wodowskazy/:id (auth required)
  Returns: { ok: true }
```

### Fault Reports (Zgloszenia)

```
GET /api/zgloszenia
  Returns: [{ id, tytul, opis, lat, lng, status, userId, user, createdAt, updatedAt }]

POST /api/zgloszenia
  Body: { tytul, opis, lat?, lng?, userId? }
  Returns: created object

PUT /api/zgloszenia/:id (auth required)
  Body: { tytul?, opis?, lat?, lng?, status?, userId? }
  Returns: updated object

DELETE /api/zgloszenia/:id (auth required)
  Returns: { ok: true }
```

## 🔐 Authentication

### How It Works

1. User registers with email/password
2. Password is hashed with bcrypt (10 salt rounds)
3. On login, user receives a JWT token (8-hour expiry)
4. Protected routes require `Authorization: Bearer <token>` header
5. Token verified with `JWT_SECRET` from `.env`

### Using Protected Routes

```bash
# Get token
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.pl","password":"pass123"}'

# Use token in protected request
curl -X POST http://localhost:4000/api/wodowskazy \
  -H "Authorization: Bearer eyJhbGci..." \
  -H "Content-Type: application/json" \
  -d '{"nazwa":"Station 1","lat":51.1,"lng":17.0}'
```

## 📊 Database Schema

See `prisma/schema.prisma` for full schema. Key models:

### User

- Stores user credentials and role
- `rola` defaults to "user", can be "admin"
- Password stored as bcrypt hash

### Wodowskaz (Water Gauge Station)

- Geographic locations with GPS coordinates
- Optional description
- No user association (global stations)

### Zgloszenie (Fault Report)

- Reports linked to user (optional)
- Includes GPS location of fault
- Status field for workflow (open, closed, etc.)

## 🗂 Project Structure

```
backend/
├── src/
│   └── index.js          # Main server file (all routes, middleware)
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Auto-generated migration files
├── .env.example          # Environment template
├── .env                  # Local environment (git-ignored)
├── .gitignore           # Exclude node_modules, .env, etc.
├── package.json         # Dependencies & scripts
├── package-lock.json    # Locked dependency versions
└── README.md            # This file
```

## 🧪 Testing Routes

Use `curl` or Postman to test:

```bash
# Register
curl -X POST http://localhost:4000/api/register \
  -H "Content-Type: application/json" \
  -d '{"imie":"John","email":"john@test.pl","password":"pass123"}'

# Login
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.pl","password":"pass123"}'

# List users
curl http://localhost:4000/api/uzytkownicy

# Get water gauges
curl http://localhost:4000/api/wodowskazy

# Get fault reports
curl http://localhost:4000/api/zgloszenia
```

## 🔧 Scripts

```bash
npm run dev              # Start with nodemon (auto-reload)
npm start               # Start production server
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run migrations
```

## 📝 Environment Variables Reference

| Variable       | Type   | Required | Description                   |
| -------------- | ------ | -------- | ----------------------------- |
| `DATABASE_URL` | string | Yes      | PostgreSQL connection string  |
| `JWT_SECRET`   | string | Yes      | Secret for signing JWT tokens |
| `PORT`         | number | No       | Server port (default: 4000)   |

## ⚙️ Configuration

### CORS

Already configured to allow requests from frontend. If you need to allow additional origins, modify the `cors()` call in `src/index.js`.

### Password Hashing

Bcrypt with 10 salt rounds. Change in `src/index.js` line: `const hashed = await bcrypt.hash(password, 10)`

### JWT Expiry

Set to 8 hours. Change in `src/index.js` line: `{ expiresIn: '8h' }`

## 🚀 Deployment

### On Render, Railway, or Heroku

1. Set environment variables in the hosting platform dashboard:

   - `DATABASE_URL` (use managed PostgreSQL)
   - `JWT_SECRET` (generate a strong random string)

2. Run migrations on first deploy:

   ```bash
   npx prisma migrate deploy
   ```

3. Start command: `npm start`

### On AWS / DigitalOcean / VPS

1. Install Node.js and PostgreSQL
2. Clone repo, set `.env`, run migrations
3. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start "npm start" --name straznik-api
   ```

## 🐛 Troubleshooting

| Issue                                | Solution                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------- |
| `Cannot connect to database`         | Check `DATABASE_URL`, ensure PostgreSQL is running                               |
| `EADDRINUSE: address already in use` | Port 4000 is in use. Kill the process or change `PORT` in `.env`                 |
| `Prisma migration error`             | Run `npx prisma migrate dev` to fix schema mismatches                            |
| `JWT error on protected route`       | Check token is valid and not expired. Use `Authorization: Bearer <token>` header |

## 📚 Resources

- [Express.js Guide](https://expressjs.com/)
- [Prisma ORM Docs](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
