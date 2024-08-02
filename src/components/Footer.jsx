import "./Footer.css"
import { Link } from "react-router-dom"
import fc from "../assets/facebook.png"
import ws from "../assets/whatsapp.png"
import ig from "../assets/instagram.png"
import fira from "../assets/Logo-Fira-removebg-preview.png"
import colegio from "../assets/colegio-removebg-preview.png"
export function Footer() {
    return(
        <footer>
            <div className="footerContainer">
                <section className="mapaSitio-contactoContainer">
                    <div className="mapaSitioContainer">
                        <h1>Mapa de sitio</h1>
                        <nav>
                            <ul>
                                <li><Link to="/">Inicio</Link></li>
                                <li><Link to="/propiedades">Propiedades</Link></li>
                                <li><Link to="/servicios">Servicios</Link></li>
                                <li><Link to="/sobreNosotros">Sobre nosotros</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="contactoContainer">
                        <h2>Contactános</h2>
                        <p>Escribenos a inmosalvatierra@gmail.com</p>
                        <h2>Seguinos</h2>
                        <div className="redesContainer">
                            <a href="https://www.facebook.com/inmosalvatierra" target="_blank" className="anclaRed"><img src={fc} alt="Logo facebook" /></a>
                            <a href="https://www.instagram.com/inmosalvatierra/" target="_blank" className="anclaRed"><img src={ig} alt="Logo Instagram" /></a>
                            <a href="https://api.whatsapp.com/send?phone=5493854930091" target="_blank" className="anclaRed"><img src={ws} alt="Logo Whatsapp" /></a>
                        </div>
                    </div>

                    <section className="fira-colegio-logosContainer">
                        <div><a target="_blank" href="https://www.fira.org.ar/"> <img src={fira} alt="Logo de Fira" /></a> </div>
                        <div><a href="" target="_blank"><img src={colegio} alt="Logo coelgio de inmobiliarios" /></a> </div> 
                    </section>
                </section>
            </div>
           
         
            <div className="esloganContainer">
                <h2>Tase bien venda mejor</h2>
            </div>
        </footer>
    )
    
}