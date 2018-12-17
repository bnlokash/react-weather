import React, {Component} from 'react';

class InfoPoint extends Component {
  constructor(props){
    super();
  }

  render(){
    return(
      <dl className="fl fn-l dib-l w-auto lh-title mr5-l mr4">
        <dd className="f6 fw4 ml0"><span className="ttc">{this.props.title}</span></dd>
        <dd className="f3 fw6 ml0">{this.props.value}<span className="f4">{this.props.units}</span></dd>
      </dl>
    )
  }
}

export default InfoPoint;