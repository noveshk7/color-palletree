import React, { useState, useEffect, useCallback, useRef } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Header from "./components/Header"
import ColorPalette from "./components/ColorPalette"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [colors, setColors] = useState([])
  const [paletteHistory, setPaletteHistory] = useState([])
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState(-1)

  // Create a ref to track the latest generatePalette function
  const generatePaletteRef = useRef(() => {})

  const generatePalette = useCallback(() => {
    const newColors = Array.from({ length: 5 }, () => ({
      code: generateRandomColor(),
      name: generateColorName(),
    }))
    
    setColors(newColors)
    setPaletteHistory(prev => {
      const updatedHistory = [...prev.slice(0, currentPaletteIndex + 1), newColors]
      return updatedHistory
    })
    setCurrentPaletteIndex(prev => prev + 1)
  }, [currentPaletteIndex])

  useEffect(() => {
    generatePaletteRef.current = generatePalette
  }, [generatePalette])

  useEffect(() => {
    generatePaletteRef.current() // Generate initial palette
    
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault()
        generatePaletteRef.current()
      }
    }
    
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
  }

  const generateColorName = () => {
    const adjectives = ["Vibrant", "Muted", "Pastel", "Deep", "Bright"]
    const nouns = ["Sky", "Ocean", "Forest", "Sunset", "Desert"]
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`
  }

  const goToPreviousPalette = () => {
    if (currentPaletteIndex > 0) {
      setCurrentPaletteIndex(prev => prev - 1)
      setColors(paletteHistory[currentPaletteIndex - 1])
    }
  }

  const goToNextPalette = () => {
    if (currentPaletteIndex < paletteHistory.length - 1) {
      setCurrentPaletteIndex(prev => prev + 1)
      setColors(paletteHistory[currentPaletteIndex + 1])
    } else {
      generatePaletteRef.current()
    }
  }

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <p className="instruction">Press  <strong>Spacebar</strong>  to generate a new palette</p>
        <ColorPalette colors={colors} />
        <div className="navigation">
          <button 
            onClick={goToPreviousPalette} 
            disabled={currentPaletteIndex <= 0}
          >
            <FiChevronLeft /> Previous
          </button>
          <button onClick={goToNextPalette}>
            Next <FiChevronRight />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App