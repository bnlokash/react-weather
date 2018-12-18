import React, { Component } from 'react';
import PanelHourly from './PanelHourly.js';

class Hourly extends Component {
  constructor(props){
    super();
  }
  render() {
    console.log(this.props.data);
    return(
      <div className="flex flex-column flex-row-ns">
        <PanelHourly data={this.props.data[0]} units={this.props.units} offset={this.props.offset}/>
        <PanelHourly data={this.props.data[1]} units={this.props.units} offset={this.props.offset}/>
        <PanelHourly data={this.props.data[2]} units={this.props.units} offset={this.props.offset}/>
        <PanelHourly data={this.props.data[3]} units={this.props.units} offset={this.props.offset}/>
        <PanelHourly data={this.props.data[4]} units={this.props.units} offset={this.props.offset}/>
      </div>
    );
  }
}

export default Hourly;