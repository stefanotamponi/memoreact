import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
  userId: '',
  token: '',
  error: '',
  info: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.AUTH_SUCCESS: 
      return {
        ...state,
        email: action.payload.id,
        userId: action.payload.userId,
        token: action.payload.token,
        error: ""
      }
    
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.payload.message
      }

    case actionTypes.LOGOUT:
      return {
        ...state,
        username: '',
        email: '',
        userId: '',
        token: '',
        error: ''
      }
    
    case actionTypes.DELETE_USER_SUCCESS:
      return state;

    case actionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case actionTypes.RESET_PASSWORD_OK:
      return {
        ...state,
        error: '',
        info: 'Please folllow the instruction in your mail'
      }
    
    case actionTypes.RESET_PASSWORD_KO:
      return {
        ...state,
        error: action.error
      }

    case actionTypes.CLEAR_INFO:
      return {
        ...state,
        info: ''
      }

    default:
      return state;
  }
}

export default reducer;