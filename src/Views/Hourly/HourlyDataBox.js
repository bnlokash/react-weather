import React, {Component} from 'react';

class HourlyDataBox extends Component{
  constructor(props){
    super();
  }

  render(){
    const {title, value, units} = this.props;
    return(
      <dl className="fl fn-l w-auto lh-title mr1 mr2-ns pl3-ns">
        <dd className="f6 fw4 ml0"><span className="ttc">{title}</span></dd>
        <dd className="f3 fw6 ml0">{value}<span className="f4">{units}</span></dd>
      </dl>
    );
  }
}

export default HourlyDataBox;