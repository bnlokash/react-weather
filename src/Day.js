import React, { Component } from 'react';
import moment from 'moment';

import './Day.css';

import Icon from './Icon.js';

class Day extends Component {
  constructor(props){
    super();
  }

  render(){
    return(
      <div className="flex flex-row items-center justify-between bb b--black-20"> 
        <Icon icon={this.props.data.icon} />
        <dl className="dib lh-title fg1 mv2">
          <dd className="f6 fw4 ml0"><span className="ttc">{moment.unix(this.props.data.time + this.props.offset * 60 * 60).utc().format('dddd MMM D')}</span></dd>
          <dd className="f3 fw6 ml0">{this.props.data.summary}</dd>
        </dl>
        <dl className="dib lh-title ph2 ml-auto min-width">
          <dd className="f6 fw4 ml0">Low/High<span className="ttc"></span></dd>
          <dd className="f3 fw6 ml0">{Math.round(this.props.data.apparentTemperatureLow)}/{Math.round(this.props.data.apparentTemperatureHigh)}<span className="f4">{' \u00B0'+this.props.units.degChar}</span></dd>
        </dl>
      </div>
    );
  }
}

export default Day;