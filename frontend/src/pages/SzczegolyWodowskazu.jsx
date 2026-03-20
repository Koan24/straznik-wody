import { useParams, useNavigate } from "react-router-dom"
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

function SzczegolyWodowskazu() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { wodowskazy } = useWodowskazy()

  const wodowskaz = wodowskazy.find(w => String(w.id) === id)

  if (!wodowskaz) {
    return (
      <Layout title="Błąd">
        <Card>
          <div className="text-red-400">
            Nie znaleziono wodowskazu
          </div>
        </Card>
      </Layout>
    )
  }

  const pomiary = wodowskaz.pomiary || []

  const data = {
    labels: pomiary.map(p =>
      new Date(p.createdAt).toLocaleString()
    ),
    datasets: [
      {
        label: "Poziom wody (cm)",
        data: pomiary.map(p => p.wartosc),
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14,165,233,0.2)",
        tension: 0.3
      }
    ]
  }

  return (
    <Layout title={wodowskaz.nazwa}>
      <div className="space-y-8">

        {/* info */}
        <Card>
          <div className="space-y-2 text-center">

            <div className="text-lg font-semibold text-black dark:text-white">
              {wodowskaz.nazwa}
            </div>

            {wodowskaz.lat && wodowskaz.lng && (
              <div className="text-sm text-gray-600 dark:text-[#93C1DD]">
                📍 {wodowskaz.lat.toFixed(5)}, {wodowskaz.lng.toFixed(5)}
              </div>
            )}

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Liczba pomiarów: {pomiary.length}
            </div>

          </div>
        </Card>

        {/* wykres */}
        <Card>
          <div className="space-y-4">

            <div className="font-semibold text-black dark:text-white text-center">
              Wykres poziomu wody
            </div>

            {pomiary.length === 0 ? (
              <div className="text-gray-600 dark:text-[#93C1DD] text-center">
                Brak pomiarów
              </div>
            ) : (
              <Line data={data} />
            )}

          </div>
        </Card>

        {/* przyciski */}
        <div className="flex flex-col gap-4">

          <Button
            variant="primary"
            onClick={() => navigate(`/wodowskazy/${wodowskaz.id}/pomiar`)}
            className="w-full py-3 text-base"
          >
            Dodaj pomiar
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/wodowskazy")}
            className="w-full py-3 text-base"
          >
            Menu wodowskazów
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/wodowskazy/mapa")}
            className="w-full py-3 text-base"
          >
            Mapa wodowskazów
          </Button>

        </div>

      </div>
    </Layout>
  )
}

export default SzczegolyWodowskazu