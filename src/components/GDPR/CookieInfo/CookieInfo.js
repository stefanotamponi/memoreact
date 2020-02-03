import React from 'react';
import { connect } from 'react-redux';

import Button from '../../UI/Form/Button/Button';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import * as actions from '../../../store/actions/';
import './CookieInfo.css';

const cookieInfo = props => {
  const enableCookieHandler = () => {
    props.onAcceptCookies()
    if (props.closed) {
      props.closed();
    }
  }

  const disableCookieHandler = () => {
    props.onDenyCookies()
    if (props.closed) {
      props.closed();
    }
  }

  return (
    <div className="CookieInfo">
      <div className="CookieInfo__txt">
        <h3>Something that you need to know...</h3>
        <p>This website saves data on your device in order to save authentication for your session.</p>
        <p>Please note that you need to give this consent in order to use this website.</p>
        <PrivacyPolicy />
        <p></p>
      </div>
      <div className="CookieInfo__btns">
        <Button clicked={enableCookieHandler}>I agree</Button>
        <Button transparentLight clicked={disableCookieHandler}>I don't agree</Button>     
      </div>   
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAcceptCookies: () => dispatch(actions.acceptCookies()),
    onDenyCookies: () => dispatch(actions.denyCookies())
  }
}

export default connect (null, mapDispatchToProps) (cookieInfo);