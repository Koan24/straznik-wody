import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { useState } from "react"
import Layout from "../components/Layout"
import Button from "../components/Button"
import { useNavigate, useLocation } from "react-router-dom"

function LocationPicker({ setPosition }) {

  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    }
  })

  return null
}

function WybierzLokalizacje() {

  const navigate = useNavigate()
  const location = useLocation()

  const [position, setPosition] = useState(location.state?.gps || null)

  return (
    <Layout>

      <div className="p-4 space-y-4">

        <div className="text-sm opacity-70">
          Kliknij na mapie aby wskazać lokalizację
        </div>

        <MapContainer
          center={[51.1,17.0]}
          zoom={13}
          className="h-[60vh] rounded-xl"
        >

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <LocationPicker setPosition={setPosition} />

          {position && <Marker position={position} />}

        </MapContainer>

        <div className="flex flex-col gap-4">

          <Button
            variant="primary"
            disabled={!position}
            className="w-full py-3"
            onClick={() => {
              const saved = sessionStorage.getItem("pomiarForm")
              const parsed = saved ? JSON.parse(saved) : {}
            
              parsed.gps = position
              sessionStorage.setItem("pomiarForm", JSON.stringify(parsed))
            
              navigate(-1)
            }}
          >
            Zapisz lokalizację
          </Button>

          <Button
            variant="secondary"
            className="w-full py-3"
            onClick={() => navigate(-1)}
          >
            Powrót
          </Button>

        </div>

      </div>

    </Layout>
  )
}

export default WybierzLokalizacje