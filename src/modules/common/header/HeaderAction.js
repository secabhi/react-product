import { callPostWebService, callGetWebService, xml2json2, json2xml } from '../../common/helpers/helpers';

import { startSpinner } from '../../common/loading/spinnerAction'; 




export function testAction(){

    return (dispatch) => { 
        dispatch({
            type: 'ONE',
            payload: {value : 'TEST'}
        });
    };
}
export function suspendAction(regsterNumber,userpin,transactionNumber){
   console.log("userpin isss",userpin)
    const CONFIG_FILE_ADD = require('../../../resources/stubs/config.json');
    const clientConfig = CONFIG_FILE_ADD.clientConfig;

    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.suspendApi;
     const params = {
                 ...clientConfig,
                 "TransactionId":transactionNumber,
                 "register_no":regsterNumber,
       }
              
     
    const request = callPostWebService(URL,params);
    return (dispatch) => {
        
        request.then(({
                data
            }) => {
               switch (data.response_text) {

                    case "SP_SUCCESS":
                        {
                            dispatch({
                                type: 'SUSPEND_TRANSACTION_SUCCESS',
                                payload: data
                            });
                            break;
                        }
                        case "SP_INVALIDREQUEST":
                        {
                            dispatch({
                                type: 'SUSPEND_TRANSACTION_INVALIDREQUEST',
                                payload: data
                            });
                            break;
                        }
                        case "SP_VALIDATIONFAILED":
                        {
                            dispatch({
                                type: 'SUSPEND_VALIDATIONFAILED',
                                payload: data
                            });
                            break;
                        }
                        
                    default:
                        {
                            dispatch({
                                type: 'SUSPEND_TRANSACTION_DEFAULT',
                                payload: data
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: 'SP_GENERALERROR',
                    payload: error
                });
            });
    };
}

export function clearPED() {
    console.log("HeaderAction : Clearing PED");
    this.bypassJson = require("../../../resources/aurus/BypassScreen.json");
    var xml=json2xml(this.bypassJson)
        try {
            if (window.aurusplugin) {
                const request = new Promise((res, rej) => {
                    window.aurusplugin.callAurus(xml, res, rej)
    
                })
    
                //goes to thunk to handle listening for resolve   
                return (dispatch) => {
                    request
                        .then((data) => {
    
                            const aurusresponse = xml2json2(data);
                            return dispatch({ type: 'CLEAR_PED', payload: aurusresponse })
                        }
                        ).catch((err) => {
                            return { type: 'AURUS_FAILURE_RESPONSE', payload: err }
                        })
                }
            }
            else {
                return { type: 'NO_AURUS_PLUGIN' }
            };
        }
        catch (err) {
            console.log('catch block: ', err);
        }
    }

export  function callVoidTransaction(transaId){

const CONFIG_FILE_ADD = require('../../../resources/stubs/config.json');
    //sets url to be used for api call
       const URL = CONFIG_FILE_ADD.voidTransaction;
       const clientConfigForVoid=CONFIG_FILE_ADD.clientConfig
     const params = {
        ...clientConfigForVoid,
        "TransactionId":transaId
        }
    const request = callPostWebService(URL,params);
    return (dispatch) => {
       
        request.then(({
                data
            }) => {
               switch (data.response_text) {

                    case "AC_SUCCESS":
                        {
                            dispatch({
                                type: 'VOID_TRANC_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'VOID_TRANS_FAILURE',
                                payload: data
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: 'VOID_TRANS_FAILURE',
                    payload: error
                });
            });
    };
}
