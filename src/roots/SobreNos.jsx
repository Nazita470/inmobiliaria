import { useEffect } from "react"
import "../styles/SobreNosotros.css"
import colegio from "../assets/colegio-removebg-preview.png"
import fira from "../assets/Logo-Fira-removebg-preview.png"
export function SobreNos() {
    useEffect(() => {
        document.title = "Sobre nosotros | inmosalvatierra"
    }, [])
    return (
        <>
            <main className="mainContainer">
                <h1>Nuestra empresa</h1>
                <section className="textContainer">
                    <div>
                        Somos una empresa familiar con más de treinta y cinco años 
                        de experiencia en el mercado inmobiliario de nuestra provincia. A lo largo de
                        estos años impulsados por un ferviente compromiso de 
                        responsabilidad profesional, nos hemos transformado en un 
                        importante referente de la actividad inmobiliaria de nuestra 
                        provincia.
                    </div>

                    <div>
                        La obligación de devolver con agilidad, 
                        eficacia, ética, transparencia, responsabilidad
                        y seriedad la confianza que han depositado en
                        nosotros, tanto nuestros propietarios para 
                        la comercialización de sus inmuebles como la 
                        de nuestros inquilinos y clientes en general,
                        es el eje fundamental de nuestra labor a diario.
                        Por ello ofrecemos atención personalizada con 
                        profesionales en constante capacitación.
                    </div>

                    <div className="divImg">
                        <div className="imgContainer">
                            <img src={colegio} alt="Logo de Colegio inmobiliario de Sgo del Estero" />
                            <img src={fira} alt="Logo de Fira(Federacion Inmobiliaria de la Republica Argentina" />
                        </div>
                        
                        <p>
                            Inmobiliaria Salvatierra SRL participa activamente 
                            en las diferentes instituciones que representan la 
                            actividad en el país y en la provincia desde sus 
                            inicios, concurriendo a congresos nacionales e 
                            internacionales y en permanente colaboración con 
                            la Federación Inmobiliaria de la República Argentina 
                            y la Cámara Inmobiliaria Argentina, logrando el 
                            reconocimiento de nuestra labor en dichas 
                            instituciones y con el orgullo de haber formado 
                            parte de un importantísimo logro: la creación del 
                            Colegio de Corredores Inmobiliarios de la Provincia 
                            de Santiago del Estero (CCPISE).
                        </p>
                    </div>
                </section>
                
            </main>
        </>
    ) 
}