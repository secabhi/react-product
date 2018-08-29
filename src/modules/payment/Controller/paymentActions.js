import {callPostWebService, callAxiosWebService, callPutWebService, callGetWebService, xml2json2} from '../../common/helpers/helpers';
import {GET_CLIENT_DETAILS, UPDATE_CLIENT_DETAILS} from './constants';
import {getStore} from '../../../store/store';
import {resolve} from 'path';

const env = require('../../../settings/env.js');
const path = env.PATH + 'cxp/';
const cxp = require('../../../resources/stubs/config.json').cxp;
const CONFIG_FILE = require('../../../resources/stubs/config.json');
const clientConfig = CONFIG_FILE.clientConfig;
const AppKey = cxp.AppKey;
var headers = {
    'AppID': 'MPOS',
    'AppKey': AppKey
}

export function getAurusResponse(xmlrequest, type) {
console.log("action request: ",xmlrequest)
try {
    if (window.aurusplugin) { 
        const request = new Promise((res,rej) => {
            window.aurusplugin.callAurus(xmlrequest,res,rej)
            
        })

        //goes to thunk to handle listening for resolve   
        return (dispatch) => {
            request
            .then((data) => {
                
                 const aurusresponse = xml2json2(data);
                console.log("action response: ",JSON.stringify(aurusresponse)) 
                 switch(type){
                   
                    case 'SCANNER':{
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'GETCARDBIN':{
                        console.log("action switch:",type)
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'CANCELSWIPE': {
                        console.log("action switch:",type)
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'TRANSACTIONREQUEST': {
                        console.log("action switch:",type)
                        return dispatch({type: type, payload: aurusresponse})
                    }
				   case 'GIFTCARD_GETCARDBIN':{
                        console.log("action switch:",type)
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'GIFTCARDBALANCE_INQUIRY':{
                        console.log("action switch:",type)
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'BYPASS':{
                        console.log("action switch:",type)
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'CLOSETRANSACTION':{
                        console.log("action switch:",type)
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'SIGNATURE':{
                        console.log("action switch:",type)
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'AESDKREG':{
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'INIT':{
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'MID_VOID': {
                        return dispatch({type: type, payload: aurusresponse})
                    }
                    case 'PED_BATTERY' : {
                        return dispatch({type: type, payload: aurusresponse})
                    }
                }
            }
            ).catch((err) => {
                return {type: 'AURUS_FAILURE_RESPONSE', payload: err}
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
    console.log(params)
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

export function addTender(transactionObj) {
    const addTenderUrl = CONFIG_FILE.addTender;
    const body = transactionObj;

    const addTenderCall = callPostWebService(addTenderUrl, body);

    return (dispatch) => {
        addTenderCall.then((data) => {
            switch (data.data.response_text) {
                case 'AC_SUCCESS':
                    {
                        dispatch({type: 'ADD_TENDER_SUCCESS', payload: data.data})
                        break;
                    }

                case 'AC_MISSINGDETAILS':
                    {
                        dispatch({type: 'ADD_TENDER_FAILURE', payload: data.data})
                        break;
                    }
                default:
                    {
                        dispatch({type: 'DEFAULT', payload: data.data});
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
    const body = transactionObj;
    const completeTransactionCall = callPostWebService(completeTransUrl, body);

    return (dispatch) => {
        completeTransactionCall.then((data) => {
            console.log(data.data)
            switch (data.data.response_text) {
                case 'UC_SUCCESS':
                    {
                        dispatch({type: 'COMPLETE_TRANSACTION_SUCCESS', payload: data.data})
                    }

                case 'UC_MISSINGDETAILS':
                    {
                        dispatch({type: 'COMPLETE_TRASACTION_FAILURE', payload: data.data})
                    }
                default:
                    {
                        dispatch({type: 'DEFAULT', payload: data.data});
                        break;
                    }
            }
        }).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    }
}

export function printReceipt(data) {
    var params = data;
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
                case 3:
                    {
                        dispatch({type: 'PRINT_RECEIPT_FAILURE', payload: data});
                        break;
                    }
                case 4:
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

//UpdateIsellCart Action
export function UpdateCartStatusAction(obj) {
    console.log(JSON.stringify(obj));
    const UpdateCartStatus = env.ENV_MODE == 'dev1'
        ? cxp.updateCartStatus + '?cartId=' + obj.cartID
        : path + 'UpdateCartStatus.json';

    var params = {
        statusCd: '1',
        orderNumber: obj.orderNumber
    };
    const request = env.ENV_MODE == 'dev1'
        ? callPutWebService(UpdateCartStatus, params, headers)
        : callGetWebService(UpdateCartStatus, {});
    return (dispatch) => {
        request.then(({data}) => {
            console.log('updatecartstatus action data' + data.status);

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

//Void Transaction Log
export function voidTransaction(userPin, transactionId){
    var params = {
        "ClientID": clientConfig.ClientID,
        "SourceApp": clientConfig.SourceApp,
        "SourceLoc": clientConfig.SourceLoc,
        "Store": clientConfig.Store,
        "Terminal": clientConfig.Terminal,
        "StoreAssoc": userPin,
        "TransactionId": transactionId
    }

    var URL = CONFIG_FILE.voidTransaction
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        request.then(({data}) => {
            console.log(data)
            switch (data.responseCode) {
                case 0:
                    {
                        dispatch({type: 'VOID_SUCCESS', payload: data});
                        break;
                    }
                case 1:
                    {
                        dispatch({type: 'VOID_GENERALERROR', payload: data});
                        break;
                    }
                case 2:
                    {
                        dispatch({ type: 'VOID_MISSINGDETAILS', payload: data });
                        break;
                    }
                case 3:
                    {
                        dispatch({type: 'VOID_TRANIDISSUE', payload: data});
                        break;
                    }
            }
        }).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    };
}

export function cardNotSwiped(obj) {
    const CONFIG_FILE = require('../../../resources/stubs/config.json');
    const clientConfig = CONFIG_FILE.clientConfig;
    const cardNotSwipedUrl = CONFIG_FILE.apiCardNotSwiped;
    const body = {
        ...clientConfig,
        ...obj
    }
    const request = callPostWebService(cardNotSwipedUrl, body);

    return (dispatch) => {
        request.then((data) => {
            switch(data.data.response_text) {
                case ('CND_SUCCESS') :
                {
                    dispatch({
                        type: 'CARD_NOTSWIPED_SUCCESS', 
                        payload: data
                    })
                    break;
                }
                case ('CND_FAIL') :
                {
                    dispatch({
                        type: 'CARD_NOTSWIPED_FAILURE', 
                        payload: data
                    })
                    break;
                }
        }
        }).catch(error => {
            dispatch({type: 'REQUEST_FAILED', payload: error});
        });
    };
}
