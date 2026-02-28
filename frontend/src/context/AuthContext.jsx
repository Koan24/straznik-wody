import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()
const API_URL = "http://localhost:4000"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
    setLoading(false)
  }, [])

  const register = async (imie, email, password) => {
    const res = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imie, email, password })
    })
    if (!res.ok) throw new Error("Błąd rejestracji")
    const data = await res.json()
    return data
  }

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error("Błąd logowania")
    const { token } = await res.json()
    setToken(token)
    localStorage.setItem("token", token)
    return token
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
