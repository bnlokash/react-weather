import React, { Component } from 'react';
import HourlyPanel from './HourlyPanel.js';

class HourlyView extends Component {
  constructor(props){
    super();
  }
  render() {
    const {data, units, offset} = this.props;
    return(
      <div className="flex flex-column flex-row-ns">
        {data.map((element, index)=>{
          return <HourlyPanel data={element} units={units} offset={offset} key={index}/>;
        })}
      </div>
    );
  }
}

export default HourlyView;