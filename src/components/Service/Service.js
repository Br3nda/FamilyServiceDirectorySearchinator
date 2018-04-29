import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Service.css';
import ServiceDetail from './ServiceDetail';
import ServiceContactDetail from './ServiceContactDetail';

class Service extends Component {

  render() {
    return (
      <div>
        <div className="service">
          <div className="search-result-hero">
            <h2><Link to={`/service/${this.props.results.FSD_ID}`}>{this.props.results.PROVIDER_NAME}</Link></h2>
            {this.props.results.DISTANCE && <small>{((this.props.results.DISTANCE*1)/1000).toFixed(1)} km</small>}
            <ServiceContactDetail phone={this.props.results.PUBLISHED_PHONE_1} email={this.props.results.PUBLISHED_CONTACT_EMAIL_1} hours={this.props.results.PROVIDER_CONTACT_AVAILABILITY} />
          </div>
          <ServiceDetail results={this.props.results} changeCategory={this.props.changeCategory} searchVars={this.props.searchVars} serviceId={this.props.serviceId} loadimmediately={false} loadResults={this.props.loadResults} />
        </div>
      </div>
    );
  }
}

export default Service;
