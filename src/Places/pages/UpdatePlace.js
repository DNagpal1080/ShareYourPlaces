import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useForm } from '../../Shared/hooks/form-hook';

import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../Shared/utils/validators';

import './PlaceForm.css';
import Card from '../../Shared/components/UIElements/Card';

import { useHttpClient } from '../../Shared/hooks/http-hook';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../Shared/context/Auth-context';

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  //let identifiedPlace;// = USER_PLACES.find(p => p.id === placeId);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [identifiedPlace, setIdentifiledPlace] = useState();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [formState, InputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Call 2');
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
          'GET'
        );
        setIdentifiledPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [sendRequest, placeId, setFormData]);

  const updatePlaceSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('Call 1');
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );

      history.push('/' + auth.userId + '/places');
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!identifiedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find any place!</h2>
        </Card>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        {!isLoading && identifiedPlace && (
          <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
            {' '}
            <Input
              id="title"
              element="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errortext="Pleae enter a valid Title!"
              onInput={InputHandler}
              InitialValue={identifiedPlace.title}
              InitialVaild={true}
            />
            <Input
              id="description"
              element="textArea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errortext="Pleae enter a valid description!"
              onInput={InputHandler}
              InitialValue={identifiedPlace.description}
              InitialVaild={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              UPDATE PLACE
            </Button>
          </form>
        )}
      </React.Fragment>
    );
  }
};

export default UpdatePlace;
