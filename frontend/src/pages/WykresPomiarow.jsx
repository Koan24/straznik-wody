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
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

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
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14,165,233,0.2)",
        tension: 0.3
      },
    ],
  }

  return (
    <Layout title="Wykres poziomu wody">

      <Card>

        {pomiary.length === 0 ? (
          <div className="text-gray-600 dark:text-[#93C1DD] dark:text-gray-300">
            Brak danych do wyświetlenia
          </div>
        ) : (
          <Line data={data} />
        )}

        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={() => navigate("/wodowskazy")}
          >
            Powrót
          </Button>
        </div>

      </Card>

    </Layout>
  )
}

export default WykresPomiarow