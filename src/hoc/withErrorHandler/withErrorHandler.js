import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Banner from '../../components/UI/Banner/Banner';
import * as actions from '../../store/actions';

const withErrorHandler = (Component, axios) => {
  const innerComponent = props => {
    const [error, setError] = useState('');

    useEffect(() => {
      const reqInterceptor = axios.interceptors.request.use(request => {
        setError('');
        props.onStartLoading();
        return request;
      });
      const resInterceptor = axios.interceptors.response.use(response => {
        props.onFinishLoading();
        return response;
      }, error => {
        props.onFinishLoading();
        if (error.response && error.response.data.error.message) {
          setError(error.response.data.error.message);
        } else if (error.response) {
          if (error.toString() === 'Error: Request failed with status code 401') {
            setError('Session expired. Please check your connection and reload the page.')
          } else {
            setError(error.toString());
          }
        } else {
          setError('Connection error: please check your connection.');
        }
      });

      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
      
    }, []);

    const clearErrorHandler = () => {
      setError('');
    }

    return (
      <Fragment>
        <Banner 
          danger
          show={error ?  true : false}
          clicked={clearErrorHandler}
        >
          {error}  
        </Banner>
        <Component {...props} />
      </Fragment>
    );
  }

  const mapDispatchToProps = dispatch => {
    return {
      onStartLoading: () => dispatch(actions.startLoading()),
      onFinishLoading: () => dispatch(actions.finishLoading())
    }
  }

  return connect (null, mapDispatchToProps) (innerComponent);
}

export default withErrorHandler;