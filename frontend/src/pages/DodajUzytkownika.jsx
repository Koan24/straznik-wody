import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUzytkownicy } from "../context/UzytkownicyContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"
import { useToast } from "../context/ToastContext"

function DodajUzytkownika() {
  const [imie, setImie] = useState("")
  const [email, setEmail] = useState("")
  const [rola, setRola] = useState("user")

  const { dodajUzytkownika } = useUzytkownicy()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!imie || !email) {
      addToast("Wypełnij wszystkie pola", "error")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      addToast("Podaj poprawny adres email (np. nazwa@domena.pl)", "error")
      return
    }

    dodajUzytkownika(imie, email, rola)
    addToast("Użytkownik zapisany poprawnie", "success")
    navigate("/admin")
  }

  return (
    <Layout title="Nowy użytkownik">

      <Card>
        <div className="space-y-5">

          <input
            placeholder="Imię"
            value={imie}
            onChange={e => setImie(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-black dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-black dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <select
            value={rola}
            onChange={e => setRola(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-black dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-4 pt-2">
            <Button variant="primary" onClick={handleSubmit}>
              Zapisz
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/admin")}
            >
              Powrót
            </Button>
          </div>

        </div>
      </Card>

    </Layout>
  )
}

export default DodajUzytkownika