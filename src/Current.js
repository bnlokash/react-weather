import React, {Component} from 'react';

class Current extends Component {
  constructor(props){
    super();

  }

  render(){
    return(
      <div>
        <h1>Current Weather in {this.props.locationName}</h1>
        <h2>{this.props.data.dailyDescription}</h2>
        <h3>Feels like: {this.props.data.apparentTemperature}</h3>

      </div>
    );
  }

}

export default Current;