import React, { useState } from 'react';
import Button from '../shared/sharedComponents/uiElements/Button';
import Card from '../shared/sharedComponents/uiElements/Card';
import ErrorModal from '../shared/sharedComponents/uiElements/ErrorModal';
import LoadingSpinner from '../shared/sharedComponents/uiElements/LoadingSpinner';
import Map from '../shared/sharedComponents/uiElements/Map';
import Modal from '../shared/sharedComponents/uiElements/Modal';
import css from './PlaceItem.module.css';

const PlaceItem = (props) => {
  const [error, setError] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemDone, setItemDone] = useState(props.done);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const clearError = () => {
    setError(null);
  };

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const addToDone = () => {
    console.log('dodales do zrobionych!');
  };
  const addToUndone = () => {
    console.log('dodales do listy do zrobienia!');
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  // create function that delate place
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    console.log(`usunięto miejsce!`);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass={css.modalContent}
        footerClass={css.modalActions}
        footer={<Button onClick={closeMapHandler}>ZAMKNIJ</Button>}
      >
        <div className={css.mapContainer}>
          <Map center={props.coordinates} zoom={8} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Jesteś pewien?"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              WRÓĆ
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              USUŃ
            </Button>
          </React.Fragment>
        }
      >
        <p>Czy chcesz trwale usunąć to miejsce?</p>
      </Modal>
      <li className={css.placeItem}>
        <Card className={css.placeItemContent}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className={css.itemImage}>
            <img src={`${props.image}`} alt={props.title} />
          </div>
          <div className={css.itemInfo}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
            <div className={css.itemExtra}>
              <p>
                Priorytet: <span className={css.bolded}>{props.priority}</span>
              </p>
              <p>
                Dodaj do:
                {itemDone ? (
                  <span
                    onClick={addToUndone}
                    className={`${css.bolded} ${css.boldedCheck}`}
                  >
                    <i
                      className={`fa fa-list ${css.faList}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                ) : (
                  <span
                    onClick={addToDone}
                    className={`${css.bolded} ${css.boldedCheck}`}
                  >
                    <i
                      className={`fa fa-check ${css.faCheck}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                )}
              </p>

              <p className={css.boldedCheckStatus}>
                {!itemDone ? (
                  <span>
                    <i
                      className={`fa fa-list ${css.faList}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                ) : (
                  <span>
                    <i
                      className={`fa fa-check ${css.faCheck}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className={css.actions}>
            <Button inverse onClick={openMapHandler}>
              ZOBACZ NA MAPIE
            </Button>
            <Button to={`/miejsca/${props.id}`}>EDYTUJ</Button>

            <Button danger onClick={showDeleteWarningHandler}>
              USUŃ
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
