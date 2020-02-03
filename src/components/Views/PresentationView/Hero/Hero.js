import React from 'react';

import Wrapper from '../../../Layout/Wrapper/Wrapper';
import "./Hero.css";

const hero = () => (
  <section className="Hero">
    <Wrapper>
      <h1>Take your thoughts to the cloud.</h1>
      <small>View the source code on <a href="https://www.google.com/">GitHub</a></small>
    </Wrapper>
  </section>
);

export default hero;