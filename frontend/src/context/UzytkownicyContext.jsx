import { createContext, useContext, useState, useEffect } from "react"

const UzytkownicyContext = createContext()

export function UzytkownicyProvider({ children }) {
  const [uzytkownicy, setUzytkownicy] = useState(() => {
    const zapisane = localStorage.getItem("uzytkownicy")
    return zapisane ? JSON.parse(zapisane) : [
      { id: 1, imie: "Admin", email: "admin@test.pl", rola: "admin" },
      { id: 2, imie: "User", email: "user@test.pl", rola: "user" }
    ]
  })

  useEffect(() => {
    localStorage.setItem("uzytkownicy", JSON.stringify(uzytkownicy))
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