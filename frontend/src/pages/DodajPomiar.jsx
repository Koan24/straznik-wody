import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"
import FloatingInput from "../components/FloatingInput"
import { useWodowskazy } from "../context/WodowskazyContext"
import { useToast } from "../context/ToastContext"

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

function DodajPomiar() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    wodowskazy,
    loading: loadingWodowskazy,
    pobierzWodowskazy
  } = useWodowskazy()

  const { addToast } = useToast()

  const [poziom, setPoziom] = useState("")
  const [komentarz, setKomentarz] = useState("")
  const [dostepDoPunktu, setDostepDoPunktu] = useState("")
  const [mozliwoscOdczytu, setMozliwoscOdczytu] = useState("")
  const [stanLaty, setStanLaty] = useState("")
  const [warunkiOdczytu, setWarunkiOdczytu] = useState("")
  const [uwagiTerenowe, setUwagiTerenowe] = useState("")
  const [data, setData] = useState(new Date().toISOString().slice(0, 16))
  const [gps, setGps] = useState(null)
  const [loading, setLoading] = useState(false)
  const [zdjecie, setZdjecie] = useState(null)
  const [powrotZM, setPowrotZM] = useState(false)

  const wodowskaz = wodowskazy.find((w) => String(w.id) === String(id))

  useEffect(() => {
    const restoreForm = () => {
      const saved = sessionStorage.getItem("pomiarForm")
      if (!saved) return

      const parsed = JSON.parse(saved)

      if (parsed.poziom !== undefined) setPoziom(parsed.poziom)
      if (parsed.komentarz !== undefined) setKomentarz(parsed.komentarz)
      if (parsed.dostepDoPunktu !== undefined) setDostepDoPunktu(parsed.dostepDoPunktu)
      if (parsed.mozliwoscOdczytu !== undefined) setMozliwoscOdczytu(parsed.mozliwoscOdczytu)
      if (parsed.stanLaty !== undefined) setStanLaty(parsed.stanLaty)
      if (parsed.warunkiOdczytu !== undefined) setWarunkiOdczytu(parsed.warunkiOdczytu)
      if (parsed.uwagiTerenowe !== undefined) setUwagiTerenowe(parsed.uwagiTerenowe)
      if (parsed.data !== undefined) setData(parsed.data)

      if (parsed.gps !== undefined && parsed.fromMap) {
        setGps(parsed.gps)
        setPowrotZM(true)

        parsed.fromMap = false
        sessionStorage.setItem("pomiarForm", JSON.stringify(parsed))
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
      addToast("GPS niedostepny", "error")
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
      dostepDoPunktu,
      mozliwoscOdczytu,
      stanLaty,
      warunkiOdczytu,
      uwagiTerenowe,
      data,
      gps,
      fromMap: true
    }

    sessionStorage.setItem("pomiarForm", JSON.stringify(formState))
    navigate("/mapa-wybor-lokalizacji")
  }

  const handleSubmit = async () => {
    if (!poziom) {
      addToast("Podaj poziom wody", "error")
      return
    }

    if (!zdjecie) {
      addToast("Dodanie pomiaru bez zdjęcia nie jest możliwe", "error")
      return
    }

    if (!gps) {
      addToast("Wskazanie lokalizacji jest wymagane", "error")
      return
    }

    if (!wodowskaz) {
      addToast("Nie znaleziono wodowskazu", "error")
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
      formData.append("lat", gps.lat)
      formData.append("lng", gps.lng)
      formData.append("zdjecie", zdjecie)

      formData.append("dostepDoPunktu", dostepDoPunktu)
      formData.append("mozliwoscOdczytu", mozliwoscOdczytu)
      formData.append("stanLaty", stanLaty)
      formData.append("warunkiOdczytu", warunkiOdczytu)
      formData.append("uwagiTerenowe", uwagiTerenowe)

      const res = await fetch("http://localhost:4000/api/pomiary", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.error || "Blad zapisu")
      }

      sessionStorage.removeItem("pomiarForm")
      await pobierzWodowskazy()
      addToast("Pomiar zapisany", "success")
      navigate(`/wodowskazy/${wodowskaz.id}`)
    } catch (e) {
      addToast(e.message || "Bląd", "error")
    } finally {
      setLoading(false)
    }
  }

  if (loadingWodowskazy) {
    return (
      <Layout>
        <div className="p-6">
          <Card>
            <div className="text-foreground dark:text-white">
              Ładowanie wodowskazow...
            </div>
          </Card>
        </div>
      </Layout>
    )
  }

  if (!id) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <h1 className="text-xl font-bold text-foreground dark:text-white">
            Wybierz wodowskaz
          </h1>

          <div className="space-y-4">
            {wodowskazy.map((w) => (
              <Card key={w.id}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-foreground dark:text-white">
                      {w.nazwa}
                    </div>
                    <div className="text-sm opacity-70 text-foreground dark:text-gray-300">
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

          <Button
            variant="secondary"
            onClick={() => navigate("/wodowskazy")}
          >
            Powrot
          </Button>
        </div>
      </Layout>
    )
  }

  if (!wodowskaz) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="text-xl font-bold mb-6 dark:text-white">Blad</h1>

          <Card>
            <div className="text-red-400">
              Nie znaleziono wodowskazu
            </div>
          </Card>

          <div className="mt-6">
            <Button
              variant="secondary"
              onClick={() => navigate("/wodowskazy")}
            >
              Powrot
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-xl font-bold text-foreground dark:text-white">
          Wodowskaz: {wodowskaz.nazwa}
        </h1>

        <Card>
          <div className="space-y-5">
            <h2 className="font-semibold dark:text-white">Dodaj pomiar</h2>

            <FloatingInput
              label="Poziom wody (cm)"
              value={poziom}
              onChange={(e) => setPoziom(e.target.value)}
            />

            <div>
              <label className="text-sm opacity-80 dark:text-gray-300">
                Data pomiaru
              </label>

              <input
                type="datetime-local"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-surface dark:bg-darkbg text-foreground dark:text-white border border-border dark:border-darkborder focus:outline-none focus:ring-2 focus:ring-primary [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>

            <FloatingInput
              label="Komentarz"
              value={komentarz}
              onChange={(e) => setKomentarz(e.target.value)}
            />

            <SelectField
              label="Dostęp do punktu"
              value={dostepDoPunktu}
              onChange={(e) => setDostepDoPunktu(e.target.value)}
              options={[
                { value: "latwy", label: "Łatwy" },
                { value: "utrudniony", label: "Utrudniony" },
                { value: "trudny", label: "Trudny" }
              ]}
            />

            <SelectField
              label="Możliwość odczytu"
              value={mozliwoscOdczytu}
              onChange={(e) => setMozliwoscOdczytu(e.target.value)}
              options={[
                { value: "bez_problemu", label: "Bez problemu" },
                { value: "czesciowo_utrudniona", label: "Częściowo utrudniona" },
                { value: "niemozliwa", label: "Niemożliwa" }
              ]}
            />

            <SelectField
              label="Stan łaty"
              value={stanLaty}
              onChange={(e) => setStanLaty(e.target.value)}
              options={[
                { value: "dobry", label: "Dobry" },
                { value: "zabrudzona", label: "Zabrudzona" },
                { value: "uszkodzona", label: "Uszkodzona" },
                { value: "przesunieta", label: "Przesunięta" },
                { value: "niewidoczna", label: "Niewidoczna" }
              ]}
            />

            <SelectField
              label="Warunki odczytu"
              value={warunkiOdczytu}
              onChange={(e) => setWarunkiOdczytu(e.target.value)}
              options={[
                { value: "dobre", label: "Dobre" },
                { value: "slabe_swiatlo", label: "Słabe światlo" },
                { value: "deszcz", label: "Deszcz" },
                { value: "roslinnosc", label: "Wysoka roślinność" },
                { value: "inne", label: "Inne" }
              ]}
            />

            <FloatingInput
              label="Uwagi terenowe"
              value={uwagiTerenowe}
              onChange={(e) => setUwagiTerenowe(e.target.value)}
            />

            <div className="space-y-2">
              <label className="text-sm opacity-80 dark:text-gray-300">
                Zdjęcie pomiaru
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

            {powrotZM && !zdjecie && (
              <div className="text-xs text-yellow-400">
                Po powrocie z mapy wybierz zdjęcie ponownie
              </div>
            )}

            <Button variant="secondary" onClick={pobierzGPS}>
              Pobierz lokalizację GPS
            </Button>

            {gps && (
              <div className="text-sm text-green-400">
                Lokalizacja zapisana: {gps.lat.toFixed(5)}, {gps.lng.toFixed(5)}
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

        <div className="flex flex-col gap-4 pt-4">
          <Button
            variant="secondary"
            onClick={() => navigate("/wodowskazy")}
            className="w-full py-3 text-base"
          >
            Menu wodowskazów
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/wodowskazy/mapa")}
            className="w-full py-3 text-base"
          >
            Mapa wodowskazów
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default DodajPomiar