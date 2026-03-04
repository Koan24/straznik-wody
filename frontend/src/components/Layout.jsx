import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { motion } from "framer-motion"

function Layout({ children, title, showHomeButton = true }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg transition-colors duration-300">
      
      <header className="flex justify-between items-center px-8 py-5 border-b border-border dark:border-darkborder">
        
        <div className="flex items-center gap-3">
          <span className="text-xl">🌊</span>
          <h1 className="text-lg font-semibold text-primary dark:text-[#B9D6F2]">
            Strażnik Wody
          </h1>
        </div>

        <div className="flex items-center gap-3">
          
          {showHomeButton && (
            <button
              onClick={() => navigate("/home")}
              className="
                px-4 py-2 rounded-lg 
                border border-primary 
                text-primary 
                hover:bg-primary hover:text-white 
                dark:border-darkprimary 
                dark:text-[#B9D6F2] 
                dark:hover:bg-darkprimary 
                transition
              "
            >
              Strona główna
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="
              px-4 py-2 rounded-lg 
              border border-border 
              dark:border-darkborder 
              bg-surface dark:bg-darksurface
              hover:bg-surfaceAlt 
              dark:hover:bg-darksurfaceAlt 
              transition
            "
          >
            {theme === "light" ? "🌙" : "☀"}
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              px-4 py-2 rounded-lg 
              border border-danger 
              text-danger 
              hover:bg-danger 
              hover:text-white 
              transition-all duration-200
            "
          >
            Wyloguj
          </button>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-[#B9D6F2]">
          {title}
        </h2>
        {children}
      </main>
    </div>
  )
}

export default Layout