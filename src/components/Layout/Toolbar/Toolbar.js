import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BackButton from '../../UI/BackButton/BackButton';
import Button from '../../UI/Form/Button/Button';
import Icon from '../../UI/Icon/Icon';
import Logo from '../../UI/Logo/Logo';
import Menu from './Menu/Menu';
import Modal from '../../UI/Modal/Modal'; 
import ProfilePicture from '../../UI/ProfilePicture/ProfilePicture';
import Wrapper from '../Wrapper/Wrapper';
import { pageInfo } from '../../../shared/utility';
import './Toolbar.css';

const toolbar = props => {
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!props.isModalOpen) {
      setShow(false);
    }
  }, [props.isModalOpen]);

  useEffect(() => {
    if (props.cookieConsent) {     
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }) 

  let username = "Logged Out";
  let email = "N / A";
  let mainArea;
  let navArea;
  let classes = [" "]

  if (!props.username && !props.email) {
    classes.push("header--logged-out");
    if (show) setShow(false)
  } else if (!props.username && props.email) {
    username = props.email.match(/^[^@]*/)[0].substring(0, 12);
    email = ' ';
    classes.push("header--email-name");
  }

  let pageTitle = pageInfo(props.location.pathname).location;
  let pageType = pageInfo(props.location.pathname).type;

  const openMenuHandler = () => {
    setShow(true);
  }

  const closeMenuHandler = () => {
    setShow(false);
  }
 
  const backHomeHandler = () => {
    props.history.push('/');
  }

  const gotoAuth = () => {
    props.history.push('/auth');
  }

  switch (pageType) {
    case "category":
      mainArea = (
        <div className="header__user-data">
          <Icon shape="back" clicked={backHomeHandler} />
          <h3 className="header__page-title">{pageTitle}</h3>
        </div>
      );
      navArea = (
        <nav className="header__menu">
          <Icon shape="menu" clicked={openMenuHandler} />
        </nav>
      );

      if (pageTitle === 'auth') {
        mainArea = (
          <div className="header__user-data">
            <Icon shape="back" clicked={backHomeHandler} />
            <h3 className="header__page-title">Authentication</h3>
          </div>
        );
        
        navArea = null;
      } 
      break;
    
    case "todo":
      mainArea = (
        <div className="header__user-data">
          <BackButton />
          <h3 className="header__page-title">{pageTitle}</h3>
        </div>
      );
      navArea = (
        <nav className="header__menu">
          <Icon shape="menu" clicked={openMenuHandler} />
        </nav>
      );
      break;  

    default: 
      if (!props.username && !props.email) {
        mainArea = (
          <div className="header__user-data">
            <Logo combination height={50} />
          </div>
        );
        navArea = (
          <nav className="header__menu">
            <Button 
              disabled={disabled}
              clicked={gotoAuth}
              header
            >
              Login / SignUp
            </Button>
          </nav>
        )
      } else {
        mainArea = (
          <div className="header__user-data">
            <ProfilePicture username={username} size="65"/>
            <div>
              <h3 className="header__username">{username}</h3>
              <small className="header__email">{email}</small>
            </div>
          </div>
        );
        navArea = (
          <nav className="header__menu">
            <Icon shape="menu" clicked={openMenuHandler} />
          </nav>
        )
      }
  }

  return (
    <header className={classes.join(" ")}>
      <Wrapper>
        <div className="header__inner">
          {mainArea}
          {navArea}
        </div>
      </Wrapper>
      <Modal show={show} backdropClick={closeMenuHandler} >
        <Menu {...props} />
      </Modal>
    </header>
  ); 
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    email: state.auth.email,
    isModalOpen: state.ui.modalOpen,
    cookieConsent: state.gdpr.cookieConsent
  }
}

export default connect (mapStateToProps) (withRouter(toolbar));