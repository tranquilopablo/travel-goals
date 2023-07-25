import { useEffect, useRef } from 'react';
import css from './Map.module.css';

const Map = (props) => {
  const mapRef = useRef();

  console.log(props);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: props.center,
      zoom: props.zoom,
    });
    new window.google.maps.Marker({ position: props.center, map: map });
  }, [props.center, props.zoom]);

  return <div ref={mapRef} className={css.map}></div>;
};

export default Map;
