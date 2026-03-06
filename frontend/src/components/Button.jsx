function Button({ children, onClick, variant = "primary", type = "button", disabled = false, className = "" }) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition duration-200 focus:outline-none active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "bg-primary hover:bg-primaryHover text-[#061A40] dark:bg-darkprimary dark:hover:bg-darkprimaryHover dark:text-[#B9D6F2]",

    secondary:
      "border border-primary text-primary hover:bg-primary hover:text-[#061A40] dark:border-darkprimary dark:text-[#B9D6F2] dark:hover:bg-darkprimary",

    danger:
      "bg-danger hover:brightness-110 text-white",

    success:
      "bg-success hover:brightness-110 text-white",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button