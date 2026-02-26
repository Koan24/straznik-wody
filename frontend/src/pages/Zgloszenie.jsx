import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import Layout from "../components/Layout"

// komponent do obsługi kliknięcia w mapę
function ClickHandler({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)
    },
  })
  return null
}

function Zgloszenie() {
  const navigate = useNavigate()
  const { dodajZgloszenie } = useZgloszenia()

  const [tytul, setTytul] = useState("")
  const [opis, setOpis] = useState("")
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  const handleSubmit = () => {
    if (!tytul || !opis || lat === null || lng === null) {
      alert("Wypełnij wszystkie pola i kliknij lokalizację na mapie")
      return
    }

    dodajZgloszenie({ tytul, opis, lat, lng })
    navigate("/obiekty/lista")
  }

  return (
    <Layout title="Zgłoszenie usterki">
      <AppContainer>
        
        <input
          placeholder="Tytuł"
          value={tytul}
          onChange={(e) => setTytul(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Opis"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          style={inputStyle}
        />

        <h4>Wybierz lokalizację na mapie:</h4>

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

        <MenuButton text="Wyślij zgłoszenie" onClick={handleSubmit} />
        <MenuButton text="Powrót" onClick={() => navigate("/obiekty")} />
      </AppContainer>
    </Layout>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
}

export default Zgloszenie