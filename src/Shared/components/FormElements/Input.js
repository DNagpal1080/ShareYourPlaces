import React, { useReducer, useEffect } from 'react'

import { validate } from '../../utils/validators'

import './Input.css'


const InputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(InputReducer, {
        value: props.InitialValue || '',
        isValid: props.InitialVaild || false,
        isTouched: false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);

    }, [onInput, id, value, isValid]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            value: event.target.value,
            validators: props.validators
        })
    }

    const touchHandler = event => {
        dispatch({
            type: 'TOUCH',
            value: event.target.value

        })
    }

    const element = props.element === "input" ?
        <input id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        /> :

        <textarea
            id={props.id}
            row={props.row || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}> {props.label} </label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errortext}</p>}
        </div>
    )
}

export default Input