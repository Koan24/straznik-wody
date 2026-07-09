import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button"
import { useToast } from "../context/ToastContext"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import FloatingInput from "../components/FloatingInput"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  const [email, setEmail] = useState("")
  const [haslo, setHaslo] = useState("")
  const [loading, setLoading] = useState(false)

  const { addToast } = useToast()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !haslo) {
      addToast("Wypelnij wszystkie pola", "error")
      return
    }

    setLoading(true)
    try {
      await login(email, haslo)
      addToast("Zalogowano pomyslnie", "success")
      navigate("/home")
    } catch (e) {
      addToast(e.message || "Blad logowania", "error")
    }
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background dark:bg-darkbg transition-colors duration-300 px-4">
      <button
        type="button"
        onClick={toggleTheme}
        className="
          absolute right-4 top-4
          flex h-10 w-14 items-center justify-center
          rounded-xl border border-primary/30
          bg-surface dark:bg-darksurface
          text-lg shadow-sm
          transition hover:bg-primary/10
          dark:border-primary/40 dark:text-[#B9D6F2]
        "
        aria-label="Zmien tryb kolorystyczny"
      >
        {isDark ? "🌙" : "☀️"}
      </button>

      <div className="bg-surface dark:bg-darksurface p-10 rounded-2xl shadow-card border border-border dark:border-darkborder w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground dark:text-[#B9D6F2]">
          Logowanie
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <FloatingInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-foreground dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <FloatingInput
            label="Haslo"
            type="password"
            value={haslo}
            onChange={(e) => setHaslo(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-foreground dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-full py-3"
          >
            {loading ? "Logowanie..." : "Zaloguj"}
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/register")}
            className="w-full py-3"
          >
            Rejestracja
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login