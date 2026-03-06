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
    },
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

  const handleSubmit = () => {
    if (
      !tytul ||
      !opis ||
      !typObiektu ||
      !rodzajUszkodzenia ||
      !stopien ||
      lat === null ||
      lng === null
    ) {
      addToast("Wypełnij wszystkie pola i kliknij lokalizację na mapie", "error")
      return
    }

    dodajZgloszenie({
      tytul,
      opis,
      typObiektu,
      rodzajUszkodzenia,
      stopien: Number(stopien),
      lat,
      lng,
      data: new Date().toISOString()
    })

    addToast("Pomiar dodany poprawnie", "success")
    navigate("/obiekty/lista")
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
            <option value="pekniecie">Pęknięcie</option>
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