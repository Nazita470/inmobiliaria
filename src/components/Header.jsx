import { Link } from "react-router-dom"
export function Header(){
    return (
        <header>
            <img src="" alt="Logo inmobiliaria" />
            <Link  to="/">Inicio</Link>
            <Link  to="/propiedades">Propiedades</Link>
            <Link  to="/servicios">Servicios</Link>
            <Link  to="/sobreNosotros">Sobre Nosotros</Link>
        </header>
    )
}