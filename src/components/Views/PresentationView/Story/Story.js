import React from 'react';

import Wrapper from '../../../Layout/Wrapper/Wrapper';
import "./Story.css";

const story = props => {
  const goToAuth = () => {
    props.history.push("/auth");
  }

  return (
    <section className="Story">
      <div className="Story__section">
        <Wrapper>
          <h2 className="Story__title">Stay Organized.</h2>
          <p className="Story__text">          
            Write whatever you want while keeping organized thanks to the categories and save it on your account, thanks to Google Firebase.
          </p>
        </Wrapper>
      </div>
      <div className="Story__section">
        <Wrapper>
          <h2 className="Story__title">All in your profile.</h2>
          <p className="Story__text">          
            Register with your mail &amp; password to start now adding your own personal content.  
          </p>
        </Wrapper>
      </div>
      <div className="Story__section">
        <Wrapper>
          <h2 className="Story__title">Forgot your password?</h2>
          <p className="Story__text">          
            Recover your password <b style={{textDecoration: "underline"}} onClick={goToAuth}>here</b> with your mail thanks to this amazing password recovery system, powered by Google Firebase! 
          </p>
        </Wrapper>
      </div>
      <div className="Story__section">
        <Wrapper>
          <h2 className="Story__title">View all from your favorite device.</h2>
          <p className="Story__text">          
            Thanks to the responsive nature of this website, you can view all from every device wich suppoorts javascript.
          </p>
        </Wrapper>
      </div>
    </section>  
  );
}

export default story;