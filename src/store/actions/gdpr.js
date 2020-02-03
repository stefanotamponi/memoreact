import * as actions from './actionTypes';
import { daysBetween } from '../../shared/utility';

export const checkCookies = () => {
  return dispatch => {
    if (localStorage.getItem('cookieConsent')) {
      dispatch(acceptCookies());
    }    
    const expirationDate = localStorage.getItem('cookieExpirationDate');

    if ((daysBetween(new Date(), expirationDate)) < 0 ) {
      //'Expired' consent after 10 days
      localStorage.removeItem('cookieConsent');
      localStorage.removeItem('cookieExpirationDate');
    }
  }
}

export const acceptCookies = () => {
  let expirationDate = new Date();
  expirationDate.setDate((expirationDate.getDate() + 10));

  localStorage.setItem('cookieConsent', true);
  localStorage.setItem('cookieExpirationDate', expirationDate);
  return {
    type: actions.ACCEPT_COOKIES
  }
}

export const denyCookies = () => {
  return {
    type: actions.DENY_COOKIES
  }
}