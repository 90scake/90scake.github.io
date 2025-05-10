import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { CakeProvider } from './context/CakeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CakeProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </CakeProvider>
    </BrowserRouter>
  </StrictMode>,
)