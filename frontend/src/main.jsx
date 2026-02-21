import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { ZgloszeniaProvider } from "./context/ZgloszeniaContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ZgloszeniaProvider>
      <App />
    </ZgloszeniaProvider>
  </BrowserRouter>
)