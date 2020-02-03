import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import './Modal.css';
import * as actions from '../../../store/actions';

const modal = props => {
  const [show, setShow] = useState(props.show);

  //sync props & Local State, dispatch actions accordingly (works)

  useEffect(() => {
    if (props.show) {
      setShow(true);
      props.onOpenModal();
    }
    return () => {
      if (props.show) {
        setShow(false);
        props.onCloseModal();
      }
    }  
  }, [props.show]);

  useEffect(() => {
    if (!props.isModalOpen) {
      setShow(false);
    }
  }, [props.isModalOpen])

  return (
    <CSSTransition
      classNames={{
        enter: 'Modal--enter',
        enterActive: 'Modal--enter-active',
        exit: 'Modal--exit',
        exitActive: 'Modal--exit-active' 
      }}
      in={show}
      timeout={600}
      mountOnEnter
      unmountOnExit
    >
      <div className="Modal">
        <div className="Modal__backdrop" onClick={props.backdropClick}></div>
        <div className="Modal__inner">
          {props.children}
        </div>
      </div>
    </CSSTransition>
  );
}

const mapStateToProps = state => {
  return {
    isModalOpen: state.ui.modalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOpenModal: () => dispatch(actions.openModal()),
    onCloseModal: () => dispatch(actions.closeModal())
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (modal);