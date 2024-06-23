import './App.css';
import Cookies from 'js-cookie';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  redirect
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoogedHomePage from './pages/LoogedHomePage';
import ChoicePage from './pages/ChoicePage';

function App() {


  function checkAuth() {
    const token = Cookies.get('accessToken');
    if (!token) {
      throw redirect('http://localhost:3000/foodApp/');
    }
    return null;
  }

  function checkNotAuth() {
    const token = Cookies.get('accessToken');
    if (token) {
      throw redirect('http://localhost:3000/foodApp/home')
    }
    return null;
    
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/foodApp" element={<HomePage />} loader={checkNotAuth}/>
        <Route path="/foodApp/login" element={<LoginPage />} loader={checkNotAuth}/> 
        <Route path="/foodApp/register" element={<RegisterPage />} loader={checkNotAuth}/>
        <Route path='/foodApp/home'   
        element = {<LoogedHomePage />}
        loader = {checkAuth}  />      
        <Route path='/foodApp/addList' element={<ChoicePage />} loader={checkAuth} />
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
