import React from 'react'
import ReactDOM from 'react-dom/client'
import { Header } from './components/Header'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Inicio } from './roots/Inicio.jsx'
import { Propiedades } from './roots/Propiedades.jsx'
import { Servicios } from './roots/Servicios.jsx'
import { SobreNos } from './roots/SobreNos.jsx'
import { Propiedad } from './roots/Propiedad.jsx'
import { FilterProvider } from './context/filters.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <FilterProvider>
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path='/' element={<Inicio />} />    
          <Route path='/propiedades' element={<Propiedades />} /> 
          <Route path='/propiedades/:prop' element={<Propiedad />} />       
          <Route path='/servicios' element={<Servicios />} />   
          <Route path='/sobreNosotros' element={<SobreNos />} />    
      </Routes>
    </BrowserRouter>
  </FilterProvider>,
)
