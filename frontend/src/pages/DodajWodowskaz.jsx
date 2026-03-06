import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWodowskazy } from "../context/WodowskazyContext"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import Button from "../components/Button"
import Card from "../components/Card"
import Layout from "../components/Layout"
import { useToast } from "../context/ToastContext"
import FloatingInput from "../components/FloatingInput"

function ClickHandler({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)
    }
  })
  return null
}

function DodajWodowskaz() {
  const [nazwa, setNazwa] = useState("")
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  const { dodajWodowskaz } = useWodowskazy()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!nazwa || lat === null || lng === null) {
      addToast("Podaj nazwę i wybierz lokalizację", "error")
      return
    }

    dodajWodowskaz(nazwa, lat, lng)
    addToast("Wodowskaz zapisany poprawnie", "success")
    navigate("/wodowskazy/mapa")
  }

  return (
    <Layout title="Nowy wodowskaz">
      <Card>
        <div className="space-y-6">

          <FloatingInput
            label="Nazwa punktu"
            value={nazwa}
            onChange={e => setNazwa(e.target.value)}
            className="
              w-full px-4 py-3 rounded-lg
              border border-border dark:border-darkborder
              bg-surface dark:bg-darkbg
              text-foreground dark:text-[#B9D6F2]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
          />

          <div className="rounded-lg overflow-hidden border border-border dark:border-darkborder mb-24">
            <MapContainer
              center={[51.1079, 17.0385]}
              zoom={13}
              className="h-[240px] w-full"
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
            <div className="text-sm text-gray-600 dark:text-[#93C1DD]">
              Wybrane współrzędne: {lat.toFixed(5)}, {lng.toFixed(5)}
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <Button variant="primary" onClick={handleSubmit}>
              Zapisz wodowskaz
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

export default DodajWodowskaz