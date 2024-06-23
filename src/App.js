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
import HomePage from './pages/HomePage';
import LoogedHomePage from './pages/LoogedHomePage';
import ChoicePage from './pages/ChoicePage';

function App() {


  function checkAuth() {
    const token = Cookies.get('accessToken');
    if (!token) {
      throw redirect('/foodApp/login');
    }
    return null;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/foodApp" element={<HomePage />} />
        <Route path="/foodApp/login" element={<LoginPage />}/> 
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
