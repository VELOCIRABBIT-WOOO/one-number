import React from 'react';
import { CardGroup, Container, Row, Col, Grow } from 'react-bootstrap';
import AssetsCard from './AssetsCard.jsx';
import LiabilitiesCard from './LiabilitiesCard.jsx';
import NetWorthCard from './NetWorthCard.jsx';
import Chart1 from './Chart1.jsx';
import Chart2 from './Chart2.jsx';


const CardsContainer = () => {
  return (
    <Container>
      <Row className='m-2'>
        <Col lg={8} md={10} sm={12} xs={12}>
          <Chart1 />
        </Col>
        <Col lg={4} sm={10} xs={12}>
          <Chart2 />
        </Col>
      </Row>
      <Row  className='m-2' height="20"><Col size={10}>
        </Col></Row>
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
