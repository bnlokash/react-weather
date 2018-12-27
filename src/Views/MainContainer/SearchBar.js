import React, { Component } from 'react';
import axios from 'axios';

import SearchResults from './SearchResults.js';

class SearchBar extends Component {
  constructor(props){
    super();
    this.state = {
      showSearchResults: false,
      searchResults: null
    }
    this.searchResultClick = this.searchResultClick.bind(this);
    this.searchKeyUp = this.searchKeyUp.bind(this);
    this.showSearchResults = this.showSearchResults.bind(this);
    this.hideSearchResults = this.hideSearchResults.bind(this);
  }

  render() {
    return(
      <div className="fl w-20 searchContainer">
        <input type="text" id="input" className="input fr mr3 mt4" placeholder="search locations" onChange={this.searchKeyUp} onClick={this.showSearchResults}/>
        <div className="searchContainer">
          {this.state.showSearchResults && <SearchResults searchResults={this.state.searchResults} onClick={this.searchResultClick}/>}
        </div>
      </div>
    );
  }

  searchResultClick(event) {
    document.getElementById('input').value = "";
    this.setState({
      showSearchResults: false
    })
    axios.get(`https://weatherget.herokuapp.com/geocode/${this.state.searchResults[event.target.id].place_id}`)
    .then((response)=>{
      let latLng = response.data.results[0].geometry.location;
      this.props.setLocation(latLng);
      this.props.setMap(latLng);
    })
  }

  searchKeyUp(event) {
    if (event.target.value) {
      axios.get(`https://weatherget.herokuapp.com/placeAutocomplete/${event.target.value}`)
      .then((response)=>{
        this.setState({
          searchResults: response.data.predictions
        }, ()=>{
          this.setState({
          showSearchResults: true
          });
        });
      });
    } else {
      this.setState({
        showSearchResults: false
      });
    }
  }

  hideSearchResults(){
    this.setState({
      showSearchResults: false
    })
  }

  showSearchResults(event){
    event.stopPropagation();
    if (event.target.value){
      this.setState({
        showSearchResults: true
      });
    }
  }
}

export default SearchBar;