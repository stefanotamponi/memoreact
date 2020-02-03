import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Spinner.css';

const spinner = props => (
  <CSSTransition
    in={props.show}
    timeout={500}
    mountOnEnter
    unmountOnExit
    classNames={{
      enter: 'Spinner Spinner--enter',
      enterActive: 'Spinner Spinner--enter-active',
      exit: 'Spinner Spinner--exit',
      exitActive: 'Spinner Spinner--exit-active'
    }}
  >
    <div className="Spinner"></div>
  </CSSTransition>
);

export default spinner;