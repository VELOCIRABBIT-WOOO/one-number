import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LiabilitiesCard from './LiabilitiesCard.jsx';

import Chart1 from './Chart1.jsx';
import Chart2 from './Chart2.jsx';
import Chart3 from './Chart3.jsx';


const LiabilitiesPage = () => {
  return (
    <Container align="center">
      <Row className='m-2' align="center">
        <Col lg={4} md={10} sm={12} xs={12}>
          <Chart3 />
          <Chart2 />
          <Chart1 />
        </Col>
        <Col lg={8} md={10} sm={12} xs={12}>
          <LiabilitiesCard />
        </Col>
      </Row>  
    </Container>
  );
};

export default LiabilitiesPage;