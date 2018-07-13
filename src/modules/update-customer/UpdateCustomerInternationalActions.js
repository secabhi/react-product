import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import stub from '../../resources/stubs/salutationList.json'
/* To get the country list for customer - International */
const env = require('../../settings/env.js');
const path = env.PATH;
export function getCountryList() {

    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.initServiceURL;
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
    var URL = CONFIG_FILE.apiAddressAdd;
    var functionalityId = CONFIG_FILE.updateCustomerFuncID;
    var params = updateCustDomData;
    const apiAddressAddURL = path+'apiAddressAdd.json';

    var body = {
        "FunctionalityId" : functionalityId,
        "RequestParams" : params
    }
    const request =  env.ENV_MODE=='dev1'?callPostWebService(URL, body):callGetWebService(apiAddressAddURL, {});
    return (dispatch) => {
        request.then(({
                data
            }) => {
                console.log('data',data.Output.Response_Code);
                switch (data.Output.Response_Code) {

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
                                type: 'CS_INVALID_EMAIL',
                                payload: data
                            });
                            break;
                        }
                    case "CS_GENERALERROR":

                        {
                            dispatch({
                                type: 'CS_GENERALERROR',
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

                    case "CS_INVALIDPHONE":
                        {
                            dispatch({
                                type: 'CS__INVALID_PHONE',
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
                                type: 'CS__INVALID_ZIP',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDSTATE":
                        {
                            dispatch({
                                type: 'CS__INVALID_STATE',
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
                                type: 'CS__BAD_REPLY',
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