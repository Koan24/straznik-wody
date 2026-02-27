import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWodowskazy } from "../context/WodowskazyContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function DodajPomiar() {
  const [wartosc, setWartosc] = useState("")
  const { dodajPomiar } = useWodowskazy()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!wartosc) {
      alert("Podaj wartość pomiaru")
      return
    }

    dodajPomiar(wartosc)
    navigate("/wodowskazy/archiwum")
  }

  return (
    <Layout title="Nowy pomiar">

      <Card>
        <div className="space-y-6">

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

          <div className="flex gap-4">
            <Button variant="primary" onClick={handleSubmit}>
              Zapisz pomiar
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/wodowskazy")}
            >
              Powrót
            </Button>
          </div>

        </div>
      </Card>

    </Layout>
  )
}

export default DodajPomiar