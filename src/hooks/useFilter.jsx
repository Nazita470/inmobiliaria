import { useContext } from "react";
import { FiltersContext } from "../context/filters";

export function useFilters(){
    const filtrado = useContext(FiltersContext).filters
    const setFilters = useContext(FiltersContext).setFilters

    function filtrar(arr){
        return arr.filter((item) => {
            return (
                (filtrado.tipoNegocio == "Compra/Alquiler"  || filtrado.tipoNegocio == item.tipoNegocio)
                &&
                (filtrado.propiedad.toLowerCase() == "all" || filtrado.propiedad == item.propiedad)
                &&
                (filtrado.zona.toLowerCase() == "all" || filtrado.zona.toLowerCase() == item.zona.toLowerCase())
                &&
                (filtrado.dormitoriosMax == 0 || filtrado.dormitoriosMax >= item.dormitorios)
                &&
                (filtrado.dormitoriosMin <= item.dormitorios)
                &&
                (filtrado.maxPrecio == 0  || filtrado.maxPrecio >= item.precio)
                &&
                item.precio >= filtrado.minPrecio

            )
        })
    }

    function reiniciarFiltrado(){
        setFilters({
            tipoNegocio: "Compra/Alquiler" ,
            propiedad: "All",
            zona: "all",
            minPrecio: "0",
            maxPrecio: 0,
            dormitoriosMax: 0,
            dormitoriosMin: 0
        })
    }

    const filtroVacio = {
        tipoNegocio: "Compra/Alquiler" ,
        propiedad: "All",
        zona: "all",
        minPrecio: 0,
        maxPrecio: 0,
        dormitoriosMax: 0,
        dormitoriosMin: 0
    }
    return {setFilters, filtrado, filtrar, reiniciarFiltrado, filtroVacio}
}