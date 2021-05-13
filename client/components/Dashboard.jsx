import CardsContainer from './CardsContainer.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';


const Dashboard = (props) => {
  return (
    <Container>
      <CardsContainer accounts = {props.accounts}/>
    </Container>
  );
};

export default Dashboard;
