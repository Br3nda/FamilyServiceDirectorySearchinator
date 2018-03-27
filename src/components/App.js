import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import MapResults from './Map/MapResults';
import AddressFinder from './Forms/AddressFinder';
import Filters from './Service/Filters';
import Service from '../components/Service/Service';
import Sharebar from '../components/Social/Sharebar';
import '../styles/Nav.css';
import '../styles/Form.css';
import Proximity from './Forms/Proximity';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showMap: false,
      latlng: []
    };
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  componentWillMount () {
    this.props.loadFilters();
    this.radiusChange = this.debounce(this.radiusChange,200);
  }

  resultButton () {
    if(this.props.results.length > 0){
      return <button className="btn-toggle" onClick={() => {
        this.setState({ showMap: !this.state.showMap}); }
      }>{this.state.showMap ? 'Show List' : 'Toggle Map'}</button>;
    }
  }

  resultCountButton () {
    if(!this.props.itemsLoading && this.props.hasSearched){
      return <p>Found {this.props.results.length} result{this.props.results.length !== 1 ? 's' : ''} {this.resultButton()} </p>;
    }
  }

  addressBlur(e){
    /* clears location details when the field is emptied */
    if(e.target.value === ''){
      this.setState({latlng: {}});
      this.props.loadResults(this.props.category,this.props.keyword,{});
    }
  }


  radiusChange(value){
    this.props.loadResults(this.props.category,this.props.keyword,this.props.addressLatLng,value*1);
  }

  render() {
    return (
      <div className="container-fluid">
        <Filters data={this.props} addressLatLng={this.props.addressLatLng} radius={this.props.radius}/>
        <form className="form" onSubmit={(e)=>{
          e.preventDefault();
          this.setState({latlng: this.props.addressLatLng});
          this.props.loadResults(this.props.category, e.target.keyword.value, this.props.addressLatLng === undefined ? this.state.latlng : this.props.addressLatLng, this.props.radius);
        }}>
          <input type="search" name="keyword" placeholder="Enter topic or organisation" />
          <AddressFinder data={this.props} handler={this.addressBlur.bind(this)} radius={this.props.radius}/>
          <Proximity handler={this.radiusChange.bind(this)} addressLatLng={this.props.addressLatLng} radius={this.props.radius}/>
          <button type="submit">Search</button>
        </form>
        <div className={'results' + (this.props.itemsLoading ? ' loading' : '')}>
          {this.resultCountButton()}
          { !this.props.itemsLoading && this.state.showMap && <MapResults className="container-fluid" LatLng={this.props.addressLatLng} map_results={this.props.results} />}
          { !this.props.itemsLoading && !this.state.showMap && this.props.results.map((data, key)=> <Service key={key} results={data} filter={this.props.name} />)}
        </div>
        <Sharebar/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filter,
    results: state.results,
    showMap: state.showMap,
    keyword: state.keyword,
    category: state.category,
    addressLatLng: state.addressLatLng,
    radius: state.radius,
    itemsLoading: state.itemsLoading,
    hasSearched: state.hasSearched
  };
}

export default connect(mapStateToProps, actionCreators)(App);
