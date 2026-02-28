# Frontend — Strażnik Wody

React + Vite web application for water quality monitoring and fault reporting. Communicates with the Express backend API.

## 📦 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS + PostCSS
- **Maps**: Leaflet + react-leaflet
- **Charts**: Chart.js + react-chartjs-2
- **PDF Export**: jsPDF
- **Animations**: Framer Motion
- **Routing**: React Router DOM 7
- **HTTP**: Fetch API (no external HTTP library)

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Backend running on `http://localhost:4000` (see `/backend/README.md`)

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Optimized files in `dist/` ready to deploy.

## 📂 Project Structure

```
frontend/
├── src/
│   ├── pages/              # Page components (full pages, routed)
│   │   ├── Login.jsx       # Login page with auth
│   │   ├── Register.jsx    # Registration page
│   │   ├── Home.jsx        # Dashboard
│   │   ├── Wodowskazy.jsx  # Water gauge list
│   │   ├── DodajWodowskaz.jsx # Add water gauge
│   │   ├── MapaWodowskazow.jsx # Map view of gauges
│   │   ├── Zgloszenie.jsx  # Create fault report
│   │   ├── ListaZgloszen.jsx # List fault reports
│   │   ├── MapaZgloszen.jsx # Map view of reports
│   │   └── ...
│   ├── services/           # API client functions
│   │   ├── uzytkownicyService.js   # User API calls
│   │   ├── wodowskazyService.js    # Water gauge API calls
│   │   └── zgloszeniaService.js    # Fault report API calls
│   ├── context/            # React Context (state management)
│   │   ├── AuthContext.jsx      # Authentication state
│   │   ├── ThemeContext.jsx     # Dark/light theme
│   │   ├── ToastContext.jsx     # Toast notifications
│   │   ├── UzytkownicyContext.jsx # Users list
│   │   ├── WodowskazyContext.jsx  # Water gauges list
│   │   └── ZgloszeniaContext.jsx  # Fault reports list
│   ├── components/         # Reusable UI components
│   │   ├── Layout.jsx      # Main layout wrapper
│   │   ├── Button.jsx      # Button component
│   │   ├── Card.jsx        # Card wrapper
│   │   └── ...
│   ├── App.jsx             # Root component with routes
│   ├── main.jsx            # Vite entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── eslint.config.js        # ESLint rules
├── package.json            # Dependencies & scripts
├── package-lock.json       # Locked versions
└── README.md               # This file
```

## 🛠 Available Scripts

```bash
npm run dev      # Start dev server with HMR (hot reload)
npm run build    # Build for production (creates dist/)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint checks
```

## 🔐 Authentication

### Login Flow

1. User fills email + password on `/` page
2. Clicks "Zaloguj" → sends POST to `/api/login`
3. Backend returns JWT token
4. Token stored in `localStorage` as `token`
5. User redirected to `/home`
6. All subsequent API calls include token in `Authorization: Bearer <token>` header

### Protected Routes

Most pages require authentication (they check if `token` exists in localStorage). Protected API calls automatically include the JWT token via the `getAuthHeader()` helper in service files.

### Logout

Token is removed from localStorage. User redirected to login page.

## 📡 API Communication

### Services Architecture

Services in `src/services/` are functions that call the backend API:

```javascript
// Example: src/services/wodowskazyService.js

const API_URL = 'http://localhost:4000'

function getAuthHeader() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getWodowskazy() {
  const res = await fetch(`${API_URL}/api/wodowskazy`)
  return res.ok ? res.json() : []
}

export async function createWodowskaz(data) {
  const res = await fetch(`${API_URL}/api/wodowskazy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  })
  return res.ok ? res.json() : null
}
```

### Using Services in Components

```javascript
import { useWodowskazy } from '../context/WodowskazyContext'

