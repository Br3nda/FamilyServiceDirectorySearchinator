import axios from 'axios';

const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
const API_PATH = process.env.REACT_APP_API_PATH;

let filters = category => category ? `{"LEVEL_1_CATEGORY":"${category}"}` : '';
let q = keyword => keyword.length > 2 ? keyword : '';
const FIELDS = 'LEVEL_1_CATEGORY,FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';

export function loadFilters(){
  let sql = encodeURI(`SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${RESOURCE_ID}" GROUP BY name ORDER BY name`);
  let url = `${API_PATH}datastore_search_sql?sql=${sql}`;
  return (dispatch) => {
    return axios.get(url).then((response)=>{
      dispatch(showFilters(response.data.result.records));
    });
  };
}

export function loadResults(category, keyword) {
  let url = encodeURI(`${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${FIELDS}&q=${q(keyword)}&distinct=true&filters=${filters(category)}`);
  return (dispatch) => {
    return axios.get(url).then((response)=>{
      dispatch(showResults(response.data.result.records, category, keyword));
    });
  };
}

export function fetchAddressFinder(address, pxid) {
  let key = 'ADDRESSFINDER_DEMO_KEY';
  let url = 'https://api.addressfinder.io/api/nz/address?';
  let query = `format=json&key=${key}&q=${address}&pxid=${pxid}`;
  return (dispatch) => {
    return axios.get(`${url}${query}`).then((response)=>{
      dispatch(fetchAddresses(response.data.completions));
    });
  }
}

export function showFilters(filters){
  return {
    type: 'SHOW_FILTERS',
    filters
  }
}

export function showResults(results, category, keyword) {
  return {
    type: 'SHOW_RESULTS',
    results,
    category,
    keyword
  }
}
export function fetchAddresses(addresses) {
  return {
    type: 'FETCH_ADDRESSES',
    addresses
  }
}
