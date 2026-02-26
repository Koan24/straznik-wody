const STORAGE_KEY = "uzytkownicy"

export function getUzytkownicy() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data
    ? JSON.parse(data)
    : [
        { id: 1, imie: "Admin", email: "admin@test.pl", rola: "admin" },
        { id: 2, imie: "User", email: "user@test.pl", rola: "user" }
      ]
}

export function saveUzytkownicy(uzytkownicy) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(uzytkownicy))
}