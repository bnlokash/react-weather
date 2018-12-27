import React, { Component } from 'react';
import moment from 'moment';


import Icon from '../../SharedComponents/Icon.js';

class DailyPanel extends Component {
  constructor(props){
    super();
    this.degreeCharacter = '\u00B0';
  }

  render(){
    // destructure props
    let {icon, time, summary, apparentTemperatureHigh, apparentTemperatureLow} = this.props.data;
    const {offset} = this.props;
    const {temperatureUnit} = this.props.units;

    // format time via moment
    let localTimeString = moment.unix(time + offset * 60 * 60).utc().format('dddd MMM D');

    // round
    apparentTemperatureLow = Math.round(apparentTemperatureLow);
    apparentTemperatureHigh = Math.round(apparentTemperatureHigh);

    return(
      <div className="flex flex-row items-center justify-between bb b--black-20"> 
        <Icon icon={icon} />
        <dl className="dib lh-title fg1">
          <dd className="f6 fw4 ml0"><span className="ttc">{localTimeString}</span></dd>
          <dd className="f3 fw6 ml0">{summary}</dd>
        </dl>
        <dl className="dib lh-title ph2 ml-auto min-width">
          <dd className="f6 fw4 ml0">Low/High<span className="ttc"></span></dd>
          <dd className="f3 fw6 ml0">{apparentTemperatureLow}/{apparentTemperatureHigh}<span className="f4">{' '+ this.degreeCharacter + temperatureUnit}</span></dd>
        </dl>
      </div>
    );
  }
}

export default DailyPanel;