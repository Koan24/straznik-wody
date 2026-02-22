import { useNavigate } from "react-router-dom"
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

function WykresPomiarow() {
  const navigate = useNavigate()
  const { pomiary } = useWodowskazy()

  const data = {
    labels: pomiary.map(p => p.data),
    datasets: [
      {
        label: "Poziom wody (cm)",
        data: pomiary.map(p => p.wartosc),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  }

  return (
    <AppContainer>
      <h2>Wykres poziomu wody</h2>

      {pomiary.length === 0 ? (
        <div>Brak danych do wyświetlenia</div>
      ) : (
        <Line data={data} />
      )}

      <MenuButton text="Powrót" onClick={() => navigate(-1)} />
    </AppContainer>
  )
}

export default WykresPomiarow