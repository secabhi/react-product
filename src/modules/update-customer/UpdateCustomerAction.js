import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
const env = require('../../settings/env.js');
const path = env.PATH;


/* To add customer - Domestic */
export function updateCustomerAction(updateCustDomData) {


    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');


    //sets url to be used for api call
   
    var URL = CONFIG_FILE_ADD.apiAddressUpdate;
    var fnid = CONFIG_FILE_ADD.updateCustomerFuncID;
    var params = updateCustDomData ;

    const apiAddressAddURL = path+'apiAddressUpdate.json';

     var body = {
         // "FunctionalityId" : fnid,
          "RequestParams" : params
    }
      
     
    const request = env.ENV_MODE=='dev1'?callPostWebService(URL, updateCustDomData):callGetWebService(apiAddressAddURL, {});

    return (dispatch) => {
        request.then(({
                data
            }) => {
                console.log(data);
                /*
                    Response sample structure:
                    { 
                        ResCode: 5, 
                        ResCodeMsg: "CS_INVALIDEMAIL", 
                        ValidAddress: null
                    }
                */
               console.log('data.Output.Response_Code',data);
               //debugger;
               switch (data.response_text) {

                    case "CS_AV_SUCCESS":
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_SUCCESS',
                                payload: data
                            });
                            break;
                        }
                        
                    case "CS_INVALIDEMAIL":
                    
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_INVALID_EMAIL',
                                payload: data
                            });
                            break;
                        }

                    case "CS_MISSINGDETAILS":
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_MISSING_DETAILS',
                                payload: data
                            });
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

                    case "CS_INVALIDPHONE":
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_INVALID_PHONE',
                                payload: data
                            });
                            break;
                        }

                    case "CS_RECORDNOTUPDATED":
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_RECORD_NOT_UPDATED',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDZIP":
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_INVALID_ZIP',
                                payload: data
                            });
                            break;
                        }

                    case "CS_INVALIDSTATE":
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_INVALID_STATE',
                                payload: data

                            });
                        }

                    case 12:
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_ADDR_VALID_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    case "CS_AV_BAD_REPLY":
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_ADDR_BAD_REPLY',
                                payload: data
                            })
                        }

                    case "CS_COUNTRYCODEMISSING":
                        {
                            dispatch({
                                type: 'UPDATE_CUST_DOM_COUNTRY_CODE_MISSING',
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

export function navigateToEditCustomerAction(profileData){

    console.log('profileData : '+profileData)
    return (dispatch) => {
        dispatch({
            type: 'SET_CUSTOMER_PROFILE_DATA',
            payload: profileData
        });
    }
}