import './App.css';
import ChooseDiet from './components/ChooseDiet';
import Login from './components/Login';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Cookies from 'js-cookie';
import { useState } from 'react';

function App() {

  const [menuOpen,setMenuOpen] = useState(false);
  const accessToken = Cookies.get('accessToken');

  return (
    <div className="App">
      <NavBar menuOpen={menuOpen} setMenuOpen={() => setMenuOpen(!menuOpen)}/>
      <Login />
      <Footer />
    </div>
  );
}

export default App;
