import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function Zgloszenie() {
  const navigate = useNavigate()
  const { dodajZgloszenie } = useZgloszenia()

  const [tytul, setTytul] = useState("")
  const [lokalizacja, setLokalizacja] = useState("")
  const [opis, setOpis] = useState("")

  const handleSubmit = () => {
    if (!tytul || !lokalizacja || !opis) {
      alert("Wypełnij wszystkie pola")
      return
    }

    dodajZgloszenie({ tytul, lokalizacja, opis })
    navigate("/obiekty/lista")
  }

  return (
    <AppContainer>
      <h2>Zgłoszenie usterki</h2>

      <input
        placeholder="Tytuł"
        value={tytul}
        onChange={e => setTytul(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Lokalizacja"
        value={lokalizacja}
        onChange={e => setLokalizacja(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="Opis"
        value={opis}
        onChange={e => setOpis(e.target.value)}
        style={inputStyle}
      />

      <MenuButton text="Wyślij zgłoszenie" onClick={handleSubmit} />
      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default Zgloszenie