import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import MapResults from './Map/MapResults';
import AddressFinder from './Forms/AddressFinder';
import LazyLoad from 'react-lazyload';
import Filters from './Service/Filters';
import Service from '../components/Service/Service';
import Sharebar from '../components/Social/Sharebar';
import '../styles/Nav.css';
import '../styles/Form.css';
import Proximity from './Forms/Proximity';

let inputchanged = false;

class App extends Component {
  constructor() {
    super();
    this.state = {
      showMap: false,
      latlng: [],
      keyword: '',
      resultLimit: 10,
    };
    this.resultButton = this.resultButton.bind(this);
    this.resultCountButton = this.resultCountButton.bind(this);
    this.keywordBlur = this.keywordBlur.bind(this);
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.correctLatLng = this.correctLatLng.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.extendResultLimit = this.extendResultLimit.bind(this);
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  componentWillMount() {
    if (this.props.filters.length === 0) this.props.loadFilters();
    this.radiusChange = this.debounce(this.radiusChange, 200);
    this.setState({ keyword: this.props.searchVars.keyword });
  }

  resultButton() {
    if (this.props.results.length > 0) {
      return (
        <button
          className="btn-toggle"
          onClick={() => {
            this.setState({ showMap: !this.state.showMap });
          }}
        >
          {this.state.showMap ? 'Show List' : 'Toggle Map'}
        </button>
      );
    }
  }

  resultCountButton() {
    const { itemsLoading, hasSearched, noSearchVars } = this.props;

    if (!itemsLoading && hasSearched) {
      return (
        <p className="results-desc">
          {noSearchVars && <span>No search parameters supplied</span>}
          {!noSearchVars && this.resultCountButtonText()}
          {!noSearchVars && this.resultButton()}
        </p>
      );
    }
  }

  resultCountButtonText() {
    const { results, totalResults } = this.props;
    const { resultLimit } = this.state;
    let desc = `Found ${
      results.length < resultLimit ? results.length : resultLimit
    } `;
    if (totalResults && results.length === 100 && totalResults > 100) {
      desc += `of ${totalResults} `;
    }
    desc += `result${totalResults > 1 ? 's' : ''}`;
    return desc;
  }

  keywordBlur(e) {
    if (inputchanged || e.target.value === '') {
      const clone = { ...this.props.searchVars };
      clone.keyword = e.target.value;
      clone.addressLatLng = this.correctLatLng();
      this.props.loadResults(clone);
    }
  }

  onKeywordChange(value) {
    this.setState({ keyword: value });
  }

  enterPressed(e) {
    inputchanged = true;
    var code = e.keyCode || e.which;
    if (code === 13) {
      inputchanged = false;
      const clone = { ...this.props.searchVars };
      clone.keyword = e.target.value === '' ? null : e.target.value;
      clone.addressLatLng = this.correctLatLng();
      this.props.loadResults(clone);
    }
  }

  radiusChange(value) {
    const clone = { ...this.props.searchVars };
    const callback = this.props.loadResults;
    clone.radius = value * 1;
    setImmediate(function() {
      callback(clone);
    });
  }

  formSubmit(e) {
    e.preventDefault();
    this.setState({ latlng: this.props.searchVars.addressLatLng });
    const clone = { ...this.props.searchVars };
    clone.addressLatLng = this.correctLatLng();
    clone.keyword = e.target.keyword.value;
    this.props.loadResults(clone);
  }

  correctLatLng() {
    return this.props.searchVars.addressLatLng === undefined
      ? this.state.latlng
      : this.props.searchVars.addressLatLng;
  }

  resetForm() {
    this.setState({ latlng: {}, keyword: '' });
    this.props.loadResults({
      category: '',
      keyword: '',
      address: '',
      addressLatLng: {},
      radius: 50000,
    });
  }

  extendResultLimit(e) {
    e.preventDefault();
    this.setState({ resultLimit: this.state.resultLimit + 10 });
  }

  render() {
    const {
      filters,
      searchVars,
      loadResults,
      noSearchVars,
      itemsLoading,
      hasSearched,
      results,
      changeCategory,
    } = this.props;
    const { keyword, showMap, resultLimit } = this.state;

    return (
      <div className="container-fluid">
        <Filters
          filters={filters}
          searchVars={searchVars}
          loadResults={loadResults}
        />
        <form className="form" onSubmit={e => this.formSubmit(e)}>
          <input
            value={keyword}
            type="search"
            name="keyword"
            onBlur={this.keywordBlur.bind(this)}
            onKeyPress={this.enterPressed.bind(this)}
            onChange={e => this.onKeywordChange(e.target.value)}
            placeholder="Enter topic or organisation"
          />
          <AddressFinder
            noSearchVars={noSearchVars}
            loading={itemsLoading}
            loadResults={loadResults}
            searchVars={searchVars}
            radius={searchVars.radius}
          />
          {searchVars.addressLatLng &&
            Object.keys(searchVars.addressLatLng).length !== 0 && (
              <Proximity
                handler={this.radiusChange.bind(this)}
                radius={searchVars.radius}
              />
            )}
          <button type="submit">Search</button>
          {!noSearchVars && hasSearched && (
            <Route
              render={({ history, location }) => (
                <button
                  type="button"
                  onClick={() => {
                    location.pathname !== '/' && history.push('');
                    this.resetForm();
                  }}
                >
                  Reset form
                </button>
              )}
            />
          )}
        </form>
        <div className={'results' + (itemsLoading ? ' loading' : '')}>
          {this.resultCountButton()}
          {!itemsLoading && showMap && (
            <MapResults
              className="container-fluid"
              LatLng={searchVars.addressLatLng}
              map_results={results}
            />
          )}
          {!itemsLoading &&
            !showMap &&
            results.map((data, index) => {
              if (index < resultLimit) {
                return (
                  <LazyLoad height={280} key={index}>
                    <Service
                      results={data}
                      changeCategory={changeCategory}
                      searchVars={searchVars}
                      serviceId={data.FSD_ID}
                      loadResults={loadResults}
                    />
                  </LazyLoad>
                );
              }
            })}
          {results.length > resultLimit && (
            <button onClick={e => this.extendResultLimit(e)}>Show More</button>
          )}
        </div>
        <Sharebar />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const clone = { ...state.searchVars };
  if (!state.searchVars.category && ownProps.startCategory) {
    /* for some unidentified reason ownProps.startCategory is returning a string */
    clone.category =
      ownProps.startCategory === 'undefined' ? '' : ownProps.startCategory;
  }
  return {
    filters: state.filter,
    results: state.results,
    showMap: state.showMap,
    searchVars: clone,
    noSearchVars: state.noSearchVars,
    totalResults: state.totalResults,
    itemsLoading: state.itemsLoading,
    hasSearched: state.hasSearched,
  };
}

export default connect(
  mapStateToProps,
  actionCreators,
)(App);
