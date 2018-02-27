import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SearchResults.css';
import FaPhone from 'react-icons/lib/fa/phone';
import FaMail from 'react-icons/lib/fa/envelope-o';
import FaClock from 'react-icons/lib/fa/clock-o';

class Service extends Component {
  urlify(url) {
    if(url !== undefined) {
      return url.toString()
        .toLowerCase()
        .split(/&+/).join('-and-')
        .split(/[^a-z0-9]/).join('-')
        .split(/-+/).join('-')
        .trim('-');
    }
  }
  serviceDetail(obj, icon, val) {
    return (
      <li className="list-icon">
        <span>{icon}</span> {val}
      </li>
    );
  }

  serviceDetails() {
    let obj = [
      {
        icon: <FaPhone />,
        val: this.props.record.PUBLISHED_PHONE_1
      },
      {
        icon: <FaMail />,
        val: this.props.record.PUBLISHED_CONTACT_EMAIL_1
      },
      {
        icon: <FaClock />,
        val: this.props.record.PROVIDER_CONTACT_AVAILABILITY
      }
    ];
    
    return obj.map((record, i) =>
      <li key={i} className="list-icon">
        <span>{record.icon}</span>
        {record.val}
      </li>
    );
  }
  render() {
    return (
      <div className="service">
        <div className="search-result-hero">
          <Link to={{ pathname: `/service/${this.urlify(this.props.record.PROVIDER_NAME)}`, state: this.props.record}} onClick={()=>this.props.changeResult(this.props.record)}><h3>{this.props.record.PROVIDER_NAME}</h3></Link>
          <p>{this.props.record.PHYSICAL_ADDRESS}</p>
          <span><u>Show on map</u></span>
        </div>
        <div className="service-details">
          <h4>{this.props.record.SERVICE_NAME}</h4>
          <p>{this.props.record.SERVICE_DETAIL}</p>
          <ul className="list-stripped">
            {this.serviceDetails()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Service;
