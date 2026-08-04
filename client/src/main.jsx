import { StrictMode } from 'react'
import {RouterProvider ,createBrowserRouter} from "react-router"
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './components/App.jsx'
import Game from './components/game.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {path:'/:id',
    element:<Game/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
