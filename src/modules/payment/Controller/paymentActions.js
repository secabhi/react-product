import {callPostWebService, callAxiosWebService,callPutWebService,callGetWebService} from '../../common/helpers/helpers';
import { GET_CLIENT_DETAILS, UPDATE_CLIENT_DETAILS } from './constants';
import { xml2json } from './converter';
import { getStore } from '../../../store/store';

const env = require('../../../settings/env.js');
const path = env.PATH+'cxp/';
const cxp = require('../../../resources/stubs/config.json').cxp;
const CONFIG_FILE = require('../../../resources/stubs/config.json');
const AppKey= cxp.AppKey;
var headers = {
    'AppID': 'MPOS',
    'AppKey': AppKey
}

export function getCustDetails(customerDetails) {
    var URL = CONFIG_FILE.emailReceipt
    var params = customerDetails;
    console.log("Parameters being sent", params);
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        request.then(({data}) => {
            switch (data.Response_Code) {

                case 0:
                    {
                        dispatch({type: 'GET_CLIENT_DETAILS', payload: data});
                        break;
                    }

                case 1:
                    {
                        dispatch({type: 'FAILURE', payload: data})
                    }

                default:
                    {
                        console.log("Inside Switch Block: default");
                        dispatch({type: 'DEFAULT', payload: data});
                        break;
                    }
            }
        }).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    };
}

export function updateCustDetails(customerDetails) {
    var URL = CONFIG_FILE.emailReceipt
    var params = customerDetails;
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        request.then(({data}) => {
            console.log(data)
            switch (data.ResponseCode) {

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
        }).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    };
}

export function clearState() {
    return (dispatch) => dispatch({type: 'CLEAR'})
}

export function addTender(addTenderObj, transactionObj) {
    const addTenderUrl = CONFIG_FILE.addTender;
    const clientConfig = CONFIG_FILE.clientConfig
    const body = {
        ...clientConfig,
        ...transactionObj,
        ...addTenderObj
    }

    const addTenderCall = callPostWebService(addTenderUrl, body);

    return (dispatch) => {
        addTenderCall.then((data) => {
            switch(data.response_text) {
                case 'UC_SUCCESS':
                {
                    dispatch({
                        type: 'ADD_TENDER_SUCCESS',
                        payload: data
                    })
                    break;
                }

                case 'UC_MISSINGDETAILS':
                {
                    dispatch({
                        type: 'ADD_TENDER_FAILURE',
                        payload: data
                    })
                    break;
                }
                default:
                    {
                        dispatch({type: 'DEFAULT', payload: data});
                        break;
                    }
            }
        }).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    }

}

export function completeTrans(transactionObj) {
    const CONFIG_FILE = require('../../../resources/stubs/config.json');
    const completeTransUrl = CONFIG_FILE.completeTransaction;
    const clientConfig = CONFIG_FILE.clientConfig
    const body = {
        ...clientConfig,
        ...transactionObj
    }
    const completeTransactionCall = callPostWebService(completeTransUrl, body);

    return (dispatch) => {
        completeTransactionCall.then((data) => {
            switch(data.response_text) {
                case 'UC_SUCCESS':
                {
                    dispatch({
                        type: 'COMPLETE_TRANSACTION_SUCCESS',
                        payload: data
                    })
                }

                case 'UC_MISSINGDETAILS':
                {
                    dispatch({
                        type: 'COMPLETE_TRASACTION_FAILURE',
                        payload: data
                    })
                }
                default:
                {
                    dispatch({type: 'DEFAULT', payload: data});
                    break;
                }
            }
        }).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    }
}

export function printReceipt(data){
    var params=data;
    var URL = CONFIG_FILE.printReceipt
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        request.then(({data}) => {
            console.log(data)
            switch (data.responseCode) {
                case 0:
                    {
                        dispatch({type: 'PRINT_RECEIPT_SUCCESS', payload: data});
                        break;
                    }
                case 1:
                {
                    dispatch({type: 'PRINT_RECEIPT_FAILURE', payload: data});
                    break;
                }
                }
            }).catch(error => {
                dispatch({type: 'REQUEST_FAILED', payload: error});
            });
        };
    }

export function getAurusResponse(xmlrequest) {

    try {
        if (window.aurusplugin) {
            console.log('in payment action: window.aurusplugin present');
            window.aurusplugin.callAurus(xmlrequest, success, error);
        }
        else {
            console.log("inside else block");
        }
    }
    catch (err) {
        console.log('catch block: ', err);
    }
    return (dispatch) => dispatch({ type: 'AURUS_REQUEST_SENT' })
}

var success = function (message) {
    //console.log(xml2json( message));
    var storeInstance = getStore();
    var aurusresponse = xml2json(message);
    storeInstance.dispatch({
        type: 'AURUS_SUCCESS__RESPONSE',
        payload: aurusresponse
    });
}
var error = function (message) {
    console.log("error", message);
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({
        type: 'AURUS_FAILURE_RESPONSE',
        payload: 'aurusresponse'
    });
}


//UpdateIsellCart Action
export function UpdateCartStatusAction(obj) {
    console.log(JSON.stringify(obj));
    const UpdateCartStatus = env.ENV_MODE=='dev1'?cxp.updateCartStatus+'?cartId='+obj.cartID:path+'UpdateCartStatus.json';

    var params = {statusCd:'1',orderNumber:obj.orderNumber};
    const request =  env.ENV_MODE=='dev1'?callPutWebService(UpdateCartStatus,params,headers):callGetWebService(UpdateCartStatus,{});
    return (dispatch) => {
        request.then(({data}) => {
            console.log('updatecartstatus action data'+data.status);
                
            switch (data.code) {

                case "200":
                    {   
                        dispatch({type: 'ISELL_SUCCESS', payload: data});
                        break;
                    }

                case "71007.0":
                    {
                        dispatch({type: 'ISELL_FAILURE', payload: data});
                        break;
                    }
                case '71007.1':
                    {
                        dispatch({type: 'ISELL_MISSING_DETAILS', payload: data});
                        break;
                    }

                default:
                    {
                        console.log("Inside Switch Block: default");
                        dispatch({type: 'DEFAULT', payload: data});
                        break;
                    }
            }
        }).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    };
}
