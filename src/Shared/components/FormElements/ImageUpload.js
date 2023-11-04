import React, { useRef, useState, useEffect } from 'react';

import Button from './Button.js';
import './ImageUpload.css';

const ImageUpload = (props) => {
  const ImagePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedImageHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      fileIsValid = true;
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = (e) => {
    e.preventDefault();
    ImagePickerRef.current.click();
  };

  return (
    <>
      <div className="form-control">
        <input
          id={props.id}
          style={{ display: 'none' }}
          type="file"
          ref={ImagePickerRef}
          onChange={pickedImageHandler}
          accept=".jpg,.png,.jpeg"
        />
        <div className={`image-upload ${props.center && 'center'}`}>
          <div className="image-upload__preview">
            {previewURL && <img src={previewURL} alt="Preview" />}
            {!previewURL && <p>Pick an image</p>}
          </div>
          <Button type="button" onClick={pickImageHandler}>
            {' '}
            PICK IMAGE{' '}
          </Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </>
  );
};

export default ImageUpload;
