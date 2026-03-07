import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

import Obiekty from "./pages/Obiekty"
import Zgloszenie from "./pages/Zgloszenie"
import ListaZgloszen from "./pages/ListaZgloszen"
import MapaZgloszen from "./pages/MapaZgloszen"
import Raport from "./pages/Raport"

import Wodowskazy from "./pages/Wodowskazy"
import DodajPomiar from "./pages/DodajPomiar"
import ArchiwumPomiarow from "./pages/ArchiwumPomiarow"
import WykresPomiarow from "./pages/WykresPomiarow"

import Admin from "./pages/Admin"

import EdycjaZgloszenia from "./pages/EdycjaZgloszenia"

import DodajWodowskaz from "./pages/DodajWodowskaz"
import MapaWodowskazow from "./pages/MapaWodowskazow"
import SzczegolyWodowskazu from "./pages/SzczegolyWodowskazu"
import WybierzLokalizacje from "./pages/WybierzLokalizacje"

import DodajUzytkownika from "./pages/DodajUzytkownika"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        <Route path="/obiekty" element={<Obiekty />} />
        <Route path="/obiekty/zgloszenie" element={<Zgloszenie />} />
        <Route path="/obiekty/lista" element={<ListaZgloszen />} />
        <Route path="/obiekty/edycja/:id" element={<EdycjaZgloszenia />} />
        <Route path="/obiekty/mapa" element={<MapaZgloszen />} />
        <Route path="/obiekty/raport" element={<Raport />} />

        <Route path="/wodowskazy" element={<Wodowskazy />} />
        <Route path="/wodowskazy/dodaj" element={<DodajWodowskaz />} />
        <Route path="/wodowskazy/mapa" element={<MapaWodowskazow />} />
        <Route path="/wodowskazy/:id" element={<SzczegolyWodowskazu />} />
        <Route path="/wodowskazy/archiwum" element={<ArchiwumPomiarow />} />
        <Route path="/wodowskazy/wykres" element={<WykresPomiarow />} />
        <Route path="/wodowskazy/pomiar" element={<DodajPomiar />} />
        <Route path="/wodowskazy/:id/pomiar" element={<DodajPomiar />} />
        <Route path="/mapa-wybor-lokalizacji" element={<WybierzLokalizacje />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dodaj" element={<DodajUzytkownika />} />
      </Routes>
    </AuthProvider>
  )
}

export default App