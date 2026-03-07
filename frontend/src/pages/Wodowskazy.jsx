import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

function Wodowskazy() {
  const navigate = useNavigate()

  return (
    <Layout title="Wodowskazy">

      <div className="flex flex-col items-center">

        <div className="w-full max-w-sm space-y-4">

          <button
            onClick={() => navigate("/wodowskazy/dodaj")}
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
            Dodaj wodowskaz
          </button>

          <button
            onClick={() => navigate("/wodowskazy/mapa")}
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
            Mapa wodowskazów
          </button>

          <button
            // variant="primary"
            onClick={() => navigate("/wodowskazy/pomiar")}
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
            Dodaj pomiar
          </button>

          <button
            onClick={() => navigate("/home")}
            className="
              w-full
              py-4
              rounded-xl
              border
              border-border
              dark:border-darkborder
              text-gray-700
              dark:text-gray-300
              hover:bg-surface
              dark:hover:bg-darksurface
              transition
            "
          >
            Powrót
          </button>

        </div>

      </div>

    </Layout>
  )
}

export default Wodowskazy