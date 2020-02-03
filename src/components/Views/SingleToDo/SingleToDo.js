import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { pageInfo } from '../../../shared/utility';

import Button from '../../UI/Form/Button/Button';
import Icon from '../../UI/Icon/Icon';
import Input from '../../UI/Form/Input/Input';
import Tile from '../../UI/Tile/Tile';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import { updateTodoContent } from '../../../store/actions';
import * as actions from '../../../store/actions';
import './SingleToDo.css';

const SingleTodo = props => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(todo.content)
  }, [])

  let { id } = useParams();
  let parent = pageInfo(props.location.pathname).todoParent;
  let todo = props.coreState[parent].children.filter(todo => {
    return todo.title === id
  })[0];

  const contentChangedHandler = e => {
    setValue(e.target.value);
  }

  const btnClickHandler = () => {
    props.onUpdateTodoContent(id, parent, value);
    props.onPushData(props.auth.userId, props.auth.token)
  }

  return (
    <div className="SingleTodo"> 
      <div className="SingleTodo__time">
        <Wrapper>
          <Icon shape="clock" /><p>{todo.time}</p>
        </Wrapper>
      </div>
      <Wrapper>
        <Tile icon="list">Add some text</Tile>
        <Input 
          changed={contentChangedHandler}
          inputType="textarea" 
          label=""
          placeholder="Write something..." 
          value={value}
        />
        <Button clicked={btnClickHandler}>Save</Button>

      </Wrapper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    coreState: state.core,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTodoContent: (id, parent, value) => dispatch(updateTodoContent(id, parent, value)),
    onPushData: (userId, token) => dispatch(actions.pushData(userId, token))
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (withRouter(SingleTodo));