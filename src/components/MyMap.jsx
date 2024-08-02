import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useJsApiLoader, useLoadScript, Marker} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import "../styles/MyMap.css"

import useOnclickOutside from "react-cool-onclickoutside";

export default function Places({setUbicacion}) {
  const [libraries] = useState(['places'])
  const [selected, setSelected] = useState(null);
  const { isLoaded } =  useJsApiLoader({
    googleMapsApiKey: "AIzaSyCcGFqoKVRcNLYmpr8ewHqM3DqcfGX0DeQ",
    libraries: libraries
  });

  useEffect(() => {
    setUbicacion(selected)
  }, [selected])

  if (!isLoaded) return <div>Loading...</div>;
  return (
   <Map selected={selected} setSelected={setSelected}/>
  )
}

 function Map({selected, setSelected}) {
  const center = { lat: -27.79219016405694, lng: -64.25624370597518 }


  return (
    <>
    <div className="autocomplete">
      <PlacesAutocomplete setSelected={setSelected} />
    </div>
    <div>
    <GoogleMap
        mapContainerStyle={{width: "500px", height: "500px"}}
        zoom={15}
        center={selected ? selected : center}
        
      >
       { selected && <Marker position={selected} /> }
      </GoogleMap>
    </div>
      
    </>
  );
}

 const PlacesAutocomplete = ({setSelected}) => {
  const center = { lat: -27.79219016405694, lng: -64.25624370597518 }
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "initMap",
    requestOptions: {
      fields: ["address_components", "geometry", "icon", "name"],
      type: ["geocode"],
      bounds: defaultBounds,
      componentRestrictions: { country: "arg" },
      strictBounds: false,
    },
    debounce: 300,
  });

  useEffect(() => {
    console.log(ready)
  }, [ready])

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log(lat, lng)
        setSelected({lat, lng})
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {

      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      console.log(suggestion)
      return (
        <li key={place_id} onClick={handleSelect(suggestion)} className="suggestion">
          <strong>{main_text}</strong>, <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} classname="inputPropiedad">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Ingrese la ubicacion"
        className="inputPropiedad"
      />
      {status === "OK" && <ul className="listaSuggestions">{renderSuggestions()}</ul>}
    </div>
  );
};
