
import React, {useState} from 'react';
import { Card, Container, Table } from 'react-bootstrap';

const dataFromJSON = require('../json_from_plaid/investments-holdings-get.json');

const LiabiltiesCard = () => {
  
  const accounts = dataFromJSON.holdings.accounts;

  const amassTotals = () => {
    
  let totals = 0;
  accounts
  .filter((el) => el.type === 'loan' || el.type === 'credit')
    .forEach((el) => {
      totals += el.balances.current;
    });

    return totals
  };

   const total = amassTotals();

   
   const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });
  
  const LiabilityTotal = formatter.format(total)

  return (
    <Card className='h-100' border="danger" style={{ padding: '0.5rem' }}>
      <Card.Header align='center'><h5>Liabilities</h5></Card.Header>
      <div align='center'><h6>{`Total: ${LiabilityTotal}`}</h6></div>
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
      {/* <Card.Footer >{`Combined Total: ${LiabilityTotal}`}</Card.Footer> */}
    </Card>
  );
};

export default LiabiltiesCard;

