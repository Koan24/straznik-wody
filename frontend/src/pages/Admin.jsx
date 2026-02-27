import { useNavigate } from "react-router-dom"
import { useUzytkownicy } from "../context/UzytkownicyContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function Admin() {
  const navigate = useNavigate()
  const { uzytkownicy, usunUzytkownika } = useUzytkownicy()

  return (
    <Layout title="Panel administratora">

      <div className="mb-8">
        <Button
          variant="primary"
          onClick={() => navigate("/admin/dodaj")}
        >
          Dodaj użytkownika
        </Button>
      </div>

      <h4 className="text-lg font-semibold mb-6">
        Lista użytkowników
      </h4>

      <div className="space-y-6">
        {uzytkownicy.map(u => (
          <Card key={u.id}>
            <div className="space-y-1 mb-4">
              <div className="font-semibold text-lg">
                {u.imie}
              </div>
              <div className="text-sm opacity-80">
                {u.email}
              </div>
              <div className="text-sm">
                Rola: {u.rola}
              </div>
            </div>

            <Button
              variant="danger"
              onClick={() => usunUzytkownika(u.id)}
            >
              Usuń
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Button
          variant="secondary"
          onClick={() => navigate("/home")}
        >
          Powrót
        </Button>
      </div>

    </Layout>
  )
}

export default Admin