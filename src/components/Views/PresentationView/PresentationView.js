import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Banner from '../../UI/Banner/Banner';
import Button from '../../UI/Form/Button/Button';
import CookieInfo from '../../GDPR/CookieInfo/CookieInfo';
import FeaturesList from './FeaturesList/FeaturesList';
import Hero from './Hero/Hero';
import Story from './Story/Story';
import "./PresentationView.css";
import BottomBanner from './BottomBanner/BottomBanner';

const presentationView = props => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (props.cookieConsent) {
      setShow(false);
    }
  }) 

  const closeCookieHandler = () => {
    setShow(false);
  }

  return (
    <div className="PresentationView">
      <Hero />
      <Story {...props} />
      <FeaturesList />
      <BottomBanner {...props} />
      <Banner cookie show={show}>
        <CookieInfo closed={closeCookieHandler} />
      </Banner>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    cookieConsent: state.gdpr.cookieConsent
  }
}

export default connect (mapStateToProps) (presentationView);