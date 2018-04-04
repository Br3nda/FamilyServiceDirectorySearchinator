import React, { Component } from 'react';
import App from '../components/App';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

class AppCon extends Component {

  render() {
    return (
      <div>
        <App filters={this.props.loadFilters} startCategory={decodeURIComponent(this.props.match.params.category)} />
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state;
};

export default connect (mapStateToProps, actionCreators)(AppCon);
