import React, { Component } from 'react';

class SearchResults extends Component {
  constructor(props){
    super();
  }

  render(){
    const {searchResults, onClick} = this.props;
    return(
      <ul className="searchList list fr mv0 ba">
        {searchResults.map((element, index) => {
          return <li className="tr pv1 pl3 pr1 bb b--black-20" key={index} id={index} onClick={onClick}>{element.description}</li>
        })}
      </ul>
    );
  }
}

export default SearchResults;