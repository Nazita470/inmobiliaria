import { createContext, useState } from "react";

export const FiltersContext = createContext()

export function FilterProvider({children}){
    const [filters, setFilters] = useState({
        tipoNegocio: "all",
        propiedad: "all",
        zona: "all",
        minPrecio: "0",
        maxPrecio: null,
        dormitorios: 0
    }
    )

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}