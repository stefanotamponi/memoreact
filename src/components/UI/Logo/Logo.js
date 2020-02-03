import React, { useState, useEffect } from 'react';

import LogoCircleWhite from '../../../assets/images/logo/Memoreact-symbol-white-circle.svg';
import LogoWhite from '../../../assets/images/logo/Memoreact-symbol-white.svg';
import LogoCombinationWhite from '../../../assets/images/logo/Memoreact-combination-white.svg';
import "./Logo.css";

const logo = props => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const combinationResizeUrl = windowWidth <= 500 ? LogoCircleWhite : LogoCombinationWhite;
  const windowResizeHandler = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', windowResizeHandler);
    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    }
  }, []);

  let styles = {
    backgroundImage: `url(${LogoWhite})`,
    height: `${props.height}px`
  }  


  if (props.combination) {
    styles= {
      backgroundImage: `url(${combinationResizeUrl})`,
      height: `${props.height}px`
    }
  }


  return (
    <div className="Logo" style={styles}>
    </div>
  )
}

export default logo;