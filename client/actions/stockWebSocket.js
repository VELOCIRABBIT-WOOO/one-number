import React, { useState } from 'react';
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
  return (
    <div>
      <h1>hi</h1>
      <h1>{`$${stock}`}</h1>
    </div>
  );
}
export default MainContainer;