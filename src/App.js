import './App.css';
import ChooseDiet from './components/ChooseDiet';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {

  const [menuOpen,setMenuOpen] = useState(false);

  return (
    <div className="App">
      <NavBar menuOpen={menuOpen} setMenuOpen={() => setMenuOpen(!menuOpen)}/>
      <ChooseDiet />
      <Footer />
    </div>
  );
}

export default App;
