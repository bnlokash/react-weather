import React, {Component} from 'react';

class InfoHour extends Component{
  constructor(props){
    super();
  }

  render(){
    return(
      <dl className="fl fn-l w-auto lh-title mr1 mr2-ns">
        <dd className="f6 fw4 ml0"><span className="ttc">{this.props.title}</span></dd>
        <dd className="f3 fw6 ml0">{this.props.value}<span className="f4">{this.props.units}</span></dd>
      </dl>
    );
  }
}

export default InfoHour;