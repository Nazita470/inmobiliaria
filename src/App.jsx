import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Header } from './components/Header'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { VentanaContext, VentanaProvider } from './context/ventana.jsx'
import { Inicio } from './roots/Inicio.jsx'
import { Propiedades } from './roots/Propiedades.jsx'
import { Contacto } from './roots/Contacto.jsx'
import { SobreNos } from './roots/SobreNos.jsx'
import { Propiedad } from './roots/Propiedad.jsx'
import { FilterProvider } from './context/filters.jsx'
import { Footer } from './components/Footer.jsx'
import { Admin } from './roots/Admin.jsx'
import "./App.css"
import { useContext } from 'react'
import { Dashboard } from './roots/Dashboard.jsx'

export function App() {
  const mostrarVentana = useContext(VentanaContext).mostrarVentana
  useEffect(() => {
    console.log(mostrarVentana)
  }, [])
  return (
    <FilterProvider name={mostrarVentana ? "over-hidden" : ""}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/propiedades" element={<Propiedades />} />
            <Route path="/propiedad/:prop" element={<Propiedad />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sobreNosotros" element={<SobreNos />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </FilterProvider>
  );
}
