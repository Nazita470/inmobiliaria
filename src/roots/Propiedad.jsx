import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import todas_propiedades from "../propiedades.js";
import "../styles/PropiedadPage.css";
import { Caruselmg } from "../components/Caruselmg.jsx";
import { Consulta } from "../components/Consulta.jsx";
import { Link } from "react-router-dom";

import shower from "../assets/ducha.png";
import bedromm from "../assets/cama.png";
import door from "../assets/puerta-abierta.png";
import rule from "../assets/gobernante.png";
import expandir from "../assets/expandir.png";
import { useContext } from "react";
import { VentanaContext } from "../context/ventana.jsx";
export function Propiedad() {
  const param = useParams().prop;
  const [propiedad, setPropiedad] = useState(null)
  const [preguntas, setPreguntas] = useState([]);
  const [leerMas, setLeerMas] = useState(true);
  const setMostrarVentana = useContext(VentanaContext).setMostrarVentana
  const mostrarVentana = useContext(VentanaContext).mostrarVentana
  const [indexImg, setIndexImg] = useState(0)

  useEffect(() => {
    console.log(preguntas);
    console.log(propiedad);
  }, [preguntas]);

  useEffect(() => {
    async function fetching(){
      console.log(param)
      const result =  await fetch(`http://localhost:8080/api/propiedades/${param}`)
      const json = await result.json()
      console.log(json)
      setPropiedad(json)
    }

    fetching()
    
  }, [])

  useEffect(() => {
    if(propiedad) document.title = `${propiedad.ubicacion} ${propiedad.propiedad} ${propiedad.tipoNegocio}`
  }, [propiedad])

  function handlePreguntaClick(e) {
    const text = e.target.firstChild.data;
    const copy = [...preguntas];
    if (copy.includes(text)) {
      const filt = copy.filter((t) => t != text);
      setPreguntas(filt);
    } else {
      copy.push(text);
      console.log(copy);

      setPreguntas(copy);
    }
  }

  function handleImgClick(e) {
    console.log(e.target)
    //setMostrarVentana(true)
  }
  return (
    <>
  { propiedad ?

      <main className="mainPropInfoPage">
        <section className="mainPropInfoPage-conatainer">
          <div onClick={handleImgClick} className="imgContainer">
            <Caruselmg img={propiedad.img}></Caruselmg>
            <p>
              <Link className="link" id="link-menor" to="/">
                Inicio
              </Link>
              <Link to="/propiedades" className="link">
                Propiedades
              </Link>
            </p>
          </div>
          <section className="otherThingsContainer">
            <div className="titleInfoContainer">
              <section className="titleSubtitleContainer">
                <h1>{propiedad.ubicacion}</h1>
              </section>
              <h2>
                {propiedad.propiedad} en {propiedad.tipoNegocio}
              </h2>
              <div className="iconsInfoContainer">
                <p>
                  <img src={expandir} alt="" />
                  {propiedad.diametro}
                </p>
                <p>
                  <img src={shower} alt="" />
                  {propiedad.baños}
                </p>
                <p>
                  <img src={bedromm} alt="" />
                  {propiedad.dormitorios}
                </p>
                <p>
                  <img src={door} alt="" />
                  {propiedad.ambientes} ambientes
                </p>
              </div>
            </div>
            <section className="infoConsulta-section">
              <div className="descriptionSection">
                <h1>Descripción</h1>
                {propiedad.descripcion.length > 200 ? (
                  leerMas ? (
                    <p>
                      {propiedad.descripcion.slice(0, 200)}{" "}
                      <button
                        className="leerMasButton"
                        onClick={() => setLeerMas(!leerMas)}
                      >
                        Leer mas
                      </button>
                    </p>
                  ) : (
                    <p>
                      {propiedad.descripcion}{" "}
                      <button
                        className="leerMasButton"
                        onClick={() => setLeerMas(!leerMas)}
                      >
                        Leer menos
                      </button>
                    </p>
                  )
                ) : (
                  <p>{propiedad.descripcion}</p>
                )}
                <div className="mapaSection">
                  <iframe
                    src={propiedad.maps}
                    width="100%"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div className="consultaPropiedadContainer">
                <div>
                  <h2>Preguntas frecuentes</h2>
                  <button
                    className={`preguntasButton ${
                      preguntas.includes(`¿Sigue disponible?`) && `selected`
                    }`}
                    onClick={handlePreguntaClick}
                  >
                    ¿Sigue disponible?
                  </button>
                  <button
                    className={`preguntasButton ${
                      preguntas.includes(`¿Cuáles son los requisitos?`) &&
                      `selected`
                    }`}
                    onClick={handlePreguntaClick}
                  >
                    ¿Cuáles son los requisitos?
                  </button>
                  <button
                    className={`preguntasButton ${
                      preguntas.includes(`¿Acepta mascotas?`) && `selected`
                    }`}
                    onClick={handlePreguntaClick}
                  >
                    ¿Acepta mascotas?
                  </button>
                  <button
                    className={`preguntasButton mb-10 ${
                      preguntas.includes(`¿Cuando puedo visitarlo?`) &&
                      `selected`
                    }`}
                    onClick={handlePreguntaClick}
                  >
                    ¿Cuando puedo visitarlo?
                  </button>
                </div>
                <Consulta
                  tipoCompra={propiedad.tipoNegocio}
                  prop={propiedad.propiedad}
                  ubicacion={propiedad.ubicacion}
                  preguntas={preguntas}
                  id={param}
                />
              </div>
            </section>
          </section>
        </section>
      </main>

      :

      <main className="mainPropInfoPage"> 
            <h1>Error al conseguir cliente</h1>
      </main>
  }      
    </>
  );
}
