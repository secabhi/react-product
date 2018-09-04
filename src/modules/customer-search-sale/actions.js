import { callAxiosWebService } from '../common/helpers/helpers';
import { callPostWebService } from '../common/helpers/helpers';
import { GET_CUSTOMERS, SET_CUSTOMER } from '../common/constants/type';
import { callGetWebService } from '../common/helpers/helpers';

import {responseValidation} from '../common/responseValidator/responseValidation';

const cxp = require('../../resources/stubs/config.json').cxp;
const APP_KEY = cxp.AppKey;
const URL = cxp.searchCustomer;

const config = require('../../resources/stubs/config.json');
const clientConfig= config.clientConfig;

const env = require('../../settings/env.js');
const path = env.PATH;

const header = {
    'AppID': 'MPOS',
    'AppKey': APP_KEY
}

// Get customers from store server 
export function getCustomers(query, associatePin) {

    const body = {
        ...clientConfig,            
        "storeAssoc": associatePin,
        "searchKey":query
    };
    const customerSearchApiCall = config.customerSearchAPI;
    const customerSearchApi = path+'customerSearchApi.json';
    const request = env.ENV_MODE=='dev1'?callPostWebService(customerSearchApiCall, body):callGetWebService(customerSearchApi, {});


    //as part of error handling
    const customSearchResponseObj = require('../common/responseValidator/responseDictionary').customerSearchObj;
    var validate = {isValid : false,
                    message :''}
    //as part of error handling

    return (dispatch) => {
        request.then((data) => {
           // debugger;
             // added for response validation
            validate = responseValidation(data.data,customSearchResponseObj);  
            if(validate.isValid){       
            switch (data.data.response_text) {

                case "CS_SUCCESS":
                {
                    dispatch({
                        type: GET_CUSTOMERS,
                        payload: data.data
                    });
                    break;
                }
                case "CS_CUSTNOTFOUND":
                {
                    console.log("Inside Switch Block: custnotfound",data.response_text);
                    dispatch({
                        type: "CS_CUSTNOTFOUND",
                        payload: data.data
                    });
                    break;
                }
                case "CS_GENERALERROR":{
                    console.log("Inside Switch Block: custnotfound",data.response_text);
                    dispatch({
                        type: "CUSTOMSEARCH_REQUEST_VALIDFAILED",
                        payload: data.data
                    });
                    break;
                }

                default:
                {
                    console.log("Inside Switch Block: default",data.response_text);
                    dispatch({
                        type: 'DEFAULT'
                    });
                    break;
                }
                    
            }
        }
        else{
            var errorMessage = validate.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
            dispatch({
                type: 'CUSTOMSEARCH_REQUEST_VALIDFAILED',
                payload: {  },
                message : errorMessage
            });
        }
        }).catch((err) => {
            console.log(`Error: ${err}`);
            dispatch({
                type: 'CUSTOMSEARCH_REQUEST_VALIDFAILED',
                payload: {  },
                message : 'Exception occured during webservice call '+ customerSearchApiCall
            });
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

export function setClienteled(iclienteld) {
    return (dispatch) => {
        dispatch({
            type: "SET_CLIENTELED",
            payload : iclienteld 
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

