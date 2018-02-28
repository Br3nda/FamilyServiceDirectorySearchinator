import React from 'react';
import '../../styles/Form.css';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return (
      <div className="filters">
        <nav className="nav">
          {this.props.data.filters.map(data => {
            return (<button className={this.props.data.category === data.name ? 'selected'  : ''} key={data.num} 
            onClick={()=> {this.props.data.loadResults(data.name, '');}}>{data.name}</button>);
          })}
        </nav>
        <select value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option name="filters" defaultValue>-- Select Category --</option>
          {this.props.data.filters.map(data => {
          return (<option key={data.num} name="filters">{data.name}</option>);
          })}
        </select>
      </div>
    );
  };
}

export default Filters;
