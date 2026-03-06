import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Home, Wrench, Waves, Settings } from "lucide-react"

function BottomNav() {

  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const items = [
    {
      path: "/home",
      label: "Home",
      icon: <Home size={22} />
    },
    {
      path: "/obiekty",
      label: "Obiekty",
      icon: <Wrench size={22} />
    },
    {
      path: "/wodowskazy",
      label: "Wodowskazy",
      icon: <Waves size={22} />
    }
  ]

  if (user?.rola === "admin") {
    items.push({
      path: "/admin",
      label: "Admin",
      icon: <Settings size={22} />
    })
  }

  return (
    <div className="
      fixed
      bottom-0
      left-0
      right-0
      h-16
      bg-white
      dark:bg-darkbg
      border-t
      border-border
      dark:border-darkborder
      flex
      justify-around
      items-center
      z-[1000]
    ">

      {items.map((item) => {

        const active = location.pathname.startsWith(item.path)

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`
              flex
              flex-col
              items-center
              justify-center
              text-xs
              px-4
              py-2
              rounded-xl
              transition
              ${
                active
                  ? "bg-primary/20 text-primary dark:text-[#B9D6F2]"
                  : "text-gray-500 dark:text-gray-400"
              }
            `}
          >

            <span className="mb-1">
              {item.icon}
            </span>

            {item.label}

          </button>
        )
      })}

    </div>
  )
}

export default BottomNav