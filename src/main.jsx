import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes.jsx'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2600,
          style: {
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
          },
          error: {
            style: {
              background: '#DC2626',
              color: '#FFFFFF',
            },
          },
          success: {
            style: {
              background: '#059669',
              color: '#FFFFFF',
            },
          },
        }}
      />
    </Provider>
  </StrictMode>,
)

