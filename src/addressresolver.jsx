import React from 'react';
import axios from 'axios';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

class AddressResolver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {longitude: '', latitude: '', selected: false, addresses: []};
    this.fetchAddresses = this.fetchAddresses.bind(this);
    this.handleAddressSelection = this.handleAddressSelection.bind(this);
  }
  handleAddressSelection(selected) {
    this.setState({
      selected: true,
      longitude: selected.x,
      latitude: selected.y
    });
    this.props.handler(selected);
  }
  componentDidUpdate(prevProps /*, prevState*/) {
    // only update if data has changed
    if (prevProps !== this.props) {
      this.setState({selected: false});
      this.fetchAddresses();
    }
  }
  fetchAddresses() {
    if (this.props.address.length < 2)
      return;
    let key = 'ADDRESSFINDER_DEMO_KEY';
    let url = 'https://api.addressfinder.io/api/nz/address?';
    let query = `format=json&key=${key}&q=${this.props.address}`;

    axios.get(`${url}${query}`).
      then(res => {
        this.setState({ addresses: res.data.completions });
      });
  }
  renderAddresses() {
    return this.state.addresses.map((record) =>
      <Address record={record} handler={this.handleAddressSelection}/>
    );
  }
  render() {
    if (this.props.address && !this.state.selected) {
      return (
        <ListGroup>
          {this.renderAddresses()}
        </ListGroup>
      );
    }
    else {
      return '';
    }
  }
}

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddressSelection = this.handleAddressSelection.bind(this);
  }
  handleAddressSelection() {
    let key = 'ADDRESSFINDER_DEMO_KEY';
    let url = 'https://api.addressfinder.io/api/nz/address/info?';
    let query = `key=${key}&format=json&pxid=${this.props.record.pxid}`;

    axios.get(`${url}${query}`).
      then(res => {
        this.props.handler(res.data);
      });
  }
  render() {
    return (
      <ListGroupItem onClick={this.handleAddressSelection}>
        {this.props.record.a}
      </ListGroupItem>
    );
  }
}

export default AddressResolver;
