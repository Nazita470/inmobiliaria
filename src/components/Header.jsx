import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import "./Header.css"
import { useState } from "react"
export function Header(){
    const [mostrarLinks, setMostrarLinks] = useState(false)
    return (
        <header>
            <div className="logo-links-container">
                <div>
                    <Link to={"/"}><img src={logo} alt="Logo inmobiliaria" /></Link>
                </div>

                <div className="bar-icon-conatiner">
                    <button onClick={() => setMostrarLinks(!mostrarLinks)}>
                        {
                            mostrarLinks ? 
                            <span className="material-symbols-outlined">close</span>
                            :
                            <span className="material-symbols-outlined">
                            menu
                            </span>
                        }
                       
                    </button>
                </div>

                {
                    mostrarLinks && <ResponsiveLinks/>
                }

                <div className="links-container">  
                    <Link className="link-header" to="/">Inicio</Link>
                    <Link className="link-header"  to="/propiedades">Propiedades</Link>
                    <Link className="link-header" to="/servicios">Servicios</Link>
                    <Link className="link-header" to="/sobreNosotros">Sobre Nosotros</Link>                 
                </div>
            </div>
        </header>
    )
}

function ResponsiveLinks() {
    return(
        <div className="links-responsive">
        
            <div className="links">
                    <nav>
                        <ul>
                            <li><Link className="link-header" to="/">Inicio</Link></li>
                            <li><Link className="link-header"  to="/propiedades">Propiedades</Link></li>
                            <li><Link className="link-header" to="/servicios">Servicios</Link></li>
                            <li><Link className="link-header" to="/sobreNosotros">Sobre Nosotros</Link></li>
                        </ul>
                    </nav>
                   
            </div>
        </div>
    )
}