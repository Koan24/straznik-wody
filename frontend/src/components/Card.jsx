import { motion } from "framer-motion"

function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-gray-200 dark:border-gray-700 p-6"
    >
      {children}
    </motion.div>
  )
}

export default Card