import React, { Component } from 'react';
import ServiceMapMarker from './ServiceMapMarker';
import {  Map, TileLayer } from 'react-leaflet';

class MapResults extends Component {
  constructor(props) {
    super(props);
    if(this.props.longitude && this.props.latitude) {
      this.state = { centre: this.centre(), zoom: 12 };
    }
    else {
      this.state = { centre: this.defaultCentre(), zoom: 5 };
    }
  }
  centre() {
    return [this.props.latitude, this.props.longitude];
  }
  defaultCentre() {
    // roughly the centre of aotearoa
    return [-41.0, 174.0];
  }
  render() {
    return (
      <Map center={this.state.centre} zoom={this.state.zoom}>
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
