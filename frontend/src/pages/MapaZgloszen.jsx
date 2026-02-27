import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

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

  return (
    <Layout title="Mapa zgłoszeń">

      <Card>
        <div className="space-y-6">

          <div className="rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700">
            <MapContainer
              center={[51.1079, 17.0385]}
              zoom={13}
              className="h-[400px] w-full"
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

          <div className="pt-2">
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

export default MapaZgloszen