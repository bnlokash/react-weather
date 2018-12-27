import React, {Component} from 'react';
import moment from 'moment';

import CurrentlyDataBox from './CurrentlyDataBox.js';
import SummaryPanel from './SummaryPanel.js';

class CurrentlyView extends Component {
  constructor(props){
    super();
    this.compass = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    this.degreeCharacter = '\u00B0';
  }

  render(){
    // destructure props
    let {dailyDescription, time, temperature, apparentTemperature, apparentLow, apparentHigh, humidity, windSpeed, precipType, precipProbability, visibility, uvIndex, icon} = this.props.data;
    const {temperatureUnit, visibilityUnit, windSpeedUnit} = this.props.units;
    const {offset} = this.props;
    // windBearing may not exist on props.data
    let windDirection = '';
    if (this.props.data.windBearing){
      // convert wind bearing from degrees to compass direction
      windDirection = this.compass[Math.round(this.props.data.windBearing/45)];
    }
    // format time via moment
    let localTimeDigits = moment.unix(time + offset * 60 * 60).utc().format("h:mm");
    let localTimeAMPM = moment.unix(time + offset * 60 * 60).utc().format("A");

    // round values
    temperature = Math.round(temperature);
    apparentTemperature = Math.round(apparentTemperature);
    apparentLow = Math.round(apparentLow);
    apparentHigh = Math.round(apparentHigh);
    windSpeed = Math.round(windSpeed);
    precipProbability = Math.round(precipProbability);
    humidity = Math.round(humidity * 100);

console.log('render', time);

    return(
      <div>
        <SummaryPanel title="Summary" value={dailyDescription} icon={icon}/>
        <div className="pl3">
          <CurrentlyDataBox title="Local Time" value={localTimeDigits} units={localTimeAMPM} />
          <CurrentlyDataBox title="Temperature" value={temperature} units={' ' + this.degreeCharacter + temperatureUnit} />
          <CurrentlyDataBox title="Feels Like" value = {apparentTemperature} units={' ' + this.degreeCharacter + temperatureUnit} />
          <CurrentlyDataBox title="Low/High" value={`${apparentLow} / ${apparentHigh}` } />
          <CurrentlyDataBox title="Humidity" value={humidity} units='%' />
          <CurrentlyDataBox title="Wind" value={windSpeed} units= {' '+ windSpeedUnit + ' ' + windDirection} />
          <CurrentlyDataBox title={precipType + ' Chance'} value={precipProbability} units='%' />
          <CurrentlyDataBox title='Visibility' value={visibility} units={' '+ visibilityUnit} />
          <CurrentlyDataBox title='UV Index' value={uvIndex} />
        </div>
      </div>
    );
  }

}

export default CurrentlyView;