import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWodowskazy } from "../context/WodowskazyContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function DodajPomiar() {
  const [wartosc, setWartosc] = useState("")
  const { dodajPomiar } = useWodowskazy()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!wartosc) {
      alert("Podaj wartość pomiaru")
      return
    }

    dodajPomiar(wartosc)
    navigate("/wodowskazy/archiwum")
  }

  return (
    <AppContainer>
      <h2>Nowy pomiar</h2>

      <input
        type="number"
        placeholder="Poziom wody (cm)"
        value={wartosc}
        onChange={e => setWartosc(e.target.value)}
        style={inputStyle}
      />

      <MenuButton text="Zapisz pomiar" onClick={handleSubmit} />
      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default DodajPomiar