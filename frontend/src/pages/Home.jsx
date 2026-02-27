import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-darkbg transition-colors duration-300">
      
      <div className="bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-card border border-gray-200 dark:border-gray-700 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌊</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Strażnik Wody
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            System monitoringu infrastruktury wodnej
          </div>
        </div>

        <div className="space-y-4">
          
          <Button
            variant="primary"
            onClick={() => navigate("/obiekty")}
          >
            Obiekty hydrotechniczne
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/wodowskazy")}
          >
            Wodowskazy
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/admin")}
          >
            Panel administratora
          </Button>

        </div>

      </div>
    </div>
  )
}

export default Home