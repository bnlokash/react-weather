import React, { Component } from 'react';

class LocationHeading extends Component {
  constructor(props){
    super();
  }

  render() {
    const {heading, subtitle} = this.props;
    return(
      <div>
        <div className="min1 fl w-20"></div>
        <div className="fl w-60">
          <h1 className="tc mb1">Weather <span className="">{heading}</span></h1>
          <h4 className="tc mb0 mt0 black-50">{subtitle}</h4>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default LocationHeading;