import * as actions from '../actions/actionTypes';

const initialState = {
  cookieConsent: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ACCEPT_COOKIES:
      return {
        ...state,
        cookieConsent: true
      }

    case actions.DENY_COOKIES: 
      return {
        ...state,
        cookieConsent: false
      }
      
    default: 
      return state;
  }
}

export default reducer;