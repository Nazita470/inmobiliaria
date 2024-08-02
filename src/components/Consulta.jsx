import { useState } from "react";
import "./Consulta.css";
import { useEffect } from "react";
export function Consulta({tipoCompra, prop, ubicacion, preguntas, id}) {
  const [enviar, setEnviar] = useState(false)
  const [mailEnviado, setMailEnviado] = useState(false)
  const datosVacios = {
    email: "",
    nombre: "",
    telefono: "",
    title: `${tipoCompra} de ${prop} en ${ubicacion}`,
    text: "No hay preguntas",
    link: `http://localhost:5173/propiedad/${id}`
  }
  const [datosMail, setDatosMail] = useState(datosVacios)

  useEffect(() => {
    let newDatos = {...datosMail}
    newDatos.text =  `${preguntas.length != 0 ? `Preguntas: ` : `No hay preguntas`}  ${preguntas.join(`, `)}`
    setDatosMail(newDatos)
  }, [preguntas])


  useEffect(() => {
    async function fetching() {
      const result = await fetch("http://localhost:8080/api/mail/propiedad", {
        method: "POST",
        body:JSON.stringify(datosMail),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const json = await result.json()
      setMailEnviado(json)
      vaciarInput()

    }
    if(datosMail.nombre.length != 0) {
      fetching()
      setMailEnviado(true)
    }
  }, [enviar])

  useEffect(() => {
    console.log(mailEnviado)
    if(mailEnviado) {
      setTimeout(() => {
          setMailEnviado(false)
      }, 4000)
    }
  }, [mailEnviado])

  const handleChange = (e) => {
    let newDatos = {...datosMail}
    if(e.target.id == "mailInput"){ newDatos.email = e.target.value}
    else if(e.target.id == "nombreInput"){newDatos.nombre = e.target.value}
    else if(e.target.id == "telefonoInput"){newDatos.telefono = e.target.value}

    setDatosMail(newDatos)
  }

  const handleClick = (e) => {
    e.preventDefault()
    console.log(datosMail.text)
    setEnviar(!enviar)
  }

  const vaciarInput = (e) => {
    setDatosMail(datosVacios)
  }
  return (
  <>
    <div className="AllConsultaContainer">
      <form action="" onSubmit={handleClick}>
        <h1>Contacta a la inmobiliaria</h1>
        <input value={datosMail.email} onChange={handleChange} id="mailInput" type="text" className="inputConsulta"  placeholder="Email" required/>
        <div className="inputSeparadosContainer">
          <input value={datosMail.nombre} onChange={handleChange} id="nombreInput" type="text" className="inputConsulta" placeholder="Nombre" required/>
          <input value={datosMail.telefono} onChange={handleChange} id="telefonoInput" type="text" className="inputConsulta" placeholder="Telefono" required/>
        </div>
        <textarea className="inputConsulta" id="mailInput" cols="30" rows="7" value={
           `Hola! Me gustaría ponerme en contacto por el ${prop} en ${tipoCompra} que se encuentra en ${ubicacion} ${preguntas.length != 0 ? `\n Preguntas` : ``} \n ${preguntas.join(`\n `)}`
        }>
         
        </textarea>
        <button>Enviar</button>
      </form>
    </div>

    {
      mailEnviado && 
      <div className="divEnviado">
        {mailEnviado.message || "Enviando..."}
      </div>
    }
  </>
  );
}
