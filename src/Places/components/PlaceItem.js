import React, { useState, useContext } from 'react';

import Button from '../../Shared/components/FormElements/Button';
import { AuthContext } from '../../Shared/context/Auth-context';

import './PlaceItem.css';
import Modal from '../../Shared/components/UIElements/Modal';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import Card from '../../Shared/components/UIElements/Card';

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const openMapHandler = (props) => setShowMap(true);
  const closeMapHandler = (props) => setShowMap(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarningHandler = (e) => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onclear={clearError} />

      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item-modal__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="main-container">
          <h2>The Map!!</h2>
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={confirmDeleteHandler}>
              DELETE
            </Button>
            <Button danger onClick={cancelDeleteWarningHandler}>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you sure want to proceeds and delete this place ? Please note that
          it can't be undone thereafter.
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.discription}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW On MAP
            </Button>
            {auth.userId === props.createrID && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.createrID && (
              <Button onClick={showDeleteWarningHandler}>DELETE</Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
