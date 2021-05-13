import React, { Component } from 'react';
import './MarketTracker.css';
import Dashboard from './Tools/Dashboard.jsx'


class MarketTracker extends Component {

  state = {
    hasError: false,
    showSpinner: true
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('some error has occured');
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  hideSpinner = () => {
    this.setState({showSpinner: false});
  }

  render() {

    return (
      <div className="App">
        <Dashboard hideSpinner={this.hideSpinner} showSpinner={this.state.showSpinner} />
      </div>
    );
  }
}

export default MarketTracker;