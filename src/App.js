import './App.css';
import AboutSection from './components/AboutSection';
import HomeSection from './components/HomeSection';
import MobileNav from './components/MobileNav';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {

  const [menuOpen,setMenuOpen] = useState(false);

  return (
    <div className="App">
      <NavBar menuOpen={menuOpen} setMenuOpen={() => setMenuOpen(!menuOpen)}/>
      <MobileNav menuOpen={menuOpen}/>
      <HomeSection/>
      <AboutSection />
    </div>
  );
}

export default App;
