import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { ZgloszeniaProvider } from "./context/ZgloszeniaContext"
import "leaflet/dist/leaflet.css"
import { WodowskazyProvider } from "./context/WodowskazyContext"
import { UzytkownicyProvider } from "./context/UzytkownicyContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ZgloszeniaProvider>
      <WodowskazyProvider>
        <UzytkownicyProvider>
          <App />
        </UzytkownicyProvider>
      </WodowskazyProvider>
    </ZgloszeniaProvider>
  </BrowserRouter>
)