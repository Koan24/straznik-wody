import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function Wodowskazy() {
  const navigate = useNavigate()

  return (
    <Layout title="Wodowskazy">
      <Card>
        <div className="space-y-6">

          <Button
            variant="primary"
            onClick={() => navigate("/wodowskazy/dodaj")}
          >
            Dodaj wodowskaz
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/wodowskazy/mapa")}
          >
            Mapa wodowskazów
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/home")}
          >
            Powrót
          </Button>

        </div>
      </Card>
    </Layout>
  )
}

export default Wodowskazy