import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../Shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../Shared/utils/validators';
import Button from '../../Shared/components/FormElements/Button';
import './PlaceForm.css';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';
import { AuthContext } from '../../Shared/context/Auth-context';
import ErrorModal from '../../Shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../Shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../Shared/components/FormElements/ImageUpload';

const NewPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formState, InputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();
  const PlaceSubmitHandler = async (e) => {
    //console.log("Submit Clicked");
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('description', formState.inputs.description.value);
      formData.append('title', formState.inputs.title.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);

      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/places',
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/');
    } catch (error) {
      throw error;
      //Error Handling is done in Custom hook
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={PlaceSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          placeholder="Name of Place"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid text"
          onInput={InputHandler}
        ></Input>
        <Input
          id="description"
          element="textArea"
          type="text"
          label="Description"
          placeholder="Add a description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description"
          onInput={InputHandler}
        ></Input>
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          placeholder=""
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={InputHandler}
        ></Input>

        <ImageUpload
          id="image"
          onInput={InputHandler}
          errorText="Please Provide an Image"
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD Place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
