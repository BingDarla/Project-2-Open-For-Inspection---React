import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';
import Results from './Results';
import { HashRouter as Router, Route } from 'react-router-dom';

import axios from 'axios';

const SERVER_URL = 'https://young-plains-74805.herokuapp.com/properties.json';

class PropertiesForm extends Component {
  constructor( props ) {
    super( props );
    this.state = { address: '', suburb: '', landsize: '', bedrooms: '', bathrooms: '', private_parking: '', expected_price: '' };

    this._handleChangeAddress = this._handleChangeAddress.bind(this);

    this._handleChangeSuburb = this._handleChangeSuburb.bind(this);

    this._handleChangeLandsize = this._handleChangeLandsize.bind(this);

    this._handleChangeBedrooms = this._handleChangeBedrooms.bind(this);

    this._handleChangeBathrooms = this._handleChangeBathrooms.bind(this);

    this._handleChangePrivateParking = this._handleChangePrivateParking.bind(this);

    this._handleChangeExpectedPrice = this._handleChangeExpectedPrice.bind(this);

    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChangeAddress(e) {
    this.setState( { address: e.target.value } );
  }

  _handleChangeSuburb(e) {
    this.setState( { suburb: e.target.value } );
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

  _handleChangeExpectedPrice(e) {
    this.setState( { expected_price: e.target.value } );
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit( this.state.address, this.state.suburb, this.state.landsize, this.state.bedrooms, this.state.bathrooms, this.state.private_parking, this.state.expected_price );
    this.setState( { address: '', suburb: '', landsize: '', bedrooms: '', bathrooms: '', private_parking: '', expected_price: '' } );
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>

        <input type="text" value={this.state.address} onChange={this._handleChangeAddress} placeholder="address" />

        <input type="text" value={this.state.suburb} onChange={this._handleChangeSuburb} placeholder="suburb"  />

        <input type="text" value={this.state.landsize} onChange={this._handleChangeLandsize} placeholder="landsize"  />

        <input type="text" value={this.state.bedrooms} onChange={this._handleChangeBedrooms} placeholder="bedrooms"  />

        <input type="text" value={this.state.bathrooms} onChange={this._handleChangeBathrooms} placeholder="bathrooms"  />

        <input type="text" value={this.state.private_parking} onChange={this._handleChangePrivateParking} placeholder="private parking"  />

        <input type="text" value={this.state.expected_price} onChange={this._handleExpectedPrice} placeholder="expected price" />

        <input type="submit" value="create property"/>

      </form>
    );
  }

}

class Property extends Component {
  constructor( props ) {
    super( props );
    let match = props.match;

    this.state = { properties: [], propertyId: match.params.propertyId };
    this.createProperty = this.createProperty.bind(this);

    const fetchProperties = () => {
      axios.get(SERVER_URL).then( results =>
      this.setState( { properties: results.data } ) );
      setTimeout(fetchProperties, 1000);
    }
    fetchProperties();
  }

  createProperty(address, suburb, landsize, bedrooms, bathrooms, parking, price) {
    axios.post(SERVER_URL, { address: address, suburb: suburb, landsize: landsize, bedrooms: bedrooms, bathrooms: bathrooms, private_parking: parking, expected_price: price }).then(results =>
      {
      this.setState({ properties: [results.data, ...this.state.properties] })
    });
  }

  render() {
    return (
      <div>
        <h1>properties website</h1>
        <p><Link to="/property">Property</Link></p>
        <p><Link to="/search">Search</Link></p>
        <PropertiesForm onSubmit={ this.createProperty }/>
        <Results properties={ this.state.properties }/>
      </div>
    );
  }
}

export default Property;
