import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"
import Layout from "../components/Layout"

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
      <AppContainer>
        
        <MapContainer
          center={[51.1079, 17.0385]} // Wrocław
          zoom={13}
          style={{ height: "400px", width: "100%", marginBottom: "10px" }}
        >
          <TileLayer
            attribution='© OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {zgloszenia.map((z) => 
            z.lat && z.lng ? (
              <Marker key={z.id} position={[z.lat, z.lng]}>
                <Popup>
                  <strong>{z.tytul}</strong>
                  <div>{z.opis}</div>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>

        <MenuButton text="Powrót" onClick={() => navigate("/obiekty")} />
      </AppContainer>
    </Layout>
  )
}

export default MapaZgloszen