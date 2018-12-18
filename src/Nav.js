import React, { Component } from 'react';
import './Nav.css';


class Nav extends Component {
  constructor(props){
    super();
    this.state = {
      selected: 1
    };
    this.onClick = this.onClick.bind(this);
    this.classSetSelected = "cursor-pointer link underline-hover dark-blue b";
    this.classSetUnselected = "cursor-pointer link underline-hover dark-blue";
  }
  render() {
    return(
      <div className="w-100 dt dt--fixed">
        <div id="1" className="cursor-pointer dtc tc pv2 bg-black-10" onClick={this.onClick}>
          {/*eslint-disable-next-line*/}
          <span id="1" className= {this.state.selected == 1 ? this.classSetSelected : this.classSetUnselected} onClick={this.onClick}>Currently</span>
        </div>
        <div id="2" className="cursor-pointer dtc tc pv2 bg-black-05" onClick={this.onClick}>
          {/*eslint-disable-next-line*/}
          <span id="2" className= {this.state.selected == 2 ? this.classSetSelected : this.classSetUnselected} onClick={this.onClick}>Hourly</span>
        </div>
        <div id="3" className="cursor-pointer dtc tc pv2 bg-black-10" onClick={this.onClick}>
          {/*eslint-disable-next-line*/}
          <span id="3" className= {this.state.selected == 3 ? this.classSetSelected : this.classSetUnselected} onClick={this.onClick}>Daily</span>
        </div>
      </div>
    );
  }

  onClick(e) {
    this.setState({
      selected: e.target.id
    });
    this.props.selectFunc(e.target.id);
  }
}

export default Nav;