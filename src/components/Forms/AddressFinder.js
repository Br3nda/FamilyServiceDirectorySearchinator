import React from 'react';
import '../../styles/AddressFinder.css';

class AddressFinder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.data.searchVars.address
    };
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onAddressBlur = this.onAddressBlur.bind(this);
  }

  componentWillUpdate() {
    let address_field = document.getElementById('address_field');
    if(window.AddressFinder){
      let widget = new window.AddressFinder.Widget(
        address_field,
        'ADDRESSFINDER_DEMO_KEY',
        'NZ',
        {manual_style:true}
      );

      widget.on('result:select', (value, item) => {
        this.setState({address: value});
        this.props.data.loadResults({
          category: this.props.data.searchVars.category ? this.props.data.searchVars.category : '',
          keyword: this.props.data.searchVars.keyword ? this.props.data.searchVars.keyword : '',
          address: value,
          addressLatLng: (value)?{latitude: item.y, longitude: item.x}:{},
          radius: this.props.radius
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({address: nextProps.data.searchVars.address});
  }

  onAddressChange(value){
    this.setState({address: value});
  }

  onAddressBlur(value){
    this.setState({address: value});
    if(!value){
      this.props.data.loadResults({
        category: this.props.data.searchVars.category ? this.props.data.searchVars.category : '',
        keyword: this.props.data.searchVars.keyword ? this.props.data.searchVars.keyword : '',
        address: '',
        addressLatLng: {},
        radius: this.props.radius
      });
    }
  }

  render() {
    return (
      <div className="address_finder_container">
        <input value={this.state.address} id="address_field" type="search" onBlur={e =>this.onAddressBlur(e.target.value)} onChange={e => {this.onAddressChange(e.target.value);}} name="address" className="address-finder-input" placeholder="Enter a Location" />
      </div>
    );
  }
}

export default AddressFinder;

