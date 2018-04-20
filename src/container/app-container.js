import React, { Component } from 'react';
import App from '../components/App';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

class AppCon extends Component {

  render() {
    return (
      <div>
        <p className="container-fluid">If you are using a mobile device and are looking for family support services near you then you can use Find Whānau Support, the mobile responsive site for the Ministry of Social Development’s Family Services Directory.</p>
        <p className="container-fluid">If you are a provider or want to use the enhanced functions then please visit <a href="https://www.familyservices.govt.nz/directory">Family Services Directory</a>.</p>

        <App filters={this.props.loadFilters} startCategory={decodeURIComponent(this.props.match.params.category)} />
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state;
};

export default connect (mapStateToProps, actionCreators)(AppCon);
