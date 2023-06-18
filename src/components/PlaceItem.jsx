import { useState } from 'react';
import Button from '../shared/sharedComponents/uiElements/Button';
import Card from '../shared/sharedComponents/uiElements/Card';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
// import Modal from '../shared/sharedComponents/uiElements/Modal';
import css from './PlaceItem.module.css';

const PlaceItem = (props) => {
  const [error, setError] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const clearError = () => {
    setError(null);
  };

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <li className={css.placeItem}>
        <Card className={css.placeItemContent}>
          <div className={css.actions}>
            <Button inverse onClick={openMapHandler}>
              ZOBACZ NA MAPIE
            </Button>
            <Button to={`/miejsca/`}>EDYTUJ</Button>

            <Button danger>USUŃ</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
