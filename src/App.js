import './App.css';
import AboutSection from './components/AboutSection';
import HomeSection from './components/HomeSection';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <HomeSection/>
      <AboutSection />
    </div>
  );
}

export default App;
