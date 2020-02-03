import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 

import Button from '../../UI/Form/Button/Button';
import Input from '../../UI/Form/Input/Input';
import Modal from '../../UI/Modal/Modal';
import Tile from '../../UI/Tile/Tile';
import { checkValidity, usefulDate, pageInfo } from '../../../shared/utility';
import * as actions from '../../../store/actions';

const editTodo = props => {
  const [show, setShow] = useState(false);
  const [todoName, setTodoName] = useState('');

  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  /*actual page info*/

  const thisTodo = pageInfo(props.location.pathname).location;
  const thisParent = pageInfo(props.location.pathname).todoParent;

  useEffect(() => {
    if (!isValid && touched) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  })

  useEffect(() => {
    if (!props.isModalOpen) {
      setShow(false);
    }
  }, [props.isModalOpen])

  const todoRules = {
    maxLength: 20,
    minLength: 3,
    required: true
  }


  const openModalHandler = () => {
    setShow(true);
    //add focus, but wait fot the modal to open.
    setTimeout(() => document.getElementById("edit-todo-input").focus(), 600)
  }

  const inputChangedHandler = e => {
    setTodoName(e.target.value);
    setTouched(true);
    setIsValid(checkValidity(e.target.value, todoRules));
  }

  const createTodoHandler = (e) => {        
    e.preventDefault();
    const time = usefulDate(new Date(), 'DdmY-hm');

    if (isValid && touched) {
      props.onCreateTodo(todoName, props.parent, time);
      props.onPushData(props.userId, props.token);
      closeModalHandler();
      setTodoName('');
    }
  }

  const deleteTodoHandler = (e) => {
    e.preventDefault();
    props.onDeleteTodo(thisTodo, thisParent);
    props.onPushData(props.userId, props.token);
    closeModalHandler();
    props.history.replace('/' + thisParent);
  }

  const closeModalHandler = () => {
    setShow(false);
  }

  let editTodoElement;

  switch(props.action) {
    case "add": 
      editTodoElement = (
        <Fragment>
          <Tile icon="add" clickable clicked={openModalHandler}>Create new element</Tile>
          <Modal show={show} backdropClick={closeModalHandler}>
            <form onSubmit={createTodoHandler}>
              <p>Please define the new <strong>element</strong> name.<br />The name must be between 3 and 10 characters.</p>
              <Input 
                changed={(e) => inputChangedHandler(e)}
                disabled={disabled}
                id="edit-todo-input"
                placeholder="New element name" 
                value={todoName}
              />
              <Button fullWidth disabled={disabled}>Create</Button>
            </form>
          </Modal>
        </Fragment>
      );
      break;

    case "content":
      

    case "delete":
      editTodoElement = (
        <div className="ToDo">
          <Tile icon="delete" clickable clicked={openModalHandler}>Delete {props.todo}</Tile>
          <Modal show={show} backdropClick={closeModalHandler}>
            <form onSubmit={deleteTodoHandler}>
              <p>Are you really sure? There's no coming back from this.</p>
              <Button danger fullWidth disabled={disabled}>Delete</Button>
            </form>
          </Modal>
        </div>
      );
      break;

    default: 
      editTodoElement = (
        <Fragment>
          <Tile icon="add" clickable clicked={openModalHandler}>Create new element</Tile>
          <Modal show={show} backdropClick={closeModalHandler}>
            <form onSubmit={createTodoHandler}>
              <p>Please define the new <strong>element</strong> name.<br />The name must be between 3 and 10 characters.</p>
              <Input 
                changed={(e) => inputChangedHandler(e)}
                disabled={disabled}
                id="edit-todo-input"
                placeholder="New element name" 
                value={todoName}
              />
              <Button fullWidth disabled={disabled}>Create</Button>
            </form>
          </Modal>
        </Fragment>
      );
      break;
  }
  

  return editTodoElement;
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    isModalOpen: state.ui.modalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateTodo: (todo, categoryName, time) => dispatch(actions.createTodo(todo, categoryName, time)),
    onDeleteTodo: (todo, categoryName) => dispatch(actions.deleteTodo(todo, categoryName )),
    onPushData: (userId, token) => dispatch(actions.pushData(userId, token))
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (withRouter(editTodo));