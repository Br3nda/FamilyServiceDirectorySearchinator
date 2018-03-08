import React, { Component } from 'react';
import ServiceMapMarker from './ServiceMapMarker';
import {  Map, TileLayer } from 'react-leaflet';

class MapResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: []
    };

  }
  checkLatLng() {
    return Object.keys(this.props.LatLng ? this.props.LatLng : {none: 'none'});
  }
  centre() {
    return [this.props.map_results[0].LATITUDE, this.props.map_results[0].LONGITUDE];
  }

  defaultCentre() {
    // roughly the centre of aotearoa
    return [-41.0, 174.0];
  }
  render() {
    return (
      <Map center={this.props.map_results.length !== 1 ? this.defaultCentre() : this.centre()} zoom={this.props.map_results.length !== 1 ? 5 : 12}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        {this.props.map_results.map((record, i) =>
          <ServiceMapMarker key={'marker'+i} record={record} />
        )};

      </Map>
    );
  }
}
export default MapResults;
