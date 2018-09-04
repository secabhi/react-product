import { callAxiosWebService } from '../../common/helpers/helpers';
import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import { startSpinner } from '../../common/loading/spinnerAction';

import { CS_SUCCESS, CS_GENERALERROR, CS_INVALIDEMAIL, CS_CUSTNOTFOUND, CS_MISSINGDETAILS, CS_INVALIDASSOCIATE, CS_FAI, CS_INVALIDZIP, CS_RECORDNOTUPDATED, CS_COUNTRYCODEMISSING, UPDATE_CUST_SUCCESS, UPDATE_CUST_GENERAL_ERROR, UPDATE_CUST_MISSING_DETAILS, UPDATE_CUST_RECORD_NOT_UPDATED, VIEW_EDIT_CUST_FAILURE, VIEW_EDIT_CUST_INVALID_EMAIL } from '../../common/constants/type';

import {viewEditCustomerResponseObj} from '../../common/responseValidator/responseDictionary.js';
import {responseValidation} from '../../common/responseValidator/responseValidation.js';

const env = require('../../../settings/env.js');
const path = env.PATH;
/* To add customer - Domestic */
export function viewCustomerAction(updateCustDomData) {
    const CONFIG_FILE = require('../../../resources/stubs/config.json');
     var URL = CONFIG_FILE.apiAddressUpdate;

     const apiAddressUpdate = path+'apiAddressAdd.json';

    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, updateCustDomData):callGetWebService(apiAddressUpdate, {});

    var validate = {
        isValid : false,
        message : ''
    }

    return (dispatch) => {
        request.then(({
                data
            }) => {

                validate = responseValidation(data, viewEditCustomerResponseObj)
            if(validate.isValid){
                switch (data.response_text) {

                    case CS_SUCCESS:
                    {
                        dispatch({
                            type: UPDATE_CUST_SUCCESS,
                            payload: { data: data, ClienteleUpdateFlag: updateCustDomData.ClienteleUpdateFlag }
                        });
                        dispatch(startSpinner(false));
                        break;
                    }
                    case CS_GENERALERROR:
                    
                        {
                            dispatch({
                                type: UPDATE_CUST_GENERAL_ERROR,
                                payload: data
                            });
                            break;
                        }

                    case CS_MISSINGDETAILS:
                        {
                            dispatch({
                                type: VIEW_EDIT_CUST_FAILURE,
                                payload: data
                            });
                            break;
                        }

                    case CS_RECORDNOTUPDATED:
                        {
                            dispatch({
                                type: VIEW_EDIT_CUST_FAILURE,
                                payload: data
                            });
                            break;
                        }
                    case CS_INVALIDEMAIL:
                    {
                        dispatch({
                            type: VIEW_EDIT_CUST_INVALID_EMAIL,
                            payload: data
                        });
                        dispatch(startSpinner(false));
                        break;
                    } 

                    case CS_MISSINGDETAILS:
                    {
                        dispatch({
                            type: VIEW_EDIT_CUST_FAILURE,
                            payload: data
                        });
                        dispatch(startSpinner(false));
                        break;
                    } 

                    case CS_INVALIDASSOCIATE:
                    {
                        dispatch({
                            type: VIEW_EDIT_CUST_FAILURE,
                            payload: data
                        });
                        dispatch(startSpinner(false));
                        break;
                    } 

                    case CS_FAI:
                    {
                        dispatch({
                            type: VIEW_EDIT_CUST_FAILURE,
                            payload: data
                        });
                        dispatch(startSpinner(false));
                        break;
                    } 

                    case CS_INVALIDZIP:
                    {
                        dispatch({
                            type: VIEW_EDIT_CUST_FAILURE,
                            payload: data
                        });
                        dispatch(startSpinner(false));
                        break;
                    } 
                    
                    default:
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DEFAULT',
                                payload: data
                            });
                            break;
                        }
                }
            }else{
                var errorMessage = validate.message
                dispatch({
                    type: 'VIEW_EDIT_CUST_VALIDFAILURE',
                    payload: {},
                    message: errorMessage
                })
            }
            })
            .catch(error => {
                dispatch({
                    type: 'UPDATE_CUST_REQUEST_FAIL',
                    payload: error
                });
            });
    };
}
// export function getStoreClientIdUpdateAction(updateCustDomData) {
//     const CONFIG_FILE = require('../../../resources/stubs/config.json');
//      var URL = CONFIG_FILE.apiVerifySaleCustomer;

//      const apiVerifySaleCustomer = path+'apiAddressAdd.json';


//     const request = env.ENV_MODE=='dev1'?callPostWebService(URL, updateCustDomData):callGetWebService(apiVerifySaleCustomer, {});
//     return (dispatch) => {
//         request.then(({
//                 data
//             }) => {
//                 switch (data.response_code) {

//                     case 0:
//                         {
//                             dispatch({type: 'STORE_CLIENT_REQ_SUCCESS', payload: data})
//                             dispatch(startSpinner(false));
//                         }
                                              
//                     default:
//                         {
//                             dispatch({
//                                 type: 'UPDATE_CUST_DEFAULT',
//                                 payload: data
//                             });
//                             dispatch(startSpinner(false));
//                             break;
//                         }
//                 }
//             })
//             .catch(error => {
//                 dispatch({
//                     type: 'UPDATE_CUST_REQUEST_FAIL',
//                     payload: error
//                 });
//             });
//     };
//     return (dispatch) => dispatch({type: 'GET_STORECLIENTID_SENT'})
// }

export function getCountryList() {
    const CONFIG_FILE = require('../../../resources/stubs/config.json');
    var URL = CONFIG_FILE.getCountryList;
    var functionalityId = CONFIG_FILE.countryListFuncId;
    console.log("functionalityId CountryList: " + functionalityId + " " + CONFIG_FILE.countryListFuncId)
    var params = {
        "FunctionalityId" : functionalityId
    }
    const initServiceURL = path+'initServiceURL.json';

    const request = env.ENV_MODE=='dev1'?callPostWebService(URL,params):callGetWebService(initServiceURL,{});
    return (dispatch) => {
        request.then((data) => {
            
                dispatch({
                    type: 'COUNTRY_LIST_RETRIEVED_VIEW_EDIT',
                    payload: data.data.CountryList
                });
            })
            .catch(error => {
                dispatch({
                    type: 'COUNTRY_LIST_FETCH_FAIL',
                    payload: error
                });
            });
    };
}

export function navigateToEditCustomer(data) {

    const cxp = require('../../../resources/stubs/config.json').cxp;
    const APP_KEY = cxp.AppKey;
    const header = {
        'AppID': 'MPOS',
        'AppKey': APP_KEY
    }

    const params = `?version=v1&id=${data.cssId}`;
    const customerProfileApi = cxp.getCustomerDetail + params;
    const customerProfileApiCall = callAxiosWebService({ method: 'get', url: customerProfileApi, headers: header });

    return (dispatch) => {
        customerProfileApiCall.then((data) => {
            dispatch({
                type: 'NAVIGATE_TO_EDIT_CUSTOMER',
                payload: data.data.data
            });

        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
    };
}

