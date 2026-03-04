import { useNavigate } from "react-router-dom"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import { useWodowskazy } from "../context/WodowskazyContext"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import { motion } from "framer-motion"

function AnimatedNumber({ value }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="text-4xl font-bold text-primary dark:text-water"
    >
      {value}
    </motion.span>
  )
}

function Home() {
  const navigate = useNavigate()
  const { zgloszenia } = useZgloszenia()
  const { wodowskazy } = useWodowskazy()

  const ostatnieZgloszenie =
    zgloszenia.length > 0
      ? zgloszenia[zgloszenia.length - 1]
      : null

  return (
    <Layout title="Panel systemu" showHomeButton={false}>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <Card>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Liczba zgłoszeń
          </div>
          <AnimatedNumber value={zgloszenia.length} />
        </Card>

        <Card>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Liczba wodowskazów
          </div>
          <AnimatedNumber value={wodowskazy.length} />
        </Card>

        <Card>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Status systemu
          </div>
          <div className="text-green-500 font-semibold">
            Aktywny
          </div>
        </Card>

      </div>

      <Card>
        <div className="space-y-4">

          <div className="font-semibold text-lg">
            Ostatnie zgłoszenie
          </div>

          {ostatnieZgloszenie ? (
            <div>
              <div className="font-medium">
                {ostatnieZgloszenie.tytul}
              </div>
              <div className="text-gray-600 dark:text-[#93C1DD] dark:text-gray-400">
                {ostatnieZgloszenie.opis}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">
              Brak zgłoszeń
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              variant="primary"
              onClick={() => navigate("/obiekty")}
            >
              Przejdź do obiektów
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/wodowskazy")}
            >
              Przejdź do wodowskazów
            </Button>
          </div>

        </div>
      </Card>

    </Layout>
  )
}

export default Home