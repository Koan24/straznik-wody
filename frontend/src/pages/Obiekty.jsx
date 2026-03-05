import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

function Obiekty() {
  const navigate = useNavigate()

  return (
    <Layout title="Obiekty hydrotechniczne">

      <div className="flex flex-col items-center">

        <div className="w-full max-w-sm space-y-4">

          <button
            onClick={() => navigate("/obiekty/zgloszenie")}
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
            Zgłoś usterkę
          </button>

          <button
            onClick={() => navigate("/obiekty/lista")}
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
            Lista zgłoszeń
          </button>

          <button
            onClick={() => navigate("/obiekty/mapa")}
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
            Mapa zgłoszeń
          </button>

          <button
            onClick={() => navigate("/obiekty/raport")}
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
            Generuj raport PDF
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

export default Obiekty