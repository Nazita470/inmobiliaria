import { createContext, useState } from "react";

export const FiltersContext = createContext()

export function FilterProvider({children, name}){
    const [filters, setFilters] = useState({
    }
    )

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
             <div className={name} id="allContainer">
                {children}
             </div>
        </FiltersContext.Provider>
    )
}