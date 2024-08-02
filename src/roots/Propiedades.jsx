import { useCallback, useContext, useEffect, useState } from "react";
import { useFilters } from "../hooks/useFilter.jsx";
import { PropiedadGrande } from "../components/PropiedadGrande.jsx";
import todas_propiedades from "../propiedades.js";
import "../styles/Propiedades.css";
import "../styles/FiltersPropiedades.css";
import { Consulta } from "../components/Consulta.jsx";
import filtersIcon from "../assets/filtrar.png";
export function Propiedades() {
  const { setFilters, filtrado, filtrar } = useFilters();
  const [resultado, setResultado] = useState([]);
  const [msje, setMsje] = useState("Hola");

  useEffect(() => {
    document.title = "Propiedades | inmosalatierra"
  }, [])
  useEffect(() => {
    setMsje(decodificar(filtrado));
    async function fetching() {
        const result = await fetch("http://localhost:8080/api/propiedades/filtrar/filtrado",{
            method: "POST",   
            body: JSON.stringify(filtrado),
            headers: {
              "Content-Type": "application/json"
            }
        });
        const json = await result.json()
        console.log(json)

        setResultado(json)
    }
    fetching()

  }, [filtrado]);

  return (
    <>

      <main
        className="propiedadesPageMain"
      >
        <section
          className="containerPagePropiedades"
        >
          <header>
            <FiltersPropiedades></FiltersPropiedades>
          </header>
          <div className="filtroMsj">{msje}</div>
          <section className="seccionPropiedades">
            <MostrarPropiedades arr={resultado} />
          </section>
        </section>
      </main>
    </>
  );
}

