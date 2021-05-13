import React from "react";
import { Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';

import MarketTracker from './MarketTracker/MarketTracker';
import TradingStock from './TradingStock.jsx';
import StockWatcher from './MarketTracker/StockWatcher.jsx';
import StockWatcher2 from './MarketTracker/StockWatcher2.jsx';

const MarketPage = (props) => {

  function myToggleFunction4() {
    var x = document.getElementById("myDIV4");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  return (
    <Container>
      <Row lg={12} md={10} align="center" fill="true" >
      {/* style={{ display: 'none' }}  */}
      <div id="myDIV4" size={12} fill="true" style={{ display: 'none' }}>
        <StockWatcher2 />
      </div>
      </Row>
      <Row className='m-2' padding={2} >
        <Col lg={8} md={8} sm={12} xs={12}>
          <MarketTracker />
        </Col>
        <Col lg={4} md={10} sm={12} xs={12}>
          <h6 align="center">More Info Here</h6>
          <TradingStock />
        </Col>
        
      </Row> 
  </Container>
  );
};

export default MarketPage;

