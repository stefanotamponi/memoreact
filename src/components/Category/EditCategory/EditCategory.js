import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../../UI/Form/Button/Button';
import Input from '../../UI/Form/Input/Input';
import Modal from '../../UI/Modal/Modal';
import Tile from '../../UI/Tile/Tile';
import { checkValidity } from '../../../shared/utility';
import * as actions from '../../../store/actions';

const editCategory = props => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  //Validation stuff
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!isValid && touched) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });

  useEffect(() => {
    if (!props.isModalOpen) {
      setShow(false);
    }
  }, [props.isModalOpen]) 

  const categoryRules = {
    minLength: 3,
    maxLength: 15,
    required: true
  }

  const openModalHandler = () => {
    setShow(true);
    setTimeout(() => document.getElementById("category-input").focus(), 600)
    //That timeout is to give the modal the time to render input.
  }



  const inputChangedHandler = (e) => {
    setCategoryName(e.target.value);
    setTouched(true);
    setIsValid(checkValidity(e.target.value, categoryRules));
  }

  const createCategoryHandler = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onCreateCategory(categoryName);
      props.onPushData(props.userId, props.token);
      closeModalHandler();
      setCategoryName('');
    }
  }

  const editCategoryHandler = (e) => {
    e.preventDefault();
    const oldName = props.category; 
    if (isValid) {
      props.onEditCategory(categoryName, oldName);
      props.onPushData(props.userId, props.token);
      props.history.replace('/' + categoryName);
      closeModalHandler();
      setCategoryName(''); 
    }
  }

  const deleteCategoryHandler = (e) => {
    e.preventDefault();
    const categoryToDelete = props.category;
    closeModalHandler(); 
    props.onDeleteCategory(categoryToDelete);
    props.onPushData(props.userId, props.token);
    props.history.replace('/');
  }

  const closeModalHandler = () => {
    setShow(false);
  }

  let editCategoryElement;

  switch (props.action) {
    case 'add':
      editCategoryElement = (
        <div className="Category">
          <Tile icon="add" clickable clicked={openModalHandler}>Add new category</Tile>
          <Modal show={show} backdropClick={closeModalHandler}>
            <form onSubmit={createCategoryHandler}>
              <p>Please define the new <strong>category</strong> name.<br />The name must be between 3 and 10 characters.</p>
              <Input 
                changed={(e) => inputChangedHandler(e)}
                disabled={disabled}
                id="category-input"
                placeholder="Category name" 
                value={categoryName}
              />
              <Button fullWidth disabled={disabled}>Create</Button>
            </form>
          </Modal>
        </div>
      );
      break;

    case 'edit':
        editCategoryElement = (
          <div className="Category">
            <Tile clickable icon="edit" clicked={openModalHandler}>Edit category</Tile>
            <Modal show={show} backdropClick={closeModalHandler}>
              <form onSubmit={editCategoryHandler}>
                <p>Please define the new <strong>category</strong> name.<br />The name must be between 3 and 10 characters.</p>
                <Input 
                  changed={(e) => inputChangedHandler(e)}
                  disabled={disabled}
                  id="category-input"
                  placeholder="Category name" 
                  value={categoryName}
                />
                <Button fullWidth disabled={disabled}>Create</Button>
              </form>
            </Modal>
          </div>
        );
        break;
        
    case 'delete':
        editCategoryElement = (
          <div className="Category">
            <Tile clickable icon="delete" clicked={openModalHandler}>Delete category</Tile>
            <Modal show={show} backdropClick={closeModalHandler}>
              <form onSubmit={deleteCategoryHandler}>
                <p id="category-input" >Are you really sure? There's no coming back from this.</p>
                <Button danger fullWidth disabled={disabled}>Delete</Button>
              </form>
            </Modal>
          </div>
        );
        break;

    default :
      editCategoryElement = (
        <div className="Category">
          <Tile clickable icon="add" clicked={openModalHandler}>Add new category</Tile>
          <Modal show={show} backdropClick={closeModalHandler}>
            <form onSubmit={editCategoryHandler}>
              <p>Please define the new <strong>category</strong> name.<br />The name must be between 3 and 10 characters.</p>
              <Input 
                changed={(e) => inputChangedHandler(e)}
                disabled={disabled}
                id="edit-category-input"
                placeholder="Category name" 
                value={categoryName}
              />
              <Button fullWidth disabled={disabled}>Edit</Button>
            </form>
          </Modal>
        </div>
      );
      break;
  }

  return editCategoryElement;
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    isModalOpen: state.ui.modalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateCategory: (category) => dispatch(actions.createCategory(category)),
    onEditCategory: (category, oldName) => dispatch(actions.editCategory(category, oldName)),
    onDeleteCategory: (category) => dispatch(actions.deleteCategory(category)),
    onPushData: (userId, token) => dispatch(actions.pushData(userId, token))
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (withRouter(editCategory));