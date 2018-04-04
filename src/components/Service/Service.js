import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Service.css';
import ServiceDetail from './ServiceDetail';

class Service extends Component {

  render() {
    return (
      <div>
        <div className="service">
          <div className="search-result-hero">
            <Link to={`/service/${this.props.results.FSD_ID}${this.props.searchVars.category ? '/'+encodeURIComponent(this.props.searchVars.category) : ''}`}><h2>{this.props.results.PROVIDER_NAME}</h2></Link>
            <p>{this.props.results.PHYSICAL_ADDRESS}</p>
          </div>
          <ServiceDetail results={this.props.results} changeCategory={this.props.changeCategory} searchVars={this.props.searchVars} serviceId={this.props.serviceId} loadimmediately={false} loadResults={this.props.loadResults} />
        </div>
      </div>
    );
  }
}

export default Service;
