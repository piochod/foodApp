import { Link } from "react-router-dom";
import "./NavBar.css"
import Cookies from "js-cookie"

const NavBar = ({
  menuOpen, setMenuOpen
}) => {

  const handleLogout = () =>{
    
    Cookies.remove('accessToken');
    window.location.href = 'http://localhost:3000/foodApp/';
  }


  const moveHome = () =>{
    Cookies.get('accessToken') ? window.location.href='http://localhost:3000/foodApp/home' : window.location.href= 'http://localhost:3000/foodApp/';
  }

  return (
      <nav className='navbar'>
        <div className='menu' onClick={setMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        <div className='logo'>
            <img src={require("./img/cutlery.png")} alt="cutlery" onClick={moveHome}/>
        </div>
          <ul className="links">
          {
            Cookies.get('accessToken') ? <li onClick={handleLogout}>Log out</li> : <><li><Link to='http://localhost:3000/foodApp/login'>Sign in</Link></li> <li><Link to='http://localhost:3000/foodApp/register'>Sign up</Link></li></>

              
          }
          </ul>
      </nav>
      
  )
}

export default NavBar
