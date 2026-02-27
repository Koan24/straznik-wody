import { useNavigate } from "react-router-dom"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function ListaZgloszen() {
  const navigate = useNavigate()
  const { zgloszenia, usunZgloszenie } = useZgloszenia()

  return (
    <Layout title="Lista zgłoszeń">

      {zgloszenia.length === 0 && (
        <div className="text-gray-600 dark:text-gray-300">
          Brak zgłoszeń
        </div>
      )}

      <div className="space-y-6">
        {zgloszenia.map(z => (
          <Card key={z.id}>
            <div className="space-y-2 mb-4">
              <div className="font-semibold text-lg">
                {z.tytul}
              </div>
              <div className="text-sm opacity-80">
                {z.lokalizacja}
              </div>
              <div>
                {z.opis}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="danger"
                onClick={() => usunZgloszenie(z.id)}
              >
                Usuń
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate(`/obiekty/edycja/${z.id}`)}
              >
                Edytuj
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button
          variant="secondary"
          onClick={() => navigate("/obiekty")}
        >
          Powrót
        </Button>
      </div>

    </Layout>
  )
}

export default ListaZgloszen