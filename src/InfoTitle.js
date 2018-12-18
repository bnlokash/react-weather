import React, {Component} from 'react';

import Icon from './Icon.js';

class InfoPoint extends Component {
  constructor(props){
    super();
  }

  render(){
    return(
      <div className="flex flex-row items-center"> 
        <Icon icon={this.props.icon} />
        <dl className="dib w-auto lh-title">
          <dd className="f6 fw4 ml0"><span className="ttc">{this.props.title}</span></dd>
          <dd className="f3 fw6 ml0">{this.props.value}<span className="f4">{this.props.units}</span></dd>
        </dl>
      </div>

    )
  }
}

export default InfoPoint;