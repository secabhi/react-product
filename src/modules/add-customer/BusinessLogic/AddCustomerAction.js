import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import { startSpinner } from '../../common/loading/spinnerAction'; 
/* To add customer - Domestic */

import {CS_SUCCESS ,CS_INVALIDEMAIL ,CS_MISSINGDETAILS ,CS_GENERALERROR ,CS_INVALIDPHONE ,CS_RECORDNOTADDED ,CS_INVALIDZIP 
        ,CS_INVALIDSTATE ,CS_AV_SUCCESS ,CS_AV_BAD_REPLY ,CS_COUNTRYCODEMISSING ,ADD_CUST_DOM_DEFAULT ,ADD_CUST_REQUEST_FAIL,ADD_CUST_RESET
        ,ADD_CUST_DOM_COUNTRY_CODE_MISSING ,ADD_CUST_DOM_ADDR_BAD_REPLY ,ADD_CUST_DOM_ADDR_VALID_SUCCESS,ADD_CUST_DOM_INVALID_STATE
        ,ADD_CUST_DOM_INVALID_ZIP,ADD_CUST_DOM_RECORD_NOT_ADDED,ADD_CUST_DOM_INVALID_PHONE,ADD_CUST_DOM_GENERAL_ERROR 
        ,ADD_CUST_DOM_MISSING_DETAILS,ADD_CUST_DOM_INVALID_EMAIL ,ADD_CUST_DOM_SUCCESS,ADD_CUST_INT_SUCCESS
        ,ADD_CUST_INT_INVALID_EMAIL,ADD_CUST_INT_MISSING_DETAILS,ADD_CUST_INT_GENERAL_ERROR
        ,ADD_CUST_INT_INVALID_PHONE,ADD_CUST_INT_RECORD_NOT_ADDED,ADD_CUST_INT_ADDR_BAD_REPLY
        ,ADD_CUST_INT_DEFAULT,ADD_CUST_COUNTRY_LIST_RETRIEVED, ADD_CUST_INT_COUNTRY_CODE_MISSING} from './constants';

export function addCustomerAction(addCustDomData) {
    const CONFIG_FILE_ADD = require('../../../resources/stubs/config.json');


//sets url to be used for api call
   
    var URL = CONFIG_FILE_ADD.apiAddressAdd;
    //var fnid = CONFIG_FILE_ADD.addCustomerFuncID;
    var params = addCustDomData ;
     var body = {
          //"FunctionalityId" : fnid,
          "RequestParams" : params
    }
      
     
    const request = callPostWebService(URL,params);

    return (dispatch) => {
        request.then(({
                data
            }) => {
            

                console.log('data',data.response_text);
                switch (data.response_text) {

                   case CS_SUCCESS:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_SUCCESS,
                                payload: data
                            });
                            dispatch(startSpinner(false));
                            break;
                        }

                    case CS_INVALIDEMAIL:

                        {
                            dispatch({
                                type: ADD_CUST_DOM_INVALID_EMAIL,
                                payload: data
                            });
                            dispatch(startSpinner(false));
                            break;
                        }

                    case CS_MISSINGDETAILS:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_MISSING_DETAILS,
                                payload: data
                            });
                            dispatch(startSpinner(false));
                            break;
                        }

                    case CS_GENERALERROR:

                        {
                            dispatch({
                                type: ADD_CUST_DOM_GENERAL_ERROR,
                                payload: data
                            });
                            dispatch(startSpinner(false));
                            break;
                        }

                    case CS_INVALIDPHONE:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_INVALID_PHONE,
                                payload: data
                            });
                            dispatch(startSpinner(false));
                            break;
                        }

                    case CS_RECORDNOTADDED:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_RECORD_NOT_ADDED,
                                payload: data
                            });
                            dispatch(startSpinner(false));
                            break;
                        }

                    case CS_INVALIDZIP:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_INVALID_ZIP,
                                payload: data
                            });
                            break;
                        }

                    case CS_INVALIDSTATE:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_INVALID_STATE,
                                payload: data

                            });
                        }

                    case CS_AV_SUCCESS:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_ADDR_VALID_SUCCESS,
                                payload: data
                            });
                            break;
                        }

                    case CS_AV_BAD_REPLY:
                        { 
                            dispatch({
                                type: ADD_CUST_DOM_ADDR_BAD_REPLY,
                                payload: data
                            })
                        }

                    case CS_COUNTRYCODEMISSING:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_COUNTRY_CODE_MISSING,
                                payload: data
                            })
                        }

                    default:
                        {
                            dispatch({
                                type: ADD_CUST_DOM_DEFAULT,
                                payload: data
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_CUST_REQUEST_FAIL,
                    payload: error
                });
            });
    };
}

