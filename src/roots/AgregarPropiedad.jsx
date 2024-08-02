    import { useState, useEffect, useCallback } from "react"
    import "../styles/AgregarPropiedad.css"
    import { GoogleMap, useJsApiLoader, useLoadScript, Marker} from "@react-google-maps/api";
    import Places from "../components/MyMap"
    export function AgregarPropiedad() {
        const [agregar, setAgregar] = useState(true)
        const [newProp, setNewProp] = useState({
            tipoNegocio: "Departamento",
            tipoPropiedad: "Alquiler",
            dormitorios: null,
            precio: null,
            baños: null,
            ubicacion: null,
            description: null,
            googleMaps: null,
            imgs: null,
            ambientes: null
        })

        const [ubicacion, setUbicacion] = useState(null)
       
        useEffect(() => {
            console.log(newProp)
        }, [newProp])

        useEffect(() => {
            console.log(ubicacion)
            const copy = {...newProp}
            copy.googleMaps = ubicacion
            setNewProp(copy)
        }, [ubicacion])

        useEffect(() => {
                async function fetching() {
                    const result = await fetch("http://localhost:8080/api/propiedades/", {
                        method: "POST",
                        body: JSON.stringify(newProp),
                        headers: {
                            "Content-Type": "application/json"
                          }
                    })
                    const json = await result.json()
                    console.log(json)
                }
        
                fetching()
            
        }, [agregar])
        const handleChange = (e) => {
          const copy = {...newProp}
            if(e.target.id == "dormitorios") {
                copy.dormitorios = e.target.value 
            }else if(e.target.id == "precio") {
                copy.precio = e.target.value 
            } else if(e.target.id == "baños") {
                copy.baños = e.target.value 
            }else if(e.target.id == "descripcion") {
                copy.description = e.target.value 
            }else if(e.target.id == "title") {
                copy.ubicacion = e.target.value
            }else if (e.target.id == "ambientes") {
                copy.ambientes = e.target.value
            }

            setNewProp(copy)
        }

        const handleSelectChange = (e) => {
            const copy = {...newProp}
            if(e.target.id == "tipoPropiedad") {
                console.log(e.target.value)

                copy.tipoPropiedad = e.target.value
            }
            else if (e.target.id == "tipoCompra") {
                copy.tipoNegocio = e.target.value
            }

            setNewProp(copy)
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            setAgregar(!agregar)
        }

        return (
            <>
               
                <form id="agregarForm" onSubmit={handleSubmit}>
                    <h1>Agregar Propiedad</h1>
                            <label htmlFor="">Tipo de propiedad: </label>                           

                           <select
                                    className="selectFiltersPropiedades"
                                    name="tipoPropiedad"
                                    id="tipoPropiedad"
                                    onChange={handleSelectChange}
                                >
                                    <option
                                    defaultValue={newProp.tipoPropiedad == "Departamento"}
                                    value="Departamento"
                                    >
                                        Departamento
                                    </option>
                                    <option selected={newProp.tipoPropiedad} value="Casa">
                                        Casa
                                    </option>
                                    <option
                                        selected={newProp.tipoPropiedad == "Terreno/lote"}
                                        value="Terreno/lote"
                                    >
                                        Terreno
                                    </option>
                                    <option selected={newProp.tipoPropiedad == "Galpon"} value="Galpon">
                                        Galpón
                                    </option>
                                    <option selected={newProp.tipoPropiedad == "Finca"} value="Finca">
                                        Finca
                                    </option>
                                    <option selected={newProp.tipoPropiedad == "Local"} value="Local">
                                        Local
                                    </option>
                            </select>

                            <div>
                                <label htmlFor="">Tipo de negocio: </label>
                                    <select
                                        className="selectFiltersPropiedades"
                                        name="tipoCompra"
                                        id="tipoCompra"
                                        onChange={handleSelectChange}
                                    >
                                        <option
                                        selected={newProp.tipoNegocio == "Compra/Alquiler"}
                                        value="Compra/Alquiler"
                                        >
                                        Compra/Alquiler
                                        </option>
                                        <option selected={newProp.tipoNegocio == "Alquiler"} value="Alquiler">
                                            Alquiler
                                        </option>
                                        <option selected={newProp.tipoNegocio == "Compra"} value="Compra">
                                            Compra
                                        </option>
                                    </select>
                            </div>
                                        
                            <div>
                                <label htmlFor="dormitorios">Cantidad de dormitorios: </label>
                                <input type="number" name="dormitorios" id="dormitorios" placeholder="1, 2, 3..." value={newProp.dormitorios} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="precio">Precio: </label>
                                <input type="number" name="precio" id="precio" placeholder="" value={newProp.precio} onChange={handleChange}/>
                            </div>

                            <div>
                                <label htmlFor="baños">Cantidad de baños: </label>
                                <input type="number" name="baños" id="baños" placeholder="" value={newProp.baños} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="ambientes">Cantidad de ambientes: </label>
                                <input type="number" name="ambientes" id="ambientes" placeholder="" value={newProp.ambientes} onChange={handleChange} />
                            </div>

                            <div className="descriptionDiv">
                                <label htmlFor="descripcion">Descripcion: </label>
                                <textarea name="descripcion" id="descripcion" cols={30} rows={7} value={newProp.description} onChange={handleChange}></textarea>
                            </div>

                            <div>
                                <label htmlFor="title">Titulo o ubicacion: </label>
                                <input type="text" name="title" id="title" placeholder="Av Belgrano Sur, zona familiar..." value={newProp.ubicacion} onChange={handleChange} />
                            </div>
                            
                            <Places setUbicacion={setUbicacion}/>

                            <div>
                                <input type="file" />
                            </div>
                            
                            <button typeof="submit">Agregar</button>
                
                </form> 

                <script
                defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcGFqoKVRcNLYmpr8ewHqM3DqcfGX0DeQ&libraries=places&callback=initMap"
                ></script>
            </>
        )
    }