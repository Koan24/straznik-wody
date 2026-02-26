const STORAGE_KEY = "zgloszenia"

export function getZgloszenia() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveZgloszenia(zgloszenia) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(zgloszenia))
}