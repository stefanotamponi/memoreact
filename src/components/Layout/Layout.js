import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../shared/axios';

import Footer from './Footer/Footer';
import Toolbar from './Toolbar/Toolbar';
import Spinner from '../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

const layout = props => {
  useEffect(() => {
    if (props.modalOpen) {
      document.addEventListener('keyup', (e) => {
        if (e.code == 'Escape') {
          props.onCloseModal();
        }
      })
    }

    return () => {
      //fallback useEffect (will clean listener later.)
    }

  }, [props.modalOpen])

  return (
    <Fragment>
      <Toolbar />
      {props.children}
      <Spinner show={props.loading} />
      <Footer />
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.ui.loading,
    modalOpen: state.ui.modalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseModal: () => dispatch(actions.closeModal())
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (withErrorHandler(layout, axios));