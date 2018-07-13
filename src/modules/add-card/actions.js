import {callPostWebService, callGetWebService} from '../common/helpers/helpers';
import {getStore} from '../../store/store';

/* To add card - Domestic */
export function addCardAction(addCardData) {
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.addCardURL;
    var params = addCardData;
    const request = callPostWebService(URL, params);

    return (dispatch) => {
        request.then(({data}) => {
            console.log(data);

            switch (data.ResCode) {

                case 0:
                    {
                        dispatch({type: 'UPDATE_CARD_SUCCESS', payload: data});
                        break;
                    }

                case 1:

                    {
                        dispatch({type: 'UPDATE_CARD_INVALID_CARD', payload: data});
                        break;
                    }

                case 3:
                    {
                        dispatch({type: 'UPDATE_CARD_MISSING_DETAILS', payload: data});
                        break;
                    }

                case 5:

                    {
                        dispatch({type: 'UPDATE_CARD_GENERAL_ERROR', payload: data});
                        break;
                    }

                case 7:
                    {
                        dispatch({type: 'UPDATE_CARD_RECORD_NOT_UPDATED', payload: data});
                        break;
                    }

                case 9:
                    {
                        dispatch({type: 'UPDATE_CARD_INVALID_NUMBER', payload: data});
                        break;
                    }
                case 14:
                default:
                    {
                        console.log("Inside Switch Block: default");
                        dispatch({type: 'UPDATE_CARD_DEFAULT', payload: data});
                        break;
                    }
            }
        }).catch(error => {
            dispatch({type: 'UPDATE_CARD_FAIL', payload: error});
        });
    };
}

export function getAddCardAurusResponse(xmlrequest) {
    console.log("in payment action");
    console.log("xmlrequest" + xmlrequest);
    try {
        if(window.aurusplugin) { 
            console.log('window.aurusplugin present');
            window.aurusplugin.callAurus(xmlrequest,success,error); }
         else {
                console.log("window.aurusplugin not available"); 
        }
        
    } catch (err) {
        console.log('catch block: ', err);
    }

    return (dispatch) => dispatch({type: 'AURUS_REQUEST_SENT'})
}

var success = function (message) {
    console.log("aurus call success", message);
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({type: 'AURUS_ADDCARD_SUCCESS_RESPONSE', payload: aurusresponse});
}

var error = function (message) {
    console.log("aurus call error", message);
    var storeInstance = getStore();
    var aurusresponse = message;
    storeInstance.dispatch({type: 'AURUS_ADDCARD_FAIL_RESPONSE', payload: aurusresponse});
}
