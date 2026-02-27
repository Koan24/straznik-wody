import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function Obiekty() {
  const navigate = useNavigate()

  return (
    <Layout title="Obiekty hydrotechniczne">
      <Card>
        <div className="space-y-6">

          <Button
            variant="primary"
            onClick={() => navigate("/obiekty/zgloszenie")}
          >
            Zgłoś usterkę
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/obiekty/lista")}
          >
            Lista zgłoszeń
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/obiekty/mapa")}
          >
            Mapa zgłoszeń
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/obiekty/raport")}
          >
            Generuj raport PDF
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

export default Obiekty