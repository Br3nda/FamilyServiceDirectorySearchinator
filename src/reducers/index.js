let defaultState = {
  filter: [],
  results: [],
  searchVars: {
    category: '',
    keyword: '',
    address: '',
    addressLatLng: {},
    radius: 25000
  },
  serviceDetails: [],
  noSearchVars: false,
  totalResults: 0,
  itemsLoading: false,
  hasSearched: false
};

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'LOAD_RESULTS':
    return {
      ...state,
      itemsLoading: action.loading
    };
  case 'SHOW_FILTERS':
    return {
      ...state,
      filter: action.filters
    };
  case 'SHOW_RESULTS':
    return {
      ...state,
      results: action.results,
      searchVars: action.searchVars,
      noSearchVars: action.noSearchVars,
      totalResults: action.totalResults,
      hasSearched: true,
      itemsLoading: false
    };
  case 'SHOW_SERVICE':
    return {
      ...state,
      results: action.results,
      itemsLoading: false
    };
  case 'SHOW_SERVICE_DETAILS':
    return {
      ...state,
      serviceDetails: action.serviceDetails
    };
  case 'CHANGE_CATEGORIES':
    return {
      ...state,
      searchVars: action.searchVars
    };
  default:
    return {
      ...state
    };
  }
};

export default mainReducer;
