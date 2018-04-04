import React from 'react';
import '../../styles/Proximity.css';

class Proximity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      radius: props.radius
    };
    this.onRadiusChange = this.onRadiusChange.bind(this);
  }

  onRadiusChange(value){
    this.setState({radius: value});
    this.props.handler(value);
  }

  render() {
    return (
      <div className="proximity">
        <div>
          <div className="range">
            <input value={this.state.radius} type="range" min="25000" max="75000" step="25000" onChange={e => {this.onRadiusChange(e.target.value);}} />
          </div>
          <ul className="range-labels">
            <li className="first">Within 25km</li>
            <li className="middle">50km</li>
            <li className="last">100km</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Proximity;

