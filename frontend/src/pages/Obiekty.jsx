import { useNavigate } from "react-router-dom"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function Obiekty() {
  const navigate = useNavigate()

  return (
    <AppContainer>
      <h2>Obiekty hydrotechniczne</h2>

      <MenuButton
        text="Zgłoś usterkę"
        onClick={() => navigate("/obiekty/zgloszenie")}
      />

      <MenuButton
        text="Lista zgłoszeń"
        onClick={() => navigate("/obiekty/lista")}
      />

      <MenuButton
        text="Mapa zgłoszeń"
        onClick={() => navigate("/obiekty/mapa")}
      />

      <MenuButton
        text="Generuj raport PDF"
        onClick={() => navigate("/obiekty/raport")}
      />

      <MenuButton
        text="Powrót"
        onClick={() => navigate(-1)}
      />
    </AppContainer>
  )
}

export default Obiekty