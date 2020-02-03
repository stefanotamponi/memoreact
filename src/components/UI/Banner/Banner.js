import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Wrapper from '../../Layout/Wrapper/Wrapper';
import './Banner.css';

const banner = props => {
  let classes = ['Banner'];

  if (props.success) {
    classes.push('Banner--success');
  }

  if (props.danger) {
    classes.push('Banner--danger');
  }

  if (props.cookie) {
    classes.push('Banner--cookie')
  } 

  return (
    <CSSTransition
      in={props.show}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: "Banner--enter",
        enterActive: "Banner--enter-active",
        exit: "Banner--exit",
        exitActive: "Banner--exit-active"
      }}
    >
      <div className={classes.join(' ')} onClick={props.clicked}>
        <Wrapper>
          {props.children}
        </Wrapper>
      </div>
    </CSSTransition>
  );
}

export default banner;