const STORAGE_KEY = "wodowskazy"

export function getWodowskazy() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveWodowskazy(wodowskazy) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wodowskazy))
}