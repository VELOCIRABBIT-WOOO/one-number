
import React, {useState} from 'react';
import { Card, Container, Table, Button, Modal } from 'react-bootstrap';

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
    <Card border="danger" style={{ padding: '0.5rem' }}>
      <Card.Header align='center'><h5>Liabilities</h5></Card.Header>
      <div align='center'><h6>{`Total: ${LiabilityTotal}`}</h6></div>
      <>
      <Button variant="outline-secondary" size="sm" onClick={handleShow}>Details</Button>
      <Modal show={show} onHide={handleClose}>

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
      </Modal>
      </>
    </Card>
  );
};

export default LiabiltiesCard;

