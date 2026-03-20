import { useNavigate } from "react-router-dom"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function ListaZgloszen() {
  const navigate = useNavigate()
  const { zgloszenia, usunZgloszenie } = useZgloszenia()

  // 🔴 kolor statusu zależny od stopnia
  const getStatusColor = (stopien) => {
    switch (stopien) {
      case 1:
        return "bg-green-500"
      case 2:
        return "bg-yellow-400"
      case 3:
        return "bg-orange-400"
      case 4:
        return "bg-orange-600"
      case 5:
        return "bg-red-600"
      default:
        return "bg-gray-400"
    }
  }

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

              {/* 🔥 Tytuł + status */}
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg text-black dark:text-white">
                  {z.tytul}
                </div>

                {z.stopien && (
                  <span
                    className={`
                      text-xs px-2 py-1 rounded text-white
                      ${getStatusColor(z.stopien)}
                    `}
                  >
                    {z.stopien}
                  </span>
                )}
              </div>

              {/* 📍 współrzędne */}
              {z.lat && z.lng && (
                <div className="text-sm text-gray-600 dark:text-[#93C1DD]">
                  📍 {z.lat.toFixed(5)}, {z.lng.toFixed(5)}
                </div>
              )}

              {/* 📝 opis */}
              <div className="text-gray-800 dark:text-gray-200">
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