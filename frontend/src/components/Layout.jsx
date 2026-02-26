import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

function Layout({ children, title }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <div style={wrapperStyle(theme)}>
      <header style={headerStyle}>
        <h3 style={{ margin: 0 }}>{title}</h3>

        <div>
          <button
            style={homeButton}
            onClick={() => navigate("/home")}
          >
            Strona główna
          </button>

          <button
            style={themeButton}
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙 Dark" : "☀ Light"}
          </button>
        </div>
      </header>

      <div style={contentStyle}>
        {children}
      </div>
    </div>
  )
}

const wrapperStyle = (theme) => ({
  minHeight: "100vh",
  backgroundColor: theme === "light" ? "#f4f6f8" : "#0f172a",
  color: theme === "light" ? "#000" : "#fff"
})

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  backgroundColor: "#1e293b",
  color: "white"
}

const homeButton = {
  backgroundColor: "#3b82f6",
  border: "none",
  padding: "6px 12px",
  color: "white",
  cursor: "pointer"
}

const themeButton = {
  marginLeft: "10px",
  backgroundColor: "#10b981",
  border: "none",
  padding: "6px 12px",
  color: "white",
  cursor: "pointer"
}

const contentStyle = {
  padding: "20px"
}

export default Layout