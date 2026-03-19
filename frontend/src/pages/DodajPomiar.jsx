import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"
import FloatingInput from "../components/FloatingInput"
import { useWodowskazy } from "../context/WodowskazyContext"
import { useToast } from "../context/ToastContext"

function DodajPomiar() {

  const { id } = useParams()
  const navigate = useNavigate()

  const { wodowskazy } = useWodowskazy()
  const { addToast } = useToast()

  const [poziom, setPoziom] = useState("")
  const [komentarz, setKomentarz] = useState("")
  const [data, setData] = useState(new Date().toISOString().slice(0,16))
  const [gps, setGps] = useState(null)
  const [loading, setLoading] = useState(false)

  const [zdjecie, setZdjecie] = useState(null)
  const [powrotZM, setPowrotZM] = useState(false)

  const [powrotZMapy, setPowrotZMapy] = useState(false)

  const wodowskaz = wodowskazy.find(w => String(w.id) === String(id))

  // 🔥 przywracanie formularza po powrocie z mapy
  useEffect(() => {

    const restoreForm = () => {
      const saved = sessionStorage.getItem("pomiarForm")
      if (!saved) return

      const parsed = JSON.parse(saved)

      if (parsed.poziom !== undefined) setPoziom(parsed.poziom)
      if (parsed.komentarz !== undefined) setKomentarz(parsed.komentarz)
      if (parsed.data !== undefined) setData(parsed.data)
      if (parsed.gps !== undefined) {
        setGps(parsed.gps)
        setPowrotZM(true)
      } 
    }

    restoreForm()
    window.addEventListener("focus", restoreForm)

    return () => {
      window.removeEventListener("focus", restoreForm)
    }

  }, [])

  const pobierzGPS = () => {

    if (!navigator.geolocation) {
      addToast("GPS niedostępny", "error")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {

        const position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }

        setGps(position)

        const saved = sessionStorage.getItem("pomiarForm")
        const parsed = saved ? JSON.parse(saved) : {}

        parsed.gps = position
        sessionStorage.setItem("pomiarForm", JSON.stringify(parsed))

        addToast("Pobrano lokalizację", "success")
      },
      () => addToast("Nie udało się pobrać GPS", "error")
    )
  }

  const openMap = () => {

    const formState = {
      poziom,
      komentarz,
      data,
      gps
    }

    sessionStorage.setItem("pomiarForm", JSON.stringify(formState))

    navigate("/mapa-wybor-lokalizacji")
  }

  const handleSubmit = async () => {

    if (!poziom) {
      addToast("Podaj poziom wody", "error")
      return
    }

    setLoading(true)

    try {

      const token = localStorage.getItem("token")

      const formData = new FormData()

      formData.append("wodowskazId", wodowskaz.id)
      formData.append("wartosc", poziom)
      formData.append("data", data)
      formData.append("komentarz", komentarz)

      if (gps) {
        formData.append("lat", gps.lat)
        formData.append("lng", gps.lng)
      }

      if (zdjecie) {
        formData.append("zdjecie", zdjecie)
      }

      const res = await fetch("http://localhost:4000/api/pomiary", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!res.ok) throw new Error("Błąd zapisu")

      sessionStorage.removeItem("pomiarForm")

      addToast("Pomiar zapisany", "success")

      navigate(`/wodowskazy/${wodowskaz.id}`)

    } catch (e) {
      addToast(e.message || "Błąd", "error")
    }

    setLoading(false)
  }

  if (!id) {
    return (
      <Layout>
        <div className="p-6 space-y-6">

          <h1 className="text-xl font-bold text-foreground dark:text-[#B9D6F2]">
            Wybierz wodowskaz
          </h1>

          <div className="space-y-4">
            {wodowskazy.map(w => (
              <Card key={w.id}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-foreground dark:text-[#B9D6F2]">
                      {w.nazwa}
                    </div>
                    <div className="text-sm opacity-70 text-foreground dark:text-[#B9D6F2]">
                      {w.lat}, {w.lng}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => navigate(`/wodowskazy/${w.id}/pomiar`)}
                  >
                    Wybierz
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          {powrotZM && !zdjecie && (
            <div className="text-xs text-yellow-500 flex items-center gap-1">
              Po powrocie z mapy wybierz zdjęcie ponownie
            </div>
          )}

          <Button
            variant="secondary"
            onClick={() => navigate("/wodowskazy")}
          >
            Powrót
          </Button>

        </div>
      </Layout>
    )
  }

  if (!wodowskaz) {
    return (
      <Layout>
        <div className="p-6">

          <h1 className="text-xl font-bold mb-6">Błąd</h1>

          <Card>
            <div className="text-red-500">
              Nie znaleziono wodowskazu
            </div>
          </Card>

          <div className="mt-6">
            <Button
              variant="secondary"
              onClick={() => navigate("/wodowskazy")}
            >
              Powrót
            </Button>
          </div>

        </div>
      </Layout>
    )
  }

  return (
    <Layout>

      <div className="p-6 space-y-6">

        <h1 className="text-xl font-bold text-foreground dark:text-[#B9D6F2]">
          Wodowskaz: {wodowskaz.nazwa}
        </h1>

        <Card>

          <div className="space-y-5">

            <h2 className="font-semibold">Dodaj pomiar</h2>

            <FloatingInput
              label="Poziom wody (cm)"
              value={poziom}
              onChange={(e) => setPoziom(e.target.value)}
            />

            <div>
              <label className="text-sm opacity-80">Data pomiaru</label>

              <input
                type="datetime-local"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-surface dark:bg-darkbg text-foreground dark:text-[#B9D6F2] border border-border dark:border-darkborder focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <FloatingInput
              label="Komentarz"
              value={komentarz}
              onChange={(e) => setKomentarz(e.target.value)}
            />

            <div className="space-y-2">

              <label className="text-sm opacity-80">
                Zdjęcie pomiaru
              </label>

              <div className="flex items-center gap-3">

                <label className="cursor-pointer">

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setZdjecie(e.target.files[0])}
                  />

                  <span className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition">
                    Wybierz zdjęcie
                  </span>

                </label>

                <span className="text-sm opacity-70">
                  {zdjecie ? zdjecie.name : "Nie wybrano pliku"}
                </span>

              </div>

            </div>

            <Button variant="secondary" onClick={pobierzGPS}>
              Pobierz lokalizację GPS
            </Button>

            {gps && (
              <div className="text-sm text-green-500">
                ✔ Lokalizacja zapisana: {gps.lat.toFixed(5)}, {gps.lng.toFixed(5)}
              </div>
            )}

            <Button variant="secondary" onClick={openMap}>
              Wskaż lokalizację na mapie
            </Button>

            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Zapisywanie..." : "Dodaj pomiar"}
            </Button>

          </div>

        </Card>

        <Button
          variant="secondary"
          onClick={() => navigate(`/wodowskazy/${wodowskaz.id}`)}
        >
          Powrót
        </Button>

      </div>

    </Layout>
  )
}

export default DodajPomiar