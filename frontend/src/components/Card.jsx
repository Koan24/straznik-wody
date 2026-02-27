function Card({ children }) {
  return (
    <div className="
      bg-white 
      dark:bg-slate-800 
      text-gray-800 
      dark:text-gray-100 
      p-6 
      rounded-xl 
      shadow-card 
      border 
      border-gray-200 
      dark:border-gray-700 
      transition
    ">
      {children}
    </div>
  )
}

export default Card