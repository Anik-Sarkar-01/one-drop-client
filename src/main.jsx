import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Route from './Routes/Route';
import AuthProvider from './provider/AuthProvider';
import { Toaster } from 'react-hot-toast';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import 'react-photo-view/dist/react-photo-view.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='poppins-regular'>
          <RouterProvider router={Route} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
    <Toaster></Toaster>
  </StrictMode >
)
