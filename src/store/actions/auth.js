import * as actionTypes from './actionTypes';
import axios from '../../shared/axios';
import { fetchData, clearData } from './core';

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
      dispatch(clearData());
    }, expirationTime * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let path = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBd6WFxcdQzN16sz-71E78BMyc8QWhQ8lY`;
    if (isSignup) {
      path = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBd6WFxcdQzN16sz-71E78BMyc8QWhQ8lY`;
    }

    axios.post(path, data)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        dispatch(authSuccess(response.data.localId, response.data.email, response.data.idToken));
        dispatch(fetchData(response.data.localId, response.data.idToken));
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('expirationDate', expirationDate);
      })
      .catch(err => {
        dispatch(authFailed(err.message))
      })

  }
}



export const authSuccess = (userId, id, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      userId: userId,
      id: id,
      token: token
    }
  }
}

export const authFailed = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: err
  }
}

export const logout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return dispatch => {
    dispatch(logoutFinish())
    dispatch(clearData());
  }
}

export const logoutFinish = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const deleteUser = (idToken) => {
  return dispatch => {
    const data = {idToken: idToken}; 
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBd6WFxcdQzN16sz-71E78BMyc8QWhQ8lY`;
    axios.post(url, data)
      .then(() => {
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieExpirationDate');
        dispatch(deleteSuccess())
        dispatch(logout())
      })
      .catch(err => dispatch(deleteFail(err.message)))
  }
}

export const deleteSuccess = () => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS
  }
}

export const deleteFail = (err) => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    payload: err
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
      dispatch(clearData());
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationDate'));
      if (expirationTime <= new Date() ) {
        dispatch(logout());
        dispatch(clearData());
      } else {
        const userId = localStorage.getItem('userId');
        const id = localStorage.getItem('email');
        dispatch(authSuccess(userId, id, token));
        dispatch(fetchData(userId, token));
        dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export const resetPassword = email => {
  return dispatch => {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBd6WFxcdQzN16sz-71E78BMyc8QWhQ8lY';
    axios.post(url, {
      requestType: 'PASSWORD_RESET',
      email: email
    })
      .then((res) => {
        console.log('res', res);
        if (res) {
          dispatch(resetPasswordOK());
        } else {
          dispatch(resetPasswordKO(res));
        }
      });
  }
}

export const resetPasswordOK = () => {
  return {
    type: actionTypes.RESET_PASSWORD_OK
  }
}

export const resetPasswordKO = err => {
  return {
    type: actionTypes.RESET_PASSWORD_KO,
    error: err
  }
}

export const clearInfo = () => {
  return {
    type: actionTypes.CLEAR_INFO
  }
}