import React, { Component } from 'react';
import axios from 'axios';

import Current from './Current.js';
import GMap from './GMap.js';
import Nav from './Nav.js';

class MainContainer extends Component {
  constructor(){
    super();
    this.state = {
      weatherData: null,
      currently: null,
      locationName: null,
      longitude: null,
      latitude: null,
      units: null,
      selected: 1
    }
    this.childSetLocation = this.childSetLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.longitude !== this.state.longitude || prevState.latitude !== this.state.latitude){
      this.getWeather();
    }
  }

  render() {
    return(
      <div className="mw9 center ph3-ns">
        <h1 className="tc">Weather in <span className="">{this.state.locationName}</span></h1>
        <div className="cf ph2-ns">
          <div className="fl w-100 w-50-ns pa2">
            <Nav />
            { this.state.weatherData ?
              <Current 
                data={this.state.currently}
                units={this.state.units}
              />
            : null }
          </div>
        { this.state.latitude && this.state.longitude ?
          <GMap 
            lat={this.state.latitude} 
            long={this.state.longitude}
            setLocation = {this.childSetLocation}
          />
        : null }
      </div>
      <div className="cf w-auto">
        <a href="https://darksky.net/poweredby/" className=" fl w-100 link underline-hover dark-blue tc">Powered by DarkSky</a>
      </div>
    </div>
    );
  }

  extractResponseData(responseData){
    console.log(responseData);

    let locationName = "";
    if (responseData.gCloud.status === "OK") {
      locationName = responseData.gCloud.results[0].formatted_address;
    } else {
      locationName = "the middle of nowhere";
    }

    let units = {}
    switch (responseData.flags.units) {
      case 'ca' :
        units.degChar = 'C';
        units.windSpdChar = 'km/h';
        units.vis = 'km';
        break;
      case 'uk2' :
        units.degChar = 'C';
        units.windSpdChar = 'mph';
        units.vis = 'mi';
        break;
      case 'us' :
        units.degChar = 'F';
        units.windSpdChar = 'mph';
        units.vis = 'mi';
        break;
      default :
        // si
        units.degChar = 'C';
        units.windSpdChar = 'm/s';
        units.vis = 'km';
    }

    let newCurrently = responseData.currently;
    newCurrently.dailyDescription = responseData.hourly.summary;
    newCurrently.weeklyDescription = responseData.daily.summary;
    newCurrently.precipType = responseData.hourly.data[0].precipType ? responseData.hourly.data[0].precipType : 'Precipitation';
    newCurrently.apparentHigh = responseData.daily.data[0].apparentTemperatureHigh;
    newCurrently.apparentLow = responseData.daily.data[0].apparentTemperatureLow;

    this.setState({
      weatherData: responseData,
      currently: newCurrently,
      locationName: locationName,
      units: units
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