import { useNavigate } from "react-router-dom"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function Wodowskazy() {
  const navigate = useNavigate()

  return (
    <AppContainer>
      <h2>Wodowskazy</h2>

      <MenuButton
        text="Dodaj wodowskaz"
        onClick={() => navigate("/wodowskazy/dodaj")}
      />

      <MenuButton
        text="Mapa wodowskazów"
        onClick={() => navigate("/wodowskazy/mapa")}
      />

      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

export default Wodowskazy