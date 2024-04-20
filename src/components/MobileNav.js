import React from 'react'
import './MobileNav.css'

const MobileNav = ({menuOpen}) => {
  return (
      <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
        <ul className="mobile-links">
              <li>Home</li>
              <li>About</li>
              <li>Sign in</li>
              <li>Sign up</li>
          </ul>
      </div>
  )
}

export default MobileNav
