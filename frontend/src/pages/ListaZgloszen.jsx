import { useNavigate } from "react-router-dom"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function ListaZgloszen() {
  const navigate = useNavigate()
  const { zgloszenia, usunZgloszenie } = useZgloszenia()

  return (
    <AppContainer>
      <h2>Lista zgłoszeń</h2>

      {zgloszenia.length === 0 && <div>Brak zgłoszeń</div>}

      {zgloszenia.map(z => (
        <div key={z.id} style={cardStyle}>
          <strong>{z.tytul}</strong>
          <div>{z.lokalizacja}</div>
          <div>{z.opis}</div>

          <button
            style={deleteButtonStyle}
            onClick={() => usunZgloszenie(z.id)}
          >
            Usuń
          </button>

          <button
          style={editButtonStyle}
          onClick={() => navigate(`/obiekty/edycja/${z.id}`)}
          >
            Edytuj
          </button>
        </div>
      ))}

      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px"
}

const deleteButtonStyle = {
  marginTop: "8px",
  backgroundColor: "#d32f2f",
  color: "white",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer"
}

const editButtonStyle = {
  marginTop: "5px",
  marginLeft: "5px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer"
}

export default ListaZgloszen