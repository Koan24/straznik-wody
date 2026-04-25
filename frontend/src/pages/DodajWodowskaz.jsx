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

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm opacity-80 dark:text-gray-300">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-4 py-3 rounded-lg bg-surface dark:bg-darkbg text-foreground dark:text-white border border-border dark:border-darkborder focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Wybierz</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function DodajWodowskaz() {
  const [nazwa, setNazwa] = useState("")
  const [numerId, setNumerId] = useState("")
  const [typPunktu, setTypPunktu] = useState("")
  const [stanTechniczny, setStanTechniczny] = useState("")
  const [dostepnosc, setDostepnosc] = useState("")
  const [ciekLubZbiornik, setCiekLubZbiornik] = useState("")
  const [dataInstalacji, setDataInstalacji] = useState("")
  const [rzednaZero, setRzednaZero] = useState("")
  const [opis, setOpis] = useState("")
  const [zdjecieReferencyjne, setZdjecieReferencyjne] = useState(null)

  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(false)

  const { dodajWodowskaz } = useWodowskazy()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!nazwa.trim()) {
      addToast("Podaj nazwe punktu", "error")
      return
    }

    if (lat === null || lng === null) {
      addToast("Wybierz lokalizacje na mapie", "error")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()

      formData.append("nazwa", nazwa)
      formData.append("lat", lat)
      formData.append("lng", lng)
      formData.append("numerId", numerId)
      formData.append("typPunktu", typPunktu)
      formData.append("stanTechniczny", stanTechniczny)
      formData.append("dostepnosc", dostepnosc)
      formData.append("ciekLubZbiornik", ciekLubZbiornik)
      formData.append("dataInstalacji", dataInstalacji)
      formData.append("rzednaZero", rzednaZero)
      formData.append("opis", opis)

      if (zdjecieReferencyjne) {
        formData.append("zdjecieReferencyjne", zdjecieReferencyjne)
      }

      await dodajWodowskaz(formData)

      addToast("Wodowskaz zapisany poprawnie", "success")
      navigate("/wodowskazy/mapa")
    } catch (e) {
      addToast(e.message || "Nie udalo sie zapisac wodowskazu", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Nowy wodowskaz">
      <Card>
        <div className="space-y-6">
          <FloatingInput
            label="Nazwa punktu"
            value={nazwa}
            onChange={(e) => setNazwa(e.target.value)}
          />

          <FloatingInput
            label="Numer identyfikacyjny"
            value={numerId}
            onChange={(e) => setNumerId(e.target.value)}
          />

          <FloatingInput
            label="Ciek lub zbiornik"
            value={ciekLubZbiornik}
            onChange={(e) => setCiekLubZbiornik(e.target.value)}
          />

          <SelectField
            label="Typ punktu"
            value={typPunktu}
            onChange={(e) => setTypPunktu(e.target.value)}
            options={[
              { value: "wodowskaz", label: "Wodowskaz" },
              { value: "lata", label: "Lata pomiarowa" },
              { value: "punkt_obserwacyjny", label: "Punkt obserwacyjny" },
              { value: "inny", label: "Inny" }
            ]}
          />

          <SelectField
            label="Stan techniczny"
            value={stanTechniczny}
            onChange={(e) => setStanTechniczny(e.target.value)}
            options={[
              { value: "dobry", label: "Dobry" },
              { value: "sredni", label: "Sredni" },
              { value: "zly", label: "Zly" },
              { value: "wymaga_kontroli", label: "Wymaga kontroli" }
            ]}
          />

          <SelectField
            label="Dostepnosc punktu"
            value={dostepnosc}
            onChange={(e) => setDostepnosc(e.target.value)}
            options={[
              { value: "latwa", label: "Latwa" },
              { value: "utrudniona", label: "Utrudniona" },
              { value: "trudna", label: "Trudna" }
            ]}
          />

          <div>
            <label className="text-sm opacity-80 dark:text-gray-300">
              Data instalacji
            </label>

            <input
              type="date"
              value={dataInstalacji}
              onChange={(e) => setDataInstalacji(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-lg bg-surface dark:bg-darkbg text-foreground dark:text-white border border-border dark:border-darkborder focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <FloatingInput
            label="Rzedna 0 cm"
            type="number"
            value={rzednaZero}
            onChange={(e) => setRzednaZero(e.target.value)}
          />

          <FloatingInput
            label="Opis punktu"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          />

          <div className="space-y-2">
            <label className="text-sm opacity-80 dark:text-gray-300">
              Zdjecie referencyjne
            </label>

            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setZdjecieReferencyjne(e.target.files?.[0] || null)}
                />

                <span className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition">
                  Wybierz zdjecie
                </span>
              </label>

              <span className="text-sm opacity-70 dark:text-gray-300">
                {zdjecieReferencyjne ? zdjecieReferencyjne.name : "Nie wybrano pliku"}
              </span>
            </div>
          </div>

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
              Wybrane wspolrzedne: {lat.toFixed(5)}, {lng.toFixed(5)}
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Zapisywanie..." : "Zapisz wodowskaz"}
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/wodowskazy")}
            >
              Powrot
            </Button>
          </div>
        </div>
      </Card>
    </Layout>
  )
}

export default DodajWodowskaz