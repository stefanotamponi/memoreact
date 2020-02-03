import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import * as actions from '../../store/actions';
import { pageInfo } from '../../shared/utility';
import Icon from '../UI/Icon/Icon';
import './ToDo.css';

const todo = props => {
  const [completed, setCompleted] = useState(false);
  const [shape, setShape] = useState("square");
  useEffect(() => {
    setCompleted(props.completed);
    if (completed) {
      setShape("checked");
    } else {
      setShape("square");
    };
  });

  const path = props.location.pathname + '/' + props.title;
  const parent = pageInfo(props.location.pathname).location;

  const completionHandler = () => {
    if (completed) {
      props.onUpdateCompleted(props.title, parent, false);
      props.onPushData(props.userId, props.token);
      setCompleted(false);
    } else {
      props.onUpdateCompleted(props.title, parent, true);
      props.onPushData(props.userId, props.token);
      setCompleted(true); 
    }
  };

  return (
    <div className="ToDo"> 
      <Icon shape={shape} clicked={completionHandler}/>
      <p className="ToDo__title"><Link to={path}>{props.title}</Link></p>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateCompleted: (id, parent, status) => dispatch(actions.updateTodoStatus(id, parent, status)),
    onPushData: (userId, token) => dispatch(actions.pushData(userId, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(todo));