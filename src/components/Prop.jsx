import "./Prop.css"
import ducha from "../assets/ducha.png"
import habitacion from "../assets/cama.png"
import { Caruselmg } from "./Caruselmg"
import { useEffect } from "react"
import { Link } from "react-router-dom"
export function Prop({valorPropiedad}){
    useEffect(() => {
        console.log(valorPropiedad.img)
        console.log(valorPropiedad._id)
    }, [])
    return(
        <div className="propContainer">
            <div className="caruselPropContainer">
                    <Caruselmg  img={valorPropiedad.img}/>

            </div>
            <div className="infoContainer">
                <div>
                    <h1>{valorPropiedad.ubicacion}</h1>
                </div>
                <div className="infoPropContainer">
                    <p><img src={ducha} alt="" />Baños: {valorPropiedad.baños}</p>
                    <p><img src={habitacion} alt="" />Habitaciones: {valorPropiedad.dormitorios} </p>
                </div>
                <div className="buttonContainer">
                    <button><Link to={`/propiedad/${valorPropiedad._id}`}>Mas info</Link></button>
                </div>
            </div>
            
        </div>
    )
   
}