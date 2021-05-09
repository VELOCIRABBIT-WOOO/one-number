import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavbarContainer from './components/NavbarContainer.jsx';
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsContainer from './components/CardsContainer.jsx';
import SpaceFiller from './components/SpaceFiller.jsx';

const App = () => {
  return (
    <div>
      <Container>
        <div>
          <NavbarContainer />
        </div>
        <div>
          <div className='m-2'>
            <Row>
              <Col>
                <h2>Welcome to OneNumber</h2>
              </Col>
            </Row>
          </div>
          
          <SpaceFiller />
          <CardsContainer />
          <SpaceFiller />
        </div>
      </Container>
    </div>
  );
};

export default App;
