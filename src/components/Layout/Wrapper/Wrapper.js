import React from 'react';

const wrapper = props => (
  <div style={{
    margin: "0 auto",
    maxWidth: "1000px",
    padding: "0 30px",
    width: "100%"
    }}> 
    {props.children}
  </div>
);

export default wrapper;
