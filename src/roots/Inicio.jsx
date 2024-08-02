import { useContext, useEffect, useState } from "react"
import { FiltersContext } from "../context/filters"
import maps from "../assets/marcador-de-posicion.png"
import calendar from "../assets/time-and-calendar.png"
import phone from "../assets/telefono.png"
import "../styles/Inicio.css"
import "../styles/info.css"
import todas_propiedades from "../propiedades.js"
import { CaruselPropiedades } from "../components/CaruselPropiedades.jsx"
import { Link } from "react-router-dom"
import { useFilters } from "../hooks/useFilter.jsx"
export function Inicio() {
    const { filtrado } = useFilters()
    const [propAlquiler, setPropAlquiler] = useState([])
    const [propCompra, setPropCompra] = useState([])

    useEffect(() => {
        async function fetching() {
            const fetchAlquiler = await fetch("http://localhost:8080/api/propiedades/filtrar/alquiler")
            const jsonAlquiler = await fetchAlquiler.json()
            console.log(jsonAlquiler)
            setPropAlquiler(jsonAlquiler)
            const fetchCompra = await fetch("http://localhost:8080/api/propiedades/filtrar/compra")
            const jsonCompra = await fetchCompra.json()
            console.log(jsonCompra)
            setPropCompra(jsonCompra)
        }

        fetching()
    }, [])
    return (
        <main className="mainInicio">
            <div className="imgContainer">
                <Filters />
            </div>

            <div className="infoContainer">
                <Info />
            </div>

            <div className="propiedadesContainer">
                
                    <h2>Propiedades en alquiler</h2>
                    <CaruselPropiedades tipo={"Alquiler"} propiedades={propAlquiler}></CaruselPropiedades>

                    <h2>Propiedades en venta</h2>
                    <CaruselPropiedades tipo={"Venta"} propiedades={propCompra}></CaruselPropiedades>
                
            </div>
        </main>
    )
}

function Filters() {
    const {setFilters, filtroVacio, filtrado} = useFilters()
    const [tipoCompra, setTipoCompra] = useState(filtrado.tipoNegocio || "Alquiler")
    const [tipoPropiedad, setTipoPropiedad] = useState(filtrado.propiedad || "Departamento")
    const [zona, setZona] = useState(filtrado.zona)

    useEffect(() => {
    }, [filtrado])
  
    function buscarPropiedades() {
        const newFilter = {...filtrado}
        if(tipoCompra) newFilter.tipoNegocio = tipoCompra
        if(tipoPropiedad) newFilter.propiedad = tipoPropiedad
        if(zona) {
            let lowZona = zona.toLowerCase()
            if(lowZona == "norte" ||lowZona == "sur" || lowZona == "este" || lowZona == "oeste" || lowZona == "centro")
             newFilter.zona = zona
        }
        console.log(newFilter)
        setFilters(newFilter)
    }

    return (
        <div className="filter-container">
            <section className="typeFilter-container">
                <input checked={tipoCompra == "Alquiler"} type="radio" onChange={(e) => setTipoCompra(e.target.id)} name="filter" id="Alquiler" />
                <label className="label-radio" htmlFor="Alquiler">Alquilar</label>

                <input checked={tipoCompra == "Compra"} type="radio" onChange={(e) => setTipoCompra(e.target.id)} name="filter" id="Compra"/>
                <label htmlFor="Compra">Compra</label>

                <input checked={tipoCompra == "Compra/Alquiler"} type="radio" onChange={(e) => setTipoCompra(e.target.id)} name="filter" id="Compra/Alquiler" />
                <label htmlFor="Compra/Alquiler">Compra/Alquilar</label>
            </section>
            <section className="inputText-container">
                <select onChange={(e) => setTipoPropiedad(e.target.value)} name="tipoPorpiedad" id="tipoPropiedad">
                    <option defaultValue={tipoPropiedad == "Departamento"}  value="Departamento">Departamento</option>
                    <option defaultValue={tipoPropiedad == "Casa"}  value="Casa">Casa</option>
                    <option defaultValue={tipoPropiedad == "Terreno/lote"}  value="Terreno/lote">Terreno</option>
                    <option defaultValue={tipoPropiedad == "Galpon"}  value="Galpon">Galpón</option>
                    <option defaultValue={tipoPropiedad == "Finca"}  value="Finca">Finca</option>
                    <option defaultValue={tipoPropiedad == "All"}  value="All">Todas</option>
                </select>

                <input onChange={(e) => setZona(e.target.value)} type="search" name="search" placeholder="Zona.ej Norte, sur, centro" id="inputSearch" />
                
                <Link className="button" to={"/propiedades"}  onClick={buscarPropiedades}> Buscar </Link>
            </section>
         
        </div>
    )
}

function Info() {
    return (
        <section className="inmobiliarioInfoConatiner">
            <div className="inmobiliarioInfoConatiner-info">
                <div className="img-container">
                    <img src={maps} alt="logo de ubicacion" />
                </div>
                <div className="infoContainer">
                    <p>Av Roca Ezquina y esquina Mitre</p>
                </div>
            </div>
            <div className="inmobiliarioInfoConatiner-info">
                <div className="img-container">
                    <img src={calendar} alt="logo de horario" />
                </div>
                <div className="infoContainer">
                    <p>Lunes a viernes: 8hs a 18hs</p>
                    <p>Sabados: 8hs a 13hs</p>
                </div>
            </div>
            <div className="inmobiliarioInfoConatiner-info">
                <div className="img-container">
                    <img src={phone} alt="logo de telefono" />
                </div>
                <div className="infoContainer">
                    <p>Telefono: 0385 4241468</p>
                    <p>Correo: Inmosalvatierra@gmail.com</p>
                </div>
            </div>
        </section>
    )
}

export function navigate (href) {
    const NAVIGATON_EVENT = "pushstate"
    window.history.pushState({}, "", href)
    const navigationEvent = new Event(NAVIGATON_EVENT)
    window.dispatchEvent(navigationEvent)
  }