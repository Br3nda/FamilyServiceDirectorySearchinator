import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/ServiceDetail.css';
import ServiceContactDetail from './ServiceContactDetail';
import ServiceCategories from './ServiceCategories';
import ServiceDetailDesc from './ServiceDetailDesc';

class ServiceDetail extends Component {

  constructor() {
    super();
    this.state = {
      services: [],
      categories: [],
      records: [],
      recordsLoaded: false,
      category: '',
      loading: false
    };
    this.loadServiceDetails = this.loadServiceDetails.bind(this);
    this.displayServiceDetails = this.displayServiceDetails.bind(this);
  }

  filters(category){
    return category ? `&filters={"LEVEL_1_CATEGORY":"${category}"}` : '';
  }

  loadServiceDetails(serviceId){
    if(!this.state.recordsLoaded){
      this.setState({loading: true, category: this.props.searchVars.category});
      const FIELDS = 'LEVEL_1_CATEGORY,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';
      let urldetails = encodeURI(`${process.env.REACT_APP_API_PATH}datastore_search?resource_id=${process.env.REACT_APP_API_RESOURCE_ID}&fields=${FIELDS}&q=${serviceId}&distinct=true`);
      return axios.get(urldetails).then((response)=>{
        if (this.refs.myRef) this.setState({records: response.data.result.records, recordsLoaded: true});
        this.displayServiceDetails(this.props.searchVars.category);
      });
    }
  }

  displayServiceDetails(category){
    let currentCategory = category;
    if(this.state.records.length > 0){
      let uniqueServices = [],unique = {},uniquecategories = [];
      this.state.records.forEach(function(item) {
        if(!uniquecategories.includes(item.LEVEL_1_CATEGORY)){
          uniquecategories.push(item.LEVEL_1_CATEGORY);
        }
        if (!unique[item.SERVICE_NAME]) {
          if(item.LEVEL_1_CATEGORY === currentCategory)  uniqueServices.push(item);
          unique[item.SERVICE_NAME] = item;
        }
      });
      const clone = {...this.props.searchVars};
      clone.category = currentCategory;
      this.props.changeCategory(clone);
      this.setState({services:uniqueServices, loading: false, categories :uniquecategories, category: currentCategory});
    }
  }

  componentDidMount () {
    if(this.props.serviceId) this.loadServiceDetails(this.props.serviceId);
  }

  render() {
    return (
      <div className="service-details" ref="myRef">
        <ServiceContactDetail phone={this.props.results.PUBLISHED_PHONE_1} email={this.props.results.PUBLISHED_CONTACT_EMAIL_1} hours={this.props.results.PROVIDER_CONTACT_AVAILABILITY} website={this.props.results.PROVIDER_WEBSITE_1}/>
        <div className={(this.props.itemsLoading ? ' loading' : '')}>
          <ServiceCategories displayServiceDetails={this.displayServiceDetails} category={this.state.category} categories={this.state.categories} serviceId={this.props.results.FSD_ID} />
          {this.props.loadimmediately && <ServiceDetailDesc services={this.state.services} />}
        </div>
        {!this.props.loadimmediately && <Link className="more-detail" title="more detail" to={`/service/${this.props.results.FSD_ID}/${encodeURIComponent(this.state.category)}`}>more details...</Link>}
      </div>
    );

  }
}

export default ServiceDetail;
