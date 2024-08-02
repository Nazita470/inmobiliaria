import { useEffect, useState } from "react"
import "../styles/Admin.css"
export function Admin() {
    const [usuario, setUsuario] = useState({
        nombre: null,
        password: null,
        valido: false,
        equivocado: false
    })

    const [login, setLogin] = useState(null)
    
    useEffect(() => {
        async function fetching() {
            const userData = {username: usuario.nombre, password: usuario.password}
            const result = await fetch("http://localhost:8080/api/session/login", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                  } 
            })

            const json = await result.json()
            console.log(json)
            const copy = {...usuario}

            if(json.status == "error") {
                console.log(json.status)
                copy.equivocado = true
            }else {
                window.location.replace("/dashboard")
            }

            setUsuario(copy)

        }
        if(login) {
            fetching()
            setLogin(false)
        }
    }, [login])

    useEffect(() => {
        console.log(usuario)
    }, [usuario])
    const handleClick = (e) => {
        e.preventDefault()
        setLogin(true)
    }

    const handleInputChange = (e) => {
        const copiUsuario = {...usuario}
        if(e.target.id == "nombreUsuario") {
           copiUsuario.nombre = e.target.value
        }
        else if(e.target.id == "contrasena") {
            copiUsuario.password = e.target.value
        }

        setUsuario(copiUsuario)
    }
    return (
        <>
            {
            usuario.valido 
            ? 
            <div>Hola</div>
            :
            <main className="mainAdmin">
                <form action="">
                <h1>Registrarse</h1>
                    <div>
                        <label htmlFor="nombreUsuario">Nombre de usuario</label>
                        <input value={usuario.nombre} onChange={handleInputChange} type="text" name="nombreUsuario" id="nombreUsuario" />
                    </div>
                    
                    <div>
                        <label htmlFor="contrasena">Contraseña</label>
                        <input value={usuario.password} onChange={handleInputChange} type="password" name="contrasena" id="contrasena" />
                    </div>

                    <button onClick={handleClick}>Enviar</button>
                    {usuario.equivocado && <p>Usuario no encontrado</p>}   
                    {
                        setTimeout(() => {
                            const newUser = {...usuario}
                            if(newUser.equivocado) {
                            newUser.equivocado = false
                            setUsuario(newUser)
                            }
                        }, 2000)
                    }
                </form>
                
            </main>

            }
        </>
        
    )
}