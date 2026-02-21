import { createContext, useContext, useState } from "react"
import { useEffect } from "react"

const ZgloszeniaContext = createContext()

export function ZgloszeniaProvider({ children }) {
  const [zgloszenia, setZgloszenia] = useState(() => {
  const zapisane = localStorage.getItem("zgloszenia")
  return zapisane ? JSON.parse(zapisane) : []
  })

  useEffect(() => {
  localStorage.setItem("zgloszenia", JSON.stringify(zgloszenia))
  }, [zgloszenia])

  const dodajZgloszenie = (zgloszenie) => {
    setZgloszenia(prev => [...prev, { id: Date.now(), ...zgloszenie }])
  }

  const usunZgloszenie = (id) => {
  setZgloszenia(prev => prev.filter(z => z.id !== id))
  }

  const aktualizujZgloszenie = (id, noweDane) => {
    setZgloszenia(prev =>
        prev.map(z =>
            z.id === id ? { ...z, ...noweDane } : z
        )
    )
  }

  return (
    <ZgloszeniaContext.Provider value={{ zgloszenia, dodajZgloszenie, usunZgloszenie, aktualizujZgloszenie }}>
      {children}
    </ZgloszeniaContext.Provider>
  )
}

export function useZgloszenia() {
  return useContext(ZgloszeniaContext)
}