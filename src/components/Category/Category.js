import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../UI/Icon/Icon';
import './Category.css';

const category = props => (
  <div className="Category">
    <span className="Category__main">
      <Icon className="Category__icon" shape={props.icon} />
      <p className="Category__title"><Link to={`${props.name}`}>{props.name}</Link></p>
    </span>
    <p className="Category__number">{props.count}</p>
  </div>
);

export default category;