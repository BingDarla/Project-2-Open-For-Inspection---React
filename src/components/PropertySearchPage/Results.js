import React, {PureComponent as Component} from 'react';
import { Link } from 'react-router-dom';
import Property from '../PropertyCreatePage/Property';
import Search from './Search';

class ResultsSearch extends Component {
  render() {
    const property = this.props.property;
    return (
      <div className="results-grid" key={ property.id }>
        <span className="results-photo">{ property.photo }</span>
        <span className="results-address">{ property.address }</span>
        <span className="results-suburb">{ property.suburb }</span>

        <span className="results-landsize">{ property.landsize }</span>

        <span className="results-bedroom">{ property.bedrooms }</span>

        <span className="results-bathroom">{ property.bathrooms }</span>

        <span className="results-privateparking">{ property.private_parking + '' }</span>


      </div>
    );
  }
}

function Results(props) {
  // constructor(props){
  //   super(props);
  //   console.log(props.properties);
  // }
  return (
    <div className = "property-results">
      <h1>Properties</h1>
      <div className="results-grid headings">
        <h3 className="results-photo"><strong>Photo</strong></h3>
        <h3 className="results-address"><strong>Address</strong></h3>
        <h3 className="results-suburb"><strong>Suburb</strong></h3>
        <h3 className="results-landsize"><strong>Landsize</strong></h3>
        <h3 className="results-bedroom"><strong>Bedrooms</strong></h3>
        <h3 className="results-bathroom"><strong>Bathrooms</strong></h3>
        <h3 className="results-privateparking"><strong>Private Parking</strong></h3>

      </div>




      { props.properties.map( f =>
        <div className="results-grid" key={ f.id }>
          <Link to={{pathname: '/auction/' + f.id}}><img src={f.photo} alt="logo" className = "prop-image"/></Link>
          <span className="results-address">{ f.address }</span>
          <span className="results-suburb">{ f.suburb }</span>
          <span className="results-landsize">{ f.landsize }&#13217;</span>
          <span className="results-bedroom">{ f.bedrooms }</span>
          <span className="results-bathroom">{ f.bathrooms }</span>
          <span className="results-privateparking">{ f.private_parking + '' }</span>

        </div>
      )
     }
    </div>
  );
}

export default Results;
