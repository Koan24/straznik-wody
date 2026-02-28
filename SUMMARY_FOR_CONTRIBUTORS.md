# What We Built Today — Beginner's Guide

Hi! This is a simple explanation of everything we set up today. No jargon, just the facts.

## 🎯 What We Did

We took a React frontend app and connected it to a **working backend server**. Now the app can:

- Save user accounts (register/login)
- Save water gauge stations to a database
- Save fault reports to a database
- Retrieve all that data and display it in the app

## 🏗 The Three Parts of Our App

### 1. **Database** (PostgreSQL)

This is where all data lives. Think of it like a spreadsheet in the cloud.

**What we can save:**

- **Users** — email, password, name, role
- **Wodowskazy** (Water Gauges) — name, location (lat/lng), description
- **Zgloszenia** (Fault Reports) — title, description, location, status, who reported it

### 2. **Backend Server** (Node.js + Express)

This is the middleman between the database and the app. It:

- Handles user login/register
- Saves data to the database
- Reads data from the database
- Returns data to the app when it asks for it

**Location:** `backend/` folder
**Running on:** `http://localhost:4000`

### 3. **Frontend App** (React + Vite)

This is what you see in your browser. It:

- Shows pages (login, home, maps, forms)
- Lets you fill out forms
- Talks to the backend to save/get data

**Location:** `frontend/` folder
**Running on:** `http://localhost:5173`

## 📡 API Endpoints (How Frontend Talks to Backend)

An "endpoint" is like a door on the backend. The frontend knocks on these doors to get or save data.

### Login/Register (No authentication needed)

```
POST http://localhost:4000/api/register
  → Send: { imie: "John", email: "john@test.pl", password: "pass123" }
  ← Get: { id: 1, imie: "John", email: "john@test.pl", rola: "user" }

POST http://localhost:4000/api/login
  → Send: { email: "john@test.pl", password: "pass123" }
  ← Get: { token: "jwt_token_here" }
```

### Water Gauges (Wodowskazy)

```
GET http://localhost:4000/api/wodowskazy
  ← Get: [ { id: 1, nazwa: "Station 1", lat: 51.1, lng: 17.0, opis: "..." }, ... ]

POST http://localhost:4000/api/wodowskazy
  → Send: { nazwa: "Station 1", lat: 51.1, lng: 17.0, opis: "..." }
  ← Get: { id: 1, nazwa: "Station 1", lat: 51.1, lng: 17.0, ... }

PUT http://localhost:4000/api/wodowskazy/1
  → Send: { nazwa: "Updated Name" } (or any field)
  ← Get: updated object

DELETE http://localhost:4000/api/wodowskazy/1
  ← Get: { ok: true }
```

### Fault Reports (Zgloszenia)

```
GET http://localhost:4000/api/zgloszenia
  ← Get: [ { id: 1, tytul: "Broken Gauge", opis: "...", lat: 51.1, lng: 17.0, status: "open", ... }, ... ]

POST http://localhost:4000/api/zgloszenia
  → Send: { tytul: "Broken", opis: "Not working", lat: 51.1, lng: 17.0 }
  ← Get: { id: 1, tytul: "Broken", ... }

PUT http://localhost:4000/api/zgloszenia/1
  → Send: { status: "closed" } (or update any field)
  ← Get: updated object

DELETE http://localhost:4000/api/zgloszenia/1
  ← Get: { ok: true }
```

### Users

```
GET http://localhost:4000/api/uzytkownicy
  ← Get: [ { id: 1, imie: "John", email: "john@test.pl", rola: "user" }, ... ]

GET http://localhost:4000/api/uzytkownicy/1
  ← Get: { id: 1, imie: "John", email: "john@test.pl", rola: "user" }
```

## ⚠️ Important: Authentication

Some endpoints require you to send a **token** (like a secret pass):

1. User logs in → backend gives you a token
2. Token is saved in browser's localStorage
3. When you make requests, you include token in the header:
   ```
   Authorization: Bearer eyJhbGci...
   ```
4. Backend checks token to make sure it's real

The frontend service files (`frontend/src/services/*.js`) do this automatically — you don't need to do it manually.

## 📂 Frontend Structure

**Where to look for what:**

```
frontend/src/
├── pages/              ← Full page components
│   ├── Login.jsx       ← Login page
│   ├── Register.jsx    ← Registration page
│   ├── Wodowskazy.jsx  ← List water gauges
│   ├── DodajWodowskaz.jsx ← Add water gauge
│   ├── Zgloszenie.jsx  ← Create fault report
│   ├── ListaZgloszen.jsx ← List reports
│   └── ... (other pages)
│
├── services/           ← Fetch functions (talk to backend)
│   ├── uzytkownicyService.js ← User API calls
│   ├── wodowskazyService.js ← Water gauge API calls
│   └── zgloszeniaService.js ← Fault report API calls
│
├── context/            ← Shared data across pages
│   ├── AuthContext.jsx ← Login/user data
│   ├── ThemeContext.jsx ← Dark/light mode
│   ├── ToastContext.jsx ← Notifications (success/error)
│   ├── WodowskazyContext.jsx ← Water gauge data
│   ├── UzytkownicyContext.jsx ← User data
│   └── ZgloszeniaContext.jsx ← Fault report data
│
└── components/         ← Reusable UI parts
    ├── Layout.jsx      ← Main page wrapper
    ├── Button.jsx      ← Button
    └── Card.jsx        ← Card wrapper
```

## 🔄 How Data Flows

Here's what happens when you add a water gauge:

