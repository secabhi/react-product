import { callPostWebService, callGetWebService } from '../common/helpers/helpers';

/* To add customer - Domestic */
export function postVoidFinalTransaction() {


    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');


    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postVoidTransApi;
     const params = {

        "ClientID":"0010:0005:06072018:033639",
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":"0010",
        "Terminal":"0005",     
        "StoreAssoc":"209289",
        "TransactionId": "0004",
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
export  function postVoidDetailsTransaction(){


    const CONFIG_FILE_ADD = require('../../resources/stubs/config.json');


    //sets url to be used for api call
   
    const URL = CONFIG_FILE_ADD.postvoidTransDetails;
     const params = {
        "SourceApp":"MPOS",
        "SourceLoc":"NM-DIRECT",
        "Store":"0010",
        "Terminal":"0243", 
        "StoreAssoc":"209289",
        "TransactionID":"2097",
        "TranFile":"tran_180702163727_216_02097_20-Mar-17_N.log"
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
                                type: 'IM_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'PV_TRANSDETLS_RESP_DEFAULT',
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
        "Store":"0010",
        "Terminal":"0243", 
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
                                type: 'TL_SUCCESS',
                                payload: data
                            });
                            break;
                        }

                    default:
                        {
                            dispatch({
                                type: 'TL_INVALIDREQUEST',
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