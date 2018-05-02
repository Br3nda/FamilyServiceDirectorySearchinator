import React from 'react';
import '../../styles/AddressFinder.css';

class AddressFinder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.searchVars.address,
      reset: this.props.noSearchVars
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
        this.props.loadResults({
          category: this.props.searchVars.category ? this.props.searchVars.category : '',
          keyword: this.props.searchVars.keyword ? this.props.searchVars.keyword : '',
          address: value,
          addressLatLng: (value)?{latitude: item.y, longitude: item.x}:{},
          radius: this.props.radius
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading){
      if(nextProps.searchVars.address.length === 0){
        this.setState({address: ''});
      }else if(nextProps.searchVars.address.length > 0){
        this.setState({address: nextProps.searchVars.address});
      }
    }
  }

  onAddressChange(value){
    this.setState({address: value,reset: false});
  }

  onAddressBlur(value){
    this.setState({address: value,reset: false});
    if(!value){
      this.props.loadResults({
        category: this.props.searchVars.category ? this.props.searchVars.category : '',
        keyword: this.props.searchVars.keyword ? this.props.searchVars.keyword : '',
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