function FiltersPropiedades() {
  const [mostrarHabitaciones, setMostrarHabitaciones] = useState("d-none");
  const { setFilters, filtrado, filtroVacio } = useFilters();
  const [filtrosProp, setFiltrosProp] = useState({
    ...filtrado,
  });
  const [mostrarVentanaFiltros, setVentanaFiltros] = useState(false);

  useEffect(() => {
    console.log(filtrosProp)
  }, [filtrosProp])

  useEffect( () => {
   // console.log(filtrado)

  }, [filtrado])
  function handleButtonHabitClick(e) {
    if (e.target.id == "habitaciones") {
      if (mostrarHabitaciones) {
        setMostrarHabitaciones("");
      } else {
        setMostrarHabitaciones("d-none");
      }
    }
  }
  function handleFocus(e) {
    if (e.target.parentElement.id != "habitaciones") {
      setMostrarHabitaciones("d-none");
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    const copy = { ...filtrosProp };

    if (name == "tipoCompra") {
      if(value.toLowerCase() == "compra/alquiler"){
        copy.tipoNegocio && delete copy.tipoNegocio
      }else {
        copy.tipoNegocio = value;
      }
    }
    
    else if (name == "tipoPropiedad") {
      if(value.toLowerCase() == "all"){
        copy.propiedad && delete copy.propiedad
      }else {
        copy.propiedad = value;
      }
    }
    
    else if (name == "minimoDormitorios") {
      if(value.toLowerCase() == 0){
        copy.minDormitorios && delete copy.minDormitorios
      }else {
        copy.minDormitorios = value;
      }
    } 
    
    else if (name == "maximoDormitorios") {
      if(value.toLowerCase() == "0"){
        copy.maxDormitorios && delete copy.maxDormitorios
      }else {
        copy.maxDormitorios = value;
      }
    } 
    
    else if (name == "zona") {
      if(value.toLowerCase() == "all"){
        copy.zona && delete copy.zona
      }else {
        copy.zona = value;
      }
    }

    setFiltrosProp(copy);
  }

  function handleBuscarClick() {
    setVentanaFiltros(false);
    const copy = {...filtrosProp}
    setFilters(copy);
  }

  return (
    <div className="filtersPropiedades-container" onFocus={handleFocus}>
      <select
        onChange={handleChange}
        className="selectFiltersPropiedades"
        name="tipoPropiedad"
        id="tipoPropiedad"
      >
        <option defaultValue={filtrado.propiedad == "All"} value="All">
          Todas
        </option>
        <option
          defaultValue={filtrado.propiedad == "Departamento"}
          value="Departamento"
        >
          Departamento
        </option>
        <option selected={filtrado.propiedad == "Casa"} value="Casa">
          Casa
        </option>
        <option
          selected={filtrado.propiedad == "Terreno/lote"}
          value="Terreno/lote"
        >
          Terreno
        </option>
        <option selected={filtrado.propiedad == "Galpon"} value="Galpon">
          Galpón
        </option>
        <option selected={filtrado.propiedad == "Finca"} value="Finca">
          Finca
        </option>
        <option selected={filtrado.propiedad == "Local"} value="Local">
          Local
        </option>
      </select>

      <select
        onChange={handleChange}
        className="selectFiltersPropiedades"
        name="tipoCompra"
        id="tipoCompra"
      >
        <option
          selected={filtrado.tipoNegocio == "Compra/Alquiler"}
          value="Compra/Alquiler"
        >
          Compra/Alquiler
        </option>
        <option selected={filtrado.tipoNegocio == "Alquiler"} value="Alquiler">
          Alquiler
        </option>
        <option selected={filtrado.tipoNegocio == "Compra"} value="Compra">
          Compra
        </option>
      </select>

      <select
        onChange={handleChange}
        className="selectFiltersPropiedades"
        name="zona"
        id="zona"
      >
        <option selected={filtrado.zona == "All"} value="All">
          Todas
        </option>
        <option selected={filtrado.zona == "norte"} value="norte">
          Norte
        </option>
        <option selected={filtrado.zona == "sur"} value="sur">
          Sur
        </option>
        <option selected={filtrado.zona == "este"} value="este">
          Este
        </option>
        <option selected={filtrado.zona == "centro"} value="centro">
          Centro
        </option>
      </select>

      <div id="habitaciones" className="container-button-PrecioHabitaciones">
        <button
          id="habitaciones"
          onClick={handleButtonHabitClick}
          className="button-PrecioHabitaciones"
        >
          Habitaciones
        </button>
        <div
          id="habitaciones"
          className={`precioHabitacionesDivContainer ${mostrarHabitaciones}`}
        >
          <label htmlFor="minimo">Minimo</label>
          <select onChange={handleChange} name="minimoDormitorios" id="minimo">
            <option selected={filtrado.minDormitorios == "0"} value="0">Sin minimo</option>
            <option value="1" defaultValue={true}>1 dormitorio</option>
            <option selected={filtrado.minDormitorios == "2"} value="2">2 dormitorio</option>
            <option selected={filtrado.minDormitorios == "3"} value="3">3 dormitorio</option>
            <option selected={filtrado.minDormitorios == "4"} value="4">4 dormitorio</option>
            <option selected={filtrado.minDormitorios == "5"} value="5">5 dormitorio</option>
            <option selected={filtrado.minDormitorios == "6"} value="6">6 dormitorio</option>
          </select>

          <label htmlFor="maximo">Maximo</label>
          <select onChange={handleChange} name="maximoDormitorios" id="maximo">
            <option selected={filtrado.maxDormitorios == "0"} value="0">Sin maximo</option>
            <option selected={filtrado.maxDormitorios == "1"} value="1">1 dormitorio</option>
            <option selected={filtrado.maxDormitorios == "2"} value="2">2 dormitorio</option>
            <option selected={filtrado.maxDormitorios == "3"} value="3">3 dormitorio</option>
            <option selected={filtrado.maxDormitorios == "4"} value="4">4 dormitorio</option>
            <option selected={filtrado.maxDormitorios == "5"} value="5">5 dormitorio</option>
            <option selected={filtrado.maxDormitorios == "6"} value="5">6 dormitorio</option>
          </select>
        </div>
      </div>

      <div>
        <button
          onClick={() => setVentanaFiltros(!mostrarVentanaFiltros)}
          id="responsiveMenu"
          className="selectFiltersPropiedades"
        >
          <p>
            <img src={filtersIcon} alt="" />
            Filtros
          </p>
        </button>

        {mostrarVentanaFiltros && (
          <div className="ventanaFiltrosContainer">
            <div
              id="ventaResponsiveHabitaciones"
              className="precioHabitacionesDivContainer"
            >
              <label htmlFor="minimo">Minimo</label>
              <select
                onChange={handleChange}
                name="minimoDormitorios"
                id="minimo"
              >
                <option value="0" selected={filtrado.minDormitorios == "0"}>
                  Sin minimo
                </option>
                <option value="1" selected={filtrado.minDormitorios == "1"}>
                  1 dormitorio
                </option>
                <option value="2" selected={filtrado.minDormitorios == "2"}>
                  2 dormitorio
                </option>
                <option value="3" selected={filtrado.minDormitorios == "3"}>
                  3 dormitorio
                </option>
                <option value="4" selected={filtrado.minDormitorios == "4"}>
                  4 dormitorio
                </option>
                <option value="5" selected={filtrado.minDormitorios == "5"}>
                  5 dormitorio
                </option>
                <option value="5" selected={filtrado.minDormitorios == "6"}>
                  6 dormitorio
                </option>
              </select>

              <label htmlFor="maximo">Maximo</label>
              <select
                onChange={handleChange}
                name="maximoDormitorios"
                id="maximo"
              >
                <option selected={(filtrado.maxDormitorios == "0")} value="0">
                  Sin maximo
                </option>
                <option selected={(filtrado.maxDormitorios == "1")} value="1">
                  1 dormitorio
                </option>
                <option selected={(filtrado.maxDormitorios == "2")} value="2">
                  2 dormitorio
                </option>
                <option selected={(filtrado.maxDormitorios == "3")} value="3">
                  3 dormitorio
                </option>
                <option selected={(filtrado.maxDormitorios == "4")} value="4">
                  4 dormitorio
                </option>
                <option selected={(filtrado.maxDormitorios == "5")} value="5">
                  5 dormitorio
                </option>
                <option selected={(filtrado.maxDormitorios == "6")} value="6">
                  6 dormitorio
                </option>
              </select>
            </div>

            <div className="zonaResponsiveContainer">
              <label htmlFor="zona">Zona</label>
              <select
                onChange={handleChange}
                className="selectFiltersPropiedades"
                name="zona"
              >
                <option selected={filtrado.zona == "All"} value="All">
                  Todas
                </option>
                <option selected={filtrado.zona == "norte"} value="norte">
                  Norte
                </option>
                <option selected={filtrado.zona == "sur"} value="sur">
                  Sur
                </option>
                <option selected={filtrado.zona == "este"} value="este">
                  Este
                </option>
                <option selected={filtrado.zona == "centro"} value="centro">
                  Centro
                </option>
              </select>
            </div>

            <div className="tipoNegocioReponsiveContainer">
              <label htmlFor="tipoCompra">Tipo</label>
              <select
                onChange={handleChange}
                className="selectFiltersPropiedades"
                name="tipoCompra" 
              >
                <option
                  selected={filtrado.tipoNegocio == "Compra/Alquiler"}
                  value="Compra/Alquiler"
                >
                  Compra/Alquiler
                </option>
                <option
                  selected={filtrado.tipoNegocio == "Alquiler"}
                  value="Alquiler"
                >
                  Alquiler
                </option>
                <option
                  selected={filtrado.tipoNegocio == "Compra"}
                  value="Compra"
                >
                  Compra
                </option>
              </select>
            </div>

            <button
              onClick={handleBuscarClick}
              id="botonBuscar"
              className="w-100"
            >
              Buscar
            </button>
          </div>
        )}
      </div>

      <button onClick={handleBuscarClick} id="botonBuscar">
        Buscar
      </button>
    </div>
  );
}

function MostrarPropiedades({ arr }) {
  useEffect(() => {
    console.log(arr);
  });
  if (arr.length == 0) {
    return (
      <div className="div-noResults">
        <p>No se encontraron resultados</p>
      </div>
    );
  }
  return (
    <div>
      {arr.map((item) => (
        <PropiedadGrande key={item.id} prop={item} />
      ))}
    </div>
  );
}

function decodificar(arr) {
  console.log(arr)
  let msje = "";
  let minHabit = "";
  let maxHabit = "";
  let tipo = "Todas las propiedades ";
  let zona = "";
  let tipoNeg = ""

  if (arr?.minDormitorios) minHabit = ", minimo de habitaciones: " + arr.minDormitorios;
  if (arr?.maxDormitorios) maxHabit = ", maximo de habitaciones: " + arr.maxDormitorios;
  if (arr?.propiedad) tipo =  arr.propiedad;
  if (arr?.zona) zona = ", en zona " + arr.zona;
  if(arr?.tipoNegocio) tipoNeg = " en " + arr.tipoNegocio.toLowerCase()
  msje =
    tipo + tipoNeg  + zona  + minHabit + maxHabit;
  return msje;
}
