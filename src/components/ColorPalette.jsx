import React from "react"
import { FiCopy } from "react-icons/fi"
import "./ColorPalette.css"

function ColorPalette({ colors }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Color code copied to clipboard!")
    })
  }

  return (
    <div className="color-palette">
      {colors.map((color, index) => (
        <div key={index} className="color-rectangle" style={{ backgroundColor: color.code }}>
          <div className="color-info">
            <span className="color-code">{color.code}</span>
            <span className="color-name">{color.name}</span>
          </div>
          <button className="copy-button" onClick={() => copyToClipboard(color.code)}>
            <FiCopy /> Copy
          </button>
        </div>
      ))}
    </div>
  )
}

export default ColorPalette

