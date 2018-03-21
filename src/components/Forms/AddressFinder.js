import React from 'react';
import '../../styles/AddressFinder.css';

class AddressFinder extends React.Component {

  componentWillUpdate() {
    let address_field = document.getElementById('address_field');
    let widget = new window.AddressFinder.Widget(
      address_field,
      'ADDRESSFINDER_DEMO_KEY',
      'NZ',
      {manual_style:true}
    );

    widget.on('result:select', (value, item) => {
      this.props.data.loadResults(
        this.props.data.category ? this.props.data.category : '', '', {latitude: item.y, longitude: item.x});
    });
  }


  render() {
    return (
      <div className="address_finder_container">
        <input id="address_field" type="search" name="address" className="address-finder-input" placeholder="Enter a Location" />
      </div>
    );
  }
}

export default AddressFinder;

