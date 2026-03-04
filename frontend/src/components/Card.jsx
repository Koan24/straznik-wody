import { motion } from "framer-motion"

function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        bg-surface 
        dark:bg-darksurface 
        rounded-2xl 
        shadow-card 
        border 
        border-border 
        dark:border-darkborder 
        p-6
      "
    >
      {children}
    </motion.div>
  )
}

export default Card