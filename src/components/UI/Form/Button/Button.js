import React from 'react';

import './Button.css';

const button = props => {
  let classes = ['Button'];
  if (props.fullWidth) {
    classes.push('Button--full-width');
  }
  if (props.disabled) {
    classes.push('Button--disabled');
  }

  if (props.danger) {
    classes.push('Button--danger');
  }

  if (props.header) {
    classes.push('Button--header')
  }

  if (props.inline) {
    classes.push('Button--inline')
  }

  if (props.light) {
    classes.push('Button--light');
  }

  if (props.success) {
    classes.push('Button--success');
  }

  if (props.transparentLight) {
    classes.push('Button--transparent-light')
  }

  return (
    <button className={classes.join(' ')} onClick={props.clicked}> 
      {props.children}
    </button>
  );
}

export default button;