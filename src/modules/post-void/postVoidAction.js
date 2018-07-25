import { callPostWebService, callGetWebService } from '../common/helpers/helpers';

/* To add customer - Domestic */
export function postVoidFinalTransaction(userPin,transacID) {


    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');


    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postVoidTransApi;
     const params = {

        "ClientID":"0010:0005:06072018:033639",
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":CONFIG_FILE_ADD.clientConfig.Store,
        "Terminal":CONFIG_FILE_ADD.clientConfig.Terminal,     
        "StoreAssoc":(userPin) ? userPin :"930924",
        "TransactionId": transacID,
        "TransactionFile": "tran_180618223828_243_03544_20-Mar-17_Y.log"
    
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


    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postvoidTransDetails;
     const params = {
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":(transactionDetails) ? transactionDetails.store : CONFIG_FILE_ADD.clientConfig.Store,
        "Terminal":(transactionDetails) ? transactionDetails.terminal :CONFIG_FILE_ADD.clientConfig.Terminal, 
        "StoreAssoc":(userPin) ? userPin : CONFIG_FILE_ADD.clientConfig.StoreAssoc,
        "TransactionId":(transactionDetails) ? transactionDetails.transactionID: txnNumber,
        "TranFile": (transactionDetails) ? transactionDetails.transactionFile : "tran_180723040844_247_00454_20-Mar-17_N.log"
    }
              
     
    const request = callPostWebService(URL,params);
    return (dispatch) => {
        
        request.then(({
                data
            }) => {
               switch (data.response_text) {

                    case "IM_SUCCESS":
                        {
                            dispatch({
                                type: 'TRANSACTION_DETAILS_FETCH_SUCCESS',
                                payload: data,
                                transacID:data.transactionId
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

export  function postVoidTransactionList(){


    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');


    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postvoidGetTransList;
     const params = {
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":"0006",
        "Terminal":"0247", 
        "StoreAssoc":"209289",
        }
        
     
    const request = callPostWebService(URL,params);
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