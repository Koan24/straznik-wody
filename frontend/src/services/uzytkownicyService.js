const API_URL = "http://localhost:4000"

export async function getUzytkownicy() {
  const res = await fetch(`${API_URL}/api/uzytkownicy`)
  return res.ok ? res.json() : []
}

export async function getUzytkownik(id) {
  const res = await fetch(`${API_URL}/api/uzytkownicy/${id}`)
  return res.ok ? res.json() : null
}