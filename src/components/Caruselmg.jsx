import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./CaruseImg.css"
import { useState } from 'react';
import adelante from "../assets/adelante.png"
import atras from "../assets/atras.png"

export function Caruselmg({img}){
    const [index, setIndex] = useState(0)
    const [disabledAdelante, setDisabledAdelante] = useState(false)
    const [disabledAtras, setDisabledAtras] = useState(false)

    function handleButtonClick(e) {
        let id = e.target.id
        console.log(id)
        console.log(index)

        if(id == 1) {
            if((index + 1) <= (img.length - 1)) {
                console.log("pasa")
                setIndex(index + 1)
                disabledAtras && setDisabledAtras(false)
            }else {
                setDisabledAdelante(true)
            }
        }else {
            if((index - 1) >= 0) {
                setIndex(index - 1)
                disabledAdelante && setDisabledAdelante(false)
            }else {
                setDisabledAtras(true)
            }
        }
    }
   
    return (
        <div className='carusel'>
            <button disabled={disabledAtras} onClick={handleButtonClick} className='botonAtras' id="0"><img  id="0" src={atras} alt="" /></button>
            <img className='imagen' src={img[index]} alt="imagen" />
            <button disabled={disabledAdelante} onClick={handleButtonClick} className='botonAdelante' id="1"><img  id="1" src={adelante} alt="" /></button>
        </div>
    )
}
