import { useState } from "react"

function FloatingInput({
  label,
  type = "text",
  value,
  onChange
}) {
  const [focused, setFocused] = useState(false)

  const active = focused || value

  return (
    <div className="relative w-full">

      <label
        className={`
          absolute
          left-3
          transition-all
          duration-200
          pointer-events-none
          ${
            active
              ? "text-xs -top-2 bg-white dark:bg-darkbg px-1 text-primary"
              : "top-3 text-gray-500 dark:text-gray-400"
          }
        `}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="
         w-full
         px-3
         pt-5
         pb-2
         rounded-lg
         border
         border-border
         dark:border-darkborder
         bg-surface
         dark:bg-darksurface
         text-foreground dark:text-white
         placeholder:text-gray-400 dark:placeholder:text-gray-500
         focus:outline-none
         focus:ring-2
         focus:ring-primary
         transition
      "    
      />

    </div>
  )
}

export default FloatingInput