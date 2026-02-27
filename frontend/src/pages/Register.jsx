import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button"
import { useToast } from "../context/ToastContext"

function Register() {
  const navigate = useNavigate()

  const [imie, setImie] = useState("")
  const [nazwisko, setNazwisko] = useState("")
  const [email, setEmail] = useState("")
  const [haslo, setHaslo] = useState("")

  const {addToast} = useToast()

  const handleRegister = () => {
    if (!imie || !nazwisko || !email || !haslo) {
      addToast("Wypełnij wszystkie pola", "error")
      return
    }

    addToast("Zarejestrowano", "success")
    
    navigate("/login")
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
            onChange={(e) => setImie(e.target.value)}
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
            placeholder="Nazwisko"
            value={nazwisko}
            onChange={(e) => setNazwisko(e.target.value)}
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

          <Button variant="primary" onClick={handleRegister}>
            Zarejestruj
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/login")}
          >
            Powrót
          </Button>

        </div>
      </div>
    </div>
  )
}

export default Register