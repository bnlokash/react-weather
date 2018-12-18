import React, { Component } from 'react';
import moment from 'moment';

import './PanelHourly.css';

import InfoHour from './InfoHour.js';
import Icon from './Icon.js';

class PanelHourly extends Component {
  constructor(props) {
    super();
  }

  render() {
    return(
      <div className="secondChildMargin w-100 bb b--black-20 bn-ns w-20-ns">
        <Icon icon={this.props.data.icon} />
        <InfoHour title="Hour" value={moment.unix(this.props.data.time + this.props.offset * 60 * 60).utc().format('h')} units={moment.unix(this.props.data.time + this.props.offset * 60 * 60).utc().format("A")} />
        <InfoHour title="Temp." value={Math.round(this.props.data.temperature)} units={' \u00B0' + this.props.units.degChar} />
        <InfoHour title="Feels Like" value = {Math.round(this.props.data.apparentTemperature)} units={' \u00B0' + this.props.units.degChar} />
        <InfoHour title="Wind" value={Math.round(this.props.data.windSpeed)} units={' '+ this.props.units.windSpdChar} />
        <InfoHour title={(this.props.data.precipType ? this.props.data.precipType : "Precip.") + ' Chance'} value={Math.round(this.props.data.precipProbability)} units='%' />
    </div>
    );
  }
}

export default PanelHourly;