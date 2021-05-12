import React from 'react';
import { Card, Container, Table } from 'react-bootstrap';

const dataFromJSON = require('../json_from_plaid/investments-holdings-get.json');
const accounts = dataFromJSON.holdings.accounts;
const holdings = dataFromJSON.holdings.holdings;
const securities = dataFromJSON.holdings.securities;

const NetWorthCard = () => {

  const amassLiabilitiesTotals = () => {
     
    let totals = 0;
    accounts
    .filter((el) => el.type === 'loan' || el.type === 'credit')
      .forEach((el) => {
        totals += el.balances.current;
      });

      return totals
  };


  const grabIdsFromHoldings = () => {
    return holdings.reduce((acc, currHolding) => {
      acc.push({
        id: currHolding.security_id,
        value: currHolding.institution_value,
      });
      return acc;
    }, []);
  };

  const securityIds = grabIdsFromHoldings();

  const grabSecuritiesNameAndId = () => {
    return securities.reduce((acc, currSecurity, index) => {
      const evaluatedSecurity = {
        name: currSecurity.name,
        id: currSecurity.security_id,
      };

      acc.push(evaluatedSecurity);
      return acc;
    }, []);
  };

  const names = grabSecuritiesNameAndId();

  const groupSecuritiesWithHoldings = (securityIds, names) => {
    const finalSecurities = [];
    names.forEach((el) => {
      for (let i = 0; i < securityIds.length; i++) {
        const id = securityIds[i];

        if (el.id === id.id) {
          finalSecurities.push({ name: el.name, value: id.value });
        }
      }
    });

    return finalSecurities;
  };

  const groupedSecurities = groupSecuritiesWithHoldings(securityIds, names);

  const amassAssetsTotals = () => {
    let totals = 0;
    accounts
      .filter((el) => el.type === 'depository' || el.type === 'investment')
      .forEach((el) => {
        totals += el.balances.current;
      });
      groupedSecurities.forEach(el => {
        totals += el.value
      })
    return totals
  };


const netWorth = Number(amassAssetsTotals()) - Number(amassLiabilitiesTotals())


const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});

const net = formatter.format(netWorth)


  return (
      <Card  border="dark" style={{ padding: '0.5rem' }}>
          <Card.Header align='center'><h5>OneNumber</h5></Card.Header>
          <Table striped bordered hover >
            <thead align='center'>
              <tr>
                <th>Total</th>
              </tr>
            </thead>
            <tbody align='center'>
              <tr>
                <td>{net}</td>
              </tr>
            </tbody>
            </Table>
        </Card>
     
     
  );
};

export default NetWorthCard;

