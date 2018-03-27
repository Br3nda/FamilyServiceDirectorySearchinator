let defaultState = {
  filter: [],
  results: [],
  category: '',
  keyword: '',
  addressLatLng: {},
  radius: 25000,
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
      category: action.category,
      keyword: action.keyword,
      addressLatLng: action.addressLatLng,
      radius: action.radius,
      hasSearched: true
    };

  default:
    return {
      ...state
    };
  }
};

export default mainReducer;
