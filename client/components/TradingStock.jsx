import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';


function MainContainer() {
  const [stock, setStock] = useState(() => 0);
  const [watchlist, setWatchlist] = useState(() => ['AAPL']);
  const socket = new WebSocket('wss://ws.finnhub.io?token=c2e2imiad3iefdo6pfe0');
  // Connection opened -> Subscribe
  socket.addEventListener('open', (event) => {
    console.log('socket opened');
    // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }));
    watchlist.map((el) => socket.send(JSON.stringify({ type: 'subscribe', symbol: el })));
    // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }));
    // socket.send(JSON.stringify({ type: 'subscribe', symbol: 'IC MARKETS:1' }));
  });
  // Listen for messages
  socket.addEventListener('message', (event) => {
    // console.log('Message from server ', event);
    const data = JSON.parse(event.data);
    setStock(data.data[0].p);
  });
  // Unsubscribe
  const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
  };




// feed = (function () {

//   var socket = io();

//   return {
//       onChange: function(callback) {
//           socket.on('stock', callback);
//       },
//       watch: function(symbols) {
//           socket.emit('join', symbols);
//       },
//       unwatch: function(symbol) {
//           socket.emit('leave', symbol);
//       }
//   };

// }());

// const TradingStock = React.createClass({
//   getInitialState: function() {
//       return {symbol: ""};
//   },
//   watchStock: function() {
//       this.props.watchStockHandler(this.state.symbol);
//       this.setState({symbol: ''});
//   },
//   handleChange: function(event) {
//       this.setState({symbol: event.target.value});
//   },
//   render: function () {
//       return (
//           <div className="row">
//               <p>Available stocks for demo: MCD, BA, BAC, LLY, GM, GE, UAL, WMT, AAL, JPM</p>
//               <div className="input-group">
//                   <input type="text" className="form-control" placeholder="Comma separated list of stocks to watch..." value={this.state.symbol} onChange={this.handleChange} />
//                   <span className="input-group-btn">
//                       <button className="btn btn-default" type="button" onClick={this.watchStock}>
//                           <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Watch
//                       </button>
//                   </span>
//               </div>
//           </div>
//       );
//   }
// });

// const StockRow = React.createClass({
//   unwatch: function() {
//       this.props.unwatchStockHandler(this.props.stock.symbol);
//   },
//   render: function () {
//       var lastClass = '',
//           changeClass = 'change-positive',
//           iconClass = 'glyphicon glyphicon-triangle-top';
//       if (this.props.stock === this.props.last) {
//           lastClass = this.props.stock.change < 0 ? 'last-negative' : 'last-positive';
//       }
//       if (this.props.stock.change < 0) {
//           changeClass = 'change-negative';
//           iconClass = 'glyphicon glyphicon-triangle-bottom';
//       }
//       return (
//           <tr>
//               <td>{this.props.stock.symbol}</td>
//               <td>{this.props.stock.open}</td>
//               <td className={lastClass}>{this.props.stock.last}</td>
//               <td className={changeClass}>{this.props.stock.change} <span className={iconClass} aria-hidden="true"></span></td>
//               <td>{this.props.stock.high}</td>
//               <td>{this.props.stock.low}</td>
//               <td><button type="button" className="btn btn-default btn-sm" onClick={this.unwatch}>
//                   <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
//               </button></td>
//           </tr>
//       );
//   }
// });

// const StockTable = React.createClass({
//   render: function () {
//       var items = [];
//       for (var symbol in this.props.stocks) {
//           var stock = this.props.stocks[symbol];
//           items.push(<StockRow key={stock.symbol} stock={stock} last={this.props.last} unwatchStockHandler={this.props.unwatchStockHandler}/>);
//       }
//       return (
//           <div className="row">
//           <table className="table-hover">
//               <thead>
//                   <tr>
//                       <th>Symbol</th>
//                       <th>Open</th>
//                       <th>Last</th>
//                       <th>Change</th>
//                       <th>High</th>
//                       <th>Low</th>
//                       <th>Unwatch</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   {items}
//               </tbody>
//           </table>
//           </div>
//       );
//   }
// });

// const HomePage = React.createClass({
//   getInitialState: function() {
//       var stocks = {};
//       feed.watch(['MCD', 'BA', 'BAC', 'LLY', 'GM', 'GE', 'UAL', 'WMT', 'AAL', 'JPM']);
//       feed.onChange(function(stock) {
//           stocks[stock.symbol] = stock;
//           this.setState({stocks: stocks, last: stock});
//       }.bind(this));
//       return {stocks: stocks};
//   },
//   watchStock: function(symbols) {
//       symbols = symbols.replace(/ /g,'');
//       var arr = symbols.split(",");
//       feed.watch(arr);
//   },
//   unwatchStock: function(symbol) {
//       feed.unwatch(symbol);
//       var stocks = this.state.stocks;
//       delete stocks[symbol];
//       this.setState({stocks: stocks});
//   },
//   render: function () {
//       return (
//           <div>
//               <WatchStock watchStockHandler={this.watchStock}/>
//               <StockTable stocks={this.state.stocks} last={this.state.last} unwatchStockHandler={this.unwatchStock}/>
//               {/* <div className="row">
//                   <div className="alert alert-warning" role="alert">All stock values are fake and changes are simulated. Do not trade based on the above data.</div>
//               </div> */}
//           </div>
//       );
//   }
// });

function myToggleFunction4() {
  var x = document.getElementById("myDIV4");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

return (
  <div>
    <h4>Watching Apple Stock</h4>
    <h5>Live Update</h5>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      Apple (APPL): {`$${stock}`}
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (MU): $120.55
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (EBR): $93.43
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      Google (GOOG): $54.54
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (MSFT): $96.50
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (LNKD): $140.99
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (EVA): $165.81
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (SHLD): $19.86
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (EVI) $37.83
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (TCK) $28.51
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (AKS): $143.91
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      - (INTC): $2841
    </Button>
    </div>
    <div  style={{ padding: '0.5em' }}>
    <Button variant="light" size="sm" width={4} onClick={e => myToggleFunction4(e)}>
      YAHOO (YHOO): $93.43
    </Button>
    </div>
  </div>
);
}

const TradingStock = () => (
  
  <>
    <div className='header'>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/VELOCIRABBIT-WOOO/one-number'
          target="_BLANK"
        >
          VelociRabbit Github
        </a>
        <div>
          <MainContainer />
        </div>
      </div>
    </div>
    <div>
    </div>
  </>
);

export default TradingStock;