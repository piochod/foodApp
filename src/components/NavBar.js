import "./NavBar.css"
import {Link} from 'react-scroll'

const NavBar = ({
  menuOpen, setMenuOpen
}) => {


  return (
      <nav className='navbar'>
        <div className='menu' onClick={setMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        <div className='logo'>
            <img src={require("./img/cutlery.png")} alt="cutlery"/>
        </div>
          <ul className="links">
              <Link to="home" smooth={true} offset={-95} duration={500}><li>Home</li></Link>
              <Link to="about" smooth={true} offset={-95} duration={500}><li>About</li></Link>
              <li>Sign in</li>
              <li>Sign up</li>
          </ul>
      </nav>
      
  )
}

export default NavBar
