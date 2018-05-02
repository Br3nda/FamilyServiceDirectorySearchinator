import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import MapResults from '../Map/MapResults';
import { Route, Link } from 'react-router-dom';
import Sharebar from '../Social/Sharebar';
import ServiceDetail from './ServiceDetail';
import ServiceContactDetail from './ServiceContactDetail';

export class ServiceInfo extends React.Component {

  componentDidMount() {
    this.props.loadService({
      category: this.props.match.params.category
    },this.props.match.params.name);
    window.scrollTo(0, 0);
  }

  render(){
    /* results is undefined when page loaded directly */
    const { match: { params: { name } } , result } = this.props;
    const filteredResults = result.filter(item => item.FSD_ID === name);

    return <div>
      <div className="container-fluid">
        <div className={'service-info' + (filteredResults.length === 0 ? ' loading':'')}>
          <Route render={() => (
            <Link to={'/'+(this.props.searchVars.category ? 'category/'+encodeURIComponent(decodeURIComponent(this.props.searchVars.category)):'')} onClick={()=> { window.scrollTo(0,0);}} >Go back</Link>
          )} />
          <ul className="list-stripped">
            {filteredResults.map((i, key)  => (
              <div key={key}>
                <div className="search-result-hero">
                  <h2>{i.PROVIDER_NAME}</h2>
                  <ServiceContactDetail phone={i.PUBLISHED_PHONE_1} email={i.PUBLISHED_CONTACT_EMAIL_1} hours={i.PROVIDER_CONTACT_AVAILABILITY} />
                </div>
                <ServiceDetail results={i} changeCategory={this.props.changeCategory} searchVars={this.props.searchVars} serviceId={i.FSD_ID} loadimmediately={true} preview={false} />
                <Sharebar subject={i.PROVIDER_NAME}/>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <MapResults map_results={filteredResults} />
    </div>;
  }
}


export default connect(
  state => ({result: state.result,searchVars: state.searchVars}),
  actionCreators
)(ServiceInfo);
