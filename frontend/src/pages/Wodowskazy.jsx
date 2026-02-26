import { useNavigate } from "react-router-dom"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"
import Layout from "../components/Layout"

function Wodowskazy() {
  const navigate = useNavigate()

  return (
    <Layout title = "Wodowskazy">
      <AppContainer>
        
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
    </Layout>
  )
}

export default Wodowskazy