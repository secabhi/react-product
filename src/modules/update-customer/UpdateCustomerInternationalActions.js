import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import stub from '../../resources/stubs/salutationList.json'
import { startSpinner } from '../common/loading/spinnerAction';
/* To get the country list for customer - International */
const env = require('../../settings/env.js');
const path = env.PATH;
export function getCountryList() {

    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.getCountryList;
    var functionalityId = CONFIG_FILE.countryListFuncId;
    var params = {
        "FunctionalityId" : functionalityId
    }
    const initServiceURL = path+'initServiceURL.json';


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

/* To call the final update service for - International */

export function updateInternationalApi(updateCustDomData) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.apiAddressUpdate;
    var functionalityId = CONFIG_FILE.updateCustomerFuncID;
    var params = updateCustDomData;
    const apiAddressAddURL = path+'apiAddressUpdate.json';

    var body = {
        "FunctionalityId" : functionalityId,
        "RequestParams" : params
    }
    const request =  env.ENV_MODE=='dev1'?callPostWebService(URL, updateCustDomData):callGetWebService(apiAddressAddURL, {});
    return (dispatch) => {
        request.then(({
                data
            }) => {
                console.log('data',data.response_text);
                switch (data.response_text) {

                    case "CS_SUCCESS":
                        {
                            dispatch({
                                type: 'CS_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDEMAIL":

                        {
                            dispatch({
                                type: 'UPDATE_INT_CUST_DOM_INVALID_EMAIL',
                                payload: data
                            });
                            dispatch(startSpinner(false));
                            break;
                        }
                    case "CS_GENERALERROR":

                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_GENERAL_ERROR',
                                payload: data
                            });
                            break;
                        }
                    case "CS_MISSINGDETAILS":
                        {
                            dispatch({
                                type: 'CS__MISSING_DETAILS',
                                payload: data
                            });
                            break;
                        }
                    case 4:
                        {
                            dispatch({
                                type: 'CS__MISSING1_DETAILS',
                                payload: data
                            });
                            break;
                        }

                        case 1:
                        {
                            dispatch({
                                type: 'UPDATE_INT_CUST_EMAIL_OR_ADDR',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDPHONE":
                        {
                            dispatch({
                                type: 'UPDATE_INT_CUST_DOM_INVALID_PHONE',
                                payload: data
                            });
                            break;
                        }

                    case "CS_RECORDNOTADDED":
                        {
                            dispatch({
                                type: 'CS__RECORD_NOT_UPDATED',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDZIP":
                        {
                            dispatch({
                                type: 'UPDATE_INT_CUST_DOM_INVALID_ZIP',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDSTATE":
                        {
                            dispatch({
                                type: 'UPDATE_INT_CUST_DOM_INVALID_STATE',
                                payload: data

                            });
                        }

                    case 12:
                        {
                            dispatch({
                                type: 'CS__ADDR_VALID_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    case "CS_AV_BAD_REPLY":
                        {
                            dispatch({
                                type: 'UPDATE_INT_CUST_AV_BAD_REPLY',
                                payload: data
                            })
                        }

                    case "CS_COUNTRYCODEMISSING":
                        {
                            dispatch({
                                type: 'CS_COUNTRYCODEMISSING',
                                payload: data
                            })
                        }

                    default:
                        {
                            console.log("Inside Switch Block: default");
                            dispatch({
                                type: 'UPDATE_CUST_DOM_DEFAULT',
                                payload: data
                            });
                            break;
                        }
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

export function navigateToEditCustomerIntAction(profileData){
    console.log('profileData international: '+profileData)
    return (dispatch) => {
        dispatch({
            type: 'SET_CUSTOMER_PROFILE_DATA_INT',
            payload: profileData
        });
    }
}