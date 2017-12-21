import React, {PureComponent as Component } from 'react';
import axios from 'axios';

const AUCTION_URL = 'http://localhost:5000/auctions.json';

function AuctionList(props) {
  return (
    <div>
      { props.auctions.map( s => <p key={s.price}><span>Address: {s.address}</span>
           <span>User Name: {s.userName}</span>
           <span> Price : {s.price} </span>
           <span> Create at :{s.time}</span>
        </p> ) }
    </div>
  );
}



class Auction extends Component {
  constructor() {
    super();
    this.state = {
      price :0,
      user_id : 1,
      property_id :1,
      auctions :[],
      priceMax : 0,
      auction:{}

    }

    this._handleChangePrice = this._handleChangePrice.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillMount() {
    // console.log('mounting');
    this.fetchInfor().then( function () {
      // console.log('finished')
    });
  }

  fetchInfor() {
    // returning Promises
    return axios.get(AUCTION_URL).then(results => {
    // debugger;
      // console.log(results.data.auctions);
      // console.log(this.state.property_id);
      let id = this.state.property_id;


      const propertyAuctionsInfo = results.data.auctions.filter((s) => {
          // debugger;
          return s.property_id == id

      });

      this.setState({auctions:propertyAuctionsInfo.reverse()});
      // console.log (propertyAuctionsInfo);
      // console.log (this.state.auctions);

      const propertyPricelist = propertyAuctionsInfo.map(function(s){return s.price});
      // console.log(propertyPricelist);
      let PriceM = Math.max(...propertyPricelist);
      console.log(PriceM);
      this.setState({priceMax:PriceM});

    });
  }

  saveAuction(a){
    this.setState({auction :a});
    // this.setState({auctions :[this.state.auction,...this.state.auctions]});
    this.fetchInfor();
    console.log(a);
  }


  _handleChangePrice(e){
    this.setState({price:e.target.value});
  }

  _handleSubmit(event){
    event.preventDefault();


    this.fetchInfor().then(function () {
      // debugger;
      console.log(this.state.price);

      if (this.state.price > this.state.priceMax){
        axios.post(AUCTION_URL,{user_id:this.state.user_id, property_id:this.state.property_id,price:this.state.price}).then(results => {this.saveAuction(results.data)});

      }
      else {
        alert ('Not a valid auction price.');
      }
    }.bind(this)
  );
  // this.setState({price:0});
}






  render(){
    return(
      <div>
      <AuctionList  auctions = {this.state.auctions}  />
      <br/>
      <br/>
      <form className = 'auction-form' onSubmit={this._handleSubmit}>
      <label> Price:
      <input value = {this.state.price} onChange = {this._handleChangePrice}/>
      </label>
      <input type = 'submit' value = 'Post' className = 'auction-button' />
      </form>
      </div>
    )
  }
}

export default Auction