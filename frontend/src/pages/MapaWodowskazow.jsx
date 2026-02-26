import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useWodowskazy } from "../context/WodowskazyContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"
import Layout from "../components/Layout"

function MapaWodowskazow() {
  const navigate = useNavigate()
  const { wodowskazy } = useWodowskazy()

  return (
    <Layout title="Mapa wodowskazów">
      <AppContainer>
        
        <MapContainer
          center={[51.1079, 17.0385]}
          zoom={13}
          style={{ height: "400px", width: "100%", marginBottom: "10px" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {wodowskazy.map(w => (
            <Marker key={w.id} position={[w.lat, w.lng]}>
              <Popup>
                <strong>{w.nazwa}</strong>
                <br />
                <button onClick={() => navigate(`/wodowskazy/${w.id}`)}>
                  Szczegóły
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <MenuButton text="Powrót" onClick={() => navigate("/wodowskazy")} />
      </AppContainer>
    </Layout>
  )
}

export default MapaWodowskazow