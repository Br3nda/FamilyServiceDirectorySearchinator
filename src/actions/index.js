import axios from 'axios';
import geolib from 'geolib';

const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
const API_PATH = process.env.REACT_APP_API_PATH;

let filters = category => category ? `&filters={"LEVEL_1_CATEGORY":"${category}"}` : '';
let q = keyword => keyword.length > 2 ? keyword : '';
const FIELDS = 'LEVEL_1_CATEGORY,FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS,PROVIDER_WEBSITE_1';

export function loadFilters(){
  let sql = encodeURI(`SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${RESOURCE_ID}" GROUP BY name ORDER BY name`);
  let url = `${API_PATH}datastore_search_sql?sql=${sql}`;
  return (dispatch) => {
    return axios.get(url).then((response)=>{
      dispatch(showFilters(response.data.result.records));
    });
  };
}

export function loadResults(category, keyword, addressLatLng, radius = 50000) {
  let url = encodeURI(`${API_PATH}datastore_search?resource_id=${RESOURCE_ID}&fields=${FIELDS}&q=${q(keyword)}&distinct=true${filters(category)}`);
  let addressObj = Object.keys(addressLatLng ? addressLatLng : {none: 'none'});
  return (dispatch) => {
    dispatch(loadingResults(true));

    return axios.get(url).then((response)=>{
      dispatch(loadingResults(false));
      if(addressObj.length === 2 && addressLatLng !== undefined) {
        //greater than 50000 means 100000 of within 50000
        dispatch(showResults(findNearMe(response.data.result.records, addressLatLng, ((radius > 50000)?100000:radius)), category, keyword, addressLatLng, radius));
      } else {
        dispatch(showResults(checkLatLng(response.data.result.records), category, keyword, addressLatLng, radius));
      }
    });
  };
}

function checkLatLng(data) {
  return data.filter(r => r.PHYSICAL_ADDRESS.match(/\d+/g) !== null && r.LATITUDE !== '0' && r.LONGITUDE !== '0' && r.LATITUDE !== null && r.LONGITUDE !== null);
}

function findNearMe(data, addressLatLng, radius) {
  let filteredData = checkLatLng(data);
  for(let i in filteredData) {
    let isInside = geolib.isPointInCircle(
      {latitude: addressLatLng.latitude, longitude: addressLatLng.longitude},
      {latitude: filteredData[i].LATITUDE, longitude: filteredData[i].LONGITUDE},
      radius
    ); // 25km radius
    let distance = geolib.getDistance(
      {latitude: addressLatLng.latitude, longitude: addressLatLng.longitude},
      {latitude: filteredData[i].LATITUDE, longitude: filteredData[i].LONGITUDE}
    );
    filteredData[i].NEARME = isInside;
    filteredData[i].DISTANCE = distance;
  }
  return filteredData.filter(r => r.NEARME === true);
}

export function showFilters(filters){
  return {
    type: 'SHOW_FILTERS',
    filters
  };
}

export function showResults(results, category, keyword, addressLatLng, radius) {
  return {
    type: 'SHOW_RESULTS',
    results,
    category,
    keyword,
    addressLatLng,
    radius
  };
}

export function loadingResults(bool) {
  return {
    type: 'LOAD_RESULTS',
    loading: bool
  };
}


