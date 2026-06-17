import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"
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

function Zgloszenie() {
  const navigate = useNavigate()
  const { dodajZgloszenie } = useZgloszenia()
  const { addToast } = useToast()

  const [tytul, setTytul] = useState("")
  const [opis, setOpis] = useState("")
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [typObiektu, setTypObiektu] = useState("")
  const [rodzajUszkodzenia, setRodzajUszkodzenia] = useState("")
  const [stopien, setStopien] = useState("")
  const [zdjecie, setZdjecie] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      addToast("Geolokalizacja nie jest wspierana", "error")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLat = position.coords.latitude
        const newLng = position.coords.longitude

        setLat(newLat)
        setLng(newLng)

        addToast("Pobrano lokalizację", "success")
      },
      () => {
        addToast("Nie udało się pobrać lokalizacji", "error")
      }
    )
  }

  const handleSubmit = async () => {
    if (
      !tytul ||
      !opis ||
      !typObiektu ||
      !rodzajUszkodzenia ||
      !stopien ||
      lat === null ||
      lng === null
    ) {
      addToast("Wypełnij wszystkie pola i wybierz lokalizację", "error")
      return
    }

    if (!zdjecie) {
      addToast("Dodanie zgłoszenia bez zdjęcia nie jest możliwe", "error")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()

      formData.append("tytul", tytul)
      formData.append("opis", opis)
      formData.append("typObiektu", typObiektu)
      formData.append("rodzajUszkodzenia", rodzajUszkodzenia)
      formData.append("stopien", stopien)
      formData.append("lat", lat)
      formData.append("lng", lng)
      formData.append("zdjecie", zdjecie)

      await dodajZgloszenie(formData)

      addToast("Zgłoszenie dodane poprawnie", "success")
      navigate("/obiekty/lista")
    } catch (e) {
      addToast(e.message || "Nie udało się dodać zgłoszenia", "error")
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `
    w-full px-4 py-3 rounded-lg
    border border-border dark:border-darkborder
    bg-surface dark:bg-darkbg
    text-foreground dark:text-[#B9D6F2]
    focus:outline-none focus:ring-2 focus:ring-primary
    transition
  `

  return (
    <Layout title="Zgłoszenie usterki">
      <Card>
        <div className="space-y-6">
          <FloatingInput
            label="Tytuł"
            value={tytul}
            onChange={(e) => setTytul(e.target.value)}
            className={inputClass}
          />

          <select
            value={typObiektu}
            onChange={(e) => setTypObiektu(e.target.value)}
            className={inputClass}
          >
            <option value="">Typ obiektu</option>
            <option value="most">Most</option>
            <option value="jaz">Jaz</option>
            <option value="wal">Wał przeciwpowodziowy</option>
            <option value="przepompownia">Przepompownia</option>
          </select>

          <select
            value={rodzajUszkodzenia}
            onChange={(e) => setRodzajUszkodzenia(e.target.value)}
            className={inputClass}
          >
            <option value="">Rodzaj uszkodzenia</option>
            <option value="pekniecie">Pękniecie</option>
            <option value="korozja">Korozja</option>
            <option value="zalanie">Zalanie</option>
            <option value="mechaniczne">Uszkodzenia mechaniczne</option>
          </select>

          <select
            value={stopien}
            onChange={(e) => setStopien(e.target.value)}
            className={inputClass}
          >
            <option value="">Stopień zagrożenia</option>
            <option value="1">1 - Niski</option>
            <option value="2">2</option>
            <option value="3">3 - Średni</option>
            <option value="4">4</option>
            <option value="5">5 - Krytyczny</option>
          </select>

          <textarea
            placeholder="Opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            rows={4}
            className={inputClass}
          />

          <div className="space-y-2">
            <label className="text-sm opacity-80 dark:text-gray-300">
              Zdjęcie zgłoszenia
            </label>

            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setZdjecie(e.target.files?.[0] || null)}
                />

                <span className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition">
                  Wybierz zdjęcie
                </span>
              </label>

              <span className="text-sm opacity-70 dark:text-gray-300">
                {zdjecie ? zdjecie.name : "Nie wybrano pliku"}
              </span>
            </div>
          </div>

          <Button
            onClick={handleGetLocation}
            className="mb-3 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Pobierz moją lokalizację
          </Button>

          <div className="text-sm text-gray-600 dark:text-[#93C1DD]">
            Wybierz lokalizację na mapie:
          </div>

          <div className="relative rounded-xl overflow-hidden border border-border dark:border-darkborder mb-40">
            <MapContainer
              center={[51.1079, 17.0385]}
              zoom={13}
              className="h-[200px] w-full"
              style={{ zIndex: 0 }}
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
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Wysyłanie..." : "Wyślij zgłoszenie"}
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/obiekty")}
            >
              Powrot
            </Button>
          </div>
        </div>
      </Card>
    </Layout>
  )
}

export default Zgloszenie