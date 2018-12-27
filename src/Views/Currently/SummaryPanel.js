import React, {Component} from 'react';

import Icon from '../../SharedComponents/Icon.js';

class SummaryPanel extends Component {
  constructor(props){
    super();
  }

  render(){
    const {icon, title, value, units} = this.props;
    return(
      <div className="flex flex-row items-start"> 
        <Icon icon={icon} />
        <dl className="dib w-auto lh-title">
          <dd className="f6 fw4 ml0"><span className="ttc">{title}</span></dd>
          <dd className="f3 fw6 ml0">{value}<span className="f4">{units}</span></dd>
        </dl>
      </div>
    )
  }
}

export default SummaryPanel;