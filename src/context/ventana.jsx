import { createContext, useState } from "react";

export const VentanaContext = createContext()

export function VentanaProvider({children}) {
    const [mostrarVentana, setMostrarVentana] = useState(false)

    return (
        <VentanaContext.Provider value={{mostrarVentana, setMostrarVentana}}>
                {children}
        </VentanaContext.Provider>
    )
}