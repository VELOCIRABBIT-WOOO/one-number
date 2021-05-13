import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AssetsCard from './AssetsCard.jsx';

import Chart1 from './Chart1.jsx';
import Chart2 from './Chart2.jsx';

const AssetsPage = () => {
  return (
    <Container align="center">
            <Row className='m-2' align="center">
        <Col lg={8} md={10} sm={12} xs={12}>
          <AssetsCard />
        </Col>
        <Col lg={4} md={10} sm={12} xs={12}>
          <Chart2 />
          <Chart1 />
        </Col>
        
      </Row>  
    </Container>
  );
};
export default AssetsPage;