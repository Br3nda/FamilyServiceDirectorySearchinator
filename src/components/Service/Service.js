import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Service.css';
import FaPhone from 'react-icons/lib/fa/phone';
import FaMail from 'react-icons/lib/fa/envelope-o';
import FaClock from 'react-icons/lib/fa/clock-o';

class Service extends React.Component {

  serviceDetails(data) {
    let obj = [
      {
        icon: <FaPhone />,
        val: <a href={`tel:${data.PUBLISHED_PHONE_1}`}>{data.PUBLISHED_PHONE_1}</a>
      },
      {
        icon: <FaMail />,
        val: data.PUBLISHED_CONTACT_EMAIL_1
      },
      {
        icon: <FaClock />,
        val: data.PROVIDER_CONTACT_AVAILABILITY
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

    let data = this.props.results;

    return (
      <div>
        <div className="service">
          <div className="search-result-hero">
            <Link to={`/service/${encodeURIComponent(this.props.filter ? this.props.filter : data.LEVEL_1_CATEGORY)}/${data.FSD_ID}`}><h2>{data.PROVIDER_NAME}</h2></Link>
            <p>{data.PHYSICAL_ADDRESS}</p>
          </div>
          <div className="service-details">
            <h4>{data.SERVICE_NAME}</h4>
            <p>{data.SERVICE_DETAIL}</p>
            <ul className="list-stripped">
              {this.serviceDetails(data)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Service;
