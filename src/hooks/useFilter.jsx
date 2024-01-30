import { useContext } from "react";
import { FiltersContext } from "../context/filters";

export function useFilters(){
    const filtrado = useContext(FiltersContext).filters
    const setFilters = useContext(FiltersContext).setFilters

    function filtrar(arr){
        return arr.filter((item) => {
            return (
                (filtrado.tipoNegocio == "All" || filtrado.tipoNegocio == item.tipoNegocio)
                &&
                (filtrado.propiedad == "All" || filtrado.propiedad == item.propiedad)
                &&
                (filtrado.zona == "All" || filtrado.zona == item.zona)
                &&
                (filtrado.dormitorios == 0 || filtrado.dormitorios == item.dormitorios)
                &&
                (filtrado.maxPrecio || filtrado.maxPrecio >= item.precio)
                &&
                item.precio >= filtrado.minPrecio

            )
        })
    }
    return {setFilters, filtrado, filtrar}
}