import { callAxiosWebService } from '../common/helpers/helpers';
import { GET_CUSTOMERS, SET_CUSTOMER } from '../common/constants/type';
import { callGetWebService } from '../common/helpers/helpers';

const cxp = require('../../resources/stubs/config.json').cxp;
const APP_KEY = cxp.AppKey;
const URL = cxp.searchCustomer;
const header = {
    'AppID': 'MPOS',
    'AppKey': APP_KEY
}

export function getCustomers(query, associatePin) {

    const params = `?version=v2&q=${query}&offset=0&limit=500&associatePin=${associatePin}`;
    const customersApi = URL + params;
    const customersApiCall = callAxiosWebService({ method: 'get', url: customersApi, headers: header });

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
            payload: { ...custObj }
        });
    };
}

export function setClienteled(flag) {

    return (dispatch) => {
        dispatch({
            type: "SET_CLIENTELED",
            payload: { flag }
        });
    };
}

export function custIncircleInfoRequest(cssId) {
    const params ="?version=v1&id=" + cssId;
    const URL = cxp.getInCircleLevel + params;
    const request = callGetWebService(URL, {
        headers: {
            'AppKey': APP_KEY,
            'AppID': 'MPOS',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
    });
    return (dispatch) => {
        request.then(({ data }) => {
            switch (data.code) {
                case 200:
                    {
                        dispatch({ type: 'CUST_INCIRCLE_INFO', payload: data });
                        break;
                    }
                default:
                    {
                        dispatch({ type: 'CUST_INCIRCLE_ERROR', payload: data });
                        break;
                    }
            }
        }).catch(error => {
            dispatch({type: 'CUST_INCIRCLE_ERROR', payload: error});
        });
    };
}
export function setSearchItemAction(searchData){
    
    return (dispatch) => {
        dispatch({
            type: "SET_SEARCHITEM_DATA",
            payload:searchData
        });
    };
}
export function clearCustomerDataAction(){
    console.log('clear search data')
    return (dispatch) => {
        dispatch({
            type: "CLEAR_SEARCH_DATA",
            payload:{}
        });
    };
}

export function sendCustomerDetailsToAddCustomerAction(customerDetails) {
    return (dispatch) => {
        dispatch({
            type: "AUTO_POPULATE_FN_LN_ADD_CUSTOMER",
            payload: {
                data : customerDetails
            }
        });
    };
}

