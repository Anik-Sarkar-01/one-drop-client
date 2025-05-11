import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Route from './Routes/Route';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='poppins-regular'>
      <RouterProvider router={Route} />
    </div>
  </StrictMode>,
)
