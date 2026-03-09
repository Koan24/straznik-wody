import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import BottomNav from "./BottomNav"
import FAB from "./FAB"

function Layout({ children, title }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background dark:bg-darkbg transition-colors duration-300">
      
      <header className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-4 py-3 bg-background dark:bg-darkbg border-b border-border dark:border-darkborder">
        
        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="/logo.webp"
            alt="Strażnik Wody"
            className="h-8 w-auto object-contain"
          />
          <h1 className="text-lg font-semibold text-primary dark:text-[#B9D6F2]">
            Strażnik Wody
          </h1>
        </div>

        <div className="flex items-center gap-3">
          
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

      <main className="max-w-md mx-auto px-5 py-6 pb-36">
        <h2 className="text-2xl font-bold mb-8 text-foreground dark:text-[#B9D6F2]">
          {title}
        </h2>
        {children}
      </main>

      <BottomNav />
      <FAB />

    </div>
  )
}

export default Layout