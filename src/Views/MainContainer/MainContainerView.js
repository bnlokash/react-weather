import React, { Component } from 'react';
import axios from 'axios';

import responseExtractorFactory from './responseExtractorFactory.js';

import CurrentlyView from '../Currently/CurrentlyView.js';
import HourlyView from '../Hourly/HourlyView.js';
import DailyView from '../Daily/DailyView.js';
import GMapView from '../GMap/GMapView.js';
import Navbar from './Navbar.js';
import LocationHeading from './LocationHeading.js';
import SearchBar from './SearchBar.js';

class MainContainer extends Component {
  constructor(){
    super();
    this.state = {
      weatherData: null,
      currently: null,
      hourly: null,
      daily: null,
      locationHeading: null,
      locationSubtitle: null,
      longitude: null,
      latitude: null,
      units: null,
      offset: null,
      selected: 1
    }
    this.childSetLocation = this.childSetLocation.bind(this);
    this.childSetSelected = this.childSetSelected.bind(this);
    this.childPlaceMarkerAndPan = this.childPlaceMarkerAndPan.bind(this);
    this.hideSearchResults = this.hideSearchResults.bind(this);

    this.mapRef = React.createRef();
    this.searchBarRef = React.createRef();
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
    if (this.state.selected == 1) {
      selectedPanel = <CurrentlyView data={this.state.currently} units={this.state.units} offset={this.state.offset}/>;
    }
    // eslint-disable-next-line
    else if (this.state.selected == 2) {
      selectedPanel = <HourlyView data={this.state.hourly} units={this.state.units} offset={this.state.offset}/>;
    }
    // eslint-disable-next-line
    else if (this.state.selected == 3) {
      selectedPanel = <DailyView data={this.state.daily} units={this.state.units} offset={this.state.offset}/>;
    }

    return(
      <div className="mw9 center ph3-ns" onClick={this.hideSearchResults}>
        <LocationHeading heading={this.state.locationHeading} subtitle={this.state.locationSubtitle}>
          <SearchBar setLocation={this.childSetLocation} setMap={this.childPlaceMarkerAndPan} ref={this.searchBarRef}/>
        </LocationHeading>
        <div className="cf ph2-ns">
          <div className="fl w-100 w-50-ns pa2">
            <Navbar selectFunc={this.childSetSelected}/>
            { this.state.weatherData && selectedPanel }
          </div>
          { this.state.latitude && this.state.longitude &&
            <GMapView 
              lat={this.state.latitude} 
              long={this.state.longitude}
              setLocation = {this.childSetLocation}
              ref={this.mapRef}
            />
          }
        </div>
      </div>
    );
  }

  extractResponseData(responseData){
    const responseExtractor = responseExtractorFactory(responseData);

    const locationHeading = responseExtractor.extractLocationHeading();
    const locationSubtitle = responseExtractor.extractLocationSubtitle();
    const currently = responseExtractor.extractCurrentlyObj();
    const hourly = responseExtractor.extractHourlyArr();
    const daily = responseExtractor.extractDailyObj();
    const units = responseExtractor.extractUnitsObj();

    this.setState({
      weatherData: responseData,
      currently: currently,
      hourly: hourly,
      locationHeading: locationHeading,
      locationSubtitle: locationSubtitle,
      units: units,
      daily: daily,
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
    console.log('child set location');
    this.setState({
      latitude: latLng.lat,
      longitude: latLng.lng
    });
  }

  childSetSelected(code) {
    console.log('child set selected');
    this.setState({
      selected: code
    });
  }

  childPlaceMarkerAndPan(latLng) {
    this.mapRef.current.placeMarkerAndPan(latLng);
  }
  
  hideSearchResults() {
    this.searchBarRef.current.hideSearchResults();
  }

  childSetSearchResults(results){
    this.setState({
      searchResults: results
    });
  }

  

  
}

export default MainContainer;