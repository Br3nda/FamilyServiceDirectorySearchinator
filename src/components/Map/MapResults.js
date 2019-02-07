import React, { Component } from 'react';
import ServiceMapMarker from './ServiceMapMarker';
import { Map, TileLayer } from 'react-leaflet';

export default class MapResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: { lat: -41.0, lng: 174.0 },
      zoom: 12,
    };

    this.checkLatLng = this.checkLatLng.bind(this);
    this.getUserPos = this.getUserPos.bind(this);
  }

  componentDidMount() {
    const { map_results } = this.props;

    if (map_results.length > 1) {
      this.setState({
        center: {
          lat: map_results[0].LATITUDE,
          lng: map_results[0].LONGITUDE,
        },
      });
    }
    this.getUserPos();
  }

  getUserPos() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
      });
    }
  }

  checkLatLng() {
    return Object.keys(
      this.props.LatLng ? this.props.LatLng : { none: 'none' },
    );
  }

  render() {
    const { map_results } = this.props;
    const { center, zoom } = this.state;

    return (
      <Map center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {map_results.map((record, i) => (
          <ServiceMapMarker key={`marker${i}`} record={record} />
        ))}
        ;
      </Map>
    );
  }
}
