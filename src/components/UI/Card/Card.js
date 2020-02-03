import React from 'react';

import Icon from '../Icon/Icon';
import './Card.css';

const card = props => {
  let icon = null;
  if (props.icon) {
    icon = <Icon shape={props.icon} size="25" />
  }

  return (
    <div className="Card">
      {icon}
      <div>
        <h2 className="Card__title">{props.title}</h2>
        <p className="Card__description">{props.description}</p>
      </div>
    </div>
  );
}

export default card;