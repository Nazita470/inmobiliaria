import "./PropiedadGrande.css"
import { Caruselmg } from "../components/Caruselmg"
import { Link, useSearchParams } from "react-router-dom"
import rule from "../assets/gobernante.png"
import bed from "../assets/cama.png"
import door from "../assets/puerta-abierta.png"
import bath from "../assets/ducha.png"
import expandir from "../assets/expandir.png"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { Consulta } from "./Consulta"
export function PropiedadGrande({prop}) {
    useEffect(() => {
        console.log(prop)
    }, [prop])

    function handleButtonClick() {
        console.log("Click")
    }
    return(
    <>
        
        <div id={prop.id} className="propiedadGrandeContainer">
            
            <div className="propCaruselContainer">
           
                <Caruselmg img={prop.img} ></Caruselmg>


            </div>

         

            <div className="propIfoContainer">
                <Link target="_blank" className="linkContainer" to={`/propiedad/${prop._id}`}>
                        <div className="info-PrecioUbicacion">
                            <p>${prop.precio}</p>
                            <div className="info-PrecioUbicacion-separacion"></div>
                            <p >{prop.ubicacion}</p>
                        </div>
                        <div className="info-description">
                            <div className="info-description-caractContainer">
                                <p><img src={expandir} alt="" />{prop.diametro}m2</p>
                                <p><img src={bed} alt="" />{prop.dormitorios}</p>
                                <p><img src={door} alt="" />{prop.ambientes}</p>
                                <p><img src={bath} alt="" />{prop.baños}</p>
                            </div>
                            <div className="info-description-infoContainer">
                                <h2 id="h2Description">{prop.propiedad} en {prop.tipoNegocio} en {prop.ubicacion}</h2>
                                <p>{prop.descripcion.slice(0,100)}...</p>
                            </div>
                        </div>    
                </Link>
               
                <div className="infoButton-separacion"></div>
                <div className="info-button">
                    <p>{prop.propiedad}</p>
                    <button onClick={handleButtonClick}>Contactar</button>
                </div>
            </div>
        </div>

    </>
        
    )
}