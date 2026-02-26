import { createContext, useContext, useState, useEffect } from "react"
import { getUzytkownicy, saveUzytkownicy } from "../services/uzytkownicyService"

const UzytkownicyContext = createContext()

export function UzytkownicyProvider({ children }) {
  const [uzytkownicy, setUzytkownicy] = useState(() => getUzytkownicy())

  useEffect(() => {
    saveUzytkownicy(uzytkownicy)
  }, [uzytkownicy])

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
      usunUzytkownika
    }}>
      {children}
    </UzytkownicyContext.Provider>
  )
}

export function useUzytkownicy() {
  return useContext(UzytkownicyContext)
}