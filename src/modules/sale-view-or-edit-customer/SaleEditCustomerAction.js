import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
const env = require('../../settings/env.js');
const path = env.PATH;

export function getCountryList() {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    const initServiceURL = path+'initServiceURL.json';

    var URL = CONFIG_FILE.initServiceURL;
    var functionalityId = CONFIG_FILE.countryListFuncId;
    var params = {
        "FunctionalityId" : functionalityId
    }
    
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL,params):callGetWebService(initServiceURL,{});
    return (dispatch) => {
        request.then(({
                data
            }) => {
                dispatch({
                    type: 'COUNTRY_LIST_RETRIEVED',
                    payload: data
                });
            })
            .catch(error => {
                dispatch({
                    type: 'ADD_CUST_REQUEST_FAIL',
                    payload: error
                });
            });
    };
}




/* To Sale edit customer*/

export function saleEditCustomerAction(updateCustDomData,userType) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.apiAddressAdd;
    var updateFuncId = CONFIG_FILE.updateCustomerFuncID;

    const apiAddressAddURL = path+'apiAddressAdd.json';


    var body={
        "FunctionalityId": updateFuncId,
        "RequestParams": updateCustDomData
    }
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(apiAddressAddURL, {});

    return (dispatch) => {
        request.then(({
                data
            }) => {

                switch (data.Output.Response_Code) {

                    case "CS_SUCCESS":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_SUCCESS',
                                payload: data
                            });
                            break;
                        }
                        
                    case "CS_INVALIDEMAIL":
                    
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_INVALID_EMAIL',
                                payload: data
                            });
                            break;
                        }

                    case "CS_MISSINGDETAILS":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_MISSING_DETAILS',
                                payload: data
                            });
                            break;
                        }

                    case "CS_GENERALERROR":
                
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_GENERAL_ERROR',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDPHONE":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_INVALID_PHONE',
                                payload: data
                            });
                            break;
                        }

                    case "CS_RECORDNOTADDED":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_RECORD_NOT_UPDATED',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDZIP":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_INVALID_ZIP',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDSTATE":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_INVALID_STATE',
                                payload: data

                            });
                        }

                    case "CS_AV_SUCCESS":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_ADDR_VALID_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    case "CS_AV_BAD_REPLY":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_ADDR_BAD_REPLY',
                                payload: data
                            })
                        }

                    case "CS_COUNTRYCODEMISSING":
                        {
                            dispatch({
                                type: 'SALE_EDIT_CUST_COUNTRY_CODE_MISSING',
                                payload: data
                            })
                        }

                    default:
                        {
                            console.log("Inside Switch Block: default");
                            dispatch({
                                type: 'SALE_EDIT_CUST_DEFAULT',
                                payload: data
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: 'SALE_EDIT_CUST_REQUEST_FAIL',
                    payload: error
                });
            });
    };
}