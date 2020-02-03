import * as actions from '../actions/actionTypes';

const initialState = {
  loading: false,
  modalOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.START_LOADING:
      return {
        ...state,
        loading: true
      }

    case actions.FINISH_LOADING:
      return {
        ...state,
        loading: false
      }

    case actions.OPEN_MODAL:
      return {
        ...state,
        modalOpen: true
      }

    case actions.CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false
      }

    default:
      return state;
  }
}

export default reducer;