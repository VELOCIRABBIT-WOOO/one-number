import React from 'react';
import { CardGroup, Container, Row, Col, Grow } from 'react-bootstrap';
import AssetsCard from './AssetsCard.jsx';
import LiabilitiesCard from './LiabilitiesCard.jsx';
import NetWorthCard from './NetWorthCard.jsx';

const CardsContainer = () => {
  return (
    <Container>
      <Row className='m-2'>
        {/* <CardGroup> */}
        <Col xs={12} md={4}>
          <AssetsCard />
        </Col>
        <Col xs={12} md={4}>
          <LiabilitiesCard />
        </Col>
        <Col xs={12} md={4}>
          <NetWorthCard />
        </Col>
        {/* </CardGroup> */}
      </Row>
    </Container>
  );
};

export default CardsContainer;
