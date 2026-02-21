import { useNavigate } from "react-router-dom"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function Login() {
  const navigate = useNavigate()

  return (
    <AppContainer>
      <h2>Logowanie</h2>

      <input placeholder="Email" style={inputStyle} />
      <input placeholder="Hasło" type="password" style={inputStyle} />

      <MenuButton text="Zaloguj" onClick={() => navigate("/home")} />

      <MenuButton text="Rejestracja" onClick={() => navigate("/register")} />
    </AppContainer>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default Login