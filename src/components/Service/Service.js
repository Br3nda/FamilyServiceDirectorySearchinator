import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Service.css';
import ServiceContactDetail from './ServiceContactDetail';

class Service extends React.Component {

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
            <ServiceContactDetail phone={data.PUBLISHED_PHONE_1} email={data.PUBLISHED_CONTACT_EMAIL_1} hours={data.PROVIDER_CONTACT_AVAILABILITY} website={data.PROVIDER_WEBSITE_1}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Service;
