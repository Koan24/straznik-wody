# Contributing to Strażnik Wody

This guide helps new contributors set up the project and understand the development workflow.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/straznik-wody.git
cd straznik-wody
```

### 2. Read Documentation

- **Overall project**: Read [README.md](README.md)
- **Backend setup**: Read [backend/README.md](backend/README.md)
- **Frontend setup**: Read [frontend/README.md](frontend/README.md)

### 3. Follow Local Setup

Follow the **Quick Start** section in [README.md](README.md) to install dependencies and start both servers.

## 📋 Project Structure Quick Reference

```
backend/           → Express API server (Node.js)
├── src/index.js   → All routes, middleware, business logic
├── prisma/        → Database schema and migrations
└── .env           → Local environment (git-ignored)

frontend/          → React + Vite web app
├── src/pages/     → Full-page components (routed)
├── src/services/  → API client functions (fetch calls)
├── src/context/   → React Context for state management
└── src/components/ → Reusable UI components
```

## 🔧 Development Workflow

### Running Locally

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
# Listens on http://localhost:4000
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
# Listens on http://localhost:5173
```

Open http://localhost:5173 in your browser.

### Making Changes

#### Backend Changes

1. Edit `backend/src/index.js` for routes/logic
2. Edit `backend/prisma/schema.prisma` for database schema
3. If you changed the schema, run:
   ```bash
   npx prisma migrate dev --name describe_your_change
   ```
4. Backend auto-reloads (nodemon)

#### Frontend Changes

1. Edit files in `frontend/src/`
2. Vite auto-reloads on save
3. Check browser console (F12) for errors

### Testing Your Changes

1. **Manual testing in browser** — most effective for UI changes
2. **Check API calls** — use browser Network tab (F12)
3. **Check console errors** — browser Console tab (F12)
4. **Test the full flow** — register, login, create data, navigate pages

## 📝 Code Style Guidelines

### Backend (Node.js / Express)

- Use async/await instead of .then()
- Use const/let, avoid var
- Add error handling try/catch on API routes
- Comment complex logic
- Use meaningful variable names (not `d`, `x`, `temp`)

Example:

```javascript
app.post('/api/wodowskazy', auth, async (req, res) => {
  try {
    const data = req.body
    const item = await prisma.wodowskaz.create({ data })
    res.json(item)
  } catch (e) {
    console.error('Error creating wodowskaz:', e)
    res.status(400).json({ error: 'Failed to create wodowskaz' })
  }
})
```

### Frontend (React)

- Use functional components with hooks
- Keep components small (< 200 lines ideally)
- Use descriptive component and function names
- Add comments for complex logic
- Use Tailwind CSS for styling (no inline styles)

Example:

```javascript
function WodowskazyList() {
  const { wodowskazy, loading } = useWodowskazy()

  if (loading) return <div>Loading...</div>

  return (
    <div className='space-y-4'>
      {wodowskazy.map(w => (
        <Card key={w.id}>
          <h3 className='text-lg font-bold'>{w.nazwa}</h3>
        </Card>
      ))}
    </div>
  )
}
```

## 🔐 Security & Best Practices

### Never Commit Secrets

- `.env` files are git-ignored — this is correct
- Never hardcode API keys, passwords, or database URLs
- Use `.env.example` as a template for others

### API Security

- Protected routes use JWT auth (check `auth` middleware)
- Always verify user permissions before deleting/updating data
- Sanitize user input on backend (currently minimal, add validation if needed)

### Frontend Security

- Token stored in localStorage (acceptable for SPAs)
- Never expose backend URL in frontend code unnecessarily
- Use HTTPS in production

## 📊 Database Changes

### Adding a New Column

1. Edit `prisma/schema.prisma`:

   ```prisma
   model Wodowskaz {
     // ... existing fields ...
     newField String? // @unique if needed
   }
   ```

2. Create migration:

   ```bash
   npx prisma migrate dev --name add_newfield_to_wodowskaz
   ```

3. This auto-runs the migration on your local DB

### Reverting a Migration

If you made a mistake before pushing:

```bash
npx prisma migrate resolve --rolled-back "migration_name_here"
```

## 🤝 Collaboration

### Before Pushing Code

1. **Ensure both servers run without errors**:

   - Backend: `npm run dev` (no crashes in terminal)
   - Frontend: `npm run dev` (no console errors in F12)

2. **Test your feature end-to-end**:

   - If you added a data endpoint, test it in the UI
   - If you changed a page, test navigation, forms, etc.

3. **Check for console errors** (F12 → Console tab)

### Committing Changes

```bash
git add .
git commit -m "Brief description of what changed"
git push origin your-branch-name
```

Good commit messages:

- ✅ `Add role-based access check to delete wodowskaz endpoint`
- ✅ `Fix: Zgloszenia list not loading after submit`
- ❌ `fix stuff`
- ❌ `update`

### Pull Requests

1. Push your branch
2. Open a Pull Request on GitHub
3. Describe what you changed and why
4. Wait for review/approval
5. Merge to main

## 🐛 Debugging Tips

### Backend Not Running?

```bash
# Check if port 4000 is in use
netstat -ano | findstr :4000  # Windows
# Kill the process or change PORT in .env
```

### Frontend Blank Page?

- Press F12 to open DevTools
- Check Console tab for errors
- Check Network tab to see if API calls are working
- Verify backend is running on localhost:4000

### API Calls Failing?

- Check Network tab in DevTools
- Look at response body for error message
- Check if JWT token is being sent in Authorization header
- Verify backend route exists and is spelled correctly

### Database Issues?

```bash
# Reset database (warning: deletes all data!)
# In backend/ folder:
npx prisma migrate reset
npx prisma migrate dev --name init
```

## 📚 Useful Commands

```bash
# Backend
npm run dev              # Start with auto-reload
npm start               # Start production mode
npm run prisma:migrate  # Run DB migrations
npm run prisma:generate # Generate Prisma client

# Frontend
npm run dev             # Start Vite dev server
npm run build           # Build for production
npm run lint            # Check code style
npm run preview         # Preview prod build
```

## 🚀 Deployment

- **Backend deployment**: See `backend/README.md` → Deployment section
- **Frontend deployment**: See `frontend/README.md` → Deployment section

Usually:

1. Merge to `main` branch
2. Deploy backend to production (Render, Railway, etc.)
3. Update API URL in frontend if needed
4. Deploy frontend to production (Vercel, Netlify, etc.)

## ❓ Questions?

1. Check the relevant README (`backend/` or `frontend/`)
2. Search GitHub issues
3. Ask in the team chat / create an issue

## 📋 Checklist Before Pushing

- [ ] Both backend and frontend servers run without errors
- [ ] No console errors in browser (F12)
- [ ] Tested the feature manually in the UI
- [ ] Meaningful commit message
- [ ] No secrets/passwords in code
- [ ] Updated `README.md` or docs if needed
- [ ] Ready for code review
