import React, {Component} from 'react';

class Icon extends Component {
  constructor(props){
    super();
  }

  render() {
    return(
      <img src={`climacons/${this.props.icon}.svg`} alt={this.props.icon} height="100"/>
    );
  }
}

export default Icon;