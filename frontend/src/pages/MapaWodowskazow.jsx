import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useWodowskazy } from "../context/WodowskazyContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function MapaWodowskazow() {
  const navigate = useNavigate()
  const { wodowskazy } = useWodowskazy()

  return (
    <Layout title="Mapa wodowskazów">

      <Card>
        <div className="space-y-6">

          <div className="rounded-xl overflow-hidden border border-border dark:border-darkborder dark:border-darkborder">
            <MapContainer
              center={[51.1079, 17.0385]}
              zoom={13}
              className="h-[400px] w-full"
            >
              <TileLayer
                attribution="© OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {wodowskazy.map(w => (
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

          <div className="pt-2">
            <Button
              variant="secondary"
              onClick={() => navigate("/wodowskazy")}
            >
              Powrót
            </Button>
          </div>

        </div>
      </Card>

    </Layout>
  )
}

export default MapaWodowskazow