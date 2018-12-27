import React, { Component } from 'react';

import DailyPanel from './DailyPanel.js';
import DailySummary from './DailySummary.js';

class DailyView extends Component {
  constructor(props){
    super();
  }

  render(){
    const {units, offset} = this.props;
    const {days, icon, summary} = this.props.data;

    return(
      <div>
        <DailySummary icon={icon} summary={summary} />
        {days.map((element, index)=>{
          return <DailyPanel data={element} units={units} offset={offset} key={index}/>;
        })}
      </div>
    );
  }
}

export default DailyView;