export function resetAddCustomerPage() {
    return (dispatch) => {
         dispatch({
             type: ADD_CUST_RESET
         });
     };
 }

export function addCustomerIntAction(addCustIntData) {
    const CONFIG_FILE_ADD_INT = require('../../../resources/stubs/config.json');

    //sets url to be used for api call 
    var URL = CONFIG_FILE_ADD_INT.apiAddressAdd;
    //var fnid = CONFIG_FILE_ADD_INT.addCustomerFuncID;
    var params = addCustIntData ;
     var body = {
          //"FunctionalityId" : fnid,
          "RequestParams" : params
    }
     
    const request = callPostWebService(URL,params);

    return (dispatch) => {
        request.then(({
                data
            }) => {

                console.log('data',data.response_text);
                switch (data.response_text) {

                    case CS_SUCCESS:
                        {
                            dispatch({
                                type: ADD_CUST_INT_SUCCESS,
                                payload: data
                            });
                            dispatch(startSpinner(false));
                            break;
                        }

                    case CS_INVALIDEMAIL:
                        {
                            dispatch({
                                type: ADD_CUST_INT_INVALID_EMAIL,
                                payload: data
                            });
                            break;
                        }

                    case CS_MISSINGDETAILS:
                        {
                            dispatch({
                                type: ADD_CUST_INT_MISSING_DETAILS,
                                payload: data
                            });
                            break;
                        }

                    case CS_GENERALERROR:
                        {
                            dispatch({
                                type: ADD_CUST_INT_GENERAL_ERROR,
                                payload: data
                            });
                            break;
                        }

                    case CS_INVALIDPHONE:
                        {
                            dispatch({
                                type: ADD_CUST_INT_INVALID_PHONE,
                                payload: data
                            });
                            break;
                        }

                    case CS_RECORDNOTADDED:
                        {
                            dispatch({
                                type: ADD_CUST_INT_RECORD_NOT_ADDED,
                                payload: data
                            });
                            break;
                        }

                  
                    case CS_AV_BAD_REPLY:
                        {
                            dispatch({
                                type: ADD_CUST_INT_ADDR_BAD_REPLY,
                                payload: data
                            })
                        }

                    case CS_COUNTRYCODEMISSING:
                        {
                            dispatch({
                                type: ADD_CUST_INT_COUNTRY_CODE_MISSING,
                                payload: data
                            })
                        }

                    default:
                        {
                            dispatch({
                                type: ADD_CUST_INT_DEFAULT,
                                payload: data
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_CUST_REQUEST_FAIL,
                    payload: error
                });
            });
    };

}



export function getCountryList() {

    const CONFIG_FILE = require('../../../resources/stubs/config.json');

    var URL = CONFIG_FILE.initServiceURL;
    var functionalityId = CONFIG_FILE.countryListFuncId;
    var params = {
        "FunctionalityId" : functionalityId
       }
    const request = callPostWebService(URL,params);

    return (dispatch) => {
        request.then(({
                data
            }) => {
                dispatch({
                    type: ADD_CUST_COUNTRY_LIST_RETRIEVED,
                    payload: data
                });
            })
            .catch(error => {
                dispatch({
                    type: ADD_CUST_REQUEST_FAIL,
                    payload: error
                });
            });
    };
}