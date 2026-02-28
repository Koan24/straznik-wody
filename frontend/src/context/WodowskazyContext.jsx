import { createContext, useContext, useState, useEffect } from "react"
import { getWodowskazy, createWodowskaz, updateWodowskaz } from "../services/wodowskazyService"

const WodowskazyContext = createContext()

export function WodowskazyProvider({ children }) {
  const [wodowskazy, setWodowskazy] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWodowskazy().then(data => {
      setWodowskazy(data || [])
      setLoading(false)
    }).catch(err => {
      console.error('Failed to load wodowskazy:', err)
      setLoading(false)
    })
  }, [])

  const dodajWodowskaz = async (nazwa, lat, lng) => {
    const newWodowskaz = await createWodowskaz({ nazwa, lat, lng })
    if (newWodowskaz) {
      setWodowskazy(prev => [...prev, newWodowskaz])
    }
  }

  const dodajPomiar = async (wodowskazId, wartosc) => {
    const updated = await updateWodowskaz(wodowskazId, { pomiary: [{ id: Date.now(), wartosc: Number(wartosc), data: new Date().toLocaleString() }] })
    if (updated) {
      setWodowskazy(prev =>
        prev.map(w => w.id === wodowskazId ? updated : w)
      )
    }
  }

  return (
    <WodowskazyContext.Provider value={{ wodowskazy, dodajWodowskaz, dodajPomiar, loading }}>
      {children}
    </WodowskazyContext.Provider>
  )
}

export function useWodowskazy() {
  return useContext(WodowskazyContext)
}