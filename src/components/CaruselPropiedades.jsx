import { Prop } from "./Prop"
import "./CaruselPropiedades.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFilters } from "../hooks/useFilter";
export function CaruselPropiedades({propiedades, tipo}) {
    const {setFilters, filtrado} = useFilters()

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 2024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 750 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 750, min: 0 },
          items: 1
        }
      };

      const products =  propiedades.map((valor) => (
        <Prop key={valor._id} valorPropiedad={valor}></Prop>   
    ))

        function handleClick() {
           const copy = {...filtrado}
           copy.tipoNegocio = tipo
           setFilters(copy)
        }

    return (
        <section>
            <Carousel responsive={responsive}>
              {products}
            </Carousel>
            <div>
                <Link to={"/propiedades"} onClick={handleClick} className="masInfoButton">Mas propiedades</Link>
            </div>
        </section>
    )
}