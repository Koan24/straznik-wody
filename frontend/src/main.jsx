import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { ZgloszeniaProvider } from "./context/ZgloszeniaContext"
import "leaflet/dist/leaflet.css"
import { WodowskazyProvider } from "./context/WodowskazyContext"
import { UzytkownicyProvider } from "./context/UzytkownicyContext"
import { ThemeProvider } from "./context/ThemeContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <ZgloszeniaProvider>
        <WodowskazyProvider>
          <UzytkownicyProvider>
            <App />
          </UzytkownicyProvider>
        </WodowskazyProvider>
      </ZgloszeniaProvider>
    </ThemeProvider>
  </BrowserRouter>
)