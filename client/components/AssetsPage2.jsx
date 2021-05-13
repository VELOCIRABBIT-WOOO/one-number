import React, { useState, useEffect } from "react";
import { Card, Container, Table, Button, Row, Col } from "react-bootstrap";

import Chart1 from './Chart1.jsx';
import Chart2 from './Chart2.jsx';
import Chart3 from './Chart3.jsx';

const dataFromJSON = require("../json_from_plaid/investments-holdings-get.json");

const AssetsCard = () => {

  const accounts = dataFromJSON.holdings.accounts;
  const holdings = dataFromJSON.holdings.holdings;
  const securities = dataFromJSON.holdings.securities;

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

  const amassTotals = () => {
    let totals = 0;
    accounts
      .filter((el) => el.type === "depository" || el.type === "investment")
      .forEach((el) => {
        totals += el.balances.current;
      });
    groupedSecurities.forEach((el) => {
      totals += el.value;
    });
    return totals;
  };

  const amassAccountHoldings = () => {
    let totals = 0;
    accounts
      .filter((el) => el.type === "depository" || el.type === "investment")
      .forEach((el) => {
        totals += el.balances.current;
      });
    return totals;
  };

  const amassSecuritiesHoldings = () => {
    let totals = 0;
    groupedSecurities.forEach((el) => {
      totals += el.value;
    });
    return totals;
  };

  function myToggleFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function myToggleFunction2() {
    var x = document.getElementById("myDIV2");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  //numbers to be formatted by formatter
  const securitiesOnlyTotal = amassSecuritiesHoldings();
  const accountOnlyHoldings = amassAccountHoldings();
  const total = amassTotals();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const securitiesHoldings = formatter.format(securitiesOnlyTotal);
  const accountTotals = formatter.format(accountOnlyHoldings);
  const Assetotal = formatter.format(total);

  
  return (
    <Container align="center">
    <Row className='m-2' align="center">
        <Col lg={8} md={10} sm={12} xs={12}>

    <Card border="success" style={{ padding: '0.5rem' }}>
      <Card.Header align='center'><h5>Assets</h5></Card.Header>
      <div align='center'><h6>{`Total: ${Assetotal}`}</h6></div>
      <Button variant="outline-secondary" size="sm" onClick={e => myToggleFunction(e)}>Account Details</Button>
      <div id="myDIV">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Account</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts
            .filter(
              (el) => el.type === "depository" || el.type === "investment"
            )
            .map((asset) => {
              let dollarUSLocale = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              });
              let price = dollarUSLocale.format(asset.balances.current);
              return [
                <tr key={asset.name}>
                  <td>{asset.name.slice(6)}: </td>
                  <td>{price}</td>
                </tr>,
              ];
            })}
          <tr>
            <td>Total:</td>
            <td>{accountTotals}</td>
          </tr>
        </tbody>
      </Table>
      </div>
      <Button variant="outline-secondary" size="sm" onClick={e => myToggleFunction2(e)}>Holdings Details</Button> 
      <div id="myDIV2">

      <Table striped bordered hover style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Holdings</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {groupedSecurities.map((asset) => {
            let dollarUSLocale = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            });
            let price = dollarUSLocale.format(asset.value);
            return [
              <tr key={asset.name}>
                <td>{asset.name}:</td>
                <td>{price}</td>
              </tr>,
            ];
          })}
          <tr>
            <td>Total:</td>
            <td>{securitiesHoldings}</td>
          </tr>
        </tbody>
      </Table>
      </div>
    </Card>

    </Col>
        <Col lg={4} md={10} sm={12} xs={12}>
          <Chart3 />
          <Chart2 />
          <Chart1 />
        </Col>
        
      </Row>  
    </Container>
  );
};

export default AssetsCard;
