import React, { Component } from 'react';

class Info extends Component {

  render() {
    if(this.props.record.location.state) {
      return (
        <div className="container-fluid">
          <div className="service-info">
            <h2>{this.props.record.location.state.PROVIDER_NAME}</h2>
            <h4>{this.props.record.location.state.SERVICE_NAME}</h4>
            <p>{this.props.record.location.state.SERVICE_DETAIL}</p>
            <dt>Email</dt>
            <dd>{this.props.record.location.state.PUBLISHED_CONTACT_EMAIL_1}</dd>
            <dt>Phone</dt>
            <dd>
              <a className="telephone" href={`tel:${this.props.record.location.state.PUBLISHED_PHONE_1}`}>{this.props.record.location.state.PUBLISHED_PHONE_1}</a>
              <p><small><em>({this.props.record.location.state.PROVIDER_CONTACT_AVAILABILITY})</em></small></p>
            </dd>
            <dl>
              <dt>Organisation purpose</dt><dd>{this.props.record.location.state.ORGANISATION_PURPOSE}</dd>
              <dt>Physical address</dt><dd>{this.props.record.location.state.PHYSICAL_ADDRESS}</dd>
              <dt>Delivery Methods</dt><dd>{this.props.record.location.state.DELIVERY_METHODS}</dd>
              <dt>Costs</dt><dd>{this.props.record.location.state.COST_TYPE}</dd>
              <dt>Service referrals</dt><dd>{this.props.record.location.state.SERVICE_REFERRALS}</dd>
            </dl>
          </div>
        </div>
      );
    }
  }
}

export default Info;
