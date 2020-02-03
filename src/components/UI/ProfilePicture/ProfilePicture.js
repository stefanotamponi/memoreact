import React from 'react';

import Logo from '../Logo/Logo';
import './ProfilePicture.css';

const profilePicture = props => {
  // Old version stuff
  // let initials = null;
  // if (props.username) {
  //   initials = props.username.match(/\b\w/g).join('');
  // }

  return (
    <div className="ProfilePicture" style={{width: props.size + "px", height: props.size+ "px"}}>
      {/* <h1 className="ProfilePicture__text">{initials}</h1> */}
      <Logo />
    </div>
  );
}

export default profilePicture;