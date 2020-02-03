import React from 'react';

import Button from '../../../UI/Form/Button/Button';
import Wrapper from '../../../Layout/Wrapper/Wrapper';

const bottomBanner = props => {
  const gotoAuth = () => {
    props.history.push('/auth');
  }

  return (
    <section className="BottomBanner" style={{marginBottom: "3em"}}>
      <Wrapper>
        <h1>Try MemoReact now, it's free!</h1>
        <p>And it's actually a <strong>Demo project</strong>, so please keep in mind that I could delete it in every moment.</p>
        <Button clicked={gotoAuth}>Start now!</Button>
      </Wrapper>
    </section>
  );
}

export default bottomBanner;