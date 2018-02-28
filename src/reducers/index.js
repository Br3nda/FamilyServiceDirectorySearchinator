let defaultState = {
  filter: [],
  results: [],
  category: '',
  keyword: '',
  addresses: []
};

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
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
      keyword: action.keyword
    };
  case 'FETCH_ADDRESSES':
    return {
      ...state,
      addresses: action.addresses
    };
  default:
    return {
      ...state
    };
  }
};

export default mainReducer;