1. **User fills form** in `DodajWodowskaz.jsx` page

   - Name, location (clicking map), description

2. **User clicks "Dodaj"** button

   - Page calls `dodajWodowskaz()` from `WodowskazyContext`

3. **Context calls service function**

   - `WodowskazyContext.jsx` calls `createWodowskaz()` from `wodowskazyService.js`

4. **Service sends HTTP request to backend**

   - `POST http://localhost:4000/api/wodowskazy` with data

5. **Backend saves to database**

   - Checks token is valid
   - Saves data to PostgreSQL
   - Returns saved data back

6. **Frontend updates the list**
   - Page receives data
   - Adds it to the context
   - Component automatically re-renders with new data
   - User sees new item in list/map

## ✅ What's Working Now

- ✅ Register new users
- ✅ Login with email/password
- ✅ Create water gauges
- ✅ View water gauges list
- ✅ View water gauges on map
- ✅ Create fault reports
- ✅ View fault reports list
- ✅ View fault reports on map
- ✅ All data saves to database (doesn't disappear on refresh)

## 🚀 What's NOT Done Yet

- ❌ Deleting gauges/reports
- ❌ Editing gauges/reports
- ❌ Admin controls
- ❌ User roles/permissions
- ❌ Measurement history/charts
- ❌ Archive/filter options
- ❌ Email notifications
- ❌ Export to PDF

## 🛠 How to Start Working

### Before you start coding:

1. **Make sure both servers are running:**

   - Terminal 1: `cd backend && npm run dev` (should say "listening on 4000")
   - Terminal 2: `cd frontend && npm run dev` (should say "localhost:5173")

2. **Open the app:** http://localhost:5173

3. **Test it works:**
   - Register a test account
   - Login
   - Add a water gauge
   - Go to map and see it marked

### When you add new pages/features:

1. **If you need new data in the database:**

   - Edit `backend/prisma/schema.prisma`
   - Run `npx prisma migrate dev --name describe_change` in `backend/` folder

2. **If you need a new API endpoint:**

   - Add it to `backend/src/index.js`
   - Test it works with curl or Postman
   - Then update frontend services to call it

3. **If you're building a page:**
   - Create file in `frontend/src/pages/YourPage.jsx`
   - Add route to `frontend/src/App.jsx`
   - Import and use contexts/services as needed

## 📞 Example: How to Build a New Feature

Let's say you want to add "Edit Water Gauge" feature.

### Step 1: Create the page

```javascript
// frontend/src/pages/EdytujWodowskaz.jsx
import { useParams } from 'react-router-dom'
import { useWodowskazy } from '../context/WodowskazyContext'

export default function EdytujWodowskaz() {
  const { id } = useParams() // Get ID from URL
  const { wodowskazy, aktualizujWodowskaz } = useWodowskazy()

  const gauge = wodowskazy.find(w => w.id === Number(id))

  // Show form with current values
  // On submit, call aktualizujWodowskaz()
}
```

### Step 2: Add route to App.jsx

```javascript
<Route path='/wodowskazy/edycja/:id' element={<EdytujWodowskaz />} />
```

### Step 3: Update context to handle PUT request

```javascript
// In WodowskazyContext.jsx
const aktualizujWodowskaz = async (id, data) => {
  const updated = await updateWodowskaz(id, data)
  // Update local state
}
```

### Step 4: Make sure service has the function

```javascript
// In wodowskazyService.js
export async function updateWodowskaz(id, data) {
  const res = await fetch(`${API_URL}/api/wodowskazy/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  })
  return res.ok ? res.json() : null
}
```

Backend already has the endpoint — it's in `backend/src/index.js`.

## 🐛 If Something Breaks

**Page is blank?**

- Check browser console (F12) for errors
- Make sure backend is running on 4000

**API call failing?**

- Check Network tab in DevTools (F12)
- Look at the error message
- Make sure you're sending the right data

**Database error?**

- Usually the backend terminal shows the error
- Read it carefully
- Most likely: wrong field names or types

## 📚 Files You Should Read

1. **[README.md](README.md)** — Overview of the whole project
2. **[backend/README.md](backend/README.md)** — Backend details
3. **[frontend/README.md](frontend/README.md)** — Frontend details
4. **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to work on the project

## ❓ Quick Questions & Answers

**Q: How do I add a new field to User (like phone number)?**
A:

1. Edit `backend/prisma/schema.prisma` — add `phone String?`
2. Run `npx prisma migrate dev --name add_phone_to_user`
3. Update `backend/src/index.js` register route to save phone
4. Update frontend form to ask for phone

**Q: Can I delete my test data?**
A: Yes! Just delete from the database. Or reset everything:

```bash
cd backend
npx prisma migrate reset
npx prisma migrate dev --name init
```

(Warning: this deletes ALL data)

**Q: Where does the app store the login token?**
A: Browser's localStorage. It's automatically included in all API requests.

**Q: Can I change the database without a migration?**
A: NO! Always run migrations. The migration keeps everyone's database in sync.

**Q: What's the difference between Context and Service?**
A:

- **Service** = Function that talks to the API (simple fetch calls)
- **Context** = Stores data in memory, so all pages can use it, calls services

**Q: How do I test an endpoint without the frontend?**
A: Use `curl` or Postman:

```bash
curl http://localhost:4000/api/wodowskazy
```

---

## 🎉 You're Ready!

That's everything you need to know to start building. Good luck, and happy coding!

If you get stuck, check the README files or look at similar existing pages to understand the pattern.
