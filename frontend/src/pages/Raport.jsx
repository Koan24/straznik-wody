import { useNavigate } from "react-router-dom"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function Raport() {
  const navigate = useNavigate()

  return (
    <AppContainer>
      <h2>Generowanie raportu PDF</h2>

      <input type="date" style={inputStyle} />
      <input type="date" style={inputStyle} />

      <MenuButton text="Generuj PDF" onClick={() => alert("Generowanie...")} />
      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default Raport