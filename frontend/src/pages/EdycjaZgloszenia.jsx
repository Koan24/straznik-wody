import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import AppContainer from "../components/AppContainer"
import MenuButton from "../components/MenuButton"
import Layout from "../components/Layout"

function EdycjaZgloszenia() {
  const { id } = useParams() 
  const navigate = useNavigate()

  const { zgloszenia, aktualizujZgloszenie } = useZgloszenia()

  console.log("Param id:", id)
  console.log("Zgloszenia:", zgloszenia)

  const zgloszenie = zgloszenia.find(z => String(z.id) === id)

  const [tytul, setTytul] = useState("")
  const [lokalizacja, setLokalizacja] = useState("")
  const [opis, setOpis] = useState("")

  useEffect(() => {
    if (zgloszenie) {
      setTytul(zgloszenie.tytul)
      setLokalizacja(zgloszenie.lokalizacja)
      setOpis(zgloszenie.opis)
    }
  }, [zgloszenie])

  const handleSave = () => {
    if (!tytul || !lokalizacja || !opis) {
      alert("Wypełnij wszystkie pola")
      return
    }

    aktualizujZgloszenie(Number(id), { tytul, lokalizacja, opis })
    navigate("/obiekty/lista")
  }

  if (!zgloszenie) {
    return <div>Nie znaleziono zgłoszenia</div>
  }

  return (
    <Layout title="Edycja zgłoszenia">
      <AppContainer>

        <input
          value={tytul}
          onChange={e => setTytul(e.target.value)}
          style={inputStyle}
        />

        <input
          value={lokalizacja}
          onChange={e => setLokalizacja(e.target.value)}
          style={inputStyle}
        />

        <textarea
          value={opis}
          onChange={e => setOpis(e.target.value)}
          style={inputStyle}
        />

        <MenuButton text="Zapisz zmiany" onClick={handleSave} />
        <MenuButton text="Powrót" onClick={() => navigate(-1)} />
      </AppContainer>
    </Layout>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

export default EdycjaZgloszenia