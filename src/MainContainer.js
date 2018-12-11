import React, { Component } from 'react';
import axios from 'axios';

import Current from './Current.js';

class MainContainer extends Component {
  constructor(props){
    super();
    this.state = {
      weatherData: null,
      currently: null,
      locationName: null,
      longitude: -1,
      latitude: -1
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.longitude !== this.state.longitude && prevState.latitude !== this.state.latitude){
      this.getWeather();
    }
  }

  render() {
    return(
      <div>
        { this.state.weatherData ? 
          <Current 
            data={this.state.currently}
            locationName={this.state.locationName}
          /> 
        : null }
      </div>
    );
  }

  extractResponseData(responseData){
    let locationName = "";
    if (responseData.gCloud.status == "OK") {
      locationName = responseData.gCloud.results[0].formatted_address;
    } else {
      locationName = "the middle of nowhere";
    }
    let newCurrently = responseData.currently;
    newCurrently.dailyDescription = responseData.hourly.summary;
    newCurrently.weeklyDescription = responseData.daily.summary;
    this.setState({
      weatherData: responseData,
      currently: newCurrently,
      locationName: locationName
    })

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

  getWeather(){
    axios.get('https://weatherget.herokuapp.com/weather/' + this.state.latitude + "," + this.state.longitude)
      .then((response)=>{
        console.log(response);
        this.extractResponseData(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
   
  }
}

export default MainContainer;