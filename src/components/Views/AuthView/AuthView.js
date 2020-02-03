import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button from '../../UI/Form/Button/Button';
import Input from '../../UI/Form/Input/Input';
import PrivacyPolicy from '../../GDPR/PrivacyPolicy/PrivacyPolicy';
import ResetPassword from './ResetPassword/ResetPassword';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions/';

const authView = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(true);

  //Validation stuff
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!isValid && touched) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  })

  const inputChangedHandler = (e) => {
    let rules = {};
    if (e.target.id === 'email-field') {
      setEmail(e.target.value);
      rules = {
        minLength: 3,
        maxLength: 30,
        required: true
      }
    } else if (e.target.id === 'password-field') {
      setPassword(e.target.value);
      rules = {
        minLength: 8,
        required: true
      }
    }

    setTouched(true);
    setIsValid(checkValidity(e.target.value, rules));
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onAuth(email, password, isSignup);
    }
  }

  const changeModeHandler = (e) => {
    e.preventDefault(); 
    setIsSignup(!isSignup)
  }

  return (
    <div className="AuthView">
      <section>
        <Wrapper>
          {isSignup
            ? <h1>Login Now.</h1>
            : <h1>Register Now.</h1>
          }
          <form onSubmit={onSubmitHandler}>
            <Input id="email-field" inputType="email" label="email" placeholder="email" changed={(e) => inputChangedHandler(e)} />
            <Input id="password-field" inputType="password" label="password" placeholder="password" changed={(e) => inputChangedHandler(e)} />
            <div style={{margin: "30px 0"}}>
              By clicking on the button below you agree to the terms contained in the <PrivacyPolicy />
            </div>
            <Button disabled={disabled}>
              {isSignup ? "Sign In" : "Sign Up"}
            </Button>
            <Button light clicked={(e) => changeModeHandler(e)}>
              {isSignup ? "switch to sign up" : "switch to sign in"}
            </Button>
          </form>
          <ResetPassword />
        </Wrapper>      
      </section>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (user, password, isSignup) => dispatch(actions.auth(user, password, isSignup))
  }
}

export default connect (null, mapDispatchToProps) (authView);