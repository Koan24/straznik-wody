import { createContext, useContext, useState, useEffect } from "react"
import { getUzytkownicy, getUzytkownik } from "../services/uzytkownicyService"

const UzytkownicyContext = createContext()

export function UzytkownicyProvider({ children }) {
  const [uzytkownicy, setUzytkownicy] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUzytkownicy().then(data => {
      setUzytkownicy(data || [])
      setLoading(false)
    }).catch(err => {
      console.error('Failed to load uzytkownicy:', err)
      setLoading(false)
    })
  }, [])

  const dodajUzytkownika = (imie, email, rola) => {
    setUzytkownicy(prev => [
      ...prev,
      { id: Date.now(), imie, email, rola }
    ])
  }

  const usunUzytkownika = (id) => {
    setUzytkownicy(prev => prev.filter(u => u.id !== id))
  }

  return (
    <UzytkownicyContext.Provider value={{
      uzytkownicy,
      dodajUzytkownika,
      usunUzytkownika,
      loading
    }}>
      {children}
    </UzytkownicyContext.Provider>
  )
}

export function useUzytkownicy() {
  return useContext(UzytkownicyContext)
}