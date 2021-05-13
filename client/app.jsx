import React, {useEffect, useState} from 'react';
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
import LandingContainer from './components/LandingContainer.jsx';
import Dashboaord from './components/Dashboard.jsx';
import SpaceFiller from './components/SpaceFiller.jsx'


const App = () => {

  const [accessToken, setAccessToken] = useState();
  const [result, setResult] = useState();
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
      fetch("/checkauth")
      .then(result => result.json())
      .then(data => {
        const {result} = data;
        setAccounts(result.accounts);
        setTransactions(result.transactions);
    })
  },[])


  return (
    <BrowserRouter>      
      <div>
        <Container>
          <div>
            <NavbarContainer accounts = {accounts} setAccounts = {setAccounts} accessToken = {accessToken} setAccessToken = {setAccessToken}/>
          </div>
          <Route exact path="/" component={LandingContainer}/>
          <Route exact path="/landing" component={LandingContainer}/>
          <Route exact path="/dashboard">
            <Dashboaord accounts = {accounts}/>
          </Route>
        </Container>
      </div>
    </BrowserRouter>    
  )
} 

export default App;
