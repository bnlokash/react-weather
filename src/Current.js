import React, {Component} from 'react';
import Skycons from 'react-skycons';

class Current extends Component {
  constructor(props){
    super();

  }

  render(){
    return(
      <div className="container border bg-white border">
        <div className="row border">
          <div className="col text-center border">
            <h1>Current Weather</h1>
          </div>
        </div>
        <div className="row border">
          <div className="col-4 border">
            <Skycons 
              color="blue" 
              icon={this.props.icon} 
              autoplay={true} 
            />
          </div>
          <div className="col-4 border">
            <div className="row border">
              <div className="col border">
                <h6>Feels like: <strong>{this.props.data.currently.apparentTemperature}</strong></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Current;