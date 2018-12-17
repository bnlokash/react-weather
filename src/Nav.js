import React, { Component } from 'react';

class Nav extends Component {
  constructor(props){
    super();
  }
  render() {
    return(
      <div className="w-100 dt dt--fixed">
        <div className="dtc tc pv2 bg-black-10">
          <a href="#" className="link underline-hover dark-blue b">Currently</a>
        </div>
        <div className="dtc tc pv2 bg-black-05">
          <a href="#" className="link underline-hover dark-blue ">Hourly</a>
        </div>
        <div className="dtc tc pv2 bg-black-10">
          <a href="#" className="link underline-hover dark-blue ">Daily</a>
        </div>
      </div>
    );
  }
}

export default Nav;