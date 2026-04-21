import { useNavigate } from "react-router-dom"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import { useWodowskazy } from "../context/WodowskazyContext"
import Layout from "../components/Layout"
import Card from "../components/Card"
import { motion } from "framer-motion"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

function AnimatedNumber({ value }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-3xl font-bold text-primary"
    >
      {value}
    </motion.span>
  )
}

const zgloszenieIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const wodowskazIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function Home() {
  const navigate = useNavigate()

  const { zgloszenia } = useZgloszenia()
  const { wodowskazy } = useWodowskazy()

  const ostatnieZgloszenie =
    zgloszenia.length > 0
      ? [...zgloszenia].sort((a, b) => {
          const da = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const db = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return db - da
        })[0]
      : null

  const wszystkiePomiary = wodowskazy.flatMap((w) =>
    (w.pomiary || []).map((p) => ({
      ...p,
      wodowskazId: p.wodowskazId ?? w.id
    }))
  )

  const ostatniPomiar =
    wszystkiePomiary.length > 0
      ? [...wszystkiePomiary].sort((a, b) => {
          const da = a.data ? new Date(a.data).getTime() : 0
          const db = b.data ? new Date(b.data).getTime() : 0
          return db - da
        })[0]
      : null

  const wodowskazDoPomiaru = ostatniPomiar
    ? wodowskazy.find((w) => w.id === ostatniPomiar.wodowskazId)
    : null

  return (
    <Layout title="Panel systemu">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <div className="text-xs text-gray-500 mb-1">
              Zgloszenia
            </div>
            <AnimatedNumber value={zgloszenia.length} />
          </Card>

          <Card>
            <div className="text-xs text-gray-500 mb-1">
              Wodowskazy
            </div>
            <AnimatedNumber value={wodowskazy.length} />
          </Card>
        </div>

        <Card>
          <div className="space-y-2">
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Ostatnie zgloszenie
            </div>

            {ostatnieZgloszenie ? (
              <>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {ostatnieZgloszenie.tytul}
                </div>

                <div className="text-sm text-gray-600 dark:text-[#93C1DD]">
                  {ostatnieZgloszenie.opis}
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-sm">
                Brak zgloszen
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Ostatni pomiar wodowskazu
            </div>

            {ostatniPomiar ? (
              <>
                {wodowskazDoPomiaru && (
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {wodowskazDoPomiaru.nazwa}
                  </div>
                )}

                <div className="text-sm text-gray-600 dark:text-[#93C1DD]">
                  Poziom: {ostatniPomiar.wartosc ?? "brak danych"} cm
                </div>

                {ostatniPomiar.data && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(ostatniPomiar.data).toLocaleString()}
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 text-sm">
                Brak danych
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Podglad systemu
            </div>

            <div className="text-sm flex gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span>🔴</span>
                <span>zgloszenia</span>
              </div>

              <div className="flex items-center gap-1">
                <span>🔵</span>
                <span>wodowskazy</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border dark:border-darkborder">
              <MapContainer
                center={[51.1079, 17.0385]}
                zoom={11}
                className="h-[260px] w-full"
              >
                <TileLayer
                  attribution="© OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {wodowskazy.map((w) =>
                  w.lat && w.lng ? (
                    <Marker
                      key={"w" + w.id}
                      position={[w.lat, w.lng]}
                      icon={wodowskazIcon}
                    >
                      <Popup>
                        Wodowskaz: {w.nazwa}
                      </Popup>
                    </Marker>
                  ) : null
                )}

                {zgloszenia.map((z) =>
                  z.lat && z.lng ? (
                    <Marker
                      key={"z" + z.id}
                      position={[z.lat, z.lng]}
                      icon={zgloszenieIcon}
                    >
                      <Popup>
                        {z.tytul}
                      </Popup>
                    </Marker>
                  ) : null
                )}
              </MapContainer>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default Home