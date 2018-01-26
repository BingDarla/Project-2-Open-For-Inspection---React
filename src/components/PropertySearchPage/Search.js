import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import _ from 'underscore';

import Results from './Results';
import MapResults from './MapResults';


const SERVER_URL = 'https://young-plains-74805.herokuapp.com/properties.json'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      suburb: "north sydney"
     };

    this.fetchProperties = this.fetchProperties.bind(this);
    this.menuChange = this.menuChange.bind(this);
  }

  menuChange (menuValue) {
    console.log(menuValue);
    this.setState( { suburb: menuValue })
  }

  // fetchProperties( suburb, landsize, bedrooms, bathrooms, parking, price ) {
  //   axios.get(SERVER_URL).then(function (results){
  //     let array_properties = [];
  //     for (let i = 0; i < results.data.length; i++) {
  //       if (results.data[i].suburb === suburb && results.data[i].landsize === landsize ) {
  //         array_properties.push(results.data[i]);
  //
  //         console.log(this.state);
  //       }
  //     }
  // this.setState({properties : array_properties})
  //   }.bind(this));
  // }

  fetchProperties( suburb, landsize, bedrooms, bathrooms ) {
    axios.get(SERVER_URL).then(function (results) {
      let arrayProperties = [];
      for (let i = 0; i < results.data.length; i++) {
        if ( _.isMatch(results.data[i], {suburb: suburb})
        && ( _.isMatch(results.data[i], {landsize: landsize}))
        && ( _.isMatch(results.data[i], {bedrooms: bedrooms}))
        && ( _.isMatch(results.data[i], {bathrooms: bathrooms}))) {
          arrayProperties.push(results.data[i]);
          console.log(arrayProperties);
          console.log(this.state);
        } else if ( _.isMatch(results.data[i], {suburb: suburb})
        && (_.isMatch(results.data[i], {landsize: landsize}))
        && (_.isMatch(results.data[i], {bedrooms: bedrooms}))) {
          arrayProperties.push(results.data[i]);
          console.log(arrayProperties);
          console.log(this.state);
        } else if (_.isMatch(results.data[i], {suburb: suburb})
        && (_.isMatch(results.data[i], {landsize: landsize}))
        && (_.isMatch(results.data[i], {bathrooms: bathrooms}))) {
          arrayProperties.push(results.data[i]);
          console.log(arrayProperties);
          console.log(this.state);
        } else if (_.isMatch(results.data[i], {suburb: suburb})
        && (_.isMatch(results.data[i], {bedrooms: bedrooms}) || _.isMatch(results.data[i], {bathrooms: bathrooms}))) {
          arrayProperties.push(results.data[i]);
          console.log(arrayProperties);
          console.log(this.state);
        } else if (_.isMatch(results.data[i], {suburb: suburb})
        && _.isMatch(results.data[i], {landsize: landsize})) {
          arrayProperties.push(results.data[i]);
          console.log(arrayProperties);
          console.log(this.state);
        }
      }
      this.setState({properties : arrayProperties})
    }.bind(this));
  }

  render() {
    return (
      <div class="search-page-div">
        <React.Fragment>
          <h1>Search for a property</h1>

            <Link to="/"><img src="https://i.imgur.com/DwQZHkO.png?1" alt="logo" className = "logo1" /></Link>

          <div className = "fake-nav">
            <h2><Link to="/">Home</Link></h2>
            <h2><Link to="/property">Add Property</Link></h2>
          </div>
          <PropertySearch onSubmit={ this.fetchProperties } menuChange={ this.menuChange }/>
          <Results properties={ this.state.properties }/>

          <div>
            <MapResults suburb={ this.state.suburb }/>
          </div>

        </React.Fragment>
      </div>
    );
  }
}

class PropertySearch extends Component {
  constructor( props ) {
    super( props );
    this.state = { suburb: '', landsize: '', bedrooms: '', bathrooms: '', private_parking: '' };

    this._handleChangeSuburb = this._handleChangeSuburb.bind(this);

    this._handleChangeLandsize = this._handleChangeLandsize.bind(this);

    this._handleChangeBedrooms = this._handleChangeBedrooms.bind(this);

    this._handleChangeBathrooms = this._handleChangeBathrooms.bind(this);

    this._handleChangePrivateParking = this._handleChangePrivateParking.bind(this);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChangeSuburb(e) {
    this.setState( { suburb: e.target.value
    } );
    // console.log("the value just selected", e.target.value);
    // console.log("this.state - one behind", this.state.suburb);
    this.props.menuChange(e.target.value)
  }

  _handleChangeLandsize(e) {
    this.setState( { landsize: e.target.value } );
  }

  _handleChangeBedrooms(e) {
    this.setState( { bedrooms: e.target.value } );
  }

  _handleChangeBathrooms(e) {
    this.setState( { bathrooms: e.target.value } );
  }

  _handleChangePrivateParking(e) {
    this.setState( { private_parking: e.target.value } );
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit( this.state.suburb, this.state.landsize, this.state.bedrooms, this.state.bathrooms, this.state.private_parking );
  }


  render() {
    return (
      <form onSubmit={ this._handleSubmit } className = "search-form">

        <select value={this.state.selectValue} onChange={ this._handleChangeSuburb } required >
          <option value="">Select Suburb</option>
          <option value="Asquith">Asquith</option>
          <option value="Bondi">Bondi</option>
          <option value="Fairfield">Fairfield</option>
          <option value="Marrickville">Marrickville</option>
          <option value="Newtown">Newtown</option>
          <option value="Sydney">Sydney</option>
        </select>

        <input type="text" placeholder="landsize" onChange={ this._handleChangeLandsize } />

        <input type="tect" placeholder="bedrooms" onChange={ this._handleChangeBedrooms }  />

        <input type="text" placeholder="bathrooms" onChange={ this._handleChangeBathrooms } />

        <input type="submit" value="Search Properties" class = "search-form-submit" />
      </form>
    );
  }
}

export default Search;
