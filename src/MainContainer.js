import React, { Component } from 'react';
import axios from 'axios';

import Current from './Current.js';
import GMap from './GMap.js';

class MainContainer extends Component {
  constructor(){
    super();
    this.state = {
      weatherData: null,
      currently: null,
      locationName: null,
      longitude: null,
      latitude: null
    }
    this.childSetLocation = this.childSetLocation.bind(this);
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

        { this.state.latitude && this.state.longitude ?
          <GMap 
            lat={this.state.latitude} 
            long={this.state.longitude}
            setLocation = {this.childSetLocation}
          />
        : null }

        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      </div>
    );
  }

  extractResponseData(responseData){
    let locationName = "";
    if (responseData.gCloud.status === "OK") {
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
    });
  }

  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
          });
        },
        (error) => {
          this.setState({
            latitude: -1,
            longitude: -1
          });
        }
      );
    } else {
      this.setState({
        latitude: -1,
        longitude: -1
      });
    }
  }

  getWeather(){
    axios.get('https://weatherget.herokuapp.com/weather/' + this.state.latitude + "," + this.state.longitude)
      .then((response)=>{
        this.extractResponseData(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  childSetLocation(latLng){
    this.setState({
      latitude: latLng.lat,
      longitude: latLng.lng
    });
  }
}

export default MainContainer;