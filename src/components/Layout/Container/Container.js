import React from 'react';

const container = props => {

  //Main Container for Views in the Router.
  //Padding added in order to leave space for the footer.
  
  const styles = {
    paddingBottom: "50px"
  }

  return (
    <div style={styles}>
      {props.children}
    </div>
  );
}

export default container;