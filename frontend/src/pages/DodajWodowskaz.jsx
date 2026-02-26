import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWodowskazy } from "../context/WodowskazyContext"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"
import Layout from "../components/Layout"

function ClickHandler({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)
    }
  })
  return null
}

function DodajWodowskaz() {
  const [nazwa, setNazwa] = useState("")
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const { dodajWodowskaz } = useWodowskazy()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!nazwa || lat === null || lng === null) {
      alert("Podaj nazwę i wybierz lokalizację")
      return
    }

    dodajWodowskaz(nazwa, lat, lng)
    navigate("/wodowskazy/mapa")
  }

  return (
    <Layout title="Nowy wodowskaz">
      <AppContainer>

        <input
          placeholder="Nazwa punktu"
          value={nazwa}
          onChange={e => setNazwa(e.target.value)}
          style={inputStyle}
        />

        <MapContainer
          center={[51.1079, 17.0385]}
          zoom={13}
          style={{ height: "300px", width: "100%", marginBottom: "10px" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler setLat={setLat} setLng={setLng} />
          {lat && lng && <Marker position={[lat, lng]} />}
        </MapContainer>

        <MenuButton text="Zapisz wodowskaz" onClick={handleSubmit} />
        <MenuButton text="Powrót" onClick={() => navigate("/wodowskazy")} />
      </AppContainer>
    </Layout>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default DodajWodowskaz