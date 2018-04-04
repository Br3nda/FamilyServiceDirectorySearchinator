import React, { Component } from 'react';
import '../../styles/ServiceDetail.css';

class ServiceDetailDesc extends Component {

  render() {
    return (
      <div>
        {(this.props.services.length > 0) && this.props.services.map((data,index)=>
          <div key={index}>
            <h4>{data.SERVICE_NAME}</h4>
            {(data.SERVICE_NAME !== data.SERVICE_DETAIL) && <p>{data.SERVICE_DETAIL}</p>}
          </div>
        )}
        {(this.props.services.length === 0) && <h4>No further information</h4>}
      </div>
    );
  }
}

export default ServiceDetailDesc;
