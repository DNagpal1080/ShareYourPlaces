import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';

import './UserPlaces.css';

const UserPlaces = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );

        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const onDeletePlace = (pid) => {
    console.log('onDeleteCallback method call');
    setLoadedPlaces((previousPlaces) =>
      previousPlaces.filter((place) => place.id !== pid)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList
          item={loadedPlaces}
          onDeleteCallback={onDeletePlace}
        ></PlaceList>
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
