import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUzytkownicy } from "../context/UzytkownicyContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

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

    dodajUzytkownika(imie, email, rola)
    navigate("/admin")
  }

  return (
    <AppContainer>
      <h2>Nowy użytkownik</h2>

      <input
        placeholder="Imię"
        value={imie}
        onChange={e => setImie(e.target.value)}
        style={inputStyle}
      />

      <input
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
      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default DodajUzytkownika