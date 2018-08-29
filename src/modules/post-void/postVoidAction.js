import { callPostWebService, callGetWebService } from '../common/helpers/helpers';
import {RENDER_POST_VOID_CART} from '../common/constants/type';
const CONFIG_FILE = require('../../resources/stubs/config.json');
var clientConfig = CONFIG_FILE.clientConfig;
const env = require('../../settings/env.js');
const path = env.PATH;
/* To add customer - Domestic */
export function postVoidFinalTransaction(userPin,transacID) {


    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');


    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postVoidTransApi;
     const params = {
        ...clientConfig,  
       // "StoreAssoc":(userPin) ? userPin :"930924",
        "StoreAssoc": userPin,
        "TransactionId": transacID,
        "TranFile": "tran_180618223828_243_03544_20-Mar-17_Y.log"
    
    }
      
     
    const request = callPostWebService(URL,params);
    return (dispatch) => {
        request.then(({
                data
            }) => {
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
/* To add customer - Domestic */
export  function postVoidDetailsTransaction(userPin,transactionDetails,txnNumber){


    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');
    const GetTransactionDetailsURL = path+'GetTransactionDetailsURL.json';

    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postvoidTransDetails;
     const params = {
        //"Store":(transactionDetails) ? transactionDetails.store : CONFIG_FILE_ADD.clientConfig.Store,
        //"StoreAssoc":(userPin) ? userPin : CONFIG_FILE_ADD.clientConfig.StoreAssoc,
       // "StoreAssoc": userPin,
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "TransactionId":(transactionDetails) ? transactionDetails.transactionID: txnNumber,
        "TranFile": (transactionDetails) ? transactionDetails.transactionFile : "tran_180723040844_247_00454_20-Mar-17_N.log",
        "Store":"6",
        "Terminal":"204",
        "StoreAssoc":"931818"

    }
              
     
    const request = callPostWebService(URL,params) //callGetWebService(GetTransactionDetailsURL, '');
    return (dispatch) => {
        
        request.then(({
                data
            }) => {
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
                                payload: data
                            });
                            break;
                        }
                }
            })
            .catch(error => {
                dispatch({
                    type: 'PV_TRANSDETLS_RESP_FAIL',
                    payload: error
                });
            });
    };
}

export  function postVoidTransactionList(userPin){

    const GetTransactionListURL = path+'GetTransactionListURL.json';

    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');


    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postvoidGetTransList;
     const params = {

        //"StoreAssoc": userPin
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":"0006",
        "Terminal":"204",
        "StoreAssoc":"931818"
        }
        
    console.log('Sweezey params:', params);
    console.log('URL',URL);
    const request = callPostWebService(URL,params); //callGetWebService(GetTransactionListURL, '');
    return (dispatch) => {
       
        request.then(({
                data
            }) => {
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
                                type: 'TRANSACTION_LIST_FETCH_FAILURE',
                                payload: data
                            });
                            break;
                        }
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