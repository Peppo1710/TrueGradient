import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/** Metadata of Developer 
 * {
 * 
        *  Name - Pradyumn Shirsath 
        *  Branch - CSE AIML
        *  Year - 4th year
        *  Job - SDE-Avionics at Paninian Aerospace & Freelancer
        *  Portfolio - https://pradyumn.co.in
 * 
 * }
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
