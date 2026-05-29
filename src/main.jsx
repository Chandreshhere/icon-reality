import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode disabled — GSAP ScrollTrigger pinning conflicts with strict-mode's
// double-mount (causes "removeChild" errors). No effect on production behavior.
createRoot(document.getElementById('root')).render(<App />)
