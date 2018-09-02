import { callPostWebService} from '../common/helpers/helpers';
import {responseValidation} from '../common/responseValidator/responseValidation'
import {postVoidTransactionListResponseObj} from '../common/responseValidator/responseDictionary';

const CONFIG_FILE = require('../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;
const env = require('../../settings/env.js');
const path = env.PATH;


export function postVoidFinalTransaction(userPin,transacID) {
    const URL = CONFIG_FILE.postVoidTransApi;
     const params = {
        ...clientConfig,  
       // "StoreAssoc":(userPin) ? userPin :"930924",
        "StoreAssoc": userPin,
        "TransactionId": transacID,
        "TranFile": "tran_180618223828_243_03544_20-Mar-17_Y.log"
    }
    const request = callPostWebService(URL,params);

    return (dispatch) => {
        request.then(({data}) => {
               switch (data.response_text) {
                    case "PV_SUCCESS":
                        {
                            dispatch({
                                type: 'PV_SUCCESS',
                                payload: data
                            });
                            break;
                        }
                        case "PV_TRANSACTIONNOTFOUND":
                        {
                            dispatch({
                                type: 'PV_TRANSACTIONNOTFOUND',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'PV_RESP_DEFAULT',
                                payload: data
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: 'PV_REQUEST_FAIL',
                    payload: error
                });
            });
    };
}

export  function postVoidDetailsTransaction(userPin,transactionDetails,txnNumber){
    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
    const GetTransactionDetailsURL = path+'GetTransactionDetailsURL.json';
    const URL = CONFIG_FILE_ADD.postvoidTransDetails;
     const params = {
        //"Store":(transactionDetails) ? transactionDetails.store : CONFIG_FILE_ADD.clientConfig.Store,
        //"StoreAssoc":(userPin) ? userPin : CONFIG_FILE_ADD.clientConfig.StoreAssoc,
       // "StoreAssoc": userPin,
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "TransactionId":(transactionDetails) ? transactionDetails.transactionID: txnNumber,
        "TranFile": (transactionDetails) ? transactionDetails.transactionFile : "tran_180723040844_247_00454_20-Mar-17_N.log",
        "Store":"0006",
        "Terminal":"204",
        "StoreAssoc":"931818"
    }
     
    const request = callPostWebService(URL,params) //callGetWebService(GetTransactionDetailsURL, '');
    return (dispatch) => {
        
        request.then(({data}) => {
               switch (data.response_text) {
                    case "IM_SUCCESS":
                        {
                            // dispatch({
                            //     type: 'ADD_ITEM_REQUEST',
                            //     payload: data
                            // });
                            dispatch({
                                type: 'RENDER_POST_VOID_CART',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'TRANSACTION_DETAILS_FETCH_FAILURE',
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: 'NETWORK_ERROR_POST_VOID',
                });
            });
    };
}

export  function postVoidTransactionList(userPin){
    const GetTransactionListURL = path+'GetTransactionListURL.json';
    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
    const URL = CONFIG_FILE_ADD.postvoidGetTransList;
     const params = {
        //"StoreAssoc": userPin
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":"0006",
        "Terminal":"204",
        "StoreAssoc":"931818"
        }
        
    console.log('URL',URL);
    const request = callPostWebService(URL,params); //callGetWebService(GetTransactionListURL, '');
    return (dispatch) => {
       
        request
        .then(({data}) => {
            if(responseValidation(data,postVoidTransactionListResponseObj).isValid) {
                dispatch({
                    type: 'TRANSACTION_LIST_FETCH_SUCCESS',
                    payload: data
                })
            } else {
                dispatch({
                    type: 'TRANSACTION_LIST_FETCH_FAILURE'
                })
            }    
        })
        .catch(error => {
            dispatch({
                type: 'TRANSACTION_LIST_FETCH_FAILURE',
                payload: error
            });
        });
    };
}