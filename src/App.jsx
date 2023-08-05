// import { useState } from 'react'
// import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
// import './App.css'

// import LandingPage from './pages/Landingpage'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route >
//       <Route index element={<LandingPage />} />
//       <Route path="storybot" element={<HomePage />} />
     
//     </Route>
//   )
// )
// function App() {
 

//   return (
//     <>
//       <RouterProvider router={router}/>
//     </>
//   )
// }

// export default App
import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css'
import HomePage from './pages/Home'
import LandingPage from './pages/Landingpage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route index element={<LandingPage />} />
      <Route path="storybot" element={<HomePage />} />
     
    </Route>
  )
)
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App