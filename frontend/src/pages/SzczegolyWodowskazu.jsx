import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useWodowskazy } from "../context/WodowskazyContext"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function SzczegolyWodowskazu() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { wodowskazy, dodajPomiar } = useWodowskazy()

  const wodowskaz = wodowskazy.find(w => String(w.id) === id)

  const [wartosc, setWartosc] = useState("")

  if (!wodowskaz) {
    return <div>Nie znaleziono wodowskazu</div>
  }

  const handleAdd = () => {
    if (!wartosc) {
      alert("Podaj wartość")
      return
    }

    dodajPomiar(wodowskaz.id, wartosc)
    setWartosc("")
  }

  const data = {
    labels: wodowskaz.pomiary.map(p => p.data),
    datasets: [
      {
        label: "Poziom wody (cm)",
        data: wodowskaz.pomiary.map(p => p.wartosc),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  }

  return (
    <AppContainer>
      <h2>{wodowskaz.nazwa}</h2>

      <h4>Dodaj pomiar</h4>

      <input
        type="number"
        placeholder="Poziom wody (cm)"
        value={wartosc}
        onChange={e => setWartosc(e.target.value)}
        style={inputStyle}
      />

      <MenuButton text="Dodaj pomiar" onClick={handleAdd} />

      <h4>Wykres</h4>

      {wodowskaz.pomiary.length === 0 ? (
        <div>Brak pomiarów</div>
      ) : (
        <Line data={data} />
      )}

      <MenuButton text="Powrót" onClick={() => navigate("/wodowskazy/mapa")} />
    </AppContainer>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default SzczegolyWodowskazu