import React, { Component } from 'react';
import axios from 'axios';

import responseExtractorFactory from './responseExtractorFactory.js';
import SELECTED from './navbarConstants.js';

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
    const {weatherData, latitude, longitude, locationHeading, locationSubtitle, selected} = this.state;
    const {hideSearchResults, childSetLocation, childPlaceMarkerAndPan, childSetSelected, mapRef, searchBarRef} = this;

    let selectedPanel = this.choosePanel(selected);

    return(
      <div className="mw9 center ph3-ns" onClick={hideSearchResults}>
        <LocationHeading heading={locationHeading} subtitle={locationSubtitle}>
          <SearchBar setLocation={childSetLocation} setMap={childPlaceMarkerAndPan} ref={searchBarRef}/>
        </LocationHeading>
        <div className="cf ph2-ns">
          <div className="fl w-100 w-50-ns pa2">
            <Navbar selectFunc={childSetSelected}/>
            { weatherData && selectedPanel }
          </div>
          { latitude && longitude &&
            <GMapView 
              lat={latitude} 
              long={longitude}
              setLocation = {childSetLocation}
              ref={mapRef}
            />
          }
        </div>
      </div>
    );
  }

  extractResponseData(responseData){
    const responseExtractor = responseExtractorFactory(responseData);

    const locationHeading = responseExtractor.LocationHeading();
    const locationSubtitle = responseExtractor.LocationSubtitle();
    const currently = responseExtractor.CurrentlyObj();
    const hourly = responseExtractor.HourlyArr();
    const daily = responseExtractor.DailyObj();
    const units = responseExtractor.UnitsObj();

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

  choosePanel(selected){
    const {currently, hourly, daily, units, offset} = this.state;
    let selectedPanel = null;
    switch (selected) {
      case SELECTED.CURRENTLY :
        selectedPanel = <CurrentlyView data={currently} units={units} offset={offset}/>;
        break;
      case SELECTED.HOURLY :
        selectedPanel = <HourlyView data={hourly} units={units} offset={offset}/>; 
        break;
      case SELECTED.DAILY :
        selectedPanel = <DailyView data={daily} units={units} offset={offset}/>; 
        break;
      default :
        selectedPanel = <CurrentlyView data={currently} units={units} offset={offset}/>;
    }
    return selectedPanel;
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