import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

function FAB() {

  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  if (location.pathname !== "/home") return null

  return (
    <div className="fixed bottom-24 right-6 flex flex-col items-end space-y-3 z-[1000]">

      {open && (
        <>
          <button
            onClick={() => navigate("/obiekty/zgloszenie")}
            className="px-4 py-2 rounded-lg bg-primary text-white shadow-lg"
          >
            Dodaj zgłoszenie
          </button>

          <button
            onClick={() => navigate("/wodowskazy/pomiar")}
            className="px-4 py-2 rounded-lg bg-primary text-white shadow-lg"
          >
            Dodaj pomiar
          </button>
        </>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="
          w-14 h-14 rounded-full
          bg-primary text-white
          text-3xl
          flex items-center justify-center
          shadow-lg
          hover:scale-105
          transition
        "
      >
        +
      </button>

    </div>
  )
}

export default FAB