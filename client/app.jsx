import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom';
import NavbarContainer from './components/NavbarContainer.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsContainer from './components/CardsContainer.jsx';
import LandingContainer from './components/LandingContainer.jsx';
import AssetsPage2 from './components/AssetsPage2.jsx';
import MarketPage from './components/MarketPage.jsx';
import LiabilitiesPage2 from './components/LiabilitiesPage2.jsx';

// if we putcards and space filler into one component called dashboard we can use that as a route
const Dashboard = () => {
  return (
    <Container>
      <CardsContainer />
    </Container>
  );
};
// otherwise landing will render a jumbotron

const App = () => {
  return (
    <BrowserRouter>      
      <div>
        <Container>
          <div>
            <NavbarContainer  />
          </div>
          <Route exact path="/" component={LandingContainer}></Route>
          <Route exact path="/landing" component={LandingContainer}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/assets" component={AssetsPage2}></Route>
          <Route exact path="/markets" component={MarketPage}></Route>
          <Route exact path="/liabilities" component={LiabilitiesPage2}></Route>
        </Container>
      </div>    
    </BrowserRouter>
  );
};

export default App;
