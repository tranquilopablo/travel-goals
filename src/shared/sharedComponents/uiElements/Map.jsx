import { useRef } from 'react';
import css from './Map.module.css';

const Map = (props) => {
  const mapRef = useRef();

  return (
    <div ref={mapRef} className={css.map}>
      {props.center}
    </div>
  );
};

export default Map;
