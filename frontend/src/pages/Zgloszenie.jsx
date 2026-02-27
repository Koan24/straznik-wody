import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"
import { useToast } from "../context/ToastContext"

function ClickHandler({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)
    },
  })
  return null
}

function Zgloszenie() {
  const navigate = useNavigate()
  const { dodajZgloszenie } = useZgloszenia()

  const [tytul, setTytul] = useState("")
  const [opis, setOpis] = useState("")
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  const {addToast} = useToast()

  const handleSubmit = () => {
    if (!tytul || !opis || lat === null || lng === null) {
      addToast("Wypełnij wszystkie pola i kliknij lokalizację na mapie", "error")
      return
    }

    dodajZgloszenie({ tytul, opis, lat, lng })
    addToast("Pomiar dodany poprawnie", "success")
    navigate("/obiekty/lista")
  }

  return (
    <Layout title="Zgłoszenie usterki">

      <Card>
        <div className="space-y-6">

          <input
            placeholder="Tytuł"
            value={tytul}
            onChange={(e) => setTytul(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <textarea
            placeholder="Opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            rows={4}
            className="
              w-full px-4 py-3 rounded-lg
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <div className="text-sm text-gray-600 dark:text-gray-300">
            Wybierz lokalizację na mapie:
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
            <MapContainer
              center={[51.1079, 17.0385]}
              zoom={13}
              className="h-[300px] w-full"
            >
              <TileLayer
                attribution="© OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ClickHandler setLat={setLat} setLng={setLng} />
              {lat && lng && <Marker position={[lat, lng]} />}
            </MapContainer>
          </div>

          {lat && lng && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Wybrane współrzędne: {lat.toFixed(5)}, {lng.toFixed(5)}
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <Button variant="primary" onClick={handleSubmit}>
              Wyślij zgłoszenie
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/obiekty")}
            >
              Powrót
            </Button>
          </div>

        </div>
      </Card>

    </Layout>
  )
}

export default Zgloszenie