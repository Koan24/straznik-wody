import { createContext, useContext, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed top-5 right-5 z-50 space-y-3">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className={`
                px-5 py-3 rounded-xl shadow-lg text-white
                ${toast.type === "success" ? "bg-green-500" : ""}
                ${toast.type === "error" ? "bg-red-500" : ""}
                ${toast.type === "info" ? "bg-blue-500" : ""}
              `}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}