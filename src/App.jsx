
import { useState , useContext} from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import HomePage from './pages/Home'
import LandingPage from './pages/Landingpage'
import Navbar from './Components/Nav/Navbar';
import Register from './pages/Register.jsx';
import Login from './pages/login';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route index element={<><Navbar/><LandingPage /></>} />
      <Route path="storybot" element={<HomePage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
)
function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
