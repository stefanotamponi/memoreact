import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Modal from '../../UI/Modal/Modal';

const privacyPolicy = props => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!props.isModalOpen) {
      setShow(false);
    }
  }, [props.isModalOpen]) 

  const openModalHandler = () => {
    setShow(true);
  }

  const closeModalHandler = () => {
    setShow(false);
  }

  const styles = {
    cursor: "pointer",
    display: "inline",
    textDecoration: "underline"
  }

  return (
    <div className="PrivacyPolicy">
      <a style={styles} onClick={openModalHandler}>Privacy Policy</a>
      <Modal show={show} backdropClick={closeModalHandler}>
        <h1>Privacy Policy</h1>
        <h3>Who I am</h3>
        <p>
          The responsible data controller for this website is:
        </p>
        <p> 
          <strong>Stefano Tamponi</strong> (stefanotamponi.dev@gmail.com)
        </p>
        <p>
          You can contact me any time via email if you have questions about this privacy policy.
        </p>
        <h3>About this site</h3>
        <p><strong>This is a demo project</strong>: this website was created by me to showcase my ability as a developer. I can access all the data uploaded to it and please note that I can <strong>delete both data and website at any time if I find it necessary.</strong> </p>
        <h3>How I collect your data</h3>
        <p>The only data I collect is relative to the user authentication data and their notes / categories created in this website. <br />
        Please consider that I can see and delete that data in every moment.
        Everything is stored on <strong>Google Firebase</strong> and is automatically recovered by this webapp on login. <br />
        Everything related to the user is deleted with the <em>Delete Account</em> feature accessible from the dashboard, including the Account itself.</p>
        <h3>Your rights</h3>
        <p>You can exercise your rights by sending me an email at <a href="mailto:stefanotamponi.dev@gmail.com">stefanotamponi.dev@gmail.com</a>. You can access information on all data stored about you. Get in contact and I wil provide you with all information on data I have about you. You have the right to be 'forgotten' by me, or you can exercise that by chosing <em>Delete Account</em> on the Dashboard Menu: this means that every data I have about you will be deleted. </p>
        <p>You have the right to withdraw your consent. Please tell me first, so I have a chance to address your concerns. If I fail in this, you can address any complaint to your national data protection authorities.</p>
        <h3>Cookies &amp; Local Storage</h3>
        <p>This websites use local storage, something similar to cookies: it stores data in order to save your cookie agreement and to keep you logged in: this includes access tokens and your email id (the email id will be deleted on logout, everything will be deleted on account deletion). You can delete all this data from your browser options, please consult your browser documentation for more information on how to do that. </p>
        <h3>Analytics and tracking</h3>
        <p>I do not use any trackers or analytics services on my website.</p>
        <h3>Questions &amp; feedback</h3>
        <p>I try to keep my privacy policy as transparent and easy to understand as possible. Please let me know if I can improve it further or if you have any other questions.</p>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isModalOpen: state.ui.modalOpen
  }
}

export default connect (mapStateToProps) (privacyPolicy);