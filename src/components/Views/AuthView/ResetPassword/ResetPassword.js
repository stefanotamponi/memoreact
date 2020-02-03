import React, { useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';

import Banner from '../../../UI/Banner/Banner';
import Button from '../../../UI/Form/Button/Button';
import Modal from '../../../UI/Modal/Modal';
import Input from '../../../UI/Form/Input/Input';
import { checkValidity } from '../../../../shared/utility';
import * as actions from '../../../../store/actions';

const resetPassword = props => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [disabled, setDisabled] = useState(true);
  
  useEffect(() => {
    if (!isValid && touched) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });

  useEffect(() => {
    if (!props.isModalOpen) {
      setShow(false);
    }
  }, [props.isModalOpen]) 

  useEffect(() => {
    if (props.message) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  })

  const mailRules = {
    minLength: 3,
    required: true
  }

  const openModalHandler = () => {
    setShow(true);
    setTimeout(() => document.getElementById("reset-password-input").focus(), 600)

  }

  const inputChangedHandler = e => {
    setValue(e.target.value);
    setTouched(true);
    setIsValid(checkValidity(e.target.value, mailRules));
  }

  const submitHandler = e => {
    e.preventDefault();
    if (isValid) {
      props.onResetPassword(value);
      setValue('');
      closeModalHandler();  
    }
  }

  const closeModalHandler = () => {
    setShow(false);
  }


  return (
    <Fragment>
      <Button
        clicked={openModalHandler} 
        light
        inline>
        Forgot Password?
      </Button>
      <Modal show={show} backdropClick={closeModalHandler}>
        <form onSubmit={submitHandler}>
          <h3>Password Recovery</h3>
          <p>Please fill this form and click the button below to recover the forgotten password.</p>
          <Input 
            changed={inputChangedHandler}
            disabled={disabled}
            id="reset-password-input"
            label="Enter your registered email address"
            value={value}
          />
          <Button disabled={disabled}>Recover Password</Button>
        </form>
      </Modal>
      <Banner success show={showBanner} clicked={props.onClearInfo} >
        {props.message}
      </Banner>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isModalOpen: state.ui.modalOpen,
    message: state.auth.info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetPassword: (email) => dispatch(actions.resetPassword(email)),
    onClearInfo: () => dispatch(actions.clearInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (resetPassword);