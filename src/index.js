import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App/App';
import authReducer from './store/reducers/auth';
import coreReducer from './store/reducers/core';
import gdprReducer from './store/reducers/gdpr';
import uiReducer from './store/reducers/ui';
import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  core: coreReducer,
  gdpr: gdprReducer,
  ui: uiReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <HashRouter basename="/memoreact/">
      <App />
    </HashRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
