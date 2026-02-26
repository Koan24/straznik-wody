import { createContext, useContext, useState, useEffect } from "react"
import { getWodowskazy, saveWodowskazy } from "../services/wodowskazyService"

const WodowskazyContext = createContext()

export function WodowskazyProvider({ children }) {
  const [wodowskazy, setWodowskazy] = useState(() => getWodowskazy())

  useEffect(() => {
  saveWodowskazy(wodowskazy)
  }, [wodowskazy])

  const dodajWodowskaz = (nazwa, lat, lng) => {
    setWodowskazy(prev => [
      ...prev,
      {
        id: Date.now(),
        nazwa,
        lat,
        lng,
        pomiary: []
      }
    ])
  }

  const dodajPomiar = (wodowskazId, wartosc) => {
    setWodowskazy(prev =>
      prev.map(w =>
        w.id === wodowskazId
          ? {
              ...w,
              pomiary: [
                ...w.pomiary,
                {
                  id: Date.now(),
                  wartosc: Number(wartosc),
                  data: new Date().toLocaleString()
                }
              ]
            }
          : w
      )
    )
  }

  return (
    <WodowskazyContext.Provider value={{ wodowskazy, dodajWodowskaz, dodajPomiar }}>
      {children}
    </WodowskazyContext.Provider>
  )
}

export function useWodowskazy() {
  return useContext(WodowskazyContext)
}