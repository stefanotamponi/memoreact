import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthView from '../Views/AuthView/AuthView';
import CategoryView from '../Views/CategoryView/CategoryView';
import Container from '../Layout/Container/Container';
import Dashboard from '../Views/Dashboard/Dashboard';
import Layout from '../Layout/Layout';
import PresentationView from '../Views/PresentationView/PresentationView';
import SingleToDo from '../Views/SingleToDo/SingleToDo';
import { authCheckState, checkCookies } from '../../store/actions';

const app = props  => {
  useEffect(() => {
    props.checkAuth();
    props.checkCookies();
  }, [])

  let routes = (
    <Switch>
      <Route path="/" exact component={PresentationView} />
      <Route path="/auth" component={AuthView} />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/:category/" exact component={CategoryView} />
        <Route path="/:category/:id" exact component={SingleToDo} />
      </Switch>
    );
  };

  return (
    <Layout>
      <Container>
        {routes}
      </Container>
      <Redirect to="/" />
    </Layout>
  ); 
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.userId !== ''
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(authCheckState()),
    checkCookies: () => dispatch(checkCookies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(app);