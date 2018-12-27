import React, { Component } from 'react';
import moment from 'moment';

import HourlyDataBox from './HourlyDataBox.js';
import Icon from '../../SharedComponents/Icon.js';

class HourlyPanel extends Component {
  constructor(props) {
    super();
    this.degreeCharacter = '\u00B0';
  }

  render() {
    // destructure props
    let {icon, time, temperature, apparentTemperature, windSpeed, precipType, precipProbability} = this.props.data;
    const {temperatureUnit, windSpeedUnit} = this.props.units;
    const {offset} = this.props;

    // format time via moment
    const localTimeDigits = moment.unix(time + offset * 60 * 60).utc().format('h');
    const localTimeAMPM = moment.unix(this.props.data.time + this.props.offset * 60 * 60).utc().format("A");

    // round
    temperature = Math.round(temperature);
    apparentTemperature = Math.round(apparentTemperature);
    windSpeed = Math.round(windSpeed);
    precipProbability = Math.round(precipProbability);


    return(
      <div className="secondChildMargin flex-if-small w-100 bb b--black-20 bn-ns w-20-ns">
        <Icon icon={icon} />
        <HourlyDataBox title="Hour" value={ localTimeDigits } units={ localTimeAMPM } />
        <HourlyDataBox title="Temp." value={ temperature } units={ ' ' + this.degreeCharacter + temperatureUnit } />
        <HourlyDataBox title="Feels Like" value = { apparentTemperature } units={ ' ' + this.degreeCharacter + temperatureUnit } />
        <HourlyDataBox title="Wind" value={ windSpeed } units={ ' '+ windSpeedUnit } />
        <HourlyDataBox title={ (precipType ? precipType : "Precip.") + ' Chance' } value={ precipProbability } units='%' />
      </div>
    );
  }
}

export default HourlyPanel;