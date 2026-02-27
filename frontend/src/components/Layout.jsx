import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import {motion} from "framer-motion"

function Layout({ children, title, showHomeButton = true }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg transition-colors duration-300">
      
      <header className="flex justify-between items-center px-8 py-5 border-b border-gray-200 dark:border-gray-700">
        
        <div className="flex items-center gap-3">
          <span className="text-xl">🌊</span>
          <h1 className="text-lg font-semibold text-primary dark:text-water">
            Strażnik Wody
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {showHomeButton && (
            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition"
            >
              Strona główna
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? "🌙" : "☀"}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
        {children}
      </main>
    </div>
  )
}

export default Layout