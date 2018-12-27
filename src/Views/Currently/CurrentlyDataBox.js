import React, {Component} from 'react';

class CurrentlyDataBox extends Component {
  constructor(props){
    super();
  }

  render(){
    const {title, value, units} = this.props;
    return(
      <dl className="fl fn-l dib-l w-auto lh-title mr5-l mr4">
        <dd className="f6 fw4 ml0"><span className="ttc">{title}</span></dd>
        <dd className="f3 fw6 ml0">{value}<span className="f4">{units}</span></dd>
      </dl>
    );
  }
}

export default CurrentlyDataBox;