function MyComponent() {
  const { wodowskazy, dodajWodowskaz } = useWodowskazy()

  const handleAdd = async (name, lat, lng) => {
    await dodajWodowskaz(name, lat, lng)
  }

  return (
    <div>
      {wodowskazy.map(w => (
        <div key={w.id}>{w.nazwa}</div>
      ))}
    </div>
  )
}
```

## 🎨 Styling

### Tailwind CSS

All components use Tailwind utility classes for styling. Common patterns:

```jsx
<div className='bg-white dark:bg-slate-800 p-10 rounded-lg shadow-lg'>
  <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>Title</h1>
</div>
```

### Dark Mode

Implemented via `ThemeContext`. Toggle with `useTheme()`:

```javascript
const { theme, toggleTheme } = useTheme()
```

## 🗺 Maps

Uses Leaflet with `react-leaflet` for interactive maps:

```jsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

;<MapContainer center={[51.1, 17.0]} zoom={13}>
  <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
  <Marker position={[51.1, 17.0]} />
</MapContainer>
```

## 📊 Charts

Uses `react-chartjs-2` and `chart.js` for data visualization:

```jsx
import { Line } from 'react-chartjs-2'

;<Line data={chartData} options={chartOptions} />
```

## 📤 Routing

All routes defined in `App.jsx` using `react-router-dom`:

```javascript
<Routes>
  <Route path='/' element={<Login />} />
  <Route path='/home' element={<Home />} />
  <Route path='/wodowskazy' element={<Wodowskazy />} />
  {/* ... more routes ... */}
</Routes>
```

### Key Routes

- `/` — Login page
- `/register` — Registration page
- `/home` — Dashboard
- `/wodowskazy` — Water gauge list
- `/wodowskazy/dodaj` — Add water gauge
- `/wodowskazy/mapa` — Map of gauges
- `/obiekty/zgloszenie` — Create fault report
- `/obiekty/lista` — List fault reports
- `/obiekty/mapa` — Map of reports
- `/admin` — Admin panel

## 🧪 Testing

### Manual Testing

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open `http://localhost:5173`
4. Register a test account
5. Create test data (wodowskazy, zgloszenia)
6. Navigate through pages, verify maps display, reports save

### Browser DevTools

- **Network tab**: Check API calls to `/api/*`
- **Application tab**: Verify JWT token in localStorage
- **Console**: Check for errors, use `console.log()` for debugging

## ⚙️ Configuration

### API Base URL

To change backend URL, edit `API_URL` in service files:

```javascript
// frontend/src/services/podowskazyService.js
const API_URL = 'http://localhost:4000' // Change this
```

Or use `.env`:

```bash
VITE_API_URL=http://your-backend-url
```

Then update service files:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
```

## 🚀 Deployment

### Build & Deploy to Vercel

```bash
# Build
npm run build

# Deploy (Vercel CLI)
vercel
```

### Build & Deploy to Netlify

```bash
# Build
npm run build

# Deploy (Netlify CLI)
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

```bash
npm run build
# Copy dist/ contents to gh-pages branch
```

### Important: Update Backend URL

Before deploying, update `API_URL` in all service files to point to your production backend:

```javascript
// Example: Change from localhost:4000 to production URL
const API_URL = 'https://api.example.com'
```

## 🐛 Troubleshooting

| Issue                 | Solution                                                          |
| --------------------- | ----------------------------------------------------------------- |
| Blank page on load    | Check browser console (F12) for errors, verify backend is running |
| "Failed to fetch"     | Backend not running or at wrong URL. Check `API_URL` in services  |
| Login not working     | Verify backend `/api/login` route works, check credentials        |
| Dark mode not working | Check `ThemeProvider` is wrapped in `App.jsx`                     |
| Maps not showing      | Check Leaflet CSS is imported, verify coordinates are valid       |

## 📚 Resources

- [React Docs](https://react.dev/)
- [Vite Docs](https://vite.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React Router Docs](https://reactrouter.com/)
- [Leaflet Docs](https://leafletjs.com/)
- [Chart.js Docs](https://www.chartjs.org/)
