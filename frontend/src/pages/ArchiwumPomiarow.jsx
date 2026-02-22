import { useNavigate } from "react-router-dom"
import { useWodowskazy } from "../context/WodowskazyContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

function ArchiwumPomiarow() {
  const navigate = useNavigate()
  const { pomiary, usunPomiar } = useWodowskazy()

  return (
    <AppContainer>
      <h2>Archiwum pomiarów</h2>

      {pomiary.length === 0 && <div>Brak zapisanych pomiarów</div>}

      {pomiary.map(p => (
        <div key={p.id} style={cardStyle}>
          <strong>{p.wartosc} cm</strong>
          <div>{p.data}</div>

          <button
            style={deleteButtonStyle}
            onClick={() => usunPomiar(p.id)}
          >
            Usuń
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

export default ArchiwumPomiarow