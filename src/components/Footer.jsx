import React from "react"
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi"
import "./Footer.css"

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>checkout more amazing sites like this on my GitHub</p>
        <div className="social-links">
          <a href="https://github.com/noveshk7" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

