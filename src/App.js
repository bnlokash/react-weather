import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MainContainer from './MainContainer.js';

class App extends Component {
  render() {
    return (
      <MainContainer foo='bar'/>
    );
  }
}

export default App;
