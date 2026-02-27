function Button({ children, onClick, variant = "primary", type = "button" }) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition duration-200 focus:outline-none"

  const variants = {
    primary:
      "bg-primary text-white hover:bg-blue-900",
    secondary:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    danger:
      "bg-danger text-white hover:bg-red-700",
    success:
      "bg-success text-white hover:bg-emerald-700",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button