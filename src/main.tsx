import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import '@/index.css'
import App from '@/App'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={App} />
    {/* Toast container agar global */}
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
  </StrictMode>,
)
