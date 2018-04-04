import * as actions from '../actions/index';

describe('actions', () => {
  it('should retrieve the filters', () => {
    const filters = [{name: 'Addiction'}];
    expect(actions.showFilters(filters)).toMatchSnapshot();
  });

  it('should retrieve the results', () => {
    const results = [{PHYSICAL_ADDRESS: '25 Thackeray Street, Hamilton', DELIVERY_METHODS: '', PUBLISHED_PHONE_1: '07 839 6871', FSD_ID: '6322', SERVICE_NAME: 'The Salvation Army Oasis Centre - Hamilton'}];
    const searchVars = {
      category: 'Addiction',
      keyword: 'Health',
      addressLatLng: null,
      radius: null
    };
    expect(actions.showResults(results, searchVars, 0)).toMatchSnapshot();
  });

});