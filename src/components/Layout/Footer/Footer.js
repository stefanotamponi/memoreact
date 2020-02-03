import React from 'react';

import Wrapper from '../Wrapper/Wrapper';
import PrivacyPolicy from '../../GDPR/PrivacyPolicy/PrivacyPolicy';
import './Footer.css';

const footer = props => (
  <footer>
    <Wrapper>
      <div className="footer__inner">
        <p>©2020 Stefano Tamponi</p>
        <PrivacyPolicy />
      </div>
    </Wrapper>
  </footer>
);


export default footer;