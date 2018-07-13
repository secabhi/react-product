import { callAxiosWebService } from '../../common/helpers/helpers';
import {GET_CUSTOMERS, SET_CUSTOMER} from '../../common/constants/type';


const cxp = require('../../resources/stubs/config.json').cxp;
const APP_KEY = cxp.AppKey;
const URL = cxp.searchCustomer;
const header = {
    'AppID': 'MPOS',
    'AppKey': APP_KEY
};

export function getCustomers(query, associatePin) {

    const params =`?version=v2&q=${query}&offset=10&limit=50&associatePin=${associatePin}`;
    const customersApi = URL + params;
    const customersApiCall =  callAxiosWebService({method: 'get', url: customersApi, headers: header});

    return (dispatch) => {
        customersApiCall.then((data) => {
            dispatch({
                type: GET_CUSTOMERS,
                payload: data.data.data
            });

        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
    };

}

export function setCustomer(custObj) {

    return (dispatch) => {
        dispatch({
            type: SET_CUSTOMER,
            payload: {...custObj}
        });
    };
}

