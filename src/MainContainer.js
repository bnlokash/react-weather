import React, { Component } from 'react';
import axios from 'axios';

import Current from './Current.js';

class MainContainer extends Component {
  constructor(props){
    super();
    this.state = {
      weatherData: null,
      longitude: -1,
      latitude: -1,
      icon: '',
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState){
    console.log("comp might update");
    if(prevState.longitude !== this.state.longitude && prevState.latitude !== this.state.latitude){
      this.getWeather();
      console.log("component did update");
    }

  }

  render() {
    return(
      <div className="container-fluid bg-dark">
        { this.state.weatherData ? 
          <Current 
            icon={this.state.icon}
            data={this.state.weatherData}
          /> 
        : null }
      </div>
    );
  }

  getLocation(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude
        });
      });
    } else {
      console.log("geolocation unavailable");
    }
  }
  convertIconString(iconString){
    return iconString.toUpperCase().replace('-', '_');
  }

  getWeather(){
    console.log("getWeather()");
    axios.get('https://weatherget.herokuapp.com/weather/' + this.state.latitude + "," + this.state.longitude)
      .then((response)=>{
        console.log(response.data);
        this.setState({
          weatherData: response.data,
          icon: this.convertIconString(response.data.currently.icon)
        });
      })
      .catch((error)=>{
        console.log(error);
      })
   
  }
}

export default MainContainer;