import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button"
import { useToast } from "../context/ToastContext"
import { useAuth } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [haslo, setHaslo] = useState("")
  const [loading, setLoading] = useState(false)

  const {addToast} = useToast()

  const handleLogin = async () => {
    if (!email || !haslo) {
      addToast("Wypełnij wszystkie pola", "error")
      return
    }

    setLoading(true)
    try {
      await login(email, haslo)
      addToast("Zalogowano pomyślnie", "success")
      navigate("/home")
    } catch (e) {
      addToast(e.message || "Błąd logowania", "error")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-darkbg transition-colors duration-300">
      
      <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-card border border-gray-200 dark:border-gray-700 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Logowanie
        </h2>

        <div className="space-y-5">

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <input
            placeholder="Hasło"
            type="password"
            value={haslo}
            onChange={(e) => setHaslo(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <Button variant="primary" onClick={handleLogin} disabled={loading}>
            {loading ? "Logowanie..." : "Zaloguj"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/register")}
          >
            Rejestracja
          </Button>

        </div>
      </div>
    </div>
  )
}

export default Login