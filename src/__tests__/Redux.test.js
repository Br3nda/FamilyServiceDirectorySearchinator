import * as actions from '../actions/index';

describe('actions', () => {
  it('should retrieve the filters', () => {
    const filters = [{name: 'Addiction'}];
    const expectedAction = {
      type: 'SHOW_FILTERS',
      filters
    };
    expect(actions.showFilters(filters)).toEqual(expectedAction);
  });

  it('should retrieve the results', () => {
    const results = [{PHYSICAL_ADDRESS: '25 Thackeray Street, Hamilton', DELIVERY_METHODS: '', PUBLISHED_PHONE_1: '07 839 6871', FSD_ID: '6322', SERVICE_NAME: 'The Salvation Army Oasis Centre - Hamilton'}];
    const category = 'Addiction';
    const keyword = 'Health';
    const expectedAction = {
      type: 'SHOW_RESULTS',
      results,
      category,
      keyword
    };
    expect(actions.showResults(results, category, keyword)).toEqual(expectedAction);
  });

});
