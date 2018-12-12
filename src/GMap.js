import React, { Component } from 'react';
import './GMap.css';

class GMap extends Component {
  constructor(props){
    super();
    this.state = {
      google: null,
      map: null
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
      this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
      });
      this.setState({
        google: window.google
      });
    })
   
  }

  render() {
    return(
      <div className="mapContainer">
        <div className="map" ref="map" id="map"></div>
      </div>

    );
  }
}

export default GMap;

