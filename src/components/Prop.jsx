import "./Prop.css"
import ducha from "../assets/ducha.png"
import habitacion from "../assets/cama.png"
import { Caruselmg } from "./Caruselmg"
import img from "../assets/pexels-binyamin-mellish-106399.jpg"
import img2 from "../assets/pexels-expect-best-323780.jpg"
import img3 from "../assets/pexels-frans-van-heerden-1438832.jpg"
export function Prop(){
    return(
        <div className="propContainer">
            <div className="caruselPropContainer">
                <Caruselmg  img={[img, img2, img3]}/>
            </div>
            <div className="infoContainer">
                <div>
                    <h1>Av Roca 345 y ezquina mitre</h1>
                </div>
                <div className="infoPropContainer">
                    <p><img src={ducha} alt="" />Baños: 2</p>
                    <p><img src={habitacion} alt="" />Habitaciones: 2 </p>
                </div>
                <div className="buttonContainer">
                    <button>Mas info</button>
                </div>
            </div>
            
        </div>
    )
   
}