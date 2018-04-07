import React from 'react';
import { Link, Route } from 'react-router-dom';
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
                <Link title={data} to={`/service/${this.props.serviceId+'/'+encodeURIComponent(data)}`} onClick={()=> {
                  this.props.displayServiceDetails(data);
                }} >{data}</Link>
              </li>)} />
            )}
          </ul>
        </small>
      </div>
    );
  }
}

export default withRouter(ServiceCategories);
