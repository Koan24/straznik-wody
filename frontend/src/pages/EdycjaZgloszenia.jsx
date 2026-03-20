import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import Button from "../components/Button"
import Card from "../components/Card"
import Layout from "../components/Layout"
import { useToast } from "../context/ToastContext"
import FloatingInput from "../components/FloatingInput"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"

function ClickHandler({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)
    },
  })
  return null
}

function EdycjaZgloszenia() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { zgloszenia, aktualizujZgloszenie } = useZgloszenia()
  const { addToast } = useToast()

  const zgloszenie = zgloszenia.find(z => String(z.id) === id)

  const [tytul, setTytul] = useState("")
  const [opis, setOpis] = useState("")
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  useEffect(() => {
    if (zgloszenie) {
      setTytul(zgloszenie.tytul)
      setOpis(zgloszenie.opis)
      setLat(zgloszenie.lat)
      setLng(zgloszenie.lng)
    }
  }, [zgloszenie])

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      addToast("Geolokalizacja nie jest wspierana", "error")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
        addToast("Pobrano lokalizację", "success")
      },
      () => {
        addToast("Nie udało się pobrać lokalizacji", "error")
      }
    )
  }

  const handleSave = () => {
    if (!tytul || !opis || lat === null || lng === null) {
      addToast("Uzupełnij dane i wybierz lokalizację", "error")
      return
    }

    aktualizujZgloszenie(Number(id), {
      tytul,
      opis,
      lat,
      lng
    })

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

  const inputClass = `
    w-full px-4 py-3 rounded-lg
    border border-border dark:border-darkborder
    bg-surface dark:bg-darksurface
    text-black dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-primary
    transition
  `

  return (
    <Layout title="Edycja zgłoszenia">
      <Card>
        <div className="space-y-6">

          <FloatingInput
            value={tytul}
            onChange={e => setTytul(e.target.value)}
            label="Tytuł"
            className={inputClass}
          />

          <textarea
            value={opis}
            onChange={e => setOpis(e.target.value)}
            placeholder="Opis"
            rows={4}
            className={inputClass}
          />

          <Button
            onClick={handleGetLocation}
            className="mb-2"
          >
            Pobierz moją lokalizację
          </Button>

          <div className="text-sm text-gray-600 dark:text-[#93C1DD]">
            Kliknij na mapie, aby zmienić lokalizację:
          </div>

          <div className="relative rounded-xl overflow-hidden border border-border dark:border-darkborder">
            <MapContainer
              center={lat && lng ? [lat, lng] : [51.1079, 17.0385]}
              zoom={13}
              className="h-[200px] w-full"
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
              {lat.toFixed(5)}, {lng.toFixed(5)}
            </div>
          )}

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