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
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"
import { useToast } from "../context/ToastContext"

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

  const {addToast} = useToast()

  if (!wodowskaz) {
    return (
      <Layout title="Błąd">
        <Card>
          <div className="text-gray-600 dark:text-gray-300">
            Nie znaleziono wodowskazu
          </div>
        </Card>
      </Layout>
    )
  }

  const handleAdd = () => {
    if (!wartosc) {
      addToast("Podaj wartość", "error")
      return
    }

    dodajPomiar(wodowskaz.id, wartosc)
    addToast("Pomiar dodany poprawnie", "success")
    setWartosc("")
  }

  const data = {
    labels: wodowskaz.pomiary.map(p => p.data),
    datasets: [
      {
        label: "Poziom wody (cm)",
        data: wodowskaz.pomiary.map(p => p.wartosc),
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14,165,233,0.2)",
        tension: 0.3
      },
    ],
  }

  return (
    <Layout title={wodowskaz.nazwa}>

      <div className="space-y-8">

        {/* Sekcja dodawania pomiaru */}
        <Card>
          <div className="space-y-4">

            <div className="font-semibold">
              Dodaj pomiar
            </div>

            <input
              type="number"
              placeholder="Poziom wody (cm)"
              value={wartosc}
              onChange={(e) => setWartosc(e.target.value)}
              className="
                w-full px-4 py-3 rounded-lg
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-slate-900
                text-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-primary
                transition
              "
            />

            <Button variant="primary" onClick={handleAdd}>
              Dodaj pomiar
            </Button>

          </div>
        </Card>

        {/* Sekcja wykresu */}
        <Card>
          <div className="space-y-4">

            <div className="font-semibold">
              Wykres poziomu wody
            </div>

            {wodowskaz.pomiary.length === 0 ? (
              <div className="text-gray-600 dark:text-gray-300">
                Brak pomiarów
              </div>
            ) : (
              <Line data={data} />
            )}

          </div>
        </Card>

        <Button
          variant="secondary"
          onClick={() => navigate("/wodowskazy/mapa")}
        >
          Powrót
        </Button>

      </div>

    </Layout>
  )
}

export default SzczegolyWodowskazu