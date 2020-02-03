import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux'; 

import Button from '../UI/Form/Button/Button';
import Modal from '../UI/Modal/Modal';
import Tile from '../UI/Tile/Tile';
import * as actions from '../../store/actions';

const editUser = props => {
  const [show, setShow] = useState(false);
  
  const openModalHandler = () => {
    setShow(true);
  }

  const deleteAccountHandler = () => {
    props.onClearData();
    props.onPushData(props.user, props.token);
    props.onDeleteUser(props.token);
    props.onLogout();
    closeModalHandler();
  }

  const closeModalHandler = () => {
    setShow(false);
  }

  let editAccountElement;

  switch(props.action) {
    case 'logout':
      editAccountElement = (
        <Tile clickable icon="logout" clicked={props.onLogout}>Logout</Tile>        
      );
      break;

    case 'delete':
      editAccountElement = (
        <Fragment>
          <Tile
            clickable
            clicked={openModalHandler}
            icon="delete"
          >
            Delete Account
          </Tile>
          <Modal show={show}>
            <p>Are you really sure about this? You can't go back from that.</p>
            <Button danger icon="delete" clicked={deleteAccountHandler}>Delete Account</Button>
          </Modal>
        </Fragment>
      );
      break;

    default: 
      editAccountElement = (
        <Fragment>
          <Tile clickable icon="logout" clicked={props.onLogout}>Logout</Tile>
        </Fragment>
      );
      break;
  }
  

  return editAccountElement;
}

const mapStateToProps = state => {
  return {
    user: state.auth.userId,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteUser: token => dispatch(actions.deleteUser(token)),
    onLogout: () => dispatch(actions.logout()),
    onPushData: (user, token) => dispatch(actions.pushData(user, token)),
    onClearData: () => dispatch(actions.clearData())
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (editUser);