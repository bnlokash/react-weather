import React, { Component } from 'react';

import Icon from '../../SharedComponents/Icon.js';

class DailySummary extends Component {
  constructor(props){
    super();
  }

  render(){
    const {icon, summary} = this.props;
    return(
      <div className="flex flex-row items-start justify-between bb b--black-20 pr2 pr4-ns"> 
        <Icon icon={icon} />
        <dl className="dib lh-title fg1 mv0 pv2">
          <dd className="f6 fw4 ml0"><span className="ttc">Forecast</span></dd>
          <dd className="f3 fw6 ml0">{summary}</dd>
        </dl>
      </div>
    );
  }
}

export default DailySummary;