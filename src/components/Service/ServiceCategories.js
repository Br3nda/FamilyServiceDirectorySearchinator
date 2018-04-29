import React from 'react';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router';

class ServiceCategories extends React.Component {

  render() {
    return (
      <div className="service-categories">
        <small><b>Service categories: </b></small>
        <small>
          <ul className="list-stripped">
            {this.props.categories.map((data,index) => <Route key={index} render={() => (
              <li className={data === decodeURIComponent(this.props.category) ? 'selected'  : ''}>
                <a href={`/service/${this.props.serviceId}`} onClick={(e)=> {
                  e.preventDefault();
                  this.props.displayServiceDetails(data);
                }} >{data}</a>
              </li>)} />
            )}
          </ul>
        </small>
      </div>
    );
  }
}

export default withRouter(ServiceCategories);
