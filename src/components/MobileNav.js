import React from 'react'
import './MobileNav.css'
import {Link} from 'react-scroll'

const MobileNav = ({menuOpen}) => {
  return (
      <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
        <ul className="mobile-links">
              <Link to="home" smooth={true} offset={-95} duration={500}><li>Home</li></Link>
              <Link to="about" smooth={true} offset={-95} duration={500}><li>About</li></Link>
              <li>Sign in</li>
              <li>Sign up</li>
          </ul>
      </div>
  )
}

export default MobileNav
