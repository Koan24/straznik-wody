import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useWodowskazy } from "../context/WodowskazyContext"
import Layout from "../components/Layout"
import { useEffect, useState } from "react"

function MapaWodowskazow() {
  const navigate = useNavigate()
  const { wodowskazy } = useWodowskazy()
  const [center, setCenter] = useState([51.1079, 17.0385])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCenter([
            pos.coords.latitude,
            pos.coords.longitude
          ])
        },
        () => {}
      )
    }
  }, [])

  return (
    <Layout title="Mapa wodowskazów">

      <div className="space-y-4">

        <div className="relative rounded-xl overflow-hidden border border-border dark:border-darkborder mb-4">
          <MapContainer
            center={center}
            zoom={15}
            className="h-[60vh] w-full"
          >
            <TileLayer
              attribution="© OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {wodowskazy.map((w) => (
              <Marker key={w.id} position={[w.lat, w.lng]}>
                <Popup>
                  <div className="space-y-2">
                    <div className="font-semibold">
                      {w.nazwa}
                    </div>

                    <button
                      className="text-primary hover:underline text-sm"
                      onClick={() => navigate(`/wodowskazy/${w.id}`)}
                    >
                      Szczegóły
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>

        <button
          onClick={() => navigate("/wodowskazy")}
          className="
            w-full
            py-4
            rounded-xl
            border
            border-border
            dark:border-darkborder
            text-gray-700
            dark:text-gray-300
            hover:bg-surface
            dark:hover:bg-darksurface
            transition
          "
        >
          Powrót
        </button>

      </div>

    </Layout>
  )
}

export default MapaWodowskazow