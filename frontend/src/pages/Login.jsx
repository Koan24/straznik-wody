import { useNavigate } from "react-router-dom"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function Register() {
  const navigate = useNavigate()

  return (
    <AppContainer>
      <h2>Rejestracja</h2>

      <input placeholder="Imię" style={inputStyle} />
      <input placeholder="Nazwisko" style={inputStyle} />
      <input placeholder="Email" style={inputStyle} />
      <input placeholder="Hasło" type="password" style={inputStyle} />

      <MenuButton text="Zarejestruj" onClick={() => navigate("/login")} />

      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default Register