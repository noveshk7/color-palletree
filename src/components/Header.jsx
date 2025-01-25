import React from "react"
import { FiMoon, FiSun } from "react-icons/fi"
import "./Header.css"

function Header({ darkMode, setDarkMode }) {
  return (
    <header>
      <div className="header-content">
        <h1>Color Palette Generator</h1>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  )
}

export default Header

