import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button"
import { useToast } from "../context/ToastContext"
import { useAuth } from "../context/AuthContext"
import FloatingInput from "../components/FloatingInput"

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [imie, setImie] = useState("")
  const [email, setEmail] = useState("")
  const [haslo, setHaslo] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { addToast } = useToast()

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

  const inputClass = (error) =>
    `w-full px-4 py-3 rounded-lg border ${
      error
        ? "border-danger"
        : "border-border dark:border-darkborder"
    } bg-surface dark:bg-darkbg text-foreround dark:text-[#B9D6F2] focus:outline-none focus:ring-2 focus:ring-primary transition`

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-darkbg transition-colors duration-300">
      
      <div className="bg-surface dark:bg-darksurface p-10 rounded-2xl shadow-card border border-border dark:border-darkborder w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground dark:text-[#B9D6F2]">
          Rejestracja
        </h2>

        <div className="space-y-5">

          <div>
            <FloatingInput
              label="Imię"
              value={imie}
              onChange={(e) => {
                setImie(e.target.value)
                setErrors(prev => ({ ...prev, imie: null }))
              }}
              className={inputClass(errors.imie)}
            />
            {errors.imie && (
              <p className="text-sm text-danger mt-1">{errors.imie}</p>
            )}
          </div>

          <div>
            <FloatingInput
              type="email"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors(prev => ({ ...prev, email: null }))
              }}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="text-sm text-danger mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <FloatingInput
              type="password"
              label="Hasło"
              value={haslo}
              onChange={(e) => {
                setHaslo(e.target.value)
                setErrors(prev => ({ ...prev, haslo: null }))
              }}
              className={inputClass(errors.haslo)}
            />
            {errors.haslo && (
              <p className="text-sm text-danger mt-1">{errors.haslo}</p>
            )}
          </div>

          <div className="space-y-3 pt-2">

            <Button
              variant="primary"
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3"
            >
              {loading ? "Rejestracja..." : "Zarejestruj"}
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              className="w-full py-3"
            >
              Powrót
            </Button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Register