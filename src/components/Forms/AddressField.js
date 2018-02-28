import React from 'react';

class AddressForm extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      show_addresses: false
    };
  }

  selectAddress(address) {
    this.setState({show_addresses: false});
    this.refs.address.value = address.a;
  }

  render() {
    return (
      <div>
        <input type="search" name="address" className="address-finder-input" placeholder="Enter a Location" ref="address" onChange={(e)=>{
          this.setState({address: e.target.value, show_addresses: true});
          this.props.data.fetchAddressFinder(this.state.address);
        }} />
        {this.state.show_addresses &&
          <ul className="address-finder list-stripped">
            {this.props.data.addresses.map((address, key) => <li key={key} onClick={()=>{this.selectAddress(address);}}>{address.a}</li>)}
          </ul>
        }
      </div>
    );
  }
}

export default AddressForm;
