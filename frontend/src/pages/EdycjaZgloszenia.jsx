import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import Button from "../components/Button"
import Card from "../components/Card"
import Layout from "../components/Layout"
import { useToast } from "../context/ToastContext"

function EdycjaZgloszenia() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { zgloszenia, aktualizujZgloszenie } = useZgloszenia()
  const { addToast } = useToast()

  const zgloszenie = zgloszenia.find(z => String(z.id) === id)

  const [tytul, setTytul] = useState("")
  const [lokalizacja, setLokalizacja] = useState("")
  const [opis, setOpis] = useState("")

  useEffect(() => {
    if (zgloszenie) {
      setTytul(zgloszenie.tytul)
      setLokalizacja(zgloszenie.lokalizacja)
      setOpis(zgloszenie.opis)
    }
  }, [zgloszenie])

  const handleSave = () => {
    if (!tytul || !lokalizacja || !opis) {
      addToast("Wypełnij wszystkie pola", "error")
      return
    }

    aktualizujZgloszenie(Number(id), { tytul, lokalizacja, opis })
    addToast("Zgłoszenie zaktualizowane", "success")
    navigate("/obiekty/lista")
  }

  if (!zgloszenie) {
    return (
      <Layout title="Błąd">
        <div className="text-danger">
          Nie znaleziono zgłoszenia
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Edycja zgłoszenia">
      <Card>
        <div className="space-y-6">

          <input
            value={tytul}
            onChange={e => setTytul(e.target.value)}
            placeholder="Tytuł"
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-black dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <input
            value={lokalizacja}
            onChange={e => setLokalizacja(e.target.value)}
            placeholder="Lokalizacja"
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-black dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <textarea
            value={opis}
            onChange={e => setOpis(e.target.value)}
            placeholder="Opis"
            rows={4}
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-black dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <div className="flex gap-4 pt-2">
            <Button variant="primary" onClick={handleSave}>
              Zapisz zmiany
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/obiekty/lista")}
            >
              Powrót
            </Button>
          </div>

        </div>
      </Card>
    </Layout>
  )
}

export default EdycjaZgloszenia