import { useNavigate } from "react-router-dom"
import { useUzytkownicy } from "../context/UzytkownicyContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"
import Layout from "../components/Layout"

function Admin() {
  const navigate = useNavigate()
  const { uzytkownicy, usunUzytkownika } = useUzytkownicy()

  return (
    <Layout title="Panel administratora">
      <AppContainer>
        
        <MenuButton
          text="Dodaj użytkownika"
          onClick={() => navigate("/admin/dodaj")}
        />

        <h4>Lista użytkowników</h4>

        {uzytkownicy.map(u => (
          <div key={u.id} style={cardStyle}>
            <strong>{u.imie}</strong>
            <div>{u.email}</div>
            <div>Rola: {u.rola}</div>

            <button
              style={deleteStyle}
              onClick={() => usunUzytkownika(u.id)}
            >
              Usuń
            </button>
          </div>
        ))}

        <MenuButton text="Powrót" onClick={() => navigate(-1)} />
      
      </AppContainer>
    </Layout>
  )
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px"
}

const deleteStyle = {
  marginTop: "5px",
  backgroundColor: "#d32f2f",
  color: "white",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer"
}

export default Admin