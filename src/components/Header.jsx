import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import "./Header.css"
import { useEffect, useState } from "react"
export function Header(){
    const [mostrarLinks, setMostrarLinks] = useState(false)
    const [render, setRender] = useState(false)

    useEffect(() => {
        setMostrarLinks(false)
    }, [render])
   
    return (
        <>
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

                

                <div className="links-container">  
                    <Link className="link-header" to="/">Inicio</Link>
                    <Link className="link-header"  to="/propiedades">Propiedades</Link>
                    <Link className="link-header" to="/sobreNosotros">Sobre Nosotros</Link>     
                    <Link className="link-header" to="/contacto">Contacto</Link>

                </div>
            </div>

      
        </header>
              {
                mostrarLinks && <ResponsiveLinks setRender={setRender} render={render}/>
                }
        </>
    )
}

function ResponsiveLinks({setRender, render}) {
    return(
        <div className="links-responsive">
        
            <div className="links">
                    <nav>
                        <ul>
                            <li><Link onClick={() => setRender(!render)} className="link-header" to="/">Inicio</Link></li>
                            <li><Link onClick={() => setRender(!render)} className="link-header"  to="/propiedades">Propiedades</Link></li>
                            <li><Link onClick={() => setRender(!render)} className="link-header" to="/sobreNosotros">Sobre Nosotros</Link></li>
                            <li><Link onClick={() => setRender(!render)} className="link-header" to="/contacto">Contacto</Link></li>

                        </ul>
                    </nav>
                   
            </div>
        </div>
    )
}