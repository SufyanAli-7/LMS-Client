import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './context/AppProvider'
import axios from 'axios'

if (import.meta.env.VITE_API_BASE_URL) {
  let url = import.meta.env.VITE_API_BASE_URL.trim();
  // Strip any accidental quotes
  url = url.replace(/^['"]|['"]$/g, '');
  
  // Force HTTPS if client site is loaded securely
  if (url.startsWith('http://') && window.location.protocol === 'https:') {
    url = url.replace('http://', 'https://');
  }
  
  axios.defaults.baseURL = url;
}

// Enable sending and saving cookies globally on all cross-site requests
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
