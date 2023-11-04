import React, { useState, useContext } from 'react';
import Card from '../../Shared/components/UIElements/Card';
import Input from '../../Shared/components/FormElements/Input';
import Button from '../../Shared/components/FormElements/Button';


import ErrorModal from '../../Shared/components/UIElements/ErrorModal';

import LoadingSpiner from '../../Shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../Shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../Shared/utils/validators';
import { useForm } from '../../Shared/hooks/form-hook';
import { useHttpClient } from '../../Shared/hooks/http-hook';


import { AuthContext } from '../../Shared/context/Auth-context';

import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, InputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      }
      
    },
    false
  );

  

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
         
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/users/login`;
      const dataObj = JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        });      
        const responseData = await sendRequest(url, 'POST', dataObj, 
        {
          'Content-Type': 'application/json',
        }
       );



        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
      
     
      const formData = new FormData();
       const url = `${process.env.REACT_APP_BACKEND_URL}/users/signup`;      
      
      formData.append('email', formState.inputs.email.value);
      formData.append('name', formState.inputs.name.value);
      formData.append('password', formState.inputs.password.value);
      formData.append('image', formState.inputs.image.value);
      
        const responseData = await sendRequest(url, 'POST', formData);


        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpiner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
             
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={InputHandler}
            />
          )}

          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={InputHandler}
              errorText="Please provide an Image."
            />
          )}

          <Input
    element="input"
            id="email"
        
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid Email Address"
            onInput={InputHandler}
          />
          <Input
element="input"
            id="password"
            
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password"
            onInput={InputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
