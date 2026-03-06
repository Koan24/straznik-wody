import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import Layout from "../components/Layout"
import { useEffect, useState } from "react"

// Fix ikon (Leaflet + Vite bug)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

function MapaZgloszen() {
  const navigate = useNavigate()
  const { zgloszenia } = useZgloszenia()
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
    <Layout title="Mapa zgłoszeń">

      <div className="space-y-4">

        <div className="relavite rounded-xl overflow-hidden border border-border dark:border-darkborder mb-32">
          <MapContainer
            center={center}
            zoom={15}
            className="h-[60vh] w-full"
          >
            <TileLayer
              attribution="© OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {zgloszenia.map((z) =>
              z.lat && z.lng ? (
                <Marker key={z.id} position={[z.lat, z.lng]}>
                  <Popup>
                    <div className="space-y-2">
                      <div className="font-semibold">
                        {z.tytul}
                      </div>
                      <div className="text-sm">
                        {z.opis}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}

          </MapContainer>
        </div>

        <button
          onClick={() => navigate("/obiekty")}
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

export default MapaZgloszen