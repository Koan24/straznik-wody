import { useNavigate } from "react-router-dom"
import { useWodowskazy } from "../context/WodowskazyContext"
import Layout from "../components/Layout"
import Button from "../components/Button"
import Card from "../components/Card"

function ArchiwumPomiarow() {
  const navigate = useNavigate()
  const { pomiary, usunPomiar } = useWodowskazy()

  return (
    <Layout title="Archiwum pomiarów">

      <div className="space-y-6">

        {pomiary.length === 0 && (
          <Card>
            <div className="text-gray-600 dark:text-[#93C1DD] dark:text-gray-300">
              Brak zapisanych pomiarów
            </div>
          </Card>
        )}

        {pomiary.map(p => (
          <Card key={p.id}>
            <div className="flex justify-between items-center">

              <div>
                <div className="font-semibold">
                  {p.wartosc} cm
                </div>
                <div className="text-sm text-gray-600 dark:text-[#93C1DD] dark:text-gray-300">
                  {p.data}
                </div>
              </div>

              <Button
                variant="danger"
                onClick={() => usunPomiar(p.id)}
              >
                Usuń
              </Button>

            </div>
          </Card>
        ))}

        <Button
          variant="secondary"
          onClick={() => navigate("/wodowskazy")}
        >
          Powrót
        </Button>

      </div>

    </Layout>
  )
}

export default ArchiwumPomiarow