import "./NavBar.css"

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
              <li>Home</li>
              <li>About</li>
              <li>Sign in</li>
              <li>Sign up</li>
          </ul>
      </nav>
      
  )
}

export default NavBar
