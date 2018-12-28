import React, { Component } from 'react';

class NavbarButton extends Component {
  constructor(props){
    super();
    this.classSetSelected = "cursor-pointer link underline-hover dark-blue b";
    this.classSetUnselected = "cursor-pointer link underline-hover dark-blue";
    this.onClick = this.onClick.bind(this);
  }
  render() {
    const {id, selected, text} = this.props;
    return(
      <div id={id} className="cursor-pointer dtc tc pv2 bg-black-10" onClick={this.onClick}>
        <span id={id} className= {selected===id ? this.classSetSelected : this.classSetUnselected} onClick={this.onClick}>{text}</span>
      </div>
    )
  }

  onClick(){
    this.props.onClick(this.props.id);
  }
}

export default NavbarButton;