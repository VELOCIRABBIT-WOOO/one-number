import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LiabilitiesCard from './LiabilitiesCard.jsx';

import Chart1 from './Chart1.jsx';
import Chart2 from './Chart2.jsx';


const LiabilitiesPage = () => {
  return (
    <Container align="center">
      <Row className='m-2' align="center">
        <Col>
          <LiabilitiesCard />
        </Col>
      </Row>  
    </Container>
  );
};

export default LiabilitiesPage;