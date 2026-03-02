import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWodowskazy } from "../context/WodowskazyContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"
import { useToast } from "../context/ToastContext"

function DodajPomiar() {
  const [wartosc, setWartosc] = useState("")
  const [wodowskazId, setWodowskazId] = useState("")
  const {wodowskazy} = useWodowskazy()
  const {addToast} = useToast()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!wodowskazId || !wartosc) {
      addToast("Wybierz wodowskaz i podaj wartość", "error")
      return
    }

    const token = localStorage.getItem("token")
      if (!token) {
        addToast("Brak autoryzacji", "error")
        return
      }

    try {
      const res = await fetch("http://localhost:4000/api/pomiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          wodowskazId: Number(wodowskazId),
          wartosc: Number(wartosc)
        })
      })

      if (!res.ok) throw new Error()

      addToast("Pomiar zapisany poprawnie", "success")
      navigate("/wodowskazy/archiwum")
    } catch (err) {
      addToast("Błąd zapisu pomiaru", "error")
    }
  }

  return (
    <Layout title="Nowy pomiar">

      <Card>
        <div className="space-y-6">

          <select
            value={wodowskazId}
            onChange={(e) => setWodowskazId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900"
          >
            <option value="">Wybierz wodowskaz</option>
            {wodowskazy.map(w => (
              <option key={w.id} value={w.id}>
                {w.nazwa}
              </option>
            ))}
          </select>

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
            <Button
              variant="primary" 
              onClick={handleSubmit}
              disabled={!wodowskazId || !wartosc}
            >
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