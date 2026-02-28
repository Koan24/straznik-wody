import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button"
import { useToast } from "../context/ToastContext"
import { useAuth } from "../context/AuthContext"

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [imie, setImie] = useState("")
  const [email, setEmail] = useState("")
  const [haslo, setHaslo] = useState("")
  const [loading, setLoading] = useState(false)

  const {addToast} = useToast()

  const [errors, setErrors] = useState({})

  const handleRegister = async () => {
    const newErrors = {}

    if (!imie.trim()) newErrors.imie = "Podaj imię"

    if (!email.trim()) {
      newErrors.email = "Podaj email"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        newErrors.email = "Niepoprawny format email"
      }
    }

    if (!haslo.trim()) {
      newErrors.haslo = "Podaj hasło"
    } else if (haslo.length < 6) {
      newErrors.haslo = "Hasło musi mieć min. 6 znaków"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      addToast("Popraw błędy w formularzu", "error")
      return
    }

    setLoading(true)
    try {
      await register(imie, email, haslo)
      addToast("Rejestracja zakończona sukcesem", "success")
      navigate("/")
    } catch (e) {
      addToast(e.message || "Błąd rejestracji", "error")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-darkbg transition-colors duration-300">
      
      <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-card border border-gray-200 dark:border-gray-700 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Rejestracja
        </h2>

        <div className="space-y-5">

          <input
            placeholder="Imię"
            value={imie}
            onChange={(e) => {
              setImie(e.target.value)
              setErrors(prev => ({ ...prev, imie: null }))
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.imie
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition`}
          />
          {errors.imie && (
            <p className="text-sm text-red-500 mt-1">{errors.imie}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors(prev => ({ ...prev, email: null }))
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}

          <input
            placeholder="Hasło"
            type="password"
            value={haslo}
            onChange={(e) => {
              setHaslo(e.target.value)
              setErrors(prev => ({ ...prev, haslo: null }))
            }}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.haslo
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition`}
          />
          {errors.haslo && (
            <p className="text-sm text-red-500 mt-1">{errors.haslo}</p>
          )}

          <Button variant="primary" onClick={handleRegister} disabled={loading}>
            {loading ? "Rejestracja..." : "Zarejestruj"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/")}
          >
            Powrót
          </Button>

        </div>
      </div>
    </div>
  )
}

export default Register