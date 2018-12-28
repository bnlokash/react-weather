import React, { Component } from 'react';

import SELECTED from './navbarConstants.js';

import NavbarButton from './NavbarButton.js';

class Navbar extends Component {
  constructor(props){
    super();
    this.state = {
      selected: SELECTED.CURRENTLY
    };
    this.onClick = this.onClick.bind(this);

  }
  render() {
    return(
      <div className="w-100 dt dt--fixed">
        <NavbarButton id={SELECTED.CURRENTLY} text="Currently" selected={this.state.selected} onClick={this.onClick} />        
        <NavbarButton id={SELECTED.HOURLY} text="Hourly" selected={this.state.selected} onClick={this.onClick} />        
        <NavbarButton id={SELECTED.DAILY} text="Daily" selected={this.state.selected} onClick={this.onClick} />        </div>
    );
  }

  onClick(id) {
    this.setState({
      selected: id
    });
    this.props.selectFunc(id);
  }
}

export default Navbar;