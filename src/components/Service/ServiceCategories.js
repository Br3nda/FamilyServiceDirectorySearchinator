import React from 'react';
import { Link, Route } from 'react-router-dom';
import {withRouter} from 'react-router';

class ServiceCategories extends React.Component {

  render() {
    return (
      <div className="service-categories">
        {this.props.preview && <small><b>Offers services in the following categories: </b></small>}
        {!this.props.preview && <h3>Offers services in the following categories: </h3>}
        <small>
          <ul className="list-stripped">
            {this.props.categories.map((data,index) => <Route key={index} render={() => (
              <li className={data === decodeURIComponent(this.props.category) ? 'selected'  : ''}>
                <Link title={data} to={`/service/${this.props.serviceId+'/'+encodeURIComponent(data)}`} onClick={()=> {
                  window.scrollTo(0,0);
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
