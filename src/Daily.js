import React, { Component } from 'react';

import Day from './Day.js';
import Icon from './Icon.js';

class Daily extends Component {
  constructor(props){
    super();
  }

  render(){
    return(
      <div>
        <div className="flex flex-row items-center justify-between bb b--black-20 pr2 pr4-ns"> 
          <Icon icon={this.props.days.icon} />
          <dl className="dib lh-title fg1 mv2">
            <dd className="f6 fw4 ml0"><span className="ttc">Forecast</span></dd>
            <dd className="f3 fw6 ml0">{this.props.days.summary}</dd>
          </dl>
        </div>
        <Day data={this.props.days.data[0]} units={this.props.units} offset={this.props.offset}/>
        <Day data={this.props.days.data[1]} units={this.props.units} offset={this.props.offset}/>
        <Day data={this.props.days.data[2]} units={this.props.units} offset={this.props.offset}/>
        <Day data={this.props.days.data[3]} units={this.props.units} offset={this.props.offset}/>
        <Day data={this.props.days.data[4]} units={this.props.units} offset={this.props.offset}/>
      </div>
    );
  }
}

export default Daily;