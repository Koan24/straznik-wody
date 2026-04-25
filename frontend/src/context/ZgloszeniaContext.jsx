import { createContext, useContext, useState, useEffect } from "react"
import {
  getZgloszenia,
  createZgloszenie,
  updateZgloszenie,
  deleteZgloszenie
} from "../services/zgloszeniaService"

const ZgloszeniaContext = createContext()

export function ZgloszeniaProvider({ children }) {
  const [zgloszenia, setZgloszenia] = useState([])
  const [loading, setLoading] = useState(true)

  const pobierzZgloszenia = async () => {
    try {
      setLoading(true)
      const data = await getZgloszenia()
      setZgloszenia(data || [])
    } catch (err) {
      console.error("Failed to load zgloszenia:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    pobierzZgloszenia()
  }, [])

  const dodajZgloszenie = async (zgloszenie) => {
    const newZgloszenie = await createZgloszenie(zgloszenie)

    if (newZgloszenie) {
      await pobierzZgloszenia()
      return newZgloszenie
    }

    return null
  }

  const usunZgloszenie = async (id) => {
    const ok = await deleteZgloszenie(id)

    if (ok) {
      setZgloszenia((prev) => prev.filter((z) => z.id !== id))
    }
  }

  const aktualizujZgloszenie = async (id, noweDane) => {
    const updated = await updateZgloszenie(id, noweDane)

    if (updated) {
      setZgloszenia((prev) =>
        prev.map((z) => (z.id === id ? updated : z))
      )
    }
  }

  return (
    <ZgloszeniaContext.Provider
      value={{
        zgloszenia,
        dodajZgloszenie,
        usunZgloszenie,
        aktualizujZgloszenie,
        pobierzZgloszenia,
        loading
      }}
    >
      {children}
    </ZgloszeniaContext.Provider>
  )
}

export function useZgloszenia() {
  return useContext(ZgloszeniaContext)
}