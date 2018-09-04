import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import {RENDER_POST_VOID_CART} from '../common/constants/type';
import {responseValidation} from '../common/responseValidator/responseValidation';

const CONFIG_FILE = require('../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;
const env = require('../../settings/env.js');
const path = env.PATH;
const resendObj = require('../common/responseValidator/responseDictionary').resendObj;
const rePrintObj = require('../common/responseValidator/responseDictionary').rePrintObj;
const transListObj = require('../common/responseValidator/responseDictionary').transListObj;
const transDetailsObj = require('../common/responseValidator/responseDictionary').transDetailsObj;
    var validate = {isValid : false,
        message :''}

/* To add customer - Domestic */
export function sendEmail(customerDetails) {
    var URL = CONFIG_FILE.emailReceipt
    var params = customerDetails;
    const request = callPostWebService(URL, params);
    console.log(params)
    return (dispatch) => {
        request.then(({data}) => {
            validate = responseValidation(data,resendObj);
            console.log(data)
            if(validate.isValid)
            {
                switch (data.responseCode) {

                        case "0":
                            {
                                dispatch({type: 'UPDATE_CLIENT_DETAILS', payload: data});
                                break;
                            }

                        case "1":
                            {
                                dispatch({type: 'FAILURE', payload: data});
                                break;
                            }

                        default:
                            {
                                console.log("Inside Switch Block: default");
                                dispatch({type: 'DEFAULT', payload: data});
                                break;
                            }
                    }
            }
            else{
                var errorMessage = validate.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
                dispatch({
                    type: 'SEND_EMAIL_VALIDFAILED',
                    payload: {  },
                    message : errorMessage
                });
            }

        }).catch(error => {
            dispatch({
                type: 'SEND_EMAIL_VALIDFAILED',
                payload: {  },
                message : 'Exception occured during webservice call '+ URL
            });
        });
    };
}

export function printReceipt(data) {
    var params = data;
    var URL = CONFIG_FILE.printReceipt
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        
        request.then(({data}) => {
            validate = responseValidation(data,rePrintObj);
            console.log(data)
            if(validate.isValid)
            {
                switch (data.responseCode) {
                    
                    case 0:
                        {
                            dispatch({type: 'REPRINT_RECEIPT_SUCCESS', payload: data});
                            break;
                        }
                    case 1:
                        {
                            dispatch({type: 'REPRINT_RECEIPT_FAILURE', payload: data});
                            break;
                        }
                    case 3:
                        {
                            dispatch({type: 'REPRINT_RECEIPT_FAILURE', payload: data});
                            break;
                        }
                    case 4:
                        {
                            dispatch({type: 'REPRINT_RECEIPT_FAILURE', payload: data});
                            break;
                        }
                }
            }
            else{
                var errorMessage = validate.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
                dispatch({
                    type: 'RE_PRINT_VALIDFAILED',
                    payload: {  },
                    message : errorMessage
                });
            }
        }).catch(error => {
            dispatch({
                type: 'RE_PRINT_VALIDFAILED',
                payload: {  },
                message : 'Exception occured during webservice call '+ URL
            });
        });
    };
}

export function clearPrintSend(){
    return (dispatch) => {
       
            dispatch({
                type: 'CLEAR_PRINT_SEND',
                payload: {}
            });
    };
}
/* To add customer - Domestic */
export  function PrintSendDetailsTransaction(userPin,transactionDetails,txnNumber){


    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
    const GetTransactionDetailsURL = path+'GetTransactionDetailsURL.json';

    //sets url to be used for api call
    // "TranFile": (transactionDetails) ? transactionDetails.transactionFile : "tran_180822030759_247_00782_20-Mar-17_N.log"
   
    const URL = CONFIG_FILE_ADD.postvoidTransDetails;
    //  const params = {
    //     "SourceApp": clientConfig.SourceApp,
    //     "SourceLoc": clientConfig.SourceLoc,
    //     "Store": (transactionDetails) ? transactionDetails.store : CONFIG_FILE_ADD.clientConfig.Store,
    //     "Terminal": clientConfig.Terminal,
    //     "StoreAssoc": userPin,
    //     "TransactionId": (transactionDetails) ? transactionDetails.transactionID : txnNumber,
    //     "TranFile": (transactionDetails) ? transactionDetails.transactionFile : ""
    //  }
    
    //Params Are Hard code to get Transcation details are
     const params =       {
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":"0006",
        "Terminal":"0204",
        "StoreAssoc":"931818",
        "TransactionId":(transactionDetails) ? transactionDetails.transactionID : txnNumber,
        "TranFile":(transactionDetails) ? transactionDetails.transactionFile : ""
              }
     
    const request = callPostWebService(URL,params)
    //const request =callGetWebService(GetTransactionDetailsURL, '');
    return (dispatch) => {
        
        request.then(({
                data
            }) => {
                validate = responseValidation(data,transDetailsObj);
            if(validate.isValid)
            {
               switch (data.response_text) {

                    case "IM_SUCCESS":
                        {
                            // dispatch({
                            //     type: 'ADD_ITEM_REQUEST',
                            //     payload: data
                            // });
                            dispatch({
                                type: 'RENDER_PRINT_CART',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'TRANSACTION_DETAILS_FETCH_FAILURE',
                                payload: data
                            });
                            break;
                        }
                }
            }
            else
            {   
                var errorMessage = validate.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
                dispatch({
                    type: 'TRANS_DETAILS_VALIDFAILED',
                    payload: {  },
                    message : errorMessage
                });
            }
            })
            
            .catch(error => {
                dispatch({
                    type: 'TRANS_DETAILS_VALIDFAILED',
                    payload: {  },
                    message : 'Exception occured during webservice call '+ URL
                });
            });
    };
}

export  function PrintSendTransactionList(userPin){

    const GetTransactionListURL = path+'GetTransactionListURL.json';

    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');


    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postvoidGetTransList;
     const params = {
        "SourceApp": clientConfig.SourceApp,
        "SourceLoc": clientConfig.SourceLoc,
        "Store": clientConfig.Store,
        "Terminal": clientConfig.Terminal,
        "StoreAssoc": userPin
        
        }
        
   //const request =callGetWebService(GetTransactionListURL, '');
    const request = callPostWebService(URL,params)
    return (dispatch) => {
       
        request.then(({
                data
            }) => {
                validate = responseValidation(data,transListObj);
                console.log(JSON.stringify(transListObj));
                console.log('trans list valid'+JSON.stringify(validate));
                if(validate.isValid)
                {
                    switch (data.response_text) {

                            case "TL_SUCCESS":
                                {
                                    dispatch({
                                        type: 'TRANSACTION_LIST_FETCH_SUCCESS',
                                        payload: data
                                    });
                                    break;
                                }

                            default:
                                {
                                    dispatch({
                                        type: 'TRANSACTION_LIST_FETCH_FAILURE_PRINT',
                                        payload: data
                                    });
                                    break;
                                }
                        }
                }
                else
                {   
                    var errorMessage = validate.message + ' for web service: '+URL+' TimeOut Duration:'+require('../../resources/stubs/config.json').timeout+'ms';
                    dispatch({
                        type: 'TRANS_LIST_VALIDFAILED',
                        payload: {  },
                        message : errorMessage
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: 'TRANS_LIST_VALIDFAILED',
                    payload: {  },
                    message : 'Exception occured during webservice call '+ URL
                });
            });
    };
}


export function clearIsValid(){
    return (dispatch) => {
    dispatch({
        type: 'CLEAR_TRANSLIST_IS_VALID',
        payload: ''
    });
}
}