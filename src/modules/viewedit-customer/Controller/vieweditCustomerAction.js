import { callAxiosWebService } from '../../common/helpers/helpers';
import { callPostWebService, callGetWebService } from '../../common/helpers/helpers';
import { startSpinner } from '../../common/loading/spinnerAction';
const env = require('../../../settings/env.js');
const path = env.PATH;
/* To add customer - Domestic */
export function viewCustomerAction(updateCustDomData) {
    const CONFIG_FILE = require('../../../resources/stubs/config.json');
     var URL = CONFIG_FILE.apiVerifySaleCustomer;

     const apiVerifySaleCustomer = path+'apiAddressAdd.json';


    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, updateCustDomData):callGetWebService(apiVerifySaleCustomer, {});
    return (dispatch) => {
        request.then(({
                data
            }) => {
                switch (JSON.parse(data.response_code)) {

                    case 0:
                    {
                        dispatch({
                            type: 'UPDATE_CUST_SUCCESS',
                            payload: { data: data, ClienteleUpdateFlag: updateCustDomData.ClienteleUpdateFlag }
                        });
                        dispatch(startSpinner(false));
                        break;
                    }
                    case 1:
                    
                        {
                            dispatch({
                                type: 'UPDATE_CUST_GENERAL_ERROR',
                                payload: data
                            });
                            break;
                        }

                    case 2:
                        {
                            dispatch({
                                type: 'UPDATE_CUST_MISSING_DETAILS',
                                payload: data
                            });
                            break;
                        }

                    case 3:
                
                        {
                            dispatch({
                                type: 'UPDATE_CUST_RECORD_NOT_ADDED',
                                payload: data
                            });
                            break;
                        }

                    case 4:
                        {
                            dispatch({
                                type: 'UPDATE_CUST_RECORD_NOT_UPDATED',
                                payload: data
                            });
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
    var URL = CONFIG_FILE.initServiceURL;
    var functionalityId = CONFIG_FILE.countryListFuncId;
    console.log("functionalityId CountryList: " + functionalityId + " " + CONFIG_FILE.countryListFuncId)
    var params = {
        "FunctionalityId" : functionalityId
    }
    const initServiceURL = path+'initServiceURL.json';

    const request = env.ENV_MODE=='dev1'?callPostWebService(URL,params):callGetWebService(initServiceURL,{});
    console.log("for getcountry list dev mode");
    return (dispatch) => {
        request.then((data) => {
                console.log("Country List Response Data: ", data.data.Output.CountryList);
                dispatch({
                    type: 'COUNTRY_LIST_RETRIEVED_VIEW_EDIT',
                    payload: data.data.Output.CountryList
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

