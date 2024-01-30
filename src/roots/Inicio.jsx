import { useContext, useState } from "react"
import { FiltersContext } from "../context/filters"
import { Prop } from "../components/Prop"
import maps from "../assets/marcador-de-posicion.png"
import calendar from "../assets/time-and-calendar.png"
import phone from "../assets/telefono.png"
import "../styles/Inicio.css"
import "../styles/info.css"
export function Inicio() {
    return (
        <main>
            <div className="imgContainer">
                <Filters />
            </div>

            <div className="infoContainer">
                <Info />
            </div>

            <div className="propiedadesContainer">
                <h2>Propiedades en alquiler</h2>
                <PropContainer />

                <h2>Propiedades en venta</h2>
                <PropContainer />
                
            </div>
        </main>
    )
}

function Filters() {
    const [tipoCompra, setTipoCompra] = useState("Alquiler")
    const [tipoPropiedad, setTipoPropiedad] = useState("Departamento")
    const [zona, setZona] = useState("")
    const {setFilters} = useContext(FiltersContext)
    function buscar() {
        setFilters((prevState) => (
            {...prevState, 
            tipoNegocio: tipoCompra,
            propiedad: tipoPropiedad,
            zona: zona
            }
        ))
    }

    return (
        <div className="filter-container">
            <section className="typeFilter-container">
                <input type="radio" onChange={(e) => setTipoCompra(e.target.id)} name="filter" id="Alquiler" checked={tipoCompra == "Alquiler"} />
                <label className="label-radio" htmlFor="Alquiler">Alquilar</label>

                <input type="radio" onChange={(e) => setTipoCompra(e.target.id)} name="filter" id="Compra" />
                <label htmlFor="Compra">Compra</label>

                <input type="radio" onChange={(e) => setTipoCompra(e.target.id)} name="filter" id="Compra/Alquiler" />
                <label htmlFor="Compra/Alquiler">Compra/Alquilar</label>
            </section>
            <section className="inputText-container">
                <select onChange={(e) => setTipoPropiedad(e.target.value)} name="tipoPorpiedad" id="tipoPropiedad">
                    <option value="Departamento">Departamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Terreno/lote">Terreno</option>
                    <option value="Galpon">Galpón</option>
                </select>

                <input onChange={(e) => setZona(e.target.value)} type="search" name="search" placeholder="Zona.ej Norte, sur, centro" id="inputSearch" />
                <button onClick={buscar}>Buscar</button>
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

function PropContainer() {
    return(
    <>
        <div>
            <Prop></Prop>
        </div>
        <div>
        <button className="masInfoButton">Mas propiedades</button>
        </div>
    </>
    )
}