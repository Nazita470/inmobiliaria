import { useEffect, useState } from "react"
import { AgregarPropiedad } from "./AgregarPropiedad"
import "../styles/Dashboard.css"

export function Dashboard() {
    const [accion, setAccion] = useState("todas")
    const filtrado = {}
    const [newProp, setNewProp] = useState({
        tipoNegocio: null,
        tipoPropiedad: null,
        dormitorios: null,
        precio: null,
        baños: null,
        ubicacion: null,
        description: null,
        googleMaps: null,
        imgs: null
    })

    useEffect(() => {
        console.log(newProp)
    }, [newProp])
    const handleChange = (e) => {
        const copy = {...newProp}
        if(e.target.id == "dormitorios") {
            copy.dormitorios = e.target.value 
        } else if(e.target.id == "tipoPropiedad") {
            copy.tipoPropiedad = e.target.value 
        } else if(e.target.id == "tipoCompra") {
            copy.tipoNegocio = e.target.value 
        } else if(e.target.id == "precio") {
            copy.precio = e.target.value 
        } else if(e.target.id == "baños") {
            copy.baños = e.target.value 
        }else if(e.target.id == "descripcion") {
            copy.description = e.target.value 
        }

        setNewProp(copy)
    }
    return (
        <>
            <main>
                <section className="navBar">
                     <button onClick={() => setAccion("todas")}>Todas la propiedades</button>
                     <button onClick={() => setAccion("agregar")}>Agregar propiedad</button>
                     <button>Modificar propiedad</button>
                </section>
                <section className="mainSection">
                    {
                        accion == "todas" &&
                        <>
                            <h1>Todas las propiedades</h1>
                        </>
                    }

                    {
                        accion == "agregar" && 
                        <>
                           <AgregarPropiedad />
                        </>
                    }
                </section>
            </main>
        </>
    )
}
