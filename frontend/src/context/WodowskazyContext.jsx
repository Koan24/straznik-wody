import { createContext, useContext, useState, useEffect } from "react"
import { getWodowskazy, createWodowskaz, updateWodowskaz } from "../services/wodowskazyService"

const WodowskazyContext = createContext()

export function WodowskazyProvider({ children }) {
  const [wodowskazy, setWodowskazy] = useState([])
  const [loading, setLoading] = useState(true)

  const pobierzWodowskazy = async () => {
    try {
      setLoading(true)
      const data = await getWodowskazy()
      setWodowskazy(data || [])
    } catch (err) {
      console.error("Failed to load wodowskazy:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    pobierzWodowskazy()
  }, [])

  const dodajWodowskaz = async (formData) => {
    const newWodowskaz = await createWodowskaz(formData)

    if (newWodowskaz) {
      await pobierzWodowskazy()
      return newWodowskaz
    }

    return null
  }

  const dodajPomiar = async (wodowskazId, wartosc) => {
    const updated = await updateWodowskaz(wodowskazId, {
      pomiary: [{ id: Date.now(), wartosc: Number(wartosc), data: new Date().toLocaleString() }]
    })

    if (updated) {
      await pobierzWodowskazy()
    }
  }

  return (
    <WodowskazyContext.Provider
      value={{
        wodowskazy,
        dodajWodowskaz,
        dodajPomiar,
        loading,
        pobierzWodowskazy
      }}
    >
      {children}
    </WodowskazyContext.Provider>
  )
}

export function useWodowskazy() {
  return useContext(WodowskazyContext)
}