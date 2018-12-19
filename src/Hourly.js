import React, { Component } from 'react';
import Hour from './Hour.js';

class Hourly extends Component {
  constructor(props){
    super();
  }
  render() {
    return(
      <div className="flex flex-column flex-row-ns">
        <Hour data={this.props.data[0]} units={this.props.units} offset={this.props.offset}/>
        <Hour data={this.props.data[1]} units={this.props.units} offset={this.props.offset}/>
        <Hour data={this.props.data[2]} units={this.props.units} offset={this.props.offset}/>
        <Hour data={this.props.data[3]} units={this.props.units} offset={this.props.offset}/>
        <Hour data={this.props.data[4]} units={this.props.units} offset={this.props.offset}/>
      </div>
    );
  }
}

export default Hourly;