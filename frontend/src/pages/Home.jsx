import { useNavigate } from "react-router-dom"
import { useZgloszenia } from "../context/ZgloszeniaContext"
import { useWodowskazy } from "../context/WodowskazyContext"
import Layout from "../components/Layout"
import Card from "../components/Card"
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
    <Layout title="Panel systemu">

      <div className="space-y-6">

        <Card>
          <div className="space-y-4">

            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Liczba zgłoszeń
                </div>
                <AnimatedNumber value={zgloszenia.length} />
              </div>

              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Wodowskazy
                </div>
                <AnimatedNumber value={wodowskazy.length} />
              </div>
            </div>

          </div>
        </Card>

        <Card>
          <div className="space-y-3">

            <div className="font-semibold">
              Ostatnie zgłoszenie
            </div>

            {ostatnieZgloszenie ? (
              <div>
                <div className="font-medium">
                  {ostatnieZgloszenie.tytul}
                </div>
                <div className="text-gray-600 dark:text-[#93C1DD]">
                  {ostatnieZgloszenie.opis}
                </div>
              </div>
            ) : (
              <div className="text-gray-500">
                Brak zgłoszeń
              </div>
            )}

          </div>
        </Card>

        <div className="space-y-4">

          <button
            onClick={() => navigate("/obiekty")}
            className="
              w-full
              py-5
              rounded-xl
              bg-primary
              text-white
              text-lg
              font-semibold
              shadow-md
              active:scale-[0.98]
              transition
            "
          >
            Obiekty hydrotechniczne
          </button>

          <button
            onClick={() => navigate("/wodowskazy")}
            className="
              w-full
              py-5
              rounded-xl
              bg-primary
              text-white
              text-lg
              font-semibold
              shadow-md
              active:scale-[0.98]
              transition
            "
          >
            Wodowskazy
          </button>

        </div>

      </div>

    </Layout>
  )
}

export default Home