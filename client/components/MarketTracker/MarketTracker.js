import React from 'react';
import Plot from 'react-plotly.js';
import { Container, Row, Col } from 'react-bootstrap';

class MarketTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    // console.log(pointerToThis);
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let StockSymbol = 'TSLA';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }

          // console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }

  render() {
    return (
      <Container>
        <Row className='m-2' padding={3} >
          <Col lg={12} md={10} sm={9} xs={9}>
            <div align='center'>
              <h1>Stock Market - Live Data Stock</h1>
              <Plot
                data={[
                  {
                    x: this.state.stockChartXValues,
                    y: this.state.stockChartYValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'dark grey'},
                  }
                ]}
                layout={{ height: 650, title: 'Apple (APPL) historic trading'}}
              />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default MarketTracker;