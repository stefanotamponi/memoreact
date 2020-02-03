import React from 'react';
import { withRouter } from 'react-router-dom';

import Icon from '../Icon/Icon';

const backButton = props => (
  <Icon shape="back" clicked={props.history.goBack} />
);

export default withRouter(backButton);
