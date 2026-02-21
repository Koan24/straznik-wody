import { useNavigate } from "react-router-dom"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function Home() {
  const navigate = useNavigate()

  return (
    <AppContainer>
      <h2>Strona główna</h2>

      <MenuButton
        text="Obiekty hydrotechniczne"
        onClick={() => navigate("/obiekty")}
      />

      <MenuButton
        text="Wodowskazy"
        onClick={() => navigate("/wodowskazy")}
      />

      <MenuButton
        text="Panel administratora"
        onClick={() => navigate("/admin")}
      />

      <MenuButton
        text="Wyloguj"
        onClick={() => navigate("/")}
      />
    </AppContainer>
  )
}

export default Home