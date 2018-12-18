import React, { Component } from 'react';
import './GMap.css';

class GMap extends Component {
  constructor(props){
    super();
    this.state = {
      google: null,
      map: null,
      marker: null
    }
    this.loadScript = this.loadScript.bind(this);
    this.initMap = this.initMap.bind(this);
  }

  componentDidMount(){
    this.initMap();
  }

  loadScript(){
    return new Promise((resolve, reject)=>{
      var script = document.createElement('script');
      script.src = "https://weatherget.herokuapp.com/initMap";
      script.addEventListener('load', ()=>{
        resolve();
      });
      script.addEventListener('error', (e)=>{
        reject(e);
      });
      document.body.appendChild(script);
    });
  }

  initMap() {
    this.loadScript()
    .then(()=>{
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: this.props.lat, lng: this.props.long},
        zoom: 8,
        mapTypeId: 'terrain',
        disableDefaultUI: true
      });
      map.addListener('click', (event)=>{
        this.placeMarker({lat: event.latLng.lat(), lng: event.latLng.lng()});
      });
      this.setState({
        google: window.google,
        map: map
      }, ()=>{
        this.placeMarker({lat: this.props.lat, lng: this.props.long});
      });
    })
   
  }

  placeMarker(latLng){
    if (this.state.marker){
      this.state.marker.setMap(null);
    }
    let marker = new window.google.maps.Marker({
      position: latLng
    });
    marker.setMap(this.state.map);
    this.setState({
      marker: marker
    });
    this.props.setLocation(latLng);
  }

  render() {
    return(
      <div className="mapContainer fl w-100 w-50-ns pa2">
        <div className="map" ref="map" id="map"></div>
      </div>

    );
  }
}

export default GMap;

