import React from 'react';

import Card from '../../../UI/Card/Card';
import Wrapper from '../../../Layout/Wrapper/Wrapper'

import './FeaturesList.css';

const featuresList = () => (
  <section className="FeaturesList">
    <Wrapper>
      <Card icon="react" title="React Hooks" description="Built using React hooks and functional component only." />
      <Card icon="edit" title="CRUD" description="Provided with the ability to Create, Read, Update and Delete content." />
      <Card icon="fire" title="Firebase Linked" description="Authentication and storage provided by Firebase, linked via REST API" />
      <Card icon="shield" title="GDPR Friendly" description="Served with the possibility to completely delete your data all by yourself." />
    </Wrapper>
  </section>
);

export default featuresList;