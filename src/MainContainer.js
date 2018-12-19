import React, { Component } from 'react';
import axios from 'axios';


import Currently from './Currently.js';
import Hourly from './Hourly.js';
import Daily from './Daily.js';
import GMap from './GMap.js';
import Nav from './Nav.js';

class MainContainer extends Component {
  constructor(){
    super();
    this.state = {
      weatherData: null,
      currently: null,
      hourly: null,
      daily: null,
      locationName: null,
      locationNameSub: null,
      longitude: null,
      latitude: null,
      units: null,
      offset: null,
      selected: 1
    }
    this.childSetLocation = this.childSetLocation.bind(this);
    this.childSetSelected = this.childSetSelected.bind(this);

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
    let selectedPanel = null;
    // eslint-disable-next-line
    if (this.state.selected == 1) {selectedPanel = <Currently data={this.state.currently} units={this.state.units} offset={this.state.offset}/>;}
    // eslint-disable-next-line
    else if (this.state.selected == 2) {selectedPanel = <Hourly data={this.state.hourly} units={this.state.units} offset={this.state.offset}/>;}
    // eslint-disable-next-line
    else if (this.state.selected == 3) {selectedPanel = <Daily days={this.state.daily} units={this.state.units} offset={this.state.offset}/>;}

    return(
      <div className="mw9 center ph3-ns">
        <h1 className="tc mb1">Weather <span className="">{this.state.locationName}</span></h1>
        <h4 className="tc mb0 mt0 black-50">{this.state.locationNameSub}</h4>
        <div className="cf ph2-ns">
          <div className="fl w-100 w-50-ns pa2">
            <Nav selectFunc={this.childSetSelected}/>
            { this.state.weatherData ?
              selectedPanel
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
      
    </div>
    );
  }

  extractResponseData(responseData){
    let locationName = "";
    let locationNameSub = "";
    if (responseData.gCloud) {
      let address_components = responseData.gCloud.results[0].address_components;
      locationName = "in " + address_components[0].long_name;

      let prevAddressComponent = address_components[0].long_name;
      let addedToSubCounter = 0;
      // start at the second component
      if (address_components.length > 1) {
        for (let i = 1; i < address_components.length; i++) {
          // test if the address component includes the previous component
          if (!address_components[i].long_name.includes(prevAddressComponent)){
            // test if the last address component contains any numbers
            if (!(i === address_components.length-1 && /[0-9]/.test(address_components[i].long_name))){
              // if this is the first string to be added to locationNameSub, don't include a leading comma and space
              locationNameSub += ((addedToSubCounter === 0 ? '' : ', ') + (address_components[i].long_name));
              addedToSubCounter++;
            }
            
          }
          prevAddressComponent = address_components[i].long_name;
        }
      }

    } else if (responseData.geonames){
      let name = responseData.geonames;
      if (name.includes('Lake')) {
        locationName = "on " + name;
      } else {
        locationName = "on the " + name;
      }
    } else {
      locationName = "in the middle of nowhere";
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

    let newHourly = [];
    newHourly.push(responseData.hourly.data[0]); newHourly.push(responseData.hourly.data[2]); newHourly.push(responseData.hourly.data[4]); newHourly.push(responseData.hourly.data[6]); newHourly.push(responseData.hourly.data[8]);
    
    let newDaily = {};
    newDaily.data = responseData.daily.data.slice(0, 5);
    newDaily.summary = responseData.daily.summary;
    newDaily.icon = responseData.daily.icon;

    this.setState({
      weatherData: responseData,
      currently: newCurrently,
      hourly: newHourly,
      locationName: locationName,
      locationNameSub: locationNameSub,
      units: units,
      daily: newDaily,
      offset: parseInt(responseData.offset)
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

  childSetSelected(code) {
    this.setState({
      selected: code
    });
  }
}

export default MainContainer;