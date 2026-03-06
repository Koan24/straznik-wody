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

/* marker zgloszen */
const zgloszenieIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

/* marker wodowksazow */
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
      ? zgloszenia[zgloszenia.length - 1]
      : null

  return (
    <Layout title="Panel systemu">

      <div className="space-y-6">

        {/* statystyki */}
        <div className="grid grid-cols-2 gap-4">

          <Card>
            <div className="text-xs text-gray-500 mb-1">
              Zgłoszenia
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

        {/* ostatnie zgl */}
        <Card>

          <div className="space-y-2">

            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Ostatnie zgłoszenie
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
                Brak zgłoszeń
              </div>
            )}

          </div>

        </Card>

        {/* mini mapa */}
        <Card>

          <div className="space-y-3">

            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Podgląd systemu
            </div>

            <div className="text-sm flex gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span>🔴</span>
                <span>zgłoszenia</span>
              </div>

              <div className="flex items-center gap-1">
                <span>🔵</span>
                <span>wodowskazy</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border dark:border-darkborder">

              <MapContainer
                center={[51.1079, 17.0385]}
                zoom={12}
                className="h-[260px] w-full"
              >

                <TileLayer
                  attribution="© OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* wodowskazy */}
                {wodowskazy.map((w) => (
                  <Marker
                    key={"w"+w.id}
                    position={[w.lat, w.lng]}
                    icon={wodowskazIcon}
                  >
                    <Popup>
                      Wodowskaz: {w.nazwa}
                    </Popup>
                  </Marker>
                ))}

                {/* zgloszenia */}
                {zgloszenia.map((z) =>
                  z.lat && z.lng ? (
                    <Marker
                      key={"z"+z.id}
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