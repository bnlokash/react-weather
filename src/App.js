import React, { Component } from 'react';

import './CSS/tachyons.min.css';
import './CSS/App.css';

import MainContainer from './Views/MainContainer/MainContainerView.js';


class App extends Component {
  render() {
    return (
      <MainContainer/>
    );
  }
}

export default App;
