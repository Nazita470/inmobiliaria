import { App } from './App'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { VentanaProvider } from './context/ventana'

ReactDOM.createRoot(document.getElementById('root')).render(
  <VentanaProvider>
    <App />
  </VentanaProvider>

)
