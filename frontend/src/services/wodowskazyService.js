const API_URL = "http://localhost:4000"

function getAuthHeader() {
  const token = localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getWodowskazy() {
  const res = await fetch(`${API_URL}/api/wodowskazy`)
  return res.ok ? res.json() : []
}

export async function createWodowskaz(data) {
  const res = await fetch(`${API_URL}/api/wodowskazy`, {
    method: "POST",
    headers: {
      ...getAuthHeader()
    },
    body: data
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    throw new Error(errorData?.error || "Nie udalo sie dodac wodowskazu")
  }

  return res.json()
}

export async function updateWodowskaz(id, data) {
  const res = await fetch(`${API_URL}/api/wodowskazy/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(data)
  })
  return res.ok ? res.json() : null
}

export async function deleteWodowskaz(id) {
  const res = await fetch(`${API_URL}/api/wodowskazy/${id}`, {
    method: "DELETE",
    headers: getAuthHeader()
  })
  return res.ok
}