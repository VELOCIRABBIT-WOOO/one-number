import React, {useState} from 'react';
import { Card, Container, Table, Button, Row, Col } from 'react-bootstrap';

import Chart1 from './Chart1.jsx';
import Chart2 from './Chart2.jsx';
import Chart3 from './Chart3.jsx';

const dataFromJSON = require('../json_from_plaid/investments-holdings-get.json');

const LiabiltiesCard = () => {
  
  const accounts = dataFromJSON.holdings.accounts;

  const amassTotals = () => {
    
  let totals = 0;
  accounts
  .filter((el) => el.type === 'loan' || el.type === 'credit')
    .forEach((el) => {
      totals += el.balances.current;
      console.log("This is the data we're receving from static JSON", dataFromJSON);
    });

    return totals
  };

   const total = amassTotals();

   
   const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });
  
  function myToggleFunction3() {
    var x = document.getElementById("myDIV3");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  const LiabilityTotal = formatter.format(total)


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container align="center">
      <Row className='m-2' align="center">
        <Col lg={4} md={10} sm={12} xs={12}>
          <Chart3 />
          <Chart2 />
          <Chart1 />
        </Col>
        <Col lg={8} md={10} sm={12} xs={12}>

    <Card border="danger" style={{ padding: '0.5rem' }}>
      <Card.Header align='center'><h5>Liabilities</h5></Card.Header>
      <div align='center'><h6>{`Total: ${LiabilityTotal}`}</h6></div>
      <Button variant="outline-secondary" size="sm" onClick={e => myToggleFunction3(e)}>Liabilities Details</Button>
      <div id="myDIV3">
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Type</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
          {accounts
            .filter(
              (el) => el.type === 'loan' || el.type === 'credit')
            .map((asset) => {
              let dollarUSLocale = Intl.NumberFormat('en-US',{
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2
              })
              let price = dollarUSLocale.format(asset.balances.current)
              return [
                <tr key={asset.name}>
                  <td>{asset.name.slice(6)}: </td>
                  <td>{price}</td>
                </tr>,
            
              ];
            })}
          
      </tbody>
      </Table>
      </div>
    </Card>

    </Col>
      </Row>  
    </Container>
  );
};

export default LiabiltiesCard;

