import { TRANSACTION_ID_REQUEST, GET_SALUTATION } from '../common/constants/type';
import { callPostWebService, callGetWebService, xml2json2 } from '../common/helpers/helpers';
import { startSpinner } from '../common/loading/spinnerAction';

//grabs url and other data from config file.
const CONFIG_FILE = require('../../resources/stubs/config.json');

const URL = CONFIG_FILE.apiAddressTransaction;
const SALUTATION_URL = CONFIG_FILE.getSalutationURL;
const RegisterInfo_URL= CONFIG_FILE.apiRegisterInfo;
const env = require('../../settings/env.js');
const path = env.PATH;
const apiAddressTransaction = path + 'apiAddressTransaction.json';
const getSalutationURL = path + 'getSalutationURL.json';


//calls api to compare passwords during Login event. 
export function getTransactionRequest(data) {
    const request = env.ENV_MODE == 'dev1' ? callPostWebService(URL, data) : callGetWebService(URL, apiAddressTransaction);

    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({
                type: TRANSACTION_ID_REQUEST,
                payload: data,
            });
            dispatch(startSpinner(false));
        }).catch((error) => {
            dispatch({
                type: 'TRANSACTION_ID_ERROR',

            })
        });
    };

}

export function getPresaleRequest(data) {
    const request = callPostWebService(RegisterInfo_URL,data);

    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({
                type: 'PRESALE_FLAG',
                payload: data,
            });
            dispatch(startSpinner(false));
        }).catch((error) => {
            dispatch({
                type: 'PRESALE_FLAG_ERROR',

            })
        });
    };



}

export function setButtonClick(buttonId) {
    return (dispatch) => {
        dispatch({
            type: 'SET_BUTTON_CLICK_ID',
            payload: buttonId
        });
    };
}

export function clearHomeStore() {
    return (dispatch) => {
        dispatch( {
            type: 'CLEAR_HOME_STORE',
        });
    };
}

export function getSalutations(){
    const request = env.ENV_MODE=='dev1'?callPostWebService(SALUTATION_URL, {}):callGetWebService(SALUTATION_URL, getSalutationURL);

    return (dispatch) => {
        request.then(({ data }) => {
            dispatch({
                type: GET_SALUTATION,
                payload: data
            });
        });
    };
}

export function clearPED(xmlrequest) {
console.log("HomeAction : Clearing PED");
    try {
        if (window.aurusplugin) {
            const request = new Promise((res, rej) => {
                window.aurusplugin.callAurus(xmlrequest, res, rej)

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

export function attachCustomerAction(userpin, transactionId, storeClientNumber, addressSeque, phoneSeque,customerData) {
    
    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.attachCustomerURL;
    const clientConfig = CONFIG_FILE.clientConfig;

    // var attachCustObj = {
    //     "ClientID": clientConfig.ClientID,
    //     "SourceApp": clientConfig.SourceApp,
    //     "SourceLoc": clientConfig.SourceLoc,
    //     "Store": clientConfig.Store,
    //     "Terminal": clientConfig.Terminal,
    //     "StoreAssoc": userpin,
    //     "TransactionId": transactionId,
    //     "StoreClientNumber": storeClientNumber,
    //     "AddressSequence": addressSeque,
    //     "PhoneSequence": phoneSeque
    // }
    var  reqData = {
        "ClientID": clientConfig.ClientID,
        "SourceApp": clientConfig.SourceApp,
        "SourceLoc": clientConfig.SourceLoc,
        "Store": clientConfig.Store,
        "Terminal": clientConfig.Terminal,
        "StoreAssoc": userpin,
        "TransactionId": transactionId,
        "StoreClientNumber": storeClientNumber,
        "AddressSequence": addressSeque,
        "PhoneSequence": phoneSeque,
        "Salutation":"MR.",
        "FirstName":customerData !== undefined && customerData.firstName,
        "LastName":customerData !== undefined && customerData.lastName,
        "Address_Line1":customerData !== undefined && customerData.address1,
        "Address_Line2":customerData !== undefined && customerData.address2,
        "Address_Line3":"",
        "City":customerData !== undefined && customerData.city,
        "State":customerData !== undefined && customerData.state,
        "Zip":customerData !== undefined && customerData.zip,
        "Country":customerData !== undefined && customerData.country,
        "CMobile":customerData !== undefined && customerData.cust_dom_mobile,
        "COtherPhone":customerData !== undefined && customerData.cust_dom_otherMobile,
        "CEmail":customerData !== undefined && customerData.email,  
        "AddressType":"1",
        "PhoneType":"1"
    
    }

    const attachCustomerURL = path + 'attachCustomerURL.json';
    const request = env.ENV_MODE == 'dev1' ? callPostWebService(URL, reqData) : callGetWebService(attachCustomerURL, {});
    return (dispatch) => {
        request.then(({
            data
        }) => {
            console.log(data.response_code);
            switch (JSON.parse(data.response_code)) {
                case 0:
                    {
                        dispatch({
                            type: 'AC_SUCCESS',
                            payload: data
                        });
                        dispatch(startSpinner(false));
                        break;
                    }
                case 52:
                    {
                        dispatch({
                            type: 'UC_TRANS_ALREADY_CLIENTELED',
                            payload: data
                        });
                        break;
                    }
            }
        })
            .catch(error => {
                dispatch({
                    type: 'UPDATE_CUST_REQUEST_FAIL',
                    payload: error
                });
            });
    };
}

export function zipToCitySateAction(zipCode) {

    const CONFIG_FILE = require('../../resources/stubs/config.json');
    var URL = CONFIG_FILE.apiZipToCityCode;

    var zipObj = {
        "zipCode": zipCode
    }

    const request = callPostWebService(URL, zipObj);
    return (dispatch) => {
        request.then(({
            data
        }) => {
            dispatch({
                type: 'ZIP_TO_CITY_STATE_REQUEST',
                payload: data
            });
        })
            .catch(error => {
                dispatch({
                    type: 'ZIP_TO_CITY_STATE_REQUEST_FAIL',
                    payload: error
                });
            });
    };
}

export function clearZipToCitySateDataAction() {
    return (dispatch) => {
        dispatch({
            type: 'ZIP_TO_CITY_STATE_CLEAR_DATA',
            payload: null
        });
    };
}

export function clearLoginDataAction() {
    return (dispatch) => {
        dispatch({
            type: 'LOGIN_REQUEST_CLEAR',
            payload: null
        });
    };
}
export function resumeTransactionIdAction(data) {
    console.log('resumeTransactionIdAction',data)
    return (dispatch) => {
        dispatch({
            type: 'TRANSACTION_ID_REQUEST',
            payload:data
        });
    };
}

