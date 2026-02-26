import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUzytkownicy } from "../context/UzytkownicyContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"
import Layout from "../components/Layout"

function DodajUzytkownika() {
  const [imie, setImie] = useState("")
  const [email, setEmail] = useState("")
  const [rola, setRola] = useState("user")

  const { dodajUzytkownika } = useUzytkownicy()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!imie || !email) {
      alert("Wypełnij wszystkie pola")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      alert("Podaj poprawny adres email (np. nazwa@domena.pl)")
      return
    }

    dodajUzytkownika(imie, email, rola)
    navigate("/admin")
  }

  return (
    <Layout title="Nowy użytkownik">
      <AppContainer>

        <input
          placeholder="Imię"
          value={imie}
          onChange={e => setImie(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />

        <select
          value={rola}
          onChange={e => setRola(e.target.value)}
          style={inputStyle}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <MenuButton text="Zapisz" onClick={handleSubmit} />
        <MenuButton text="Powrót" onClick={() => navigate("/admin")} />
      </AppContainer>
    </Layout>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default DodajUzytkownika