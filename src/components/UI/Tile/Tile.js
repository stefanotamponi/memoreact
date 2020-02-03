import React from 'react';

import Icon from '../Icon/Icon';
import './Tile.css';

const tile = props => {
  let classes = ['Tile']

  if (props.clickable) {
    classes.push('Tile--clickable')
  }

  return (
    <div className={classes.join(' ')} onClick={props.clicked}>
      <Icon shape={props.icon}/>
      <p className="Tile__text">{props.children}</p>
    </div>
  );
}

export default tile;