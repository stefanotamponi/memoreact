import * as actionTypes from './actionTypes';

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING
  };
}

export const finishLoading = () => {
  return {
    type: actionTypes.FINISH_LOADING
  };
}


export const openModal = () =>  {
  return {
    type: actionTypes.OPEN_MODAL
  };
}

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  };
}