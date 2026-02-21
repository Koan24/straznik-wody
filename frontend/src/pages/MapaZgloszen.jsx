import { useNavigate } from "react-router-dom"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function MapaZgloszen() {
  const navigate = useNavigate()

  return (
    <AppContainer>
      <h2>Mapa zgłoszeń</h2>

      <div style={{ height: "200px", background: "#ddd" }}>
        Tu będzie mapa
      </div>

      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

export default MapaZgloszen