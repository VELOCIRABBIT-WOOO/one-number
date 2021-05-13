import React, { useState, useEffect } from "react";
import { Jumbotron, Container } from 'react-bootstrap';

import MarketTracker from './MarketTracker/MarketTracker';

const MarketPage = (props) => {
  return (
    <Container>
      <Jumbotron>
        {/* <h1>test - markets page</h1> */}
        <MarketTracker />
      </Jumbotron>
  </Container>
  );
};

export default MarketPage;