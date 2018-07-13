import {callPostWebService, callGetWebService} from '../../common/helpers/helpers';
import { GET_CLIENT_DETAILS, UPDATE_CLIENT_DETAILS } from './constants';
import { xml2json } from './converter';
import { getStore } from '../../../store/store'

export function getCustDetails(customerDetails) {
    const CONFIG_FILE = require('../../../resources/stubs/config.json');
    var URL = CONFIG_FILE.emailReceipt
    var params = customerDetails;
    console.log("Parameters being sent", params);
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        request.then(({data}) => {
            switch (data.Response_Code) {

                case 0:
                    {
                        dispatch({type: 'SUCCESS', payload: data});
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
    const CONFIG_FILE = require('../../../resources/stubs/config.json');
    var URL = CONFIG_FILE.emailReceipt
    var params = customerDetails;
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        request.then(({data}) => {
            /*
                    Response sample structure:
                   {
                    "ResponseCode": "0",
                    "ResponseString": "Success"
                    }
                */
            switch (data.ResponseCode) {

                case "0":
                    {
                        dispatch({type: 'SUCCESS', payload: data});
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



export function getAurusResponse(xmlrequest) {
    console.log("in payment action");
    //console.log("xmlrequest" + xmlrequest);

    try {
        if (window.aurusplugin) {
            console.log('window.aurusplugin present');
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
    console.log(xml2json( message));
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