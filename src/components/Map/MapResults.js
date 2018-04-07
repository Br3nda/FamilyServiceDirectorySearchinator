import React, { Component } from 'react';
import ServiceMapMarker from './ServiceMapMarker';
import {  Map, TileLayer } from 'react-leaflet';

class MapResults extends Component {

  checkLatLng() {
    return Object.keys(this.props.LatLng ? this.props.LatLng : {none: 'none'});
  }


  render() {
    // roughly the centre of aotearoa
    let center = (this.props.map_results.length !== 1) ? {lat:-41.0,lng: 174.0} : {lat:this.props.map_results[0].LATITUDE*1,lng: this.props.map_results[0].LONGITUDE*1};

    return (
      <Map center={center} zoom={this.props.map_results.length !== 1 ? 5 : 12}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {this.props.map_results.map((record, i) =>
          <ServiceMapMarker key={'marker'+i} record={record} />
        )};

      </Map>
    );
  }
}
export default MapResults;
