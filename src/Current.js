import React, {Component} from 'react';
import InfoPoint from './InfoPoint';

class Current extends Component {
  constructor(props){
    super();
  }

  render(){
    let windDirection = '';
    if (this.props.data.windBearing){
      let compass = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      windDirection = compass[Math.round(this.props.data.windBearing/45)];
    }
    return(
      <div className="cf">
        <InfoPoint title="Daily Description" value={this.props.data.dailyDescription}/>
        <InfoPoint title="Temperature" value={Math.round(this.props.data.temperature)} units={' \u00B0' + this.props.units.degChar} />
        <InfoPoint title="Feels Like" value = {Math.round(this.props.data.apparentTemperature)} units={' \u00B0' + this.props.units.degChar} />
        <InfoPoint title="Low/High" value={`${Math.round(this.props.data.apparentLow)} / ${Math.round(this.props.data.apparentHigh)}` } />
        <InfoPoint title="Humidity" value={Math.round(this.props.data.humidity * 100)} units='%' />
        <InfoPoint title="Wind" value={Math.round(this.props.data.windSpeed)} units= {' '+ this.props.units.windSpdChar + ' ' + windDirection} />
        <InfoPoint title={this.props.data.precipType + ' Chance'} value={Math.round(this.props.data.precipProbability)} units='%' />
        <InfoPoint title='Visibility' value={this.props.data.visibility} units={' '+this.props.units.vis} />
        <InfoPoint title='UV Index' value={this.props.data.uvIndex} />
      </div>
    );
  }

}

export default Current;