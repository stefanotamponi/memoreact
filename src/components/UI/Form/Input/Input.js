import React from 'react';

import './Input.css';

const input = props => {
  let inputElement = <p>Define inputType attribute</p>;
  let name = "Define_name_attribute";
  let inputClasses = ['Input', 'Input--text'];

  if (props.name) {
    name = props.name;
  }

  if (props.disabled) {
    inputClasses.push("Input--disabled");
  } 

  switch (props.inputType) {
    case 'checkbox':
      inputElement = (
        <div className="Input Input--checkbox">
          <input type="checkbox" id={"Input--checkbox"} />
          <label htmlFor={"Input--checkbox"}>{name}</label>
        </div>
      ); 
      break;

    case 'email':
      inputElement = (
        <div className="Input Input--text">
          <label className="Input__label" htmlFor={props.id}>{props.label}</label>
          <input 
            autoComplete="username"
            id={props.id}
            type="email"
            onChange={props.changed}
            value={props.value}
            placeholder={props.placeholder}
          />
        </div>
      );
      break;

    case 'text':
      inputElement = (
        <div className="Input Input--text">
          <label className="Input__label" htmlFor={props.id}>{props.label}</label>
          <input 
            id={props.id}
            onChange={props.changed}
            value={props.value}
            placeholder={props.placeholder}
          />
        </div>
      );
      break;
    
    case 'textarea':
      inputElement = (
        <div className className="Input Input--textarea">
          <label className="Input__label" htmlFor={props.id}>{props.label}</label>
          <textarea
            onChange={props.changed}
            id={props.id}
            placeholder={props.placeholder}
            rows="5"
            value={props.value}
          >
          </textarea>
        </div>
      );
      break;

    case 'password':
      inputElement = (
        <div className="Input Input--text">
          <label className="Input__label" htmlFor={props.id}>{props.label}</label>
          <input 
            autoComplete="current-password"
            type="password"
            id={props.id}
            onChange={props.changed}
            value={props.value}
            placeholder={props.placeholder}
          />
        </div>
      );
      break;

    default:
      inputElement = (
        <div className={inputClasses.join(' ')}>
          <label className="Input__label" htmlFor={props.id}>{props.label}</label>
          <input 
            id={props.id}
            onChange={props.changed}
            value={props.value}
            placeholder={props.placeholder}
          />
        </div>
      );
  }

  return inputElement;
};

export default input;