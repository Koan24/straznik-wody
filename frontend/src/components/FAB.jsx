import { useNavigate, useLocation } from "react-router-dom"

function FAB() {

  const navigate = useNavigate()
  const location = useLocation()

  let action = null

  if (location.pathname.startsWith("/obiekty")) {
    action = () => navigate("/obiekty/zgloszenie")
  }

  if (location.pathname.startsWith("/wodowskazy")) {
    action = () => navigate("/wodowskazy/dodaj")
  }

  if (!action) return null

  return (
    <button
      onClick={action}
      className="
        fixed
        bottom-24
        right-6
        w-14
        h-14
        rounded-full
        bg-primary hover:bg-primaryHover
        text-[#061A40]
        dark:bg-darkprimary dar:hover:bg-darkprimaryHover
        dark:text-[#B9D6F2]
        text-3xl
        flex
        items-center
        justify-center
        shadow-lg
        hover:scale-105
        active:scale-95
        transition
        z-[1000]
      "
    >
      +
    </button>
  )
}

export default FAB