import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Demo1 from './demo/Demo1'
import Demo2 from './demo/Demo2'
import Demo3 from './demo/Demo3'
import Demo4 from './demo/Demo4'
//import './index.css'
import './theme.css'
import './axiosConfig'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Demo1/> */}
    {/* <Demo2/> */}
    {/* <Demo3/> */}
    {/* <Demo4/> */}
  </StrictMode>,
)
