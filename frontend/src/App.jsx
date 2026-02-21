import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

import Obiekty from "./pages/Obiekty"
import Zgloszenie from "./pages/Zgloszenie"
import ListaZgloszen from "./pages/ListaZgloszen"
import MapaZgloszen from "./pages/MapaZgloszen"
import Raport from "./pages/Raport"

import Wodowskazy from "./pages/Wodowskazy"
import Admin from "./pages/Admin"

import EdycjaZgloszenia from "./pages/EdycjaZgloszenia"

function App() {
  return (
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
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App