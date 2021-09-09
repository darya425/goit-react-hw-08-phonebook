import React from 'react';

import { Container } from 'react-bootstrap';

import './HomePage.scss';

const Homepage = () => {
  return (
    <Container>
      <div className="home-page">
        <p className="home-text">Get start creating your phonebook!</p>
      </div>
    </Container>
  );
};

export default Homepage;
