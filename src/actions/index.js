import axios from 'axios';

const resourceId = '35de6bf8-b254-4025-89f5-da9eb6adf9a0';

export function loadFilters(field){
  let sql = encodeURI(`SELECT "LEVEL_1_CATEGORY" as name, COUNT(*) as num FROM "${resourceId}" GROUP BY name ORDER BY name`);
  let url = `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=${sql}`;
  return (dispatch) => {
    
    return axios.get(url).then((response)=>{
      dispatch(showFilters(response.data.result.records));
    });
  }
}

const fields = ()=> {
  return 'FSD_ID,LONGITUDE,LATITUDE,PROVIDER_NAME,PUBLISHED_CONTACT_EMAIL_1,PUBLISHED_PHONE_1,PROVIDER_CONTACT_AVAILABILITY,ORGANISATION_PURPOSE,PHYSICAL_ADDRESS,SERVICE_NAME,SERVICE_DETAIL,DELIVERY_METHODS,COST_TYPE,SERVICE_REFERRALS';
}

export function loadResults(name) {
  let url = 'https://catalogue.data.govt.nz/api/3/action/datastore_search?';
  let query = `resource_id=${resourceId}&q=${name}&fields=${fields()}&distinct=true&filters=LEVEL_1_CATEGORY`;
  axios.get(`${url}${query}`)
    .then(res => {
      debugger;
    });
}


export function showFilters(filters){
   debugger;
  return {
    type: 'SHOW_FILTERS',
    filters: filters
  }
}
