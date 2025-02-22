import React, { useState, useEffect } from "react";
import { Card, Container, Table } from "react-bootstrap";

const dataFromJSON = require("../json_from_plaid/investments-holdings-get.json");

const AssetsCard = (props) => {

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
    // accounts
    //   .filter((el) => el.type === "depository" || el.type === "investment")
    //   .forEach((el) => {
    //     totals += el.balances.current;
    //   });
    groupedSecurities.forEach((el) => {
      totals += el.value;
    });
    return totals;
  };

  // const amassAccountHoldings = () => {
  //   let totals = 0;
  //   accounts
  //     .filter((el) => el.type === "depository" || el.type === "investment")
  //     .forEach((el) => {
  //       totals += el.balances.current;
  //     });
  //   console.log('amassAccountHoldings',totals)
  //   return totals;
  // };

  const amassSecuritiesHoldings = () => {
    let totals = 0;
    groupedSecurities.forEach((el) => {
      totals += el.value;
    });
    return totals;
  };

  //numbers to be formatted by formatter
  const securitiesOnlyTotal = amassSecuritiesHoldings();
  // const accountOnlyHoldings = amassAccountHoldings();
  const total = amassTotals();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const securitiesHoldings = formatter.format(securitiesOnlyTotal);
  // const accountTotals = formatter.format(accountOnlyHoldings);
  const Assetotal = formatter.format(total);

  if(props.accounts[0]){
    
    const account = props.accounts
    const accountInformation =[];
    let total = 0;
    for(let i = 0; i < props.accounts.length;i++){
      accountInformation.push(
        <tr key = {props.accounts[i].subtype}>
          <td>{props.accounts[i].subtype}</td>
          <td>{`$${props.accounts[i].balances.available}`}</td>
        </tr>
      );

      total += props.accounts[i].balances.available;
    }

    return (
      <Card className='h-100' border="success" style={{ padding: '0.5rem' }}>
        <Card.Header align='center'><h5>Assets</h5></Card.Header>
        <div align='center'><h6>{`Total: ${Assetotal}`}</h6></div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Account</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accountInformation}
            <tr>
              <td>Total:</td>
              <td>{`$${total}`}</td>
            </tr>
          </tbody>
        </Table>
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
      </Card>
    );
  } else {
    return (
      <Card className='h-100' border="success" style={{ padding: '0.5rem' }}>
        <Card.Header align='center'><h5>Assets</h5></Card.Header>
        <div align='center'><h6>{`Total: ${Assetotal}`}</h6></div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Account</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total:</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
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
      </Card>
    );
  }
}


export default AssetsCard;
