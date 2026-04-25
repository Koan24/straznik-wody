const API_URL = "http://localhost:4000"

function getAuthHeader() {
  const token = localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getZgloszenia() {
  const res = await fetch(`${API_URL}/api/zgloszenia`)
  return res.ok ? res.json() : []
}

export async function createZgloszenie(data) {
  const res = await fetch(`${API_URL}/api/zgloszenia`, {
    method: "POST",
    headers: {
      ...getAuthHeader()
    },
    body: data
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.error || "Nie udalo sie dodac zgloszenia")
  }

  return res.json()
}

export async function updateZgloszenie(id, data) {
  const res = await fetch(`${API_URL}/api/zgloszenia/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.error || "Nie udalo sie zaktualizowac zgloszenia")
  }

  return res.json()
}

export async function deleteZgloszenie(id) {
  const res = await fetch(`${API_URL}/api/zgloszenia/${id}`, {
    method: "DELETE",
    headers: getAuthHeader()
  })

  return res.ok
}