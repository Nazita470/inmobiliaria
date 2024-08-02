import "../styles/Contacto.css";
import living from "../assets/pexels-aleksandar-andreev-13443930.jpg"
import { useEffect, useState } from "react";

export function Contacto() {
  const datosVacios = {
    nombre: "",
    telefono: "",
    email: "",
    asunto: "",
    text: ""
  }
  const [datosMail, setDatosMail] = useState(datosVacios)
  const [mailEnviado, setMailEnviado] = useState(false)
  const [enviarMail, setEnviarMail] = useState(false)

  useEffect(() => {
    async function fetching() {
     const result = await fetch("http://localhost:8080/api/mail/consulta",{
      method: "POST",
      body: JSON.stringify(datosMail),
      headers: {
        "Content-Type": "application/json"
      }
     })
     const json = await result.json()
     setMailEnviado(json)
     vaciarInput()

    }

    if(datosMail.nombre.length != 0){
      fetching()
      setMailEnviado(true)
    }
    
  }, [enviarMail])

  useEffect(() => {
    document.title = "Contacto | inmosalvatierra"
  }, [])
 useEffect(() => {
    console.log("Entro")
    if(mailEnviado) {
      setTimeout(() => {
        setMailEnviado(false)
      }, 4000)
    }
  }, [mailEnviado])
  const handleChange = (e) => {
    const newDatosMail = {...datosMail}
    if(e.target.id == "email"){ newDatosMail.email = e.target.value}
    else if(e.target.id == "nombre"){newDatosMail.nombre = e.target.value}
    else if(e.target.id == "telefono"){ newDatosMail.telefono = e.target.value}
    else if(e.target.id == "asunto"){newDatosMail.asunto = e.target.value}
    else if(e.target.id == "mensaje"){newDatosMail.text = e.target.value}

    setDatosMail(newDatosMail)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setEnviarMail(!enviarMail)
  }

  const vaciarInput = () => {
    setDatosMail(datosVacios)
  }
  return (
  <>
  
    <main className="mainContacto">
      <div className="mainContainer">
        <section className="formSection">
          <h1>Envianos tu mensaje</h1>
          <form action="" onSubmit={handleClick}>
            <div>
              <label htmlFor="email">Email</label>
              <input value={datosMail.email} onChange={handleChange} type="email" id="email" required />
            </div>

            <div>
              <label htmlFor="nombre">Nombre</label>
              <input value={datosMail.nombre} onChange={handleChange} type="text" id="nombre"  required/>
            </div>

            <div>
              <label htmlFor="telefono">Telefono</label>
              <input value={datosMail.telefono} onChange={handleChange} type="text" id="telefono"  required/>
            </div>

            <div>
              <label htmlFor="asunto">Asunto</label>
              <input value={datosMail.asunto} onChange={handleChange} type="text" id="asunto"  required/>
            </div>

            <div>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea value={datosMail.text} onChange={handleChange} name="" id="mensaje" cols="30" rows="10" required></textarea>
            </div>

            <button>Buscar</button>
          </form>
        </section>
        <section className="imgSection">
            <img src={living} alt="" />
        </section>
      </div>
      { mailEnviado && <>
        
          <div className="div_emailEnviado">
             <p>{mailEnviado.message || "Enviando..."}</p>
          </div>
      </>
     }
    </main>

    

  </>
  );
}
