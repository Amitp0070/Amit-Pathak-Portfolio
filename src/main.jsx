import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initVisitorTracking } from './tracking/visitorTracker.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Passive visitor tracking — runs after first paint, never blocks the UI.
const startTracking = () => initVisitorTracking().catch(() => {})
if ('requestIdleCallback' in window) requestIdleCallback(startTracking)
else setTimeout(startTracking, 1200)
